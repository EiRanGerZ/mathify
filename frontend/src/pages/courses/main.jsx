import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

// Page context + catalog data injected by the JSP shell as window globals.
const SC     = window.STUDENT_CONTEXT || {};
const notify = (msg) => window.dispatchEvent(new CustomEvent('student-notify', { detail: { msg } }));

const ALL_COURSES   = window.COURSES_DATA  || [];
const ENROLLED_SET  = new Set(window.ENROLLED_IDS  || []);
const COMPLETED_SET = new Set(window.COMPLETED_IDS || []);

// ── Flexible duration: hours → days → weeks → months ───────────────────────
function flexTime(h) {
  if (!h) return '';
  const n = parseFloat(h);
  if (isNaN(n)) return h;
  if (n < 1)   return '< 1 hr';
  if (n < 24)  return Math.round(n) + (Math.round(n) === 1 ? ' hr'   : ' hrs');
  const days   = Math.round(n / 24);
  if (days < 14) return days  + (days  === 1 ? ' day'   : ' days');
  const weeks  = Math.round(n / 168);
  if (weeks < 8) return weeks + (weeks === 1 ? ' week'  : ' weeks');
  const months = Math.round(n / 720);
  return months + (months === 1 ? ' month' : ' months');
}

const COLOR_MAP = {
  green: { bg: 'var(--green-soft)', deep: 'var(--green-deep)', solid: 'var(--green)' },
  blue:  { bg: 'var(--blue-soft)',  deep: 'var(--blue-deep)',  solid: 'var(--blue)'  },
  amber: { bg: 'var(--amber-soft)', deep: 'var(--amber-deep)', solid: 'var(--amber)' },
  plum:  { bg: 'var(--plum-soft)',  deep: 'var(--plum)',       solid: 'var(--plum)'  },
  rose:  { bg: 'var(--rose-soft)',  deep: 'var(--rose)',       solid: 'var(--rose)'  },
};

// ── Icons ──────────────────────────────────────────────────────────────────
const Icon = {
  Check:   (p) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}><path d="M3 8.5L6.5 12L13 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  Arrow:   (p) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}><path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  Plus:    (p) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}><path d="M8 3V13M3 8H13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>,
  Flame:   (p) => <svg width="18" height="18" viewBox="0 0 18 18" fill="none" {...p}><path d="M9 2C9 5 6 5.5 6 9C6 11.5 7.5 13.5 9 13.5C10.5 13.5 12 11.5 12 9C12 7 11 6 11 4C12 5 13 6.5 13 9C13 12 11.2 14.5 9 14.5C6.8 14.5 5 12.5 5 9.5C5 6 9 5 9 2Z" fill="currentColor"/></svg>,
  Star:    (p) => <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...p}><path d="M7 1.5L8.7 5L12.5 5.55L9.75 8.2L10.4 12L7 10.2L3.6 12L4.25 8.2L1.5 5.55L5.3 5Z" fill="currentColor"/></svg>,
  Sparkle: (p) => <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...p}><path d="M7 1L8 6L13 7L8 8L7 13L6 8L1 7L6 6Z" fill="currentColor"/></svg>,
  Bolt:    (p) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}><path d="M9 1L3 9H8L7 15L13 7H8L9 1Z" fill="currentColor"/></svg>,
  Heart:   (p) => <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...p}><path d="M7 12C7 12 1.5 8.5 1.5 5C1.5 3.3 2.8 2 4.5 2C5.5 2 6.5 2.7 7 3.5C7.5 2.7 8.5 2 9.5 2C11.2 2 12.5 3.3 12.5 5C12.5 8.5 7 12 7 12Z" fill="currentColor"/></svg>,
  Compass: (p) => <svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...p}><circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.6"/><path d="M13.5 6.5L11 11L6.5 13.5L9 9L13.5 6.5Z" fill="currentColor"/></svg>,
  Book:    (p) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}><path d="M3 3H7C7.5 3 8 3.5 8 4V13C8 12.5 7.5 12 7 12H3V3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><path d="M13 3H9C8.5 3 8 3.5 8 4V13C8 12.5 8.5 12 9 12H13V3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>,
  Grid:    (p) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}><rect x="2.5" y="2.5" width="4.5" height="4.5" rx="1.2" stroke="currentColor" strokeWidth="1.5"/><rect x="9" y="2.5" width="4.5" height="4.5" rx="1.2" stroke="currentColor" strokeWidth="1.5"/><rect x="2.5" y="9" width="4.5" height="4.5" rx="1.2" stroke="currentColor" strokeWidth="1.5"/><rect x="9" y="9" width="4.5" height="4.5" rx="1.2" stroke="currentColor" strokeWidth="1.5"/></svg>,
  Clock:   (p) => <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...p}><circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.5"/><path d="M7 4V7L9 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  Search:  (p) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}><circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5"/><path d="M10.5 10.5L13.5 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  Bell:    (p) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}><path d="M4 7C4 4.8 5.8 3 8 3C10.2 3 12 4.8 12 7V10L13 11.5H3L4 10V7Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><path d="M6.5 12.5C6.5 13.3 7.2 14 8 14C8.8 14 9.5 13.3 9.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
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

// ── Profile popover ─────────────────────────────────────────────────────────
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
    { color: 'var(--rose)',       icon: <Icon.Heart/>, value: '5', label: 'energy' },
  ];
  const menuItems = [
    { icon: <Icon.Star/>,    label: 'My Profile',     href: '#' },
    { icon: <Icon.Sparkle/>, label: 'Update plan',    href: base + '/premium' },
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

// ── Nav (Today · Library · All Courses) ────────────────────────────────────
const Nav = () => {
  const base = SC.ctx || '';
  const active = window.ACTIVE_NAV || '';
  const [open, setOpen]            = React.useState(false);
  const [profileOpen, setProfile]  = React.useState(false);
  const items = [
    { id: 'today',   label: 'Today',       icon: <Icon.Compass/>, href: base + '/dashboard' },
    { id: 'library', label: 'My Library',  icon: <Icon.Book/>,    href: base + '/library'  },
    { id: 'courses', label: 'All Courses', icon: <Icon.Grid/>,    href: base + '/courses'  },
  ];
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(251,248,241,0.88)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', borderBottom: '1px solid var(--line)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, maxWidth: 1280, margin: '0 auto', padding: '0 24px', height: 60 }}>

        <a href={base + '/dashboard'} style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          <Logo/>
          <span style={{ fontWeight: 700, fontSize: 18, letterSpacing: '-0.01em' }} className="hidden sm:inline">Mathify</span>
        </a>

        <nav style={{ display: 'flex', alignItems: 'center', gap: 4, marginLeft: 8 }} className="hidden sm:flex">
          {items.map((item) => {
            const isActive = item.id === active;
            return (
              <a key={item.id} href={item.href}
                 style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '7px 13px', borderRadius: 10, fontWeight: 600, fontSize: 14, background: isActive ? 'var(--ink)' : 'transparent', color: isActive ? 'var(--paper)' : 'var(--ink-2)' }}>
                <span style={{ opacity: isActive ? 1 : 0.65, display: 'inline-flex' }}>{item.icon}</span>
                <span className="hidden lg:inline">{item.label}</span>
              </a>
            );
          })}
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 'auto' }}>
          <button style={{ width: 36, height: 36, borderRadius: 10, border: '1px solid var(--line)', background: 'var(--paper)', color: 'var(--ink-2)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            <Icon.Bell/>
            <span style={{ position: 'absolute', top: 7, right: 8, width: 7, height: 7, borderRadius: 999, background: 'var(--rose)', border: '1.5px solid var(--paper)' }}/>
          </button>
          <div style={{ position: 'relative' }}>
            <button onClick={() => setProfile(o => !o)}
                    style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 10px 4px 4px', borderRadius: 999, border: profileOpen ? '1px solid var(--ink-3)' : '1px solid var(--line)', background: 'var(--paper)', cursor: 'pointer', fontFamily: 'inherit' }}>
              <Avatar letter={SC.initial || 'S'} color="var(--green)" size={28}/>
              <span className="hidden sm:inline" style={{ fontSize: 13, fontWeight: 600 }}>{SC.name || 'Student'}</span>
            </button>
            {profileOpen && <ProfilePopover onClose={() => setProfile(false)} base={base}/>}
          </div>
          <button className="sm:hidden" onClick={() => setOpen(o => !o)}
                  style={{ width: 36, height: 36, borderRadius: 10, border: '1px solid var(--line)', background: 'var(--paper)', color: 'var(--ink-2)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
            {open ? <Icon.Close/> : <Icon.Menu/>}
          </button>
        </div>
      </div>

      {open && (
        <div className="sm:hidden" style={{ borderTop: '1px solid var(--line)', background: 'rgba(251,248,241,0.97)', padding: '10px 16px 16px' }}>
          {items.map((item) => {
            const isActive = item.id === active;
            return (
              <a key={item.id} href={item.href} onClick={() => setOpen(false)}
                 style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 10, fontSize: 14, fontWeight: 600, background: isActive ? 'var(--ink)' : 'transparent', color: isActive ? 'var(--paper)' : 'var(--ink-2)' }}>
                {item.icon}{item.label}
              </a>
            );
          })}
        </div>
      )}
    </header>
  );
};

// ── Section header ─────────────────────────────────────────────────────────
const SectionHeader = ({ eyebrow, title, right }) => (
  <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 18, flexWrap: 'wrap', gap: 12 }}>
    <div>
      <div className="mono" style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: 'var(--ink-3)', marginBottom: 4 }}>{eyebrow}</div>
      <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em' }}>{title}</h2>
    </div>
    {right}
  </div>
);

// ── Category search box (search-by-track) ──────────────────────────────────
const CategorySearch = ({ value, onChange, placeholder }) => (
  <div style={{ position: 'relative', width: 240, flexShrink: 0 }}>
    <span style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)', color: 'var(--ink-3)', pointerEvents: 'none', display: 'flex' }}>
      <Icon.Search/>
    </span>
    <input
      type="text"
      placeholder={placeholder || 'Search by category…'}
      value={value}
      onChange={e => onChange(e.target.value)}
      style={{ width: '100%', padding: '9px 12px 9px 35px', borderRadius: 10, border: '1px solid var(--line)', background: 'var(--paper)', fontSize: 13, fontFamily: 'inherit', outline: 'none', color: 'var(--ink)' }}
      onFocus={e => e.target.style.borderColor = 'var(--ink-3)'}
      onBlur={e  => e.target.style.borderColor = 'var(--line)'}
    />
  </div>
);

// ── Shared footer ──────────────────────────────────────────────────────────
const StudentFooter = ({ label, links }) => (
  <div style={{ paddingTop: 24, borderTop: '1px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 12, color: 'var(--ink-3)', flexWrap: 'wrap', gap: 12 }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Logo/><span>Mathify · {label}</span></div>
    <div style={{ display: 'flex', gap: 18 }}>
      {(links || []).map((l) => (
        <a key={l.label} href={l.href} style={{ color: 'var(--ink-3)' }}>{l.label}</a>
      ))}
    </div>
  </div>
);

// Pops the ?msg= toast (set after a server redirect) then cleans the URL.
function useFlashMessage() {
  React.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const msg = params.get('msg');
    if (msg) {
      notify(decodeURIComponent(msg));
      const clean = window.location.pathname + window.location.search.replace(/[?&]msg=[^&]*/g, '').replace(/^\?$/, '');
      window.history.replaceState({}, '', clean || window.location.pathname);
    }
  }, []);
}

// ── All-courses card (browse + enroll) ─────────────────────────────────────
const AllCourseCard = ({ course }) => {
  const base = SC.ctx || '';
  const c = COLOR_MAP[course.color] || COLOR_MAP.green;
  const enrolled  = ENROLLED_SET.has(course.id);
  const completed = COMPLETED_SET.has(course.id);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: 20, overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
      <div style={{ position: 'relative', height: 120, background: c.bg, overflow: 'hidden', borderBottom: '1px solid var(--line)' }}>
        <span className="serif" style={{ position: 'absolute', left: 14, top: -24, fontSize: 160, color: c.deep, opacity: 0.2, fontWeight: 600, lineHeight: 1, pointerEvents: 'none' }}>{course.glyph}</span>
        <div style={{ position: 'absolute', top: 12, right: 12, display: 'flex', gap: 6 }}>
          {completed && (
            <span style={{ padding: '4px 10px', borderRadius: 999, background: 'var(--green)', color: 'white', fontSize: 11, fontWeight: 700, letterSpacing: '0.04em', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              <Icon.Check/> COMPLETE
            </span>
          )}
          {!enrolled && course.status === 'new' && (
            <span style={{ padding: '4px 10px', borderRadius: 999, background: 'var(--ink)', color: 'var(--paper)', fontSize: 11, fontWeight: 700, letterSpacing: '0.04em' }}>NEW</span>
          )}
          {enrolled && !completed && (
            <span style={{ padding: '4px 10px', borderRadius: 999, background: 'var(--amber-soft)', color: 'var(--amber-deep)', fontSize: 11, fontWeight: 700, letterSpacing: '0.04em' }}>ENROLLED</span>
          )}
        </div>
        <div style={{ position: 'absolute', left: 14, bottom: 12 }}>
          <span className="mono" style={{ padding: '3px 8px', borderRadius: 6, background: 'rgba(255,253,247,0.7)', backdropFilter: 'blur(4px)', fontSize: 11, fontWeight: 700, color: c.deep }}>
            {course.track.toUpperCase()}
          </span>
        </div>
      </div>

      <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
        <div>
          <h3 style={{ margin: '0 0 5px', fontSize: 16, fontWeight: 700, letterSpacing: '-0.015em', lineHeight: 1.25 }}>{course.title}</h3>
          <p style={{ margin: 0, fontSize: 13, color: 'var(--ink-3)', lineHeight: 1.45 }}>{course.blurb}</p>
        </div>
        <div style={{ display: 'flex', gap: 12, fontSize: 12, color: 'var(--ink-3)', marginTop: 'auto' }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Icon.Book/> {course.lessons} lessons</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Icon.Clock/> {flexTime(course.hours)}</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, color: 'var(--amber-deep)' }}><Icon.Bolt/> {course.xp} XP</span>
        </div>
        <div style={{ paddingTop: 10, borderTop: '1px solid var(--line)' }}>
          {enrolled ? (
            <a href={base + '/course?courseId=' + course.id}
               style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, width: '100%', padding: '11px 16px', borderRadius: 12, background: 'var(--paper)', border: '1px solid var(--line)', color: 'var(--ink)', fontWeight: 700, fontSize: 13, textDecoration: 'none' }}
               onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--ink-3)'}
               onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--line)'}>
              {completed ? 'Review' : 'Continue'} <Icon.Arrow/>
            </a>
          ) : (
            <form method="post" action={base + '/course/enroll'}>
              <input type="hidden" name="courseId" value={course.id}/>
              <input type="hidden" name="redirect" value="/courses"/>
              <button type="submit"
                      style={{ width: '100%', padding: '11px 16px', borderRadius: 12, background: 'var(--green)', color: 'white', fontWeight: 700, fontSize: 13, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, fontFamily: 'inherit', boxShadow: '0 2px 0 var(--green-deep)' }}>
                <Icon.Plus/> Enroll
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

// ── All Courses (browse, search-by-category, enroll) ───────────────────────
const AllCourses = () => {
  const [query, setQuery] = React.useState('');

  const filtered = query.trim()
    ? ALL_COURSES.filter(c => c.track.toLowerCase().includes(query.toLowerCase()))
    : ALL_COURSES;

  return (
    <div style={{ marginBottom: 48 }}>
      <SectionHeader
        eyebrow={'ALL COURSES · ' + ALL_COURSES.length + ' AVAILABLE'}
        title="All Courses"
        right={<CategorySearch value={query} onChange={setQuery}/>}
      />
      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px 24px', color: 'var(--ink-3)', fontSize: 14 }}>
          No courses found for &ldquo;{query}&rdquo;.
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
          {filtered.map(c => <AllCourseCard key={c.id} course={c}/>)}
        </div>
      )}
    </div>
  );
};

const CoursesApp = () => {
  const base = SC.ctx || '';
  useFlashMessage();
  return (
    <div>
      <Nav/>
      <main style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 24px 80px' }}>
        <div style={{ marginBottom: 28 }}>
          <span className="mono" style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: 'var(--ink-3)' }}>
            COURSE CATALOG · {ALL_COURSES.length} COURSES
          </span>
          <h1 style={{ margin: '4px 0 0', fontSize: 40, fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.05 }}>
            Every topic, <span className="serif" style={{ color: 'var(--green-deep)' }}>your way</span>.
          </h1>
        </div>

        <AllCourses/>

        <StudentFooter label="All Courses" links={[
          { label: 'My library',        href: base + '/library' },
          { label: 'Back to dashboard', href: base + '/dashboard' },
        ]}/>
      </main>
    </div>
  );
};

const rootEl = document.getElementById('root');
if (rootEl) createRoot(rootEl).render(<CoursesApp/>);
