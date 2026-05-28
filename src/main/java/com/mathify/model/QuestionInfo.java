package com.mathify.model;

public record QuestionInfo(String id, String prompt, int points) {

    public QuestionInfo {
        if (id == null || id.isBlank()) {
            throw new IllegalArgumentException("id must not be blank");
        }
        if (prompt == null || prompt.isBlank()) {
            throw new IllegalArgumentException("prompt must not be blank");
        }
        if (points < 0) {
            throw new IllegalArgumentException("points must be >= 0");
        }
    }
}
