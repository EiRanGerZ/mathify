package com.mathify.util;

import jakarta.servlet.ServletContextEvent;
import jakarta.servlet.ServletContextListener;
import jakarta.servlet.annotation.WebListener;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@WebListener
public class AppContextListener implements ServletContextListener {

    private static final Logger log = LoggerFactory.getLogger(AppContextListener.class);

    @Override
    public void contextInitialized(ServletContextEvent sce) {
        try {
            FirebaseService.initialize();
        } catch (Exception e) {
            // Log but don't abort startup — app still serves non-auth pages
            log.error("Firebase Admin SDK failed to initialize: {}. Auth endpoints will not work.", e.getMessage());
        }
    }
}
