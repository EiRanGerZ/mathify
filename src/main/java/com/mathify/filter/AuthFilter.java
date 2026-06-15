package com.mathify.filter;

import jakarta.servlet.Filter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.annotation.WebFilter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import java.io.IOException;

/**
 * Gatekeeps protected routes.
 *
 * <ul>
 *   <li>{@code /admin/*} requires an admin session (session attribute {@code admin}).</li>
 *   <li>{@code /dashboard}, {@code /course}, {@code /quiz}, {@code /checkout}, {@code /payment/*} require a student session (session attribute {@code authUser}).</li>
 * </ul>
 *
 * Unauthenticated requests are redirected to {@code /login}. Public routes (landing,
 * login, register, logout, library, assets) are simply not mapped here.
 */
@WebFilter(urlPatterns = {"/admin/*", "/dashboard", "/course", "/quiz", "/checkout", "/payment/*", "/premium"})
public class AuthFilter implements Filter {

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        HttpServletRequest req = (HttpServletRequest) request;
        HttpServletResponse resp = (HttpServletResponse) response;

        String path = req.getRequestURI().substring(req.getContextPath().length());
        boolean adminArea = path.startsWith("/admin");
        String requiredAttr = adminArea ? "admin" : "authUser";

        HttpSession session = req.getSession(false);
        boolean authenticated = session != null && session.getAttribute(requiredAttr) != null;

        if (authenticated) {
            chain.doFilter(request, response);
        } else {
            resp.sendRedirect(req.getContextPath() + "/login");
        }
    }
}
