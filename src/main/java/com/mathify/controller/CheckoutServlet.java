package com.mathify.controller;

import java.io.IOException;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import com.mathify.dao.PaymentDAO;
import com.mathify.model.AuthUser;
import com.mathify.model.Payment;
import com.mathify.model.PaymentStatus;
import com.mathify.model.Plan;
import com.mathify.util.MidtransService;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * Starts a Midtrans Snap checkout for a premium upgrade and redirects the browser
 * straight to the Midtrans-hosted payment page — there is no intermediate checkout
 * page of our own.
 *
 * <p>Access requires a student session (enforced by {@code AuthFilter}). The order
 * is tied to the logged-in uid and the chosen {@link Plan} (?plan=MONTHLY|ANNUAL)
 * and persisted as a PENDING {@link Payment}. A Snap transaction is created with a
 * {@code callbacks.finish} URL pointing back at {@code /payment/confirm}; premium is
 * <strong>not</strong> granted here — that only happens after
 * {@code PaymentConfirmServlet} verifies the transaction with Midtrans on return.
 */
@WebServlet("/checkout")
public class CheckoutServlet extends HttpServlet {

    private static final Logger log = LoggerFactory.getLogger(CheckoutServlet.class);

    private final PaymentDAO paymentDAO = new PaymentDAO();

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        HttpSession session = request.getSession(false);
        AuthUser authUser = (session != null) ? (AuthUser) session.getAttribute("authUser") : null;
        if (authUser == null) {
            response.sendRedirect(request.getContextPath() + "/login");
            return;
        }

        Plan plan = Plan.fromString(request.getParameter("plan"));
        int grossAmount = plan.priceIdr();
        String orderId = "MTF-" + UUID.randomUUID().toString().substring(0, 12).toUpperCase();

        try {
            // Persist the attempt up front so the order id is recoverable on return.
            paymentDAO.insertPending(new Payment(orderId, authUser.uid(), plan, grossAmount, PaymentStatus.PENDING));

            Map<String, Object> transactionDetails = new HashMap<>();
            transactionDetails.put("order_id", orderId);
            transactionDetails.put("gross_amount", grossAmount);

            Map<String, Object> itemDetails = new HashMap<>();
            itemDetails.put("id", "premium-" + plan.name().toLowerCase());
            itemDetails.put("price", grossAmount);
            itemDetails.put("quantity", 1);
            itemDetails.put("name", "Mathify Premium (" + plan.name() + ")");

            Map<String, Object> customerDetails = new HashMap<>();
            customerDetails.put("first_name", authUser.preferredName());
            customerDetails.put("email", authUser.email());

            // After the hosted payment resolves, Midtrans redirects the browser back
            // here (with ?order_id=…) so we can verify server-side and grant premium.
            Map<String, Object> callbacks = new HashMap<>();
            callbacks.put("finish", absoluteUrl(request, "/payment/confirm"));

            Map<String, Object> params = new HashMap<>();
            params.put("transaction_details", transactionDetails);
            params.put("item_details", List.of(itemDetails));
            params.put("customer_details", customerDetails);
            params.put("callbacks", callbacks);

            // Snap "redirect" mode: hand back the URL of the Midtrans-hosted page and
            // bounce the user straight to it (sandbox vs production is driven by the
            // configured environment in MidtransService).
            String redirectUrl = MidtransService.snapApi().createTransactionRedirectUrl(params);
            response.sendRedirect(redirectUrl);

        } catch (SQLException e) {
            log.error("Failed to persist payment for uid={} order={}", authUser.uid(), orderId, e);
            response.sendRedirect(request.getContextPath() + "/premium?error=checkout");
        } catch (Exception e) {
            log.error("Midtrans checkout creation failed for order={}", orderId, e);
            response.sendRedirect(request.getContextPath() + "/premium?error=payment");
        }
    }

    /** Builds an absolute URL (scheme://host[:port]/context + path) for Midtrans callbacks. */
    private String absoluteUrl(HttpServletRequest req, String path) {
        String scheme = req.getScheme();
        int port = req.getServerPort();
        boolean defaultPort = ("http".equals(scheme) && port == 80) || ("https".equals(scheme) && port == 443);
        String host = req.getServerName() + (defaultPort ? "" : ":" + port);
        return scheme + "://" + host + req.getContextPath() + path;
    }
}
