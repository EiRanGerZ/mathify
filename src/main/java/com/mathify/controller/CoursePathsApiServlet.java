package com.mathify.controller;

import com.mathify.dao.CourseDAO;
import com.mathify.model.CourseCardView;

import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.json.JSONArray;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

/**
 * Course prerequisite paths — the "skill tree" wiring between courses.
 *
 * <pre>
 *   GET /api/courses/paths
 *     -> { nodes: [ {id,title,track,levelNum,color,glyph} ],
 *          edges: [ {from: prereqId, to: courseId} ] }    // whole prerequisite DAG
 *
 *   GET /api/courses/paths?courseId=X
 *     -> { target: X, path: [ {id,title,track,levelNum,color,glyph}, ... ] }
 *        // ordered completion path: transitive prerequisites first, X last
 * </pre>
 *
 * <p>An {@code edge {from, to}} reads "complete <em>from</em> before <em>to</em>".
 * The single-course form resolves the full transitive chain in one recursive CTE
 * ({@link CourseDAO#findPrerequisitePath}). Public catalog data — no auth needed.
 */
@WebServlet("/api/courses/paths")
public class CoursePathsApiServlet extends ApiServlet {

    private static final Logger log = LoggerFactory.getLogger(CoursePathsApiServlet.class);

    private final CourseDAO courseDAO = new CourseDAO();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws IOException {
        String courseId = req.getParameter("courseId");
        try {
            if (courseId != null && !courseId.isBlank()) {
                respondWithPath(resp, courseId.strip());
            } else {
                respondWithGraph(resp);
            }
        } catch (SQLException e) {
            log.error("Failed to load course paths (courseId={})", courseId, e);
            serverError(resp);
        }
    }

    /** The full prerequisite DAG: every course as a node, every prereq link as an edge. */
    private void respondWithGraph(HttpServletResponse resp) throws SQLException, IOException {
        JSONArray nodes = new JSONArray();
        for (CourseCardView c : courseDAO.findAll()) {
            nodes.put(nodeJson(c));
        }

        JSONArray edges = new JSONArray();
        for (CourseDAO.PrereqEdge e : courseDAO.findAllPrerequisites()) {
            edges.put(new JSONObject()
                    .put("from", e.prerequisiteId())
                    .put("to", e.courseId()));
        }

        writeJson(resp, HttpServletResponse.SC_OK,
                new JSONObject().put("nodes", nodes).put("edges", edges));
    }

    /** The ordered learning path to reach a single course. */
    private void respondWithPath(HttpServletResponse resp, String courseId) throws SQLException, IOException {
        List<CourseCardView> path = courseDAO.findPrerequisitePath(courseId);
        if (path.isEmpty()) {
            writeJson(resp, HttpServletResponse.SC_NOT_FOUND,
                    new JSONObject().put("error", "course_not_found"));
            return;
        }
        JSONArray arr = new JSONArray();
        for (CourseCardView c : path) {
            arr.put(nodeJson(c));
        }
        writeJson(resp, HttpServletResponse.SC_OK,
                new JSONObject().put("target", courseId).put("path", arr));
    }

    private static JSONObject nodeJson(CourseCardView c) {
        return new JSONObject()
                .put("id", c.getId())
                .put("title", c.getTitle())
                .put("track", c.getTrack())
                .put("levelNum", c.getLevelNum())
                .put("color", c.getColor())
                .put("glyph", c.getGlyph() != null ? c.getGlyph() : "");
    }
}
