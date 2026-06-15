package com.mathify.dao;

import com.mathify.model.Admin;
import com.mathify.util.QueryHelper;

import java.sql.SQLException;
import java.sql.Timestamp;

/**
 * CRUD for backoffice {@code admins}. Unlike students, admins are not Firebase-backed;
 * their id is the {@code Admin}'s generated {@code userId}.
 *
 * <p>Reconstruction uses {@code Admin(id, name, email, role)} so a loaded admin keeps
 * its stored {@code admin_id} (i.e. {@code getUserId()} matches the DB row).
 */
public class AdminDAO {

    /** Inserts a new admin or updates name/role/last-login if the id already exists. */
    public void upsert(Admin admin) throws SQLException {
        String sql = """
                INSERT INTO admins (admin_id, name, email, role, last_login_at)
                VALUES (CAST(? AS UUID), ?, ?, ?, ?)
                ON CONFLICT (admin_id) DO UPDATE
                  SET name          = EXCLUDED.name,
                      email         = EXCLUDED.email,
                      role          = EXCLUDED.role,
                      last_login_at = EXCLUDED.last_login_at
                """;
        QueryHelper.executeUpdate(sql,
                admin.getUserId(),
                admin.getName(),
                admin.getEmail(),
                admin.getRole().name(),
                admin.getLastLoginAt());
    }

    public Admin findByEmail(String email) throws SQLException {
        String sql = "SELECT * FROM admins WHERE email = ?";
        return QueryHelper.queryOne(sql, AdminDAO::map, email);
    }

    public void delete(String adminId) throws SQLException {
        QueryHelper.executeUpdate("DELETE FROM admins WHERE admin_id = CAST(? AS UUID)", adminId);
    }

    static Admin map(java.sql.ResultSet rs) throws SQLException {
        Admin admin = new Admin(
                rs.getString("admin_id"),
                rs.getString("name"),
                rs.getString("email"),
                Admin.Role.valueOf(rs.getString("role")));
        Timestamp lastLogin = rs.getTimestamp("last_login_at");
        if (lastLogin != null) {
            admin.setLastLoginAt(lastLogin.toLocalDateTime());
        }
        return admin;
    }
}
