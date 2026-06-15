package com.mathify.controller;

import com.google.firebase.auth.FirebaseToken;
import com.mathify.model.AuthUser;
import com.mathify.util.FirebaseService;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import java.io.IOException;

@WebServlet("/register")
public class RegisterServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        req.getRequestDispatcher("/WEB-INF/jsp/pages/auth/register.jsp").forward(req, resp);
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
            // TODO: insert initial user_progress row in PostgreSQL, keyed on authUser.uid()
            HttpSession session = req.getSession(true);
            session.setAttribute("authUser", authUser);
            resp.sendRedirect(req.getContextPath() + "/dashboard");
        } catch (Exception e) {
            resp.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Token verification failed");
        }
    }
}
