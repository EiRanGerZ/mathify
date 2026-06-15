package com.mathify.controller;

import com.mathify.dao.CourseDAO;
import com.mathify.dao.CourseEnrollmentDAO;
import com.mathify.model.AuthUser;
import com.mathify.model.CourseCardView;
import com.mathify.model.CourseEnrollment;
import com.mathify.util.CourseCardJson;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.sql.SQLException;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * The course catalog ({@code /courses}): every course available to browse,
 * search by category, and enroll into. Distinct from {@code /library}, which
 * shows only the courses a student is already enrolled in. Enrollment itself
 * is delegated to {@link CourseEnrollServlet} ({@code /course/enroll}).
 */
@WebServlet("/courses")
public class AllCoursesServlet extends HttpServlet {

    private static final Logger log = LoggerFactory.getLogger(AllCoursesServlet.class);

    private final CourseDAO courseDAO = new CourseDAO();
    private final CourseEnrollmentDAO enrollmentDAO = new CourseEnrollmentDAO();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        HttpSession session = req.getSession(false);
        AuthUser authUser = (session != null) ? (AuthUser) session.getAttribute("authUser") : null;

        List<CourseCardView> courses;
        Set<String> enrolledIds  = new HashSet<>();
        Set<String> completedIds = new HashSet<>();

        try {
            courses = courseDAO.findAll();
            if (authUser != null) {
                for (CourseEnrollment e : enrollmentDAO.findByUser(authUser.uid())) {
                    enrolledIds.add(e.courseId());
                    if (e.isCompleted()) completedIds.add(e.courseId());
                }
            }
        } catch (SQLException e) {
            log.error("Failed to load course catalog", e);
            courses = List.of();
        }

        req.setAttribute("coursesJson",      CourseCardJson.array(courses));
        req.setAttribute("enrolledIdsJson",  CourseCardJson.ids(enrolledIds));
        req.setAttribute("completedIdsJson", CourseCardJson.ids(completedIds));
        req.getRequestDispatcher("/WEB-INF/jsp/pages/courses/index.jsp").forward(req, resp);
    }
}
