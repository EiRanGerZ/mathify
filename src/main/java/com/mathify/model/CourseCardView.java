package com.mathify.model;

/**
 * Presentation model for a course summary card (library grid, landing page).
 * Loaded from the {@code courses} table by {@link com.mathify.dao.CourseDAO}.
 * This is intentionally separate from the domain {@link Course} (chapters,
 * prerequisites) — it carries only what the UI needs to render a card.
 */
public class CourseCardView {
    private int    id;
    private String title;
    private String description;
    private String track;
    private String level;         // tier label e.g. "Beginner"
    private int    levelNum;      // numeric difficulty (1–13)
    private String color;         // UI key: green | blue | amber | plum | rose
    private String glyph;         // decorative math symbol
    private int    totalLessons;
    private String estimatedHours;
    private int    xpReward;
    private String status;        // new | recommended | locked

    public CourseCardView() {}

    public CourseCardView(int id, String title, String description, String level) {
        this.id          = id;
        this.title       = title;
        this.description = description;
        this.level       = level;
    }

    public int    getId()                    { return id; }
    public void   setId(int id)              { this.id = id; }

    public String getTitle()                 { return title; }
    public void   setTitle(String t)         { this.title = t; }

    public String getDescription()           { return description; }
    public void   setDescription(String d)   { this.description = d; }

    public String getTrack()                 { return track; }
    public void   setTrack(String t)         { this.track = t; }

    public String getLevel()                 { return level; }
    public void   setLevel(String l)         { this.level = l; }

    public int    getLevelNum()              { return levelNum; }
    public void   setLevelNum(int n)         { this.levelNum = n; }

    public String getColor()                 { return color; }
    public void   setColor(String c)         { this.color = c; }

    public String getGlyph()                 { return glyph; }
    public void   setGlyph(String g)         { this.glyph = g; }

    public int    getTotalLessons()          { return totalLessons; }
    public void   setTotalLessons(int n)     { this.totalLessons = n; }

    public String getEstimatedHours()        { return estimatedHours; }
    public void   setEstimatedHours(String h){ this.estimatedHours = h; }

    public int    getXpReward()              { return xpReward; }
    public void   setXpReward(int x)         { this.xpReward = x; }

    public String getStatus()                { return status; }
    public void   setStatus(String s)        { this.status = s; }
}
