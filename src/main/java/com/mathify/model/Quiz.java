/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mathify.model;

/**
 *
 * @author ASUS
 */
public class Quiz implements Gradable {
    private String quizId;
    private List<String> questions;

    public Quiz() {
    }

    public Quiz(String quizId,
                List<String> questions) {

        this.quizId = quizId;
        this.questions = questions;
    }

    @Override
    public float getScore() {

        return 85;
    }

    @Override
    public boolean isPassed() {

        return getScore() >= 75;
    }

    // Getter Setter
    public String getQuizId() {
        return quizId;
    }

    public void setQuizId(String quizId) {
        this.quizId = quizId;
    }

    public List<String> getQuestions() {
        return questions;
    }

    public void setQuestions(List<String> questions) {
        this.questions = questions;
    }
}
