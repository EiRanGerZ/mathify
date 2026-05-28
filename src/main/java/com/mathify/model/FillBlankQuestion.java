package com.mathify.model;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class FillBlankQuestion implements Question {

    private final QuestionInfo info;

    /**
     * Satu prompt bisa punya lebih dari satu blank, misal: "__ adalah ibu kota
     * __".
     */
    private final List<String> correctAnswers;

    private final boolean caseSensitive;

    public FillBlankQuestion(QuestionInfo info, List<String> correctAnswers, boolean caseSensitive) {
        if (info == null) {
            throw new IllegalArgumentException("info must not be null");
        }
        if (correctAnswers == null || correctAnswers.isEmpty()) {
            throw new IllegalArgumentException("correctAnswers must not be empty");
        }

        this.info = info;
        this.correctAnswers = Collections.unmodifiableList(new ArrayList<>(correctAnswers));
        this.caseSensitive = caseSensitive;
    }

    @Override
    public QuestionInfo getInfo() {
        return info;
    }

    @Override
    public QuestionType getType() {
        return QuestionType.FILL_BLANK;
    }

    public List<String> getCorrectAnswers() {
        return correctAnswers;
    }

    public boolean isCaseSensitive() {
        return caseSensitive;
    }

    /**
     * Evaluasi jawaban student. Semua blank harus diisi dengan benar dan
     * urutannya harus sesuai.
     */
    @Override
    public boolean evaluate(Answer answer) {
        if (!(answer instanceof Answer.FillBlankAnswer fba)) {
            return false;
        }

        List<String> filled = fba.filledValues();
        if (filled.size() != correctAnswers.size()) {
            return false;
        }

        for (int i = 0; i < correctAnswers.size(); i++) {
            String correct = correctAnswers.get(i).trim();
            String submitted = filled.get(i).trim();

            boolean match = caseSensitive
                    ? correct.equals(submitted)
                    : correct.equalsIgnoreCase(submitted);

            if (!match) {
                return false;
            }
        }
        return true;
    }

    @Override
    public String toString() {
        return "FillBlankQuestion{id='" + info.id() + "', blanks=" + correctAnswers.size()
                + ", caseSensitive=" + caseSensitive + '}';
    }
}
