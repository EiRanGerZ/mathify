import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

const SC     = window.STUDENT_CONTEXT || {};
    const notify = (msg) => window.dispatchEvent(new CustomEvent('student-notify', { detail: { msg } }));

    // ── Icons ─────────────────────────────────────────────────────────────────
    const Icon = {
      Check:   (p) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}><path d="M3 8.5L6.5 12L13 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
      Arrow:   (p) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}><path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
      Lock:    (p) => <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...p}><rect x="2.5" y="6" width="9" height="6.5" rx="1.5" stroke="currentColor" strokeWidth="1.6"/><path d="M4.5 6V4.5C4.5 3.12 5.62 2 7 2C8.38 2 9.5 3.12 9.5 4.5V6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>,
      Flame:   (p) => <svg width="18" height="18" viewBox="0 0 18 18" fill="none" {...p}><path d="M9 2C9 5 6 5.5 6 9C6 11.5 7.5 13.5 9 13.5C10.5 13.5 12 11.5 12 9C12 7 11 6 11 4C12 5 13 6.5 13 9C13 12 11.2 14.5 9 14.5C6.8 14.5 5 12.5 5 9.5C5 6 9 5 9 2Z" fill="currentColor"/></svg>,
      Star:    (p) => <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...p}><path d="M7 1.5L8.7 5L12.5 5.55L9.75 8.2L10.4 12L7 10.2L3.6 12L4.25 8.2L1.5 5.55L5.3 5Z" fill="currentColor"/></svg>,
      Sparkle: (p) => <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...p}><path d="M7 1L8 6L13 7L8 8L7 13L6 8L1 7L6 6Z" fill="currentColor"/></svg>,
      Bolt:    (p) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}><path d="M9 1L3 9H8L7 15L13 7H8L9 1Z" fill="currentColor"/></svg>,
      Heart:   (p) => <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...p}><path d="M7 12C7 12 1.5 8.5 1.5 5C1.5 3.3 2.8 2 4.5 2C5.5 2 6.5 2.7 7 3.5C7.5 2.7 8.5 2 9.5 2C11.2 2 12.5 3.3 12.5 5C12.5 8.5 7 12 7 12Z" fill="currentColor"/></svg>,
      Target:  (p) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}><circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5"/><circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.5"/><circle cx="8" cy="8" r="1" fill="currentColor"/></svg>,
      Compass: (p) => <svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...p}><circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.6"/><path d="M13.5 6.5L11 11L6.5 13.5L9 9L13.5 6.5Z" fill="currentColor"/></svg>,
      Bell:    (p) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}><path d="M4 7C4 4.8 5.8 3 8 3C10.2 3 12 4.8 12 7V10L13 11.5H3L4 10V7Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><path d="M6.5 12.5C6.5 13.3 7.2 14 8 14C8.8 14 9.5 13.3 9.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
      Search:  (p) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}><circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5"/><path d="M10.5 10.5L13.5 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
      Clock:   (p) => <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...p}><circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.5"/><path d="M7 4V7L9 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
      Tree:    (p) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}><path d="M8 2V14M8 6L11 4M8 6L5 4M8 10L11.5 8M8 10L4.5 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
      Book:    (p) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}><path d="M3 3H7C7.5 3 8 3.5 8 4V13C8 12.5 7.5 12 7 12H3V3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><path d="M13 3H9C8.5 3 8 3.5 8 4V13C8 12.5 8.5 12 9 12H13V3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>,
      Menu:    (p) => <svg width="18" height="18" viewBox="0 0 18 18" fill="none" {...p}><path d="M3 5H15M3 9H15M3 13H15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>,
      Close:   (p) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}><path d="M4 4L12 12M12 4L4 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>,
    };

    const Logo = () => (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="1.5" y="1.5" width="29" height="29" rx="9" fill="var(--green)"/>
        <rect x="1.5" y="1.5" width="29" height="29" rx="9" stroke="var(--green-deep)" strokeWidth="1.5"/>
        <path d="M8 22V10L13 18L18 10V22" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="22" cy="11" r="2" fill="var(--amber)"/>
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

    // ── ProfilePopover ────────────────────────────────────────────────────────
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
        <div ref={ref} style={{ position: 'absolute', top: 'calc(100% + 10px)', right: 0, zIndex: 100, width: 248, borderRadius: 16, background: 'var(--paper)', border: '1px solid var(--line)', boxShadow: '0 4px 0 rgba(20,18,10,.06), 0 30px 60px -20px rgba(20,18,10,.18)', overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 16px 14px' }}>
            <Avatar letter={SC.initial || 'S'} color="var(--green)" size={40}/>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: '-0.01em' }}>{SC.name || 'Student'}</div>
              <span className="mono" style={{ fontSize: 11, padding: '2px 7px', borderRadius: 6, background: 'var(--green-soft)', color: 'var(--green-deep)', fontWeight: 700 }}>L{SC.level || 1}</span>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6, padding: '0 12px 14px' }}>
            {stats.map((s) => (
              <div key={s.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, padding: '10px 6px', borderRadius: 10, background: 'var(--bg)' }}>
                <span style={{ color: s.color, display: 'inline-flex' }}>{s.icon}</span>
                <span className="mono" style={{ fontSize: 17, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1 }}>{s.value}</span>
                <span style={{ fontSize: 9, fontWeight: 600, color: 'var(--ink-3)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{s.label}</span>
              </div>
            ))}
          </div>
          <div style={{ height: 1, background: 'var(--line)' }}/>
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
          <div style={{ height: 1, background: 'var(--line)' }}/>
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

    // ── Nav ───────────────────────────────────────────────────────────────────
    const Nav = () => {
      const base = SC.ctx || '';
      const [open, setOpen] = React.useState(false);
      const [profileOpen, setProfileOpen] = React.useState(false);
      const items = [
        { label: 'Today',      icon: <Icon.Compass/>, href: base + '/dashboard' },
        { label: 'Skill tree', icon: <Icon.Tree/>,    href: '#' },
        { label: 'Practice',   icon: <Icon.Target/>,  href: '#', onClick: () => notify('Practice module coming soon') },
        { label: 'Library',    icon: <Icon.Book/>,    href: base + '/library', active: true },
      ];
      return (
        <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(251,248,241,0.85)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', borderBottom: '1px solid var(--line)' }}>
          <div className="flex items-center gap-3" style={{ maxWidth: 1280, margin: '0 auto', padding: '0 20px', height: 60 }}>

            <a href={base + '/dashboard'} className="flex items-center gap-2 shrink-0">
              <Logo/>
              <span className="hidden sm:inline" style={{ fontWeight: 700, fontSize: 18, letterSpacing: '-0.01em' }}>Mathify</span>
            </a>

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

            <div className="hidden lg:flex flex-1 max-w-xs ml-2 items-center gap-2"
                 style={{ padding: '8px 12px', borderRadius: 10, background: 'var(--paper)', border: '1px solid var(--line)', color: 'var(--ink-3)', fontSize: 13 }}>
              <Icon.Search/><span>Search lessons, topics, formulas…</span>
              <span className="mono ml-auto" style={{ fontSize: 11, padding: '2px 6px', borderRadius: 4, background: 'var(--bg-2)' }}>⌘K</span>
            </div>

            <div className="flex items-center gap-2 ml-auto">
              <button style={{ width: 36, height: 36, borderRadius: 10, border: '1px solid var(--line)', background: 'var(--paper)', color: 'var(--ink-2)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                <Icon.Bell/>
                <span style={{ position: 'absolute', top: 7, right: 8, width: 7, height: 7, borderRadius: 999, background: 'var(--rose)', border: '1.5px solid var(--paper)' }}/>
              </button>
              <div style={{ position: 'relative' }}>
                <button onClick={() => setProfileOpen(o => !o)}
                        style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 10px 4px 4px', borderRadius: 999, border: profileOpen ? '1px solid var(--ink-3)' : '1px solid var(--line)', background: 'var(--paper)', cursor: 'pointer', fontFamily: 'inherit' }}>
                  <Avatar letter={SC.initial || 'S'} color="var(--green)" size={28}/>
                  <span className="hidden sm:inline" style={{ fontSize: 13, fontWeight: 600 }}>{SC.name || 'Student'}</span>
                </button>
                {profileOpen && <ProfilePopover onClose={() => setProfileOpen(false)} base={base}/>}
              </div>
              <button className="sm:hidden" onClick={() => setOpen(o => !o)}
                      style={{ width: 36, height: 36, borderRadius: 10, border: '1px solid var(--line)', background: 'var(--paper)', color: 'var(--ink-2)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                {open ? <Icon.Close/> : <Icon.Menu/>}
              </button>
            </div>
          </div>

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

    // ── Course data (from DB via servlet) ────────────────────────────────────
    const COURSES = window.COURSES_DATA || [];

    const COLOR_MAP = {
      green: { bg: 'var(--green-soft)', deep: 'var(--green-deep)', solid: 'var(--green)' },
      blue:  { bg: 'var(--blue-soft)',  deep: 'var(--blue-deep)',  solid: 'var(--blue)'  },
      amber: { bg: 'var(--amber-soft)', deep: 'var(--amber-deep)', solid: 'var(--amber)' },
      plum:  { bg: 'var(--plum-soft)',  deep: 'var(--plum)',       solid: 'var(--plum)'  },
      rose:  { bg: 'var(--rose-soft)',  deep: 'var(--rose)',       solid: 'var(--rose)'  },
    };

    // ── Library header ────────────────────────────────────────────────────────
    const LibraryHeader = () => {
      const [active, setActive] = React.useState('All');
      return (
        <div style={{ marginTop: 28, marginBottom: 22 }}>
          <div style={{ marginBottom: 6 }}>
            <span className="mono" style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: 'var(--ink-3)' }}>LIBRARY · {COURSES.length} COURSES</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 20 }}>
            <h1 style={{ margin: 0, fontSize: 44, fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.05 }}>
              Every topic, <span className="serif" style={{ color: 'var(--green-deep)' }}>your way</span>.
            </h1>
            <div style={{ display: 'inline-flex', padding: 4, gap: 2, background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: 12 }}>
              {['All', 'My courses', 'Saved', 'Completed'].map((o) => (
                <button key={o} onClick={() => setActive(o)} style={{ padding: '8px 14px', borderRadius: 8, border: 'none', cursor: 'pointer', background: o === active ? 'var(--ink)' : 'transparent', color: o === active ? 'var(--paper)' : 'var(--ink-2)', fontWeight: 600, fontSize: 13 }}>{o}</button>
              ))}
            </div>
          </div>
        </div>
      );
    };

    // ── Featured strip ────────────────────────────────────────────────────────
    const FeaturedStrip = () => {
      const base = SC.ctx || '';
      return (
        <div style={{ position: 'relative', overflow: 'hidden', background: 'var(--ink)', color: 'var(--paper)', borderRadius: 24, padding: '28px 32px', display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 24, boxShadow: 'var(--shadow-md)', marginBottom: 26 }}>
          <span className="serif" style={{ position: 'absolute', right: -20, top: -60, fontSize: 280, lineHeight: 1, color: 'var(--green)', opacity: 0.18, fontWeight: 600, pointerEvents: 'none' }}>∫</span>
          <div style={{ position: 'relative' }}>
            <span className="mono" style={{ display: 'inline-block', padding: '4px 10px', background: 'rgba(255,255,255,0.12)', borderRadius: 999, fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', marginBottom: 14 }}>YOUR CURRENT FOCUS</span>
            <h2 style={{ margin: '0 0 8px', fontSize: 30, fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 1.1 }}>Differential Calculus</h2>
            <p style={{ margin: 0, color: 'rgba(255,253,247,0.7)', fontSize: 14, maxWidth: 440, lineHeight: 1.55 }}>
              You're on Lesson 12 of 38 — derivatives of trig functions next. Keep your streak rolling.
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 22 }}>
              <a href={base + '/course'} style={{ padding: '12px 20px', borderRadius: 12, background: 'var(--green)', color: 'white', fontWeight: 700, fontSize: 14, display: 'inline-flex', alignItems: 'center', gap: 8, boxShadow: '0 2px 0 var(--green-deep)' }}>
                Resume course <Icon.Arrow/>
              </a>
              <a href={base + '/course'} style={{ padding: '12px 18px', borderRadius: 12, border: '1px solid rgba(255,255,255,0.18)', color: 'var(--paper)', fontWeight: 600, fontSize: 14 }}>View syllabus</a>
            </div>
          </div>
          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'rgba(255,253,247,0.6)', fontWeight: 700, letterSpacing: '0.06em', marginBottom: 8 }}>
              <span>PROGRESS</span><span>12 / 38 LESSONS</span>
            </div>
            <div style={{ display: 'flex', gap: 3, marginBottom: 20 }}>
              {Array.from({ length: 38 }).map((_, i) => (
                <div key={i} style={{ flex: 1, height: 28, borderRadius: 4, background: i < 12 ? 'var(--green)' : i === 12 ? 'var(--amber)' : 'rgba(255,255,255,0.08)' }}/>
              ))}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
              {[{ label: 'On streak', value: SC.streak > 0 ? SC.streak + ' days' : '1 day' }, { label: 'Mastery', value: '68%' }, { label: 'Next badge', value: 'Chain master' }].map((s) => (
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

    // ── Section header ────────────────────────────────────────────────────────
    const SectionHeader = ({ eyebrow, title, hint }) => (
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', margin: '12px 0 14px' }}>
        <div>
          <div className="mono" style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: 'var(--ink-3)', marginBottom: 4 }}>{eyebrow}</div>
          <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em' }}>{title}</h2>
        </div>
        {hint && <a href="#" style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink-3)' }}>{hint} ↗</a>}
      </div>
    );

    // ── Pathway row ───────────────────────────────────────────────────────────
    const PathwayRow = () => {
      const paths = [
        { title: 'High school catch-up', count: 6, hours: '32h', color: 'green', glyph: 'Σ' },
        { title: 'Calculus mastery',     count: 4, hours: '46h', color: 'blue',  glyph: '∂' },
        { title: 'CS-math foundations',  count: 5, hours: '38h', color: 'plum',  glyph: '⊕' },
        { title: 'Olympiad prep',        count: 7, hours: '60h', color: 'amber', glyph: '⊕' },
      ];
      return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14, marginBottom: 32 }}>
          {paths.map((p) => {
            const c = COLOR_MAP[p.color];
            return (
              <div key={p.title} style={{ position: 'relative', overflow: 'hidden', padding: 18, borderRadius: 18, background: 'var(--paper)', border: '1px solid var(--line)', display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer' }}>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: c.bg, color: c.deep, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Fraunces, serif', fontSize: 28, fontWeight: 600, fontStyle: 'italic', flexShrink: 0 }}>{p.glyph}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 11, color: 'var(--ink-3)', fontWeight: 700, letterSpacing: '0.06em' }}>PATHWAY</div>
                  <div style={{ fontSize: 15, fontWeight: 700, marginTop: 1 }}>{p.title}</div>
                  <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 2 }}>{p.count} courses · {p.hours}</div>
                </div>
                <Icon.Arrow style={{ color: 'var(--ink-3)' }}/>
              </div>
            );
          })}
        </div>
      );
    };

    // ── Filter row ────────────────────────────────────────────────────────────
    const FilterRow = ({ courses, activeFilter, setActiveFilter }) => {
      const trackCounts = {};
      courses.forEach(c => { trackCounts[c.track] = (trackCounts[c.track] || 0) + 1; });
      const topics = [
        { label: 'All topics', count: courses.length },
        ...Object.entries(trackCounts).map(([label, count]) => ({ label, count })),
      ];
      return (
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 22, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
            {topics.map((t) => (
              <button key={t.label} onClick={() => setActiveFilter(t.label)} style={{ padding: '8px 14px', borderRadius: 999, border: '1px solid ' + (t.label === activeFilter ? 'var(--ink)' : 'var(--line)'), background: t.label === activeFilter ? 'var(--ink)' : 'var(--paper)', color: t.label === activeFilter ? 'var(--paper)' : 'var(--ink-2)', cursor: 'pointer', fontSize: 13, fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                {t.label}
                <span className="mono" style={{ fontSize: 10, color: t.label === activeFilter ? 'rgba(255,253,247,0.55)' : 'var(--ink-3)' }}>{t.count}</span>
              </button>
            ))}
          </div>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontSize: 12, color: 'var(--ink-3)', fontWeight: 600 }}>Sort by</span>
            <button style={{ padding: '8px 12px', borderRadius: 10, border: '1px solid var(--line)', background: 'var(--paper)', fontSize: 13, fontWeight: 600, color: 'var(--ink-2)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              Level <Icon.Arrow style={{ transform: 'rotate(90deg)' }}/>
            </button>
          </div>
        </div>
      );
    };

    // ── Course card ───────────────────────────────────────────────────────────
    const CourseCard = ({ course }) => {
      const c = COLOR_MAP[course.color];
      const locked = course.status === 'locked';
      const base   = SC.ctx || '';
      return (
        <a href={locked ? '#' : base + '/course'} style={{ position: 'relative', background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: 20, overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: 'var(--shadow-sm)', opacity: locked ? 0.55 : 1, cursor: locked ? 'not-allowed' : 'pointer' }}>
          <div style={{ position: 'relative', height: 130, background: c.bg, overflow: 'hidden', borderBottom: '1px solid var(--line)' }}>
            <span className="serif" style={{ position: 'absolute', left: 18, top: -20, fontSize: 180, color: c.deep, opacity: 0.22, fontWeight: 600, lineHeight: 1 }}>{course.glyph}</span>
            <div style={{ position: 'absolute', top: 14, right: 14, display: 'flex', gap: 6 }}>
              {course.status === 'complete'     && <span style={{ padding: '4px 10px', borderRadius: 999, background: 'var(--green)', color: 'white', fontSize: 11, fontWeight: 700, letterSpacing: '0.04em', display: 'inline-flex', alignItems: 'center', gap: 5 }}><Icon.Check/> COMPLETE</span>}
              {course.status === 'new'          && <span style={{ padding: '4px 10px', borderRadius: 999, background: 'var(--ink)', color: 'var(--paper)', fontSize: 11, fontWeight: 700, letterSpacing: '0.04em' }}>NEW</span>}
              {course.status === 'recommended'  && <span style={{ padding: '4px 10px', borderRadius: 999, background: 'var(--paper)', color: 'var(--ink)', border: '1px solid var(--line)', fontSize: 11, fontWeight: 700, letterSpacing: '0.04em', display: 'inline-flex', alignItems: 'center', gap: 5 }}><Icon.Sparkle/> FOR YOU</span>}
              {locked                           && <span style={{ padding: '4px 10px', borderRadius: 999, background: 'var(--paper)', color: 'var(--ink-3)', border: '1px solid var(--line)', fontSize: 11, fontWeight: 700, letterSpacing: '0.04em', display: 'inline-flex', alignItems: 'center', gap: 5 }}><Icon.Lock/> LEVEL {course.level}+</span>}
            </div>
            <div style={{ position: 'absolute', left: 18, bottom: 14 }}>
              <span className="mono" style={{ padding: '3px 8px', borderRadius: 6, background: 'rgba(255,253,247,0.65)', backdropFilter: 'blur(4px)', fontSize: 11, fontWeight: 700, color: c.deep }}>{course.track.toUpperCase()}</span>
            </div>
          </div>
          <div style={{ padding: 18, display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
            <div>
              <h3 style={{ margin: '0 0 6px', fontSize: 17, fontWeight: 700, letterSpacing: '-0.015em', lineHeight: 1.25 }}>{course.title}</h3>
              <p style={{ margin: 0, fontSize: 13, color: 'var(--ink-3)', lineHeight: 1.45 }}>{course.blurb}</p>
            </div>
            <div style={{ display: 'flex', gap: 14, fontSize: 12, color: 'var(--ink-3)', marginTop: 'auto' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Icon.Book/> {course.lessons} lessons</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Icon.Clock/> {course.hours}</span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: 'var(--amber-deep)' }}><Icon.Bolt/> {course.xp}</span>
            </div>
            {course.progress > 0 ? (
              <div style={{ marginTop: 4 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', color: 'var(--ink-3)', marginBottom: 4 }}>
                  <span>{course.status === 'complete' ? 'COMPLETED' : 'IN PROGRESS'}</span>
                  <span>{course.progress}%</span>
                </div>
                <div style={{ height: 5, borderRadius: 999, background: 'var(--bg-2)', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: course.progress + '%', background: course.status === 'complete' ? 'var(--green)' : c.solid, borderRadius: 999 }}/>
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 4, paddingTop: 10, borderTop: '1px dashed var(--line)' }}>
                <span style={{ fontSize: 12, color: 'var(--ink-3)' }}>Not started</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 13, fontWeight: 700, color: c.deep }}>
                  {locked ? 'Unlock at L' + course.level : 'Start'} <Icon.Arrow/>
                </span>
              </div>
            )}
          </div>
        </a>
      );
    };

    const CourseGrid = ({ courses }) => (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        {courses.map((c) => <CourseCard key={c.id} course={c}/>)}
      </div>
    );

    // ── Library app ───────────────────────────────────────────────────────────
    const LibraryApp = () => {
      const [filter, setFilter] = React.useState('All topics');
      const allCourses = COURSES;
      const inProgress = allCourses.filter(c => c.status === 'in-progress');
      const filtered   = filter === 'All topics' ? allCourses : allCourses.filter(c => c.track === filter);
      const base       = SC.ctx || '';
      return (
        <div>
          <Nav/>
          <main style={{ maxWidth: 1280, margin: '0 auto', padding: '0 28px 80px' }}>
            <LibraryHeader/>
            <FeaturedStrip/>

            <SectionHeader eyebrow="GUIDED PATHS · BUNDLED FOR YOU" title="Pathways" hint="See all paths"/>
            <PathwayRow/>

            {inProgress.length > 0 && <>
              <SectionHeader eyebrow={inProgress.length + ' ACTIVE · PICK UP WHERE YOU LEFT OFF'} title="Continue learning" hint="View all"/>
              <div style={{ marginBottom: 28 }}>
                <CourseGrid courses={inProgress}/>
              </div>
            </>}

            <SectionHeader eyebrow={'ALL TOPICS · ' + allCourses.length + ' COURSES'} title="Browse the library"/>
            <FilterRow courses={allCourses} activeFilter={filter} setActiveFilter={setFilter}/>
            <CourseGrid courses={filtered}/>

            <div style={{ marginTop: 40, paddingTop: 24, borderTop: '1px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 12, color: 'var(--ink-3)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Logo/><span>Mathify · Library v2.4</span></div>
              <div style={{ display: 'flex', gap: 18 }}>
                <a href="#" style={{ color: 'var(--ink-3)' }}>Request a topic</a>
                <a href="#" style={{ color: 'var(--ink-3)' }}>Help</a>
                <a href={base + '/dashboard'} style={{ color: 'var(--ink-3)' }}>Back to dashboard</a>
              </div>
            </div>
          </main>
        </div>
      );
    };

    createRoot(document.getElementById('root')).render(<LibraryApp/>);
