# Mathify

A focused yet casual math learning platform with gamification elements. Mathify combines the engaging progression mechanics of apps like Duolingo with a more formal course structure — covering topics from basic arithmetic to linear algebra and calculus.

## Features

- Structured math courses (Basic Math, Calculus, Linear Algebra, and more)
- Gamified learning experience (XP, streaks, progression)
- Course-based curriculum with formal chapter structure
- Web-based, accessible from any browser

## Tech Stack

Multi-page server-rendered built with **JSP + JSTL** for
templating, **Alpine.js** for client interactivity, and **Tailwind CSS**
(via CDN) for styling. Targets Jakarta EE 10 / Servlet 6 (Tomcat 10.1+).

| Layer | Technology |
|---|---|
| Backend | Java Servlets (Jakarta EE) |
| Frontend | JSP, HTML/CSS/JS |
| Database | PostgreSQL |
| Build Tool | Maven |
| Runtime | Apache Tomcat 10 |
| Containerization | Docker |

## Prerequisites

- [Docker](https://www.docker.com/) and Docker Compose
- Java 17+
- Maven 3.9+ (or use the included `mvnw` wrapper)

## Getting Started

### Run with Docker (recommended)

```bash
docker compose up --build -d
```

The app will be available at `http://localhost:8080`.

To stop:

```bash
docker compose down
```

### Run locally (without Docker)

```bash
./mvnw tomcat7:run
```

Or on Windows:

```bash
mvnw.cmd tomcat7:run
```

### Build only

```bash
./mvnw package -DskipTests
```

The compiled WAR will be at `target/mathify.war`.

## Project Structure

```
src/
└── main/
    ├── java/
    │   └── com/mathify/
    │       ├── servlet/         # HttpServlet subclasses (controllers)
    │       ├── model/           # Plain Java objects (data models)
    │       ├── dao/             # Data Access Objects (DB queries)
    │       ├── service/         # Business logic layer
    │       └── util/            # Helpers (DB connection, etc.)
    ├── resources/               # Config files, SQL scripts
    └── webapp/
        ├── index.jsp                                Entry point — forwards to landing.
        ├── WEB-INF/
        │   ├── web.xml                              Servlet descriptor.
        │   ├── tags/                                Custom tag library (shared).
        │   │   ├── layout.tag                       <m:layout> page shell.
        │   │   ├── icon.tag                         <m:icon name="…"/> SVG icons.
        │   │   └── sectionHeader.tag                <m:sectionHeader …/> section headers.
        │   └── jsp/
        │       ├── pages/                           Page-specific JSPs.
        │       │   └── landing/
        │       │       ├── index.jsp                Landing page composition.
        │       │       └── sections/                Landing-only sections.
        │       │           ├── hero.jsp
        │       │           ├── herodevice.jsp
        │       │           ├── skilltree.jsp
        │       │           ├── chapter.jsp
        │       │           ├── gamification.jsp
        │       │           ├── curriculum.jsp
        │       │           ├── testimonials.jsp
        │       │           └── cta.jsp
        │       └── shared/                          JSPs reused across pages.
        │           ├── nav.jsp
        │           └── footer.jsp
        └── assets/                                  Static files served directly.
            ├── css/
            │   ├── base.css                         Design tokens, body, typography.
            │   └── landing.css                      Landing-only effects (drift, dot grid).
            └── js/
                ├── tailwind.config.js               Tailwind CDN theme extension.
                └── landing/
                    └── skilltree.js                 Alpine factory for the skill tree.
```

### Why this layout?

- **Page co-location.** Everything used by one page (its sections, its
  CSS, its JS) sits under a folder named after the page. Easy to find,
  easy to delete.
- **`shared/` for cross-page parts.** `nav.jsp` and `footer.jsp` are
  visible on every page; pulling them out avoids duplication and keeps
  page folders focused on what's unique.
- **`WEB-INF/` for templates, `assets/` for static.** Anything under
  `WEB-INF/` is unreachable via URL, which prevents direct access to
  partial JSPs; assets get served directly by the container.

---

## How to add a new page

1. **Create the page folder** under `WEB-INF/jsp/pages/`:

   ```
   WEB-INF/jsp/pages/pricing/
     ├── index.jsp
     └── sections/
         ├── plans.jsp
         └── faq.jsp
   ```

2. **Compose the page** with the layout tag. In `pricing/index.jsp`:

   ```jsp
   <%@ page contentType="text/html; charset=UTF-8" %>
   <%@ taglib prefix="m" tagdir="/WEB-INF/tags" %>

   <m:layout title="Mathlify — Pricing">
       <jsp:attribute name="pageStyles">
           <link rel="stylesheet" href="${pageContext.request.contextPath}/assets/css/pricing.css">
       </jsp:attribute>
       <jsp:body>
           <jsp:include page="/WEB-INF/jsp/shared/nav.jsp"/>
           <jsp:include page="/WEB-INF/jsp/pages/pricing/sections/plans.jsp"/>
           <jsp:include page="/WEB-INF/jsp/pages/pricing/sections/faq.jsp"/>
           <jsp:include page="/WEB-INF/jsp/shared/footer.jsp"/>
       </jsp:body>
   </m:layout>
   ```

3. **Add a static CSS file** at `assets/css/pricing.css` if needed (any
   page-specific keyframes, decorative patterns, etc.). All design tokens
   from `base.css` are available as CSS variables.

4. **Route the URL** by creating `webapp/pricing.jsp` that forwards:

   ```jsp
   <%@ page contentType="text/html; charset=UTF-8" %>
   <jsp:forward page="/WEB-INF/jsp/pages/pricing/index.jsp"/>
   ```

   For a more sophisticated routing setup, swap this for servlet mappings
   in `web.xml` or a front-controller servlet.

---

## Conventions

- **No inline `<script>` or `<style>` blocks in JSPs.** Extract JS to
  `assets/js/…` and CSS to `assets/css/…`. The one exception is
  `<script type="application/json">` blocks used to ship server-rendered
  data to the client (see `skilltree.jsp` for an example).
- **Tailwind utilities first, inline `style=""` for one-offs.** Use
  `bg-paper` instead of `style="background: var(--paper);"`. The custom
  palette is in `tailwind.config.js` so all design tokens are usable as
  Tailwind utilities.
- **JSTL `<c:set value="${[…]}"/>` for static data lists.** Avoid
  scriptlets (`<% … %>`). EL collection literals (Jakarta EL 3+) cover
  almost every list/map case.
- **Asset URLs use `${pageContext.request.contextPath}`.** This keeps
  paths correct under any deployment context. Inside `layout.tag` it's
  aliased as `${ctx}`.

---

## Environment Variables

| Variable | Description | Default |
|---|---|---|
| `DB_HOST` | PostgreSQL host | `db` |
| `DB_PORT` | PostgreSQL port | `5432` |
| `DB_NAME` | Database name | `mathify` |
| `DB_USER` | Database user | `mathify_user` |
| `DB_PASSWORD` | Database password | *(set in compose.yaml)* |

## Team

Mathify is developed by **Hapis Supremacy** — a team of Informatics students at Telkom University.

## License

This project is for academic purposes.
