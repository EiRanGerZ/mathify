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
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * "My Library" ({@code /library}): the courses a student is currently enrolled
 * in, split into In Progress / Completed, plus their current focus (the last
 * course they touched). Browsing and enrolling in new courses lives on the
 * separate catalog page, {@link AllCoursesServlet} ({@code /courses}).
 */
@WebServlet("/library")
public class CourseLibraryServlet extends HttpServlet {

    private static final Logger log = LoggerFactory.getLogger(CourseLibraryServlet.class);

    private final CourseDAO courseDAO = new CourseDAO();
    private final CourseEnrollmentDAO enrollmentDAO = new CourseEnrollmentDAO();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        HttpSession session = req.getSession(false);
        AuthUser authUser = (session != null) ? (AuthUser) session.getAttribute("authUser") : null;

        List<CourseCardView> enrolledCourses = new ArrayList<>();
        Set<String> enrolledIds  = new HashSet<>();
        Set<String> completedIds = new HashSet<>();
        String focusCourseJson   = "null";

        try {
            if (authUser != null) {
                List<CourseEnrollment> enrollments = enrollmentDAO.findByUser(authUser.uid());
                for (CourseEnrollment e : enrollments) {
                    enrolledIds.add(e.courseId());
                    if (e.isCompleted()) completedIds.add(e.courseId());
                }

                // Only the enrolled courses are shown here — filter the catalog down.
                for (CourseCardView c : courseDAO.findAll()) {
                    if (enrolledIds.contains(c.getId())) {
                        enrolledCourses.add(c);
                    }
                }

                String lastId = enrollmentDAO.findLastAccessedCourseId(authUser.uid());
                if (lastId != null) {
                    CourseCardView focus = courseDAO.findById(lastId);
                    if (focus != null) {
                        focusCourseJson = CourseCardJson.one(focus);
                    }
                }
            }
        } catch (SQLException e) {
            log.error("Failed to load library data", e);
        }

        req.setAttribute("coursesJson",      CourseCardJson.array(enrolledCourses));
        req.setAttribute("enrolledIdsJson",  CourseCardJson.ids(enrolledIds));
        req.setAttribute("completedIdsJson", CourseCardJson.ids(completedIds));
        req.setAttribute("focusCourseJson",  focusCourseJson);
        req.getRequestDispatcher("/WEB-INF/jsp/pages/library/index.jsp").forward(req, resp);
    }
}
