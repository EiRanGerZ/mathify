package com.mathify.service;

import com.mathify.dao.NotificationDAO;
import com.mathify.model.Achievement;
import com.mathify.model.NotificationType;
import com.mathify.model.Plan;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.SQLException;

/**
 * Single entry point for emitting in-app notifications. Domain code
 * ({@link ProgressService}, payment confirmation) calls these methods when an
 * event worth surfacing happens.
 *
 * <p>Every method <b>logs and swallows</b> any {@link SQLException}: a failure to
 * record a notification must never break the primary action that triggered it
 * (awarding XP, granting premium). This mirrors the app's "log but don't abort"
 * style used at startup.
 */
public class NotificationService {

    private static final Logger log = LoggerFactory.getLogger(NotificationService.class);

    /** Where a notification points when clicked — the student dashboard for all kinds today. */
    private static final String DASHBOARD_LINK = "/dashboard";

    private final NotificationDAO dao = new NotificationDAO();

    /** A new achievement was earned. */
    public void notifyAchievement(String uid, Achievement achievement) {
        create(uid, NotificationType.ACHIEVEMENT,
                "Achievement unlocked",
                achievement != null ? achievement.getTitle() : "You earned a new badge!");
    }

    /** The user crossed into a new level. */
    public void notifyLevelUp(String uid, int newLevel) {
        create(uid, NotificationType.LEVEL_UP,
                "Level up!",
                "You reached Level " + newLevel + ". Keep the momentum going.");
    }

    /** A subscription payment settled and premium was granted. */
    public void notifyPaymentConfirmed(String uid, Plan plan) {
        create(uid, NotificationType.PAYMENT_CONFIRMED,
                "Premium active",
                "Your " + label(plan) + " subscription is now active. Enjoy Mathify Premium!");
    }

    /** A subscription payment did not complete. */
    public void notifyPaymentFailed(String uid, Plan plan) {
        create(uid, NotificationType.PAYMENT_FAILED,
                "Payment not completed",
                "Your " + label(plan) + " payment didn't go through. You have not been charged — try again anytime.");
    }

    // -------------------------------------------------------------------------

    private void create(String uid, NotificationType type, String title, String body) {
        try {
            dao.create(uid, type, title, body, DASHBOARD_LINK);
        } catch (SQLException e) {
            // Never let a notification failure bubble up into the core flow.
            log.error("Failed to create {} notification for uid={}: {}", type, uid, e.getMessage());
        }
    }

    /** Title-cases a plan name for display, e.g. MONTHLY -> "Monthly". */
    private static String label(Plan plan) {
        if (plan == null) return "premium";
        String n = plan.name().toLowerCase();
        return Character.toUpperCase(n.charAt(0)) + n.substring(1);
    }
}
