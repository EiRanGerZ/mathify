package com.mathify.dao;

import com.mathify.model.Chapter;
import com.mathify.model.Quiz;
import com.mathify.util.DBConnection;
import com.mathify.util.QueryHelper;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

/**
 * Persists {@link Chapter} rows ({@code chapters} + {@code chapter_prerequisites})
 * and composes the full chapter on read by delegating to {@link LearningModuleDAO}
 * and {@link QuizDAO}. {@code orderIndex} preserves the position within a course.
 */
public class ChapterDAO {

    private final LearningModuleDAO moduleDAO = new LearningModuleDAO();
    private final QuizDAO quizDAO = new QuizDAO();

    /** Inserts the chapter row, its prerequisite links, modules, and quizzes. */
    public void insert(String courseId, Chapter chapter, int orderIndex) throws SQLException {
        String sql = """
                INSERT INTO chapters (chapter_id, course_id, title, description, xp_reward, order_index)
                VALUES (?, ?, ?, ?, ?, ?)
                ON CONFLICT (chapter_id) DO UPDATE
                  SET course_id   = EXCLUDED.course_id,
                      title       = EXCLUDED.title,
                      description = EXCLUDED.description,
                      xp_reward   = EXCLUDED.xp_reward,
                      order_index = EXCLUDED.order_index
                """;
        QueryHelper.executeUpdate(sql, chapter.getId(), courseId, chapter.getTitle(),
                chapter.getDescription(), chapter.getXpReward(), orderIndex);

        for (Chapter prereq : chapter.getPrerequisite()) {
            addPrerequisite(chapter.getId(), prereq.getId());
        }
        for (var module : chapter.getModules()) {
            moduleDAO.insert(chapter.getId(), module);
        }
        for (Quiz quiz : chapter.getQuizzes()) {
            quizDAO.insert(chapter.getId(), quiz);
        }
    }

    public void addPrerequisite(String chapterId, String prerequisiteId) throws SQLException {
        String sql = """
                INSERT INTO chapter_prerequisites (chapter_id, prerequisite_id)
                VALUES (?, ?)
                ON CONFLICT DO NOTHING
                """;
        QueryHelper.executeUpdate(sql, chapterId, prerequisiteId);
    }

    /** Loads a fully-composed chapter (modules, quizzes, prerequisites), or {@code null}. */
    public Chapter findById(String chapterId) throws SQLException {
        Chapter chapter = loadShallow(chapterId);
        if (chapter == null) {
            return null;
        }
        chapter.setModules(moduleDAO.findByChapter(chapterId));
        chapter.setQuizzes(quizDAO.findByChapter(chapterId));
        for (String prereqId : findPrerequisiteIds(chapterId)) {
            Chapter prereq = loadShallow(prereqId);
            if (prereq != null) {
                chapter.addPrerequisite(prereq);
            }
        }
        return chapter;
    }

    /** Loads every chapter of a course in order, each fully composed. */
    public List<Chapter> findByCourse(String courseId) throws SQLException {
        List<String> ids = QueryHelper.queryList(
                "SELECT chapter_id FROM chapters WHERE course_id = ? ORDER BY order_index",
                rs -> rs.getString("chapter_id"),
                courseId);
        List<Chapter> chapters = new ArrayList<>();
        for (String id : ids) {
            chapters.add(findById(id));
        }
        return chapters;
    }

    public void delete(String chapterId) throws SQLException {
        // modules, quizzes, and prerequisite links cascade via FK ON DELETE CASCADE.
        QueryHelper.executeUpdate("DELETE FROM chapters WHERE chapter_id = ?", chapterId);
    }

    /** Chapter metadata only — no modules/quizzes/prerequisites. Used to avoid recursion. */
    private Chapter loadShallow(String chapterId) throws SQLException {
        String sql = "SELECT chapter_id, title, description, xp_reward FROM chapters WHERE chapter_id = ?";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, chapterId);
            try (ResultSet rs = ps.executeQuery()) {
                if (!rs.next()) {
                    return null;
                }
                return new Chapter(
                        rs.getString("chapter_id"),
                        rs.getString("title"),
                        rs.getString("description"),
                        rs.getInt("xp_reward"));
            }
        }
    }

    private List<String> findPrerequisiteIds(String chapterId) throws SQLException {
        return QueryHelper.queryList(
                "SELECT prerequisite_id FROM chapter_prerequisites WHERE chapter_id = ?",
                rs -> rs.getString("prerequisite_id"),
                chapterId);
    }

    public String findCourseIdByChapterId(String chapterId) throws SQLException {
        String sql = "SELECT course_id FROM chapters WHERE chapter_id = ?";
        return QueryHelper.queryOne(sql, rs -> rs.getString("course_id"), chapterId);
    }
}
