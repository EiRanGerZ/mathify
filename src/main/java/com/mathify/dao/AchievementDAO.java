package com.mathify.dao;

import com.mathify.model.Achievement;
import com.mathify.util.QueryHelper;

import java.sql.SQLException;
import java.util.List;

/** CRUD for the {@code achievements} catalog table. */
public class AchievementDAO {

    /** Inserts a new achievement, or updates title/category/requirement if the id exists. */
    public void upsert(Achievement a) throws SQLException {
        String sql = """
                INSERT INTO achievements (achievement_id, title, category, requirement)
                VALUES (?, ?, ?, ?)
                ON CONFLICT (achievement_id) DO UPDATE
                  SET title       = EXCLUDED.title,
                      category    = EXCLUDED.category,
                      requirement = EXCLUDED.requirement
                """;
        QueryHelper.executeUpdate(sql, a.getId(), a.getTitle(), a.getCategory(), a.getRequirement());
    }

    public Achievement findById(String achievementId) throws SQLException {
        String sql = "SELECT * FROM achievements WHERE achievement_id = ?";
        return QueryHelper.queryOne(sql, AchievementDAO::map, achievementId);
    }

    public List<Achievement> findAll() throws SQLException {
        return QueryHelper.queryList("SELECT * FROM achievements ORDER BY category, title", AchievementDAO::map);
    }

    public void delete(String achievementId) throws SQLException {
        QueryHelper.executeUpdate("DELETE FROM achievements WHERE achievement_id = ?", achievementId);
    }

    static Achievement map(java.sql.ResultSet rs) throws SQLException {
        return new Achievement(
                rs.getString("achievement_id"),
                rs.getString("title"),
                rs.getString("category"),
                rs.getString("requirement"));
    }

    public void seedCatalog() throws SQLException {
        upsert(new Achievement("first_steps", "First Steps", "Learning", "Enroll in your first course"));
        upsert(new Achievement("quiz_master", "Quiz Master", "Quiz", "Pass any quiz with a perfect score"));
        upsert(new Achievement("streak_3", "On Fire", "Streak", "Maintain a 3-day learning streak"));
        upsert(new Achievement("high_achiever", "High Achiever", "XP", "Earn a total of 1000 XP"));
    }
}
