package com.mathify.model;

/**
 * The kinds of in-app notification Mathify emits, each paired with the name of
 * the icon used to render it. The icon name is resolved client-side against the
 * dashboard's {@code Icon} map (see student/dashboard.jsp), so these strings must
 * match keys defined there (e.g. {@code Trophy}, {@code Bolt}, {@code Star},
 * {@code Close}).
 *
 * <p>The enum name() is also the value persisted in the {@code notifications.type}
 * column and must stay in sync with that column's CHECK constraint.
 */
public enum NotificationType {
    ACHIEVEMENT("Trophy"),
    LEVEL_UP("Bolt"),
    PAYMENT_CONFIRMED("Star"),
    PAYMENT_FAILED("Close");

    private final String icon;

    NotificationType(String icon) {
        this.icon = icon;
    }

    /** Name of the client-side icon used to render this notification. */
    public String icon() {
        return icon;
    }
}
