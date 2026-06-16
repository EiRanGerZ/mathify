<%@ page contentType="text/html;charset=UTF-8" language="java" isELIgnored="true" %>
<%@ page import="com.mathify.model.User, com.mathify.model.UserProgress" %>
<%
    HttpSession sess = request.getSession(false);
    User user = (sess != null) ? (User) sess.getAttribute("user") : null;
    UserProgress up = (sess != null) ? (UserProgress) sess.getAttribute("progress") : null;
    String userName = (user != null && user.getName() != null) ? user.getName() : "Student";
    int streak = (up != null) ? up.getCurrentStreak() : 0;
    int totalXP = (up != null) ? up.getTotalXP() : 0;
    String initial = String.valueOf(userName.charAt(0)).toUpperCase();
    String jsName = userName.replace("\\","\\\\").replace("\"","\\\"");
    String ctx = request.getContextPath();
%>
<%
    String __assetBase = request.getContextPath() + "/assets/app";
    long __assetVer;
    try {
        String __rp = application.getRealPath("/assets/app/quiz.js");
        __assetVer = (__rp != null) ? new java.io.File(__rp).lastModified() : System.currentTimeMillis();
    } catch (Exception e) { __assetVer = System.currentTimeMillis(); }
%>
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>Mathify — Quiz</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&family=Fraunces:opsz,wght@9..144,500;9..144,600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="<%= __assetBase %>/quiz.css?v=<%= __assetVer %>"/>
</head>
<body>
  <div id="root"></div>

  <script>
    var STUDENT_CONTEXT = {
      name:    "<%= jsName %>",
      initial: "<%= initial %>",
      streak:  <%= streak %>,
      xp:      <%= totalXP %>,
      ctx:     "<%= ctx %>"
    };
  </script>


  <%-- Built React island (frontend/src/pages/quiz, compiled by Vite). --%>
  <script type="module" src="<%= __assetBase %>/quiz.js?v=<%= __assetVer %>"></script>
</body>
</html>
