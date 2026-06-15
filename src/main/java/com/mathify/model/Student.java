package com.mathify.model;

/**
 * A learner. The {@code studentId} is the Firebase uid, shared with the inherited
 * {@code userId} and used as the FK for {@link UserProgress} and all DB tables.
 */
public class Student extends User {

    private final String studentId;
    private Subscribable subscription;
    private UserProgress progress;
    private int energy;

    public Student(String studentId, String name, String email) {
        super(studentId, name, email);
        this.studentId = studentId;
        this.progress = new UserProgress(studentId);
        this.energy = 5;
    }

    public String getStudentId() {
        return studentId;
    }

    public Subscribable getSubscription() {
        return subscription;
    }

    public void setSubscription(Subscribable subscription) {
        this.subscription = subscription;
    }

    public UserProgress getProgress() {
        return progress;
    }

    public void setProgress(UserProgress progress) {
        this.progress = progress;
    }

    public int getEnergy() {
        return energy;
    }

    /** True when the student holds an active premium subscription. */
    public boolean getPremium() {
        return subscription != null && subscription.isActive();
    }

    public void addEnergy(int amount) {
        if (amount <= 0) throw new IllegalArgumentException("amount must be > 0");
        this.energy += amount;
    }

    public void removeEnergy(int amount) {
        if (amount <= 0) throw new IllegalArgumentException("amount must be > 0");
        if (amount > energy) throw new IllegalStateException("Not enough energy.");
        this.energy -= amount;
    }
}
