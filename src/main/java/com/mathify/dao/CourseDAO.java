package com.mathify.dao;

import jakarta.enterprise.context.ApplicationScoped;

import com.mathify.model.Course;
import com.mathify.model.CourseCardView;
import com.mathify.util.DBConnection;
import com.mathify.util.QueryHelper;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

/**
 * Data access for the {@code courses} table. Serves two shapes:
 *   - {@link CourseCardView}: the flat presentation model used by the library grid.
 *   - {@link Course}: the domain aggregate (chapters + prerequisites), composed via
 *     {@link ChapterDAO}. The domain {@code category} maps to the {@code track} column.
 */
@ApplicationScoped
public class CourseDAO {

    private final ChapterDAO chapterDAO = new ChapterDAO();

    public List<CourseCardView> findAll() throws SQLException {
        String sql = "SELECT * FROM courses ORDER BY level_num, title";
        List<CourseCardView> list = new ArrayList<>();
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {
            while (rs.next()) {
                list.add(map(rs));
            }
        }
        return list;
    }

    public CourseCardView findById(String id) throws SQLException {
        String sql = "SELECT * FROM courses WHERE course_id = ?";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, id);
            try (ResultSet rs = ps.executeQuery()) {
                return rs.next() ? map(rs) : null;
            }
        }
    }

    // ── Domain Course (aggregate) ────────────────────────────────────────────

    /**
     * Inserts the course row and all of its chapters. {@code category} is stored in
     * the {@code track} column; presentation columns (color, glyph, …) keep their
     * defaults. Prerequisite links are persisted into {@code course_prerequisites}.
     */
    public void insert(Course course) throws SQLException {
        String sql = """
                INSERT INTO courses (course_id, title, description, track)
                VALUES (?, ?, ?, COALESCE(?, 'General'))
                ON CONFLICT (course_id) DO UPDATE
                  SET title       = EXCLUDED.title,
                      description = EXCLUDED.description,
                      track       = EXCLUDED.track
                """;
        QueryHelper.executeUpdate(sql, course.getCourseId(), course.getTitle(),
                course.getDescription(), course.getCategory());

        for (Course prereq : course.getPrerequisite()) {
            addPrerequisite(course.getCourseId(), prereq.getCourseId());
        }
        int order = 0;
        for (var chapter : course.getChapters()) {
            chapterDAO.insert(course.getCourseId(), chapter, order++);
        }
    }

    public void update(String courseId, String title, String description, String category) throws SQLException {
        String sql = """
                UPDATE courses
                   SET title = ?,
                       description = ?,
                       track = COALESCE(?, track)
                 WHERE course_id = ?
                """;
        QueryHelper.executeUpdate(sql, title, description, category, courseId);
    }

    public void delete(String courseId) throws SQLException {
        QueryHelper.executeUpdate("DELETE FROM courses WHERE course_id = ?", courseId);
    }

    public void addPrerequisite(String courseId, String prerequisiteId) throws SQLException {
        String sql = """
                INSERT INTO course_prerequisites (course_id, prerequisite_id)
                VALUES (?, ?)
                ON CONFLICT DO NOTHING
                """;
        QueryHelper.executeUpdate(sql, courseId, prerequisiteId);
    }

    /** Loads a fully-composed domain course (chapters + shallow prerequisites), or {@code null}. */
    public Course findCourse(String courseId) throws SQLException {
        Course course = loadShallowCourse(courseId);
        if (course == null) {
            return null;
        }
        course.setChapters(chapterDAO.findByCourse(courseId));
        for (String prereqId : findPrerequisiteIds(courseId)) {
            Course prereq = loadShallowCourse(prereqId);
            if (prereq != null) {
                course.getPrerequisite().add(prereq);
            }
        }
        return course;
    }

    /** Course metadata only — no chapters/prerequisites. Used to avoid recursion. */
    private Course loadShallowCourse(String courseId) throws SQLException {
        String sql = "SELECT course_id, title, description, track FROM courses WHERE course_id = ?";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, courseId);
            try (ResultSet rs = ps.executeQuery()) {
                if (!rs.next()) {
                    return null;
                }
                Course c = new Course();
                c.setCourseId(rs.getString("course_id"));
                c.setTitle(rs.getString("title"));
                c.setDescription(rs.getString("description"));
                c.setCategory(rs.getString("track"));
                return c;
            }
        }
    }

    private List<String> findPrerequisiteIds(String courseId) throws SQLException {
        return QueryHelper.queryList(
                "SELECT prerequisite_id FROM course_prerequisites WHERE course_id = ?",
                rs -> rs.getString("prerequisite_id"),
                courseId);
    }

    // ── Prerequisite graph / learning paths ──────────────────────────────────

    /** One directed edge of the prerequisite DAG: complete {@code prerequisiteId} before {@code courseId}. */
    public record PrereqEdge(String courseId, String prerequisiteId) {}

    /** Every prerequisite edge across the whole catalog — the skill-tree graph. */
    public List<PrereqEdge> findAllPrerequisites() throws SQLException {
        return QueryHelper.queryList(
                "SELECT course_id, prerequisite_id FROM course_prerequisites",
                rs -> new PrereqEdge(rs.getString("course_id"), rs.getString("prerequisite_id")));
    }

    /**
     * The ordered learning path to reach {@code courseId}: every transitive
     * prerequisite first (deepest ancestor first) followed by the course itself.
     *
     * <p>Computed in a single recursive CTE rather than walking the graph in
     * Java. {@code depth} is the longest distance from the target back to each
     * ancestor; ordering by it descending yields a valid completion order (a
     * topological sort of the ancestor sub-DAG). The {@code depth < 20} guard
     * stops a malformed cyclic graph from recursing forever.
     */
    public List<CourseCardView> findPrerequisitePath(String courseId) throws SQLException {
        String sql = """
                WITH RECURSIVE chain AS (
                    SELECT prerequisite_id, 1 AS depth
                    FROM   course_prerequisites
                    WHERE  course_id = ?
                  UNION ALL
                    SELECT cp.prerequisite_id, c.depth + 1
                    FROM   chain c
                    JOIN   course_prerequisites cp ON cp.course_id = c.prerequisite_id
                    WHERE  c.depth < 20
                )
                SELECT co.*
                FROM (
                    SELECT prerequisite_id AS id, MAX(depth) AS depth
                    FROM   chain
                    GROUP  BY prerequisite_id
                    UNION ALL
                    SELECT ? AS id, 0 AS depth
                ) ord
                JOIN courses co ON co.course_id = ord.id
                ORDER BY ord.depth DESC, co.level_num, co.title
                """;
        return QueryHelper.queryList(sql, this::map, courseId, courseId);
    }

    // ── CourseCardView (presentation) ─────────────────────────────────────────

    private CourseCardView map(ResultSet rs) throws SQLException {
        CourseCardView c = new CourseCardView();
        c.setId(rs.getString("course_id"));
        c.setTitle(rs.getString("title"));
        c.setDescription(rs.getString("description"));
        c.setTrack(rs.getString("track"));
        c.setLevelNum(rs.getInt("level_num"));
        c.setColor(rs.getString("color"));
        c.setGlyph(rs.getString("glyph"));
        c.setTotalLessons(rs.getInt("total_lessons"));
        c.setEstimatedHours(rs.getString("estimated_hours"));
        c.setXpReward(rs.getInt("xp_reward"));
        c.setStatus(rs.getString("status"));
        return c;
    }
}

