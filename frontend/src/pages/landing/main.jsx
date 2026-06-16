import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const PAGE_CTX = window.PAGE_CTX || '';

    // ── Icons ──────────────────────────────────────────────────────────────────
    const Icon = {
      Check:   (p) => <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...p}><path d="M2.5 7.5L5.5 10.5L11.5 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
      Arrow:   (p) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}><path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
      Flame:   (p) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}><path d="M8 2C8 4.5 5.5 5 5.5 8C5.5 10 6.7 11.7 8 11.7C9.3 11.7 10.5 10.2 10.5 8C10.5 6.2 9.7 5.4 9.7 3.5C10.6 4.4 11.4 5.7 11.4 8C11.4 10.7 9.9 13 8 13C6.1 13 4.6 11.2 4.6 8.6C4.6 5.6 8 4.5 8 2Z" fill="currentColor"/></svg>,
      Bolt:    (p) => <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...p}><path d="M8 1L3 8H7L6 13L11 6H7L8 1Z" fill="currentColor"/></svg>,
      Heart:   (p) => <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...p}><path d="M7 12C7 12 1.5 8.5 1.5 5C1.5 3.3 2.8 2 4.5 2C5.5 2 6.5 2.7 7 3.5C7.5 2.7 8.5 2 9.5 2C11.2 2 12.5 3.3 12.5 5C12.5 8.5 7 12 7 12Z" fill="currentColor"/></svg>,
      Star:    (p) => <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...p}><path d="M7 1.5L8.7 5L12.5 5.55L9.75 8.2L10.4 12L7 10.2L3.6 12L4.25 8.2L1.5 5.55L5.3 5Z" fill="currentColor"/></svg>,
      Trophy:  (p) => <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...p}><path d="M4.5 2H9.5V6.5C9.5 8 8.3 9.2 7 9.2C5.7 9.2 4.5 8 4.5 6.5V2Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/><path d="M4.5 3H3V4.5C3 5.4 3.6 6 4.5 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><path d="M9.5 3H11V4.5C11 5.4 10.4 6 9.5 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><path d="M7 9.2V11.5M5.5 12H8.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>,
      Target:  (p) => <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...p}><circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.4"/><circle cx="7" cy="7" r="3" stroke="currentColor" strokeWidth="1.4"/><circle cx="7" cy="7" r="1" fill="currentColor"/></svg>,
      Play:    (p) => <svg width="12" height="12" viewBox="0 0 12 12" fill="none" {...p}><path d="M3.5 2.5V9.5L9.5 6L3.5 2.5Z" fill="currentColor"/></svg>,
      Lock:    (p) => <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...p}><rect x="2.5" y="5.5" width="9" height="6.5" rx="1.5" stroke="currentColor" strokeWidth="1.4"/><path d="M4 5.5V4C4 2.9 4.9 2 6 2H8C9.1 2 10 2.9 10 4V5.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>,
      Book:    (p) => <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...p}><path d="M2.5 3H6C6.4 3 7 3.4 7 4V11.5C7 11 6.4 10.5 6 10.5H2.5V3Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/><path d="M11.5 3H8C7.6 3 7 3.4 7 4V11.5C7 11 7.6 10.5 8 10.5H11.5V3Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/></svg>,
      Menu:    (p) => <svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...p}><path d="M3 5H17M3 10H17M3 15H17" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>,
      Sparkle: (p) => <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...p}><path d="M7 1L8 6L13 7L8 8L7 13L6 8L1 7L6 6Z" fill="currentColor"/></svg>,
      Users:   (p) => <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...p}><circle cx="5" cy="4.5" r="2" stroke="currentColor" strokeWidth="1.4"/><path d="M1.5 11C1.5 8.8 3 7.5 5 7.5C7 7.5 8.5 8.8 8.5 11" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/><circle cx="10" cy="4.5" r="2" stroke="currentColor" strokeWidth="1.4" opacity=".5"/><path d="M10 7.5C11.5 7.5 12.5 8.5 12.5 10.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" opacity=".5"/></svg>,
    };

    // ── Logo ───────────────────────────────────────────────────────────────────
    const Logo = ({ size = 32 }) => (
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
        <rect x="1.5" y="1.5" width="29" height="29" rx="9" fill="var(--green)"/>
        <rect x="1.5" y="1.5" width="29" height="29" rx="9" stroke="var(--green-deep)" strokeWidth="1.5"/>
        <path d="M8 22V10L13 18L18 10V22" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="22" cy="11" r="2" fill="var(--amber)"/>
      </svg>
    );

    // ── Section Header ─────────────────────────────────────────────────────────
    const SectionHeader = ({ eyebrow, title, accent, subtitle, center }) => (
      <div style={{ textAlign: center ? 'center' : 'left', marginBottom: 40 }}>
        <div className="mono" style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', color: 'var(--ink-3)', marginBottom: 10 }}>{eyebrow}</div>
        <h2 style={{ margin: '0 0 12px', fontSize: 'clamp(28px,3.5vw,44px)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.08 }}>
          {title}{accent && <span className="serif" style={{ color: 'var(--green-deep)' }}> {accent}</span>}
        </h2>
        {subtitle && <p style={{ margin: 0, fontSize: 16, color: 'var(--ink-2)', lineHeight: 1.6, maxWidth: center ? 540 : 600, marginLeft: center ? 'auto' : 0, marginRight: center ? 'auto' : 0 }}>{subtitle}</p>}
      </div>
    );

    // ── Nav ────────────────────────────────────────────────────────────────────
    const Nav = () => {
      const [scrolled, setScrolled] = React.useState(false);
      React.useEffect(() => {
        const handler = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handler);
        return () => window.removeEventListener('scroll', handler);
      }, []);
      return (
        <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, background: scrolled ? 'rgba(251,248,241,0.88)' : 'transparent', backdropFilter: scrolled ? 'blur(12px)' : 'none', WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none', borderBottom: scrolled ? '1px solid var(--line)' : '1px solid transparent', transition: 'all .2s' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 28px', height: 64, display: 'flex', alignItems: 'center', gap: 32 }}>
            <a href="#" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Logo size={32}/>
              <span style={{ fontWeight: 800, fontSize: 18, letterSpacing: '-0.015em' }}>Mathify</span>
            </a>
            <nav style={{ display: 'flex', alignItems: 'center', gap: 2, marginLeft: 8 }}>
              {['Courses', 'Skill tree', 'Pricing', 'About'].map((item) => (
                <a key={item} href="#" style={{ padding: '8px 14px', borderRadius: 10, fontSize: 14, fontWeight: 600, color: 'var(--ink-2)', transition: 'color .15s,background .15s' }}
                   onMouseEnter={(e) => e.currentTarget.style.color = 'var(--ink)'}
                   onMouseLeave={(e) => e.currentTarget.style.color = 'var(--ink-2)'}>
                  {item}
                </a>
              ))}
            </nav>
            <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
              <a href={PAGE_CTX + '/login'} style={{ padding: '9px 18px', borderRadius: 10, fontSize: 14, fontWeight: 600, color: 'var(--ink-2)' }}>Sign in</a>
              <a href={PAGE_CTX + '/register'} style={{ padding: '9px 18px', borderRadius: 11, fontSize: 14, fontWeight: 700, background: 'var(--green)', color: 'white', boxShadow: '0 1.5px 0 var(--green-deep)', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                Start free <Icon.Arrow/>
              </a>
            </div>
          </div>
        </header>
      );
    };

    // ── Floating Cards ─────────────────────────────────────────────────────────
    const FloatStreakCard = () => (
      <div style={{ position: 'absolute', left: -20, bottom: '28%', background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: 18, padding: '14px 16px', boxShadow: 'var(--shadow-md)', display: 'flex', alignItems: 'center', gap: 12, zIndex: 10, animation: 'slideUp .7s ease .3s both', minWidth: 190 }}>
        <div style={{ width: 40, height: 40, borderRadius: 12, background: 'var(--amber-soft)', color: 'var(--amber)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon.Flame/></div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: '-0.01em' }}>28-day streak 🔥</div>
          <div style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 2 }}>Keep it going!</div>
        </div>
      </div>
    );

    const FloatXPCard = () => (
      <div style={{ position: 'absolute', right: -24, top: '22%', background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: 18, padding: '14px 16px', boxShadow: 'var(--shadow-md)', display: 'flex', alignItems: 'center', gap: 12, zIndex: 10, animation: 'slideUp .7s ease .5s both', minWidth: 180 }}>
        <div style={{ width: 40, height: 40, borderRadius: 12, background: 'var(--green-soft)', color: 'var(--green)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon.Bolt/></div>
        <div>
          <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: '-0.01em' }}>+240 XP earned</div>
          <div style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 2 }}>Today's session</div>
        </div>
      </div>
    );

    const FloatAchievementCard = () => (
      <div style={{ position: 'absolute', right: -16, bottom: '14%', background: 'var(--ink)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 18, padding: '14px 18px', boxShadow: 'var(--shadow-lg)', display: 'flex', alignItems: 'center', gap: 12, zIndex: 10, animation: 'slideUp .7s ease .7s both', color: 'var(--paper)', minWidth: 210 }}>
        <div style={{ width: 40, height: 40, borderRadius: 12, background: 'var(--amber)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--amber-deep)' }}><Icon.Trophy/></div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '-0.01em' }}>Achievement unlocked!</div>
          <div style={{ fontSize: 11, color: 'rgba(255,253,247,0.6)', marginTop: 2 }}>Calculus Cadet 🎖️</div>
        </div>
      </div>
    );

    // ── Floating Glyphs ────────────────────────────────────────────────────────
    const FloatingGlyphs = () => {
      const glyphs = [
        { sym: '∫', x: 8,  y: 15, size: 60, delay: 0   },
        { sym: 'π', x: 82, y: 8,  size: 44, delay: 1.5 },
        { sym: '√', x: 60, y: 72, size: 48, delay: 3.0 },
        { sym: '∑', x: 20, y: 80, size: 38, delay: 0.8 },
        { sym: 'θ', x: 90, y: 55, size: 40, delay: 2.2 },
        { sym: 'x²',x: 45, y: 92, size: 32, delay: 4.0 },
      ];
      return (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
          {glyphs.map((g, i) => (
            <span key={i} className="serif" style={{ position: 'absolute', left: g.x + '%', top: g.y + '%', fontSize: g.size, color: 'white', opacity: 0.15, fontWeight: 600, animation: 'drift 7s ease-in-out infinite', animationDelay: g.delay + 's' }}>{g.sym}</span>
          ))}
        </div>
      );
    };

    // ── Hero Device ────────────────────────────────────────────────────────────
    const HeroDevice = () => (
      <div style={{ position: 'relative', flex: '0 0 auto', width: 440 }}>
        <FloatStreakCard/>
        <FloatXPCard/>
        <FloatAchievementCard/>
        <div style={{ width: 440, height: 520, borderRadius: 28, overflow: 'hidden', background: 'var(--paper)', border: '1px solid var(--line)', boxShadow: 'var(--shadow-lg)', position: 'relative' }}>
          <div style={{ background: 'var(--ink)', padding: '18px 20px 14px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
              {['#FF5F56','#FFBD2E','#27C93F'].map((c) => <div key={c} style={{ width: 10, height: 10, borderRadius: 999, background: c }}/>)}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Logo size={22}/>
              <span style={{ color: 'var(--paper)', fontWeight: 700, fontSize: 14 }}>Mathify</span>
              <span style={{ marginLeft: 'auto', padding: '3px 10px', borderRadius: 999, background: 'rgba(255,255,255,0.1)', color: 'rgba(255,253,247,0.7)', fontSize: 11, fontWeight: 600 }}>Differential Calculus</span>
            </div>
          </div>
          <div style={{ padding: '20px' }}>
            <div style={{ marginBottom: 14 }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', color: 'var(--ink-3)', marginBottom: 6 }}>LESSON 13 · CHAIN RULE</div>
              <h3 style={{ margin: '0 0 8px', fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em' }}>The chain rule, intuitively</h3>
              <p style={{ margin: 0, fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.5 }}>Functions inside functions — nested gear systems where each rotation multiplies.</p>
            </div>
            <div style={{ background: 'var(--bg-2)', borderRadius: 14, padding: '16px', marginBottom: 14, fontFamily: "'JetBrains Mono', monospace", fontSize: 13 }}>
              <div style={{ color: 'var(--ink-3)', marginBottom: 6, fontSize: 11 }}>// chain rule</div>
              <div><span style={{ color: 'var(--blue-deep)' }}>h</span><span style={{ color: 'var(--ink-3)' }}>'(x) = </span><span style={{ color: 'var(--green-deep)' }}>f'</span><span style={{ color: 'var(--ink-3)' }}>(</span><span style={{ color: 'var(--plum)' }}>g(x)</span><span style={{ color: 'var(--ink-3)' }}>) · </span><span style={{ color: 'var(--amber-deep)' }}>g'</span><span style={{ color: 'var(--ink-3)' }}>(x)</span></div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
              {[
                { text: 'h(x) = f(g(x)) = sin(3x)', correct: false, selected: false },
                { text: "h'(x) = 3·cos(3x)", correct: true, selected: true },
                { text: "h'(x) = cos(3x)", correct: false, selected: false },
              ].map((c, i) => (
                <div key={i} style={{ padding: '10px 14px', borderRadius: 10, border: '1.5px solid ' + (c.selected ? (c.correct ? 'var(--green)' : 'var(--rose)') : 'var(--line)'), background: c.selected ? (c.correct ? 'var(--green-soft)' : 'var(--rose-soft)') : 'var(--bg)', display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 22, height: 22, borderRadius: 6, background: c.selected ? (c.correct ? 'var(--green)' : 'var(--rose)') : 'var(--bg-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {c.selected && <Icon.Check style={{ color: 'white' }}/>}
                  </div>
                  <span className="mono" style={{ fontSize: 12, color: c.selected ? (c.correct ? 'var(--green-deep)' : 'var(--rose)') : 'var(--ink-2)' }}>{c.text}</span>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', gap: 4 }}>
                {Array.from({ length: 6 }).map((_, i) => <div key={i} style={{ width: i < 2 ? 18 : 14, height: 6, borderRadius: 3, background: i < 2 ? 'var(--green)' : i === 2 ? 'var(--amber)' : 'var(--line)' }}/>)}
              </div>
              <button style={{ padding: '10px 18px', borderRadius: 10, border: 'none', background: 'var(--green)', color: 'white', fontWeight: 700, fontSize: 13, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6, boxShadow: '0 2px 0 var(--green-deep)' }}>Next <Icon.Arrow/></button>
            </div>
          </div>
        </div>
      </div>
    );

    // ── Hero ───────────────────────────────────────────────────────────────────
    const Hero = () => (
      <section style={{ position: 'relative', minHeight: '100vh', background: 'radial-gradient(120% 80% at 80% 0%,#2aa06c 0%,var(--green) 42%,var(--green-deep) 100%)', display: 'flex', alignItems: 'center', overflow: 'hidden', paddingTop: 64 }}>
        <FloatingGlyphs/>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 28px', display: 'flex', alignItems: 'center', gap: 60, width: '100%', position: 'relative', zIndex: 2 }}>
          <div style={{ flex: 1, color: 'white', animation: 'slideUp .7s ease .1s both' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px 6px 8px', borderRadius: 999, background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)', fontSize: 12, fontWeight: 700, letterSpacing: '0.04em', marginBottom: 28 }}>
              <span style={{ padding: '3px 9px', borderRadius: 999, background: 'var(--amber)', color: 'var(--amber-deep)', fontSize: 10 }}>NEW</span>
              Real Analysis course now available
            </div>
            <h1 style={{ margin: '0 0 20px', fontSize: 'clamp(38px,5.5vw,72px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.0 }}>
              Math that{' '}
              <span className="serif" style={{ fontWeight: 500 }}>actually</span>
              <br/>clicks.
            </h1>
            <p style={{ margin: '0 0 36px', fontSize: 18, lineHeight: 1.65, opacity: 0.85, maxWidth: 520 }}>
              Structured courses from arithmetic to real analysis, with daily streaks, XP, and a skill tree that shows exactly where you stand.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
              <a href={PAGE_CTX + '/register'} style={{ padding: '16px 28px', borderRadius: 14, background: 'white', color: 'var(--green-deep)', fontWeight: 800, fontSize: 16, display: 'inline-flex', alignItems: 'center', gap: 8, boxShadow: '0 4px 0 rgba(14,90,58,0.3)', transition: 'transform .12s,box-shadow .12s' }}>
                Start for free <Icon.Arrow style={{ color: 'var(--green)' }}/>
              </a>
              <a href={PAGE_CTX + '/login'} style={{ padding: '16px 24px', borderRadius: 14, border: '1.5px solid rgba(255,255,255,0.35)', color: 'white', fontWeight: 700, fontSize: 15 }}>
                Sign in
              </a>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginTop: 30, fontSize: 13, opacity: 0.75 }}>
              {['No credit card', 'First 5 levels free', '12,000+ students'].map((t, i) => (
                <span key={t} style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                  <Icon.Check style={{ opacity: 1 }}/>{t}
                </span>
              ))}
            </div>
          </div>
          <HeroDevice/>
        </div>
      </section>
    );

    // ── Skill Tree ─────────────────────────────────────────────────────────────
    const nodeDescription = {
      'frac':   'Master fractions, ratios, and proportional reasoning.',
      'alg':    'Equations, inequalities, and the language of variables.',
      'geo':    'Angles, proofs, and the geometry of 2D and 3D space.',
      'trig':   'The unit circle, identities, and sinusoidal waves.',
      'prob':   'Counting, chance, and the mathematics of uncertainty.',
      'calc1':  'Limits, derivatives, and what "rate of change" really means.',
      'linalg': 'Vectors, matrices, and transformations you can see.',
      'calc2':  'Integration, series, and the area under curves.',
      'diffq':  'Differential equations and dynamic systems.',
      'numth':  'Primes, modular arithmetic, and number theory proofs.',
      'real':   'Rigorous foundations: sequences, limits, and continuity.',
    };
    const nodeProgress = { 'frac': 100, 'alg': 78, 'geo': 100, 'trig': 0, 'prob': 12, 'calc1': 43, 'linalg': 0, 'calc2': 0, 'diffq': 0, 'numth': 0, 'real': 0 };
    const nodeLessons  = { 'frac': 18, 'alg': 42, 'geo': 28, 'trig': 26, 'prob': 34, 'calc1': 38, 'linalg': 42, 'calc2': 36, 'diffq': 30, 'numth': 30, 'real': 32 };

    const TREE_NODES = [
      { id:'frac',  glyph:'½',   label:'Fractions',         col:3, row:0, color:'green', status:'done'        },
      { id:'alg',   glyph:'x',   label:'Algebra',           col:2, row:1, color:'blue',  status:'in-progress' },
      { id:'geo',   glyph:'△',   label:'Geometry',          col:4, row:1, color:'amber', status:'done'        },
      { id:'trig',  glyph:'sin', label:'Trigonometry',      col:1, row:2, color:'blue',  status:'new'         },
      { id:'prob',  glyph:'ℙ',   label:'Probability',       col:3, row:2, color:'plum',  status:'in-progress' },
      { id:'calc1', glyph:'ƒ′',  label:'Calculus I',        col:2, row:3, color:'green', status:'in-progress' },
      { id:'linalg',glyph:'A⃗', label:'Linear Algebra',    col:4, row:3, color:'blue',  status:'locked'      },
      { id:'calc2', glyph:'∫',   label:'Calculus II',       col:2, row:4, color:'green', status:'locked'      },
      { id:'diffq', glyph:'∂',   label:'Diff. Equations',   col:1, row:5, color:'plum',  status:'locked'      },
      { id:'numth', glyph:'ℤ',   label:'Number Theory',     col:3, row:5, color:'rose',  status:'locked'      },
      { id:'real',  glyph:'ℝ',   label:'Real Analysis',     col:2, row:6, color:'amber', status:'locked'      },
    ];

    const COLOR_MAP_T = {
      green: { bg: 'var(--green-soft)', deep: 'var(--green-deep)', solid: 'var(--green)' },
      blue:  { bg: 'var(--blue-soft)',  deep: 'var(--blue-deep)',  solid: 'var(--blue)'  },
      amber: { bg: 'var(--amber-soft)', deep: 'var(--amber-deep)', solid: 'var(--amber)' },
      plum:  { bg: 'var(--plum-soft)',  deep: 'var(--plum)',       solid: 'var(--plum)'  },
      rose:  { bg: 'var(--rose-soft)',  deep: 'var(--rose)',       solid: 'var(--rose)'  },
    };

    const DotGrid = () => (
      <div className="dot-grid" style={{ position: 'absolute', inset: 0, opacity: 0.5, zIndex: 0 }}/>
    );

    const LegendDot = ({ color, label, outline }) => (
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, fontSize: 12, color: 'var(--ink-3)' }}>
        <span style={{ width: 10, height: 10, borderRadius: 999, background: outline ? 'transparent' : color, border: outline ? '1.5px dashed ' + color : 'none' }}/>
        {label}
      </div>
    );

    const NodeInspector = ({ node }) => {
      if (!node) return null;
      const c = COLOR_MAP_T[node.color];
      const pct = nodeProgress[node.id] || 0;
      const locked = node.status === 'locked';
      return (
        <div style={{ background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: 20, padding: 22, boxShadow: 'var(--shadow-md)', animation: 'fadeIn .2s ease' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <div style={{ width: 52, height: 52, borderRadius: 14, background: c.bg, color: c.deep, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Fraunces, serif', fontStyle: 'italic', fontSize: 26, fontWeight: 600, flexShrink: 0 }}>{node.glyph}</div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 700 }}>{node.label}</div>
              <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 2 }}>{nodeLessons[node.id]} lessons</div>
            </div>
          </div>
          <p style={{ margin: '0 0 14px', fontSize: 13, color: 'var(--ink-2)', lineHeight: 1.5 }}>{nodeDescription[node.id]}</p>
          {!locked && (
            <div style={{ marginBottom: 14 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', color: 'var(--ink-3)', marginBottom: 5 }}>
                <span>PROGRESS</span><span>{pct}%</span>
              </div>
              <div style={{ height: 6, borderRadius: 999, background: 'var(--bg-2)', overflow: 'hidden' }}>
                <div style={{ width: pct + '%', height: '100%', background: c.solid, borderRadius: 999 }}/>
              </div>
            </div>
          )}
          <a href={PAGE_CTX + '/register'} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, width: '100%', padding: '12px', borderRadius: 12, background: locked ? 'var(--bg-2)' : 'var(--green)', color: locked ? 'var(--ink-3)' : 'white', fontWeight: 700, fontSize: 14 }}>
            {locked ? <><Icon.Lock/> Unlock with progress</> : pct === 100 ? <><Icon.Trophy/> Review</> : pct > 0 ? <>Continue <Icon.Arrow/></> : <>Start <Icon.Arrow/></>}
          </a>
        </div>
      );
    };

    const TreeNode = ({ node, selected, onClick }) => {
      const c = COLOR_MAP_T[node.color];
      const locked = node.status === 'locked';
      const done   = node.status === 'done';
      const active = node.status === 'in-progress';
      const pct    = nodeProgress[node.id] || 0;
      const isSelected = selected?.id === node.id;
      return (
        <div onClick={() => onClick(node)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, cursor: 'pointer', minWidth: 100, padding: '8px 4px', borderRadius: 14, background: isSelected ? 'rgba(255,255,255,0.6)' : 'transparent', transition: 'background .15s' }}>
          <div style={{ position: 'relative' }}>
            {active && <div style={{ position: 'absolute', inset: -8, borderRadius: 999, background: c.solid, opacity: 0.1, animation: 'pulse 2.4s ease-in-out infinite' }}/>}
            <div style={{ width: 70, height: 70, borderRadius: '50%', background: locked ? 'var(--bg-2)' : done ? c.solid : 'var(--paper)', border: '2.5px solid ' + (locked ? 'var(--line)' : active ? c.solid : done ? c.deep : c.bg), borderStyle: locked ? 'dashed' : 'solid', display: 'flex', alignItems: 'center', justifyContent: 'center', color: locked ? 'var(--ink-3)' : done ? 'white' : c.deep, fontFamily: 'Fraunces, serif', fontStyle: 'italic', fontSize: 22, fontWeight: 600, boxShadow: active ? '0 0 0 6px ' + c.bg : 'none', transition: 'all .2s', position: 'relative', zIndex: 2 }}>
              {locked ? <Icon.Lock style={{ width: 16, height: 16 }}/> : node.glyph}
            </div>
            {pct > 0 && pct < 100 && (
              <svg style={{ position: 'absolute', inset: -3, zIndex: 3 }} width="76" height="76" viewBox="0 0 76 76">
                <circle cx="38" cy="38" r="36" fill="none" stroke={c.bg} strokeWidth="3"/>
                <circle cx="38" cy="38" r="36" fill="none" stroke={c.solid} strokeWidth="3" strokeLinecap="round" strokeDasharray={2 * Math.PI * 36} strokeDashoffset={2 * Math.PI * 36 * (1 - pct/100)} transform="rotate(-90 38 38)"/>
              </svg>
            )}
          </div>
          <div style={{ fontSize: 12, fontWeight: 700, color: locked ? 'var(--ink-3)' : 'var(--ink)', textAlign: 'center', lineHeight: 1.2 }}>{node.label}</div>
          {active && <span style={{ padding: '2px 7px', borderRadius: 999, background: c.bg, color: c.deep, fontSize: 9, fontWeight: 700, letterSpacing: '0.04em' }}>IN PROGRESS</span>}
        </div>
      );
    };

    const SkillTree = () => {
      const [selected, setSelected] = React.useState(TREE_NODES.find((n) => n.status === 'in-progress' && n.id === 'calc1'));
      const cols = 6;
      const rows = 7;
      const cellW = 120, cellH = 100;
      return (
        <section style={{ padding: '100px 0', background: 'var(--bg)' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 28px' }}>
            <SectionHeader eyebrow="SKILL TREE · 248 NODES" title="See the whole" accent="map." subtitle="Every concept connected. Unlock nodes by completing the prerequisites — no skipping, no gaps." center/>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 32, alignItems: 'start' }}>
              <div style={{ position: 'relative', background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: 24, padding: '32px 24px', overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
                <DotGrid/>
                <div style={{ position: 'relative', zIndex: 2, overflowX: 'auto' }}>
                  <div style={{ position: 'relative', width: cols * cellW, height: rows * cellH, minWidth: 500 }}>
                    <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0, overflow: 'visible' }}>
                      {[
                        ['frac','alg'],['frac','geo'],['alg','trig'],['alg','prob'],['geo','prob'],
                        ['alg','calc1'],['prob','calc1'],['geo','linalg'],['calc1','calc2'],
                        ['calc2','diffq'],['calc2','numth'],['diffq','real'],['numth','real'],
                      ].map(([from, to], i) => {
                        const a = TREE_NODES.find((n) => n.id === from);
                        const b = TREE_NODES.find((n) => n.id === to);
                        if (!a || !b) return null;
                        const x1 = a.col * cellW + cellW/2;
                        const y1 = a.row * cellH + cellH/2 + 35;
                        const x2 = b.col * cellW + cellW/2;
                        const y2 = b.row * cellH + cellH/2 - 35;
                        const both = nodeProgress[from] === 100;
                        return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={both ? 'var(--green)' : 'var(--line)'} strokeWidth={both ? 2 : 1.5} strokeDasharray={both ? 'none' : '5 3'}/>;
                      })}
                    </svg>
                    {TREE_NODES.map((node) => (
                      <div key={node.id} style={{ position: 'absolute', left: node.col * cellW, top: node.row * cellH, width: cellW, height: cellH, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>
                        <TreeNode node={node} selected={selected} onClick={setSelected}/>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ position: 'relative', zIndex: 2, display: 'flex', justifyContent: 'center', gap: 20, marginTop: 16, paddingTop: 16, borderTop: '1px solid var(--line)', flexWrap: 'wrap' }}>
                  <LegendDot color="var(--green)" label="Mastered"/>
                  <LegendDot color="var(--blue)"  label="In progress"/>
                  <LegendDot color="var(--line)"  label="Available" outline/>
                  <LegendDot color="var(--ink-3)" label="Locked" outline/>
                </div>
              </div>
              <div style={{ position: 'sticky', top: 80 }}>
                {selected ? <NodeInspector node={selected}/> : (
                  <div style={{ background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: 20, padding: 22, textAlign: 'center', color: 'var(--ink-3)' }}>
                    <Icon.Target style={{ margin: '0 auto 10px', display: 'block', width: 24, height: 24 }}/>
                    <div style={{ fontSize: 14, fontWeight: 600 }}>Click a node to explore</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      );
    };

    // ── Lesson Anatomy ─────────────────────────────────────────────────────────
    const FeatureCard = ({ icon, title, desc, color }) => {
      const colors = {
        green: { bg: 'var(--green-soft)', fg: 'var(--green-deep)' },
        blue:  { bg: 'var(--blue-soft)',  fg: 'var(--blue-deep)'  },
        amber: { bg: 'var(--amber-soft)', fg: 'var(--amber-deep)' },
        plum:  { bg: 'var(--plum-soft)',  fg: 'var(--plum)'       },
      };
      const c = colors[color];
      return (
        <div style={{ padding: '22px', borderRadius: 20, background: 'var(--paper)', border: '1px solid var(--line)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: c.bg, color: c.fg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>{icon}</div>
          <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>{title}</div>
          <div style={{ fontSize: 13, color: 'var(--ink-3)', lineHeight: 1.5 }}>{desc}</div>
        </div>
      );
    };

    const LessonMock = () => (
      <div style={{ background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: 24, overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
        <div style={{ background: 'var(--ink)', padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 8 }}>
          {['#FF5F56','#FFBD2E','#27C93F'].map((c) => <div key={c} style={{ width: 10, height: 10, borderRadius: 999, background: c }}/>)}
          <span style={{ marginLeft: 8, color: 'rgba(255,253,247,0.6)', fontSize: 12 }}>Lesson 13: Chain Rule</span>
        </div>
        <div style={{ padding: 24 }}>
          <div style={{ marginBottom: 14 }}>
            <div className="mono" style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', color: 'var(--ink-3)', marginBottom: 6 }}>CONCEPT CHECK</div>
            <p style={{ margin: '0 0 16px', fontSize: 15, fontWeight: 600, lineHeight: 1.4 }}>Which correctly applies the chain rule to <span className="mono" style={{ background: 'var(--bg-2)', padding: '2px 7px', borderRadius: 5 }}>y = (3x+1)⁴</span>?</p>
            {[
              { text: "y' = 4(3x+1)³",       correct: false },
              { text: "y' = 12(3x+1)³",       correct: true  },
              { text: "y' = 4·3·(x+1)³",      correct: false },
            ].map((c, i) => (
              <div key={i} style={{ padding: '11px 14px', borderRadius: 10, border: '1.5px solid ' + (c.correct ? 'var(--green)' : 'var(--line)'), background: c.correct ? 'var(--green-soft)' : 'var(--bg)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
                <div style={{ width: 20, height: 20, borderRadius: 6, background: c.correct ? 'var(--green)' : 'var(--bg-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {c.correct && <Icon.Check style={{ color: 'white' }}/>}
                </div>
                <span className="mono" style={{ fontSize: 12, color: c.correct ? 'var(--green-deep)' : 'var(--ink-2)', fontWeight: c.correct ? 700 : 400 }}>{c.text}</span>
              </div>
            ))}
          </div>
          <div style={{ padding: '12px 14px', borderRadius: 10, background: 'var(--green-soft)', border: '1px solid var(--green)', fontSize: 13, color: 'var(--green-deep)', lineHeight: 1.5 }}>
            <strong>Correct!</strong> Outer: 4(3x+1)³, Inner derivative: 3. Result: 12(3x+1)³.
          </div>
        </div>
      </div>
    );

    const LessonAnatomy = () => (
      <section style={{ padding: '100px 0', background: 'var(--paper)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 28px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center' }}>
            <div>
              <SectionHeader eyebrow="HOW LESSONS WORK" title="Built to make things" accent="stick." subtitle="Every lesson follows the same science-backed pattern: read, see, apply. No passive watching."/>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <FeatureCard color="green" icon={<Icon.Book/>}    title="Short readings"     desc="Dense, clear explanations. No 30-minute videos — just the essentials."/>
                <FeatureCard color="blue"  icon={<Icon.Play/>}    title="Visual walkthroughs" desc="Animated diagrams showing the intuition, not just the formula."/>
                <FeatureCard color="amber" icon={<Icon.Target/>}  title="Instant practice"   desc="Problems right after the concept, while it's fresh."/>
                <FeatureCard color="plum"  icon={<Icon.Sparkle/>} title="Adaptive quizzes"   desc="Spaced repetition surfaces what you're about to forget."/>
              </div>
            </div>
            <LessonMock/>
          </div>
        </div>
      </section>
    );

    // ── Gamification ──────────────────────────────────────────────────────────
    const Cell = ({ filled, color }) => (
      <div style={{ width: 28, height: 28, borderRadius: 6, background: filled ? (color || 'var(--green)') : 'var(--bg-2)', transition: 'background .15s' }}/>
    );

    const CellLabel = ({ label }) => (
      <span className="mono" style={{ fontSize: 9, color: 'var(--ink-3)', textAlign: 'center', display: 'block' }}>{label}</span>
    );

    const StreakCard = () => {
      const days = ['M','T','W','T','F','S','S'];
      return (
        <div style={{ background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: 20, padding: 20, boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 10px', borderRadius: 999, background: 'var(--amber-soft)', color: 'var(--amber-deep)', fontSize: 11, fontWeight: 700, marginBottom: 14 }}><Icon.Flame/>STREAK</div>
          <div style={{ fontSize: 36, fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 12 }}>28 <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink-3)' }}>days</span></div>
          <div style={{ display: 'flex', gap: 4 }}>
            {days.map((d, i) => (
              <div key={i} style={{ flex: 1 }}>
                <Cell filled={i < 5} color={i === 4 ? 'var(--amber)' : 'var(--green)'}/>
                <CellLabel label={d}/>
              </div>
            ))}
          </div>
        </div>
      );
    };

    const XPLevelCard = () => (
      <div style={{ background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: 20, padding: 20, boxShadow: 'var(--shadow-sm)' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 10px', borderRadius: 999, background: 'var(--green-soft)', color: 'var(--green-deep)', fontSize: 11, fontWeight: 700, marginBottom: 14 }}><Icon.Bolt/>LEVEL</div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 12 }}>
          <span className="mono" style={{ fontSize: 36, fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--green-deep)' }}>L8</span>
          <span style={{ fontSize: 13, color: 'var(--ink-3)' }}>Calculus track</span>
        </div>
        <div style={{ marginBottom: 6, fontSize: 11, fontWeight: 700, color: 'var(--ink-3)', letterSpacing: '0.04em', display: 'flex', justifyContent: 'space-between' }}>
          <span>XP TO L9</span><span>1,240 / 2,000</span>
        </div>
        <div style={{ height: 8, borderRadius: 999, background: 'var(--bg-2)', overflow: 'hidden' }}>
          <div style={{ width: '62%', height: '100%', background: 'var(--green)', borderRadius: 999 }}/>
        </div>
      </div>
    );

    const HeartsCard = () => (
      <div style={{ background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: 20, padding: 20, boxShadow: 'var(--shadow-sm)' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 10px', borderRadius: 999, background: 'var(--rose-soft)', color: 'var(--rose)', fontSize: 11, fontWeight: 700, marginBottom: 14 }}><Icon.Heart/>HEARTS</div>
        <div style={{ fontSize: 36, fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 12 }}>5 <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink-3)' }}>/ 5</span></div>
        <div style={{ display: 'flex', gap: 6 }}>
          {[1,2,3,4,5].map((i) => <div key={i} style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--rose-soft)', color: 'var(--rose)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon.Heart/></div>)}
        </div>
      </div>
    );

    const QuestsCard = () => (
      <div style={{ background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: 20, padding: 20, boxShadow: 'var(--shadow-sm)', gridColumn: 'span 2' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 10px', borderRadius: 999, background: 'var(--blue-soft)', color: 'var(--blue-deep)', fontSize: 11, fontWeight: 700, marginBottom: 16 }}><Icon.Target/>QUESTS</div>
        {[
          { tag: 'DAILY',  title: "Finish today's plan", progress: 4, total: 7, color: 'green' },
          { tag: 'WEEKLY', title: 'Practice 5 days',     progress: 3, total: 5, color: 'blue'  },
        ].map((q, i) => {
          const pct = Math.round((q.progress / q.total) * 100);
          const c = { green: 'var(--green)', blue: 'var(--blue)' }[q.color];
          return (
            <div key={i} style={{ marginBottom: i === 0 ? 14 : 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 5 }}>
                <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                  <span className="mono" style={{ fontSize: 10, fontWeight: 700, padding: '2px 6px', background: 'var(--bg-2)', borderRadius: 4 }}>{q.tag}</span>
                  <span style={{ fontWeight: 600 }}>{q.title}</span>
                </div>
                <span style={{ color: 'var(--ink-3)' }}>{q.progress}/{q.total}</span>
              </div>
              <div style={{ height: 5, borderRadius: 999, background: 'var(--bg-2)', overflow: 'hidden' }}>
                <div style={{ width: pct + '%', height: '100%', background: c }}/>
              </div>
            </div>
          );
        })}
      </div>
    );

    const AchievementsCard = () => (
      <div style={{ background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: 20, padding: 20, boxShadow: 'var(--shadow-sm)', gridColumn: 'span 2' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 10px', borderRadius: 999, background: 'var(--amber-soft)', color: 'var(--amber-deep)', fontSize: 11, fontWeight: 700, marginBottom: 16 }}><Icon.Trophy/>ACHIEVEMENTS</div>
        <div style={{ display: 'flex', gap: 10 }}>
          {[
            { name: 'Calculus Cadet', color: 'var(--blue-soft)', fg: 'var(--blue-deep)', icon: <Icon.Trophy/> },
            { name: '30-Day Climber', color: 'var(--amber-soft)', fg: 'var(--amber-deep)', icon: <Icon.Flame/> },
            { name: 'Sharp Eye',      color: 'var(--green-soft)', fg: 'var(--green-deep)', icon: <Icon.Target/> },
          ].map((a) => (
            <div key={a.name} style={{ flex: 1, padding: 12, borderRadius: 14, background: 'var(--bg)', border: '1px solid var(--line)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, textAlign: 'center' }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: a.color, color: a.fg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{a.icon}</div>
              <div style={{ fontSize: 11, fontWeight: 700 }}>{a.name}</div>
            </div>
          ))}
        </div>
      </div>
    );

    const LeaderboardCard = () => {
      const rows = [
        { rank: 1, name: 'Ava L.', xp: 2410, color: 'var(--amber)', me: false },
        { rank: 2, name: 'You',    xp: 1840, color: 'var(--green)', me: true  },
        { rank: 3, name: 'Kai O.', xp: 1190, color: 'var(--blue)',  me: false },
      ];
      return (
        <div style={{ background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: 20, padding: 20, boxShadow: 'var(--shadow-sm)', gridColumn: 'span 2' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 10px', borderRadius: 999, background: 'var(--plum-soft)', color: 'var(--plum)', fontSize: 11, fontWeight: 700, marginBottom: 14 }}><Icon.Users/>LEAGUE</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            {rows.map((r) => (
              <div key={r.rank} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderRadius: 10, background: r.me ? 'var(--green-soft)' : 'transparent', border: r.me ? '1px solid var(--green)' : '1px solid transparent' }}>
                <span className="mono" style={{ width: 18, fontSize: 11, fontWeight: 700, color: 'var(--ink-3)' }}>{r.rank}</span>
                <div style={{ width: 28, height: 28, borderRadius: 999, background: r.color, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700 }}>{r.name[0]}</div>
                <span style={{ flex: 1, fontSize: 13, fontWeight: r.me ? 700 : 500 }}>{r.name}</span>
                <span style={{ fontSize: 12, fontWeight: 700 }}>{r.xp.toLocaleString()} XP</span>
              </div>
            ))}
          </div>
        </div>
      );
    };

    const Gamification = () => (
      <section style={{ padding: '100px 0', background: 'var(--bg-2)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 28px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'center' }}>
            <div>
              <SectionHeader eyebrow="GAMIFICATION · BY DESIGN" title="Progress you can" accent="feel." subtitle="Streaks, XP, hearts, quests, achievements, and a real leaderboard. Not decoration — designed to keep you coming back."/>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                {[
                  { icon: <Icon.Flame/>, color: 'amber', title: 'Daily streaks', desc: 'Log in every day to keep your flame alive. Miss a day? Use a streak freeze.' },
                  { icon: <Icon.Bolt/>,  color: 'green', title: 'XP and levels', desc: 'Earn experience for every lesson, quiz, and practice set you complete.' },
                  { icon: <Icon.Heart/>, color: 'rose',  title: 'Hearts system', desc: 'Wrong answers cost a heart. Practice easier content to refill.' },
                  { icon: <Icon.Trophy/>,color: 'amber', title: 'Achievements',  desc: 'Unlock badges for milestones, not just for showing up.' },
                ].map((f) => {
                  const colors = { amber: { bg: 'var(--amber-soft)', fg: 'var(--amber-deep)' }, green: { bg: 'var(--green-soft)', fg: 'var(--green-deep)' }, rose: { bg: 'var(--rose-soft)', fg: 'var(--rose)' } };
                  const c = colors[f.color];
                  return (
                    <div key={f.title} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                      <div style={{ width: 40, height: 40, borderRadius: 11, background: c.bg, color: c.fg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{f.icon}</div>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 2 }}>{f.title}</div>
                        <div style={{ fontSize: 13, color: 'var(--ink-3)', lineHeight: 1.5 }}>{f.desc}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <StreakCard/>
              <XPLevelCard/>
              <HeartsCard/>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 12 }}>
                <QuestsCard/>
              </div>
              <AchievementsCard/>
              <LeaderboardCard/>
            </div>
          </div>
        </div>
      </section>
    );

    // ── Curriculum ─────────────────────────────────────────────────────────────
    const CURRICULUM = [
      { tier: 'Foundation', color: 'green', courses: [
        { title: 'Basic Arithmetic',   glyph: '1+1', lessons: 14, status: 'free'  },
        { title: 'Fractions & Ratios', glyph: '½',   lessons: 18, status: 'free'  },
        { title: 'Algebra Basics',     glyph: 'x',   lessons: 22, status: 'free'  },
      ]},
      { tier: 'Intermediate', color: 'blue', courses: [
        { title: 'Geometry',           glyph: '△',   lessons: 28, status: 'unlock' },
        { title: 'Trigonometry',       glyph: 'sin', lessons: 26, status: 'unlock' },
        { title: 'Probability',        glyph: 'ℙ',   lessons: 34, status: 'unlock' },
      ]},
      { tier: 'Advanced', color: 'plum', courses: [
        { title: 'Calculus I',         glyph: 'ƒ′',  lessons: 38, status: 'unlock' },
        { title: 'Linear Algebra',     glyph: 'A⃗', lessons: 42, status: 'unlock' },
        { title: 'Statistics',         glyph: 'σ',   lessons: 36, status: 'unlock' },
      ]},
      { tier: 'Expert', color: 'rose', courses: [
        { title: 'Calculus II',        glyph: '∫',   lessons: 36, status: 'unlock' },
        { title: 'Number Theory',      glyph: 'ℤ',   lessons: 30, status: 'unlock' },
        { title: 'Real Analysis',      glyph: 'ℝ',   lessons: 32, status: 'unlock' },
      ]},
    ];

    const LevelRow = ({ course, color }) => {
      const c = COLOR_MAP_T[color];
      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 16px', borderRadius: 14, background: 'var(--paper)', border: '1px solid var(--line)', boxShadow: 'var(--shadow-sm)' }}>
          <div style={{ width: 42, height: 42, borderRadius: 12, background: c.bg, color: c.deep, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Fraunces, serif', fontStyle: 'italic', fontSize: 22, fontWeight: 600, flexShrink: 0 }}>{course.glyph}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 700 }}>{course.title}</div>
            <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 2 }}>{course.lessons} lessons</div>
          </div>
          {course.status === 'free' && <span style={{ padding: '3px 10px', borderRadius: 999, background: 'var(--green-soft)', color: 'var(--green-deep)', fontSize: 11, fontWeight: 700 }}>FREE</span>}
          {course.status === 'unlock' && <Icon.Lock style={{ color: 'var(--ink-3)', width: 14, height: 14 }}/>}
          <Icon.Arrow style={{ color: 'var(--ink-3)' }}/>
        </div>
      );
    };

    const Tier = ({ tier }) => {
      const c = COLOR_MAP_T[tier.color];
      return (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <div style={{ width: 10, height: 10, borderRadius: 999, background: c.solid }}/>
            <span className="mono" style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', color: 'var(--ink-3)' }}>{tier.tier.toUpperCase()}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {tier.courses.map((course) => <LevelRow key={course.title} course={course} color={tier.color}/>)}
          </div>
        </div>
      );
    };

    const Curriculum = () => (
      <section style={{ padding: '100px 0', background: 'var(--paper)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 28px' }}>
          <SectionHeader eyebrow="CURRICULUM · 248 COURSES" title="From 1+1 to" accent="real analysis." subtitle="A complete, sequential curriculum. Each course builds on the last — no jumps, no gaps." center/>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }}>
            {CURRICULUM.map((tier) => <Tier key={tier.tier} tier={tier}/>)}
          </div>
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <a href={PAGE_CTX + '/register'} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', borderRadius: 14, background: 'var(--green)', color: 'white', fontWeight: 700, fontSize: 15, boxShadow: '0 2px 0 var(--green-deep)' }}>
              Browse all courses <Icon.Arrow/>
            </a>
          </div>
        </div>
      </section>
    );

    // ── Testimonials ───────────────────────────────────────────────────────────
    const TESTIMONIALS = [
      { name: 'Priya M.',    role: 'Pre-med, Year 2',         avatar: 'P', color: 'var(--plum)',  stars: 5, text: "I failed Calculus twice before Mathify. The visual approach finally made derivatives click. Now I'm tutoring classmates." },
      { name: 'Luca F.',     role: 'CS student, ETH Zürich',  avatar: 'L', color: 'var(--blue)',  stars: 5, text: "The skill tree showed me exactly what I was missing. Fixed my linear algebra gaps in three weeks." },
      { name: 'Anika T.',    role: 'High school, Jakarta',    avatar: 'A', color: 'var(--green)', stars: 5, text: "It feels like a game but I'm actually learning. My exam score jumped from 60 to 94 in one semester." },
      { name: 'Omar S.',     role: 'Self-taught developer',   avatar: 'O', color: 'var(--amber)', stars: 5, text: "I needed discrete math for a job interview. Went from zero to passing in 6 weeks. The daily streaks kept me accountable." },
      { name: 'Ji-ho K.',    role: 'Physics PhD candidate',   avatar: 'J', color: 'var(--rose)',  stars: 5, text: "Even with a physics degree there were gaps. Real Analysis filled them in a rigorous, intuitive way." },
      { name: 'Sasha N.',    role: 'Finance professional',    avatar: 'S', color: 'var(--ink-2)', stars: 5, text: "Needed stats for a data role. Finished the probability course in 4 weeks around work. The XP system made it weirdly addictive." },
    ];

    const Quote = ({ t }) => (
      <div style={{ background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: 22, padding: '24px 22px', boxShadow: 'var(--shadow-sm)', display: 'flex', flexDirection: 'column', gap: 18 }}>
        <div style={{ display: 'flex', gap: 2 }}>
          {Array.from({ length: t.stars }).map((_, i) => <Icon.Star key={i} style={{ color: 'var(--amber)', width: 13, height: 13 }}/>)}
        </div>
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.65, color: 'var(--ink-2)', flex: 1 }}>&ldquo;{t.text}&rdquo;</p>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 999, background: t.color, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 15 }}>{t.avatar}</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700 }}>{t.name}</div>
            <div style={{ fontSize: 11, color: 'var(--ink-3)' }}>{t.role}</div>
          </div>
        </div>
      </div>
    );

    const Testimonials = () => (
      <section style={{ padding: '100px 0', background: 'var(--bg)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 28px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 40, flexWrap: 'wrap', gap: 20 }}>
            <SectionHeader eyebrow="TESTIMONIALS · 4.9 ★ AVERAGE" title="What learners" accent="say."/>
            <div style={{ display: 'flex', gap: 4 }}>
              {Array.from({ length: 5 }).map((_, i) => <Icon.Star key={i} style={{ color: 'var(--amber)', width: 18, height: 18 }}/>)}
              <span style={{ fontSize: 14, fontWeight: 700, marginLeft: 8, color: 'var(--ink-2)' }}>4.9 / 5 from 2,400 reviews</span>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {TESTIMONIALS.map((t) => <Quote key={t.name} t={t}/>)}
          </div>
        </div>
      </section>
    );

    // ── CTA ────────────────────────────────────────────────────────────────────
    const CTA = () => (
      <section style={{ padding: '100px 0', background: 'var(--green-deep)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 28px', textAlign: 'center', position: 'relative' }}>
          <span className="serif" style={{ position: 'absolute', left: '5%', top: -40, fontSize: 180, color: 'white', opacity: 0.06, fontWeight: 600, lineHeight: 1, pointerEvents: 'none' }}>∫</span>
          <span className="serif" style={{ position: 'absolute', right: '8%', bottom: -60, fontSize: 140, color: 'white', opacity: 0.06, fontWeight: 600, lineHeight: 1, pointerEvents: 'none' }}>π</span>
          <div className="mono" style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', color: 'rgba(255,255,255,0.6)', marginBottom: 16 }}>START TODAY · FREE FOREVER (FIRST 5 LEVELS)</div>
          <h2 style={{ margin: '0 0 18px', fontSize: 'clamp(32px,5vw,60px)', fontWeight: 800, letterSpacing: '-0.04em', lineHeight: 1.05, color: 'white' }}>
            Your streak starts{' '}
            <span className="serif" style={{ fontWeight: 500 }}>now</span>.
          </h2>
          <p style={{ margin: '0 auto 40px', fontSize: 18, color: 'rgba(255,255,255,0.75)', lineHeight: 1.65, maxWidth: 520 }}>
            Join 12,000 students building real math skills. No subscription to start — just a commitment to show up.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 14, flexWrap: 'wrap' }}>
            <a href={PAGE_CTX + '/register'} style={{ padding: '18px 36px', borderRadius: 16, background: 'white', color: 'var(--green-deep)', fontWeight: 800, fontSize: 17, display: 'inline-flex', alignItems: 'center', gap: 8, boxShadow: '0 4px 0 rgba(14,90,58,0.4)' }}>
              Create free account <Icon.Arrow style={{ color: 'var(--green)' }}/>
            </a>
            <a href={PAGE_CTX + '/login'} style={{ padding: '18px 28px', borderRadius: 16, border: '2px solid rgba(255,255,255,0.35)', color: 'white', fontWeight: 700, fontSize: 16 }}>
              Sign in
            </a>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 28, marginTop: 28, fontSize: 13, color: 'rgba(255,255,255,0.55)' }}>
            {['No credit card required', '5 levels completely free', 'Cancel anytime'].map((t) => (
              <span key={t} style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><Icon.Check style={{ color: 'rgba(255,255,255,0.7)' }}/>{t}</span>
            ))}
          </div>
        </div>
      </section>
    );

    // ── Footer ─────────────────────────────────────────────────────────────────
    const Footer = () => (
      <footer style={{ background: 'var(--ink)', color: 'var(--paper)', padding: '60px 0 32px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 28px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 40, marginBottom: 48 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <Logo size={32}/>
                <span style={{ fontWeight: 800, fontSize: 18, letterSpacing: '-0.015em' }}>Mathify</span>
              </div>
              <p style={{ margin: '0 0 20px', fontSize: 14, color: 'rgba(255,253,247,0.6)', lineHeight: 1.6, maxWidth: 280 }}>Math learning reimagined. Structured, gamified, and built to make things stick.</p>
              <div style={{ display: 'flex', gap: 10 }}>
                {['Twitter', 'GitHub', 'Discord'].map((s) => (
                  <a key={s} href="#" style={{ padding: '8px 14px', borderRadius: 9, border: '1px solid rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.06)', fontSize: 12, fontWeight: 600, color: 'rgba(255,253,247,0.7)' }}>{s}</a>
                ))}
              </div>
            </div>
            {[
              { heading: 'Product',  links: ['Courses', 'Skill tree', 'Leaderboard', 'Pricing', "What's new"] },
              { heading: 'Company',  links: ['About', 'Blog', 'Careers', 'Press', 'Contact'] },
              { heading: 'Legal',    links: ['Privacy policy', 'Terms of use', 'Cookie policy'] },
            ].map((col) => (
              <div key={col.heading}>
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: 'rgba(255,253,247,0.4)', marginBottom: 16 }}>{col.heading.toUpperCase()}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {col.links.map((l) => <a key={l} href="#" style={{ fontSize: 14, color: 'rgba(255,253,247,0.65)', fontWeight: 500 }}>{l}</a>)}
                </div>
              </div>
            ))}
          </div>
          <div style={{ paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 12, color: 'rgba(255,253,247,0.4)' }}>
            <span>© 2026 Mathify · Built by Hapis Supremacy at Telkom University</span>
            <span>Made with 💚 and a lot of ∂/∂x</span>
          </div>
        </div>
      </footer>
    );

    // ── App ────────────────────────────────────────────────────────────────────
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

    createRoot(document.getElementById('root')).render(<App/>);
