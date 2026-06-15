package com.mathify.dao;

import com.mathify.model.Course;
import com.mathify.util.DBConnection;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class CourseDAO {

    public List<Course> findAll() throws SQLException {
        String sql = "SELECT * FROM courses ORDER BY level_num, id";
        List<Course> list = new ArrayList<>();
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {
            while (rs.next()) {
                list.add(map(rs));
            }
        }
        return list;
    }

    public Course findById(int id) throws SQLException {
        String sql = "SELECT * FROM courses WHERE id = ?";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, id);
            try (ResultSet rs = ps.executeQuery()) {
                return rs.next() ? map(rs) : null;
            }
        }
    }

    private Course map(ResultSet rs) throws SQLException {
        Course c = new Course();
        c.setId(rs.getInt("id"));
        c.setTitle(rs.getString("title"));
        c.setDescription(rs.getString("description"));
        c.setTrack(rs.getString("track"));
        c.setLevelNum(rs.getInt("level_num"));
        c.setColor(rs.getString("color"));
        c.setGlyph(rs.getString("glyph"));
        c.setTotalLessons(rs.getInt("total_lessons"));
        c.setEstimatedHours(rs.getString("estimated_hours"));
        c.setXpReward(rs.getInt("xp_reward"));
        c.setStatus(rs.getString("status"));
        return c;
    }
}
