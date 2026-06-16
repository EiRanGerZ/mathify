package com.mathify.model;

import java.time.LocalDateTime;

/**
 * A single in-app notification belonging to one user — the read model behind the
 * dashboard bell feed. Rows are created by {@link com.mathify.service.NotificationService}
 * when a domain event fires; this record mirrors a row of the {@code notifications}
 * table.
 *
 * @param id        the UUID primary key (read as text)
 * @param type      the {@link NotificationType} name (e.g. {@code ACHIEVEMENT})
 * @param title     short headline shown in the feed
 * @param body      optional supporting line (may be {@code null})
 * @param icon      client-side icon name to render (see {@link NotificationType#icon()})
 * @param link      where clicking the notification navigates (may be {@code null})
 * @param read      whether the user has seen it
 * @param createdAt when it was generated
 */
public record Notification(
        String id,
        String type,
        String title,
        String body,
        String icon,
        String link,
        boolean read,
        LocalDateTime createdAt) {
}
