import React from 'react';

// Small presentational building blocks shared across pages.

export const Avatar = ({ letter, color, size = 32 }) => (
  <div style={{ width: size, height: size, borderRadius: 999, background: color, color: 'white', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: size * 0.42, flexShrink: 0 }}>{letter}</div>
);

export const StatChip = ({ color, icon, value, label }) => {
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

export const StatCardShell = ({ children, accent }) => (
  <div style={{ position: 'relative', padding: 22, borderRadius: 20, background: 'var(--paper)', border: '1px solid var(--line)', boxShadow: 'var(--shadow-sm)', display: 'flex', flexDirection: 'column', minHeight: 188, overflow: 'hidden' }}>
    {accent && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: accent }}/>}
    {children}
  </div>
);

export const StatLabel = ({ icon, color, label, deep }) => (
  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 10px', borderRadius: 999, background: color, color: deep, fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', width: 'fit-content', marginBottom: 14 }}>{icon}{label}</div>
);
