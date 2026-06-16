<%@ page contentType="text/html;charset=UTF-8" language="java" isELIgnored="true" %>
<%@ page import="com.mathify.model.AuthUser, com.mathify.model.UserProgress" %>
<%
    HttpSession  sess     = request.getSession(false);
    AuthUser     authUser = (sess != null) ? (AuthUser)     sess.getAttribute("authUser") : null;
    UserProgress up       = (sess != null) ? (UserProgress) sess.getAttribute("progress") : null;

    String userName = (authUser != null) ? authUser.preferredName() : "Student";
    String initial  = (authUser != null) ? authUser.initial()       : "S";
    int    streak   = (up != null) ? up.getCurrentStreak() : 0;
    int    totalXP  = (up != null) ? up.getTotalXP()       : 0;
    int    level    = (up != null) ? up.getLevel()         : 1;
    String jsName   = userName.replace("\\", "\\\\").replace("\"", "\\\"");
    String ctx      = request.getContextPath();

    String __assetBase = ctx + "/assets/app";
    long __assetVer;
    try {
        String __rp = application.getRealPath("/assets/app/courses.js");
        __assetVer = (__rp != null) ? new java.io.File(__rp).lastModified() : System.currentTimeMillis();
    } catch (Exception e) { __assetVer = System.currentTimeMillis(); }
%>
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>Mathify — All Courses</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&family=Fraunces:opsz,wght@9..144,500;9..144,600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="<%= __assetBase %>/courses.css?v=<%= __assetVer %>"/>
</head>
<body>

  <%-- Alpine toast — React dispatches `student-notify` (e.g. after enroll redirect). --%>
  <div x-data="{ show: false, msg: '' }"
       x-on:student-notify.window="msg = $event.detail.msg; show = true; setTimeout(() => show = false, 3500)">
    <div x-show="show" x-cloak
         x-transition:enter="transition ease-out duration-300"
         x-transition:enter-start="opacity-0 translate-y-2"
         x-transition:enter-end="opacity-100 translate-y-0"
         x-transition:leave="transition ease-in duration-150"
         x-transition:leave-end="opacity-0"
         class="fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] flex items-center gap-3 px-5 py-3 rounded-2xl text-sm font-semibold shadow-xl pointer-events-none"
         style="background: var(--ink); color: var(--paper); border: 1px solid rgba(255,255,255,0.08);">
      <span x-text="msg"></span>
    </div>
  </div>

  <div id="root"></div>

  <script>
    var STUDENT_CONTEXT = {
      name:    "<%= jsName %>",
      initial: "<%= initial %>",
      streak:  <%= streak %>,
      xp:      <%= totalXP %>,
      level:   <%= level %>,
      ctx:     "<%= ctx %>"
    };
    var ACTIVE_NAV    = "courses";
    var COURSES_DATA  = <%= request.getAttribute("coursesJson")     != null ? request.getAttribute("coursesJson")     : "[]" %>;
    var ENROLLED_IDS  = <%= request.getAttribute("enrolledIdsJson") != null ? request.getAttribute("enrolledIdsJson") : "[]" %>;
    var COMPLETED_IDS = <%= request.getAttribute("completedIdsJson")!= null ? request.getAttribute("completedIdsJson"): "[]" %>;
  </script>

  <script defer src="https://unpkg.com/alpinejs@3.14.3/dist/cdn.min.js"></script>

  <%-- Built React island (frontend/src/pages/courses, compiled by Vite). --%>
  <script type="module" src="<%= __assetBase %>/courses.js?v=<%= __assetVer %>"></script>
</body>
</html>
