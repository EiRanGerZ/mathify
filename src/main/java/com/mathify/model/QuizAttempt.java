package com.mathify.model;
import java.time.LocalDateTime;

public record QuizAttempt(String quizId, int score, LocalDateTime completedAt) {
    public QuizAttempt {
        if (score < 0) {
            throw new IllegalArgumentException("Score tidak boleh negatif: " + score);
        }
        if (quizId == null || quizId.isBlank()) {
            throw new IllegalArgumentException("quizId tidak boleh kosong.");
        }
    }

    public boolean isPassed(int passingScore) {
        return score >= passingScore;
    }
}
