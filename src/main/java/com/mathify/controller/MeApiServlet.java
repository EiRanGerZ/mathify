package com.mathify.controller;

import com.mathify.dao.SubscriptionDAO;
import com.mathify.dao.UserProgressDAO;
import com.mathify.model.AuthUser;
import com.mathify.model.Subscribable;
import com.mathify.model.UserProgress;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.sql.SQLException;

/**
 * Current-user profile endpoint.
 *
 * <pre>
 *   GET /api/me -> {
 *     uid, email, displayName,
 *     progress: { totalXp, level, currentStreak, energy, lastActivity },
 *     stats:    { enrolledCourses, completedCourses, achievements },
 *     premium:  { active, plan, expiry }
 *   }
 * </pre>
 *
 * Reads identity from the session and the rest from the progress / subscription
 * stores. {@code 401} when unauthenticated, {@code 500} on a DB error.
 */
@WebServlet("/api/me")
public class MeApiServlet extends ApiServlet {

    private static final Logger log = LoggerFactory.getLogger(MeApiServlet.class);

    private final UserProgressDAO progressDAO = new UserProgressDAO();
    private final SubscriptionDAO subscriptionDAO = new SubscriptionDAO();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        AuthUser user = authUser(req);
        if (user == null) {
            unauthorized(resp);
            return;
        }

        try {
            // findOrCreate hydrates enrollments + achievements, so the counts below are ready.
            UserProgress progress = progressDAO.findOrCreate(user.uid());
            Subscribable sub = subscriptionDAO.find(user.uid());
            boolean premium = sub != null && sub.isActive();

            JSONObject progressJson = new JSONObject()
                    .put("totalXp", progress.getTotalXP())
                    .put("level", progress.getLevel())
                    .put("currentStreak", progress.getCurrentStreak())
                    .put("energy", progress.getEnergy())
                    .put("lastActivity", progress.getLastActivity() != null
                            ? progress.getLastActivity().toString() : JSONObject.NULL);

            JSONObject statsJson = new JSONObject()
                    .put("enrolledCourses", progress.getCourseEnrollments().size())
                    .put("completedCourses", progress.countCompletedCourses())
                    .put("achievements", progress.getAchievements().size());

            JSONObject premiumJson = new JSONObject()
                    .put("active", premium)
                    .put("plan", premium ? sub.getSubscriptionPlan() : JSONObject.NULL)
                    .put("expiry", (premium && sub.subscriptionExpiry() != null)
                            ? sub.subscriptionExpiry().toString() : JSONObject.NULL);

            JSONObject body = new JSONObject()
                    .put("uid", user.uid())
                    .put("email", user.email())
                    .put("displayName", user.preferredName())
                    .put("progress", progressJson)
                    .put("stats", statsJson)
                    .put("premium", premiumJson);

            writeJson(resp, HttpServletResponse.SC_OK, body);
        } catch (SQLException e) {
            log.error("Failed to load /api/me for uid={}", user.uid(), e);
            serverError(resp);
        }
    }
}
