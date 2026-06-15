package com.mathify.model;

import java.time.LocalDate;

/** A paid subscription with an expiry date and a cancellation flag. */
public class PremiumStudent implements Subscribable {

    private String subscriptionPlan;
    private LocalDate subscriptionExpiry;
    private boolean isCanceled;

    public PremiumStudent(String plan, LocalDate expiry) {
        this.subscriptionPlan = plan;
        this.subscriptionExpiry = expiry;
        this.isCanceled = false;
    }

    @Override
    public void extendSubscription(LocalDate expiry) {
        if (expiry == null) {
            throw new IllegalArgumentException("expiry must not be null");
        }
        if (subscriptionExpiry != null && expiry.isBefore(subscriptionExpiry)) {
            throw new IllegalArgumentException("New expiry must be on or after the current expiry.");
        }
        this.subscriptionExpiry = expiry;
        this.isCanceled = false;
    }

    @Override
    public boolean isActive() {
        return !isCanceled
                && subscriptionExpiry != null
                && !subscriptionExpiry.isBefore(LocalDate.now());
    }

    @Override
    public void changePlan(Plan plan) {
        if (plan == null) {
            throw new IllegalArgumentException("plan must not be null");
        }
        this.subscriptionPlan = plan.name();
    }

    @Override
    public String getSubscriptionPlan() {
        return subscriptionPlan;
    }

    @Override
    public LocalDate subscriptionExpiry() {
        return subscriptionExpiry;
    }

    @Override
    public void cancelSubscription() {
        this.isCanceled = true;
    }
}
