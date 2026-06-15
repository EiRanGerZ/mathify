package com.mathify.controller;

import com.mathify.dao.CourseEnrollmentDAO;
import com.mathify.model.AuthUser;
import com.mathify.model.UserProgress;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.sql.SQLException;

@WebServlet("/course/enroll")
public class CourseEnrollServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        handleEnroll(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        handleEnroll(req, resp);
    }

    private void handleEnroll(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        HttpSession session = req.getSession(false);
        if (session == null || session.getAttribute("authUser") == null) {
            resp.sendRedirect(req.getContextPath() + "/login");
            return;
        }

        AuthUser authUser = (AuthUser) session.getAttribute("authUser");
        String courseId = req.getParameter("courseId");
        if (courseId == null || courseId.isBlank()) {
            resp.sendError(HttpServletResponse.SC_BAD_REQUEST, "Missing courseId");
            return;
        }

        try {
            // Enroll in DB
            new CourseEnrollmentDAO().enroll(authUser.uid(), courseId);

            // Keep the in-session progress object in sync so other pages
            // (dashboard, library) reflect the new enrollment without a re-login.
            UserProgress progress = (UserProgress) session.getAttribute("progress");
            if (progress != null) {
                progress.enrollCourse(courseId);
            }

            // Browse-and-enroll flows pass ?redirect=/courses to stay on the
            // catalog with a toast; otherwise drop the student into the course.
            String redirect = req.getParameter("redirect");
            if (redirect != null && redirect.startsWith("/") && !redirect.startsWith("//")) {
                String msg = URLEncoder.encode("Enrolled successfully!", StandardCharsets.UTF_8);
                resp.sendRedirect(req.getContextPath() + redirect + "?msg=" + msg);
            } else {
                resp.sendRedirect(req.getContextPath() + "/course?courseId=" + courseId);
            }
        } catch (SQLException e) {
            throw new ServletException("Failed to enroll in course", e);
        }
    }
}
