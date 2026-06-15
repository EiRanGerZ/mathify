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
    private final Map<String, QuizAttempt> quizAttempts;

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

    /** Convenience constructor for loading persisted values from the database. */
    public UserProgress(String studentId, int totalXP, int level, int currentStreak) {
        this(studentId);
        this.totalXP       = totalXP;
        this.level         = level;
        this.currentStreak = currentStreak;
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
        if (!enrollment.isCompleted()) {
            courseEnrollments.put(courseId, enrollment.markAsCompleted());
        }
    }

    public boolean hasCompletedCourse(String courseId) {
        CourseEnrollment enrollment = courseEnrollments.get(courseId);
        return enrollment != null && enrollment.isCompleted();
    }

    public CourseEnrollment getCourseEnrollment(String courseId) {
        return courseEnrollments.get(courseId);
    }

    public long countCompletedCourses() {
        return courseEnrollments.values().stream()
                .filter(CourseEnrollment::isCompleted)
                .count();
    }

    // Progress Tracking — Chapter
    public void completeChapter(String chapterId, Duration timeSpent) {
        if (timeSpent == null) timeSpent = Duration.ZERO;
        ChapterProgress existing = chapterProgress.get(chapterId);
        if (existing == null) {
            chapterProgress.put(chapterId, new ChapterProgress(chapterId, LocalDateTime.now(), timeSpent));
        } else if (!existing.isCompleted()) {
            chapterProgress.put(chapterId, existing.markAsCompleted(timeSpent));
        }
    }

    public boolean hasCompletedChapter(String chapterId) {
        ChapterProgress cp = chapterProgress.get(chapterId);
        return cp != null && cp.isCompleted();
    }

    public ChapterProgress getChapterProgress(String chapterId) {
        return chapterProgress.get(chapterId);
    }

    // Progress Tracking — Quiz
    public void recordQuizAttempt(QuizAttempt attempt) {
        if (attempt == null) throw new IllegalArgumentException("Quiz attempt tidak boleh null.");
        QuizAttempt existing = quizAttempts.get(attempt.quizId());
        // Keep the best score per quiz.
        if (existing == null || attempt.score() > existing.score()) {
            quizAttempts.put(attempt.quizId(), attempt);
        }
    }

    public boolean hasAttemptedQuiz(String quizId) {
        return quizAttempts.containsKey(quizId);
    }

    public QuizAttempt getQuizAttempt(String quizId) {
        return quizAttempts.get(quizId);
    }

    public boolean hasPassedQuiz(String quizId, int passingScore) {
        QuizAttempt attempt = quizAttempts.get(quizId);
        return attempt != null && attempt.isPassed(passingScore);
    }

    public double averageQuizScore() {
        return quizAttempts.values().stream()
                .mapToInt(QuizAttempt::score)
                .average()
                .orElse(0.0);
    }
}
