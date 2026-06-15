package com.mathify.model;

import java.time.Duration;
import java.time.LocalDateTime;

/**
 * A learning unit inside a {@link Chapter}. Implementations (e.g. {@link SlideModule},
 * {@link VideoModule}) carry their own payload but expose a common identity and an
 * estimated time-to-complete so chapters can be composed polymorphically.
 */
public interface LearningModule {

    String getId();

    String getTitle();

    int getOrderIndex();

    LocalDateTime getCreatedAt();

    ModuleType getType();

    Duration estimatedDuration();
}
