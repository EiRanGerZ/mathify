import React from 'react';
import { SC } from '../../shared/context.js';

export const Greeting = () => (
  <section style={{ position: 'relative', padding: '36px 0 8px' }}>
    <span className="serif" style={{ position: 'absolute', top: 24, right: '8%', fontSize: 64, color: 'var(--amber)', opacity: 0.18, fontWeight: 600, pointerEvents: 'none' }}>∑</span>
    <span className="serif" style={{ position: 'absolute', bottom: 0, right: '24%', fontSize: 44, color: 'var(--blue)', opacity: 0.16, fontWeight: 600, pointerEvents: 'none' }}>π</span>
    <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 32, flexWrap: 'wrap', position: 'relative', zIndex: 2 }}>
      <div style={{ maxWidth: 640 }}>
        <div className="mono" style={{ fontSize: 12, color: 'var(--ink-3)', fontWeight: 600, letterSpacing: '0.06em', marginBottom: 10 }}>
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' }).toUpperCase()} · DAY {SC.streak || 1}
        </div>
        <h1 style={{ margin: 0, fontSize: 'clamp(26px, 5vw, 44px)', fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 1.05 }}>
          Welcome back, {SC.name || 'there'}.{' '}
          <span className="serif" style={{ color: 'var(--green-deep)', fontWeight: 500 }}>The chain rule</span>{' '}
          is waiting.
        </h1>
        <p style={{ margin: '14px 0 0', fontSize: 16, color: 'var(--ink-2)', lineHeight: 1.55, maxWidth: 540 }}>
          You're <b style={{ color: 'var(--ink)' }}>72%</b> through today's goal
          {SC.streak > 0 && <span> and on a <b style={{ color: 'var(--ink)' }}>{SC.streak}-day</b> streak</span>}.
          Three quick lessons and you're done.
        </p>
      </div>
    </div>
  </section>
);
