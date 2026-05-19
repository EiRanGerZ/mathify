/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.mathify.model;

import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author Akari
 */
public class Quiz implements Gradable {

    private String quizId;
    private List<Question> questionsList;
    private float score;

    public Quiz() {

        questionsList = new ArrayList<>();
    }

    public Quiz(String quizId,
                float score) {

        this.quizId = quizId;
        this.score = score;
        questionsList = new ArrayList<>();
    }

    @Override
    public float getScore() {

        return score;
    }

    @Override
    public boolean isPassed() {

        return score >= 75;
    }

    @Override
    public int getTotalQuestions() {

        return questionsList.size();
    }

    public void addQuestion(Question question) {

        questionsList.add(question);
    }

    public String getQuizId() {
        return quizId;
    }

    public void setQuizId(String quizId) {
        this.quizId = quizId;
    }

    public List<Question> getQuestionsList() {
        return questionsList;
    }

    public void setQuestionsList(List<Question> questionsList) {
        this.questionsList = questionsList;
    }

    public void setScore(float score) {
        this.score = score;
    }
}