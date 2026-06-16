import React from 'react';
import { Icon } from '../../shared/icons.jsx';

const QuestRow = ({ tag, color, title, meta, progress, total, reward }) => {
  const colors = { green: { bg: 'var(--green-soft)', fg: 'var(--green-deep)', bar: 'var(--green)' }, blue: { bg: 'var(--blue-soft)', fg: 'var(--blue-deep)', bar: 'var(--blue)' }, amber: { bg: 'var(--amber-soft)', fg: 'var(--amber-deep)', bar: 'var(--amber)' }, plum: { bg: 'var(--plum-soft)', fg: 'var(--plum)', bar: 'var(--plum)' } };
  const c = colors[color], pct = Math.round((progress / total) * 100);
  return (
    <div style={{ padding: 16, borderRadius: 14, background: 'var(--bg)', border: '1px solid var(--line)', display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ padding: '3px 8px', borderRadius: 6, background: c.bg, color: c.fg, fontSize: 10, fontWeight: 700, letterSpacing: '0.06em' }}>{tag}</span>
        <span className="mono" style={{ fontSize: 11, color: 'var(--ink-3)', marginLeft: 'auto' }}>{progress} / {total}</span>
      </div>
      <div>
        <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 2 }}>{title}</div>
        <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>{meta}</div>
      </div>
      <div style={{ height: 6, borderRadius: 999, background: 'var(--bg-2)', overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, height: '100%', background: c.bar }}/>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--ink-2)' }}>
        <Icon.Sparkle style={{ color: c.fg }}/><span>Reward: <b>{reward}</b></span>
      </div>
    </div>
  );
};

export const QuestsPanel = () => (
  <div style={{ background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: 24, padding: 24, boxShadow: 'var(--shadow-sm)' }}>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <h3 style={{ margin: 0, fontSize: 20, fontWeight: 700, letterSpacing: '-0.015em' }}>Quests</h3>
          <span style={{ padding: '3px 8px', borderRadius: 999, background: 'var(--bg-2)', color: 'var(--ink-2)', fontSize: 11, fontWeight: 700, letterSpacing: '0.04em' }}>4 ACTIVE</span>
        </div>
        <p style={{ margin: 0, fontSize: 13, color: 'var(--ink-3)' }}>Small targets that compound. Resets at midnight, weekly on Monday.</p>
      </div>
      <a href="#" style={{ fontSize: 13, fontWeight: 600, color: 'var(--blue-deep)' }}>All quests ↗</a>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-[12px]">
      {[
        { tag: 'DAILY',  color: 'green', title: "Finish today's plan",  meta: 'Complete the 3 remaining steps',   progress: 4,  total: 7,  reward: '20 XP'        },
        { tag: 'DAILY',  color: 'amber', title: 'Earn 50 XP today',      meta: 'Any combination of lessons + practice', progress: 36, total: 50, reward: '+1 gem' },
        { tag: 'WEEKLY', color: 'blue',  title: 'Practice for 5 days',   meta: '3 of 5 done · ends Sunday',       progress: 3,  total: 5,  reward: 'Streak Freeze' },
        { tag: 'WEEKLY', color: 'plum',  title: 'Master one new node',   meta: 'Algebra in progress',             progress: 7,  total: 12, reward: 'Achievement'   },
      ].map((q, i) => <QuestRow key={i} {...q}/>)}
    </div>
  </div>
);
