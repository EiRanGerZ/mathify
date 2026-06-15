package com.mathify.model;

/**
 * Immutable identity record stored in the HTTP session after Firebase token verification.
 * uid is the Firebase-assigned permanent user ID — use it as the FK in all DB tables.
 */
public record AuthUser(String uid, String email, String displayName) {

    /** First character of displayName, or email, or "?" — used for avatar initials. */
    public String initial() {
        if (displayName != null && !displayName.isBlank()) {
            return String.valueOf(displayName.charAt(0)).toUpperCase();
        }
        if (email != null && !email.isBlank()) {
            return String.valueOf(email.charAt(0)).toUpperCase();
        }
        return "?";
    }

    /** Best available display name, falling back to email prefix then "Student". */
    public String preferredName() {
        if (displayName != null && !displayName.isBlank()) return displayName;
        if (email != null && email.contains("@")) return email.substring(0, email.indexOf('@'));
        return "Student";
    }
}
