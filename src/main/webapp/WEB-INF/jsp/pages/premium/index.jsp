<%@ page contentType="text/html;charset=UTF-8" language="java" isELIgnored="true" %>
<%@ page import="com.mathify.model.AuthUser" %>
<%
    HttpSession sess    = request.getSession(false);
    AuthUser authUser   = (sess != null) ? (AuthUser) sess.getAttribute("authUser") : null;

    String userName     = (authUser != null) ? authUser.preferredName() : "Student";
    String initial      = (authUser != null) ? authUser.initial()       : "S";
    String ctx          = request.getContextPath();

    Boolean premAttr    = (Boolean) request.getAttribute("premium");
    boolean premium     = premAttr != null && premAttr;
    Object  premPlanObj = request.getAttribute("premiumPlan");
    String  currentPlan = premium ? String.valueOf(premPlanObj) : "FREE";

    Boolean prodAttr    = (Boolean) request.getAttribute("isProduction");
    boolean isProduction = prodAttr != null && prodAttr;

    String jsName = userName.replace("\\", "\\\\").replace("\"", "\\\"");
    String jsPlan = currentPlan.replace("\"", "\\\"");

    String __assetBase = ctx + "/assets/app";
    long __assetVer;
    try {
        String __rp = application.getRealPath("/assets/app/premium.js");
        __assetVer = (__rp != null) ? new java.io.File(__rp).lastModified() : System.currentTimeMillis();
    } catch (Exception e) { __assetVer = System.currentTimeMillis(); }
%>
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>Mathify — Go Premium</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&family=Fraunces:opsz,wght@9..144,500;9..144,600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="<%= __assetBase %>/premium.css?v=<%= __assetVer %>"/>
</head>
<body>
  <div id="root"></div>

  <script>
    var PAGE_CTX = {
      name:        "<%= jsName %>",
      initial:     "<%= initial %>",
      ctx:         "<%= ctx %>",
      premium:     <%= premium %>,
      currentPlan: "<%= jsPlan %>",
      isProduction: <%= isProduction %>
    };
  </script>

  <%-- Built React island (frontend/src/pages/premium, compiled by Vite). --%>
  <script type="module" src="<%= __assetBase %>/premium.js?v=<%= __assetVer %>"></script>
</body>
</html>
