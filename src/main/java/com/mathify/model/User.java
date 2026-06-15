package com.mathify.model;

import java.util.UUID;

/**
 * Base profile for an authenticated user. Authentication is handled by Firebase —
 * the server never stores credentials. Identity (uid, email, display name) arrives
 * via {@link AuthUser} after ID-token verification; this model holds the persisted
 * profile, keyed by the Firebase uid.
 */
public abstract class User {

    private final String userId;
    private String name;
    private String email;

    /** Creates a user with a generated id (for profiles not backed by a Firebase uid). */
    protected User() {
        this.userId = UUID.randomUUID().toString();
    }

    /** Creates a user whose id is the Firebase uid. */
    protected User(String userId, String name, String email) {
        this.userId = userId;
        this.name = name;
        this.email = email;
    }

    public String getUserId() {
        return userId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
