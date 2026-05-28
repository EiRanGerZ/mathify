package com.mathify.model;

public class Achievement {
    private String achievementId;
    private String title;
    private String category;
    private String requirement;

    //Constructor
    public Achievement(String achievementId, String title, String category, String requirement) {
        this.achievementId = achievementId;
        this.title         = title;
        this.category      = category;
        this.requirement   = requirement;
    }

    // getter & setter
    public String getId() {
        return achievementId;
    }

    public void setId(String achievementId) {
        this.achievementId = achievementId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getRequirement() {
        return requirement;
    }

    public void setRequirement(String requirement) {
        this.requirement = requirement;
    }

    @Override
    public String toString() {
        return "Achievement{" +
                "achievementId='" + achievementId + '\'' +
                ", title='"       + title          + '\'' +
                ", category='"    + category       + '\'' +
                ", requirement='" + requirement    + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Achievement other)) return false;
        return achievementId != null && achievementId.equals(other.achievementId);
    }

    @Override
    public int hashCode() {
        return achievementId != null ? achievementId.hashCode() : 0;
    }
}
