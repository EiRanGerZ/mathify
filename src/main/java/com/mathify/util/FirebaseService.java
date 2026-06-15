package com.mathify.util;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;

public final class FirebaseService {

    private static final Logger log = LoggerFactory.getLogger(FirebaseService.class);

    // Docker secret path (compose.yaml mounts serviceAccountKey.json here)
    private static final String DOCKER_SECRET = "/run/secrets/firebase-credentials";
    // Fallback for local dev: set FIREBASE_CREDENTIALS_FILE=/path/to/serviceAccountKey.json
    private static final String ENV_FILE_VAR  = "FIREBASE_CREDENTIALS_FILE";

    private FirebaseService() {}

    public static synchronized void initialize() throws IOException {
        if (!FirebaseApp.getApps().isEmpty()) return;

        try (InputStream creds = resolveCredentials()) {
            FirebaseOptions options = FirebaseOptions.builder()
                    .setCredentials(GoogleCredentials.fromStream(creds))
                    .build();
            FirebaseApp.initializeApp(options);
            log.info("Firebase Admin SDK initialized");
        }
    }

    private static InputStream resolveCredentials() throws IOException {
        if (Files.exists(Paths.get(DOCKER_SECRET))) {
            log.info("Firebase: loading credentials from Docker secret");
            return new FileInputStream(DOCKER_SECRET);
        }
        String envPath = System.getenv(ENV_FILE_VAR);
        if (envPath != null && !envPath.isBlank()) {
            log.info("Firebase: loading credentials from {}", envPath);
            return new FileInputStream(envPath);
        }
        throw new IOException(
            "Firebase credentials not found. " +
            "Mount serviceAccountKey.json at " + DOCKER_SECRET +
            " or set the " + ENV_FILE_VAR + " env var."
        );
    }

    /**
     * Verifies a Firebase ID token and returns the decoded claims.
     * Throws FirebaseAuthException if the token is invalid or expired.
     */
    public static FirebaseToken verifyIdToken(String idToken) throws FirebaseAuthException {
        return FirebaseAuth.getInstance().verifyIdToken(idToken);
    }
}
