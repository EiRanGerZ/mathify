# Mathify — Team Tasks

Work split for the team. The database schema and DAO layer are **done**; the
remaining work is three mostly-independent slices plus payments.

- **Friend 1 — Payments** (already assigned) → integrates via `SubscriptionDAO` / `PremiumStudent` / `Plan`.
- **Friend 2 — Content delivery (read path)** → render courses/chapters/quizzes from the DB.
- **Friend 3 — Progress & gamification (write path)** → the learning loop: grading, XP/streak/energy, achievements.
- **Friend 4 — Admin authoring + auth + integration** → build content creation, secure routes, own the schema, coordinate.

**Dependency order:** Friend 4 author content → Friend 2 renders it → Friend 3 records progress against it. Payments run in parallel.

---

## 👤 Friend 4 — Admin authoring, auth & integration

**Goal:** Enable content creation, secure the app, and keep the pieces fitting together.

**Tasks**
- **Admin content authoring** — extend `AdminServlet` (`/admin/`) + `admin/dashboard.jsp` with forms to create/edit courses, chapters, modules, quizzes, and questions. DAOs already support this: `CourseDAO.insert(Course)`, `ChapterDAO.insert(...)`, `LearningModuleDAO.insert(...)`, `QuizDAO.insert(...)`, `QuestionDAO.insert(...)`.
- **Auth hardening** — re-enable the commented-out session guards in `CoursePageServlet`, `QuizServlet`, `AdminServlet`; add a servlet `Filter` distinguishing student vs admin sessions.
- **Admin login** — wire `AdminDAO`. ⚠️ Known gap: `Admin`/`User` generates `userId` in the constructor with no setter, so a DB-loaded admin gets a fresh id — add an id-bearing constructor first (documented in `AdminDAO`).
- **Schema & integration ownership** — own `schema.sql` changes, define the JSON contracts the course/quiz pages consume, review/merge.

**Todo**
- [ ] Add `Admin(String id, name, email, role)` constructor + fix `AdminDAO.map`
- [ ] Auth `Filter` + restore guards in the 3 servlets
- [ ] Admin CRUD form for at least Course → Chapter → Quiz/Question
- [ ] Seed SQL with 1–2 fully-populated courses so Friends 2 & 3 can work before the authoring UI is done
- [ ] Document the course/quiz JSON shape in `CLASS_DIAGRAM.md` or a new `CONTRACTS.md`

**Done when:** an admin can log in and create a course with chapters + a quiz, and it appears in the student library.

---

## 🧑‍💻 Friend 2 — Course content delivery (read path)

**Goal:** Replace hardcoded JSP data with real DB content.

**Tasks**
- **Course page** — `CoursePageServlet` (`/course`) currently renders static `course/index.jsp` (hardcoded `CHAPTERS`). Make it accept `?courseId=`, load the aggregate via `CourseDAO.findCourse(id)`, and pass chapters/modules to the JSP as JSON (mirror the `coursesJson` pattern in `CourseLibraryServlet`).
- **Module viewer** — render `SlideModule` (slides) and `VideoModule` from `LearningModuleDAO`.
- **Quiz rendering** — `QuizServlet` GET: load `QuizDAO.findById(?quizId=)` and render the three question types (MC / fill-blank / drag-drop) from DB in `quiz/index.jsp`.
- **Linking** — library cards / "View syllabus" in `library/index.jsp` link to a static `/course`; change to `/course?courseId=${c.id}` (course ids are now UUID strings).

**Todo**
- [ ] `CoursePageServlet`: load + serialize a `Course` to JSON
- [ ] `course/index.jsp`: drive chapters/modules from server JSON
- [ ] `quiz/index.jsp`: render real questions per `QuestionType`
- [ ] Library links carry `courseId`
- [ ] Handle locked / prerequisite states gracefully

**Done when:** library → course page shows real chapters/modules, and opening a quiz lists real questions.

**Coordinate with Friend 3:** Friend 4 own `QuizServlet` GET (render), they own POST (submit).

---

## 🧑‍💻 Friend 3 — Progress & gamification (write path)

**Goal:** Make the learning loop persist — completing work earns XP, streaks, and achievements.

**Tasks**
- **Quiz submission** — `QuizServlet` POST: build `Answer` objects from form params per `QuestionType`, call `Question.evaluate(answer)` (grading logic already in the model), compute score, persist via `QuizAttemptDAO.record(...)`.
- **Chapter completion** — `ChapterProgressDAO.save(...)` with time spent; update streak (`UserProgress.addStreak` / `resetStreak`) based on `last_activity`.
- **XP / level / energy** — award XP, apply level-up rule, decrement energy per attempt. ⚠️ Known gap: `UserProgressDAO.save` only persists `total_xp/level/current_streak` — extend it to also write `energy` and `last_activity`.
- **Achievements** — seed the catalog via `AchievementDAO`, evaluate rules after each action, award with `UserAchievementDAO.award(...)`.
- **Enroll flow** — "Enroll" button → `CourseEnrollmentDAO.enroll(...)`; detect course completion.
- **Dashboard hydration** — ⚠️ `UserProgress`'s mutators stamp `now()`, so its maps can't be rehydrated from the DB faithfully. Add a load-path (constructor/setters) so the dashboard reflects stored enrollments / chapter progress / quiz attempts. (`StudentDashboardServlet` already exposes `enrollments` / `achievements` as request attributes as a stopgap.)

**Todo**
- [ ] `QuizServlet` POST: params → `Answer` → grade → `QuizAttemptDAO.record`
- [ ] Extend `UserProgressDAO.save` to persist `energy` + `last_activity`
- [ ] Streak / level rules + XP on completion
- [ ] `AchievementDAO` seed + rule evaluation + `UserAchievementDAO.award`
- [ ] Enroll button → `CourseEnrollmentDAO`
- [ ] `UserProgress` load-path for collection hydration

**Done when:** completing a quiz updates XP/streak in the DB and on the dashboard, and an achievement unlocks.

---

## Shared coordination notes

- **Seed data first** (Friend 4) unblocks both friends.
- **`QuizServlet`** is shared: Friend 2 = GET/render, Friend 3 = POST/submit.
- **`UserProgressDAO.save`** extension (energy / last_activity) is a shared dependency — Friend 3 owns it, but Friend 1's payment flow may also touch the student record.
- **Payment seam** (Friend 1): on successful payment, build a `PremiumStudent` and call `SubscriptionDAO.save(uid, sub)`; gate premium content on `Student.getPremium()`.
