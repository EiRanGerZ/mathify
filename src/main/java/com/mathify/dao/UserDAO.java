package com.mathify.dao;

import com.mathify.model.AuthUser;
import com.mathify.util.DBConnection;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class UserDAO {

    /**
     * Inserts a new user row or updates name/email if the uid already exists.
     * Called on every successful login to keep the record fresh.
     */
    public void upsert(AuthUser user) throws SQLException {
        String sql = """
                INSERT INTO users (uid, email, display_name)
                VALUES (?, ?, ?)
                ON CONFLICT (uid) DO UPDATE
                  SET email        = EXCLUDED.email,
                      display_name = EXCLUDED.display_name
                """;
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, user.uid());
            ps.setString(2, user.email());
            ps.setString(3, user.displayName());
            ps.executeUpdate();
        }
    }
}
