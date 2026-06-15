package com.mathify.controller;

import com.google.firebase.auth.FirebaseToken;
import com.mathify.dao.AdminDAO;
import com.mathify.dao.UserDAO;
import com.mathify.dao.UserProgressDAO;
import com.mathify.model.Admin;
import com.mathify.model.AuthUser;
import com.mathify.model.UserProgress;
import com.mathify.util.FirebaseService;

import java.time.LocalDateTime;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;

@WebServlet("/login")
public class LoginServlet extends HttpServlet {

    private static final Logger log = LoggerFactory.getLogger(LoginServlet.class);

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        req.getRequestDispatcher("/WEB-INF/jsp/pages/auth/login.jsp").forward(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        String idToken = req.getParameter("idToken");
        if (idToken == null || idToken.isBlank()) {
            resp.sendError(HttpServletResponse.SC_BAD_REQUEST, "Missing idToken");
            return;
        }
        try {
            FirebaseToken decoded = FirebaseService.verifyIdToken(idToken);
            AuthUser authUser = new AuthUser(
                decoded.getUid(),
                decoded.getEmail(),
                decoded.getName()
            );

            // Admins authenticate through the same Firebase login; the admins table
            // is an email allowlist. If the email is listed, start an admin session.
            Admin admin = new AdminDAO().findByEmail(authUser.email());
            if (admin != null) {
                admin.setLastLoginAt(LocalDateTime.now());
                new AdminDAO().upsert(admin);
                HttpSession session = req.getSession(true);
                session.setAttribute("admin", admin);
                resp.sendRedirect(req.getContextPath() + "/admin/");
                return;
            }

            // Persist / update user record and load progress
            new UserDAO().upsert(authUser);
            UserProgress progress = new UserProgressDAO().findOrCreate(authUser.uid());

            HttpSession session = req.getSession(true);
            session.setAttribute("authUser", authUser);
            session.setAttribute("progress", progress);
            resp.sendRedirect(req.getContextPath() + "/dashboard");

        } catch (Exception e) {
            log.error("Login failed", e);
            resp.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Token verification failed");
        }
    }
}
