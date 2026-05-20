/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mathify.model;

import java.util.List;

/**
 *
 * @author Akari
 */
public abstract class Question {
    private String questionId;
    private String questionText;
    private int difficulty;
    private String imageUrl;
    private String explanation;
    private String hint;

    public Question() {
    }

    public Question(String questionId,
                    String questionText,
                    List<String> options,
                    String correctAnswer,
                    String explanation,
                    int difficulty) {

        this.questionId = questionId;
        this.questionText = questionText;
        this.options = options;
        this.correctAnswer = correctAnswer;
        this.explanation = explanation;
        this.difficulty = difficulty;
    }
  
    public abstract boolean checkAnswer(String answer)

    // Getter Setter
    public String getQuestionId() {
        return questionId;
    }

    public void setQuestionId(String questionId) {
        this.questionId = questionId;
    }

    public String getQuestionText() {
        return questionText;
    }

    public void setQuestionText(String questionText) {
        this.questionText = questionText;
    }

    public String getExplanation() {
        return explanation;
    }

    public void setExplanation(String explanation) {
        this.explanation = explanation;
    }

    public int getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(int difficulty) {
        this.difficulty = difficulty;
    }
}
