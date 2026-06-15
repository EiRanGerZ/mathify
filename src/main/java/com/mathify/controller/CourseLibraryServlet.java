package com.mathify.controller;

import com.mathify.dao.CourseDAO;
import com.mathify.model.CourseCardView;
import com.mathify.model.User;
import com.mathify.model.UserProgress;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

@WebServlet("/library")
public class CourseLibraryServlet extends HttpServlet {

    private static final Logger log = LoggerFactory.getLogger(CourseLibraryServlet.class);

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        HttpSession session = req.getSession(false);
//        if (session == null || session.getAttribute("authUser") == null) {
//            resp.sendRedirect(req.getContextPath() + "/login");
//            return;
//        }

        User user         = (session != null) ? (User) session.getAttribute("user") : null;
        UserProgress prog = (session != null) ? (UserProgress) session.getAttribute("progress") : null;

        List<CourseCardView> courses;
        try {
            courses = new CourseDAO().findAll();
        } catch (SQLException e) {
            log.error("Failed to load courses from DB", e);
            courses = List.of();
        }

        req.setAttribute("user", user);
        req.setAttribute("progress", prog);
        req.setAttribute("coursesJson", toJson(courses));
        req.getRequestDispatcher("/WEB-INF/jsp/pages/library/index.jsp").forward(req, resp);
    }

    private String toJson(List<CourseCardView> courses) {
        StringBuilder sb = new StringBuilder("[");
        for (int i = 0; i < courses.size(); i++) {
            if (i > 0) sb.append(",");
            CourseCardView c = courses.get(i);
            sb.append("{")
              .append("\"id\":").append(c.getId()).append(",")
              .append("\"title\":\"").append(esc(c.getTitle())).append("\",")
              .append("\"blurb\":\"").append(esc(c.getDescription())).append("\",")
              .append("\"track\":\"").append(esc(c.getTrack())).append("\",")
              .append("\"level\":").append(c.getLevelNum()).append(",")
              .append("\"color\":\"").append(esc(c.getColor())).append("\",")
              .append("\"glyph\":\"").append(esc(c.getGlyph())).append("\",")
              .append("\"lessons\":").append(c.getTotalLessons()).append(",")
              .append("\"hours\":\"").append(esc(c.getEstimatedHours())).append("\",")
              .append("\"xp\":").append(c.getXpReward()).append(",")
              .append("\"status\":\"").append(esc(c.getStatus())).append("\",")
              .append("\"progress\":0")
              .append("}");
        }
        return sb.append("]").toString();
    }

    private String esc(String s) {
        if (s == null) return "";
        return s.replace("\\", "\\\\")
                .replace("\"", "\\\"")
                .replace("\n", "\\n")
                .replace("\r", "");
    }
}
