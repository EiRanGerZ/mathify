import React from 'react';
import { Icon, Logo } from './icons.jsx';
import { Avatar } from './primitives.jsx';
import { NotificationBell } from './NotificationBell.jsx';
import { notify } from './notify.js';
import { SC } from './context.js';

const ProfilePopover = ({ onClose, base }) => {
  const ref = React.useRef(null);
  React.useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) onClose(); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [onClose]);

  const stats = [
    { color: 'var(--amber-deep)', icon: <Icon.Flame/>, value: SC.streak > 0 ? String(SC.streak) : '0', label: 'streak' },
    { color: 'var(--green-deep)', icon: <Icon.Bolt/>,  value: SC.xp > 0 ? SC.xp.toLocaleString() : '0', label: 'total xp' },
    { color: 'var(--rose)',       icon: <Icon.Bolt/>,  value: '5', label: 'energy' },
  ];
  const menuItems = [
    { icon: <Icon.Star/>,    label: 'My Profile',     href: '#' },
    { icon: <Icon.Sparkle/>, label: 'Preferences',    href: '#' },
    { icon: <Icon.Book/>,    label: 'Help & Support', href: '#' },
  ];

  return (
    <div ref={ref} style={{ position: 'absolute', top: 'calc(100% + 10px)', right: 0, zIndex: 100, width: 248, borderRadius: 16, background: 'var(--paper)', border: '1px solid var(--line)', boxShadow: 'var(--shadow-lg)', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 16px 14px' }}>
        <Avatar letter={SC.initial || 'S'} color="var(--green)" size={40}/>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: '-0.01em' }}>{SC.name || 'Student'}</div>
          <span className="mono" style={{ fontSize: 11, padding: '2px 7px', borderRadius: 6, background: 'var(--green-soft)', color: 'var(--green-deep)', fontWeight: 700 }}>L{SC.level || 1}</span>
        </div>
      </div>
      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6, padding: '0 12px 14px' }}>
        {stats.map((s) => (
          <div key={s.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, padding: '10px 6px', borderRadius: 10, background: 'var(--bg)' }}>
            <span style={{ color: s.color, display: 'inline-flex' }}>{s.icon}</span>
            <span className="mono" style={{ fontSize: 17, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1 }}>{s.value}</span>
            <span style={{ fontSize: 9, fontWeight: 600, color: 'var(--ink-3)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{s.label}</span>
          </div>
        ))}
      </div>
      {/* Divider */}
      <div style={{ height: 1, background: 'var(--line)' }}/>
      {/* Menu */}
      <div style={{ padding: '6px 8px' }}>
        {menuItems.map((item) => (
          <a key={item.label} href={item.href}
             style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderRadius: 8, fontSize: 13, fontWeight: 500, color: 'var(--ink-2)' }}
             onMouseEnter={e => e.currentTarget.style.background = 'var(--bg)'}
             onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
            <span style={{ color: 'var(--ink-3)', display: 'inline-flex' }}>{item.icon}</span>{item.label}
          </a>
        ))}
      </div>
      {/* Divider */}
      <div style={{ height: 1, background: 'var(--line)' }}/>
      {/* Logout */}
      <div style={{ padding: '6px 8px' }}>
        <a href={base + '/logout'}
           style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 10px', borderRadius: 8, fontSize: 13, fontWeight: 500, color: 'var(--rose)' }}
           onMouseEnter={e => e.currentTarget.style.background = 'var(--rose-soft)'}
           onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
          <span style={{ display: 'inline-flex', transform: 'rotate(180deg)' }}><Icon.Arrow/></span>Log out
        </a>
      </div>
    </div>
  );
};

export const Nav = () => {
  const base = SC.ctx || '';
  const [open, setOpen] = React.useState(false);
  const [profileOpen, setProfileOpen] = React.useState(false);
  const items = [
    { label: 'Today',      icon: <Icon.Compass/>, href: base + '/dashboard', active: true },
    { label: 'Skill tree', icon: <Icon.Tree/>,    href: '#' },
    { label: 'Practice',   icon: <Icon.Target/>,  href: '#', onClick: () => notify('Practice module coming soon') },
    { label: 'Library',    icon: <Icon.Book/>,    href: base + '/library' },
  ];
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(251,248,241,0.85)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', borderBottom: '1px solid var(--line)' }}>
      {/* ── Main bar ── */}
      <div className="flex items-center gap-3" style={{ maxWidth: 1280, margin: '0 auto', padding: '0 20px', height: 60 }}>

        {/* Logo */}
        <a href={base + '/dashboard'} className="flex items-center gap-2 shrink-0">
          <Logo/>
          <span className="hidden sm:inline" style={{ fontWeight: 700, fontSize: 18, letterSpacing: '-0.01em' }}>Mathify</span>
        </a>

        {/* Nav links — visible on sm+, hidden on mobile */}
        <nav className="hidden sm:flex items-center gap-1 ml-2">
          {items.map((item) => (
            <a key={item.label} href={item.href}
               onClick={item.onClick ? (e) => { e.preventDefault(); item.onClick(); } : undefined}
               className="inline-flex items-center gap-2 rounded-[10px] font-semibold"
               style={{ padding: '7px 12px', fontSize: 14, background: item.active ? 'var(--ink)' : 'transparent', color: item.active ? 'var(--paper)' : 'var(--ink-2)' }}>
              <span style={{ opacity: item.active ? 1 : 0.7 }}>{item.icon}</span>
              <span className="hidden lg:inline">{item.label}</span>
            </a>
          ))}
        </nav>

        {/* Bell + profile button + hamburger (mobile only) */}
        <div className="flex items-center gap-2 ml-auto">
          <NotificationBell base={base}/>

          {/* Student profile button + popover */}
          <div style={{ position: 'relative' }}>
            <button onClick={() => setProfileOpen(o => !o)}
                    style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 10px 4px 4px', borderRadius: 999, border: `1px solid ${profileOpen ? 'var(--ink-3)' : 'var(--line)'}`, background: 'var(--paper)', cursor: 'pointer', fontFamily: 'inherit' }}>
              <Avatar letter={SC.initial || 'S'} color="var(--green)" size={28}/>
              <span className="hidden sm:inline" style={{ fontSize: 13, fontWeight: 600 }}>{SC.name || 'Student'}</span>
            </button>
            {profileOpen && <ProfilePopover onClose={() => setProfileOpen(false)} base={base}/>}
          </div>

          {/* Hamburger — mobile only */}
          <button className="sm:hidden" onClick={() => setOpen(o => !o)}
                  style={{ width: 36, height: 36, borderRadius: 10, border: '1px solid var(--line)', background: 'var(--paper)', color: 'var(--ink-2)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
            {open ? <Icon.Close/> : <Icon.Menu/>}
          </button>
        </div>
      </div>

      {/* ── Mobile dropdown (nav links only) ── */}
      {open && (
        <div className="sm:hidden" style={{ borderTop: '1px solid var(--line)', background: 'rgba(251,248,241,0.97)', padding: '10px 16px 16px' }}>
          {items.map((item) => (
            <a key={item.label} href={item.href}
               onClick={item.onClick
                 ? (e) => { e.preventDefault(); item.onClick(); setOpen(false); }
                 : () => setOpen(false)}
               style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 10, fontSize: 14, fontWeight: 600, background: item.active ? 'var(--ink)' : 'transparent', color: item.active ? 'var(--paper)' : 'var(--ink-2)' }}>
              {item.icon}{item.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};
