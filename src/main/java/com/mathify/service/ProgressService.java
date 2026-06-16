package com.mathify.service;

import com.mathify.dao.AchievementDAO;
import com.mathify.dao.ChapterDAO;
import com.mathify.dao.ChapterProgressDAO;
import com.mathify.dao.CourseDAO;
import com.mathify.dao.CourseEnrollmentDAO;
import com.mathify.dao.QuizAttemptDAO;
import com.mathify.dao.UserAchievementDAO;
import com.mathify.dao.UserProgressDAO;
import com.mathify.model.Achievement;
import com.mathify.model.Chapter;
import com.mathify.model.ChapterProgress;
import com.mathify.model.Course;
import com.mathify.model.CourseEnrollment;
import com.mathify.model.QuizAttempt;
import com.mathify.model.UserProgress;

import java.sql.SQLException;
import java.time.Duration;
import java.time.LocalDateTime;
import java.time.LocalDate;
import java.util.List;
import java.util.AbstractMap;

public class ProgressService {

    private final UserProgressDAO progressDAO = new UserProgressDAO();
    private final QuizAttemptDAO quizAttemptDAO = new QuizAttemptDAO();
    private final ChapterProgressDAO chapterProgressDAO = new ChapterProgressDAO();
    private final CourseEnrollmentDAO courseEnrollmentDAO = new CourseEnrollmentDAO();
    private final UserAchievementDAO userAchievementDAO = new UserAchievementDAO();
    private final AchievementDAO achievementDAO = new AchievementDAO();
    private final ChapterDAO chapterDAO = new ChapterDAO();
    private final CourseDAO courseDAO = new CourseDAO();
    private final NotificationService notificationService = new NotificationService();

    public ProgressService() {
        // Proactively seed achievements if catalog is empty
        try {
            if (achievementDAO.findAll().isEmpty()) {
                achievementDAO.seedCatalog();
            }
        } catch (SQLException e) {
            // Log or ignore for now, to prevent crashing startup
        }
    }

    /**
     * Records a quiz attempt, checks for streak updates, levels, achievements,
     * and evaluates if the parent chapter is completed as a result.
     */
    public void recordQuizAttempt(String uid, String quizId, int score, UserProgress progress) throws SQLException {
        // Decrement energy by 1
        progress.decrementEnergy(1);

        // Record the attempt in DB
        QuizAttempt attempt = new QuizAttempt(quizId, score, LocalDateTime.now());
        quizAttemptDAO.record(uid, attempt);

        // Update local memory progress
        progress.recordQuizAttempt(attempt);

        // Update level and streak
        progress.updateStreak();
        maybeLevelUp(uid, progress);

        // Save progress to DB
        progressDAO.save(uid, progress);

        // Evaluate achievements
        evaluateAndAwardAchievements(uid, progress);
    }

    /**
     * Completes a chapter, updates the streak/last_activity, awards XP/levels,
     * evaluates achievements, and checks for course completion.
     */
    public void completeChapter(String uid, String chapterId, Duration timeSpent, UserProgress progress)
            throws SQLException {
        // Record chapter progress in DB
        ChapterProgress cp = new ChapterProgress(chapterId, LocalDateTime.now(), timeSpent);
        chapterProgressDAO.save(uid, cp);

        // Update local memory progress
        progress.completeChapter(chapterId, timeSpent);

        // Award Chapter XP reward
        Chapter chapter = chapterDAO.findById(chapterId);
        if (chapter != null) {
            progress.addXP(chapter.getXpReward());
        }

        // Update level and streak
        progress.updateStreak();
        maybeLevelUp(uid, progress);

        // Save progress to DB
        progressDAO.save(uid, progress);

        // Evaluate achievements
        evaluateAndAwardAchievements(uid, progress);

        // Check if course is completed
        if (chapter != null) {
            String courseId = chapterDAO.findCourseIdByChapterId(chapterId);
            if (courseId != null) {
                checkAndCompleteCourse(uid, courseId, progress);
            }
        }
    }

    /**
     * Checks if all chapters in a course are completed, and if so, marks the course
     * complete,
     * awards course completion XP/levels, and evaluates achievements.
     */
    public void checkAndCompleteCourse(String uid, String courseId, UserProgress progress) throws SQLException {
        // Find all chapters for this course
        List<Chapter> chapters = chapterDAO.findByCourse(courseId);
        if (chapters.isEmpty()) {
            return;
        }

        // Check if all chapters have a completion entry
        boolean allCompleted = true;
        for (Chapter ch : chapters) {
            if (!progress.hasCompletedChapter(ch.getId())) {
                allCompleted = false;
                break;
            }
        }

        if (allCompleted) {
            // Mark complete in DB
            courseEnrollmentDAO.markCompleted(uid, courseId);

            // Update local memory progress
            progress.completeCourse(courseId);

            // Award course XP reward
            Course course = courseDAO.findCourse(courseId);
            if (course != null) {
                var card = courseDAO.findById(courseId);
                int xp = card != null ? card.getXpReward() : 100;
                progress.addXP(xp);
            }

            // Update level
            maybeLevelUp(uid, progress);

            // Save progress to DB
            progressDAO.save(uid, progress);

            // Evaluate achievements
            evaluateAndAwardAchievements(uid, progress);
        }
    }

    /**
     * Evaluates achievements criteria and awards them to the user.
     */
    public void evaluateAndAwardAchievements(String uid, UserProgress progress) throws SQLException {
        // Rule 1: first_steps (enroll in first course)
        if (!progress.hasAchievement("first_steps") && !progress.getCourseEnrollments().isEmpty()) {
            awardAchievement(uid, "first_steps", progress);
        }

        // Rule 2: quiz_master (pass any quiz with perfect score)
        if (!progress.hasAchievement("quiz_master")) {
            boolean perfectAttempt = progress.getQuizAttempts().values().stream()
                    .anyMatch(qa -> qa.score() >= 100);
            if (perfectAttempt) {
                awardAchievement(uid, "quiz_master", progress);
            }
        }

        // Rule 3: streak_3 (maintain a 3-day streak)
        if (!progress.hasAchievement("streak_3") && progress.getCurrentStreak() >= 3) {
            awardAchievement(uid, "streak_3", progress);
        }

        // Rule 4: high_achiever (earn a total of 1000 XP)
        if (!progress.hasAchievement("high_achiever") && progress.getTotalXP() >= 1000) {
            awardAchievement(uid, "high_achiever", progress);
        }
    }

    private void awardAchievement(String uid, String achievementId, UserProgress progress) throws SQLException {
        // Record in join table
        userAchievementDAO.award(uid, achievementId);

        // Load details and hydrate memory progress
        Achievement achievement = achievementDAO.findById(achievementId);
        if (achievement != null) {
            progress.completeAchievement(achievement);
            notificationService.notifyAchievement(uid, achievement);
        }
    }

    /**
     * Recomputes the user's level from total XP; on an increase, applies the new
     * level and emits a level-up notification. Centralizes logic that was
     * previously duplicated across recordQuizAttempt / completeChapter /
     * checkAndCompleteCourse.
     */
    private void maybeLevelUp(String uid, UserProgress progress) {
        int newLevel = (progress.getTotalXP() / 500) + 1;
        if (newLevel > progress.getLevel()) {
            progress.addLevel(newLevel - progress.getLevel());
            notificationService.notifyLevelUp(uid, newLevel);
        }
    }
}
