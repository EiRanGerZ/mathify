# Integration Contracts

Shapes the server exposes to the course/quiz pages, and the requests those pages
send back. Owned by Friend 4 (integration); consumed by Friend 2 (read path) and
Friend 3 (write path). Keep this in sync when the DTOs change.

All ids are strings. Course/chapter/module/quiz/question ids are the DB primary
keys (`course_id` is a UUID string; the rest are author-supplied strings).

---

## Course page — `GET /course?courseId=<id>`

Serialize the domain `Course` (`CourseDAO.findCourse`) to JSON like this and hand
it to `course/index.jsp` (mirror the `coursesJson` request-attribute pattern in
`CourseLibraryServlet`):

```json
{
  "id": "c0ffee...",
  "title": "Differential Calculus",
  "category": "Calculus",
  "description": "Limits, derivatives, and the curves they describe.",
  "chapters": [
    {
      "id": "ch-calc-limits",
      "title": "Limits & Continuity",
      "description": "What a limit is, and when a function is continuous.",
      "xpReward": 100,
      "prerequisiteIds": [],
      "modules": [
        { "id": "mod-limits-slides", "type": "SLIDE", "title": "What is a limit?", "orderIndex": 0,
          "secondsPerSlide": 30,
          "slides": [ { "order": 1, "imageUrl": "...", "caption": "..." } ] },
        { "id": "mod-limits-video", "type": "VIDEO", "title": "Limits, visualized", "orderIndex": 1,
          "videoUrl": "...", "durationSeconds": 600, "thumbnailUrl": "..." }
      ],
      "quizIds": ["quiz-limits"]
    }
  ]
}
```

- `type` is the `ModuleType` enum name (`SLIDE` | `VIDEO`); render the matching fields.
- `prerequisiteIds` gates chapter unlocking against the learner's completed chapters.
- Full quiz content is fetched separately (below), so chapters carry only `quizIds`.

---

## Quiz page — `GET /quiz?quizId=<id>`

Serialize `Quiz` (`QuizDAO.findById`). **Never send `isCorrect` / correct answers
to the client** — grading happens server-side (see below).

```json
{
  "id": "quiz-limits",
  "title": "Limits check",
  "passingScore": 2,
  "questions": [
    { "id": "q-lim-mc", "type": "MULTIPLE_CHOICE", "prompt": "...", "points": 1,
      "options": [ { "id": "a", "text": "0" }, { "id": "b", "text": "1" } ] },
    { "id": "q-lim-fb", "type": "FILL_BLANK", "prompt": "...", "points": 1, "blanks": 1 },
    { "id": "q-lim-dd", "type": "DRAG_AND_DROP", "prompt": "...", "points": 1,
      "items": [ { "id": "di-1", "label": "lim(x->2) (x+1)" } ],
      "zones": [ { "id": "dz-3", "label": "3" } ] }
  ]
}
```

`type` is the `QuestionType` enum name: `MULTIPLE_CHOICE` | `FILL_BLANK` | `DRAG_AND_DROP`.

---

## Quiz submission — `POST /quiz` (Friend 3)

Client posts the learner's answers; the server rebuilds `Answer` objects, calls
`Question.evaluate(answer)`, scores, and persists via `QuizAttemptDAO.record`.
Suggested form/JSON payload per question type:

```json
{
  "quizId": "quiz-limits",
  "answers": {
    "q-lim-mc": { "selectedOptionIds": ["b"] },
    "q-lim-fb": { "filledValues": ["c"] },
    "q-lim-dd": { "pairings": { "di-1": "dz-3", "di-2": "dz-0" } }
  }
}
```

Response: `{ "score": 2, "passingScore": 2, "passed": true, "xpAwarded": 20 }`.

Maps to the model: `selectedOptionIds → Answer.MultipleChoiceAnswer`,
`filledValues → Answer.FillBlankAnswer`, `pairings → Answer.DragAndDropAnswer`.

---

## Gamification events (Friend 3)

Fire these after the relevant action, then persist:

| Trigger | DAO calls |
|---|---|
| Enroll in a course | `CourseEnrollmentDAO.enroll(uid, courseId)` |
| Finish a chapter | `ChapterProgressDAO.save(uid, ChapterProgress)`, update streak, `UserProgressDAO.save` |
| Submit a quiz | `QuizAttemptDAO.record(uid, QuizAttempt)`, award XP via `UserProgressDAO.save` |
| Hit a milestone | `UserAchievementDAO.award(uid, achievementId)` |

⚠️ `UserProgressDAO.save` currently persists only `total_xp` / `level` /
`current_streak`. Extend it to also write `energy` and `last_activity` (Friend 3).
