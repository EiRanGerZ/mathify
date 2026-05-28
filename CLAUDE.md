# CLAUDE.md — Mathify

This file gives Claude (and other AI assistants) context about the Mathify project so it can provide accurate, consistent help.

---

## Project Overview

Mathify is a web-based math learning platform with gamification. It targets students who want structured math courses (Basic Math, Calculus, Linear Algebra, etc.) delivered in an engaging, progression-based format. Think Duolingo mechanics combined with a more formal academic curriculum.

Built as an academic project by Hapis Supremacy at Telkom University.

---

## Architecture

- **Pattern:** MVC via Java Servlets + JSP
- **Backend:** Jakarta EE Servlets (no Spring — keep it vanilla unless discussed)
- **View layer:** JSP templates under `src/main/webapp/`
- **Database:** PostgreSQL (via JDBC)
- **Build:** Maven, packaged as `.war`
- **Runtime:** Apache Tomcat 10 inside Docker

The project is a standard Maven webapp archetype. There is no dependency injection framework — wiring is manual for now.

---

## Project Structure

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

> Note: The package structure above is the **intended** structure. The project is early-stage — help scaffold toward this layout when adding new files.

---

## Naming Conventions

Follow standard idiomatic Java:

- **Classes:** `PascalCase` — e.g., `CourseServlet`, `UserDao`, `LessonService`
- **Methods & variables:** `camelCase` — e.g., `getUserById()`, `lessonCount`
- **Constants:** `UPPER_SNAKE_CASE` — e.g., `MAX_STREAK_DAYS`
- **Packages:** all lowercase, dot-separated — e.g., `com.mathify.dao`
- **Database tables:** `snake_case` — e.g., `user_progress`, `course_lesson`
- **JSP files:** `kebab-case` or `camelCase` are both fine, be consistent within a feature

---

## Database

- **DBMS:** PostgreSQL 16
- **Connection:** JDBC, managed manually via a `DBConnection` utility class
- **Naming:** tables and columns in `snake_case`
- Do not use an ORM (no Hibernate, no JPA) unless the team explicitly decides to add one
- SQL scripts go in `src/main/resources/sql/`

---

## Build & Run

```bash
# Run with Docker (preferred)
docker compose up --build -d

# Build WAR locally
./mvnw package -DskipTests

# Run locally via Maven Tomcat plugin
./mvnw tomcat7:run
```

Multi-stage Docker build — Maven build happens inside Docker, no pre-built WAR needed.

---

## Dependencies (pom.xml)

Key dependencies and their intended scopes:

| Dependency | Scope | Reason |
|---|---|---|
| `jakarta.servlet-api` | `provided` | Tomcat provides this at runtime |
| `postgresql` (JDBC driver) | `compile` | Bundled in WAR |
| `junit-jupiter` | `test` | Unit testing only |

Always check scope before adding a new dependency. Wrong scope (especially `provided` vs `compile`) is a common source of runtime errors on Tomcat.

---

## What to Avoid

- Do not introduce Spring, Spring Boot, or any other web framework unless explicitly asked
- Do not add Hibernate or JPA — use plain JDBC for now
- Do not modify `compose.yaml` or `Dockerfile` without understanding the multi-stage build setup
- Do not put business logic inside Servlets — route to a service layer
- Do not hardcode database credentials — use environment variables

---

## Current State

The project is in early development. At the time of writing:

- `index.jsp` is the default landing page

When helping scaffold new features, follow the package structure defined above and suggest creating the full vertical slice (model → DAO → service → servlet → JSP).
