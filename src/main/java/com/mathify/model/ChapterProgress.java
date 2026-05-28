package com.mathify.model;
import java.time.Duration;
import java.time.LocalDateTime;

public record ChapterProgress(String chapterId, LocalDateTime completedAt, Duration timeSpent) {
    public boolean isCompleted() {
        return completedAt != null;
    }
    public ChapterProgress addTimeSpent(Duration additional) {
        return new ChapterProgress(chapterId, completedAt, timeSpent.plus(additional));
    }

    public ChapterProgress markAsCompleted(Duration finalTimeSpent) {
        if (isCompleted()) {
            throw new IllegalStateException("Chapter " + chapterId + " sudah selesai sebelumnya.");
        }
        return new ChapterProgress(chapterId, LocalDateTime.now(), timeSpent.plus(finalTimeSpent));
    }
}
