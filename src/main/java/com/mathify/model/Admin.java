package com.mathify.model;

import java.time.LocalDateTime;

public class Admin extends User {

    public enum Role {
        OWNER, EDITOR, VIEWER
    }

    private Role role;
    private LocalDateTime lastLoginAt;

    public Admin() {
        super();
        this.role = Role.EDITOR;
    }

    public Admin(String name, String email, String passwordHash) {
        super(name, email, passwordHash);
        this.role = Role.EDITOR;
    }

    public Admin(String name, String email, String passwordHash, Role role) {
        super(name, email, passwordHash);
        this.role = role;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public LocalDateTime getLastLoginAt() {
        return lastLoginAt;
    }

    public void setLastLoginAt(LocalDateTime lastLoginAt) {
        this.lastLoginAt = lastLoginAt;
    }

    public boolean canEdit() {
        return role == Role.OWNER || role == Role.EDITOR;
    }

    public boolean isOwner() {
        return role == Role.OWNER;
    }
}