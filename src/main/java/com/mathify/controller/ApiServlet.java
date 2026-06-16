package com.mathify.controller;

import com.mathify.model.AuthUser;

import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.json.JSONObject;

import java.io.IOException;

/**
 * Base class for JSON REST endpoints under {@code /api/*}.
 *
 * <p>Centralises the bits every API servlet repeats: pulling the authenticated
 * {@link AuthUser} off the session, and writing a JSON body with the right
 * content type. Like {@link NotificationServlet}, API servlets self-check the
 * session and return {@code 401 JSON} rather than the {@code 302}-to-login that
 * {@code AuthFilter} issues, so a {@code fetch()} always receives parseable JSON.
 */
public abstract class ApiServlet extends HttpServlet {

    /** The authenticated user on this session, or {@code null} if unauthenticated. */
    protected static AuthUser authUser(HttpServletRequest req) {
        HttpSession session = req.getSession(false);
        return (session != null) ? (AuthUser) session.getAttribute("authUser") : null;
    }

    protected static void writeJson(HttpServletResponse resp, int status, Object body) throws IOException {
        resp.setStatus(status);
        resp.setContentType("application/json");
        resp.setCharacterEncoding("UTF-8");
        resp.getWriter().write(body.toString());
    }

    protected static void unauthorized(HttpServletResponse resp) throws IOException {
        writeJson(resp, HttpServletResponse.SC_UNAUTHORIZED,
                new JSONObject().put("error", "unauthenticated"));
    }

    protected static void serverError(HttpServletResponse resp) throws IOException {
        writeJson(resp, HttpServletResponse.SC_INTERNAL_SERVER_ERROR,
                new JSONObject().put("error", "server_error"));
    }
}
