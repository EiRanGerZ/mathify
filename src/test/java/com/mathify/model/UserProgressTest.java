package com.mathify.model;

import org.junit.jupiter.api.Test;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Collections;

import static org.junit.jupiter.api.Assertions.*;

public class UserProgressTest {

    @Test
    public void testUserProgressDefaults() {
        UserProgress progress = new UserProgress("test-user-1");
        assertEquals("test-user-1", progress.getStudentId());
        assertEquals(0, progress.getTotalXP());
        assertEquals(1, progress.getLevel());
        assertEquals(0, progress.getCurrentStreak());
        assertEquals(5, progress.getEnergy());
        assertNull(progress.getLastActivity());
    }

    @Test
    public void testConstructWithPersistedValues() {
        LocalDate lastActivity = LocalDate.now().minusDays(1);
        UserProgress progress = new UserProgress("test-user-2", 1200, 3, 4, 3, lastActivity);
        assertEquals("test-user-2", progress.getStudentId());
        assertEquals(1200, progress.getTotalXP());
        assertEquals(3, progress.getLevel());
        assertEquals(4, progress.getCurrentStreak());
        assertEquals(3, progress.getEnergy());
        assertEquals(lastActivity, progress.getLastActivity());
    }

    @Test
    public void testEnergyDecrementAndIncrement() {
        UserProgress progress = new UserProgress("test-user-3");
        assertEquals(5, progress.getEnergy());

        progress.decrementEnergy(1);
        assertEquals(4, progress.getEnergy());

        progress.incrementEnergy(2);
        assertEquals(6, progress.getEnergy());

        assertThrows(IllegalStateException.class, () -> progress.decrementEnergy(10));
        assertThrows(IllegalArgumentException.class, () -> progress.decrementEnergy(-1));
        assertThrows(IllegalArgumentException.class, () -> progress.incrementEnergy(-1));
    }

    @Test
    public void testStreakLogic() {
        UserProgress progress = new UserProgress("test-user-4");
        assertNull(progress.getLastActivity());
        assertEquals(0, progress.getCurrentStreak());

        // 1. Initial activity sets streak to 1
        progress.updateStreak();
        assertEquals(1, progress.getCurrentStreak());
        assertEquals(LocalDate.now(), progress.getLastActivity());

        // 2. Activity on the same day maintains streak
        progress.updateStreak();
        assertEquals(1, progress.getCurrentStreak());

        // 3. Activity on consecutive days increments streak
        progress.setLastActivity(LocalDate.now().minusDays(1));
        progress.updateStreak();
        assertEquals(2, progress.getCurrentStreak());
        assertEquals(LocalDate.now(), progress.getLastActivity());

        // 4. Activity after a gap resets streak to 1
        progress.setLastActivity(LocalDate.now().minusDays(3));
        progress.updateStreak();
        assertEquals(1, progress.getCurrentStreak());
        assertEquals(LocalDate.now(), progress.getLastActivity());
    }

    @Test
    public void testHydrationHelpers() {
        UserProgress progress = new UserProgress("test-user-5");
        assertTrue(progress.getCourseEnrollments().isEmpty());
        assertTrue(progress.getChapterProgress().isEmpty());
        assertTrue(progress.getQuizAttempts().isEmpty());

        CourseEnrollment enrollment = new CourseEnrollment("course-1", LocalDateTime.now(), null);
        progress.hydrateCourseEnrollments(Collections.singletonList(enrollment));
        assertEquals(1, progress.getCourseEnrollments().size());
        assertEquals(enrollment, progress.getCourseEnrollment("course-1"));

        ChapterProgress cp = new ChapterProgress("chapter-1", LocalDateTime.now(), java.time.Duration.ofMinutes(10));
        progress.hydrateChapterProgress(Collections.singletonList(cp));
        assertEquals(1, progress.getChapterProgress().size());
        assertEquals(cp, progress.getChapterProgress("chapter-1"));

        QuizAttempt attempt = new QuizAttempt("quiz-1", 85, LocalDateTime.now());
        progress.hydrateQuizAttempts(Collections.singletonList(attempt));
        assertEquals(1, progress.getQuizAttempts().size());
        assertEquals(attempt, progress.getQuizAttempt("quiz-1"));
    }
}
