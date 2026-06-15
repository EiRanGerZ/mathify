package com.mathify.controller;

import com.mathify.dao.QuizDAO;
import com.mathify.util.QueryHelper;
import com.mathify.model.Quiz;
import com.mathify.model.Question;
import com.mathify.model.MultipleChoiceQuestion;
import com.mathify.model.FillBlankQuestion;
import com.mathify.model.DragDropQuestion;
import com.mathify.model.DragItem;
import com.mathify.model.DropZone;
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

@WebServlet("/quiz")
public class QuizServlet extends HttpServlet {

    private static final Logger log = LoggerFactory.getLogger(QuizServlet.class);

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        HttpSession session = req.getSession(false);

        User user = (session != null) ? (User) session.getAttribute("user") : null;
        UserProgress prog = (session != null) ? (UserProgress) session.getAttribute("progress") : null;

        String quizId = req.getParameter("quizId");
        Quiz quiz = null;

        try {
            if (quizId != null && !quizId.trim().isEmpty()) {
                quiz = new QuizDAO().findById(quizId);
            }
            if (quiz == null) {
                List<String> allQuizIds = QueryHelper.queryList(
                        "SELECT quiz_id FROM quizzes LIMIT 1",
                        rs -> rs.getString("quiz_id"));
                if (!allQuizIds.isEmpty()) {
                    quiz = new QuizDAO().findById(allQuizIds.get(0));
                }
            }
        } catch (SQLException e) {
            log.error("Failed to load quiz from DB", e);
        }

        req.setAttribute("user", user);
        req.setAttribute("progress", prog);

        if (quiz != null) {
            req.setAttribute("quizJson", quizToJson(quiz));
        } else {
            req.setAttribute("quizJson", "{}");
        }

        req.getRequestDispatcher("/WEB-INF/jsp/pages/quiz/index.jsp")
                .forward(req, resp);
    }

    private String quizToJson(Quiz quiz) {
        if (quiz == null) {
            return "{}";
        }
        StringBuilder sb = new StringBuilder();
        sb.append("{")
                .append("\"id\":\"").append(esc(quiz.getQuizId())).append("\",")
                .append("\"title\":\"").append(esc(quiz.getTitle())).append("\",")
                .append("\"passingScore\":").append(quiz.getPassingScore()).append(",")
                .append("\"totalQ\":").append(quiz.getQuestions().size()).append(",")
                .append("\"xpReward\":").append(quiz.totalPoints()).append(",")
                .append("\"questions\":[");

        List<Question> questions = quiz.getQuestions();
        for (int i = 0; i < questions.size(); i++) {
            if (i > 0) {
                sb.append(",");
            }
            Question q = questions.get(i);
            sb.append("{")
                    .append("\"id\":\"").append(esc(q.getId())).append("\",")
                    .append("\"type\":\"").append(esc(q.getType().name())).append("\",")
                    .append("\"prompt\":\"").append(esc(q.getPrompt())).append("\",")
                    .append("\"points\":").append(q.getPoints()).append(",");

            if (q instanceof MultipleChoiceQuestion mc) {
                sb.append("\"choices\":[");
                List<MultipleChoiceQuestion.Option> options = mc.getOptions();
                java.util.Set<String> correctIds = mc.getCorrectOptionIds();
                for (int j = 0; j < options.size(); j++) {
                    if (j > 0) {
                        sb.append(",");
                    }
                    MultipleChoiceQuestion.Option opt = options.get(j);
                    sb.append("{")
                            .append("\"id\":\"").append(esc(opt.id())).append("\",")
                            .append("\"text\":\"").append(esc(opt.text())).append("\",")
                            .append("\"correct\":").append(correctIds.contains(opt.id()))
                            .append("}");
                }
                sb.append("],");
            } else {
                sb.append("\"choices\":[],");
            }

            if (q instanceof FillBlankQuestion fb) {
                sb.append("\"correctAnswers\":[");
                List<String> answers = fb.getCorrectAnswers();
                for (int j = 0; j < answers.size(); j++) {
                    if (j > 0) {
                        sb.append(",");
                    }
                    sb.append("\"").append(esc(answers.get(j))).append("\"");
                }
                sb.append("],")
                        .append("\"caseSensitive\":").append(fb.isCaseSensitive()).append(",");
            } else {
                sb.append("\"correctAnswers\":[],");
            }

            if (q instanceof DragDropQuestion dd) {
                sb.append("\"draggables\":[");
                List<DragItem> items = dd.getDraggables();
                for (int j = 0; j < items.size(); j++) {
                    if (j > 0) {
                        sb.append(",");
                    }
                    DragItem di = items.get(j);
                    sb.append("{")
                            .append("\"id\":\"").append(esc(di.id())).append("\",")
                            .append("\"label\":\"").append(esc(di.label())).append("\"")
                            .append("}");
                }
                sb.append("],\"dropZones\":[");
                List<DropZone> zones = dd.getDropZones();
                for (int j = 0; j < zones.size(); j++) {
                    if (j > 0) {
                        sb.append(",");
                    }
                    DropZone dz = zones.get(j);
                    sb.append("{")
                            .append("\"id\":\"").append(esc(dz.id())).append("\",")
                            .append("\"label\":\"").append(esc(dz.label())).append("\"")
                            .append("}");
                }
                sb.append("],\"correctPairings\":{");
                int pairIdx = 0;
                for (java.util.Map.Entry<String, String> entry : dd.getCorrectPairings().entrySet()) {
                    if (pairIdx > 0) {
                        sb.append(",");
                    }
                    sb.append("\"").append(esc(entry.getKey())).append("\":\"").append(esc(entry.getValue())).append("\"");
                    pairIdx++;
                }
                sb.append("},");
            } else {
                sb.append("\"draggables\":[],\"dropZones\":[],\"correctPairings\":{},");
            }

            sb.append("\"explanation\":\"Correct answer verified. Check the mathematical steps.\"");
            sb.append("}");
        }
        sb.append("]}");
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
