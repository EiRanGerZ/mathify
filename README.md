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

---

## Firebase Authentication Setup

Mathify uses **Firebase Authentication** for login, registration, and Google OAuth. The Java backend verifies Firebase ID tokens using the Admin SDK; the browser never sends passwords to our server.

### How the auth flow works

```
Browser (React)                 Tomcat Servlet            Firebase Cloud
───────────────                 ──────────────            ──────────────
  Email + password
        │
  firebase.auth()
  .signInWithEmailAndPassword()  ─────────────────────────► Firebase Auth
                                 ◄─────────────────────── JWT ID token
        │
  getIdToken()
        │
  POST /login { idToken }  ──►  LoginServlet.doPost()
                                FirebaseAuth.verifyIdToken() ─► Firebase
                                                          ◄── decoded claims
                                session.setAttribute(
                                  "authUser", new AuthUser(...))
                           ◄──  redirect /dashboard
```

### Step 1 — Create a Firebase project

1. Go to [console.firebase.google.com](https://console.firebase.google.com) → **Add project**
2. **Build → Authentication → Get started**
3. Enable these sign-in methods:
   - **Email/Password** — toggle on
   - **Google** — toggle on, select your support email

### Step 2 — Get your web app config (public values)

1. **Project Settings** (gear icon) → **Your apps** → **Add app** → Web (`</>`)
2. Register the app (name it anything, no hosting needed)
3. Copy the `firebaseConfig` object — you'll need these values:

```javascript
const firebaseConfig = {
  apiKey:            "AIzaSy...",
  authDomain:        "your-project.firebaseapp.com",
  projectId:         "your-project-id",
  storageBucket:     "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId:             "1:123456789:web:abc123"
};
```

### Step 3 — Download the service account key (private)

1. **Project Settings → Service accounts** tab
2. Click **Generate new private key** → **Generate key**
3. Save the downloaded JSON as **`firebase/serviceAccountKey.json`** in the project root

> ⚠️ `firebase/` is in `.gitignore`. Never commit this file.

### Step 4 — Set environment variables

**For Docker (`compose.yaml` already configured):**

Fill in the blank values in `compose.yaml`:

```yaml
environment:
  - FIREBASE_API_KEY=AIzaSy...
  - FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
  - FIREBASE_PROJECT_ID=your-project-id
  - FIREBASE_STORAGE_BUCKET=your-project.appspot.com
  - FIREBASE_MESSAGING_SENDER_ID=123456789
  - FIREBASE_APP_ID=1:123456789:web:abc123
```

The service account key is mounted automatically as a Docker secret from `firebase/serviceAccountKey.json`.

**For local dev (outside Docker):**

Set one additional env var pointing to the key file:

```bash
# Linux / macOS
export FIREBASE_CREDENTIALS_FILE=/path/to/mathify/firebase/serviceAccountKey.json

# Windows (PowerShell)
$env:FIREBASE_CREDENTIALS_FILE = "C:\path\to\mathify\firebase\serviceAccountKey.json"
```

Then set the six public config vars in your shell or a `.env.local` file (not committed).

### Step 5 — Add authorized domains (for Google OAuth)

In **Firebase Console → Authentication → Settings → Authorized domains**, add:

- `localhost` (already there by default)
- Your production domain when you deploy

### What gets stored in session

After a successful login or registration the servlet stores an `AuthUser` record in the HTTP session:

| Field | Value | Used for |
|---|---|---|
| `uid` | Firebase UID (e.g. `dK3mXp...`) | Foreign key in all DB tables |
| `email` | Verified email address | Display, notifications |
| `displayName` | Name from registration or Google profile | Nav avatar, greeting |

Access it in any servlet or JSP:

```java
AuthUser authUser = (AuthUser) session.getAttribute("authUser");
if (authUser == null) {
    resp.sendRedirect(req.getContextPath() + "/login");
    return;
}
```

### Environment variable reference

| Variable | Where used | Visibility |
|---|---|---|
| `FIREBASE_API_KEY` | JSP → browser JS | **Public** (safe to commit once filled) |
| `FIREBASE_AUTH_DOMAIN` | JSP → browser JS | Public |
| `FIREBASE_PROJECT_ID` | JSP → browser JS | Public |
| `FIREBASE_STORAGE_BUCKET` | JSP → browser JS | Public |
| `FIREBASE_MESSAGING_SENDER_ID` | JSP → browser JS | Public |
| `FIREBASE_APP_ID` | JSP → browser JS | Public |
| `firebase/serviceAccountKey.json` | Docker secret → Java Admin SDK | **Private — never commit** |
| `FIREBASE_CREDENTIALS_FILE` | Local dev fallback path | Private |

---

## Team

Mathify is developed by **Hapis Supremacy** — a team of Informatics students at Telkom University.

## License

This project is for academic purposes.
