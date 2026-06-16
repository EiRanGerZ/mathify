package com.mathify.controller;

import com.mathify.dao.NotificationDAO;
import com.mathify.model.AuthUser;
import com.mathify.model.Notification;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.json.JSONArray;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

/**
 * JSON feed behind the dashboard notification bell.
 *
 * <pre>
 *   GET  /notifications   -> { "unread": N, "items": [ {id,type,title,body,icon,link,read,createdAt}, ... ] }
 *   POST /notifications   -> action=markAllRead
 *                         -> action=markRead & id=&lt;uuid&gt;
 *                            returns { "ok": true, "unread": N }
 * </pre>
 *
 * <p>Self-checks the session and returns {@code 401} (rather than the 302-to-login
 * that {@code AuthFilter} would issue) so a {@code fetch()} receives parseable JSON
 * instead of the login page. The bell only renders for an authenticated student,
 * so this is belt-and-suspenders.
 */
@WebServlet("/notifications")
public class NotificationServlet extends HttpServlet {

    private static final Logger log = LoggerFactory.getLogger(NotificationServlet.class);
    private static final int FEED_LIMIT = 20;

    private final NotificationDAO notificationDAO = new NotificationDAO();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        String uid = uid(req);
        if (uid == null) {
            unauthorized(resp);
            return;
        }

        try {
            List<Notification> items = notificationDAO.findRecentByUser(uid, FEED_LIMIT);
            int unread = notificationDAO.countUnread(uid);

            JSONArray arr = new JSONArray();
            for (Notification n : items) {
                arr.put(new JSONObject()
                        .put("id", n.id())
                        .put("type", n.type())
                        .put("title", n.title())
                        .put("body", n.body() != null ? n.body() : "")
                        .put("icon", n.icon() != null ? n.icon() : "Bell")
                        .put("link", n.link() != null ? n.link() : "")
                        .put("read", n.read())
                        .put("createdAt", n.createdAt() != null ? n.createdAt().toString() : ""));
            }
            writeJson(resp, HttpServletResponse.SC_OK,
                    new JSONObject().put("unread", unread).put("items", arr));
        } catch (SQLException e) {
            log.error("Failed to load notifications for uid={}", uid, e);
            writeJson(resp, HttpServletResponse.SC_INTERNAL_SERVER_ERROR,
                    new JSONObject().put("error", "server_error"));
        }
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        String uid = uid(req);
        if (uid == null) {
            unauthorized(resp);
            return;
        }

        String action = req.getParameter("action");
        try {
            if ("markAllRead".equals(action)) {
                notificationDAO.markAllRead(uid);
            } else if ("markRead".equals(action)) {
                String id = req.getParameter("id");
                if (id == null || id.isBlank()) {
                    writeJson(resp, HttpServletResponse.SC_BAD_REQUEST,
                            new JSONObject().put("error", "missing_id"));
                    return;
                }
                notificationDAO.markRead(uid, id);
            } else {
                writeJson(resp, HttpServletResponse.SC_BAD_REQUEST,
                        new JSONObject().put("error", "unknown_action"));
                return;
            }
            writeJson(resp, HttpServletResponse.SC_OK,
                    new JSONObject().put("ok", true).put("unread", notificationDAO.countUnread(uid)));
        } catch (SQLException e) {
            log.error("Failed to update notifications for uid={}", uid, e);
            writeJson(resp, HttpServletResponse.SC_INTERNAL_SERVER_ERROR,
                    new JSONObject().put("error", "server_error"));
        }
    }

    private static String uid(HttpServletRequest req) {
        HttpSession session = req.getSession(false);
        AuthUser authUser = (session != null) ? (AuthUser) session.getAttribute("authUser") : null;
        return authUser != null ? authUser.uid() : null;
    }

    private static void unauthorized(HttpServletResponse resp) throws IOException {
        writeJson(resp, HttpServletResponse.SC_UNAUTHORIZED,
                new JSONObject().put("error", "unauthenticated"));
    }

    private static void writeJson(HttpServletResponse resp, int status, JSONObject body) throws IOException {
        resp.setStatus(status);
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");
        resp.getWriter().write(body.toString());
    }
}
