<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Mathlify — A friendly adventure for mastering mathematics</title>

  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800&family=JetBrains+Mono:wght@400;600;700&family=Fraunces:ital,wght@1,400;1,500;1,600;1,700&display=swap" rel="stylesheet" />

  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      corePlugins: { preflight: false },
      theme: {
        extend: {
          fontFamily: {
            sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
            mono: ['"JetBrains Mono"', 'monospace'],
            serif: ['Fraunces', 'Georgia', 'serif'],
          }
        }
      }
    }
  </script>

  <style>
    :root {
      --green: #1F8A5B;
      --green-deep: #0E5A3A;
      --green-soft: #E8F5EE;
      --blue: #3858E9;
      --blue-deep: #2240C4;
      --blue-soft: #EEF1FD;
      --amber: #E8A23A;
      --amber-deep: #B47A1A;
      --amber-soft: #FDF3E3;
      --plum: #6E4BB5;
      --plum-soft: #F0EBF9;
      --ink: #1A1A2E;
      --ink-2: #4A4A6A;
      --ink-3: #8A8AA0;
      --paper: #FFFDF7;
      --bg: #FBF9F4;
      --bg-2: #F3F0E8;
      --line: #E8E3D8;
      --shadow-sm: 0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.06);
      --shadow-md: 0 4px 12px rgba(0,0,0,0.1), 0 2px 6px rgba(0,0,0,0.06);
      --shadow-lg: 0 20px 48px rgba(0,0,0,0.12), 0 8px 20px rgba(0,0,0,0.08);
    }

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    body {
      font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
      background: var(--bg);
      color: var(--ink);
      -webkit-font-smoothing: antialiased;
      line-height: 1.5;
    }

    .serif { font-family: 'Fraunces', Georgia, serif; font-style: italic; }
    .mono  { font-family: 'JetBrains Mono', monospace; }

    @keyframes drift {
      0%, 100% { transform: translateY(0) rotate(0deg); }
      50%       { transform: translateY(-14px) rotate(2deg); }
    }
    @keyframes floatUp {
      0%, 100% { transform: translateY(0); }
      50%       { transform: translateY(-6px); }
    }
    .float-card { animation: floatUp 4s ease-in-out infinite; }

    a { text-decoration: none; }

    /* Curriculum row hover handled via JS */
  </style>
</head>
<body>
  <div id="root"></div>

  <script crossorigin src="https://unpkg.com/react@18/umd/react.production.min.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.production.min.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>

  <script type="text/babel">
    const { useState, useEffect } = React;

    /* ── Icons ─────────────────────────────────────────────────────── */
    const Icon = {
      Arrow:   (p) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}><path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
      Check:   (p) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}><path d="M3 8.5L6.5 12L13 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
      Lock:    (p) => <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...p}><rect x="2.5" y="6" width="9" height="6.5" rx="1.5" stroke="currentColor" strokeWidth="1.6"/><path d="M4.5 6V4.5C4.5 3.12 5.62 2 7 2C8.38 2 9.5 3.12 9.5 4.5V6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>,
      Flame:   (p) => <svg width="18" height="18" viewBox="0 0 18 18" fill="none" {...p}><path d="M9 2C9 5 6 5.5 6 9C6 11.5 7.5 13.5 9 13.5C10.5 13.5 12 11.5 12 9C12 7 11 6 11 4C12 5 13 6.5 13 9C13 12 11.2 14.5 9 14.5C6.8 14.5 5 12.5 5 9.5C5 6 9 5 9 2Z" fill="currentColor"/></svg>,
      Star:    (p) => <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...p}><path d="M7 1.5L8.7 5L12.5 5.55L9.75 8.2L10.4 12L7 10.2L3.6 12L4.25 8.2L1.5 5.55L5.3 5Z" fill="currentColor"/></svg>,
      Play:    (p) => <svg width="12" height="12" viewBox="0 0 12 12" fill="none" {...p}><path d="M3.5 2.5V9.5L9.5 6L3.5 2.5Z" fill="currentColor"/></svg>,
      Bolt:    (p) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}><path d="M9 1L3 9H8L7 15L13 7H8L9 1Z" fill="currentColor"/></svg>,
      Trophy:  (p) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}><path d="M5 2H11V7C11 9 9.5 10.5 8 10.5C6.5 10.5 5 9 5 7V2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><path d="M5 3.5H3V5C3 6 3.7 7 5 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M11 3.5H13V5C13 6 12.3 7 11 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M8 10.5V13M6 13.5H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
      Heart:   (p) => <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...p}><path d="M7 12C7 12 1.5 8.5 1.5 5C1.5 3.3 2.8 2 4.5 2C5.5 2 6.5 2.7 7 3.5C7.5 2.7 8.5 2 9.5 2C11.2 2 12.5 3.3 12.5 5C12.5 8.5 7 12 7 12Z" fill="currentColor"/></svg>,
      Target:  (p) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}><circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5"/><circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.5"/><circle cx="8" cy="8" r="1" fill="currentColor"/></svg>,
      Compass: (p) => <svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...p}><circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.6"/><path d="M13.5 6.5L11 11L6.5 13.5L9 9L13.5 6.5Z" fill="currentColor"/></svg>,
    };

    /* ── Logo ───────────────────────────────────────────────────────── */
    const Logo = () => (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="1.5" y="1.5" width="29" height="29" rx="9" fill="var(--green)"/>
        <rect x="1.5" y="1.5" width="29" height="29" rx="9" stroke="var(--green-deep)" strokeWidth="1.5"/>
        <path d="M8 22V10L13 18L18 10V22" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="22" cy="11" r="2" fill="var(--amber)"/>
      </svg>
    );

    /* ── Nav ────────────────────────────────────────────────────────── */
    const Nav = () => {
      const [scrolled, setScrolled] = useState(false);
      useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 24);
        window.addEventListener('scroll', fn, { passive: true });
        return () => window.removeEventListener('scroll', fn);
      }, []);

      return (
        <header style={{
          position: 'sticky', top: 0, zIndex: 50,
          padding: scrolled ? '14px 0' : '22px 0',
          transition: 'padding .2s ease',
        }}>
          <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: scrolled ? '8px 14px 8px 12px' : '0',
              background: scrolled ? 'rgba(251,253,247,0.9)' : 'transparent',
              backdropFilter: scrolled ? 'blur(10px)' : 'none',
              border: scrolled ? '1px solid var(--line)' : '1px solid transparent',
              borderRadius: 999, transition: 'all .2s ease',
            }}>
              <Logo />
              <span style={{ fontWeight: 700, fontSize: 19, letterSpacing: '-0.01em' }}>Mathlify</span>
            </div>

            <nav style={{
              display: 'flex', alignItems: 'center', gap: 4, padding: '6px',
              background: 'rgba(255,253,247,0.7)', backdropFilter: 'blur(10px)',
              border: '1px solid var(--line)', borderRadius: 999,
            }}>
              {['Curriculum', 'For learners', 'For schools', 'Pricing'].map(l => (
                <a key={l} href="#" style={{ padding: '8px 14px', borderRadius: 999, fontSize: 14, fontWeight: 500, color: 'var(--ink-2)' }}>{l}</a>
              ))}
            </nav>

            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <a href="#" style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>Sign in</a>
              <a href="#" style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '10px 16px', borderRadius: 999,
                background: 'var(--ink)', color: 'var(--paper)',
                fontSize: 14, fontWeight: 600, boxShadow: 'var(--shadow-sm)',
              }}>Start free<Icon.Arrow /></a>
            </div>
          </div>
        </header>
      );
    };

    /* ── Hero ───────────────────────────────────────────────────────── */
    const FloatingGlyphs = () => {
      const glyphs = [
        { c: '∫',    x: '6%',  y: '18%', size: 64, color: 'var(--green)',      op: 0.18, delay: 0   },
        { c: 'π',    x: '14%', y: '72%', size: 52, color: 'var(--blue)',       op: 0.18, delay: 1.2 },
        { c: '√',    x: '90%', y: '22%', size: 56, color: 'var(--amber)',      op: 0.22, delay: 0.6 },
        { c: '∑',    x: '86%', y: '78%', size: 68, color: 'var(--plum)',       op: 0.16, delay: 1.8 },
        { c: 'θ',    x: '52%', y: '8%',  size: 38, color: 'var(--ink-3)',      op: 0.25, delay: 2.4 },
        { c: 'ƒ(x)', x: '4%',  y: '50%', size: 28, color: 'var(--green-deep)', op: 0.22, delay: 0.9 },
        { c: 'x²',   x: '92%', y: '50%', size: 32, color: 'var(--blue-deep)',  op: 0.22, delay: 1.5 },
      ];
      return (
        <>
          {glyphs.map((g, i) => (
            <div key={i} className="serif" style={{
              position: 'absolute', left: g.x, top: g.y,
              fontSize: g.size, color: g.color, opacity: g.op,
              fontWeight: 600,
              animation: `drift 6s ease-in-out ${g.delay}s infinite`,
              pointerEvents: 'none', userSelect: 'none',
            }}>{g.c}</div>
          ))}
        </>
      );
    };

    const AvatarStack = () => {
      const colors  = ['var(--green)', 'var(--blue)', 'var(--amber)', 'var(--plum)'];
      const letters = ['M', 'A', 'K', 'J'];
      return (
        <div style={{ display: 'inline-flex' }}>
          {colors.map((c, i) => (
            <div key={i} style={{
              width: 26, height: 26, borderRadius: 999,
              background: c, color: 'white',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 11, fontWeight: 700,
              border: '2px solid var(--bg)',
              marginLeft: i === 0 ? 0 : -8,
            }}>{letters[i]}</div>
          ))}
        </div>
      );
    };

    const Stars = () => (
      <div style={{ display: 'inline-flex', gap: 2, color: 'var(--amber)' }}>
        {[0,1,2,3,4].map(i => <Icon.Star key={i} />)}
      </div>
    );

    const FloatStreakCard = () => (
      <div className="float-card" style={{
        position: 'absolute', left: -8, top: 60, zIndex: 3,
        padding: '12px 16px', borderRadius: 16,
        background: 'var(--paper)', border: '1px solid var(--line)',
        boxShadow: 'var(--shadow-md)',
        display: 'flex', alignItems: 'center', gap: 12,
        transform: 'rotate(-3deg)',
        animationDelay: '0.3s',
      }}>
        <div style={{ width: 40, height: 40, borderRadius: 12, background: 'linear-gradient(135deg,#FF9645,#E8A23A)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
          <Icon.Flame />
        </div>
        <div>
          <div style={{ fontSize: 20, fontWeight: 800, lineHeight: 1, color: 'var(--ink)' }}>47</div>
          <div style={{ fontSize: 11, color: 'var(--ink-3)', fontWeight: 500 }}>day streak</div>
        </div>
      </div>
    );

    const FloatXPCard = () => (
      <div className="float-card" style={{
        position: 'absolute', right: -16, top: 180, zIndex: 3,
        padding: '14px 16px', borderRadius: 16,
        background: 'var(--paper)', border: '1px solid var(--line)',
        boxShadow: 'var(--shadow-md)',
        transform: 'rotate(3deg)', width: 200,
        animationDelay: '1s',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-3)', letterSpacing: '0.04em' }}>WEEKLY XP</span>
          <span style={{ fontSize: 11, fontWeight: 600, color: 'var(--green-deep)' }}>+12%</span>
        </div>
        <svg width="100%" height="46" viewBox="0 0 168 46">
          <path d="M0 36 L24 32 L48 30 L72 22 L96 25 L120 14 L144 10 L168 6" fill="none" stroke="var(--green)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M0 36 L24 32 L48 30 L72 22 L96 25 L120 14 L144 10 L168 6 L168 46 L0 46 Z" fill="var(--green)" opacity="0.12"/>
          <circle cx="168" cy="6" r="3.5" fill="var(--green)"/>
          <circle cx="168" cy="6" r="6"   fill="var(--green)" opacity="0.25"/>
        </svg>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginTop: 6 }}>
          <span style={{ fontSize: 20, fontWeight: 800, color: 'var(--ink)' }}>1,284</span>
          <span style={{ fontSize: 11, color: 'var(--ink-3)' }}>XP this week</span>
        </div>
      </div>
    );

    const FloatAchievementCard = () => (
      <div className="float-card" style={{
        position: 'absolute', right: 20, bottom: -28, zIndex: 3,
        padding: '12px 16px', borderRadius: 16,
        background: 'var(--ink)', color: 'var(--paper)',
        boxShadow: 'var(--shadow-lg)',
        display: 'flex', alignItems: 'center', gap: 12,
        transform: 'rotate(-2deg)',
        animationDelay: '1.7s',
      }}>
        <div style={{ width: 38, height: 38, borderRadius: 12, background: 'var(--amber)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--amber-deep)' }}>
          <Icon.Trophy />
        </div>
        <div>
          <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', fontWeight: 600, letterSpacing: '0.04em' }}>ACHIEVEMENT UNLOCKED</div>
          <div style={{ fontSize: 14, fontWeight: 700 }}>Algebra Apprentice</div>
        </div>
      </div>
    );

    const HeroDevice = () => (
      <div style={{ position: 'relative' }}>
        <FloatStreakCard />
        <FloatXPCard />
        <FloatAchievementCard />

        <div style={{ background: 'var(--paper)', borderRadius: 28, border: '1px solid var(--line)', boxShadow: 'var(--shadow-lg)', overflow: 'hidden', maxWidth: 940, margin: '0 auto' }}>
          {/* Browser chrome */}
          <div style={{ padding: '12px 18px', borderBottom: '1px solid var(--line)', display: 'flex', alignItems: 'center', gap: 12, background: 'var(--bg-2)' }}>
            <div style={{ display: 'flex', gap: 6 }}>
              {['#E0D9C5','#E0D9C5','#E0D9C5'].map((c,i) => <span key={i} style={{ width: 11, height: 11, borderRadius: 999, background: c, display: 'block' }}/>)}
            </div>
            <div className="mono" style={{ flex: 1, textAlign: 'center', fontSize: 12, color: 'var(--ink-3)' }}>mathlify.com/learn/calculus/derivatives</div>
            <div style={{ width: 60 }}/>
          </div>

          {/* Inner app */}
          <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', minHeight: 480 }}>
            {/* Sidebar */}
            <div style={{ background: 'var(--bg)', borderRight: '1px solid var(--line)', padding: '18px 12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '0 8px 14px' }}>
                <Logo /><span style={{ fontWeight: 700, fontSize: 15 }}>Mathlify</span>
              </div>
              {[
                { label: 'Dashboard',     icon: '◇' },
                { label: 'Skill tree',    icon: '⌬' },
                { label: "Today's lesson",icon: '▶', active: true },
                { label: 'Practice',      icon: '⊕' },
                { label: 'Video library', icon: '▷' },
                { label: 'Achievements',  icon: '★' },
              ].map(item => (
                <div key={item.label} style={{
                  padding: '9px 10px', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 10,
                  fontSize: 13, fontWeight: 500, marginBottom: 2,
                  background: item.active ? 'var(--green-soft)' : 'transparent',
                  color: item.active ? 'var(--green-deep)' : 'var(--ink-2)',
                }}>
                  <span className="mono" style={{ fontSize: 14, opacity: 0.7 }}>{item.icon}</span>
                  {item.label}
                </div>
              ))}
              <div style={{ marginTop: 18, padding: 12, borderRadius: 12, background: 'var(--paper)', border: '1px solid var(--line)' }}>
                <div style={{ fontSize: 11, color: 'var(--ink-3)', fontWeight: 600, marginBottom: 6, letterSpacing: '0.04em' }}>DAILY GOAL</div>
                <div style={{ height: 6, borderRadius: 999, background: 'var(--bg-2)', overflow: 'hidden', marginBottom: 8 }}>
                  <div style={{ width: '72%', height: '100%', background: 'var(--green)' }}/>
                </div>
                <div style={{ fontSize: 12, color: 'var(--ink-2)' }}><b>36</b> / 50 XP</div>
              </div>
            </div>

            {/* Main pane */}
            <div style={{ padding: '24px 28px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--ink-3)', marginBottom: 16 }}>
                <span>Level 8 · Calculus</span><span>›</span><span>Derivatives</span><span>›</span>
                <span style={{ color: 'var(--ink)', fontWeight: 600 }}>Lesson 03 · The chain rule</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, marginBottom: 18 }}>
                <div>
                  <h3 style={{ margin: 0, fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em' }}>The chain rule, intuitively</h3>
                  <div style={{ display: 'flex', gap: 14, marginTop: 8, fontSize: 12, color: 'var(--ink-3)' }}>
                    <span>⏱ 6 min read</span>
                    <span style={{ color: 'var(--amber-deep)', display: 'inline-flex', alignItems: 'center', gap: 4 }}><Icon.Bolt /> +24 XP</span>
                    <span>★★★☆☆ Intermediate</span>
                  </div>
                </div>
                <div style={{ padding: '6px 10px', borderRadius: 8, fontSize: 12, fontWeight: 600, background: 'var(--blue-soft)', color: 'var(--blue-deep)', flexShrink: 0 }}>3 of 7</div>
              </div>

              <div style={{ padding: '16px 18px', borderRadius: 12, background: 'var(--bg)', border: '1px solid var(--line)', marginBottom: 14 }}>
                <p style={{ margin: '0 0 12px', fontSize: 14, lineHeight: 1.6, color: 'var(--ink-2)' }}>
                  Think of a function inside a function as a <i>nested gear system</i>. When the outer wheel turns once, the inner wheel turns by its own rate — multiplied by whatever's spinning it.
                </p>
                <div className="serif" style={{ padding: '14px 18px', background: 'var(--paper)', border: '1px dashed var(--line)', borderRadius: 8, textAlign: 'center' }}>
                  <span style={{ fontSize: 24, color: 'var(--ink)' }}>
                    <span style={{ color: 'var(--green-deep)' }}>(f∘g)</span>′(x) = <span style={{ color: 'var(--blue-deep)' }}>f′(g(x))</span> · <span style={{ color: 'var(--amber-deep)' }}>g′(x)</span>
                  </span>
                </div>
              </div>

              <div style={{ padding: '14px 16px', borderRadius: 12, background: 'var(--paper)', border: '1px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 4 }}>Quick check</div>
                  <div className="serif" style={{ fontSize: 13, color: 'var(--ink-2)' }}>If h(x) = sin(x²), what is h′(x)?</div>
                </div>
                <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                  {['2x·cos(x²)', 'cos(2x)', '2cos(x²)'].map((opt, i) => (
                    <div key={i} className="mono" style={{
                      padding: '7px 12px', borderRadius: 8, fontSize: 12,
                      background: i === 0 ? 'var(--green-soft)' : 'var(--bg)',
                      border: i === 0 ? '1px solid var(--green)' : '1px solid var(--line)',
                      color: i === 0 ? 'var(--green-deep)' : 'var(--ink-2)',
                      fontWeight: i === 0 ? 600 : 500,
                    }}>{opt}{i === 0 && ' ✓'}</div>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 18 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  {[1,2,3,4,5,6,7].map(n => (
                    <div key={n} style={{ width: 22, height: 6, borderRadius: 999, background: n <= 3 ? 'var(--green)' : 'var(--line)' }}/>
                  ))}
                </div>
                <button style={{ padding: '10px 20px', borderRadius: 10, border: 'none', background: 'var(--green)', color: 'white', fontWeight: 700, fontSize: 13, cursor: 'pointer', boxShadow: '0 2px 0 var(--green-deep)', fontFamily: 'inherit' }}>
                  Continue →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

    const Hero = () => (
      <section style={{ position: 'relative', padding: '40px 0 80px', overflow: 'hidden' }}>
        <FloatingGlyphs />

        <div style={{ maxWidth: 1080, margin: '0 auto', padding: '0 28px', position: 'relative', zIndex: 2, textAlign: 'center' }}>
          {/* Pill badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px 6px 6px', borderRadius: 999, background: 'var(--paper)', border: '1px solid var(--line)', boxShadow: 'var(--shadow-sm)', marginBottom: 28, fontSize: 13 }}>
            <span style={{ padding: '3px 10px', borderRadius: 999, background: 'var(--green-soft)', color: 'var(--green-deep)', fontWeight: 700, fontSize: 11, letterSpacing: '0.04em' }}>NEW</span>
            <span style={{ color: 'var(--ink-2)' }}>Level 8 — Multivariable Calculus just dropped</span>
            <Icon.Arrow style={{ color: 'var(--ink-3)' }}/>
          </div>

          <h1 style={{ fontSize: 'clamp(48px,7vw,88px)', fontWeight: 700, letterSpacing: '-0.035em', lineHeight: 0.98, margin: '0 0 24px', color: 'var(--ink)' }}>
            A friendly adventure for
            <br />
            <span style={{ position: 'relative', display: 'inline-block' }}>
              <span className="serif" style={{ fontWeight: 500, color: 'var(--green-deep)' }}>mastering</span>
              <svg style={{ position: 'absolute', left: 0, bottom: -8, width: '100%', height: 14 }} viewBox="0 0 280 14" preserveAspectRatio="none">
                <path d="M2 9 Q70 2 140 8 T278 6" stroke="var(--amber)" strokeWidth="4" strokeLinecap="round" fill="none"/>
              </svg>
            </span>{' '}
            mathematics.
          </h1>

          <p style={{ fontSize: 19, lineHeight: 1.5, color: 'var(--ink-2)', maxWidth: 620, margin: '0 auto 36px' }}>
            Climb a skill tree from <span className="mono" style={{ color: 'var(--ink)' }}>2+2</span> to real analysis. Bite-sized lessons, interactive practice, and a streak that actually keeps you coming back.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 18 }}>
            <a href="#" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '16px 24px', borderRadius: 14, background: 'var(--green)', color: 'white', fontSize: 16, fontWeight: 700, boxShadow: '0 2px 0 var(--green-deep), 0 12px 24px -8px rgba(31,138,91,0.5)' }}>
              Start learning free <Icon.Arrow />
            </a>
            <a href="#" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '16px 22px', borderRadius: 14, background: 'var(--paper)', color: 'var(--ink)', border: '1px solid var(--line)', fontSize: 16, fontWeight: 600 }}>
              <span style={{ width: 22, height: 22, borderRadius: 999, background: 'var(--ink)', color: 'white', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}><Icon.Play /></span>
              Watch a 90s tour
            </a>
          </div>

          <p style={{ fontSize: 13, color: 'var(--ink-3)' }}>Free forever for the first 5 levels · No credit card · 4 min average lesson</p>

          {/* Trust strip */}
          <div style={{ marginTop: 56, display: 'flex', justifyContent: 'center', gap: 36, flexWrap: 'wrap', fontSize: 13, color: 'var(--ink-3)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Stars /><span><b style={{ color: 'var(--ink)' }}>4.9</b> · 12,400 reviews</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ display: 'inline-flex', width: 24, height: 24, borderRadius: 999, background: 'var(--amber-soft)', color: 'var(--amber-deep)', alignItems: 'center', justifyContent: 'center' }}><Icon.Trophy /></span>
              <span>Used at <b style={{ color: 'var(--ink)' }}>1,200+</b> schools</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <AvatarStack /><span><b style={{ color: 'var(--ink)' }}>284k</b> learners climbing today</span>
            </div>
          </div>
        </div>

        <div style={{ maxWidth: 1180, margin: '64px auto 0', padding: '0 28px', position: 'relative', zIndex: 2 }}>
          <HeroDevice />
        </div>
      </section>
    );

    /* ── Skill Tree ─────────────────────────────────────────────────── */
    const SectionHeader = ({ tag, tagColor, title, subtitle, centered }) => {
      const colors = {
        green: { bg: 'var(--green-soft)', fg: 'var(--green-deep)' },
        blue:  { bg: 'var(--blue-soft)',  fg: 'var(--blue-deep)'  },
        amber: { bg: 'var(--amber-soft)', fg: 'var(--amber-deep)' },
        plum:  { bg: 'var(--plum-soft)',  fg: 'var(--plum)'       },
      };
      const c = colors[tagColor] || colors.green;
      return (
        <div style={{ maxWidth: 720, margin: centered ? '0 auto' : '0', textAlign: centered ? 'center' : 'left' }}>
          <span style={{ display: 'inline-block', padding: '5px 12px', borderRadius: 999, background: c.bg, color: c.fg, fontSize: 12, fontWeight: 700, letterSpacing: '0.04em', marginBottom: 16 }}>{tag.toUpperCase()}</span>
          <h2 style={{ margin: '0 0 14px', fontSize: 'clamp(34px,4.5vw,52px)', fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 1.05 }}>{title}</h2>
          <p style={{ margin: 0, fontSize: 18, color: 'var(--ink-2)', lineHeight: 1.55 }}>{subtitle}</p>
        </div>
      );
    };

    const nodes = [
      { id: 'num',   x: 360, y: 50,  label: 'Numbers',            lvl: 'L1', status: 'done',   icon: '⊙'   },
      { id: 'arith', x: 220, y: 130, label: 'Arithmetic',         lvl: 'L1', status: 'done',   icon: '+−'  },
      { id: 'frac',  x: 500, y: 130, label: 'Fractions',          lvl: 'L1', status: 'done',   icon: '½'   },
      { id: 'pre',   x: 140, y: 230, label: 'Pre-Algebra',        lvl: 'L2', status: 'done',   icon: 'n'   },
      { id: 'ratio', x: 360, y: 230, label: 'Ratios',             lvl: 'L2', status: 'done',   icon: '÷'   },
      { id: 'pct',   x: 580, y: 230, label: 'Percentages',        lvl: 'L1', status: 'done',   icon: '%'   },
      { id: 'alg',   x: 220, y: 330, label: 'Basic Algebra',      lvl: 'L3', status: 'active', icon: 'x'   },
      { id: 'geo',   x: 500, y: 330, label: 'Geometry',           lvl: 'L4', status: 'active', icon: '△'   },
      { id: 'trig',  x: 140, y: 430, label: 'Trigonometry',       lvl: 'L5', status: 'locked', icon: 'θ'   },
      { id: 'int',   x: 360, y: 430, label: 'Intermediate Algebra',lvl:'L6', status: 'locked', icon: 'x²'  },
      { id: 'pre2',  x: 580, y: 430, label: 'Pre-Calculus',       lvl: 'L7', status: 'locked', icon: 'lim' },
    ];

    const edges = [
      ['num','arith'],['num','frac'],
      ['arith','pre'],['arith','ratio'],['frac','ratio'],['frac','pct'],
      ['pre','alg'],['ratio','alg'],['ratio','geo'],['pct','geo'],
      ['alg','trig'],['alg','int'],['geo','int'],['geo','pre2'],
    ];

    const nodeMap = Object.fromEntries(nodes.map(n => [n.id, n]));

    function nodeDescription(id) {
      return ({
        num:   'Counting, place value, integers. The bedrock everything stands on.',
        arith: 'Addition, subtraction, multiplication, division — drilled until automatic.',
        frac:  'Halves, quarters, and the world of parts. Visual + numerical.',
        pre:   'Negative numbers, factors, multiples, GCD and LCM, basic equations.',
        ratio: 'Proportions, scaling, the language of comparison.',
        pct:   'Reading and reasoning with percentages in real contexts.',
        alg:   'Variables, linear equations, inequalities, functions and graphs.',
        geo:   'Angles, triangles, area, volume, Pythagoras — with draggable diagrams.',
        trig:  'Sin, cos, tan, the unit circle, identities, graphs.',
        int:   'Polynomials, exponents, logarithms, quadratics, sequences and series.',
        pre2:  'Limits intuition, complex numbers, advanced functions, vectors.',
      })[id] || '';
    }

    function nodeProgress(status) {
      return ({ done: { pct: 100, label: '12 / 12 lessons' }, active: { pct: 58, label: '7 / 12 lessons' }, locked: { pct: 0, label: 'Not yet started' } })[status];
    }

    function nodeLessons(id) {
      const map = {
        alg:  [{ title:'What is a variable?',             xp:8,  done:true }, { title:'Solving linear equations',        xp:12, done:true }, { title:'Word problems with one unknown', xp:14, done:true }, { title:'Inequalities and number lines', xp:12, done:false }, { title:'Graphing y = mx + b', xp:16, done:false }],
        geo:  [{ title:'Angle relationships',             xp:10, done:true }, { title:'Triangle congruence',             xp:12, done:true }, { title:'Area of polygons',               xp:14, done:false }, { title:'Circles: arcs and sectors',    xp:14, done:false }, { title:'Pythagorean theorem', xp:16, done:false }],
        trig: [{ title:'Sin, cos, tan from triangles',    xp:14, done:false}, { title:'The unit circle',                 xp:16, done:false}, { title:'Identities you actually need',   xp:18, done:false }],
      };
      return map[id] || [{ title:'Foundations', xp:10, done:true }, { title:'Core skills', xp:14, done:true }, { title:'Applications', xp:16, done:true }];
    }

    const TreeNode = ({ node, hovered, onHover }) => {
      const isDone   = node.status === 'done';
      const isActive = node.status === 'active';
      const isLocked = node.status === 'locked';
      const fill = isDone ? 'var(--green)' : isActive ? 'var(--paper)' : 'var(--bg-2)';
      const ring = isDone ? 'var(--green-deep)' : isActive ? 'var(--blue)' : 'var(--line)';
      const textColor = isDone ? 'white' : isActive ? 'var(--blue-deep)' : 'var(--ink-3)';
      return (
        <g style={{ cursor: 'pointer' }} onMouseEnter={() => onHover(node.id)}>
          {isActive && (
            <circle cx={node.x} cy={node.y} r={32} fill="var(--blue)" opacity={hovered ? 0.18 : 0.1}>
              <animate attributeName="r"       values="28;36;28"        dur="2.4s" repeatCount="indefinite"/>
              <animate attributeName="opacity" values="0.18;0.05;0.18"  dur="2.4s" repeatCount="indefinite"/>
            </circle>
          )}
          <circle cx={node.x} cy={node.y} r={26} fill={fill} stroke={ring} strokeWidth={isActive ? 3 : 2} strokeDasharray={isLocked ? '3 3' : 'none'}/>
          {hovered && !isLocked && <circle cx={node.x} cy={node.y} r={30} fill="none" stroke={ring} strokeWidth="1.5" opacity="0.4"/>}
          <text x={node.x} y={node.y+4}  textAnchor="middle" fontSize="13" fontWeight="700" fill={textColor} fontFamily="'JetBrains Mono',monospace">
            {isLocked ? '🔒' : isDone ? '✓' : node.icon}
          </text>
          <text x={node.x} y={node.y+50} textAnchor="middle" fontSize="11" fontWeight="600" fill={isLocked ? 'var(--ink-3)' : 'var(--ink)'} fontFamily="'Plus Jakarta Sans',sans-serif">{node.label}</text>
          <text x={node.x} y={node.y+64} textAnchor="middle" fontSize="9"  fontWeight="500" fill="var(--ink-3)" fontFamily="'JetBrains Mono',monospace">{node.lvl}</text>
        </g>
      );
    };

    const NodeInspector = ({ node }) => {
      const colorMap = {
        done:   { bg: 'var(--green-soft)', deep: 'var(--green-deep)', label: 'Mastered'    },
        active: { bg: 'var(--blue-soft)',  deep: 'var(--blue-deep)',  label: 'In progress' },
        locked: { bg: 'var(--bg-2)',       deep: 'var(--ink-3)',      label: 'Locked'       },
      };
      const c = colorMap[node.status];
      const prog = nodeProgress(node.status);
      const lessons = nodeLessons(node.id);
      return (
        <div style={{ background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: 24, padding: 24, boxShadow: 'var(--shadow-sm)', position: 'sticky', top: 90 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <span style={{ padding: '4px 10px', borderRadius: 999, fontSize: 11, fontWeight: 700, background: c.bg, color: c.deep, letterSpacing: '0.04em' }}>{c.label.toUpperCase()}</span>
            <span className="mono" style={{ fontSize: 11, color: 'var(--ink-3)' }}>{node.lvl}</span>
          </div>

          <h3 style={{ margin: '0 0 6px', fontSize: 24, fontWeight: 700, letterSpacing: '-0.02em' }}>{node.label}</h3>
          <p style={{ margin: '0 0 18px', fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.5 }}>{nodeDescription(node.id)}</p>

          <div style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 6, color: 'var(--ink-3)', fontWeight: 600 }}>
              <span>PROGRESS</span><span>{prog.label}</span>
            </div>
            <div style={{ height: 8, borderRadius: 999, background: 'var(--bg-2)', overflow: 'hidden' }}>
              <div style={{ width: `${prog.pct}%`, height: '100%', background: node.status === 'done' ? 'var(--green)' : 'var(--blue)' }}/>
            </div>
          </div>

          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-3)', letterSpacing: '0.04em', marginBottom: 8 }}>LESSONS</div>
            {lessons.map((l, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', borderTop: i === 0 ? 'none' : '1px solid var(--line)', fontSize: 13 }}>
                <span style={{ width: 18, height: 18, borderRadius: 999, background: l.done ? 'var(--green)' : 'var(--bg-2)', color: l.done ? 'white' : 'var(--ink-3)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, flexShrink: 0 }}>{l.done ? '✓' : i+1}</span>
                <span style={{ flex: 1, color: l.done ? 'var(--ink-3)' : 'var(--ink)', textDecoration: l.done ? 'line-through' : 'none' }}>{l.title}</span>
                <span className="mono" style={{ fontSize: 11, color: 'var(--ink-3)' }}>{l.xp} XP</span>
              </div>
            ))}
          </div>

          <button style={{
            width: '100%', padding: '12px', borderRadius: 12, border: 'none',
            background: node.status === 'locked' ? 'var(--bg-2)' : 'var(--ink)',
            color: node.status === 'locked' ? 'var(--ink-3)' : 'var(--paper)',
            fontWeight: 700, fontSize: 14, cursor: node.status === 'locked' ? 'not-allowed' : 'pointer',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            fontFamily: 'inherit',
          }}>
            {node.status === 'locked' ? <><Icon.Lock /> Complete prerequisites</> : node.status === 'done' ? 'Review lessons' : 'Continue learning'}
            {node.status !== 'locked' && <Icon.Arrow />}
          </button>
        </div>
      );
    };

    const SkillTree = () => {
      const [hover, setHover] = useState('alg');
      const active = nodeMap[hover] || nodeMap['alg'];
      return (
        <section style={{ padding: '120px 0 80px' }}>
          <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 28px' }}>
            <SectionHeader
              tag="The skill tree" tagColor="green"
              title={<>Every concept builds on the last. <span className="serif" style={{ color: 'var(--green-deep)', fontWeight: 500 }}>You can see exactly where you are.</span></>}
              subtitle="One map. Thirteen levels. Hundreds of unlockable nodes from counting to topology — each opened by mastering the one before it."
            />

            <div style={{ marginTop: 56, display: 'grid', gridTemplateColumns: '1fr 360px', gap: 32, alignItems: 'start' }}>
              {/* Tree canvas */}
              <div style={{ background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: 24, padding: '28px 24px', position: 'relative', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
                {/* Dot grid */}
                <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.5 }}>
                  <defs><pattern id="dots" x="0" y="0" width="22" height="22" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1" fill="var(--line)"/></pattern></defs>
                  <rect width="100%" height="100%" fill="url(#dots)"/>
                </svg>

                <div style={{ position: 'relative', zIndex: 2 }}>
                  <svg viewBox="0 0 720 520" style={{ width: '100%', height: 'auto', display: 'block' }}>
                    {edges.map(([a, b], i) => {
                      const na = nodeMap[a], nb = nodeMap[b];
                      const bothDone  = na.status === 'done' && nb.status === 'done';
                      const reaching  = na.status === 'done' && nb.status === 'active';
                      const stroke    = bothDone ? 'var(--green)' : reaching ? 'var(--blue)' : 'var(--line)';
                      const sw        = (bothDone || reaching) ? 2.5 : 1.5;
                      const dash      = (na.status === 'locked' || nb.status === 'locked') ? '4 4' : 'none';
                      return <line key={i} x1={na.x} y1={na.y} x2={nb.x} y2={nb.y} stroke={stroke} strokeWidth={sw} strokeDasharray={dash} opacity={bothDone || reaching ? 1 : 0.7}/>;
                    })}
                    {nodes.map(n => <TreeNode key={n.id} node={n} hovered={hover === n.id} onHover={setHover}/>)}
                  </svg>
                </div>

                <div style={{ position: 'absolute', bottom: 16, left: 24, display: 'flex', gap: 14, fontSize: 11, color: 'var(--ink-3)' }}>
                  {[{ color: 'var(--green)', label: 'Mastered' }, { color: 'var(--blue)', label: 'In progress' }, { color: 'var(--ink-3)', label: 'Locked', outline: true }].map(d => (
                    <div key={d.label} style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                      <span style={{ width: 10, height: 10, borderRadius: 999, background: d.outline ? 'transparent' : d.color, border: d.outline ? `1.5px dashed ${d.color}` : 'none', flexShrink: 0 }}/>
                      {d.label}
                    </div>
                  ))}
                </div>
                <div style={{ position: 'absolute', bottom: 16, right: 24, fontSize: 11, color: 'var(--ink-3)', fontWeight: 500 }}>Hover any node to inspect →</div>
              </div>

              <NodeInspector node={active}/>
            </div>
          </div>
        </section>
      );
    };

    /* ── Lesson Anatomy ─────────────────────────────────────────────── */
    const LessonAnatomy = () => {
      const features = [
        { tag:'READ',     color:'green', title:'Story-first explanations', desc:"Every concept opens with an intuition — a metaphor, a diagram, a question — before any formula. Math should feel like discovery.",                                                                                          icon:'◇' },
        { tag:'WATCH',    color:'blue',  title:'Short, focused videos',    desc:'Two-to-six-minute explainers from real teachers. Chapter markers, captions, playback speed, and a resume-where-you-left-off button that actually works.',                                                                       icon:'▶' },
        { tag:'PRACTICE', color:'amber', title:'Interactive problems',     desc:"Drag fractions on a number line, manipulate triangles, plot a derivative. Multiple choice when it fits, never when it doesn't.",                                                                                                icon:'✦' },
        { tag:'PROVE',    color:'plum',  title:'Spaced review',            desc:'Concepts you learned last week come back as quick checks. The system remembers what you nearly got wrong so you can pin it down.',                                                                                              icon:'↻' },
      ];

      const colorsMap = {
        green: { bg:'var(--green-soft)', fg:'var(--green-deep)', accent:'var(--green)' },
        blue:  { bg:'var(--blue-soft)',  fg:'var(--blue-deep)',  accent:'var(--blue)'  },
        amber: { bg:'var(--amber-soft)', fg:'var(--amber-deep)', accent:'var(--amber)' },
        plum:  { bg:'var(--plum-soft)',  fg:'var(--plum)',       accent:'var(--plum)'  },
      };

      return (
        <section style={{ padding: '100px 0', background: 'var(--bg-2)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
          <div style={{ maxWidth: 1240, margin: '0 auto', padding: '0 28px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 1fr', gap: 56, alignItems: 'start' }}>
              <div style={{ position: 'sticky', top: 90 }}>
                <SectionHeader
                  tag="Inside a lesson" tagColor="blue"
                  title={<>Four ways to learn each idea. <span className="serif" style={{ color:'var(--blue-deep)', fontWeight:500 }}>One smooth flow.</span></>}
                  subtitle="Mathlify mixes reading, video, practice, and review so the same concept lands four different ways. You don't get bored, and you don't forget."
                />
                {/* Video mock */}
                <div style={{ marginTop: 32, padding: 20, borderRadius: 20, background: 'var(--paper)', border: '1px solid var(--line)', boxShadow: 'var(--shadow-md)' }}>
                  <div style={{ aspectRatio:'16/9', borderRadius: 12, background: 'linear-gradient(135deg,#1a2942,#2a3f5f)', position: 'relative', overflow: 'hidden', marginBottom: 14 }}>
                    <svg viewBox="0 0 400 220" style={{ position:'absolute', inset:0, width:'100%', height:'100%', opacity:0.55 }}>
                      <defs><pattern id="vidgrid" width="20" height="20" patternUnits="userSpaceOnUse"><line x1="0" y1="0" x2="20" y2="0" stroke="rgba(255,255,255,0.06)"/><line x1="0" y1="0" x2="0" y2="20" stroke="rgba(255,255,255,0.06)"/></pattern></defs>
                      <rect width="400" height="220" fill="url(#vidgrid)"/>
                      <line x1="0" y1="160" x2="400" y2="160" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
                      <line x1="60" y1="0"   x2="60"  y2="220" stroke="rgba(255,255,255,0.2)" strokeWidth="1"/>
                      <path d="M60 160 Q120 80 200 110 T380 40" fill="none" stroke="#E8A23A" strokeWidth="3"/>
                      <path d="M60 160 Q120 130 200 145 T380 100" fill="none" stroke="#1F8A5B" strokeWidth="3" strokeDasharray="6 4"/>
                    </svg>
                    <div style={{ position:'absolute', top:12, left:14, padding:'4px 10px', borderRadius:6, background:'rgba(0,0,0,0.5)', backdropFilter:'blur(6px)', color:'white', fontSize:11, fontWeight:600 }}>📐 Visualizing derivatives · 4:12</div>
                    <div style={{ position:'absolute', top:'50%', left:'50%', transform:'translate(-50%,-50%)', width:56, height:56, borderRadius:999, background:'rgba(255,255,255,0.95)', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 8px 20px rgba(0,0,0,0.3)' }}>
                      <div style={{ width:0, height:0, borderLeft:'14px solid var(--ink)', borderTop:'9px solid transparent', borderBottom:'9px solid transparent', marginLeft:4 }}/>
                    </div>
                    <div style={{ position:'absolute', bottom:12, left:14, right:14, display:'flex', alignItems:'center', gap:10 }}>
                      <div style={{ flex:1, height:4, borderRadius:999, background:'rgba(255,255,255,0.3)', overflow:'hidden' }}>
                        <div style={{ width:'38%', height:'100%', background:'var(--amber)' }}/>
                      </div>
                      <span className="mono" style={{ fontSize:11, color:'white' }}>1:34 / 4:12</span>
                    </div>
                  </div>
                  <div style={{ display:'flex', gap:6, fontSize:11, color:'var(--ink-3)' }}>
                    <span style={{ flex:1, padding:'6px 8px', borderRadius:6, background:'var(--green-soft)', color:'var(--green-deep)', fontWeight:600 }}>0:00 — Intuition</span>
                    <span style={{ flex:1, padding:'6px 8px', borderRadius:6, background:'var(--blue-soft)',  color:'var(--blue-deep)',  fontWeight:600 }}>1:30 — Formula</span>
                    <span style={{ flex:1, padding:'6px 8px', borderRadius:6, background:'var(--bg)', border:'1px solid var(--line)' }}>2:48 — Example</span>
                    <span style={{ flex:1, padding:'6px 8px', borderRadius:6, background:'var(--bg)', border:'1px solid var(--line)' }}>3:40 — Recap</span>
                  </div>
                </div>
              </div>

              <div style={{ display:'grid', gap:14 }}>
                {features.map((f, i) => {
                  const c = colorsMap[f.color];
                  return (
                    <div key={i} style={{ padding:24, borderRadius:20, background:'var(--paper)', border:'1px solid var(--line)', display:'grid', gridTemplateColumns:'56px 1fr', gap:18, alignItems:'start', boxShadow:'var(--shadow-sm)' }}>
                      <div className="mono" style={{ width:56, height:56, borderRadius:16, background:c.bg, color:c.fg, display:'flex', alignItems:'center', justifyContent:'center', fontSize:22, fontWeight:700 }}>{f.icon}</div>
                      <div>
                        <span style={{ display:'inline-block', padding:'3px 8px', borderRadius:6, background:c.accent, color:'white', fontSize:10, fontWeight:700, letterSpacing:'0.06em', marginBottom:8 }}>{f.tag}</span>
                        <h4 style={{ margin:'0 0 6px', fontSize:19, fontWeight:700, letterSpacing:'-0.015em' }}>{f.title}</h4>
                        <p style={{ margin:0, fontSize:14, color:'var(--ink-2)', lineHeight:1.55 }}>{f.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      );
    };

    /* ── Gamification ───────────────────────────────────────────────── */
    const Cell = ({ span, rows=1, dark, children, style: s }) => (
      <div style={{ gridColumn:`span ${span}`, gridRow:`span ${rows}`, borderRadius:24, padding:28, background:dark?'var(--ink)':'var(--paper)', color:dark?'var(--paper)':'var(--ink)', border:dark?'none':'1px solid var(--line)', boxShadow:'var(--shadow-sm)', display:'flex', flexDirection:'column', position:'relative', overflow:'hidden', ...s }}>{children}</div>
    );

    const CellLabel = ({ children, color }) => (
      <span style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'4px 10px', borderRadius:999, background:color||'var(--bg-2)', color:'var(--ink-2)', fontSize:11, fontWeight:700, letterSpacing:'0.06em', width:'fit-content', marginBottom:14 }}>{children}</span>
    );

    const StreakCard = () => (
      <Cell span={5}>
        <CellLabel color="var(--amber-soft)"><Icon.Flame style={{ color:'var(--amber-deep)' }}/> STREAK</CellLabel>
        <h3 style={{ margin:0, fontSize:28, fontWeight:700, letterSpacing:'-0.02em' }}>47 days of doing math.</h3>
        <p style={{ margin:'8px 0 16px', fontSize:14, color:'var(--ink-2)', lineHeight:1.5 }}>A small flame for each day you finish a lesson. Miss a day and you can spend a Freeze. Miss two and we'll be honest with you.</p>
        <div style={{ flex:1, display:'flex', alignItems:'flex-end', gap:4 }}>
          {Array.from({ length:14 }).map((_,i) => {
            const intensity = i < 3 ? 0.3 : i < 8 ? 0.6 : i < 13 ? 0.9 : 1;
            const h = 28 + intensity * 60;
            const today = i === 13;
            return (
              <div key={i} style={{ flex:1, height:h, borderRadius:6, background:today?'var(--amber)':`oklch(${0.95-intensity*0.35} 0.12 65)`, border:today?'2px solid var(--amber-deep)':'none', display:'flex', alignItems:'flex-end', justifyContent:'center', paddingBottom:4, fontSize:9, color:today?'var(--amber-deep)':'transparent', fontWeight:700 }}>
                {today && '🔥'}
              </div>
            );
          })}
        </div>
        <div style={{ display:'flex', justifyContent:'space-between', marginTop:10, fontSize:11, color:'var(--ink-3)' }}>
          <span>Last 14 days</span>
          <span><b style={{ color:'var(--ink)' }}>2 freezes</b> available</span>
        </div>
      </Cell>
    );

    const XPLevelCard = () => (
      <Cell span={4} dark>
        <CellLabel color="rgba(255,255,255,0.1)"><Icon.Bolt style={{ color:'var(--amber)' }}/> <span style={{ color:'var(--paper)' }}>XP & LEVEL</span></CellLabel>
        <div style={{ display:'flex', alignItems:'baseline', gap:8, marginBottom:6 }}>
          <span style={{ fontSize:52, fontWeight:800, letterSpacing:'-0.04em', lineHeight:1 }}>14</span>
          <span style={{ fontSize:14, color:'rgba(255,255,255,0.6)' }}>Algebra Apprentice</span>
        </div>
        <div style={{ height:10, borderRadius:999, background:'rgba(255,255,255,0.1)', overflow:'hidden', marginBottom:8 }}>
          <div style={{ width:'64%', height:'100%', background:'linear-gradient(90deg,var(--green),#5BD89A)' }}/>
        </div>
        <div className="mono" style={{ fontSize:12, color:'rgba(255,255,255,0.7)' }}>2,840 / 4,500 XP to Level 15</div>
        <div style={{ flex:1 }}/>
        <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginTop:16 }}>
          {['+8 Read','+12 Practice','+20 Quiz','+50 Daily'].map(c => (
            <span key={c} className="mono" style={{ padding:'4px 8px', borderRadius:6, background:'rgba(255,255,255,0.08)', fontSize:11, color:'rgba(255,255,255,0.85)' }}>{c}</span>
          ))}
        </div>
      </Cell>
    );

    const HeartsCard = () => (
      <Cell span={3}>
        <CellLabel color="var(--bg-2)"><Icon.Heart style={{ color:'#E04A4A' }}/> HEARTS</CellLabel>
        <div style={{ display:'flex', gap:6, marginBottom:14 }}>
          {[1,2,3,4,5].map(i => <span key={i} style={{ color: i<=4?'#E04A4A':'var(--bg-2)', fontSize:22 }}><Icon.Heart style={{ width:22, height:22 }}/></span>)}
        </div>
        <h4 style={{ margin:'0 0 6px', fontSize:17, fontWeight:700, letterSpacing:'-0.015em' }}>Slow down, get it right.</h4>
        <p style={{ margin:0, fontSize:13, color:'var(--ink-2)', lineHeight:1.5 }}>Miss too many in a row and you'll need to review before continuing. Not punishment — a nudge.</p>
      </Cell>
    );

    const QuestsCard = () => (
      <Cell span={5}>
        <CellLabel color="var(--blue-soft)"><Icon.Target style={{ color:'var(--blue-deep)' }}/> DAILY QUESTS</CellLabel>
        <h3 style={{ margin:'0 0 16px', fontSize:22, fontWeight:700, letterSpacing:'-0.02em' }}>Three small wins, every day.</h3>
        {[
          { label:'Earn 50 XP today',                          val:36, total:50, reward:'+10 XP', done:false },
          { label:'Finish a lesson without losing a heart',    val:1,  total:1,  reward:'+15 XP', done:true  },
          { label:'Try one challenge problem',                  val:0,  total:1,  reward:'★ Gem',  done:false },
        ].map((q, i) => (
          <div key={i} style={{ display:'flex', alignItems:'center', gap:12, padding:'10px 0', borderTop:i===0?'none':'1px solid var(--line)' }}>
            <span style={{ width:26, height:26, borderRadius:999, background:q.done?'var(--green)':'var(--bg-2)', color:q.done?'white':'var(--ink-3)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:13, fontWeight:700, flexShrink:0 }}>{q.done?'✓':''}</span>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:13, fontWeight:500, color:q.done?'var(--ink-3)':'var(--ink)', textDecoration:q.done?'line-through':'none' }}>{q.label}</div>
              <div style={{ marginTop:4, height:4, borderRadius:999, background:'var(--bg-2)', overflow:'hidden' }}>
                <div style={{ width:`${(q.val/q.total)*100}%`, height:'100%', background:q.done?'var(--green)':'var(--blue)' }}/>
              </div>
            </div>
            <span className="mono" style={{ fontSize:11, color:'var(--amber-deep)', fontWeight:600 }}>{q.reward}</span>
          </div>
        ))}
      </Cell>
    );

    const AchievementsCard = () => {
      const badges = [
        { c:'var(--green)', l:'First Steps',  earned:true  },
        { c:'var(--blue)',  l:'Week Warrior', earned:true  },
        { c:'var(--amber)', l:'Streak 30',    earned:true  },
        { c:'var(--plum)',  l:'Algebraist',   earned:true  },
        { c:'var(--ink-3)', l:'Quiz Ace',     earned:false },
        { c:'var(--ink-3)', l:'???',          earned:false },
      ];
      return (
        <Cell span={4}>
          <CellLabel color="var(--amber-soft)"><Icon.Trophy style={{ color:'var(--amber-deep)' }}/> ACHIEVEMENTS</CellLabel>
          <h3 style={{ margin:'0 0 16px', fontSize:22, fontWeight:700, letterSpacing:'-0.02em' }}>72 to collect.</h3>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:10, flex:1 }}>
            {badges.map((b, i) => (
              <div key={i} style={{ aspectRatio:'1', borderRadius:14, background:b.earned?b.c:'var(--bg-2)', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', color:b.earned?'white':'var(--ink-3)', border:b.earned?'none':'1px dashed var(--line)', opacity:b.earned?1:0.85 }}>
                {b.earned ? <Icon.Star style={{ width:18, height:18 }}/> : <Icon.Lock/>}
                <span style={{ fontSize:9, fontWeight:700, marginTop:4, textAlign:'center', padding:'0 4px' }}>{b.l}</span>
              </div>
            ))}
          </div>
        </Cell>
      );
    };

    const LeaderboardCard = () => {
      const players = [
        { rank:1, name:'Amara K.',  xp:4280, you:false, c:'var(--amber)' },
        { rank:2, name:'Marcus L.', xp:3940, you:false, c:'var(--blue)'  },
        { rank:3, name:'You',       xp:3712, you:true,  c:'var(--green)' },
        { rank:4, name:'Priya R.',  xp:3580, you:false, c:'var(--plum)'  },
      ];
      return (
        <Cell span={5}>
          <CellLabel color="var(--green-soft)"><Icon.Compass style={{ color:'var(--green-deep)' }}/> WEEKLY LEAGUE</CellLabel>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:14 }}>
            <h3 style={{ margin:0, fontSize:22, fontWeight:700, letterSpacing:'-0.02em' }}>Emerald League · Week 3</h3>
            <span className="mono" style={{ fontSize:11, color:'var(--ink-3)', padding:'4px 8px', borderRadius:6, background:'var(--bg)' }}>3d 14h left</span>
          </div>
          {players.map(p => (
            <div key={p.rank} style={{ display:'flex', alignItems:'center', gap:12, padding:'8px 10px', borderRadius:10, background:p.you?'var(--green-soft)':'transparent', border:p.you?'1px solid var(--green)':'1px solid transparent', marginBottom:4 }}>
              <span style={{ width:22, textAlign:'center', fontSize:12, fontWeight:700, color:p.rank<=3?'var(--amber-deep)':'var(--ink-3)' }}>{p.rank}</span>
              <span style={{ width:28, height:28, borderRadius:999, background:p.c, color:'white', display:'inline-flex', alignItems:'center', justifyContent:'center', fontSize:12, fontWeight:700, flexShrink:0 }}>{p.name[0]}</span>
              <span style={{ flex:1, fontSize:13, fontWeight:p.you?700:500 }}>{p.name}</span>
              <span className="mono" style={{ fontSize:13, fontWeight:600 }}>{p.xp.toLocaleString()}</span>
            </div>
          ))}
        </Cell>
      );
    };

    const Gamification = () => (
      <section style={{ padding:'120px 0' }}>
        <div style={{ maxWidth:1240, margin:'0 auto', padding:'0 28px' }}>
          <SectionHeader
            tag="Habit, not homework" tagColor="amber" centered
            title={<>The reward loop that makes math <span className="serif" style={{ color:'var(--amber-deep)', fontWeight:500 }}>actually stick.</span></>}
            subtitle="XP, streaks, hearts and achievements aren't sprinkles — they're a deliberate system that turns 12 minutes a day into compound progress."
          />
          <div style={{ marginTop:64, display:'grid', gridTemplateColumns:'repeat(12,1fr)', gridAutoRows:'minmax(180px,auto)', gap:14 }}>
            <StreakCard/>
            <XPLevelCard/>
            <HeartsCard/>
            <QuestsCard/>
            <AchievementsCard/>
            <LeaderboardCard/>
          </div>
        </div>
      </section>
    );

    /* ── Curriculum ─────────────────────────────────────────────────── */
    const levels = [
      { n:1,  name:'Foundation Math',          topics:'Numbers · Arithmetic · Fractions · Decimals · Percentages · Ratios',                        color:'var(--green)', tier:'Beginner'     },
      { n:2,  name:'Pre-Algebra',              topics:'Negative numbers · Factors · GCD & LCM · Proportions · Patterns · Basic equations',          color:'var(--green)', tier:'Beginner'     },
      { n:3,  name:'Basic Algebra',            topics:'Variables · Linear equations · Inequalities · Functions · Factoring · Graphs',               color:'var(--green)', tier:'Beginner'     },
      { n:4,  name:'Geometry',                 topics:'Angles · Triangles · Circles · Area · Volume · Pythagoras',                                   color:'var(--blue)',  tier:'Intermediate' },
      { n:5,  name:'Trigonometry',             topics:'Sin · Cos · Tan · Unit circle · Identities · Trig graphs',                                   color:'var(--blue)',  tier:'Intermediate' },
      { n:6,  name:'Intermediate Algebra',     topics:'Polynomials · Exponents · Logarithms · Quadratics · Rationals · Sequences',                  color:'var(--blue)',  tier:'Intermediate' },
      { n:7,  name:'Pre-Calculus',             topics:'Limits intro · Complex numbers · Advanced functions · Vectors',                               color:'var(--amber)', tier:'Advanced'     },
      { n:8,  name:'Calculus',                 topics:'Limits · Derivatives · Integrals · Applications · Multivariable',                             color:'var(--amber)', tier:'Advanced',    badge:'NEW' },
      { n:9,  name:'Statistics & Probability', topics:'Mean · Median · Probability · Distributions · Regression · Combinatorics',                   color:'var(--amber)', tier:'Advanced'     },
      { n:10, name:'Discrete Mathematics',     topics:'Logic · Sets · Relations · Graph theory · Combinatorics · Trees',                             color:'var(--plum)',  tier:'University'   },
      { n:11, name:'Linear Algebra',           topics:'Matrices · Vectors · Linear systems · Determinants · Eigenvalues',                           color:'var(--plum)',  tier:'University'   },
      { n:12, name:'Differential Equations',   topics:'ODE · PDE · First-order · Systems of equations',                                             color:'var(--plum)',  tier:'University'   },
      { n:13, name:'Advanced University Math', topics:'Real analysis · Abstract algebra · Group theory · Complex analysis · Topology · Number theory',color:'var(--plum)', tier:'University'   },
    ];

    const Curriculum = () => (
      <section style={{ padding:'120px 0', background:'var(--bg-2)', borderTop:'1px solid var(--line)', borderBottom:'1px solid var(--line)' }}>
        <div style={{ maxWidth:1240, margin:'0 auto', padding:'0 28px' }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', gap:32, flexWrap:'wrap', marginBottom:48 }}>
            <SectionHeader
              tag="The whole map" tagColor="plum"
              title={<>Thirteen levels. <span className="serif" style={{ color:'var(--plum)', fontWeight:500 }}>One continuous path</span> from 2+2 to topology.</>}
              subtitle="Every topic in the standard math curriculum, plus the ones you wish school had taught you. Pick a starting line; the tree handles the rest."
            />
            <div style={{ display:'flex', gap:14, fontSize:13, color:'var(--ink-2)', flexWrap:'wrap' }}>
              {[['var(--green)','Beginner'],['var(--blue)','Intermediate'],['var(--amber)','Advanced'],['var(--plum)','University']].map(([c,l]) => (
                <div key={l} style={{ display:'flex', alignItems:'center', gap:6 }}><span style={{ width:8, height:8, borderRadius:999, background:c }}/>{l}</div>
              ))}
            </div>
          </div>

          <div style={{ background:'var(--paper)', border:'1px solid var(--line)', borderRadius:24, overflow:'hidden' }}>
            {levels.map((l, i) => (
              <div key={l.n}
                style={{ display:'grid', gridTemplateColumns:'88px 1fr 240px 120px 100px', gap:16, alignItems:'center', padding:'20px 24px', borderBottom:i===levels.length-1?'none':'1px solid var(--line)', cursor:'pointer', transition:'background .15s' }}
                onMouseEnter={e => e.currentTarget.style.background='var(--bg)'}
                onMouseLeave={e => e.currentTarget.style.background='transparent'}
              >
                <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                  <span style={{ width:4, height:32, borderRadius:999, background:l.color, flexShrink:0 }}/>
                  <span className="mono" style={{ fontSize:13, fontWeight:700, color:'var(--ink-3)' }}>L{String(l.n).padStart(2,'0')}</span>
                </div>
                <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                  <h4 style={{ margin:0, fontSize:17, fontWeight:700, letterSpacing:'-0.015em' }}>{l.name}</h4>
                  {l.badge && <span style={{ padding:'2px 8px', borderRadius:6, background:'var(--green-soft)', color:'var(--green-deep)', fontSize:10, fontWeight:700, letterSpacing:'0.05em' }}>{l.badge}</span>}
                </div>
                <div style={{ fontSize:13, color:'var(--ink-3)', lineHeight:1.45 }}>{l.topics}</div>
                <div style={{ padding:'4px 10px', borderRadius:6, fontSize:11, fontWeight:600, background:'var(--bg-2)', color:'var(--ink-2)', width:'fit-content' }}>{l.tier}</div>
                <div style={{ textAlign:'right' }}><Icon.Arrow style={{ color:'var(--ink-3)' }}/></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );

    /* ── Testimonials ───────────────────────────────────────────────── */
    const Testimonials = () => {
      const items = [
        { quote:"I dropped out of calc in college. Six months later I'm doing multivariable problems on the train. The skill tree shows me exactly what to study next — no more guessing.", name:'Sara Mendelsohn', role:'Software engineer · NYC',          avatar:'S', color:'var(--green)' },
        { quote:"My students actually beg to do Mathlify in class. The chain rule clicked for half my AP students in a single 6-minute video.",                                           name:'Mr. Olamide',    role:'High school teacher · Lagos',       avatar:'O', color:'var(--blue)'  },
        { quote:"I'm 64. I always told myself I was 'bad at math'. Two months in and I just finished trigonometry. I genuinely look forward to my morning lesson.",                       name:'Henrik Larsen',  role:'Retired electrician · Oslo',        avatar:'H', color:'var(--amber)' },
        { quote:"The spaced review is the secret. Stuff I 'learned' in school finally feels permanent. I can't believe this is free for the first 5 levels.",                             name:'Priya Ranganathan',role:'PhD student · Bangalore',          avatar:'P', color:'var(--plum)'  },
      ];
      return (
        <section style={{ padding:'120px 0' }}>
          <div style={{ maxWidth:1240, margin:'0 auto', padding:'0 28px' }}>
            <SectionHeader
              tag="The proof" tagColor="green" centered
              title={<>Real learners. <span className="serif" style={{ color:'var(--green-deep)', fontWeight:500 }}>Real "ohhh, I get it now."</span></>}
              subtitle="284,000 people logged in today. These are some of them."
            />
            <div style={{ marginTop:56, display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:18 }}>
              {items.map((t, i) => (
                <div key={i} style={{ padding:32, borderRadius:24, background:'var(--paper)', border:'1px solid var(--line)', boxShadow:'var(--shadow-sm)', display:'flex', flexDirection:'column' }}>
                  <p style={{ margin:'0 0 24px', fontSize:18, lineHeight:1.5, color:'var(--ink)', letterSpacing:'-0.005em', flex:1 }}>"{t.quote}"</p>
                  <div style={{ display:'flex', alignItems:'center', gap:12 }}>
                    <span style={{ width:40, height:40, borderRadius:999, background:t.color, color:'white', display:'inline-flex', alignItems:'center', justifyContent:'center', fontWeight:700, fontSize:16, flexShrink:0 }}>{t.avatar}</span>
                    <div>
                      <div style={{ fontSize:14, fontWeight:700 }}>{t.name}</div>
                      <div style={{ fontSize:12, color:'var(--ink-3)' }}>{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop:32, padding:'28px 32px', borderRadius:24, background:'var(--ink)', color:'var(--paper)', display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:24 }}>
              {[{v:'284k',l:'learners climbing today'},{v:'13.4M',l:'lessons completed this month'},{v:'92%',l:'finish their first skill tree node'},{v:'47d',l:'average peak streak'}].map((s,i) => (
                <div key={i} style={{ borderLeft:i===0?'none':'1px solid rgba(255,255,255,0.12)', paddingLeft:i===0?0:24 }}>
                  <div style={{ fontSize:36, fontWeight:800, letterSpacing:'-0.03em', lineHeight:1 }}>{s.v}</div>
                  <div style={{ fontSize:13, color:'rgba(255,255,255,0.6)', marginTop:6 }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      );
    };

    /* ── CTA ────────────────────────────────────────────────────────── */
    const CTA = () => (
      <section style={{ padding:'80px 0 120px' }}>
        <div style={{ maxWidth:1240, margin:'0 auto', padding:'0 28px' }}>
          <div style={{ position:'relative', overflow:'hidden', borderRadius:32, background:'linear-gradient(135deg,#0E5A3A 0%,#1F8A5B 60%,#2BA86E 100%)', color:'white', padding:'72px 64px', boxShadow:'var(--shadow-lg)' }}>
            <svg style={{ position:'absolute', right:-40, top:-40, opacity:0.18 }} width="360" height="360" viewBox="0 0 360 360">
              <circle cx="180" cy="180" r="160" fill="none" stroke="white" strokeWidth="1.5" strokeDasharray="4 6"/>
              <circle cx="180" cy="180" r="110" fill="none" stroke="white" strokeWidth="1.5"/>
              <circle cx="180" cy="180" r="60"  fill="none" stroke="white" strokeWidth="1.5" strokeDasharray="2 4"/>
              <text x="180" y="60"  textAnchor="middle" fontSize="28" fill="white" fontFamily="Fraunces" fontStyle="italic">π</text>
              <text x="320" y="190" textAnchor="middle" fontSize="32" fill="white" fontFamily="Fraunces" fontStyle="italic">∫</text>
              <text x="40"  y="190" textAnchor="middle" fontSize="32" fill="white" fontFamily="Fraunces" fontStyle="italic">√</text>
              <text x="180" y="320" textAnchor="middle" fontSize="28" fill="white" fontFamily="Fraunces" fontStyle="italic">∑</text>
            </svg>

            <div style={{ position:'relative', zIndex:1, maxWidth:640 }}>
              <span style={{ display:'inline-block', padding:'5px 12px', borderRadius:999, background:'rgba(255,255,255,0.16)', color:'white', fontSize:12, fontWeight:700, letterSpacing:'0.04em', marginBottom:20 }}>FREE FOREVER · LEVELS 1–5</span>
              <h2 style={{ margin:'0 0 18px', fontSize:'clamp(40px,5.5vw,68px)', fontWeight:700, letterSpacing:'-0.03em', lineHeight:1, color:'white' }}>
                Ready to start<br/>
                <span className="serif" style={{ fontWeight:500, color:'#FBE4A3' }}>climbing?</span>
              </h2>
              <p style={{ margin:'0 0 32px', fontSize:19, lineHeight:1.5, color:'rgba(255,255,255,0.85)', maxWidth:520 }}>
                Take the 60-second placement and we'll drop a pin on your skill tree. Your first lesson is waiting on the other side.
              </p>
              <div style={{ display:'flex', gap:12, flexWrap:'wrap', alignItems:'center' }}>
                <a href="#" style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'16px 26px', borderRadius:14, background:'white', color:'var(--green-deep)', fontWeight:700, fontSize:16, boxShadow:'0 2px 0 rgba(0,0,0,0.1),0 10px 30px rgba(0,0,0,0.15)' }}>Take the placement <Icon.Arrow/></a>
                <a href="#" style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'16px 22px', borderRadius:14, background:'rgba(255,255,255,0.1)', color:'white', border:'1px solid rgba(255,255,255,0.2)', fontWeight:600, fontSize:16 }}>Browse the curriculum</a>
              </div>
              <div style={{ marginTop:28, display:'flex', gap:28, fontSize:13, color:'rgba(255,255,255,0.7)', flexWrap:'wrap' }}>
                <span style={{ display:'inline-flex', gap:6, alignItems:'center' }}><Icon.Check/> No credit card</span>
                <span style={{ display:'inline-flex', gap:6, alignItems:'center' }}><Icon.Check/> Works on phone, tablet, web</span>
                <span style={{ display:'inline-flex', gap:6, alignItems:'center' }}><Icon.Check/> Cancel anytime on paid plans</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    );

    /* ── Footer ─────────────────────────────────────────────────────── */
    const Footer = () => (
      <footer style={{ background:'var(--ink)', color:'var(--paper)', padding:'64px 0 32px' }}>
        <div style={{ maxWidth:1240, margin:'0 auto', padding:'0 28px' }}>
          <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr 1fr', gap:32, paddingBottom:48, borderBottom:'1px solid rgba(255,255,255,0.12)' }}>
            <div>
              <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:18 }}>
                <Logo/><span style={{ fontWeight:700, fontSize:19 }}>Mathlify</span>
              </div>
              <p style={{ margin:0, fontSize:14, color:'rgba(255,255,255,0.6)', lineHeight:1.55, maxWidth:280 }}>A friendly adventure for mastering mathematics — from counting to topology, one node at a time.</p>
            </div>
            {[
              { title:'Learn',   items:['Skill tree','Curriculum','Video library','Practice','Daily challenge'] },
              { title:'For',     items:['Students','Teachers','Schools','Parents','Self-learners'] },
              { title:'Company', items:['About','Manifesto','Careers','Blog','Press'] },
              { title:'Help',    items:['Support','Status','API','Privacy','Terms'] },
            ].map(col => (
              <div key={col.title}>
                <div style={{ fontSize:12, fontWeight:700, letterSpacing:'0.06em', color:'rgba(255,255,255,0.5)', marginBottom:14 }}>{col.title.toUpperCase()}</div>
                <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                  {col.items.map(item => <a key={item} href="#" style={{ fontSize:14, color:'rgba(255,255,255,0.85)' }}>{item}</a>)}
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop:32, display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:16 }}>
            <div style={{ fontSize:13, color:'rgba(255,255,255,0.5)' }}>© 2026 Mathlify Labs · Made by people who used to be bad at math.</div>
            <div style={{ display:'flex', gap:18, fontSize:13, color:'rgba(255,255,255,0.7)' }}>
              {['EN','ES','FR','PT','中文','हिं'].map(lang => <a key={lang} href="#" style={{ color:'inherit' }}>{lang}</a>)}
            </div>
          </div>
        </div>
      </footer>
    );

    /* ── App ────────────────────────────────────────────────────────── */
    const App = () => (
      <div>
        <Nav/>
        <Hero/>
        <SkillTree/>
        <LessonAnatomy/>
        <Gamification/>
        <Curriculum/>
        <Testimonials/>
        <CTA/>
        <Footer/>
      </div>
    );

    ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
  </script>
</body>
</html>