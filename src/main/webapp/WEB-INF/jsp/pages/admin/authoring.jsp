<%@ page contentType="text/html;charset=UTF-8" language="java" isELIgnored="true" %>
<%@ page import="java.util.List" %>
<%@ page import="com.mathify.model.CourseCardView" %>
<%@ page import="com.mathify.model.Chapter" %>
<%!
    // HTML-escape helper for echoing user-supplied text safely.
    static String esc(String s) {
        if (s == null) return "";
        return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
                .replace("\"", "&quot;").replace("'", "&#39;");
    }
%>
<%
    String ctx = request.getContextPath();
    @SuppressWarnings("unchecked")
    List<CourseCardView> courses = (List<CourseCardView>) request.getAttribute("courses");
    @SuppressWarnings("unchecked")
    List<Chapter> chapters = (List<Chapter>) request.getAttribute("chapters");
    String selectedCourseId = (String) request.getAttribute("selectedCourseId");
    String flash = request.getParameter("msg");
%>
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>Mathify — Content Authoring</title>
<style>
  :root {
    --bg:#FBF8F1; --paper:#FFFDF7; --ink:#161816; --ink-3:#6B6E6A;
    --line:#E6DFCC; --green:#1F8A5B; --green-deep:#0E5A3A;
  }
  * { box-sizing:border-box; }
  body { margin:0; background:var(--bg); color:var(--ink);
         font-family:'Plus Jakarta Sans',system-ui,sans-serif; font-size:15px; line-height:1.5; }
  header { background:var(--paper); border-bottom:1px solid var(--line); padding:16px 28px;
           display:flex; align-items:center; justify-content:space-between; }
  header h1 { margin:0; font-size:18px; }
  header a { color:var(--green-deep); font-weight:600; text-decoration:none; font-size:13px; }
  main { max-width:1080px; margin:0 auto; padding:24px 28px 72px;
         display:grid; grid-template-columns:1fr 1fr; gap:20px; }
  .card { background:var(--paper); border:1px solid var(--line); border-radius:16px; padding:20px; }
  .card.full { grid-column:1 / -1; }
  h2 { font-size:15px; margin:0 0 14px; }
  label { display:block; font-size:12px; font-weight:600; color:var(--ink-3); margin:10px 0 4px; }
  input, textarea, select { width:100%; padding:8px 10px; border:1px solid var(--line);
         border-radius:8px; font:inherit; background:#fff; }
  button { margin-top:14px; padding:9px 16px; border:1px solid var(--green-deep);
           background:var(--green); color:#fff; font-weight:700; border-radius:9px; cursor:pointer; }
  table { width:100%; border-collapse:collapse; font-size:14px; }
  th, td { text-align:left; padding:8px 10px; border-bottom:1px solid var(--line); }
  th { font-size:11px; text-transform:uppercase; letter-spacing:.05em; color:var(--ink-3); }
  .muted { color:var(--ink-3); font-size:13px; }
  .flash { grid-column:1 / -1; background:#D7EBDF; border:1px solid var(--green);
           color:var(--green-deep); padding:10px 14px; border-radius:10px; font-weight:600; }
  .pill { font-family:monospace; font-size:11px; color:var(--ink-3); }
</style>
</head>
<body>
  <header>
    <h1>Content Authoring</h1>
    <a href="<%= ctx %>/admin/">← Back to dashboard</a>
  </header>
  <main>

    <% if (flash != null && !flash.isBlank()) { %>
      <div class="flash"><%= esc(flash) %></div>
    <% } %>

    <!-- Create course -->
    <div class="card">
      <h2>New course</h2>
      <form method="post" action="<%= ctx %>/admin/content">
        <input type="hidden" name="action" value="createCourse"/>
        <label>Title *</label>
        <input name="title" required maxlength="255"/>
        <label>Category / track</label>
        <input name="category" maxlength="100" placeholder="e.g. Calculus"/>
        <label>Description</label>
        <textarea name="description" rows="3"></textarea>
        <button type="submit">Create course</button>
      </form>
    </div>

    <!-- Add chapter -->
    <div class="card">
      <h2>Add chapter</h2>
      <% if (courses == null || courses.isEmpty()) { %>
        <p class="muted">Create a course first.</p>
      <% } else { %>
        <form method="post" action="<%= ctx %>/admin/content">
          <input type="hidden" name="action" value="createChapter"/>
          <label>Course *</label>
          <select name="courseId" required>
            <% for (CourseCardView c : courses) {
                 boolean sel = c.getId().equals(selectedCourseId); %>
              <option value="<%= esc(c.getId()) %>" <%= sel ? "selected" : "" %>><%= esc(c.getTitle()) %></option>
            <% } %>
          </select>
          <label>Title *</label>
          <input name="title" required maxlength="255"/>
          <label>XP reward</label>
          <input name="xpReward" type="number" min="0" value="0"/>
          <label>Description</label>
          <textarea name="description" rows="3"></textarea>
          <button type="submit">Add chapter</button>
        </form>
      <% } %>
    </div>

    <!-- Existing courses -->
    <div class="card full">
      <h2>Courses</h2>
      <% if (courses == null || courses.isEmpty()) { %>
        <p class="muted">No courses yet.</p>
      <% } else { %>
        <table>
          <thead><tr><th>Title</th><th>Track</th><th>Chapters</th><th></th></tr></thead>
          <tbody>
          <% for (CourseCardView c : courses) { %>
            <tr>
              <td><%= esc(c.getTitle()) %><br><span class="pill"><%= esc(c.getId()) %></span></td>
              <td><%= esc(c.getTrack()) %></td>
              <td><a href="<%= ctx %>/admin/content?courseId=<%= esc(c.getId()) %>">view / add ↗</a></td>
              <td class="muted"><%= esc(c.getDescription()) %></td>
            </tr>
          <% } %>
          </tbody>
        </table>
      <% } %>
    </div>

    <!-- Chapters of selected course -->
    <% if (selectedCourseId != null) { %>
      <div class="card full">
        <h2>Chapters in selected course</h2>
        <% if (chapters == null || chapters.isEmpty()) { %>
          <p class="muted">No chapters yet for this course.</p>
        <% } else { %>
          <table>
            <thead><tr><th>#</th><th>Title</th><th>XP</th><th>Modules</th><th>Quizzes</th></tr></thead>
            <tbody>
            <% int i = 1; for (Chapter ch : chapters) { %>
              <tr>
                <td><%= i++ %></td>
                <td><%= esc(ch.getTitle()) %><br><span class="pill"><%= esc(ch.getId()) %></span></td>
                <td><%= ch.getXpReward() %></td>
                <td><%= ch.getTotalModules() %></td>
                <td><%= ch.getTotalQuiz() %></td>
              </tr>
            <% } %>
            </tbody>
          </table>
        <% } %>
      </div>
    <% } %>

  </main>
</body>
</html>
