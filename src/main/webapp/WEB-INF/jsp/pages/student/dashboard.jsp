<%@ page contentType="text/html;charset=UTF-8" language="java" isELIgnored="true" %>
<%@ page import="com.mathify.model.AuthUser, com.mathify.model.UserProgress" %>
<%
    HttpSession  sess     = request.getSession(false);
    AuthUser     authUser = (sess != null) ? (AuthUser)     sess.getAttribute("authUser") : null;
    UserProgress up       = (sess != null) ? (UserProgress) sess.getAttribute("progress") : null;

    String userName = (authUser != null) ? authUser.preferredName() : "Student";
    String initial  = (authUser != null) ? authUser.initial() : "S";
    int    streak   = (up != null) ? up.getCurrentStreak() : 0;
    int    totalXP  = (up != null) ? up.getTotalXP()       : 0;
    int    level    = (up != null) ? up.getLevel()          : 1;
    String jsName   = userName.replace("\\", "\\\\").replace("\"", "\\\"");
    String ctx      = request.getContextPath();

    Boolean premiumAttr = (Boolean) request.getAttribute("premium");
    boolean premium     = premiumAttr != null && premiumAttr;
    Object  premPlan    = request.getAttribute("premiumPlan");
    Object  premExpiry  = request.getAttribute("premiumExpiry");
    String  upgrade     = request.getParameter("upgrade"); // success | pending | failed

    // Built Vite bundle (frontend/src/pages/dashboard). Cache-bust by the file's
    // mtime so a fresh `vite build` is picked up without bumping a version by hand.
    String assetBase = ctx + "/assets/app";
    long   assetVer;
    try {
        String realPath = application.getRealPath("/assets/app/dashboard.js");
        assetVer = (realPath != null) ? new java.io.File(realPath).lastModified() : System.currentTimeMillis();
    } catch (Exception e) {
        assetVer = System.currentTimeMillis();
    }
%>
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>Mathify — Dashboard</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&family=Fraunces:opsz,wght@9..144,500;9..144,600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="<%= assetBase %>/dashboard.css?v=<%= assetVer %>"/>
</head>
<body>

  <%-- Server-rendered payment flash + premium strip (outside the React tree). --%>
  <% if (upgrade != null) {
       String flashText; String flashBg; String flashFg;
       if ("success".equals(upgrade))      { flashText = "✓ Payment confirmed — welcome to Mathify Premium!"; flashBg = "var(--green-soft)"; flashFg = "var(--green-deep)"; }
       else if ("pending".equals(upgrade)) { flashText = "⏳ Payment pending — premium unlocks once it settles."; flashBg = "var(--amber-soft)"; flashFg = "var(--amber-deep)"; }
       else                                { flashText = "✕ Payment was not completed. You have not been charged."; flashBg = "var(--rose-soft)"; flashFg = "var(--rose)"; }
  %>
    <div style="max-width:1280px;margin:12px auto 0;padding:10px 16px;border-radius:12px;font-weight:600;font-size:14px;background:<%= flashBg %>;color:<%= flashFg %>;">
      <%= flashText %>
    </div>
  <% } %>

  <div style="max-width:1280px;margin:12px auto 0;padding:0 16px;">
    <% if (premium) { %>
      <div style="display:inline-flex;align-items:center;gap:8px;padding:6px 12px;border-radius:999px;background:var(--amber-soft);color:var(--amber-deep);font-weight:700;font-size:13px;">
        ★ Premium · <%= premPlan %><% if (premExpiry != null) { %> · until <%= premExpiry %><% } %>
      </div>
    <% } else { %>
      <div style="display:flex;flex-wrap:wrap;align-items:center;gap:10px;">
        <span style="color:var(--ink-3);font-size:13px;font-weight:600;">Unlock everything with Premium —</span>
        <a href="<%= ctx %>/checkout?plan=MONTHLY" style="padding:7px 14px;border-radius:999px;background:var(--ink);color:var(--paper);font-weight:700;font-size:13px;">Monthly · Rp 150.000</a>
        <a href="<%= ctx %>/checkout?plan=ANNUAL" style="padding:7px 14px;border-radius:999px;background:var(--amber);color:#fff;font-weight:700;font-size:13px;">Annual · Rp 1.500.000</a>
      </div>
    <% } %>
  </div>

  <div id="root"></div>

  <%-- Server-injected page context, read by the bundle (shared/context.js). --%>
  <script>
    var STUDENT_CONTEXT = {
      name:    "<%= jsName %>",
      initial: "<%= initial %>",
      streak:  <%= streak %>,
      xp:      <%= totalXP %>,
      level:   <%= level %>,
      ctx:     "<%= ctx %>"
    };
  </script>

  <%-- Built React island (frontend/, compiled by Vite). --%>
  <script type="module" src="<%= assetBase %>/dashboard.js?v=<%= assetVer %>"></script>

</body>
</html>
