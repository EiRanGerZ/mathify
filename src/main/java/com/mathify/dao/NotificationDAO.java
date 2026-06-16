package com.mathify.dao;

import com.mathify.model.Notification;
import com.mathify.model.NotificationType;
import com.mathify.util.QueryHelper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

/** CRUD for the {@code notifications} table — the per-user in-app feed. */
public class NotificationDAO {

    /**
     * Inserts a new notification for a user. The icon is derived from the type so
     * callers only supply the human-readable parts.
     */
    public void create(String uid, NotificationType type, String title, String body, String link)
            throws SQLException {
        String sql = """
                INSERT INTO notifications (uid, type, title, body, icon, link)
                VALUES (?, ?, ?, ?, ?, ?)
                """;
        QueryHelper.executeUpdate(sql, uid, type.name(), title, body, type.icon(), link);
    }

    /** Most recent notifications for a user, newest first, capped at {@code limit}. */
    public List<Notification> findRecentByUser(String uid, int limit) throws SQLException {
        String sql = """
                SELECT notification_id, type, title, body, icon, link, is_read, created_at
                FROM   notifications
                WHERE  uid = ?
                ORDER  BY created_at DESC
                LIMIT  ?
                """;
        return QueryHelper.queryList(sql, NotificationDAO::map, uid, limit);
    }

    /** Number of unread notifications for a user. */
    public int countUnread(String uid) throws SQLException {
        String sql = "SELECT COUNT(*) FROM notifications WHERE uid = ? AND is_read = FALSE";
        Integer n = QueryHelper.queryOne(sql, rs -> rs.getInt(1), uid);
        return n != null ? n : 0;
    }

    /**
     * Marks one notification read. The {@code uid} guard ensures a user can only
     * touch their own rows. Returns rows affected (0 if not found / not owned).
     */
    public int markRead(String uid, String notificationId) throws SQLException {
        String sql = "UPDATE notifications SET is_read = TRUE WHERE notification_id = ?::uuid AND uid = ?";
        return QueryHelper.executeUpdate(sql, notificationId, uid);
    }

    /** Marks all of a user's unread notifications read. Returns rows affected. */
    public int markAllRead(String uid) throws SQLException {
        String sql = "UPDATE notifications SET is_read = TRUE WHERE uid = ? AND is_read = FALSE";
        return QueryHelper.executeUpdate(sql, uid);
    }

    static Notification map(ResultSet rs) throws SQLException {
        return new Notification(
                rs.getString("notification_id"),
                rs.getString("type"),
                rs.getString("title"),
                rs.getString("body"),
                rs.getString("icon"),
                rs.getString("link"),
                rs.getBoolean("is_read"),
                rs.getTimestamp("created_at").toLocalDateTime());
    }
}
