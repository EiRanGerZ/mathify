package com.mathify.controller;

import com.mathify.model.Admin;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import java.io.IOException;

@WebServlet("/admin/")
public class AdminServlet extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        HttpSession session = req.getSession(false);
//        if (session == null || session.getAttribute("admin") == null) {
//            resp.sendRedirect(req.getContextPath() + "/login");
//            return;
//        }
        Admin admin = (Admin) session.getAttribute("admin");
        req.setAttribute("admin", admin);
        req.getRequestDispatcher("/WEB-INF/jsp/pages/admin/dashboard.jsp")
           .forward(req, resp);
    }
}