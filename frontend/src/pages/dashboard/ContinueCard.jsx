import React from 'react';
import { Icon } from '../../shared/icons.jsx';
import { SC } from '../../shared/context.js';

const UpNextRow = ({ tag, title, meta, color, icon }) => {
  const colors = { amber: { bg: 'var(--amber-soft)', fg: 'var(--amber-deep)' }, blue: { bg: 'var(--blue-soft)', fg: 'var(--blue-deep)' }, plum: { bg: 'var(--plum-soft)', fg: 'var(--plum)' } };
  const c = colors[color];
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 12, borderRadius: 12, background: 'var(--bg)', border: '1px solid var(--line)', cursor: 'pointer' }}>
      <div style={{ width: 38, height: 38, borderRadius: 10, background: c.bg, color: c.fg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{icon}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
          <span className="mono" style={{ fontSize: 10, color: 'var(--ink-3)', fontWeight: 700 }}>{tag}</span>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{title}</div>
        </div>
        <div style={{ fontSize: 11, color: 'var(--ink-3)' }}>{meta}</div>
      </div>
      <Icon.Arrow style={{ color: 'var(--ink-3)' }}/>
    </div>
  );
};

export const ContinueCard = () => (
  <div className="grid grid-cols-1 lg:grid-cols-[1.7fr_1fr] gap-[18px] mt-[28px]">
    <div style={{ position: 'relative', background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: 24, padding: 28, boxShadow: 'var(--shadow-md)', overflow: 'hidden' }}>
      <span className="serif" style={{ position: 'absolute', top: -30, right: -10, fontSize: 220, color: 'var(--green)', opacity: 0.07, fontWeight: 600, pointerEvents: 'none', lineHeight: 1 }}>ƒ′</span>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14, position: 'relative' }}>
        <span style={{ padding: '5px 10px', borderRadius: 999, background: 'var(--blue-soft)', color: 'var(--blue-deep)', fontSize: 11, fontWeight: 700, letterSpacing: '0.04em' }}>PICK UP WHERE YOU LEFT OFF</span>
        <span className="mono" style={{ fontSize: 11, color: 'var(--ink-3)' }}>· paused 18 min ago</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--ink-3)', marginBottom: 10, position: 'relative' }}>
        <span>Level {SC.level || 8} · Calculus</span><span>›</span><span>Derivatives</span><span>›</span>
        <span style={{ color: 'var(--ink)', fontWeight: 600 }}>Lesson 03</span>
      </div>
      <h2 style={{ margin: '0 0 8px', fontSize: 32, fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 1.1, position: 'relative' }}>The chain rule, intuitively</h2>
      <p style={{ margin: 0, fontSize: 15, color: 'var(--ink-2)', lineHeight: 1.55, maxWidth: 520, position: 'relative' }}>
        Functions inside functions — a nested gear system. Six minutes of reading, then four practice problems.
      </p>
      <div style={{ display: 'flex', gap: 18, marginTop: 18, fontSize: 13, color: 'var(--ink-3)', position: 'relative' }}>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><Icon.Clock/> 6 min read</span>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--amber-deep)' }}><Icon.Bolt/> +24 XP</span>
        <span>★★★☆☆ Intermediate</span>
      </div>
      <div style={{ marginTop: 22, padding: '18px 20px', borderRadius: 16, background: 'var(--bg)', border: '1px solid var(--line)', display: 'flex', alignItems: 'center', gap: 18, position: 'relative' }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--ink-3)', fontWeight: 700, letterSpacing: '0.04em', marginBottom: 6 }}>
            <span>STEP 3 OF 7</span><span>43% done</span>
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            {[1,2,3,4,5,6,7].map((n) => (
              <div key={n} style={{ flex: 1, height: 8, borderRadius: 999, background: n < 3 ? 'var(--green)' : n === 3 ? 'var(--blue)' : 'var(--line)' }}/>
            ))}
          </div>
        </div>
        <button style={{ padding: '14px 22px', borderRadius: 12, border: 'none', background: 'var(--green)', color: 'white', fontWeight: 700, fontSize: 15, cursor: 'pointer', boxShadow: '0 2px 0 var(--green-deep), 0 8px 18px -6px rgba(31,138,91,0.5)', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          Continue <Icon.Arrow/>
        </button>
      </div>
    </div>
    <div style={{ background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: 24, padding: 24, boxShadow: 'var(--shadow-sm)', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
        <h3 style={{ margin: 0, fontSize: 15, fontWeight: 700 }}>Up next today</h3>
        <a href="#" style={{ fontSize: 12, fontWeight: 600, color: 'var(--ink-3)' }}>See plan ↗</a>
      </div>
      <div style={{ display: 'grid', gap: 10, flex: 1 }}>
        {[
          { tag: '04', title: 'Practice: chain rule drills',        meta: '8 problems · 12 XP', color: 'amber', icon: <Icon.Target/> },
          { tag: '05', title: 'Video: visualising d/dx of sin(x²)', meta: '3:48 · 10 XP',       color: 'blue',  icon: <Icon.Play/>   },
          { tag: '06', title: 'Quick check: 5-question quiz',        meta: '5 min · 16 XP',     color: 'plum',  icon: <Icon.Sparkle/>},
        ].map((l) => <UpNextRow key={l.tag} {...l}/>)}
      </div>
      <button style={{ marginTop: 14, padding: 12, borderRadius: 12, border: '1px dashed var(--line)', background: 'transparent', color: 'var(--ink-2)', fontWeight: 600, fontSize: 13, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
        <Icon.Plus/> Add a topic to today's plan
      </button>
    </div>
  </div>
);
