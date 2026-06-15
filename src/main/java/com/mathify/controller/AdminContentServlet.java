package com.mathify.controller;

import com.mathify.dao.ChapterDAO;
import com.mathify.dao.CourseDAO;
import com.mathify.model.Chapter;
import com.mathify.model.Course;
import com.mathify.model.CourseCardView;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.sql.SQLException;
import java.util.List;
import java.util.UUID;

/**
 * Admin content authoring — create courses and chapters using the domain DAOs.
 * Access is enforced by {@link com.mathify.filter.AuthFilter} (/admin/* needs an
 * admin session). Uses Post/Redirect/Get so refreshes don't re-submit.
 */
@WebServlet("/admin/content")
public class AdminContentServlet extends HttpServlet {

    private static final Logger log = LoggerFactory.getLogger(AdminContentServlet.class);

    private final CourseDAO courseDAO = new CourseDAO();
    private final ChapterDAO chapterDAO = new ChapterDAO();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        try {
            List<CourseCardView> courses = courseDAO.findAll();
            req.setAttribute("courses", courses);

            String selectedCourseId = req.getParameter("courseId");
            if (selectedCourseId != null && !selectedCourseId.isBlank()) {
                req.setAttribute("selectedCourseId", selectedCourseId);
                req.setAttribute("chapters", chapterDAO.findByCourse(selectedCourseId));
            }
        } catch (SQLException e) {
            log.error("Failed to load authoring data", e);
            req.setAttribute("flash", "Error loading content: " + e.getMessage());
        }
        req.getRequestDispatcher("/WEB-INF/jsp/pages/admin/authoring.jsp").forward(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        String action = req.getParameter("action");
        String redirectCourseId = null;
        String message;
        try {
            if ("createCourse".equals(action)) {
                Course course = new Course();
                course.setCourseId(UUID.randomUUID().toString());
                course.setTitle(required(req, "title"));
                course.setDescription(req.getParameter("description"));
                course.setCategory(blankToNull(req.getParameter("category")));
                courseDAO.insert(course);
                redirectCourseId = course.getCourseId();
                message = "Course created.";
            } else if ("createChapter".equals(action)) {
                String courseId = required(req, "courseId");
                Chapter chapter = new Chapter();
                chapter.setId("ch-" + UUID.randomUUID());
                chapter.setTitle(required(req, "title"));
                chapter.setDescription(req.getParameter("description"));
                chapter.setXpReward(parseIntOr(req.getParameter("xpReward"), 0));
                int order = chapterDAO.findByCourse(courseId).size();
                chapterDAO.insert(courseId, chapter, order);
                redirectCourseId = courseId;
                message = "Chapter added.";
            } else {
                message = "Unknown action.";
            }
        } catch (IllegalArgumentException e) {
            message = e.getMessage();
        } catch (SQLException e) {
            log.error("Authoring action '{}' failed", action, e);
            message = "Database error: " + e.getMessage();
        }

        StringBuilder url = new StringBuilder(req.getContextPath()).append("/admin/content?msg=")
                .append(URLEncoder.encode(message, StandardCharsets.UTF_8));
        if (redirectCourseId != null) {
            url.append("&courseId=").append(URLEncoder.encode(redirectCourseId, StandardCharsets.UTF_8));
        }
        resp.sendRedirect(url.toString());
    }

    private static String required(HttpServletRequest req, String name) {
        String v = req.getParameter(name);
        if (v == null || v.isBlank()) {
            throw new IllegalArgumentException("Missing required field: " + name);
        }
        return v.trim();
    }

    private static String blankToNull(String s) {
        return (s == null || s.isBlank()) ? null : s.trim();
    }

    private static int parseIntOr(String s, int fallback) {
        try {
            return (s == null || s.isBlank()) ? fallback : Integer.parseInt(s.trim());
        } catch (NumberFormatException e) {
            return fallback;
        }
    }
}
