<%@ page contentType="text/html;charset=UTF-8" language="java" isELIgnored="true" %>
<% String ctx = request.getContextPath(); %>
<%
    String __assetBase = request.getContextPath() + "/assets/app";
    long __assetVer;
    try {
        String __rp = application.getRealPath("/assets/app/landing.js");
        __assetVer = (__rp != null) ? new java.io.File(__rp).lastModified() : System.currentTimeMillis();
    } catch (Exception e) { __assetVer = System.currentTimeMillis(); }
%>
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>Mathify — Learn Math the Right Way</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&family=Fraunces:opsz,wght@9..144,500;9..144,600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="<%= __assetBase %>/landing.css?v=<%= __assetVer %>"/>
</head>
<body>
  <div id="root"></div>

  <script>
    var PAGE_CTX = "<%= ctx %>";
  </script>


  <%-- Built React island (frontend/src/pages/landing, compiled by Vite). --%>
  <script type="module" src="<%= __assetBase %>/landing.js?v=<%= __assetVer %>"></script>
</body>
</html>
