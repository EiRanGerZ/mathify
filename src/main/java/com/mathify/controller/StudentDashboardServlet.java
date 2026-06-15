package com.mathify.controller;

import com.mathify.dao.UserProgressDAO;
import com.mathify.model.AuthUser;
import com.mathify.model.UserProgress;
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

@WebServlet("/dashboard")
public class StudentDashboardServlet extends HttpServlet {

    private static final Logger log = LoggerFactory.getLogger(StudentDashboardServlet.class);

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        HttpSession session = req.getSession(false);
        if (session == null || session.getAttribute("authUser") == null) {
            resp.sendRedirect(req.getContextPath() + "/login");
            return;
        }

        AuthUser authUser = (AuthUser) session.getAttribute("authUser");

        // Refresh progress from DB on each load so XP / streak are always current
        UserProgress progress;
        try {
            progress = new UserProgressDAO().findOrCreate(authUser.uid());
            session.setAttribute("progress", progress);
        } catch (SQLException e) {
            log.error("Failed to load progress for uid={}", authUser.uid(), e);
            progress = (UserProgress) session.getAttribute("progress");
            if (progress == null) progress = new UserProgress(authUser.uid());
        }

        req.setAttribute("authUser", authUser);
        req.setAttribute("progress", progress);
        req.getRequestDispatcher("/WEB-INF/jsp/pages/student/dashboard.jsp").forward(req, resp);
    }
}
