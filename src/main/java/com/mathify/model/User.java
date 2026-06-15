package com.mathify.model;

import java.util.UUID;

public abstract class User {
    public User(String name, String email, String passwordHash) {
        this.userId = UUID.randomUUID().toString();
        this.name = name;
        this.email = email;
        this.passwordHash = passwordHash;
    }

    public String getUserId() {
        return userId;
    }

    private final String userId;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    private String name;

    public String getPasswordHash() {
        return passwordHash;
    }

    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    private String email;
    private String passwordHash;

    public User() {
        this.userId = UUID.randomUUID().toString();
    }
}
