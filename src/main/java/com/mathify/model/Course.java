package com.mathify.model;

import java.util.ArrayList;
import java.util.List;

/**
 * Domain model for a course — its identity, category, prerequisites, and the
 * chapters that make it up. For the lightweight summary used to render course
 * cards in the UI, see {@link CourseCardView}.
 */
public class Course {
    private String courseId;
    private String title;
    private String description;
    private String category;
    private List<Course> prerequisite;
    private List<Chapter> chapters;

    public Course() {
        this.prerequisite = new ArrayList<>();
        this.chapters = new ArrayList<>();
    }

    public Course(String courseId, List<Chapter> chapters) {
        this.courseId = courseId;
        this.chapters = (chapters != null) ? chapters : new ArrayList<>();
        this.prerequisite = new ArrayList<>();
    }

    public String getCourseId() {
        return courseId;
    }

    public void setCourseId(String courseId) {
        this.courseId = courseId;
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

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public List<Course> getPrerequisite() {
        return prerequisite;
    }

    public void setPrerequisite(List<Course> prerequisite) {
        this.prerequisite = prerequisite;
    }

    public List<Chapter> getChapters() {
        return chapters;
    }

    public void setChapters(List<Chapter> chapters) {
        this.chapters = chapters;
    }
}
