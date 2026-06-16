<%@ page contentType="text/html;charset=UTF-8" language="java" isELIgnored="true" %>
<%@ page import="com.mathify.model.Admin" %>

<%
    String __assetBase = request.getContextPath() + "/assets/app";
    long __assetVer;
    try {
        String __rp = application.getRealPath("/assets/app/courseLibrary.js");
        __assetVer = (__rp != null) ? new java.io.File(__rp).lastModified() : System.currentTimeMillis();
    } catch (Exception e) { __assetVer = System.currentTimeMillis(); }
%>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Mathlify · Course Library</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&family=JetBrains+Mono:wght@400;600;700&family=Fraunces:ital,opsz,wght@1,9..144,400;1,9..144,600;1,9..144,700&display=swap" rel="stylesheet" />







  <link rel="stylesheet" href="<%= __assetBase %>/courseLibrary.css?v=<%= __assetVer %>"/>
</head>
<body>
  <div id="root"></div>


  <%-- Built React island (frontend/src/pages/courseLibrary, compiled by Vite). --%>
  <script type="module" src="<%= __assetBase %>/courseLibrary.js?v=<%= __assetVer %>"></script>
</body>
</html>
