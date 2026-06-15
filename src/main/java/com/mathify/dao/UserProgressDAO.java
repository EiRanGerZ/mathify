package com.mathify.dao;

import com.mathify.model.UserProgress;
import com.mathify.util.DBConnection;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class UserProgressDAO {

    /**
     * Returns the persisted progress for the given uid.
     * If no row exists yet, inserts a default row and returns a fresh UserProgress.
     */
    public UserProgress findOrCreate(String uid) throws SQLException {
        String select = """
                SELECT total_xp, level, current_streak
                FROM   user_progress
                WHERE  uid = ?
                """;
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(select)) {
            ps.setString(1, uid);
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    return new UserProgress(uid,
                            rs.getInt("total_xp"),
                            rs.getInt("level"),
                            rs.getInt("current_streak"));
                }
            }
        }
        // First login — create default progress row
        String insert = """
                INSERT INTO user_progress (uid)
                VALUES (?)
                ON CONFLICT (uid) DO NOTHING
                """;
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(insert)) {
            ps.setString(1, uid);
            ps.executeUpdate();
        }
        return new UserProgress(uid);
    }

    /** Persists XP, level, and streak back to the database. */
    public void save(String uid, UserProgress up) throws SQLException {
        String sql = """
                INSERT INTO user_progress (uid, total_xp, level, current_streak, updated_at)
                VALUES (?, ?, ?, ?, NOW())
                ON CONFLICT (uid) DO UPDATE
                  SET total_xp       = EXCLUDED.total_xp,
                      level          = EXCLUDED.level,
                      current_streak = EXCLUDED.current_streak,
                      updated_at     = NOW()
                """;
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, uid);
            ps.setInt(2, up.getTotalXP());
            ps.setInt(3, up.getLevel());
            ps.setInt(4, up.getCurrentStreak());
            ps.executeUpdate();
        }
    }
}
