package com.mathify.model;

public class Course {
    private int id;
    private String title;
    private String description;
    private String level;

    public Course() {
    }

    public Course(int id, String title, String description, String level) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.level = level;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
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

    public String getLevel() {
        return level;
    }

    public void setLevel(String level) {
        this.level = level;
    }
}
