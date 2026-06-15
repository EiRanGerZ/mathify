package com.mathify.controller;

import com.mathify.dao.SubscriptionDAO;
import com.mathify.model.AuthUser;
import com.mathify.model.Subscribable;
import com.mathify.util.MidtransService;
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

@WebServlet("/premium")
public class PremiumPageServlet extends HttpServlet {

    private static final Logger log = LoggerFactory.getLogger(PremiumPageServlet.class);
    private final SubscriptionDAO subscriptionDAO = new SubscriptionDAO();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        HttpSession session = req.getSession(false);
        AuthUser authUser = (session != null) ? (AuthUser) session.getAttribute("authUser") : null;
        if (authUser == null) {
            resp.sendRedirect(req.getContextPath() + "/login");
            return;
        }

        boolean premium = false;
        String premiumPlan = null;
        try {
            Subscribable sub = subscriptionDAO.find(authUser.uid());
            if (sub != null && sub.isActive()) {
                premium = true;
                premiumPlan = sub.getSubscriptionPlan();
            }
        } catch (SQLException e) {
            log.error("Failed to load subscription for uid={}", authUser.uid(), e);
        }

        req.setAttribute("premium", premium);
        req.setAttribute("premiumPlan", premiumPlan);
        req.setAttribute("isProduction", MidtransService.isProduction());
        req.getRequestDispatcher("/WEB-INF/jsp/pages/premium/index.jsp").forward(req, resp);
    }
}
