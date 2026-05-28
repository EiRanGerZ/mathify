package com.mathify.model;
import java.time.LocalDateTime;
import java.util.Optional;

public record CourseEnrollment (String courseId, LocalDateTime enrolledAt, LocalDateTime completedAt){
    public boolean isCompleted(){
        return completedAt != null;
    }

    public CourseEnrollment markAsCompleted() {
        if (isCompleted()) {
            throw new IllegalStateException("Course " + courseId + " sudah selesai sebelumnya.");
        }
        return new CourseEnrollment(courseId, enrolledAt, LocalDateTime.now());
    }
}
