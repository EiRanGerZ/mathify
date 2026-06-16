-- Mathify database schema
-- Run once on first deploy; safe to re-run (IF NOT EXISTS guards).

CREATE TABLE IF NOT EXISTS users (
    uid          VARCHAR(128) PRIMARY KEY,
    email        VARCHAR(255) NOT NULL,
    display_name VARCHAR(255),
    created_at   TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS user_progress (
    uid            VARCHAR(128) PRIMARY KEY REFERENCES users(uid) ON DELETE CASCADE,
    total_xp       INT         NOT NULL DEFAULT 0,
    level          INT         NOT NULL DEFAULT 1,
    current_streak INT         NOT NULL DEFAULT 0,
    last_activity  DATE,
    energy         SMALLINT    NOT NULL DEFAULT 5,
    updated_at     TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS courses (
    course_id       VARCHAR(128) PRIMARY KEY DEFAULT gen_random_uuid()::text,
    title           VARCHAR(255) NOT NULL,
    description     TEXT,
    track           VARCHAR(100) NOT NULL,
    level_num       SMALLINT     NOT NULL DEFAULT 1,
    color           VARCHAR(20)  NOT NULL DEFAULT 'green',
    glyph           VARCHAR(20),
    total_lessons   INT          NOT NULL DEFAULT 0,
    estimated_hours VARCHAR(10),
    xp_reward       INT          NOT NULL DEFAULT 0,
    status          VARCHAR(20)  NOT NULL DEFAULT 'new',
    created_at      TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- Seed data — insert only when table is empty
INSERT INTO courses (title, description, track, level_num, color, glyph, total_lessons, estimated_hours, xp_reward, status)
SELECT * FROM (VALUES
  ('Differential Calculus',           'Limits, derivatives, and the curves they describe.',                 'Calculus',      8, 'green', 'ƒ′',   38, '12h', 1840, 'new'),
  ('Linear Algebra · the visual way', 'Vectors, matrices, and transformations you can see.',                'Algebra',       5, 'blue',  'A→',   42, '14h', 2100, 'new'),
  ('Foundations of Geometry',         'Angles, proofs, and the language of shapes.',                        'Geometry',      3, 'amber', '△',    28, '9h',  1320, 'new'),
  ('Probability & Combinatorics',     'Counting, chance, and the math of uncertainty.',                     'Probability',   6, 'plum',  'ℙ',    34, '11h', 1680, 'new'),
  ('Number Theory & Primes',          'Modular arithmetic, primes, and the proofs behind them.',            'Number theory', 7, 'rose',  'ℤ',    30, '10h', 1500, 'new'),
  ('Trigonometry, Visualised',        'Unit circle, identities, waves — built from the ground up.',         'Trigonometry',  4, 'blue',  'sinθ', 26, '8h',  1280, 'new'),
  ('Statistics & Data Sense',         'Distributions, inference, and how to read a chart honestly.',        'Statistics',    6, 'green', 'σ',    36, '12h', 1740, 'new'),
  ('Discrete Mathematics',            'Logic, sets, graphs — the toolkit behind computer science.',         'Discrete math', 5, 'amber', '∑',    32, '10h', 1580, 'new')
) AS v(title, description, track, level_num, color, glyph, total_lessons, estimated_hours, xp_reward, status)
WHERE NOT EXISTS (SELECT 1 FROM courses LIMIT 1);

-- ============================================================================
-- Admins
-- ----------------------------------------------------------------------------
-- Backoffice users (model: Admin). Unlike `users`, admins are NOT Firebase-
-- backed — they carry a generated UUID, a role, and a last-login timestamp.
-- Kept in a separate table so the Firebase-keyed `users` table stays clean.
-- ============================================================================

CREATE TABLE IF NOT EXISTS admins (
    admin_id     UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
    name         VARCHAR(255) NOT NULL,
    email        VARCHAR(255) NOT NULL UNIQUE,
    role         VARCHAR(20)  NOT NULL DEFAULT 'EDITOR'
                              CHECK (role IN ('OWNER', 'EDITOR', 'VIEWER')),
    last_login_at TIMESTAMPTZ,
    created_at   TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- Bootstrap owner admin. Admins log in via Firebase; this email is the allowlist
-- entry that grants admin access. Change it to your own Google account's email.
INSERT INTO admins (name, email, role)
SELECT 'Owner', 'gimerbone@gmail.com', 'OWNER'
WHERE NOT EXISTS (SELECT 1 FROM admins WHERE email = 'gimerbone@gmail.com');

-- ============================================================================
-- Course content hierarchy
--   courses (existing) → chapters → learning_modules → slides
--                                 → quizzes → questions → answer payloads
-- Authored content uses caller-supplied VARCHAR ids (matching the String ids
-- on the domain models); `courses` keeps its existing SERIAL int id.
-- ============================================================================

-- Self-referential prerequisites for courses (Course.prerequisite).
CREATE TABLE IF NOT EXISTS course_prerequisites (
    course_id       VARCHAR(128) NOT NULL REFERENCES courses(course_id) ON DELETE CASCADE,
    prerequisite_id VARCHAR(128) NOT NULL REFERENCES courses(course_id) ON DELETE CASCADE,
    PRIMARY KEY (course_id, prerequisite_id),
    CHECK (course_id <> prerequisite_id)
);

CREATE TABLE IF NOT EXISTS chapters (
    chapter_id  VARCHAR(128) PRIMARY KEY,
    course_id   VARCHAR(128) NOT NULL REFERENCES courses(course_id) ON DELETE CASCADE,
    title       VARCHAR(255) NOT NULL,
    description TEXT,
    xp_reward   INT          NOT NULL DEFAULT 0,
    order_index INT          NOT NULL DEFAULT 0,
    created_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_chapters_course ON chapters(course_id);

-- Self-referential prerequisites for chapters (Chapter.prerequisite).
CREATE TABLE IF NOT EXISTS chapter_prerequisites (
    chapter_id      VARCHAR(128) NOT NULL REFERENCES chapters(chapter_id) ON DELETE CASCADE,
    prerequisite_id VARCHAR(128) NOT NULL REFERENCES chapters(chapter_id) ON DELETE CASCADE,
    PRIMARY KEY (chapter_id, prerequisite_id),
    CHECK (chapter_id <> prerequisite_id)
);

-- Base table for every LearningModule. Subtype-specific columns live in the
-- video_modules / slide_modules tables below, keyed 1:1 by module_id.
CREATE TABLE IF NOT EXISTS learning_modules (
    module_id   VARCHAR(128) PRIMARY KEY,
    chapter_id  VARCHAR(128) NOT NULL REFERENCES chapters(chapter_id) ON DELETE CASCADE,
    title       VARCHAR(255) NOT NULL,
    order_index INT          NOT NULL DEFAULT 0,
    type        VARCHAR(10)  NOT NULL CHECK (type IN ('VIDEO', 'SLIDE')),
    created_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_modules_chapter ON learning_modules(chapter_id);

CREATE TABLE IF NOT EXISTS video_modules (
    module_id        VARCHAR(128) PRIMARY KEY REFERENCES learning_modules(module_id) ON DELETE CASCADE,
    video_url        TEXT NOT NULL,
    duration_seconds BIGINT NOT NULL DEFAULT 0,
    thumbnail_url    TEXT
);

CREATE TABLE IF NOT EXISTS slide_modules (
    module_id         VARCHAR(128) PRIMARY KEY REFERENCES learning_modules(module_id) ON DELETE CASCADE,
    seconds_per_slide INT NOT NULL DEFAULT 0
);

-- Individual slides (Slide record) within a SlideModule, ordered by slide_order.
CREATE TABLE IF NOT EXISTS slides (
    module_id   VARCHAR(128) NOT NULL REFERENCES slide_modules(module_id) ON DELETE CASCADE,
    slide_order INT          NOT NULL,
    image_url   TEXT         NOT NULL,
    caption     TEXT,
    PRIMARY KEY (module_id, slide_order)
);

-- ============================================================================
-- Quizzes & questions
-- ============================================================================

CREATE TABLE IF NOT EXISTS quizzes (
    quiz_id       VARCHAR(128) PRIMARY KEY,
    chapter_id    VARCHAR(128) NOT NULL REFERENCES chapters(chapter_id) ON DELETE CASCADE,
    title         VARCHAR(255) NOT NULL,
    passing_score INT          NOT NULL DEFAULT 0 CHECK (passing_score >= 0),
    created_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_quizzes_chapter ON quizzes(chapter_id);

-- Base table for every Question (QuestionInfo + type discriminator).
-- case_sensitive is only meaningful for FILL_BLANK questions.
CREATE TABLE IF NOT EXISTS questions (
    question_id    VARCHAR(128) PRIMARY KEY,
    quiz_id        VARCHAR(128) NOT NULL REFERENCES quizzes(quiz_id) ON DELETE CASCADE,
    prompt         TEXT         NOT NULL,
    points         INT          NOT NULL DEFAULT 0 CHECK (points >= 0),
    type           VARCHAR(20)  NOT NULL
                                CHECK (type IN ('MULTIPLE_CHOICE', 'FILL_BLANK', 'DRAG_AND_DROP')),
    case_sensitive BOOLEAN      NOT NULL DEFAULT FALSE,
    order_index    INT          NOT NULL DEFAULT 0
);
CREATE INDEX IF NOT EXISTS idx_questions_quiz ON questions(quiz_id);

-- MULTIPLE_CHOICE: options plus an is_correct flag (correctOptionIds is a Set).
CREATE TABLE IF NOT EXISTS mc_options (
    question_id VARCHAR(128) NOT NULL REFERENCES questions(question_id) ON DELETE CASCADE,
    option_id   VARCHAR(128) NOT NULL,
    option_text TEXT         NOT NULL,
    is_correct  BOOLEAN      NOT NULL DEFAULT FALSE,
    PRIMARY KEY (question_id, option_id)
);

-- FILL_BLANK: ordered list of accepted answers, one row per blank.
CREATE TABLE IF NOT EXISTS fill_blank_answers (
    question_id  VARCHAR(128) NOT NULL REFERENCES questions(question_id) ON DELETE CASCADE,
    answer_order INT          NOT NULL,
    answer_text  TEXT         NOT NULL,
    PRIMARY KEY (question_id, answer_order)
);

-- DRAG_AND_DROP: draggable items, drop zones, and the correct pairings between them.
CREATE TABLE IF NOT EXISTS drag_items (
    question_id VARCHAR(128) NOT NULL REFERENCES questions(question_id) ON DELETE CASCADE,
    item_id     VARCHAR(128) NOT NULL,
    label       VARCHAR(255) NOT NULL,
    PRIMARY KEY (question_id, item_id)
);

CREATE TABLE IF NOT EXISTS drop_zones (
    question_id VARCHAR(128) NOT NULL REFERENCES questions(question_id) ON DELETE CASCADE,
    zone_id     VARCHAR(128) NOT NULL,
    label       VARCHAR(255) NOT NULL,
    PRIMARY KEY (question_id, zone_id)
);

-- Correct pairing map: each draggable maps to exactly one drop zone.
CREATE TABLE IF NOT EXISTS drag_drop_pairings (
    question_id VARCHAR(128) NOT NULL,
    item_id     VARCHAR(128) NOT NULL,
    zone_id     VARCHAR(128) NOT NULL,
    PRIMARY KEY (question_id, item_id),
    FOREIGN KEY (question_id, item_id) REFERENCES drag_items(question_id, item_id) ON DELETE CASCADE,
    FOREIGN KEY (question_id, zone_id) REFERENCES drop_zones(question_id, zone_id) ON DELETE CASCADE
);

-- ============================================================================
-- Gamification: achievement catalog + per-user awards
-- ============================================================================

CREATE TABLE IF NOT EXISTS achievements (
    achievement_id VARCHAR(128) PRIMARY KEY,
    title          VARCHAR(255) NOT NULL,
    category       VARCHAR(100),
    requirement    TEXT
);

-- Which achievements a user has earned and when (UserProgress.achievements).
CREATE TABLE IF NOT EXISTS user_achievements (
    uid            VARCHAR(128) NOT NULL REFERENCES users(uid) ON DELETE CASCADE,
    achievement_id VARCHAR(128) NOT NULL REFERENCES achievements(achievement_id) ON DELETE CASCADE,
    earned_at      TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    PRIMARY KEY (uid, achievement_id)
);

-- ============================================================================
-- Per-user progress tracking
--   (UserProgress.courseEnrollments / chapterProgress / quizAttempts)
-- ============================================================================

CREATE TABLE IF NOT EXISTS course_enrollments (
    uid          VARCHAR(128) NOT NULL REFERENCES users(uid) ON DELETE CASCADE,
    course_id    VARCHAR(128) NOT NULL REFERENCES courses(course_id) ON DELETE CASCADE,
    enrolled_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    completed_at TIMESTAMPTZ,
    PRIMARY KEY (uid, course_id)
);

CREATE TABLE IF NOT EXISTS chapter_progress (
    uid                VARCHAR(128) NOT NULL REFERENCES users(uid) ON DELETE CASCADE,
    chapter_id         VARCHAR(128) NOT NULL REFERENCES chapters(chapter_id) ON DELETE CASCADE,
    completed_at       TIMESTAMPTZ,
    time_spent_seconds BIGINT       NOT NULL DEFAULT 0,
    PRIMARY KEY (uid, chapter_id)
);

-- Best attempt per (user, quiz) — mirrors UserProgress keeping the top score.
CREATE TABLE IF NOT EXISTS quiz_attempts (
    uid          VARCHAR(128) NOT NULL REFERENCES users(uid) ON DELETE CASCADE,
    quiz_id      VARCHAR(128) NOT NULL REFERENCES quizzes(quiz_id) ON DELETE CASCADE,
    score        INT          NOT NULL CHECK (score >= 0),
    completed_at TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    PRIMARY KEY (uid, quiz_id)
);

-- ============================================================================
-- Subscriptions (Subscribable / PremiumStudent) — one per student.
-- ============================================================================

CREATE TABLE IF NOT EXISTS subscriptions (
    uid         VARCHAR(128) PRIMARY KEY REFERENCES users(uid) ON DELETE CASCADE,
    plan        VARCHAR(20)  NOT NULL CHECK (plan IN ('MONTHLY', 'ANNUAL')),
    expiry      DATE,
    is_canceled BOOLEAN      NOT NULL DEFAULT FALSE,
    created_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

-- ============================================================================
-- Payments (Midtrans Snap orders) — one row per checkout attempt.
-- order_id is the Midtrans transaction reference; status mirrors the Midtrans
-- transaction_status. A row reaches PAID only after server-side verification
-- (PaymentConfirmServlet → CoreApi.checkTransaction), which then upgrades the
-- student's subscription. Keyed by order_id so a user can have many attempts.
-- ============================================================================

CREATE TABLE IF NOT EXISTS payments (
    order_id     VARCHAR(64)  PRIMARY KEY,
    uid          VARCHAR(128) NOT NULL REFERENCES users(uid) ON DELETE CASCADE,
    plan         VARCHAR(20)  NOT NULL CHECK (plan IN ('MONTHLY', 'ANNUAL')),
    gross_amount INT          NOT NULL,
    status       VARCHAR(20)  NOT NULL DEFAULT 'PENDING'
                              CHECK (status IN ('PENDING', 'PAID', 'FAILED')),
    created_at   TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at   TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_payments_uid ON payments(uid);

-- ============================================================================
-- Sample content — one fully-populated course so the content read path
-- (Friend 2) and the progress write path (Friend 3) have real data to work
-- against before the admin authoring UI is in use. Idempotent via stable ids
-- + ON CONFLICT DO NOTHING. Attaches to the seeded "Differential Calculus".
-- ============================================================================

-- Chapters
INSERT INTO chapters (chapter_id, course_id, title, description, xp_reward, order_index)
SELECT 'ch-calc-limits', course_id, 'Limits & Continuity',
       'What a limit is, and when a function is continuous.', 100, 0
FROM courses WHERE title = 'Differential Calculus'
ON CONFLICT (chapter_id) DO NOTHING;

INSERT INTO chapters (chapter_id, course_id, title, description, xp_reward, order_index)
SELECT 'ch-calc-deriv', course_id, 'Derivatives',
       'Rates of change and the rules for differentiating.', 150, 1
FROM courses WHERE title = 'Differential Calculus'
ON CONFLICT (chapter_id) DO NOTHING;

INSERT INTO chapter_prerequisites (chapter_id, prerequisite_id)
VALUES ('ch-calc-deriv', 'ch-calc-limits')
ON CONFLICT DO NOTHING;

-- Learning modules for the Limits chapter
INSERT INTO learning_modules (module_id, chapter_id, title, order_index, type)
VALUES ('mod-limits-slides', 'ch-calc-limits', 'What is a limit?', 0, 'SLIDE')
ON CONFLICT (module_id) DO NOTHING;
INSERT INTO slide_modules (module_id, seconds_per_slide)
VALUES ('mod-limits-slides', 30) ON CONFLICT (module_id) DO NOTHING;
INSERT INTO slides (module_id, slide_order, image_url, caption) VALUES
  ('mod-limits-slides', 1, '/assets/img/limits-1.png', 'A limit describes where a function is heading.'),
  ('mod-limits-slides', 2, '/assets/img/limits-2.png', 'It need not equal the value at the point.'),
  ('mod-limits-slides', 3, '/assets/img/limits-3.png', 'One-sided limits can differ.')
ON CONFLICT (module_id, slide_order) DO NOTHING;

INSERT INTO learning_modules (module_id, chapter_id, title, order_index, type)
VALUES ('mod-limits-video', 'ch-calc-limits', 'Limits, visualized', 1, 'VIDEO')
ON CONFLICT (module_id) DO NOTHING;
INSERT INTO video_modules (module_id, video_url, duration_seconds, thumbnail_url)
VALUES ('mod-limits-video', 'https://example.com/v/limits.mp4', 600, '/assets/img/limits-thumb.png')
ON CONFLICT (module_id) DO NOTHING;

-- Quiz for the Limits chapter, with one question of each type
INSERT INTO quizzes (quiz_id, chapter_id, title, passing_score)
VALUES ('quiz-limits', 'ch-calc-limits', 'Limits check', 2)
ON CONFLICT (quiz_id) DO NOTHING;

-- Multiple choice
INSERT INTO questions (question_id, quiz_id, prompt, points, type, case_sensitive, order_index)
VALUES ('q-lim-mc', 'quiz-limits', 'What is lim(x->0) of sin(x)/x?', 1, 'MULTIPLE_CHOICE', FALSE, 0)
ON CONFLICT (question_id) DO NOTHING;
INSERT INTO mc_options (question_id, option_id, option_text, is_correct) VALUES
  ('q-lim-mc', 'a', '0', FALSE),
  ('q-lim-mc', 'b', '1', TRUE),
  ('q-lim-mc', 'c', 'undefined', FALSE)
ON CONFLICT (question_id, option_id) DO NOTHING;

-- Fill in the blank
INSERT INTO questions (question_id, quiz_id, prompt, points, type, case_sensitive, order_index)
VALUES ('q-lim-fb', 'quiz-limits', 'The limit of a constant c as x approaches anything is __.', 1, 'FILL_BLANK', FALSE, 1)
ON CONFLICT (question_id) DO NOTHING;
INSERT INTO fill_blank_answers (question_id, answer_order, answer_text)
VALUES ('q-lim-fb', 0, 'c')
ON CONFLICT (question_id, answer_order) DO NOTHING;

-- Drag and drop
INSERT INTO questions (question_id, quiz_id, prompt, points, type, case_sensitive, order_index)
VALUES ('q-lim-dd', 'quiz-limits', 'Match each limit to its value.', 1, 'DRAG_AND_DROP', FALSE, 2)
ON CONFLICT (question_id) DO NOTHING;
INSERT INTO drag_items (question_id, item_id, label) VALUES
  ('q-lim-dd', 'di-1', 'lim(x->2) (x + 1)'),
  ('q-lim-dd', 'di-2', 'lim(x->0) (x)')
ON CONFLICT (question_id, item_id) DO NOTHING;
INSERT INTO drop_zones (question_id, zone_id, label) VALUES
  ('q-lim-dd', 'dz-3', '3'),
  ('q-lim-dd', 'dz-0', '0')
ON CONFLICT (question_id, zone_id) DO NOTHING;
INSERT INTO drag_drop_pairings (question_id, item_id, zone_id) VALUES
  ('q-lim-dd', 'di-1', 'dz-3'),
  ('q-lim-dd', 'di-2', 'dz-0')
ON CONFLICT (question_id, item_id) DO NOTHING;

-- ============================================================================
-- In-app notifications — per-user feed surfaced through the dashboard bell.
-- Generated server-side when a domain event fires (achievement earned, level
-- up, payment confirmed/failed). icon is a name resolved by the client Icon
-- map; link is where clicking the notification navigates. UUID PK like admins.
-- ============================================================================

CREATE TABLE IF NOT EXISTS notifications (
    notification_id UUID         PRIMARY KEY DEFAULT gen_random_uuid(),
    uid             VARCHAR(128) NOT NULL REFERENCES users(uid) ON DELETE CASCADE,
    type            VARCHAR(30)  NOT NULL
                                 CHECK (type IN ('ACHIEVEMENT', 'LEVEL_UP',
                                                 'PAYMENT_CONFIRMED', 'PAYMENT_FAILED')),
    title           VARCHAR(255) NOT NULL,
    body            TEXT,
    icon            VARCHAR(30),
    link            VARCHAR(255),
    is_read         BOOLEAN      NOT NULL DEFAULT FALSE,
    created_at      TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_notifications_uid_created
    ON notifications(uid, created_at DESC);
