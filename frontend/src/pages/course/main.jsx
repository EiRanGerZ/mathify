import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const SC = window.STUDENT_CONTEXT || {};
            const notify = (msg) => window.dispatchEvent(new CustomEvent('student-notify', { detail: { msg } }));

            // ── Icons ──────────────────────────────────────────────────────────────────
            const Icon = {
              Check: (p) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}><path d="M3 8.5L6.5 12L13 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>,
              Arrow: (p) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}><path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>,
              Lock: (p) => <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...p}><rect x="2.5" y="6" width="9" height="6.5" rx="1.5" stroke="currentColor" strokeWidth="1.6" /><path d="M4.5 6V4.5C4.5 3.12 5.62 2 7 2C8.38 2 9.5 3.12 9.5 4.5V6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>,
              Play: (p) => <svg width="12" height="12" viewBox="0 0 12 12" fill="none" {...p}><path d="M3.5 2.5V9.5L9.5 6L3.5 2.5Z" fill="currentColor" /></svg>,
              Book: (p) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}><path d="M3 3H7C7.5 3 8 3.5 8 4V13C8 12.5 7.5 12 7 12H3V3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M13 3H9C8.5 3 8 3.5 8 4V13C8 12.5 8.5 12 9 12H13V3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /></svg>,
              Target: (p) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}><circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" /><circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" /><circle cx="8" cy="8" r="1" fill="currentColor" /></svg>,
              Sparkle: (p) => <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...p}><path d="M7 1L8 6L13 7L8 8L7 13L6 8L1 7L6 6Z" fill="currentColor" /></svg>,
              Trophy: (p) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}><path d="M5 2H11V7C11 9 9.5 10.5 8 10.5C6.5 10.5 5 9 5 7V2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M5 3.5H3V5C3 6 3.7 7 5 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><path d="M11 3.5H13V5C13 6 12.3 7 11 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><path d="M8 10.5V13M6 13.5H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>,
              Bolt: (p) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}><path d="M9 1L3 9H8L7 15L13 7H8L9 1Z" fill="currentColor" /></svg>,
              Clock: (p) => <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...p}><circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.5" /><path d="M7 4V7L9 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>,
              Heart: (p) => <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...p}><path d="M7 12C7 12 1.5 8.5 1.5 5C1.5 3.3 2.8 2 4.5 2C5.5 2 6.5 2.7 7 3.5C7.5 2.7 8.5 2 9.5 2C11.2 2 12.5 3.3 12.5 5C12.5 8.5 7 12 7 12Z" fill="currentColor" /></svg>,
              Search: (p) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}><circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5" /><path d="M10.5 10.5L13.5 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>,
              Compass: (p) => <svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...p}><circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.6" /><path d="M13.5 6.5L11 11L6.5 13.5L9 9L13.5 6.5Z" fill="currentColor" /></svg>,
              Tree: (p) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}><path d="M8 2V14M8 6L11 4M8 6L5 4M8 10L11.5 8M8 10L4.5 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>,
              Bell: (p) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}><path d="M4 7C4 4.8 5.8 3 8 3C10.2 3 12 4.8 12 7V10L13 11.5H3L4 10V7Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M6.5 12.5C6.5 13.3 7.2 14 8 14C8.8 14 9.5 13.3 9.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>,
              Flame: (p) => <svg width="18" height="18" viewBox="0 0 18 18" fill="none" {...p}><path d="M9 2C9 5 6 5.5 6 9C6 11.5 7.5 13.5 9 13.5C10.5 13.5 12 11.5 12 9C12 7 11 6 11 4C12 5 13 6.5 13 9C13 12 11.2 14.5 9 14.5C6.8 14.5 5 12.5 5 9.5C5 6 9 5 9 2Z" fill="currentColor" /></svg>,
            };

            const Logo = () => (
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <rect x="1.5" y="1.5" width="29" height="29" rx="9" fill="var(--green)" />
                <rect x="1.5" y="1.5" width="29" height="29" rx="9" stroke="var(--green-deep)" strokeWidth="1.5" />
                <path d="M8 22V10L13 18L18 10V22" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                <circle cx="22" cy="11" r="2" fill="var(--amber)" />
              </svg>
            );

            const Avatar = ({ letter, color, size = 32 }) => (
              <div style={{ width: size, height: size, borderRadius: 999, background: color, color: 'white', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: size * 0.42, flexShrink: 0 }}>{letter}</div>
            );

            const StatChip = ({ color, icon, value, label }) => {
              const colors = { amber: { bg: 'var(--amber-soft)', fg: 'var(--amber-deep)' }, green: { bg: 'var(--green-soft)', fg: 'var(--green-deep)' }, rose: { bg: 'var(--rose-soft)', fg: 'var(--rose)' } };
              const c = colors[color];
              return (
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '6px 12px 6px 8px', borderRadius: 999, background: c.bg, color: c.fg, fontWeight: 700, fontSize: 13 }}>
                  <span style={{ display: 'inline-flex' }}>{icon}</span>
                  <span>{value}</span>
                  <span style={{ fontSize: 11, fontWeight: 600, opacity: 0.7 }}>{label}</span>
                </div>
              );
            };

            // ── Nav (Library tab active for course page) ───────────────────────────────
            const Nav = () => {
              const base = SC.ctx || '';
              const items = [
                { label: 'Today', icon: <Icon.Compass />, href: base + '/dashboard' },
                { label: 'Skill tree', icon: <Icon.Tree />, href: '#' },
                { label: 'Practice', icon: <Icon.Target />, href: '#', onClick: () => notify('Practice module coming soon') },
                { label: 'Library', icon: <Icon.Book />, href: base + '/library', active: true },
              ];
              return (
                <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(251,248,241,0.85)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', borderBottom: '1px solid var(--line)' }}>
                  <div style={{ maxWidth: 1280, margin: '0 auto', padding: '14px 28px', display: 'flex', alignItems: 'center', gap: 24 }}>
                    <a href={base + '/dashboard'} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <Logo /><span style={{ fontWeight: 700, fontSize: 18, letterSpacing: '-0.01em' }}>Mathify</span>
                    </a>
                    <nav style={{ display: 'flex', alignItems: 'center', gap: 2, marginLeft: 16 }}>
                      {items.map((item) => (
                        <a key={item.label} href={item.href}
                          onClick={item.onClick ? (e) => { e.preventDefault(); item.onClick(); } : undefined}
                          style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '8px 14px', borderRadius: 10, fontSize: 14, fontWeight: 600, background: item.active ? 'var(--ink)' : 'transparent', color: item.active ? 'var(--paper)' : 'var(--ink-2)' }}>
                          <span style={{ opacity: item.active ? 1 : 0.7 }}>{item.icon}</span>{item.label}
                        </a>
                      ))}
                    </nav>
                    <div style={{ flex: 1, maxWidth: 320, marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8, padding: '8px 12px', borderRadius: 10, background: 'var(--paper)', border: '1px solid var(--line)', color: 'var(--ink-3)', fontSize: 13 }}>
                      <Icon.Search /><span>Search lessons, topics, formulas…</span>
                      <span className="mono" style={{ marginLeft: 'auto', fontSize: 11, padding: '2px 6px', borderRadius: 4, background: 'var(--bg-2)' }}>⌘K</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <StatChip color="amber" icon={<Icon.Flame />} value={SC.streak > 0 ? String(SC.streak) : '0'} label="streak" />
                      <StatChip color="green" icon={<Icon.Bolt />} value={SC.xp > 0 ? SC.xp.toLocaleString() : '0'} label="XP" />
                      <StatChip color="rose" icon={<Icon.Heart />} value="5" label="hearts" />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <button style={{ width: 36, height: 36, borderRadius: 10, border: '1px solid var(--line)', background: 'var(--paper)', color: 'var(--ink-2)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                        <Icon.Bell />
                        <span style={{ position: 'absolute', top: 7, right: 8, width: 7, height: 7, borderRadius: 999, background: 'var(--rose)', border: '1.5px solid var(--paper)' }} />
                      </button>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 10px 4px 4px', borderRadius: 999, border: '1px solid var(--line)', background: 'var(--paper)' }}>
                        <Avatar letter={SC.initial || 'S'} color="var(--green)" size={28} />
                        <span style={{ fontSize: 13, fontWeight: 600 }}>{SC.name || 'Student'}</span>
                      </div>
                    </div>
                  </div>
                </header>
              );
            };

            // ── Course data ────────────────────────────────────────────────────────────
            const COLOR_MAP_C = {
              green: { bg: 'var(--green-soft)', deep: 'var(--green-deep)', solid: 'var(--green)' },
              blue: { bg: 'var(--blue-soft)', deep: 'var(--blue-deep)', solid: 'var(--blue)' },
              amber: { bg: 'var(--amber-soft)', deep: 'var(--amber-deep)', solid: 'var(--amber)' },
              plum: { bg: 'var(--plum-soft)', deep: 'var(--plum)', solid: 'var(--plum)' },
              rose: { bg: 'var(--rose-soft)', deep: 'var(--rose)', solid: 'var(--rose)' },
            };

            const COURSE = {
              track: 'Calculus',
              title: 'Differential Calculus',
              glyph: 'ƒ′',
              color: 'green',
              blurb: 'Limits, derivatives, and the curves they describe.',
              totalLessons: 38,
              hours: '12h',
              xp: 1840,
              progress: 43,
              level: 8,
              tags: ['Core', 'Year 2'],
            };

            const TYPE_META = {
              read: { label: 'Reading', color: 'var(--blue-soft)', fg: 'var(--blue-deep)' },
              practice: { label: 'Practice', color: 'var(--amber-soft)', fg: 'var(--amber-deep)' },
              video: { label: 'Video', color: 'var(--plum-soft)', fg: 'var(--plum)' },
              quiz: { label: 'Quiz', color: 'var(--rose-soft)', fg: 'var(--rose)' },
            };

            const CHAPTERS = [
              {
                id: 1, title: 'Limits & Continuity', lessons: 8, done: 8, status: 'complete',
                items: [
                  { id: 1, type: 'read', title: 'What is a limit?', dur: '5m', xp: 12, status: 'done' },
                  { id: 2, type: 'read', title: 'One-sided limits', dur: '4m', xp: 10, status: 'done' },
                  { id: 3, type: 'practice', title: 'Limit drills (10 problems)', dur: '10m', xp: 20, status: 'done' },
                  { id: 4, type: 'video', title: 'Visualising ε–δ definition', dur: '4:30', xp: 10, status: 'done' },
                  { id: 5, type: 'read', title: 'Continuity and discontinuities', dur: '6m', xp: 14, status: 'done' },
                  { id: 6, type: 'practice', title: 'Continuity exercises', dur: '8m', xp: 18, status: 'done' },
                  { id: 7, type: 'quiz', title: 'Chapter quiz — Limits', dur: '12m', xp: 30, status: 'done' },
                  { id: 8, type: 'read', title: 'Limits at infinity', dur: '5m', xp: 12, status: 'done' },
                ],
              },
              {
                id: 2, title: 'Introduction to Derivatives', lessons: 10, done: 5, status: 'in-progress',
                items: [
                  { id: 9, type: 'read', title: 'The derivative as a slope', dur: '6m', xp: 14, status: 'done' },
                  { id: 10, type: 'read', title: 'Derivative notation: f′, dy/dx', dur: '4m', xp: 10, status: 'done' },
                  { id: 11, type: 'practice', title: 'Derivative from first principles', dur: '12m', xp: 22, status: 'done' },
                  { id: 12, type: 'video', title: 'Power rule visualised', dur: '3:48', xp: 10, status: 'done' },
                  { id: 13, type: 'read', title: 'The chain rule, intuitively', dur: '6m', xp: 14, status: 'active' },
                  { id: 14, type: 'practice', title: 'Chain rule drills', dur: '10m', xp: 18, status: 'locked' },
                  { id: 15, type: 'read', title: 'Product & quotient rules', dur: '7m', xp: 16, status: 'locked' },
                  { id: 16, type: 'practice', title: 'Mixed rule practice', dur: '12m', xp: 24, status: 'locked' },
                  { id: 17, type: 'video', title: 'Derivatives of trig functions', dur: '5:10', xp: 12, status: 'locked' },
                  { id: 18, type: 'quiz', title: 'Chapter quiz — Derivatives', dur: '15m', xp: 35, status: 'locked' },
                ],
              },
              {
                id: 3, title: 'Applications of Derivatives', lessons: 10, done: 0, status: 'locked',
                items: [
                  { id: 19, type: 'read', title: 'Finding critical points', dur: '5m', xp: 12, status: 'locked' },
                  { id: 20, type: 'read', title: 'Maxima and minima', dur: '6m', xp: 14, status: 'locked' },
                  { id: 21, type: 'practice', title: 'Optimisation problems', dur: '15m', xp: 28, status: 'locked' },
                  { id: 22, type: 'video', title: 'Mean Value Theorem explained', dur: '5:30', xp: 12, status: 'locked' },
                  { id: 23, type: 'read', title: 'Concavity and inflection points', dur: '6m', xp: 14, status: 'locked' },
                  { id: 24, type: 'practice', title: 'Curve sketching', dur: '12m', xp: 22, status: 'locked' },
                  { id: 25, type: 'read', title: "L'Hôpital's rule", dur: '5m', xp: 12, status: 'locked' },
                  { id: 26, type: 'practice', title: "L'Hôpital drills", dur: '8m', xp: 18, status: 'locked' },
                  { id: 27, type: 'video', title: 'Related rates, animated', dur: '4:20', xp: 10, status: 'locked' },
                  { id: 28, type: 'quiz', title: 'Chapter quiz — Applications', dur: '15m', xp: 35, status: 'locked' },
                ],
              },
              {
                id: 4, title: 'Introduction to Integration', lessons: 10, done: 0, status: 'locked',
                items: [
                  { id: 29, type: 'read', title: 'Antiderivatives and indefinite integrals', dur: '6m', xp: 14, status: 'locked' },
                  { id: 30, type: 'read', title: 'The Fundamental Theorem of Calculus', dur: '8m', xp: 18, status: 'locked' },
                  { id: 31, type: 'practice', title: 'Basic integration drills', dur: '10m', xp: 20, status: 'locked' },
                  { id: 32, type: 'video', title: 'Definite integral as area', dur: '5:00', xp: 12, status: 'locked' },
                  { id: 33, type: 'read', title: 'Substitution rule (u-sub)', dur: '6m', xp: 14, status: 'locked' },
                  { id: 34, type: 'practice', title: 'u-substitution exercises', dur: '12m', xp: 22, status: 'locked' },
                  { id: 35, type: 'read', title: 'Integration by parts', dur: '7m', xp: 16, status: 'locked' },
                  { id: 36, type: 'practice', title: 'IBP drills', dur: '12m', xp: 22, status: 'locked' },
                  { id: 37, type: 'video', title: 'Area between curves', dur: '4:45', xp: 10, status: 'locked' },
                  { id: 38, type: 'quiz', title: 'Final chapter quiz', dur: '20m', xp: 50, status: 'locked' },
                ],
              },
            ];

            // ── Breadcrumb ─────────────────────────────────────────────────────────────
            const Breadcrumb = () => {
              const base = SC.ctx || '';
              return (
                <nav style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--ink-3)', marginBottom: 20 }}>
                  <a href={base + '/library'} style={{ color: 'var(--ink-3)', fontWeight: 600 }}>Library</a>
                  <span>›</span>
                  <span style={{ color: 'var(--ink)', fontWeight: 600 }}>{COURSE.title}</span>
                </nav>
              );
            };

            // ── Course Hero ────────────────────────────────────────────────────────────
            const CourseHero = () => {
              const base = SC.ctx || '';
              const c = COLOR_MAP_C[COURSE.color];
              const doneLessons = CHAPTERS.reduce((a, ch) => a + ch.done, 0);
              return (
                <div style={{ position: 'relative', borderRadius: 24, overflow: 'hidden', background: 'var(--ink)', color: 'var(--paper)', padding: '36px 40px', display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 32, boxShadow: 'var(--shadow-lg)', marginBottom: 32 }}>
                  <span className="serif" style={{ position: 'absolute', right: -20, top: -60, fontSize: 320, lineHeight: 1, color: c.solid, opacity: 0.12, fontWeight: 600, pointerEvents: 'none' }}>{COURSE.glyph}</span>
                  <div style={{ position: 'relative' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                      <span className="mono" style={{ padding: '4px 10px', background: 'rgba(255,255,255,0.12)', borderRadius: 999, fontSize: 11, fontWeight: 700, letterSpacing: '0.06em' }}>{COURSE.track.toUpperCase()}</span>
                      {COURSE.tags.map((t) => <span key={t} style={{ padding: '4px 10px', background: 'rgba(255,255,255,0.08)', borderRadius: 999, fontSize: 11, fontWeight: 600 }}>{t}</span>)}
                    </div>
                    <h1 style={{ margin: '0 0 10px', fontSize: 'clamp(26px,3vw,38px)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.1 }}>{COURSE.title}</h1>
                    <p style={{ margin: '0 0 24px', color: 'rgba(255,253,247,0.72)', fontSize: 15, lineHeight: 1.6, maxWidth: 480 }}>{COURSE.blurb}</p>
                    <div style={{ display: 'flex', gap: 18, fontSize: 13, color: 'rgba(255,253,247,0.6)', marginBottom: 24 }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><Icon.Book /> {COURSE.totalLessons} lessons</span>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><Icon.Clock /> {COURSE.hours}</span>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--amber)' }}><Icon.Bolt /> {COURSE.xp} XP</span>
                    </div>
                    <div style={{ display: 'flex', gap: 12 }}>
                      <a href={base + '/quiz'} style={{ padding: '13px 22px', borderRadius: 13, background: 'var(--green)', color: 'white', fontWeight: 700, fontSize: 14, display: 'inline-flex', alignItems: 'center', gap: 8, boxShadow: '0 2px 0 var(--green-deep)' }}>
                        Continue lesson <Icon.Arrow />
                      </a>
                      <button onClick={() => notify('Syllabus PDF coming soon')} style={{ padding: '13px 18px', borderRadius: 13, border: '1px solid rgba(255,255,255,0.18)', background: 'transparent', color: 'var(--paper)', fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>
                        View syllabus
                      </button>
                    </div>
                  </div>
                  <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 16 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'rgba(255,253,247,0.55)', fontWeight: 700, letterSpacing: '0.06em' }}>
                      <span>PROGRESS</span><span>{doneLessons} / {COURSE.totalLessons} LESSONS</span>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                      {Array.from({ length: COURSE.totalLessons }).map((_, i) => (
                        <div key={i} style={{ width: 14, height: 14, borderRadius: 3, background: i < doneLessons ? 'var(--green)' : i === doneLessons ? 'var(--amber)' : 'rgba(255,255,255,0.08)' }} />
                      ))}
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                      {[
                        { label: 'Streak', value: SC.streak > 0 ? SC.streak + ' days' : '1 day' },
                        { label: 'Mastery', value: COURSE.progress + '%' },
                        { label: 'Level', value: 'L' + COURSE.level },
                        { label: 'Chapters', value: CHAPTERS.length + ' total' },
                      ].map((s) => (
                        <div key={s.label} style={{ padding: '10px 12px', borderRadius: 10, background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}>
                          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.08em', color: 'rgba(255,253,247,0.5)' }}>{s.label.toUpperCase()}</div>
                          <div style={{ fontSize: 15, fontWeight: 700, marginTop: 2 }}>{s.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            };

            // ── Stat ───────────────────────────────────────────────────────────────────
            const Stat = ({ icon, label, value, color }) => (
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: color || 'var(--ink-3)' }}>
                {icon}<span style={{ fontWeight: 600 }}>{value}</span><span>{label}</span>
              </div>
            );

            // ── Tabs ───────────────────────────────────────────────────────────────────
            const Tabs = ({ active, setActive }) => {
              const tabs = ['Curriculum', 'Overview', 'Practice sets', 'Resources'];
              return (
                <div style={{ display: 'flex', gap: 2, padding: 4, background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: 14, marginBottom: 24, width: 'fit-content' }}>
                  {tabs.map((t) => (
                    <button key={t} onClick={() => setActive(t)} style={{ padding: '9px 18px', borderRadius: 10, border: 'none', background: t === active ? 'var(--ink)' : 'transparent', color: t === active ? 'var(--paper)' : 'var(--ink-2)', fontWeight: 600, fontSize: 14, cursor: 'pointer', transition: 'background .15s,color .15s' }}>
                      {t}
                    </button>
                  ))}
                </div>
              );
            };

            // ── Lesson Row ─────────────────────────────────────────────────────────────
            const LessonRow = ({ item, chapterStatus }) => {
              const base = SC.ctx || '';
              const meta = TYPE_META[item.type] || TYPE_META.read;
              const locked = item.status === 'locked' || chapterStatus === 'locked';
              const done = item.status === 'done';
              const active = item.status === 'active';
              const iconBtn = { width: 36, height: 36, borderRadius: 10, border: '1px solid var(--line)', background: 'var(--paper)', color: 'var(--ink-2)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' };
              return (
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 16px', borderRadius: 12, background: active ? 'var(--paper)' : 'transparent', border: active ? '1px solid var(--green)' : '1px solid transparent', opacity: locked ? 0.5 : 1, transition: 'background .15s' }}>
                  <div style={{ width: 32, height: 32, borderRadius: 10, background: done ? 'var(--green)' : active ? 'var(--blue-soft)' : 'var(--bg-2)', border: active ? '1.5px solid var(--blue)' : 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: done ? 'white' : active ? 'var(--blue-deep)' : 'var(--ink-3)' }}>
                    {done ? <Icon.Check /> : locked ? <Icon.Lock /> : active ? <Icon.Play style={{ width: 10, height: 10 }} /> : <span className="mono" style={{ fontSize: 10, fontWeight: 700 }}>{item.id}</span>}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ fontSize: 14, fontWeight: active ? 700 : 600, color: active ? 'var(--ink)' : done ? 'var(--ink-2)' : 'var(--ink)' }}>{item.title}</span>
                      {active && <span style={{ padding: '2px 8px', borderRadius: 999, background: 'var(--blue-soft)', color: 'var(--blue-deep)', fontSize: 10, fontWeight: 700 }}>CURRENT</span>}
                    </div>
                    <div style={{ display: 'flex', gap: 12, marginTop: 3, fontSize: 12, color: 'var(--ink-3)' }}>
                      <span style={{ padding: '2px 7px', borderRadius: 5, background: meta.color, color: meta.fg, fontSize: 11, fontWeight: 700 }}>{meta.label}</span>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Icon.Clock /> {item.dur}</span>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: 'var(--amber-deep)' }}><Icon.Bolt /> +{item.xp} XP</span>
                    </div>
                  </div>
                  {!locked && (
                    <a href={base + '/quiz'} style={iconBtn}>
                      <Icon.Play style={{ width: 10, height: 10 }} />
                    </a>
                  )}
                </div>
              );
            };

            // ── Chapter Block ──────────────────────────────────────────────────────────
            const ChapterBlock = ({ chapter }) => {
              const [open, setOpen] = React.useState(chapter.status !== 'locked');
              const pct = Math.round((chapter.done / chapter.lessons) * 100);
              const statusColor = chapter.status === 'complete' ? 'var(--green)' : chapter.status === 'in-progress' ? 'var(--blue)' : 'var(--ink-3)';
              return (
                <div style={{ border: '1px solid var(--line)', borderRadius: 18, overflow: 'hidden', marginBottom: 14, background: 'var(--paper)' }}>
                  <button onClick={() => setOpen(!open)} style={{ width: '100%', padding: '18px 20px', display: 'flex', alignItems: 'center', gap: 14, background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
                    <div style={{ width: 42, height: 42, borderRadius: 12, background: chapter.status === 'locked' ? 'var(--bg-2)' : chapter.status === 'complete' ? 'var(--green-soft)' : 'var(--blue-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: statusColor, flexShrink: 0 }}>
                      {chapter.status === 'locked' ? <Icon.Lock /> : chapter.status === 'complete' ? <Icon.Check /> : <span className="mono" style={{ fontWeight: 800, fontSize: 13 }}>{chapter.id}</span>}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <span style={{ fontSize: 16, fontWeight: 700 }}>Chapter {chapter.id}: {chapter.title}</span>
                        {chapter.status === 'complete' && <span style={{ padding: '2px 8px', borderRadius: 999, background: 'var(--green-soft)', color: 'var(--green-deep)', fontSize: 10, fontWeight: 700 }}>COMPLETE</span>}
                        {chapter.status === 'in-progress' && <span style={{ padding: '2px 8px', borderRadius: 999, background: 'var(--blue-soft)', color: 'var(--blue-deep)', fontSize: 10, fontWeight: 700 }}>IN PROGRESS</span>}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 4 }}>
                        <span style={{ fontSize: 12, color: 'var(--ink-3)' }}>{chapter.done}/{chapter.lessons} lessons</span>
                        {chapter.status !== 'locked' && (
                          <div style={{ flex: 1, maxWidth: 160, height: 4, borderRadius: 999, background: 'var(--bg-2)', overflow: 'hidden' }}>
                            <div style={{ width: pct + '%', height: '100%', background: chapter.status === 'complete' ? 'var(--green)' : 'var(--blue)', borderRadius: 999 }} />
                          </div>
                        )}
                      </div>
                    </div>
                    <span style={{ color: 'var(--ink-3)', fontSize: 18, transform: open ? 'rotate(90deg)' : 'none', transition: 'transform .2s' }}>›</span>
                  </button>
                  {open && (
                    <div style={{ borderTop: '1px solid var(--line)', padding: '8px 16px 12px' }}>
                      {chapter.items.map((item) => <LessonRow key={item.id} item={item} chapterStatus={chapter.status} />)}
                    </div>
                  )}
                </div>
              );
            };

            // ── Sidebar ────────────────────────────────────────────────────────────────
            const Sidebar = () => {
              const base = SC.ctx || '';
              return (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div style={{ background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: 20, padding: 20, boxShadow: 'var(--shadow-sm)' }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink-3)', letterSpacing: '0.06em', marginBottom: 12 }}>YOUR PROGRESS</div>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 14 }}>
                      <span style={{ fontSize: 36, fontWeight: 800, letterSpacing: '-0.03em' }}>{COURSE.progress}%</span>
                      <span style={{ fontSize: 13, color: 'var(--ink-3)' }}>complete</span>
                    </div>
                    <div style={{ height: 8, borderRadius: 999, background: 'var(--bg-2)', overflow: 'hidden', marginBottom: 14 }}>
                      <div style={{ width: COURSE.progress + '%', height: '100%', background: 'var(--green)', borderRadius: 999 }} />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
                      {[
                        { label: 'Done', value: '16 lessons' },
                        { label: 'Left', value: '22 lessons' },
                        { label: 'XP earned', value: '790 XP' },
                        { label: 'Est. left', value: '7h 20m' },
                      ].map((s) => (
                        <div key={s.label} style={{ padding: '10px 12px', borderRadius: 10, background: 'var(--bg)' }}>
                          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', color: 'var(--ink-3)' }}>{s.label.toUpperCase()}</div>
                          <div style={{ fontSize: 15, fontWeight: 700, marginTop: 2 }}>{s.value}</div>
                        </div>
                      ))}
                    </div>
                    <a href={base + '/quiz'} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, width: '100%', padding: '14px', borderRadius: 13, background: 'var(--green)', color: 'white', fontWeight: 700, fontSize: 15, boxShadow: '0 2px 0 var(--green-deep)' }}>
                      Continue <Icon.Arrow />
                    </a>
                  </div>

                  <div style={{ background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: 20, padding: 20, boxShadow: 'var(--shadow-sm)' }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink-3)', letterSpacing: '0.06em', marginBottom: 14 }}>THIS WEEK</div>
                    <div style={{ display: 'flex', gap: 3 }}>
                      {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                        <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                          <div style={{ width: '100%', height: 32, borderRadius: 6, background: i < 4 ? 'var(--green)' : i === 4 ? 'var(--amber)' : 'var(--bg-2)' }} />
                          <span className="mono" style={{ fontSize: 9, color: 'var(--ink-3)' }}>{d}</span>
                        </div>
                      ))}
                    </div>
                    <p style={{ margin: '12px 0 0', fontSize: 12, color: 'var(--ink-3)', lineHeight: 1.4 }}>4 days active this week. Keep it up to maintain your streak.</p>
                  </div>

                  <div style={{ background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: 20, padding: 20, boxShadow: 'var(--shadow-sm)' }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink-3)', letterSpacing: '0.06em', marginBottom: 14 }}>NEXT ACHIEVEMENT</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ width: 44, height: 44, borderRadius: 12, background: 'var(--blue-soft)', color: 'var(--blue-deep)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Icon.Trophy /></div>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 700 }}>Calculus Cadet</div>
                        <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 2 }}>Complete all derivative lessons</div>
                      </div>
                    </div>
                    <div style={{ marginTop: 12, height: 5, borderRadius: 999, background: 'var(--bg-2)', overflow: 'hidden' }}>
                      <div style={{ width: '60%', height: '100%', background: 'var(--blue)', borderRadius: 999 }} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontSize: 11, color: 'var(--ink-3)' }}>
                      <span>6 of 10 done</span><span>60%</span>
                    </div>
                  </div>
                </div>
              );
            };

            // ── Footer ─────────────────────────────────────────────────────────────────
            const Footer = () => {
              const base = SC.ctx || '';
              return (
                <div style={{ marginTop: 40, paddingTop: 24, borderTop: '1px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 12, color: 'var(--ink-3)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Logo /><span>Mathify · Course v2.4</span></div>
                  <div style={{ display: 'flex', gap: 18 }}>
                    <a href="#" style={{ color: 'var(--ink-3)' }}>Report an issue</a>
                    <a href="#" style={{ color: 'var(--ink-3)' }}>Help</a>
                    <a href={base + '/library'} style={{ color: 'var(--ink-3)' }}>Back to library</a>
                  </div>
                </div>
              );
            };

            // ── Course App ─────────────────────────────────────────────────────────────
            const CourseApp = () => {
              const [tab, setTab] = React.useState('Curriculum');
              return (
                <div>
                  <Nav />
                  <main style={{ maxWidth: 1280, margin: '0 auto', padding: '28px 28px 80px' }}>
                    <Breadcrumb />
                    <CourseHero />
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 28, alignItems: 'start' }}>
                      <div>
                        <Tabs active={tab} setActive={setTab} />
                        {tab === 'Curriculum' && (
                          <div>
                            {CHAPTERS.map((ch) => <ChapterBlock key={ch.id} chapter={ch} />)}
                          </div>
                        )}
                        {tab !== 'Curriculum' && (
                          <div style={{ padding: '40px 0', textAlign: 'center', color: 'var(--ink-3)' }}>
                            <Icon.Sparkle style={{ margin: '0 auto 12px', display: 'block', width: 24, height: 24 }} />
                            <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 6 }}>{tab} coming soon</div>
                            <div style={{ fontSize: 14 }}>This section is being prepared.</div>
                          </div>
                        )}
                      </div>
                      <Sidebar />
                    </div>
                    <Footer />
                  </main>
                </div>
              );
            };

            createRoot(document.getElementById('root')).render(<CourseApp />);
