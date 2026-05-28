package com.mathify.model;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Quiz {

    private String quizId;
    private String title;
    private int passingScore;
    private List<Question> questions;

    public Quiz(String quizId, String title, int passingScore, List<Question> questions) {
        if (quizId == null || quizId.isBlank()) {
            throw new IllegalArgumentException("quizId must not be blank");
        }
        if (title == null || title.isBlank()) {
            throw new IllegalArgumentException("title must not be blank");
        }
        if (passingScore < 0) {
            throw new IllegalArgumentException("passingScore must be >= 0");
        }
        if (questions == null || questions.isEmpty()) {
            throw new IllegalArgumentException("a quiz must have at least one question");
        }

        this.quizId = quizId;
        this.title = title;
        this.passingScore = passingScore;
        this.questions = Collections.unmodifiableList(new ArrayList<>(questions));
    }

    // ── Getters ────────────────────────────────────────────────────────────────
    public String getQuizId() {
        return quizId;
    }

    public String getTitle() {
        return title;
    }

    public int getPassingScore() {
        return passingScore;
    }

    public List<Question> getQuestions() {
        return questions;
    }

    // ── Setters ────────────────────────────────────────────────────────────────
    public void setTitle(String title) {
        if (title == null || title.isBlank()) {
            throw new IllegalArgumentException("title must not be blank");
        }
        this.title = title;
    }

    public void setPassingScore(int passingScore) {
        if (passingScore < 0) {
            throw new IllegalArgumentException("passingScore must be >= 0");
        }
        this.passingScore = passingScore;
    }

    /**
     * Setter untuk questions menggunakan defensive copy — list yang disimpan
     * tidak bisa dimodifikasi dari luar setelah di-set. Ini mencegah bug
     * seperti list di-clear dari luar tanpa sepengetahuan Quiz.
     */
    public void setQuestions(List<Question> questions) {
        if (questions == null || questions.isEmpty()) {
            throw new IllegalArgumentException("questions must not be empty");
        }
        this.questions = Collections.unmodifiableList(new ArrayList<>(questions));
    }

    // ── Business methods ───────────────────────────────────────────────────────
    public int totalPoints() {
        int total = 0;
        for (Question q : questions) {
            total += q.getPoints();
        }
        return total;
    }

    public boolean isPassed(int score) {
        return score >= passingScore;
    }

    @Override
    public String toString() {
        return "Quiz{quizId='" + quizId + "', title='" + title
                + "', passingScore=" + passingScore
                + ", questions=" + questions.size()
                + ", totalPoints=" + totalPoints() + '}';
    }
}
