package com.mathify.controller;

import com.mathify.dao.CourseDAO;
import com.mathify.model.Course;
import com.mathify.model.CourseCardView;
import com.mathify.model.Chapter;
import com.mathify.model.LearningModule;
import com.mathify.model.SlideModule;
import com.mathify.model.Slide;
import com.mathify.model.VideoModule;
import com.mathify.model.ModuleType;
import com.mathify.model.Quiz;
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

@WebServlet("/course")
public class CoursePageServlet extends HttpServlet {

    private static final Logger log = LoggerFactory.getLogger(CoursePageServlet.class);

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        // Access is enforced by AuthFilter (/course requires a student session).
        HttpSession session = req.getSession(false);

        User user = (session != null) ? (User) session.getAttribute("user") : null;
        UserProgress prog = (session != null) ? (UserProgress) session.getAttribute("progress") : null;

        String courseId = req.getParameter("courseId");
        CourseDAO courseDAO = new CourseDAO();
        Course course = null;
        CourseCardView card = null;

        try {
            if (courseId != null && !courseId.trim().isEmpty()) {
                course = courseDAO.findCourse(courseId);
                card = courseDAO.findById(courseId);
            }
            if (course == null) {
                List<CourseCardView> all = courseDAO.findAll();
                if (!all.isEmpty()) {
                    card = all.get(0);
                    course = courseDAO.findCourse(card.getId());
                }
            }
        } catch (SQLException e) {
            log.error("Failed to load course information from DB", e);
        }

        req.setAttribute("user", user);
        req.setAttribute("progress", prog);

        if (card != null && course != null) {
            req.setAttribute("courseJson", courseToJson(card, course, prog));
            req.setAttribute("chaptersJson", chaptersToJson(course.getChapters(), prog, prog != null ? prog.getLevel() : 1, card.getLevelNum()));
        } else {
            req.setAttribute("courseJson", "{}");
            req.setAttribute("chaptersJson", "[]");
        }

        req.getRequestDispatcher("/WEB-INF/jsp/pages/course/index.jsp")
                .forward(req, resp);
    }

    private String courseToJson(CourseCardView card, Course course, UserProgress prog) {
        int completedChapters = 0;
        List<Chapter> chapters = course.getChapters();
        for (Chapter ch : chapters) {
            if (prog != null && prog.hasCompletedChapter(ch.getId())) {
                completedChapters++;
            }
        }
        int progress = chapters.size() > 0 ? (completedChapters * 100 / chapters.size()) : 0;

        StringBuilder sb = new StringBuilder();
        sb.append("{")
                .append("\"id\":\"").append(esc(card.getId())).append("\",")
                .append("\"title\":\"").append(esc(card.getTitle())).append("\",")
                .append("\"blurb\":\"").append(esc(card.getDescription())).append("\",")
                .append("\"track\":\"").append(esc(card.getTrack())).append("\",")
                .append("\"level\":").append(card.getLevelNum()).append(",")
                .append("\"color\":\"").append(esc(card.getColor())).append("\",")
                .append("\"glyph\":\"").append(esc(card.getGlyph())).append("\",")
                .append("\"totalLessons\":").append(card.getTotalLessons()).append(",")
                .append("\"hours\":\"").append(esc(card.getEstimatedHours())).append("\",")
                .append("\"xp\":").append(card.getXpReward()).append(",")
                .append("\"status\":\"").append(esc(card.getStatus())).append("\",")
                .append("\"progress\":").append(progress).append(",")
                .append("\"tags\":[\"Core\",\"Year 2\"]")
                .append("}");
        return sb.toString();
    }

    private String chaptersToJson(List<Chapter> chapters, UserProgress prog, int userLevel, int courseMinLevel) {
        StringBuilder sb = new StringBuilder("[");
        boolean courseLocked = userLevel < courseMinLevel;

        for (int i = 0; i < chapters.size(); i++) {
            if (i > 0) {
                sb.append(",");
            }
            Chapter ch = chapters.get(i);

            String status = "locked";
            if (!courseLocked) {
                if (prog != null && prog.hasCompletedChapter(ch.getId())) {
                    status = "complete";
                } else if (i == 0) {
                    status = "in-progress";
                } else {
                    Chapter prev = chapters.get(i - 1);
                    if (prog != null && prog.hasCompletedChapter(prev.getId())) {
                        status = "in-progress";
                    } else {
                        status = "locked";
                    }
                }
            }

            List<LearningModule> modules = ch.getModules();
            List<Quiz> quizzes = ch.getQuizzes();
            int totalItems = modules.size() + quizzes.size();
            int completedItems = 0;

            StringBuilder itemsSb = new StringBuilder("[");
            int itemIdx = 0;

            for (LearningModule m : modules) {
                if (itemIdx > 0) {
                    itemsSb.append(",");
                }

                String itemStatus = "locked";
                if (status.equals("complete")) {
                    itemStatus = "done";
                    completedItems++;
                } else if (status.equals("in-progress")) {
                    itemStatus = "active";
                }

                String typeStr = m.getType() == ModuleType.VIDEO ? "video" : "read";
                String durStr = "5m";
                if (m.estimatedDuration() != null) {
                    long secs = m.estimatedDuration().toSeconds();
                    if (secs >= 60) {
                        durStr = (secs / 60) + "m";
                    } else {
                        durStr = secs + "s";
                    }
                }

                itemsSb.append("{")
                        .append("\"id\":\"").append(esc(m.getId())).append("\",")
                        .append("\"type\":\"").append(typeStr).append("\",")
                        .append("\"title\":\"").append(esc(m.getTitle())).append("\",")
                        .append("\"dur\":\"").append(durStr).append("\",")
                        .append("\"xp\":10,")
                        .append("\"status\":\"").append(itemStatus).append("\",");

                if (m instanceof VideoModule vm) {
                    itemsSb.append("\"details\":{")
                            .append("\"videoUrl\":\"").append(esc(vm.getVideoUrl())).append("\",")
                            .append("\"thumbnailUrl\":\"").append(esc(vm.getThumbnailUrl())).append("\"")
                            .append("}");
                } else if (m instanceof SlideModule sm) {
                    itemsSb.append("\"details\":{")
                            .append("\"secondsPerSlide\":").append(sm.getSecondsPerSlide()).append(",")
                            .append("\"slides\":[");
                    for (int sIdx = 0; sIdx < sm.getSlides().size(); sIdx++) {
                        if (sIdx > 0) {
                            itemsSb.append(",");
                        }
                        Slide s = sm.getSlides().get(sIdx);
                        itemsSb.append("{")
                                .append("\"order\":").append(s.order()).append(",")
                                .append("\"imageUrl\":\"").append(esc(s.imageUrl())).append("\",")
                                .append("\"caption\":\"").append(esc(s.caption())).append("\"")
                                .append("}");
                    }
                    itemsSb.append("]}");
                } else {
                    itemsSb.append("\"details\":{}");
                }
                itemsSb.append("}");
                itemIdx++;
            }

            for (Quiz q : quizzes) {
                if (itemIdx > 0) {
                    itemsSb.append(",");
                }

                String itemStatus = "locked";
                boolean isPassed = prog != null && prog.hasAttemptedQuiz(q.getQuizId());
                if (status.equals("complete") || isPassed) {
                    itemStatus = "done";
                    completedItems++;
                } else if (status.equals("in-progress")) {
                    itemStatus = "active";
                }

                itemsSb.append("{")
                        .append("\"id\":\"").append(esc(q.getQuizId())).append("\",")
                        .append("\"type\":\"quiz\",")
                        .append("\"title\":\"").append(esc(q.getTitle())).append("\",")
                        .append("\"dur\":\"10m\",")
                        .append("\"xp\":").append(q.totalPoints()).append(",")
                        .append("\"status\":\"").append(itemStatus).append("\",")
                        .append("\"details\":{")
                        .append("\"passingScore\":").append(q.getPassingScore())
                        .append("}")
                        .append("}");
                itemIdx++;
            }
            itemsSb.append("]");

            sb.append("{")
                    .append("\"id\":\"").append(esc(ch.getId())).append("\",")
                    .append("\"title\":\"").append(esc(ch.getTitle())).append("\",")
                    .append("\"lessons\":").append(totalItems).append(",")
                    .append("\"done\":").append(completedItems).append(",")
                    .append("\"status\":\"").append(status).append("\",")
                    .append("\"items\":").append(itemsSb.toString())
                    .append("}");
        }
        sb.append("]");
        return sb.toString();
    }

    private String esc(String s) {
        if (s == null) {
            return "";
        }
        return s.replace("\\", "\\\\")
                .replace("\"", "\\\"")
                .replace("\n", "\\n")
                .replace("\r", "");
    }
}
