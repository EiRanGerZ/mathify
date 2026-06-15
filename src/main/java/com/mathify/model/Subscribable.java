package com.mathify.model;

import java.time.LocalDate;

/** A subscription a {@link Student} can hold. */
public interface Subscribable {

    void extendSubscription(LocalDate expiry);

    boolean isActive();

    void changePlan(Plan plan);

    String getSubscriptionPlan();

    LocalDate subscriptionExpiry();

    void cancelSubscription();
}
