<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<%
    String ctx       = request.getContextPath();
    String assetBase = ctx + "/assets/app";
    // Cache-bust by the built bundle's mtime so a fresh `vite build` is picked up
    // without bumping a version by hand (same pattern as the dashboard shell).
    long assetVer;
    try {
        String realPath = application.getRealPath("/assets/app/home.js");
        assetVer = (realPath != null) ? new java.io.File(realPath).lastModified() : System.currentTimeMillis();
    } catch (Exception e) {
        assetVer = System.currentTimeMillis();
    }
%>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Mathlify — A friendly adventure for mastering mathematics</title>

  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800&family=JetBrains+Mono:wght@400;600;700&family=Fraunces:ital,wght@1,400;1,500;1,600;1,700&display=swap" rel="stylesheet" />

  <link rel="stylesheet" href="<%= assetBase %>/home.css?v=<%= assetVer %>" />
</head>
<body>
  <div id="root"></div>

  <%-- Built React island (frontend/src/pages/home, compiled by Vite). --%>
  <script type="module" src="<%= assetBase %>/home.js?v=<%= assetVer %>"></script>
</body>
</html>
