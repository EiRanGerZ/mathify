package com.mathify.model;
import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

public class UserProgress {
    private final String studentId;
    private int totalXP;
    private int level;
    private int currentStreak;

    private final Map<String, AbstractMap.SimpleEntry<Achievement, LocalDateTime>> achievements;
    private final Map<String, CourseEnrollment> courseEnrollments;
    private final Map<String, ChapterProgress> chapterProgress;
    private final Map<String, List<QuizAttempt>> quizAttempts;

    //Constructor
    public UserProgress(String studentId) {
        this.studentId         = studentId;
        this.totalXP           = 0;
        this.level             = 1;
        this.currentStreak     = 0;
        this.achievements      = new LinkedHashMap<>();
        this.courseEnrollments = new LinkedHashMap<>();
        this.chapterProgress   = new LinkedHashMap<>();
        this.quizAttempts      = new LinkedHashMap<>();
    }

    //Getter
    public String getStudentId() {
        return studentId;
    }

    public int getTotalXP() {
        return totalXP;
    }

    public int getLevel() {
        return level;
    }

    public int getCurrentStreak() {
        return currentStreak;
    }

    public void addXP(int amount) {
        if (amount <= 0) throw new IllegalArgumentException("XP yang ditambahkan harus lebih dari 0.");
        this.totalXP += amount;
    }

    public void addLevel(int amount) {
        if (amount <= 0) throw new IllegalArgumentException("Level yang ditambahkan harus lebih dari 0.");
        this.level += amount;
    }

    // Gamification — Streak
    public void addStreak(int amount) {
        if (amount <= 0) throw new IllegalArgumentException("Streak yang ditambahkan harus lebih dari 0.");
        this.currentStreak += amount;
    }

    public void resetStreak() {
        this.currentStreak = 0;
    }

    public boolean hasActivityToday() {
        LocalDate today = LocalDate.now();
        return chapterProgress.values().stream()
                .filter(ChapterProgress::isCompleted)
                .anyMatch(cp -> cp.completedAt() != null &&
                        cp.completedAt().toLocalDate().equals(today));
    }

    // Gamification — Achievement
    public void completeAchievement(Achievement achievement) {
        if (achievement == null) throw new IllegalArgumentException("Achievement tidak boleh null.");
        achievements.putIfAbsent(
                achievement.getId(),
                new AbstractMap.SimpleEntry<>(achievement, LocalDateTime.now())
        );
    }

    public boolean hasAchievement(String achievementId) {
        return achievements.containsKey(achievementId);
    }

    public List<AbstractMap.SimpleEntry<Achievement, LocalDateTime>> getAchievements() {
        return new ArrayList<>(achievements.values());
    }

    // Progress Tracking — Course
    public void enrollCourse(String courseId) {
        courseEnrollments.putIfAbsent(courseId, new CourseEnrollment(courseId, LocalDateTime.now(), null));
    }

    public void completeCourse(String courseId) {
        CourseEnrollment enrollment = courseEnrollments.get(courseId);
        if (enrollment == null) {
            throw new IllegalStateException("User belum terdaftar di course: " + courseId);
        }
    }
}
