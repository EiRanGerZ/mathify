<%@ page contentType="text/html;charset=UTF-8" language="java" isELIgnored="true" %>
<%@ page import="com.mathify.model.Admin" %>
<%
    Admin admin = (Admin) request.getAttribute("admin");
    String adminName = (admin != null && admin.getName() != null) ? admin.getName() : "Admin";
    String roleName  = (admin != null && admin.getRole() != null) ? admin.getRole().name() : "OWNER";
    String adminRole = roleName.substring(0, 1) + roleName.substring(1).toLowerCase();
    String adminInit = String.valueOf(adminName.charAt(0)).toUpperCase();
    String jsName    = adminName.replace("\\", "\\\\").replace("\"", "\\\"").replace("\n", "");
    String jsRole    = adminRole.replace("\\", "\\\\").replace("\"", "\\\"");
    String ctx       = request.getContextPath();
%>
<%
    String __assetBase = request.getContextPath() + "/assets/app";
    long __assetVer;
    try {
        String __rp = application.getRealPath("/assets/app/adminDashboard.js");
        __assetVer = (__rp != null) ? new java.io.File(__rp).lastModified() : System.currentTimeMillis();
    } catch (Exception e) { __assetVer = System.currentTimeMillis(); }
%>
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>Mathify — Admin Dashboard</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&family=Fraunces:opsz,wght@9..144,500;9..144,600&display=swap" rel="stylesheet">



  <link rel="stylesheet" href="<%= __assetBase %>/adminDashboard.css?v=<%= __assetVer %>"/>
</head>
<body class="min-h-screen">

  <%-- Alpine toast — listens for CustomEvents dispatched by React components --%>
  <div x-data="{ show: false, msg: '' }"
       x-on:admin-notify.window="msg = $event.detail.msg; show = true; setTimeout(() => show = false, 3500)">
    <div x-show="show" x-cloak
         x-transition:enter="transition ease-out duration-300"
         x-transition:enter-start="opacity-0 translate-y-2"
         x-transition:enter-end="opacity-100 translate-y-0"
         x-transition:leave="transition ease-in duration-150"
         x-transition:leave-end="opacity-0"
         class="fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] flex items-center gap-3 px-5 py-3 rounded-2xl text-sm font-semibold shadow-xl pointer-events-none"
         style="background: var(--ink); color: var(--paper); border: 1px solid rgba(255,255,255,0.08);">
      <svg width="13" height="13" viewBox="0 0 14 14" fill="currentColor" opacity="0.7">
        <path d="M7 1L8 6L13 7L8 8L7 13L6 8L1 7L6 6Z"/>
      </svg>
      <span x-text="msg"></span>
    </div>
  </div>

  <div id="root"></div>

  <script>
    var ADMIN_CONTEXT = {
      name:    "<%= jsName %>",
      role:    "<%= jsRole %>",
      initial: "<%= adminInit %>",
      ctx:     "<%= ctx %>"
    };
  </script>

  <script defer src="https://unpkg.com/alpinejs@3.14.3/dist/cdn.min.js"></script>






  <%-- Built React island (frontend/src/pages/adminDashboard, compiled by Vite). --%>
  <script type="module" src="<%= __assetBase %>/adminDashboard.js?v=<%= __assetVer %>"></script>
</body>
</html>
