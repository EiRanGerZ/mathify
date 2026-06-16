import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

/* ── Icons ─────────────────────────────────────── */
    const Icon = {
      Arrow: (props) => (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...props}>
          <path d="M2.5 7h9M8 3.5l3.5 3.5L8 10.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      Book: (props) => (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...props}>
          <path d="M2 2.5A1.5 1.5 0 013.5 1H12v12H3.5A1.5 1.5 0 012 11.5v-9z" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M2 11.5A1.5 1.5 0 013.5 10H12" stroke="currentColor" strokeWidth="1.5"/>
        </svg>
      ),
      Check: (props) => (
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" {...props}>
          <path d="M2 6.5l3.5 3.5L11 3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      Clock: (props) => (
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" {...props}>
          <circle cx="6.5" cy="6.5" r="5.5" stroke="currentColor" strokeWidth="1.4"/>
          <path d="M6.5 4v3l2 1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        </svg>
      ),
      Lock: (props) => (
        <svg width="12" height="13" viewBox="0 0 12 13" fill="none" {...props}>
          <rect x="1.5" y="6" width="9" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
          <path d="M3.5 6V4a2.5 2.5 0 015 0v2" stroke="currentColor" strokeWidth="1.4"/>
        </svg>
      ),
      Search: (props) => (
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" {...props}>
          <circle cx="6.5" cy="6.5" r="5" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M10.5 10.5l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      ),
      Sparkle: (props) => (
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" {...props}>
          <path d="M6 1v2M6 9v2M1 6h2M9 6h2M2.5 2.5l1.5 1.5M8 8l1.5 1.5M9.5 2.5L8 4M4 8l-1.5 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      ),
      Bell: (props) => (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...props}>
          <path d="M8 2a5 5 0 00-5 5v2.5L2 11h12l-1-1.5V7a5 5 0 00-5-5z" stroke="currentColor" strokeWidth="1.4"/>
          <path d="M6.5 13.5a1.5 1.5 0 003 0" stroke="currentColor" strokeWidth="1.4"/>
        </svg>
      ),
      Bolt: (props) => (
        <svg width="12" height="14" viewBox="0 0 12 14" fill="none" {...props}>
          <path d="M7 1L1 8h5l-1 5 6-7H6l1-5z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      Flame: (props) => (
        <svg width="12" height="14" viewBox="0 0 12 14" fill="none" {...props}>
          <path d="M6 13c2.5 0 4.5-2 4.5-4.5 0-1.5-1-3-2.5-4-.5 1.5-1.5 2.5-2 3-.5-1-1-2-.5-3.5C4 5 1.5 7 1.5 8.5 1.5 11 3.5 13 6 13z" stroke="currentColor" strokeWidth="1.4"/>
        </svg>
      ),
      Heart: (props) => (
        <svg width="14" height="13" viewBox="0 0 14 13" fill="none" {...props}>
          <path d="M7 11.5S1 7.5 1 4a3 3 0 016 0 3 3 0 016 0c0 3.5-6 7.5-6 7.5z" stroke="currentColor" strokeWidth="1.4"/>
        </svg>
      ),
      Compass: (props) => (
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" {...props}>
          <circle cx="7.5" cy="7.5" r="6" stroke="currentColor" strokeWidth="1.4"/>
          <path d="M9.5 5.5l-2 4-2-1 2-4 2 1z" stroke="currentColor" strokeWidth="1.2"/>
        </svg>
      ),
      Target: (props) => (
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" {...props}>
          <circle cx="7.5" cy="7.5" r="6" stroke="currentColor" strokeWidth="1.4"/>
          <circle cx="7.5" cy="7.5" r="3" stroke="currentColor" strokeWidth="1.4"/>
          <circle cx="7.5" cy="7.5" r="1" fill="currentColor"/>
        </svg>
      ),
      Tree: (props) => (
        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" {...props}>
          <circle cx="7.5" cy="3" r="2" stroke="currentColor" strokeWidth="1.4"/>
          <circle cx="3" cy="11" r="2" stroke="currentColor" strokeWidth="1.4"/>
          <circle cx="12" cy="11" r="2" stroke="currentColor" strokeWidth="1.4"/>
          <path d="M7.5 5v3M5.5 10L7.5 8M9.5 10L7.5 8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        </svg>
      ),
    };

    /* ── Logo ───────────────────────────────────────── */
    const Logo = () => (
      <div style={{
        width: 32, height: 32, borderRadius: 10,
        background: 'var(--ink)',
        display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>
        <span style={{ color: 'var(--green)', fontFamily: 'Fraunces, serif', fontStyle: 'italic', fontSize: 18, fontWeight: 700, lineHeight: 1 }}>M</span>
      </div>
    );

    /* ── Avatar ─────────────────────────────────────── */
    const Avatar = ({ letter, color, size = 32 }) => (
      <div style={{
        width: size, height: size, borderRadius: 999,
        background: color, color: 'white',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        fontWeight: 700, fontSize: size * 0.42
      }}>{letter}</div>
    );

    /* ── StatChip ───────────────────────────────────── */
    const StatChip = ({ color, icon, value, label }) => {
      const colors = {
        amber: { bg: 'var(--amber-soft)', fg: 'var(--amber-deep)' },
        green: { bg: 'var(--green-soft)', fg: 'var(--green-deep)' },
        rose:  { bg: 'var(--rose-soft)',  fg: 'var(--rose)' },
      };
      const c = colors[color];
      return (
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 7,
          padding: '6px 12px 6px 8px', borderRadius: 999,
          background: c.bg, color: c.fg,
          fontWeight: 700, fontSize: 13
        }}>
          <span style={{ display: 'inline-flex' }}>{icon}</span>
          <span>{value}</span>
          <span style={{ fontSize: 11, fontWeight: 600, opacity: 0.7 }}>{label}</span>
        </div>
      );
    };

    /* ── Nav ────────────────────────────────────────── */
    const Nav = ({ active = 'Library' }) => (
      <header style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'rgba(251,248,241,0.85)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid var(--line)'
      }}>
        <div style={{
          maxWidth: 1280, margin: '0 auto', padding: '14px 28px',
          display: 'flex', alignItems: 'center', gap: 24
        }}>
          <a href="student-dashboard.html" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Logo />
            <span style={{ fontWeight: 700, fontSize: 18, letterSpacing: '-0.01em' }}>Mathlify</span>
          </a>

          <nav style={{ display: 'flex', alignItems: 'center', gap: 2, marginLeft: 16 }}>
            {[
              { label: 'Today',      icon: <Icon.Compass />, href: 'student-dashboard.html' },
              { label: 'Skill tree', icon: <Icon.Tree />,    href: '#' },
              { label: 'Practice',   icon: <Icon.Target />,  href: '#' },
              { label: 'Library',    icon: <Icon.Book />,    href: 'course-library.html' },
            ].map((item) => (
              <a key={item.label} href={item.href} style={{
                display: 'inline-flex', alignItems: 'center', gap: 7,
                padding: '8px 14px', borderRadius: 10,
                fontSize: 14, fontWeight: 600,
                background: item.label === active ? 'var(--ink)' : 'transparent',
                color: item.label === active ? 'var(--paper)' : 'var(--ink-2)'
              }}>
                <span style={{ opacity: item.label === active ? 1 : 0.7 }}>{item.icon}</span>
                {item.label}
              </a>
            ))}
          </nav>

          <div style={{
            flex: 1, maxWidth: 320, marginLeft: 'auto',
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '8px 12px', borderRadius: 10,
            background: 'var(--paper)', border: '1px solid var(--line)',
            color: 'var(--ink-3)', fontSize: 13
          }}>
            <Icon.Search />
            <span>Search lessons, topics, formulas…</span>
            <span className="mono" style={{ marginLeft: 'auto', fontSize: 11, padding: '2px 6px', borderRadius: 4, background: 'var(--bg-2)' }}>⌘K</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <StatChip color="amber" icon={<Icon.Flame />} value="47"    label="streak" />
            <StatChip color="green" icon={<Icon.Bolt />}  value="1,284" label="XP" />
            <StatChip color="rose"  icon={<Icon.Heart />} value="5"     label="hearts" />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <button style={{
              width: 36, height: 36, borderRadius: 10,
              border: '1px solid var(--line)', background: 'var(--paper)',
              color: 'var(--ink-2)', cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              position: 'relative'
            }}>
              <Icon.Bell />
              <span style={{
                position: 'absolute', top: 7, right: 8,
                width: 7, height: 7, borderRadius: 999, background: 'var(--rose)',
                border: '1.5px solid var(--paper)'
              }} />
            </button>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '4px 10px 4px 4px', borderRadius: 999,
              border: '1px solid var(--line)', background: 'var(--paper)'
            }}>
              <Avatar letter="M" color="var(--green)" size={28} />
              <span style={{ fontSize: 13, fontWeight: 600 }}>Maya</span>
            </div>
          </div>
        </div>
      </header>
    );

    /* ── Data ───────────────────────────────────────── */
    const COURSES = [
      {
        id: 'calc-1', track: 'Calculus', level: 8, color: 'green',
        title: 'Differential Calculus', glyph: 'ƒ′',
        blurb: 'Limits, derivatives, and the curves they describe.',
        lessons: 38, hours: '12h', xp: 1840,
        progress: 43, status: 'in-progress',
        tags: ['Core', 'Year 2'],
      },
      {
        id: 'algebra-2', track: 'Algebra', level: 5, color: 'blue',
        title: 'Linear Algebra · the visual way', glyph: 'A⃗',
        blurb: 'Vectors, matrices, and transformations you can see.',
        lessons: 42, hours: '14h', xp: 2100,
        progress: 78, status: 'in-progress',
        tags: ['Core', 'Visual'],
      },
      {
        id: 'geo-1', track: 'Geometry', level: 3, color: 'amber',
        title: 'Foundations of Geometry', glyph: '△',
        blurb: 'Angles, proofs, and the language of shapes.',
        lessons: 28, hours: '9h', xp: 1320,
        progress: 100, status: 'complete',
        tags: ['Core'],
      },
      {
        id: 'prob-1', track: 'Probability', level: 6, color: 'plum',
        title: 'Probability & Combinatorics', glyph: 'ℙ',
        blurb: 'Counting, chance, and the math of uncertainty.',
        lessons: 34, hours: '11h', xp: 1680,
        progress: 12, status: 'in-progress',
        tags: ['Popular'],
      },
      {
        id: 'numth-1', track: 'Number theory', level: 7, color: 'rose',
        title: 'Number Theory & Primes', glyph: 'ℤ',
        blurb: 'Modular arithmetic, primes, and the proofs behind them.',
        lessons: 30, hours: '10h', xp: 1500,
        progress: 0, status: 'new',
        tags: ['New', 'Hard'],
      },
      {
        id: 'trig-1', track: 'Trigonometry', level: 4, color: 'blue',
        title: 'Trigonometry, Visualised', glyph: 'sin θ',
        blurb: 'Unit circle, identities, waves — built from the ground up.',
        lessons: 26, hours: '8h', xp: 1280,
        progress: 0, status: 'recommended',
        tags: ['Recommended for you'],
      },
      {
        id: 'stats-1', track: 'Statistics', level: 6, color: 'green',
        title: 'Statistics & Data Sense', glyph: 'σ',
        blurb: 'Distributions, inference, and how to read a chart honestly.',
        lessons: 36, hours: '12h', xp: 1740,
        progress: 0, status: 'new',
        tags: ['New'],
      },
      {
        id: 'discrete-1', track: 'Discrete math', level: 5, color: 'amber',
        title: 'Discrete Mathematics', glyph: '∑',
        blurb: 'Logic, sets, graphs — the toolkit behind computer science.',
        lessons: 32, hours: '10h', xp: 1580,
        progress: 0, status: 'locked',
        tags: ['Year 3'],
      },
    ];

    const COLOR_MAP = {
      green: { bg: 'var(--green-soft)', deep: 'var(--green-deep)', solid: 'var(--green)' },
      blue:  { bg: 'var(--blue-soft)',  deep: 'var(--blue-deep)',  solid: 'var(--blue)' },
      amber: { bg: 'var(--amber-soft)', deep: 'var(--amber-deep)', solid: 'var(--amber)' },
      plum:  { bg: 'var(--plum-soft)',  deep: 'var(--plum)',       solid: 'var(--plum)' },
      rose:  { bg: 'var(--rose-soft)',  deep: 'var(--rose)',       solid: 'var(--rose)' },
    };

    /* ── LibraryHeader ──────────────────────────────── */
    const ToggleGroup = ({ options, active, onSelect }) => (
      <div style={{
        display: 'inline-flex', padding: 4, gap: 2,
        background: 'var(--paper)', border: '1px solid var(--line)',
        borderRadius: 12
      }}>
        {options.map((o) => (
          <button key={o} onClick={() => onSelect && onSelect(o)} style={{
            padding: '8px 14px', borderRadius: 8,
            border: 'none', cursor: 'pointer',
            background: o === active ? 'var(--ink)' : 'transparent',
            color: o === active ? 'var(--paper)' : 'var(--ink-2)',
            fontWeight: 600, fontSize: 13
          }}>{o}</button>
        ))}
      </div>
    );

    const LibraryHeader = ({ activeView, setActiveView }) => (
      <div style={{ marginTop: 28, marginBottom: 22 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 6 }}>
          <span className="mono" style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: 'var(--ink-3)' }}>
            LIBRARY · 248 COURSES
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 20 }}>
          <h1 style={{ margin: 0, fontSize: 44, fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.05 }}>
            Every topic, <span className="serif" style={{ color: 'var(--green-deep)' }}>your way</span>.
          </h1>
          <ToggleGroup
            options={['All', 'My courses', 'Saved', 'Completed']}
            active={activeView}
            onSelect={setActiveView}
          />
        </div>
      </div>
    );

    /* ── FeaturedStrip ──────────────────────────────── */
    const MiniStat = ({ label, value }) => (
      <div style={{
        padding: '10px 12px', borderRadius: 10,
        background: 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(255,255,255,0.08)'
      }}>
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', color: 'rgba(255,253,247,0.5)' }}>
          {label.toUpperCase()}
        </div>
        <div style={{ fontSize: 15, fontWeight: 700, marginTop: 2 }}>{value}</div>
      </div>
    );

    const FeaturedStrip = () => (
      <div style={{
        position: 'relative', overflow: 'hidden',
        background: 'var(--ink)', color: 'var(--paper)',
        borderRadius: 24, padding: '28px 32px',
        display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 24,
        boxShadow: 'var(--shadow-md)',
        marginBottom: 26
      }}>
        <span className="serif" style={{
          position: 'absolute', right: -20, top: -60, fontSize: 280,
          lineHeight: 1, color: 'var(--green)', opacity: 0.18, fontWeight: 600,
          pointerEvents: 'none', userSelect: 'none'
        }}>∫</span>

        <div style={{ position: 'relative' }}>
          <span className="mono" style={{
            display: 'inline-block', padding: '4px 10px',
            background: 'rgba(255,255,255,0.12)', borderRadius: 999,
            fontSize: 11, fontWeight: 700, letterSpacing: '0.06em',
            marginBottom: 14
          }}>YOUR CURRENT FOCUS</span>
          <h2 style={{
            margin: '0 0 8px', fontSize: 30, fontWeight: 700,
            letterSpacing: '-0.025em', lineHeight: 1.1
          }}>Differential Calculus</h2>
          <p style={{ margin: 0, color: 'rgba(255,253,247,0.7)', fontSize: 14, maxWidth: 440, lineHeight: 1.55 }}>
            You're on Lesson 12 of 38 — derivatives of trig functions next. Keep your streak rolling.
          </p>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 22 }}>
            <a href="#" style={{
              padding: '12px 20px', borderRadius: 12,
              background: 'var(--green)', color: 'white', fontWeight: 700, fontSize: 14,
              display: 'inline-flex', alignItems: 'center', gap: 8,
              boxShadow: '0 2px 0 var(--green-deep)'
            }}>Resume course <Icon.Arrow /></a>
            <a href="#" style={{
              padding: '12px 18px', borderRadius: 12,
              border: '1px solid rgba(255,255,255,0.18)', color: 'var(--paper)',
              fontWeight: 600, fontSize: 14
            }}>View syllabus</a>
          </div>
        </div>

        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            fontSize: 11, color: 'rgba(255,253,247,0.6)', fontWeight: 700, letterSpacing: '0.06em',
            marginBottom: 8
          }}>
            <span>PROGRESS</span><span>12 / 38 LESSONS</span>
          </div>
          <div style={{ display: 'flex', gap: 3, marginBottom: 20 }}>
            {Array.from({ length: 38 }).map((_, i) => (
              <div key={i} style={{
                flex: 1, height: 28, borderRadius: 4,
                background: i < 12 ? 'var(--green)' :
                           i === 12 ? 'var(--amber)' :
                           'rgba(255,255,255,0.08)'
              }} />
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
            <MiniStat label="On streak" value="47 days" />
            <MiniStat label="Mastery"   value="68%" />
            <MiniStat label="Next badge" value="Chain master" />
          </div>
        </div>
      </div>
    );

    /* ── SectionHeader ──────────────────────────────── */
    const SectionHeader = ({ eyebrow, title, hint }) => (
      <div style={{
        display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
        margin: '12px 0 14px'
      }}>
        <div>
          <div className="mono" style={{
            fontSize: 11, fontWeight: 700, letterSpacing: '0.1em',
            color: 'var(--ink-3)', marginBottom: 4
          }}>{eyebrow}</div>
          <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em' }}>{title}</h2>
        </div>
        {hint && (
          <a href="#" style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink-3)' }}>{hint} ↗</a>
        )}
      </div>
    );

    /* ── PathwayRow ─────────────────────────────────── */
    const PathwayRow = () => {
      const paths = [
        { title: 'High school catch-up', count: 6, hours: '32h', color: 'green', glyph: 'Σ' },
        { title: 'Calculus mastery',     count: 4, hours: '46h', color: 'blue',  glyph: '∂' },
        { title: 'CS-math foundations',  count: 5, hours: '38h', color: 'plum',  glyph: '⊕' },
        { title: 'Olympiad prep',        count: 7, hours: '60h', color: 'amber', glyph: '⋆' },
      ];
      return (
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 32
        }}>
          {paths.map((p) => {
            const c = COLOR_MAP[p.color];
            return (
              <div key={p.title} style={{
                position: 'relative', overflow: 'hidden',
                padding: 18, borderRadius: 18,
                background: 'var(--paper)', border: '1px solid var(--line)',
                display: 'flex', alignItems: 'center', gap: 14,
                cursor: 'pointer',
                boxShadow: 'var(--shadow-sm)',
                transition: 'transform 0.15s, box-shadow 0.15s'
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}
              >
                <div style={{
                  width: 52, height: 52, borderRadius: 14,
                  background: c.bg, color: c.deep,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'Fraunces, serif', fontSize: 28, fontWeight: 600, fontStyle: 'italic',
                  flexShrink: 0
                }}>{p.glyph}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 11, color: 'var(--ink-3)', fontWeight: 700, letterSpacing: '0.06em' }}>PATHWAY</div>
                  <div style={{ fontSize: 15, fontWeight: 700, marginTop: 1 }}>{p.title}</div>
                  <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 2 }}>{p.count} courses · {p.hours}</div>
                </div>
                <Icon.Arrow style={{ color: 'var(--ink-3)', flexShrink: 0 }} />
              </div>
            );
          })}
        </div>
      );
    };

    /* ── CourseCard ─────────────────────────────────── */
    const CourseCard = ({ course }) => {
      const c = COLOR_MAP[course.color];
      const locked = course.status === 'locked';

      return (
        <a href={locked ? undefined : '#'} style={{
          position: 'relative',
          background: 'var(--paper)',
          border: '1px solid var(--line)',
          borderRadius: 20,
          overflow: 'hidden',
          display: 'flex', flexDirection: 'column',
          boxShadow: 'var(--shadow-sm)',
          opacity: locked ? 0.55 : 1,
          cursor: locked ? 'not-allowed' : 'pointer',
          transition: 'transform 0.15s, box-shadow 0.15s'
        }}
          onMouseEnter={e => { if (!locked) { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = 'var(--shadow-md)'; }}}
          onMouseLeave={e => { e.currentTarget.style.transform = ''; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}
        >
          {/* Cover */}
          <div style={{
            position: 'relative', height: 130,
            background: c.bg, overflow: 'hidden',
            borderBottom: '1px solid var(--line)'
          }}>
            <span className="serif" style={{
              position: 'absolute', left: 18, top: -20, fontSize: 180,
              color: c.deep, opacity: 0.22, fontWeight: 600, lineHeight: 1,
              pointerEvents: 'none', userSelect: 'none'
            }}>{course.glyph}</span>

            {/* Status badge */}
            <div style={{ position: 'absolute', top: 14, right: 14, display: 'flex', gap: 6 }}>
              {course.status === 'complete' && (
                <span style={{
                  padding: '4px 10px', borderRadius: 999,
                  background: 'var(--green)', color: 'white',
                  fontSize: 11, fontWeight: 700, letterSpacing: '0.04em',
                  display: 'inline-flex', alignItems: 'center', gap: 5
                }}><Icon.Check /> COMPLETE</span>
              )}
              {course.status === 'new' && (
                <span style={{
                  padding: '4px 10px', borderRadius: 999,
                  background: 'var(--ink)', color: 'var(--paper)',
                  fontSize: 11, fontWeight: 700, letterSpacing: '0.04em'
                }}>NEW</span>
              )}
              {course.status === 'recommended' && (
                <span style={{
                  padding: '4px 10px', borderRadius: 999,
                  background: 'var(--paper)', color: 'var(--ink)',
                  border: '1px solid var(--line)',
                  fontSize: 11, fontWeight: 700, letterSpacing: '0.04em',
                  display: 'inline-flex', alignItems: 'center', gap: 5
                }}><Icon.Sparkle /> FOR YOU</span>
              )}
              {locked && (
                <span style={{
                  padding: '4px 10px', borderRadius: 999,
                  background: 'var(--paper)', color: 'var(--ink-3)',
                  border: '1px solid var(--line)',
                  fontSize: 11, fontWeight: 700, letterSpacing: '0.04em',
                  display: 'inline-flex', alignItems: 'center', gap: 5
                }}><Icon.Lock /> LEVEL {course.level}+</span>
              )}
            </div>

            <div style={{ position: 'absolute', left: 18, bottom: 14 }}>
              <span className="mono" style={{
                padding: '3px 8px', borderRadius: 6,
                background: 'rgba(255,253,247,0.65)', backdropFilter: 'blur(4px)',
                fontSize: 11, fontWeight: 700, color: c.deep
              }}>{course.track.toUpperCase()}</span>
            </div>
          </div>

          {/* Body */}
          <div style={{ padding: 18, display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
            <div>
              <h3 style={{
                margin: '0 0 6px', fontSize: 17, fontWeight: 700,
                letterSpacing: '-0.015em', lineHeight: 1.25
              }}>{course.title}</h3>
              <p style={{ margin: 0, fontSize: 13, color: 'var(--ink-3)', lineHeight: 1.45 }}>{course.blurb}</p>
            </div>

            <div style={{ display: 'flex', gap: 14, fontSize: 12, color: 'var(--ink-3)', marginTop: 'auto' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                <Icon.Book /> {course.lessons} lessons
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                <Icon.Clock /> {course.hours}
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: 'var(--amber-deep)' }}>
                <Icon.Bolt /> {course.xp}
              </span>
            </div>

            {course.progress > 0 && (
              <div style={{ marginTop: 4 }}>
                <div style={{
                  display: 'flex', justifyContent: 'space-between',
                  fontSize: 10, fontWeight: 700, letterSpacing: '0.06em',
                  color: 'var(--ink-3)', marginBottom: 4
                }}>
                  <span>{course.status === 'complete' ? 'COMPLETED' : 'IN PROGRESS'}</span>
                  <span>{course.progress}%</span>
                </div>
                <div style={{ height: 5, borderRadius: 999, background: 'var(--bg-2)', overflow: 'hidden' }}>
                  <div style={{
                    height: '100%', width: course.progress + '%',
                    background: course.status === 'complete' ? 'var(--green)' : c.solid,
                    borderRadius: 999
                  }} />
                </div>
              </div>
            )}
            {course.progress === 0 && (
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                marginTop: 4, paddingTop: 10, borderTop: '1px dashed var(--line)'
              }}>
                <span style={{ fontSize: 12, color: 'var(--ink-3)' }}>Not started</span>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: 4,
                  fontSize: 13, fontWeight: 700, color: c.deep
                }}>
                  {locked ? 'Unlock at L' + course.level : 'Start'} <Icon.Arrow />
                </span>
              </div>
            )}
          </div>
        </a>
      );
    };

    /* ── CourseGrid ─────────────────────────────────── */
    const CourseGrid = ({ courses }) => (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        {courses.map((c) => <CourseCard key={c.id} course={c} />)}
      </div>
    );

    /* ── FilterRow ──────────────────────────────────── */
    const FilterRow = ({ activeFilter, setActiveFilter }) => {
      const topics = [
        { label: 'All topics',    count: 248 },
        { label: 'Algebra',       count: 42 },
        { label: 'Calculus',      count: 38 },
        { label: 'Geometry',      count: 28 },
        { label: 'Probability',   count: 24 },
        { label: 'Trigonometry',  count: 18 },
        { label: 'Number theory', count: 12 },
        { label: 'Discrete',      count: 16 },
      ];

      return (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 16,
          marginBottom: 22, flexWrap: 'wrap'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
            {topics.map((t) => (
              <button key={t.label}
                onClick={() => setActiveFilter(t.label)}
                style={{
                  padding: '8px 14px', borderRadius: 999,
                  border: '1px solid ' + (t.label === activeFilter ? 'var(--ink)' : 'var(--line)'),
                  background: t.label === activeFilter ? 'var(--ink)' : 'var(--paper)',
                  color: t.label === activeFilter ? 'var(--paper)' : 'var(--ink-2)',
                  cursor: 'pointer', fontSize: 13, fontWeight: 600,
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  transition: 'all 0.15s'
                }}>
                {t.label}
                <span className="mono" style={{
                  fontSize: 10,
                  color: t.label === activeFilter ? 'rgba(255,253,247,0.55)' : 'var(--ink-3)'
                }}>{t.count}</span>
              </button>
            ))}
          </div>

          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 12, color: 'var(--ink-3)', fontWeight: 600 }}>Sort by</span>
            <button style={{
              padding: '8px 12px', borderRadius: 10,
              border: '1px solid var(--line)', background: 'var(--paper)',
              fontSize: 13, fontWeight: 600, color: 'var(--ink-2)',
              cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6
            }}>
              Recommended
              <span style={{ transform: 'rotate(90deg)', display: 'inline-block' }}>
                <Icon.Arrow />
              </span>
            </button>
          </div>
        </div>
      );
    };

    /* ── Footer ─────────────────────────────────────── */
    const Footer = () => (
      <div style={{
        marginTop: 40, paddingTop: 24,
        borderTop: '1px solid var(--line)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        fontSize: 12, color: 'var(--ink-3)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <Logo />
          <span>Mathlify · Library v2.4</span>
        </div>
        <div style={{ display: 'flex', gap: 18 }}>
          <a href="#" style={{ color: 'var(--ink-3)' }}>Request a topic</a>
          <a href="#" style={{ color: 'var(--ink-3)' }}>Help</a>
          <a href="#" style={{ color: 'var(--ink-3)' }}>Settings</a>
        </div>
      </div>
    );

    /* ── LibraryApp ─────────────────────────────────── */
    const LibraryApp = () => {
      const [filter, setFilter] = React.useState('All topics');
      const [activeView, setActiveView] = React.useState('All');

      const inProgress = COURSES.filter(c => c.status === 'in-progress');

      const filteredAll = React.useMemo(() => {
        if (filter === 'All topics') return COURSES;
        return COURSES.filter(c =>
          c.track.toLowerCase() === filter.toLowerCase() ||
          c.track.toLowerCase().includes(filter.toLowerCase())
        );
      }, [filter]);

      return (
        <div>
          <Nav active="Library" />

          <main style={{ maxWidth: 1280, margin: '0 auto', padding: '0 28px 80px' }}>
            <LibraryHeader activeView={activeView} setActiveView={setActiveView} />
            <FeaturedStrip />

            <SectionHeader
              eyebrow="GUIDED PATHS · BUNDLED FOR YOU"
              title="Pathways"
              hint="See all paths"
            />
            <PathwayRow />

            <SectionHeader
              eyebrow={`${inProgress.length} ACTIVE · LAST OPENED 12M AGO`}
              title="Continue learning"
              hint="View all"
            />
            <div style={{ marginBottom: 28 }}>
              <CourseGrid courses={inProgress} />
            </div>

            <SectionHeader eyebrow="ALL TOPICS" title="Browse the library" />
            <FilterRow activeFilter={filter} setActiveFilter={setFilter} />
            <CourseGrid courses={filteredAll} />

            <Footer />
          </main>
        </div>
      );
    };

    createRoot(document.getElementById('root')).render(<LibraryApp />);
