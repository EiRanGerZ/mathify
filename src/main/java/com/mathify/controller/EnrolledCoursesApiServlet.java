package com.mathify.controller;

import com.mathify.dao.CourseDAO;
import com.mathify.dao.CourseEnrollmentDAO;
import com.mathify.model.AuthUser;
import com.mathify.model.CourseCardView;
import com.mathify.model.CourseEnrollment;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.json.JSONArray;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.sql.SQLException;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/**
 * The courses the current user is enrolled in, with enrollment status.
 *
 * <pre>
 *   GET /api/me/courses -> {
 *     count, items: [ { id, title, blurb, track, levelNum, color, glyph,
 *                       totalLessons, xp, enrolledAt, completedAt, completed }, ... ]
 *   }
 * </pre>
 *
 * Distinct from {@code /api/courses/...} catalog reads: this is scoped to the
 * authenticated student. Enrollments drive the order (oldest first); course
 * metadata is joined in from a single catalog read indexed by id.
 */
@WebServlet("/api/me/courses")
public class EnrolledCoursesApiServlet extends ApiServlet {

    private static final Logger log = LoggerFactory.getLogger(EnrolledCoursesApiServlet.class);

    private final CourseDAO courseDAO = new CourseDAO();
    private final CourseEnrollmentDAO enrollmentDAO = new CourseEnrollmentDAO();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        AuthUser user = authUser(req);
        if (user == null) {
            unauthorized(resp);
            return;
        }

        try {
            List<CourseEnrollment> enrollments = enrollmentDAO.findByUser(user.uid());

            // Index the catalog by id once, then join in O(n) — avoids an N+1 lookup.
            Map<String, CourseCardView> byId = new LinkedHashMap<>();
            for (CourseCardView c : courseDAO.findAll()) {
                byId.put(c.getId(), c);
            }

            JSONArray items = new JSONArray();
            for (CourseEnrollment e : enrollments) {
                CourseCardView c = byId.get(e.courseId());
                if (c == null) continue; // course removed but enrollment lingering — skip
                items.put(cardJson(c)
                        .put("enrolledAt", e.enrolledAt() != null ? e.enrolledAt().toString() : JSONObject.NULL)
                        .put("completedAt", e.completedAt() != null ? e.completedAt().toString() : JSONObject.NULL)
                        .put("completed", e.isCompleted()));
            }

            writeJson(resp, HttpServletResponse.SC_OK,
                    new JSONObject().put("count", items.length()).put("items", items));
        } catch (SQLException e) {
            log.error("Failed to load /api/me/courses for uid={}", user.uid(), e);
            serverError(resp);
        }
    }

    private static JSONObject cardJson(CourseCardView c) {
        return new JSONObject()
                .put("id", c.getId())
                .put("title", c.getTitle())
                .put("blurb", c.getDescription() != null ? c.getDescription() : "")
                .put("track", c.getTrack())
                .put("levelNum", c.getLevelNum())
                .put("color", c.getColor())
                .put("glyph", c.getGlyph() != null ? c.getGlyph() : "")
                .put("totalLessons", c.getTotalLessons())
                .put("xp", c.getXpReward());
    }
}
