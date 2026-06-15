package com.mathify.util;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

/**
 * Utility class for obtaining JDBC connections.
 *
 * Configuration is read entirely from environment variables so that no
 * credentials are ever hard-coded.  The password is expected to arrive via a
 * Docker secret mounted at the path given by DB_PASSWORD_FILE.
 *
 * Environment variables (with defaults for local development):
 *   DB_HOST          – postgres hostname  (default: localhost)
 *   DB_PORT          – postgres port      (default: 5432)
 *   DB_NAME          – database name      (default: mathify)
 *   DB_USER          – database user      (default: postgres)
 *   DB_PASSWORD_FILE – path to secret file (optional; falls back to DB_PASSWORD)
 *   DB_PASSWORD      – plain-text password (fallback for local dev only)
 */
public class DBConnection {

    private static final String URL = buildUrl();

    static {
        // Explicitly register the driver. Under Tomcat the bootstrap-loaded
        // DriverManager does not reliably auto-discover JDBC drivers bundled in a
        // webapp's WEB-INF/lib via the ServiceLoader, which surfaces as
        // "No suitable driver found". Loading the class runs its self-registration.
        try {
            Class.forName("org.postgresql.Driver");
        } catch (ClassNotFoundException e) {
            throw new IllegalStateException(
                    "PostgreSQL JDBC driver not found on the classpath", e);
        }
    }

    private DBConnection() {}

    // -------------------------------------------------------------------------
    // Public API
    // -------------------------------------------------------------------------

    public static Connection getConnection() throws SQLException {
        return DriverManager.getConnection(URL, getUser(), getPassword());
    }

    // -------------------------------------------------------------------------
    // Helpers
    // -------------------------------------------------------------------------

    private static String buildUrl() {
        String host = env("DB_HOST", "localhost");
        String port = env("DB_PORT", "5432");
        String name = env("DB_NAME", "mathify");
        return String.format("jdbc:postgresql://%s:%s/%s", host, port, name);
    }

    private static String getUser() {
        return env("DB_USER", "postgres");
    }

    private static String getPassword() {
        // Prefer Docker secret file
        String secretFile = System.getenv("DB_PASSWORD_FILE");
        if (secretFile != null && !secretFile.isBlank()) {
            try {
                return Files.readString(Path.of(secretFile)).strip();
            } catch (IOException e) {
                throw new RuntimeException(
                        "DBConnection: could not read secret file: " + secretFile, e);
            }
        }
        // Fallback — useful for plain `mvn tomcat7:run` during local dev
        return env("DB_PASSWORD", "");
    }

    private static String env(String key, String fallback) {
        String value = System.getenv(key);
        return (value != null && !value.isBlank()) ? value : fallback;
    }
}