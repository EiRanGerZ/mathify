package com.mathify.controller;

import com.mathify.dao.ChapterDAO;
import com.mathify.dao.CourseDAO;
import com.mathify.dao.LearningModuleDAO;
import com.mathify.dao.QuestionDAO;
import com.mathify.dao.QuizDAO;
import com.mathify.model.Chapter;
import com.mathify.model.Course;
import com.mathify.model.CourseCardView;
import com.mathify.model.FillBlankQuestion;
import com.mathify.model.ModuleInfo;
import com.mathify.model.MultipleChoiceQuestion;
import com.mathify.model.Question;
import com.mathify.model.QuestionInfo;
import com.mathify.model.Quiz;
import com.mathify.model.Slide;
import com.mathify.model.SlideModule;
import com.mathify.model.VideoModule;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.sql.SQLException;
import java.time.Duration;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;

/**
 * Admin content authoring — full CRUD for courses, chapters, modules, quizzes,
 * and questions. Access is enforced by {@link com.mathify.filter.AuthFilter}.
 * Uses Post/Redirect/Get so refreshes don't re-submit.
 *
 * Redirect context is carried via hidden fields _courseId and _chapterId so
 * the page returns to the same selection after every POST.
 */
@WebServlet("/admin/content")
public class AdminContentServlet extends HttpServlet {

    private static final Logger log = LoggerFactory.getLogger(AdminContentServlet.class);

    private final CourseDAO courseDAO = new CourseDAO();
    private final ChapterDAO chapterDAO = new ChapterDAO();
    private final LearningModuleDAO moduleDAO = new LearningModuleDAO();
    private final QuizDAO quizDAO = new QuizDAO();
    private final QuestionDAO questionDAO = new QuestionDAO();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        try {
            List<CourseCardView> courses = courseDAO.findAll();
            req.setAttribute("courses", courses);

            String selectedCourseId = req.getParameter("courseId");
            if (selectedCourseId != null && !selectedCourseId.isBlank()) {
                req.setAttribute("selectedCourseId", selectedCourseId);
                req.setAttribute("chapters", chapterDAO.findByCourse(selectedCourseId));
            }

            String selectedChapterId = req.getParameter("chapterId");
            if (selectedChapterId != null && !selectedChapterId.isBlank()) {
                req.setAttribute("selectedChapterId", selectedChapterId);
                req.setAttribute("chapterDetail", chapterDAO.findById(selectedChapterId));
            }
        } catch (SQLException e) {
            log.error("Failed to load authoring data", e);
            req.setAttribute("flash", "Error loading content: " + e.getMessage());
        }
        req.getRequestDispatcher("/WEB-INF/jsp/pages/admin/authoring.jsp").forward(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        String action = req.getParameter("action");
        String redirectCourseId = blankToNull(req.getParameter("_courseId"));
        String redirectChapterId = blankToNull(req.getParameter("_chapterId"));
        String message;

        try {
            if ("createCourse".equals(action)) {
                Course course = new Course();
                course.setCourseId(UUID.randomUUID().toString());
                course.setTitle(required(req, "title"));
                course.setDescription(req.getParameter("description"));
                course.setCategory(blankToNull(req.getParameter("category")));
                courseDAO.insert(course);
                redirectCourseId = course.getCourseId();
                message = "Course created.";

            } else if ("updateCourse".equals(action)) {
                String courseId = required(req, "courseId");
                courseDAO.update(courseId,
                        required(req, "title"),
                        req.getParameter("description"),
                        blankToNull(req.getParameter("category")));
                redirectCourseId = courseId;
                message = "Course updated.";

            } else if ("deleteCourse".equals(action)) {
                courseDAO.delete(required(req, "courseId"));
                redirectCourseId = null;
                redirectChapterId = null;
                message = "Course deleted.";

            } else if ("createChapter".equals(action)) {
                String courseId = required(req, "courseId");
                Chapter chapter = new Chapter();
                chapter.setId("ch-" + UUID.randomUUID());
                chapter.setTitle(required(req, "title"));
                chapter.setDescription(req.getParameter("description"));
                chapter.setXpReward(parseIntOr(req.getParameter("xpReward"), 0));
                int order = chapterDAO.findByCourse(courseId).size();
                chapterDAO.insert(courseId, chapter, order);
                redirectCourseId = courseId;
                message = "Chapter added.";

            } else if ("updateChapter".equals(action)) {
                chapterDAO.update(
                        required(req, "chapterId"),
                        required(req, "title"),
                        req.getParameter("description"),
                        parseIntOr(req.getParameter("xpReward"), 0));
                message = "Chapter updated.";

            } else if ("deleteChapter".equals(action)) {
                chapterDAO.delete(required(req, "chapterId"));
                redirectChapterId = null;
                message = "Chapter deleted.";

            } else if ("createVideoModule".equals(action)) {
                String chapterId = required(req, "chapterId");
                int order = moduleDAO.findByChapter(chapterId).size();
                ModuleInfo info = new ModuleInfo(
                        "mod-" + UUID.randomUUID(),
                        required(req, "title"),
                        order,
                        null);
                VideoModule vm = new VideoModule(
                        info,
                        required(req, "videoUrl"),
                        Duration.ofSeconds(parseIntOr(req.getParameter("durationSeconds"), 0)),
                        blankToNull(req.getParameter("thumbnailUrl")));
                moduleDAO.insert(chapterId, vm);
                message = "Video module added.";

            } else if ("createSlideModule".equals(action)) {
                String chapterId = required(req, "chapterId");
                int order = moduleDAO.findByChapter(chapterId).size();
                ModuleInfo info = new ModuleInfo(
                        "mod-" + UUID.randomUUID(),
                        required(req, "title"),
                        order,
                        null);
                int sps = parseIntOr(req.getParameter("secondsPerSlide"), 5);
                List<Slide> slides = new ArrayList<>();
                for (int i = 0; req.getParameter("imageUrl_" + i) != null; i++) {
                    String imgUrl = req.getParameter("imageUrl_" + i);
                    if (!imgUrl.isBlank()) {
                        slides.add(new Slide(i, imgUrl, blankToNull(req.getParameter("caption_" + i))));
                    }
                }
                if (slides.isEmpty()) throw new IllegalArgumentException("At least one slide image URL is required.");
                moduleDAO.insert(chapterId, new SlideModule(info, slides, sps));
                message = "Slide module added.";

            } else if ("deleteModule".equals(action)) {
                moduleDAO.delete(required(req, "moduleId"));
                message = "Module deleted.";

            } else if ("createQuiz".equals(action)) {
                String chapterId = required(req, "chapterId");
                MultipleChoiceQuestion mcq = buildMCQuestion(req, "q-" + UUID.randomUUID(),
                        required(req, "questionPrompt"),
                        parseIntOr(req.getParameter("questionPoints"), 10));
                Quiz quiz = new Quiz(
                        "quiz-" + UUID.randomUUID(),
                        required(req, "quizTitle"),
                        parseIntOr(req.getParameter("passingScore"), 70),
                        List.of(mcq));
                quizDAO.insert(chapterId, quiz);
                message = "Quiz created.";

            } else if ("deleteQuiz".equals(action)) {
                quizDAO.delete(required(req, "quizId"));
                message = "Quiz deleted.";

            } else if ("addQuestion".equals(action)) {
                String quizId = required(req, "quizId");
                String qType = required(req, "questionType");
                String prompt = required(req, "prompt");
                int points = parseIntOr(req.getParameter("points"), 10);
                int orderIdx = questionDAO.findByQuiz(quizId).size();
                QuestionInfo qInfo = new QuestionInfo("q-" + UUID.randomUUID(), prompt, points);
                Question question;
                if ("mc".equals(qType)) {
                    question = buildMCQuestion(req, qInfo.id(), prompt, points);
                } else {
                    String answers = required(req, "answers");
                    List<String> answerList = new ArrayList<>();
                    for (String a : answers.split(",")) {
                        String trimmed = a.trim();
                        if (!trimmed.isEmpty()) answerList.add(trimmed);
                    }
                    if (answerList.isEmpty()) throw new IllegalArgumentException("At least one correct answer required.");
                    question = new FillBlankQuestion(qInfo, answerList, "on".equals(req.getParameter("caseSensitive")));
                }
                questionDAO.insert(quizId, question, orderIdx);
                message = "Question added.";

            } else if ("deleteQuestion".equals(action)) {
                questionDAO.delete(required(req, "questionId"));
                message = "Question deleted.";

            } else {
                message = "Unknown action.";
            }
        } catch (IllegalArgumentException e) {
            message = e.getMessage();
        } catch (SQLException e) {
            log.error("Authoring action '{}' failed", action, e);
            message = "Database error: " + e.getMessage();
        }

        StringBuilder url = new StringBuilder(req.getContextPath()).append("/admin/content?msg=")
                .append(URLEncoder.encode(message, StandardCharsets.UTF_8));
        if (redirectCourseId != null) {
            url.append("&courseId=").append(URLEncoder.encode(redirectCourseId, StandardCharsets.UTF_8));
        }
        if (redirectChapterId != null) {
            url.append("&chapterId=").append(URLEncoder.encode(redirectChapterId, StandardCharsets.UTF_8));
        }
        resp.sendRedirect(url.toString());
    }

    // ── Helpers ──────────────────────────────────────────────────────────────

    private MultipleChoiceQuestion buildMCQuestion(HttpServletRequest req,
            String questionId, String prompt, int points) {
        List<MultipleChoiceQuestion.Option> opts = new ArrayList<>();
        Set<String> correctIds = new HashSet<>();
        String correctLetter = required(req, "correctOption");
        for (String letter : new String[]{"a", "b", "c", "d"}) {
            String text = req.getParameter("option_" + letter);
            if (text != null && !text.isBlank()) {
                String optId = "opt-" + letter;
                opts.add(new MultipleChoiceQuestion.Option(optId, text.trim()));
                if (letter.equals(correctLetter)) correctIds.add(optId);
            }
        }
        if (opts.size() < 2) throw new IllegalArgumentException("At least 2 answer options required.");
        if (correctIds.isEmpty()) throw new IllegalArgumentException("Select a correct answer option.");
        QuestionInfo qInfo = new QuestionInfo(questionId, prompt, points);
        return new MultipleChoiceQuestion(qInfo, opts, correctIds);
    }

    private static String required(HttpServletRequest req, String name) {
        String v = req.getParameter(name);
        if (v == null || v.isBlank()) throw new IllegalArgumentException("Missing required field: " + name);
        return v.trim();
    }

    private static String blankToNull(String s) {
        return (s == null || s.isBlank()) ? null : s.trim();
    }

    private static int parseIntOr(String s, int fallback) {
        try {
            return (s == null || s.isBlank()) ? fallback : Integer.parseInt(s.trim());
        } catch (NumberFormatException e) {
            return fallback;
        }
    }
}
