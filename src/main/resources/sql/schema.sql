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
    id              SERIAL       PRIMARY KEY,
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
