<%@ page contentType="text/html;charset=UTF-8" language="java" isELIgnored="true" %>
<%@ page import="java.util.List" %>
<%@ page import="com.mathify.model.CourseCardView" %>
<%@ page import="com.mathify.model.Chapter" %>
<%@ page import="com.mathify.model.LearningModule" %>
<%@ page import="com.mathify.model.ModuleType" %>
<%@ page import="com.mathify.model.Quiz" %>
<%@ page import="com.mathify.model.Question" %>
<%@ page import="com.mathify.model.MultipleChoiceQuestion" %>
<%@ page import="com.mathify.model.FillBlankQuestion" %>
<%!
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
    String selectedCourseId  = (String)  request.getAttribute("selectedCourseId");
    String selectedChapterId = (String)  request.getAttribute("selectedChapterId");
    Chapter chapterDetail    = (Chapter) request.getAttribute("chapterDetail");
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
    --line:#E6DFCC; --green:#1F8A5B; --green-deep:#0E5A3A; --red:#C0392B;
  }
  * { box-sizing:border-box; }
  body { margin:0; background:var(--bg); color:var(--ink);
         font-family:'Plus Jakarta Sans',system-ui,sans-serif; font-size:15px; line-height:1.5; }
  header { background:var(--paper); border-bottom:1px solid var(--line); padding:16px 28px;
           display:flex; align-items:center; justify-content:space-between; }
  header h1 { margin:0; font-size:18px; }
  header a  { color:var(--green-deep); font-weight:600; text-decoration:none; font-size:13px; }
  main { max-width:1100px; margin:0 auto; padding:24px 28px 72px;
         display:grid; grid-template-columns:1fr 1fr; gap:20px; }
  .card { background:var(--paper); border:1px solid var(--line); border-radius:16px; padding:20px; }
  .card.full { grid-column:1 / -1; }
  h2 { font-size:15px; margin:0 0 14px; }
  h3 { font-size:12px; font-weight:700; text-transform:uppercase; letter-spacing:.06em;
       color:var(--ink-3); margin:18px 0 8px; }
  label { display:block; font-size:12px; font-weight:600; color:var(--ink-3); margin:8px 0 3px; }
  input, textarea, select { width:100%; padding:8px 10px; border:1px solid var(--line);
         border-radius:8px; font:inherit; background:#fff; }
  input[type="checkbox"] { width:auto; margin-right:6px; }
  button { padding:8px 14px; border-radius:8px; cursor:pointer; font:inherit; font-weight:600; border:none; }
  .btn-primary { background:var(--green); color:#fff; margin-top:12px; display:inline-block; }
  .btn-sm { font-size:12px; padding:5px 12px; margin-top:8px; }
  .btn-danger { background:#fff; color:var(--red); border:1px solid #f5c6c2;
                font-size:12px; padding:4px 10px; margin:0; }
  .btn-link { background:none; border:none; color:var(--green-deep); font-weight:600;
              font-size:13px; padding:0; cursor:pointer; text-decoration:none; }
  table { width:100%; border-collapse:collapse; font-size:14px; margin-top:6px; }
  th, td { text-align:left; padding:8px 10px; border-bottom:1px solid var(--line); vertical-align:middle; }
  th { font-size:11px; text-transform:uppercase; letter-spacing:.05em; color:var(--ink-3); }
  .muted { color:var(--ink-3); font-size:13px; }
  .flash { grid-column:1 / -1; background:#D7EBDF; border:1px solid var(--green);
           color:var(--green-deep); padding:10px 14px; border-radius:10px; font-weight:600; }
  .pill { font-family:monospace; font-size:11px; color:var(--ink-3); display:block; margin-top:2px; }
  .badge { display:inline-block; font-size:10px; font-weight:700; padding:2px 7px;
           border-radius:4px; text-transform:uppercase; letter-spacing:.04em; }
  .badge-video { background:#dbeafe; color:#1d4ed8; }
  .badge-slide { background:#fef3c7; color:#92400e; }
  .badge-mc   { background:#e0e7ff; color:#3730a3; }
  .badge-fb   { background:#fce7f3; color:#9d174d; }
  .badge-dd   { background:#d1fae5; color:#065f46; }
  details { margin-top:10px; }
  details > summary { cursor:pointer; color:var(--green-deep); font-size:13px;
                      font-weight:600; list-style:none; user-select:none; }
  details > summary::-webkit-details-marker { display:none; }
  details > .expand-body { border:1px solid var(--line); border-radius:10px; padding:14px;
                           margin-top:8px; background:#fafaf8; }
  .quiz-block { border:1px solid var(--line); border-radius:10px; padding:14px; margin-bottom:12px; }
  .quiz-header { display:flex; justify-content:space-between; align-items:flex-start;
                 gap:12px; margin-bottom:10px; }
  .row-actions { display:flex; gap:8px; align-items:center; white-space:nowrap; }
  .inline-form { display:inline; margin:0; }
  hr { border:none; border-top:1px solid var(--line); margin:16px 0; }
  .two-col { display:grid; grid-template-columns:1fr 1fr; gap:10px; }
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

  <!-- ══ New Course ══════════════════════════════════════════════════════ -->
  <div class="card">
    <h2>New course</h2>
    <form method="post" action="<%= ctx %>/admin/content">
      <input type="hidden" name="action" value="createCourse"/>
      <label>Title *</label>
      <input name="title" required maxlength="255"/>
      <label>Category / track</label>
      <input name="category" maxlength="100" placeholder="e.g. Calculus"/>
      <label>Description</label>
      <textarea name="description" rows="2"></textarea>
      <button type="submit" class="btn-primary btn-sm">Create course</button>
    </form>
  </div>

  <!-- ══ Add Chapter ═════════════════════════════════════════════════════ -->
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
        <textarea name="description" rows="2"></textarea>
        <button type="submit" class="btn-primary btn-sm">Add chapter</button>
      </form>
    <% } %>
  </div>

  <!-- ══ Courses Table ═══════════════════════════════════════════════════ -->
  <div class="card full">
    <h2>Courses</h2>
    <% if (courses == null || courses.isEmpty()) { %>
      <p class="muted">No courses yet.</p>
    <% } else { %>
      <table>
        <thead>
          <tr><th>Title / ID</th><th>Track</th><th>Description</th><th>Actions</th></tr>
        </thead>
        <tbody>
        <% for (CourseCardView c : courses) { %>
          <tr>
            <td>
              <strong><%= esc(c.getTitle()) %></strong>
              <span class="pill"><%= esc(c.getId()) %></span>
              <details>
                <summary>Edit ▾</summary>
                <div class="expand-body">
                  <form method="post" action="<%= ctx %>/admin/content">
                    <input type="hidden" name="action"   value="updateCourse"/>
                    <input type="hidden" name="courseId" value="<%= esc(c.getId()) %>"/>
                    <input type="hidden" name="_courseId" value="<%= esc(c.getId()) %>"/>
                    <label>Title *</label>
                    <input name="title" value="<%= esc(c.getTitle()) %>" required/>
                    <label>Category / track</label>
                    <input name="category" value="<%= esc(c.getTrack()) %>"/>
                    <label>Description</label>
                    <textarea name="description" rows="2"><%= esc(c.getDescription()) %></textarea>
                    <button type="submit" class="btn-primary btn-sm">Save</button>
                  </form>
                </div>
              </details>
            </td>
            <td><%= esc(c.getTrack()) %></td>
            <td class="muted"><%= esc(c.getDescription()) %></td>
            <td>
              <div class="row-actions">
                <a href="<%= ctx %>/admin/content?courseId=<%= esc(c.getId()) %>" class="btn-link">Manage →</a>
                <form method="post" action="<%= ctx %>/admin/content" class="inline-form"
                      onsubmit="return confirm('Delete this course and all its chapters?')">
                  <input type="hidden" name="action"   value="deleteCourse"/>
                  <input type="hidden" name="courseId" value="<%= esc(c.getId()) %>"/>
                  <button type="submit" class="btn-danger">Delete</button>
                </form>
              </div>
            </td>
          </tr>
        <% } %>
        </tbody>
      </table>
    <% } %>
  </div>

  <!-- ══ Chapters Table ═════════════════════════════════════════════════ -->
  <% if (selectedCourseId != null) { %>
    <div class="card full">
      <h2>Chapters</h2>
      <% if (chapters == null || chapters.isEmpty()) { %>
        <p class="muted">No chapters yet — add one above.</p>
      <% } else { %>
        <table>
          <thead>
            <tr><th>#</th><th>Title / ID</th><th>XP</th><th>Modules</th><th>Quizzes</th><th>Actions</th></tr>
          </thead>
          <tbody>
          <% int ci = 1; for (Chapter ch : chapters) { %>
            <tr>
              <td><%= ci++ %></td>
              <td>
                <strong><%= esc(ch.getTitle()) %></strong>
                <span class="pill"><%= esc(ch.getId()) %></span>
                <details>
                  <summary>Edit ▾</summary>
                  <div class="expand-body">
                    <form method="post" action="<%= ctx %>/admin/content">
                      <input type="hidden" name="action"    value="updateChapter"/>
                      <input type="hidden" name="chapterId" value="<%= esc(ch.getId()) %>"/>
                      <input type="hidden" name="_courseId" value="<%= esc(selectedCourseId) %>"/>
                      <label>Title *</label>
                      <input name="title" value="<%= esc(ch.getTitle()) %>" required/>
                      <label>XP reward</label>
                      <input name="xpReward" type="number" value="<%= ch.getXpReward() %>"/>
                      <label>Description</label>
                      <textarea name="description" rows="2"><%= esc(ch.getDescription()) %></textarea>
                      <button type="submit" class="btn-primary btn-sm">Save</button>
                    </form>
                  </div>
                </details>
              </td>
              <td><%= ch.getXpReward() %></td>
              <td><%= ch.getTotalModules() %></td>
              <td><%= ch.getTotalQuiz() %></td>
              <td>
                <div class="row-actions">
                  <a href="<%= ctx %>/admin/content?courseId=<%= esc(selectedCourseId) %>&chapterId=<%= esc(ch.getId()) %>"
                     class="btn-link">Expand →</a>
                  <form method="post" action="<%= ctx %>/admin/content" class="inline-form"
                        onsubmit="return confirm('Delete chapter and all its modules and quizzes?')">
                    <input type="hidden" name="action"    value="deleteChapter"/>
                    <input type="hidden" name="chapterId" value="<%= esc(ch.getId()) %>"/>
                    <input type="hidden" name="_courseId" value="<%= esc(selectedCourseId) %>"/>
                    <button type="submit" class="btn-danger">Delete</button>
                  </form>
                </div>
              </td>
            </tr>
          <% } %>
          </tbody>
        </table>
      <% } %>
    </div>
  <% } %>

  <!-- ══ Chapter Detail (Modules + Quizzes) ════════════════════════════ -->
  <% if (chapterDetail != null) {
       List<LearningModule> modules = chapterDetail.getModules();
       List<Quiz> quizzes           = chapterDetail.getQuizzes();
  %>
    <div class="card full">
      <h2>Chapter: <%= esc(chapterDetail.getTitle()) %></h2>

      <!-- ── Modules ─────────────────────────────────────────────────── -->
      <h3>Modules (<%= chapterDetail.getTotalModules() %>)</h3>
      <% if (modules.isEmpty()) { %>
        <p class="muted">No modules yet.</p>
      <% } else { %>
        <table>
          <thead><tr><th>#</th><th>Type</th><th>Title</th><th></th></tr></thead>
          <tbody>
          <% int mi = 1; for (LearningModule m : modules) { %>
            <tr>
              <td><%= mi++ %></td>
              <td>
                <% if (m.getType() == ModuleType.VIDEO) { %>
                  <span class="badge badge-video">Video</span>
                <% } else { %>
                  <span class="badge badge-slide">Slide</span>
                <% } %>
              </td>
              <td><%= esc(m.getTitle()) %></td>
              <td>
                <form method="post" action="<%= ctx %>/admin/content" class="inline-form"
                      onsubmit="return confirm('Delete this module?')">
                  <input type="hidden" name="action"      value="deleteModule"/>
                  <input type="hidden" name="moduleId"    value="<%= esc(m.getId()) %>"/>
                  <input type="hidden" name="_courseId"   value="<%= esc(selectedCourseId) %>"/>
                  <input type="hidden" name="_chapterId"  value="<%= esc(chapterDetail.getId()) %>"/>
                  <button type="submit" class="btn-danger">Delete</button>
                </form>
              </td>
            </tr>
          <% } %>
          </tbody>
        </table>
      <% } %>

      <!-- Add Video Module -->
      <details>
        <summary>+ Add Video Module</summary>
        <div class="expand-body">
          <form method="post" action="<%= ctx %>/admin/content">
            <input type="hidden" name="action"     value="createVideoModule"/>
            <input type="hidden" name="chapterId"  value="<%= esc(chapterDetail.getId()) %>"/>
            <input type="hidden" name="_courseId"  value="<%= esc(selectedCourseId) %>"/>
            <input type="hidden" name="_chapterId" value="<%= esc(chapterDetail.getId()) %>"/>
            <label>Title *</label>
            <input name="title" required/>
            <label>Video URL *</label>
            <input name="videoUrl" required placeholder="https://..."/>
            <div class="two-col">
              <div>
                <label>Duration (seconds)</label>
                <input name="durationSeconds" type="number" min="0" value="0"/>
              </div>
              <div>
                <label>Thumbnail URL</label>
                <input name="thumbnailUrl" placeholder="optional"/>
              </div>
            </div>
            <button type="submit" class="btn-primary btn-sm">Add Video Module</button>
          </form>
        </div>
      </details>

      <!-- Add Slide Module -->
      <details>
        <summary>+ Add Slide Module</summary>
        <div class="expand-body">
          <form method="post" action="<%= ctx %>/admin/content">
            <input type="hidden" name="action"     value="createSlideModule"/>
            <input type="hidden" name="chapterId"  value="<%= esc(chapterDetail.getId()) %>"/>
            <input type="hidden" name="_courseId"  value="<%= esc(selectedCourseId) %>"/>
            <input type="hidden" name="_chapterId" value="<%= esc(chapterDetail.getId()) %>"/>
            <div class="two-col">
              <div>
                <label>Title *</label>
                <input name="title" required/>
              </div>
              <div>
                <label>Seconds per slide</label>
                <input name="secondsPerSlide" type="number" min="1" value="5"/>
              </div>
            </div>
            <hr/>
            <strong style="font-size:13px">Slide 1</strong>
            <label>Image URL *</label>
            <input name="imageUrl_0" required placeholder="https://..."/>
            <label>Caption</label>
            <input name="caption_0" placeholder="optional"/>
            <button type="submit" class="btn-primary btn-sm">Add Slide Module</button>
          </form>
        </div>
      </details>

      <hr/>

      <!-- ── Quizzes ─────────────────────────────────────────────────── -->
      <h3>Quizzes (<%= chapterDetail.getTotalQuiz() %>)</h3>

      <% for (Quiz quiz : quizzes) { %>
        <div class="quiz-block">
          <div class="quiz-header">
            <div>
              <strong><%= esc(quiz.getTitle()) %></strong>
              <span class="muted"> — Passing: <%= quiz.getPassingScore() %>% &nbsp;·&nbsp; <%= quiz.getQuestions().size() %> question(s)</span>
              <span class="pill"><%= esc(quiz.getQuizId()) %></span>
            </div>
            <form method="post" action="<%= ctx %>/admin/content" class="inline-form"
                  onsubmit="return confirm('Delete this quiz and all its questions?')">
              <input type="hidden" name="action"     value="deleteQuiz"/>
              <input type="hidden" name="quizId"     value="<%= esc(quiz.getQuizId()) %>"/>
              <input type="hidden" name="_courseId"  value="<%= esc(selectedCourseId) %>"/>
              <input type="hidden" name="_chapterId" value="<%= esc(chapterDetail.getId()) %>"/>
              <button type="submit" class="btn-danger">Delete Quiz</button>
            </form>
          </div>

          <!-- Questions -->
          <table>
            <thead><tr><th>#</th><th>Type</th><th>Prompt</th><th>Pts</th><th></th></tr></thead>
            <tbody>
            <% int qi = 1; for (Question q : quiz.getQuestions()) { %>
              <tr>
                <td><%= qi++ %></td>
                <td>
                  <% if (q instanceof MultipleChoiceQuestion) { %>
                    <span class="badge badge-mc">MC</span>
                  <% } else if (q instanceof FillBlankQuestion) { %>
                    <span class="badge badge-fb">Fill</span>
                  <% } else { %>
                    <span class="badge badge-dd">D&amp;D</span>
                  <% } %>
                </td>
                <td><%= esc(q.getPrompt()) %></td>
                <td><%= q.getPoints() %></td>
                <td>
                  <form method="post" action="<%= ctx %>/admin/content" class="inline-form"
                        onsubmit="return confirm('Delete this question?')">
                    <input type="hidden" name="action"     value="deleteQuestion"/>
                    <input type="hidden" name="questionId" value="<%= esc(q.getId()) %>"/>
                    <input type="hidden" name="_courseId"  value="<%= esc(selectedCourseId) %>"/>
                    <input type="hidden" name="_chapterId" value="<%= esc(chapterDetail.getId()) %>"/>
                    <button type="submit" class="btn-danger">Delete</button>
                  </form>
                </td>
              </tr>
            <% } %>
            </tbody>
          </table>

          <!-- Add Question -->
          <details>
            <summary>+ Add Question</summary>
            <div class="expand-body">
              <form method="post" action="<%= ctx %>/admin/content">
                <input type="hidden" name="action"     value="addQuestion"/>
                <input type="hidden" name="quizId"     value="<%= esc(quiz.getQuizId()) %>"/>
                <input type="hidden" name="_courseId"  value="<%= esc(selectedCourseId) %>"/>
                <input type="hidden" name="_chapterId" value="<%= esc(chapterDetail.getId()) %>"/>
                <div class="two-col">
                  <div>
                    <label>Type</label>
                    <select name="questionType" onchange="toggleQFields(this)">
                      <option value="mc">Multiple Choice</option>
                      <option value="fill_blank">Fill in the Blank</option>
                    </select>
                  </div>
                  <div>
                    <label>Points</label>
                    <input name="points" type="number" min="1" value="10"/>
                  </div>
                </div>
                <label>Prompt *</label>
                <input name="prompt" required/>

                <div class="mc-fields">
                  <div class="two-col">
                    <div><label>Option A *</label><input name="option_a" required/></div>
                    <div><label>Option B *</label><input name="option_b" required/></div>
                    <div><label>Option C</label><input name="option_c"/></div>
                    <div><label>Option D</label><input name="option_d"/></div>
                  </div>
                  <label>Correct option *</label>
                  <select name="correctOption">
                    <option value="a">A</option>
                    <option value="b">B</option>
                    <option value="c">C</option>
                    <option value="d">D</option>
                  </select>
                </div>

                <div class="fb-fields" style="display:none">
                  <label>Correct answers (comma-separated) *</label>
                  <input name="answers"/>
                  <label style="margin-top:8px">
                    <input type="checkbox" name="caseSensitive"/> Case sensitive
                  </label>
                </div>

                <button type="submit" class="btn-primary btn-sm">Add Question</button>
              </form>
            </div>
          </details>
        </div><!-- /quiz-block -->
      <% } %>

      <!-- Create New Quiz -->
      <details>
        <summary>+ Create New Quiz</summary>
        <div class="expand-body">
          <form method="post" action="<%= ctx %>/admin/content">
            <input type="hidden" name="action"     value="createQuiz"/>
            <input type="hidden" name="chapterId"  value="<%= esc(chapterDetail.getId()) %>"/>
            <input type="hidden" name="_courseId"  value="<%= esc(selectedCourseId) %>"/>
            <input type="hidden" name="_chapterId" value="<%= esc(chapterDetail.getId()) %>"/>
            <div class="two-col">
              <div>
                <label>Quiz title *</label>
                <input name="quizTitle" required/>
              </div>
              <div>
                <label>Passing score (%)</label>
                <input name="passingScore" type="number" min="0" max="100" value="70"/>
              </div>
            </div>
            <hr/>
            <strong style="font-size:13px">First Question (Multiple Choice)</strong>
            <label>Prompt *</label>
            <input name="questionPrompt" required/>
            <label>Points</label>
            <input name="questionPoints" type="number" min="1" value="10"/>
            <div class="two-col">
              <div><label>Option A *</label><input name="option_a" required/></div>
              <div><label>Option B *</label><input name="option_b" required/></div>
              <div><label>Option C</label><input name="option_c"/></div>
              <div><label>Option D</label><input name="option_d"/></div>
            </div>
            <label>Correct option *</label>
            <select name="correctOption">
              <option value="a">A</option>
              <option value="b">B</option>
              <option value="c">C</option>
              <option value="d">D</option>
            </select>
            <button type="submit" class="btn-primary btn-sm">Create Quiz</button>
          </form>
        </div>
      </details>

    </div><!-- /card full -->
  <% } %>

</main>
<script>
  function toggleQFields(sel) {
    var form = sel.closest('form');
    var mc = form.querySelector('.mc-fields');
    var fb = form.querySelector('.fb-fields');
    var isMC = sel.value === 'mc';
    mc.style.display = isMC ? '' : 'none';
    fb.style.display = isMC ? 'none' : '';
    var optA = form.querySelector('[name="option_a"]');
    var optB = form.querySelector('[name="option_b"]');
    var ans  = form.querySelector('[name="answers"]');
    if (optA) optA.required = isMC;
    if (optB) optB.required = isMC;
    if (ans)  ans.required  = !isMC;
  }
</script>
</body>
</html>
