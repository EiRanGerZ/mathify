<%@ page contentType="text/html;charset=UTF-8" language="java" isELIgnored="true" %>
<%
    String ctx           = request.getContextPath();
    String fbApiKey      = System.getenv("FIREBASE_API_KEY");            if (fbApiKey      == null) fbApiKey      = "";
    String fbAuthDomain  = System.getenv("FIREBASE_AUTH_DOMAIN");        if (fbAuthDomain  == null) fbAuthDomain  = "";
    String fbProjectId   = System.getenv("FIREBASE_PROJECT_ID");         if (fbProjectId   == null) fbProjectId   = "";
    String fbBucket      = System.getenv("FIREBASE_STORAGE_BUCKET");     if (fbBucket      == null) fbBucket      = "";
    String fbSenderId    = System.getenv("FIREBASE_MESSAGING_SENDER_ID");if (fbSenderId    == null) fbSenderId    = "";
    String fbAppId       = System.getenv("FIREBASE_APP_ID");             if (fbAppId       == null) fbAppId       = "";
%>
<%
    String __assetBase = request.getContextPath() + "/assets/app";
    long __assetVer;
    try {
        String __rp = application.getRealPath("/assets/app/register.js");
        __assetVer = (__rp != null) ? new java.io.File(__rp).lastModified() : System.currentTimeMillis();
    } catch (Exception e) { __assetVer = System.currentTimeMillis(); }
%>
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>Mathify — Create account</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&family=Fraunces:opsz,wght@9..144,500;9..144,600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="<%= __assetBase %>/register.css?v=<%= __assetVer %>"/>
</head>
<body>
  <div id="root"></div>

  <script>
    var PAGE_CTX = "<%= ctx %>";
    var FIREBASE_CONFIG = {
      apiKey:            "<%= fbApiKey %>",
      authDomain:        "<%= fbAuthDomain %>",
      projectId:         "<%= fbProjectId %>",
      storageBucket:     "<%= fbBucket %>",
      messagingSenderId: "<%= fbSenderId %>",
      appId:             "<%= fbAppId %>"
    };
  </script>

  <!-- Firebase compat SDK (must load before Babel/React) -->
  <script src="https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js"></script>
  <script src="https://www.gstatic.com/firebasejs/10.14.1/firebase-auth-compat.js"></script>
  <script>
    if (FIREBASE_CONFIG.apiKey) firebase.initializeApp(FIREBASE_CONFIG);
  </script>


  <%-- Built React island (frontend/src/pages/register, compiled by Vite). --%>
  <script type="module" src="<%= __assetBase %>/register.js?v=<%= __assetVer %>"></script>
</body>
</html>
