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
public class Chapter {
    private String lessonId;
    private String title;
    private String description;
    private int xpReward;

    private List<Chapter> prerequisite;
    private List<LearningModule> modules;
    private List<Quiz> quizzes;

    public Chapter() {

        prerequisite = new ArrayList<>();
        modules = new ArrayList<>();
        quizzes = new ArrayList<>();
    }

    public Chapter(String lessonId,
                   String title,
                   String description,
                   int xpReward) {

        this.lessonId = lessonId;
        this.title = title;
        this.description = description;
        this.xpReward = xpReward;

        prerequisite = new ArrayList<>();
        modules = new ArrayList<>();
        quizzes = new ArrayList<>();
    }

    public void addModule(LearningModule module) {

        modules.add(module);
    }

    public void addQuiz(Quiz quiz) {

        quizzes.add(quiz);
    }

    public void addPrerequisite(Chapter chapter) {

        prerequisite.add(chapter);
    }

    public int getTotalModules() {

        return modules.size();
    }

    public int getTotalQuiz() {

        return quizzes.size();
    }

    public int calculateTotalXP() {

        return xpReward + (modules.size() * 10);
    }

    public String getLessonId() {
        return lessonId;
    }

    public void setLessonId(String lessonId) {
        this.lessonId = lessonId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getXpReward() {
        return xpReward;
    }

    public void setXpReward(int xpReward) {
        this.xpReward = xpReward;
    }

    public List<Chapter> getPrerequisite() {
        return prerequisite;
    }

    public void setPrerequisite(List<Chapter> prerequisite) {
        this.prerequisite = prerequisite;
    }

    public List<LearningModule> getModules() {
        return modules;
    }

    public void setModules(List<LearningModule> modules) {
        this.modules = modules;
    }

    public List<Quiz> getQuizzes() {
        return quizzes;
    }

    public void setQuizzes(List<Quiz> quizzes) {
        this.quizzes = quizzes;
    }
}
