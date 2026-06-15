package com.mathify.controller;

import com.mathify.model.User;
import com.mathify.model.UserProgress;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import java.io.IOException;

@WebServlet("/quiz")
public class QuizServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        HttpSession session = req.getSession(false);
//        if (session == null || session.getAttribute("user") == null) {
//            resp.sendRedirect(req.getContextPath() + "/login");
//            return;
//        }
        User user         = (session != null) ? (User) session.getAttribute("user") : null;
        UserProgress prog = (session != null) ? (UserProgress) session.getAttribute("progress") : null;
        req.setAttribute("user", user);
        req.setAttribute("progress", prog);
        req.getRequestDispatcher("/WEB-INF/jsp/pages/quiz/index.jsp")
           .forward(req, resp);
    }
}
