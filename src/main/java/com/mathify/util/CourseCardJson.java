package com.mathify.util;

import com.mathify.model.CourseCardView;

import java.util.List;
import java.util.Set;

/**
 * Serialises {@link CourseCardView} presentation models into the small JSON
 * shape consumed by the student React pages (library + all courses). Kept here
 * so the library and courses servlets share a single source of truth.
 */
public final class CourseCardJson {

    private CourseCardJson() {
    }

    public static String array(List<CourseCardView> courses) {
        StringBuilder sb = new StringBuilder("[");
        for (int i = 0; i < courses.size(); i++) {
            if (i > 0) sb.append(",");
            sb.append(one(courses.get(i)));
        }
        return sb.append("]").toString();
    }

    public static String one(CourseCardView c) {
        return "{" +
                "\"id\":\""     + esc(c.getId())             + "\"," +
                "\"title\":\""  + esc(c.getTitle())          + "\"," +
                "\"blurb\":\""  + esc(c.getDescription())    + "\"," +
                "\"track\":\""  + esc(c.getTrack())          + "\"," +
                "\"level\":"    + c.getLevelNum()            + ","   +
                "\"color\":\""  + esc(c.getColor())          + "\"," +
                "\"glyph\":\""  + esc(c.getGlyph())          + "\"," +
                "\"lessons\":"  + c.getTotalLessons()        + ","   +
                "\"hours\":\""  + esc(c.getEstimatedHours()) + "\"," +
                "\"xp\":"       + c.getXpReward()            + ","   +
                "\"status\":\"" + esc(c.getStatus())         + "\"}";
    }

    public static String ids(Set<String> ids) {
        StringBuilder sb = new StringBuilder("[");
        boolean first = true;
        for (String id : ids) {
            if (!first) sb.append(",");
            sb.append("\"").append(esc(id)).append("\"");
            first = false;
        }
        return sb.append("]").toString();
    }

    private static String esc(String s) {
        if (s == null) return "";
        return s.replace("\\", "\\\\")
                .replace("\"", "\\\"")
                .replace("\n", "\\n")
                .replace("\r", "");
    }
}
