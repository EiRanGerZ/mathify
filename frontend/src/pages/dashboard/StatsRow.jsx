import React from 'react';
import { Icon } from '../../shared/icons.jsx';
import { StatCardShell, StatLabel } from '../../shared/primitives.jsx';
import { SC } from '../../shared/context.js';

const StreakCard = () => (
  <StatCardShell>
    <StatLabel icon={<Icon.Flame/>} color="var(--amber-soft)" deep="var(--amber-deep)" label="STREAK"/>
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
      <span style={{ fontSize: 40, fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1 }}>{SC.streak || 0}</span>
      <span style={{ fontSize: 13, color: 'var(--ink-3)' }}>days</span>
    </div>
    <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', gap: 3, marginTop: 14 }}>
      {Array.from({ length: 14 }).map((_, i) => {
        const intensity = i < 3 ? 0.3 : i < 8 ? 0.6 : i < 13 ? 0.9 : 1;
        const today = i === 13;
        return <div key={i} style={{ flex: 1, height: 14 + intensity * 30, borderRadius: 4, background: today ? 'var(--amber)' : `oklch(${0.95 - intensity * 0.32} 0.10 65)`, border: today ? '2px solid var(--amber-deep)' : 'none' }}/>;
      })}
    </div>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 11, color: 'var(--ink-3)' }}>
      <span>2 weeks</span><span style={{ fontWeight: 600, color: 'var(--amber-deep)' }}>1 freeze available</span>
    </div>
  </StatCardShell>
);

const XPCard = () => (
  <StatCardShell>
    <StatLabel icon={<Icon.Bolt/>} color="var(--green-soft)" deep="var(--green-deep)" label="WEEKLY XP"/>
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
      <span style={{ fontSize: 40, fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1 }}>{SC.xp > 0 ? SC.xp.toLocaleString() : '0'}</span>
      <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--green-deep)' }}>+12%</span>
    </div>
    <svg viewBox="0 0 168 50" style={{ width: '100%', height: 50, marginTop: 14 }}>
      <path d="M0 40 L24 34 L48 32 L72 24 L96 27 L120 14 L144 10 L168 6" fill="none" stroke="var(--green)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M0 40 L24 34 L48 32 L72 24 L96 27 L120 14 L144 10 L168 6 L168 50 L0 50 Z" fill="var(--green)" opacity="0.12"/>
      <circle cx="168" cy="6" r="3.5" fill="var(--green)"/>
    </svg>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4, fontSize: 11, color: 'var(--ink-3)' }}>
      <span>Mon</span><span>Sun</span>
    </div>
  </StatCardShell>
);

const HeartsCard = () => (
  <StatCardShell>
    <StatLabel icon={<Icon.Heart/>} color="var(--rose-soft)" deep="var(--rose)" label="HEARTS"/>
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
      <span style={{ fontSize: 40, fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1 }}>5</span>
      <span style={{ fontSize: 13, color: 'var(--ink-3)' }}>/ 5 full</span>
    </div>
    <div style={{ display: 'flex', gap: 6, marginTop: 16 }}>
      {[1,2,3,4,5].map((i) => (
        <div key={i} style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--rose-soft)', color: 'var(--rose)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}><Icon.Heart/></div>
      ))}
    </div>
    <p style={{ margin: 'auto 0 0', fontSize: 12, color: 'var(--ink-3)', lineHeight: 1.4 }}>Wrong answers cost a heart. Refill by practicing easier topics, or wait 30 min.</p>
  </StatCardShell>
);

const GoalCard = () => {
  const pct = 72, r = 36, circ = 2 * Math.PI * r, offset = circ * (1 - pct / 100);
  return (
    <StatCardShell>
      <StatLabel icon={<Icon.Target/>} color="var(--blue-soft)" deep="var(--blue-deep)" label="DAILY GOAL"/>
      <div style={{ display: 'flex', alignItems: 'center', gap: 18, flex: 1 }}>
        <div style={{ position: 'relative', width: 96, height: 96, flexShrink: 0 }}>
          <svg width="96" height="96" viewBox="0 0 96 96">
            <circle cx="48" cy="48" r={r} fill="none" stroke="var(--bg-2)" strokeWidth="10"/>
            <circle cx="48" cy="48" r={r} fill="none" stroke="var(--blue)" strokeWidth="10" strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={offset} transform="rotate(-90 48 48)"/>
          </svg>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            <span style={{ fontSize: 22, fontWeight: 800, lineHeight: 1 }}>36</span>
            <span className="mono" style={{ fontSize: 10, color: 'var(--ink-3)' }}>/ 50 XP</span>
          </div>
        </div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>14 XP to go</div>
          <div style={{ fontSize: 12, color: 'var(--ink-3)', lineHeight: 1.5 }}>One short lesson or a quick practice round will finish today.</div>
        </div>
      </div>
    </StatCardShell>
  );
};

export const StatsRow = () => (
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-[14px] mt-[18px]">
    <StreakCard/><XPCard/><HeartsCard/><GoalCard/>
  </div>
);
