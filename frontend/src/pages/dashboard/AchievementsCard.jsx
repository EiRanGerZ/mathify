import React from 'react';
import { Icon } from '../../shared/icons.jsx';

const AchievementBadge = ({ name, desc, date, color, icon }) => {
  const colors = { green: { bg: 'var(--green-soft)', fg: 'var(--green-deep)' }, amber: { bg: 'var(--amber-soft)', fg: 'var(--amber-deep)' }, blue: { bg: 'var(--blue-soft)', fg: 'var(--blue-deep)' }, plum: { bg: 'var(--plum-soft)', fg: 'var(--plum)' } };
  const c = colors[color];
  return (
    <div style={{ padding: 14, borderRadius: 14, background: 'var(--bg)', border: '1px solid var(--line)', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 8 }}>
      <div style={{ width: 44, height: 44, borderRadius: 12, background: c.bg, color: c.fg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{icon}</div>
      <div>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '-0.01em' }}>{name}</div>
        <div style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 2 }}>{desc}</div>
      </div>
      <div className="mono" style={{ fontSize: 10, color: 'var(--ink-3)' }}>{date}</div>
    </div>
  );
};

export const AchievementsCard = () => {
  const items = [
    { name: 'Algebra Apprentice', desc: 'Finished Basic Algebra',  date: '2 days ago',  color: 'green', icon: <Icon.Trophy/> },
    { name: '30-Day Climber',     desc: '30 day streak reached',    date: '17 days ago', color: 'amber', icon: <Icon.Flame/>  },
    { name: 'Sharp Eye',          desc: '20 quick checks in a row', date: 'last week',   color: 'blue',  icon: <Icon.Target/> },
    { name: 'Theorem Hunter',     desc: '50 lessons completed',     date: '3 wks ago',   color: 'plum',  icon: <Icon.Star/>   },
  ];
  return (
    <div style={{ background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: 24, padding: 24, boxShadow: 'var(--shadow-sm)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <h3 style={{ margin: 0, fontSize: 20, fontWeight: 700, letterSpacing: '-0.015em' }}>Achievements</h3>
            <span style={{ padding: '3px 8px', borderRadius: 999, background: 'var(--amber-soft)', color: 'var(--amber-deep)', fontSize: 11, fontWeight: 700, letterSpacing: '0.04em' }}>12 EARNED</span>
          </div>
          <p style={{ margin: 0, fontSize: 13, color: 'var(--ink-3)' }}>Badges for milestones, not for showing up.</p>
        </div>
        <a href="#" style={{ fontSize: 13, fontWeight: 600, color: 'var(--blue-deep)' }}>Trophy case ↗</a>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-[10px] mb-[14px]">
        {items.map((a, i) => <AchievementBadge key={i} {...a}/>)}
      </div>
      <div style={{ padding: 14, borderRadius: 14, background: 'var(--bg)', border: '1px dashed var(--line)' }}>
        <div className="mono" style={{ fontSize: 10, fontWeight: 700, color: 'var(--ink-3)', letterSpacing: '0.06em', marginBottom: 8 }}>NEXT UP</div>
        <div style={{ display: 'flex', gap: 16 }}>
          {[{ name: 'Calculus Cadet', req: 'Finish Derivatives' }, { name: '100-Day Climber', req: '53 more days' }].map((l) => (
            <div key={l.name} style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: 'var(--bg-2)', color: 'var(--ink-3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon.Lock/></div>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{l.name}</div>
                <div style={{ fontSize: 11, color: 'var(--ink-3)' }}>{l.req}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
