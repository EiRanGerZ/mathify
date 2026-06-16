package com.mathify.controller;

import java.io.IOException;
import java.sql.SQLException;
import java.time.LocalDate;

import com.mathify.dao.PaymentDAO;
import com.mathify.dao.SubscriptionDAO;
import com.mathify.model.AuthUser;
import com.mathify.model.Payment;
import com.mathify.model.PaymentStatus;
import com.mathify.model.Plan;
import com.mathify.model.PremiumStudent;
import com.mathify.model.Subscribable;
import com.mathify.service.NotificationService;
import com.mathify.util.MidtransService;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Verifies a Midtrans transaction server-side and grants premium.
 *
 * <p>The browser is redirected here after the Snap popup resolves. We never trust
 * the client's word: the order is re-fetched from Midtrans via
 * {@code CoreApi.checkTransaction}, and only a settled (or accepted capture)
 * status upgrades the student. On success a {@link PremiumStudent} is built and
 * saved via {@link SubscriptionDAO}; the payment row is flipped to PAID.
 */
@WebServlet("/payment/confirm")
public class PaymentConfirmServlet extends HttpServlet {

    private static final Logger log = LoggerFactory.getLogger(PaymentConfirmServlet.class);

    private final PaymentDAO paymentDAO = new PaymentDAO();
    private final SubscriptionDAO subscriptionDAO = new SubscriptionDAO();
    private final NotificationService notificationService = new NotificationService();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        HttpSession session = req.getSession(false);
        AuthUser authUser = (session != null) ? (AuthUser) session.getAttribute("authUser") : null;
        if (authUser == null) {
            resp.sendRedirect(req.getContextPath() + "/login");
            return;
        }

        // The Snap-hosted page's finish redirect appends ?order_id=… (snake_case);
        // our own links use ?orderId=… — accept either.
        String orderId = req.getParameter("orderId");
        if (orderId == null || orderId.isBlank()) {
            orderId = req.getParameter("order_id");
        }
        if (orderId == null || orderId.isBlank()) {
            redirect(req, resp, "failed");
            return;
        }

        try {
            Payment payment = paymentDAO.findByOrderId(orderId);
            // Guard: the order must exist and belong to the logged-in user.
            if (payment == null || !payment.getUid().equals(authUser.uid())) {
                log.warn("Confirm rejected — order={} not found or not owned by uid={}", orderId, authUser.uid());
                redirect(req, resp, "failed");
                return;
            }

            // Idempotent: already granted on a previous return.
            if (payment.getStatus() == PaymentStatus.PAID) {
                markPremiumInSession(session, payment.getPlan());
                redirect(req, resp, "success");
                return;
            }

            // Source of truth: ask Midtrans directly.
            JSONObject status = MidtransService.coreApi().checkTransaction(orderId);
            String transactionStatus = status.optString("transaction_status", "");
            String fraudStatus = status.optString("fraud_status", "");
            log.info("Order={} transaction_status={} fraud_status={}", orderId, transactionStatus, fraudStatus);

            boolean settled = "settlement".equals(transactionStatus)
                    || ("capture".equals(transactionStatus) && "accept".equals(fraudStatus));
            boolean pending = "pending".equals(transactionStatus);

            if (settled) {
                grantPremium(authUser.uid(), payment.getPlan());
                paymentDAO.updateStatus(orderId, PaymentStatus.PAID);
                markPremiumInSession(session, payment.getPlan());
                // Fires exactly once: repeat returns short-circuit at the PAID guard above.
                notificationService.notifyPaymentConfirmed(authUser.uid(), payment.getPlan());
                redirect(req, resp, "success");
            } else if (pending) {
                redirect(req, resp, "pending");
            } else {
                paymentDAO.updateStatus(orderId, PaymentStatus.FAILED);
                notificationService.notifyPaymentFailed(authUser.uid(), payment.getPlan());
                redirect(req, resp, "failed");
            }

        } catch (SQLException e) {
            throw new ServletException("Failed to confirm payment for order=" + orderId, e);
        } catch (Exception e) {
            // Midtrans/network errors: leave the row PENDING so it can be retried.
            log.error("Midtrans verification failed for order={}", orderId, e);
            redirect(req, resp, "pending");
        }
    }

    /** Saves (or extends) the student's premium subscription for the purchased plan. */
    private void grantPremium(String uid, Plan plan) throws SQLException {
        Subscribable existing = subscriptionDAO.find(uid);
        // Stack onto an already-active subscription; otherwise start from today.
        LocalDate base = (existing != null && existing.isActive())
                ? existing.subscriptionExpiry()
                : LocalDate.now();
        PremiumStudent sub = new PremiumStudent(plan.name(), plan.expiryFrom(base));
        subscriptionDAO.save(uid, sub);
        log.info("Premium granted to uid={} plan={} expiry={}", uid, plan, sub.subscriptionExpiry());
    }

    private void markPremiumInSession(HttpSession session, Plan plan) {
        session.setAttribute("premium", Boolean.TRUE);
        session.setAttribute("premiumPlan", plan.name());
    }

    private void redirect(HttpServletRequest req, HttpServletResponse resp, String result)
            throws IOException {
        resp.sendRedirect(req.getContextPath() + "/dashboard?upgrade=" + result);
    }
}
