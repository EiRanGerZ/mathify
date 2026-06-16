package com.mathify.controller;

import java.io.IOException;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

// Map to the empty string, which matches ONLY the exact context root ("/").
// Mapping to "/" instead would replace the container's DefaultServlet and route
// every unmapped request — including static /assets/** bundles — here, serving
// them as text/html (which breaks the Vite island <script type="module">/<link>).
@WebServlet("")
public class RootServlet extends HttpServlet {

    @Override
    protected void doGet(
            HttpServletRequest request,
            HttpServletResponse response
    ) throws ServletException, IOException {
        response.setContentType("text/html");
        request.getRequestDispatcher("/index.jsp")
                .forward(request, response);
    }
}
