<%@ page contentType="text/html;charset=UTF-8" language="java" isELIgnored="true" %>
<%@ page import="com.mathify.model.AuthUser, com.mathify.model.UserProgress" %>
<%
    HttpSession  sess     = request.getSession(false);
    AuthUser     authUser = (sess != null) ? (AuthUser)     sess.getAttribute("authUser") : null;
    UserProgress up       = (sess != null) ? (UserProgress) sess.getAttribute("progress") : null;

    String userName = (authUser != null) ? authUser.preferredName() : "Student";
    String initial  = (authUser != null) ? authUser.initial() : "S";
    int    streak   = (up != null) ? up.getCurrentStreak() : 0;
    int    totalXP  = (up != null) ? up.getTotalXP()       : 0;
    int    level    = (up != null) ? up.getLevel()          : 1;
    String jsName   = userName.replace("\\", "\\\\").replace("\"", "\\\"");
    String ctx      = request.getContextPath();
%>
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>Mathify — Dashboard</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&family=Fraunces:opsz,wght@9..144,500;9..144,600&display=swap" rel="stylesheet">
<script src="https://cdn.tailwindcss.com"></script>
<script>tailwind.config = { theme: { extend: {} } };</script>
<style>
  [x-cloak] { display: none !important; }
  :root {
    --bg: #FBF8F1; --bg-2: #F4EFE3;
    --ink: #161816; --ink-2: #3A3D3A; --ink-3: #6B6E6A;
    --line: #E6DFCC; --paper: #FFFDF7;
    --green: #1F8A5B; --green-soft: #D7EBDF; --green-deep: #0E5A3A;
    --blue: #3858E9;  --blue-soft:  #DEE4FB; --blue-deep:  #1F37A3;
    --amber: #E8A23A; --amber-soft: #FBEBC8; --amber-deep: #8C5B12;
    --plum: #6E4BB5;  --plum-soft:  #E7DEF6;
    --rose: #D14F6B;  --rose-soft:  #FADDE3;
    --shadow-sm: 0 1px 0 rgba(20,18,10,.04), 0 2px 6px rgba(20,18,10,.04);
    --shadow-md: 0 2px 0 rgba(20,18,10,.05), 0 12px 28px -8px rgba(20,18,10,.12);
    --shadow-lg: 0 4px 0 rgba(20,18,10,.06), 0 30px 60px -20px rgba(20,18,10,.18);
  }
  *, *::before, *::after { box-sizing: border-box; }
  html, body { margin: 0; padding: 0; }
  body {
    background: var(--bg); color: var(--ink);
    font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
    font-size: 15px; line-height: 1.5; -webkit-font-smoothing: antialiased;
  }
  .mono  { font-family: 'JetBrains Mono', monospace; font-feature-settings: 'ss01' on; }
  .serif { font-family: 'Fraunces', serif; font-style: italic; }
  button { font-family: inherit; }
  a { text-decoration: none; color: inherit; }
  .dot-grid {
    background-image: radial-gradient(circle, var(--line) 1px, transparent 1px);
    background-size: 22px 22px;
  }
  #root { min-height: 100vh; }
</style>
</head>
<body>

  <%-- Alpine toast — receives CustomEvents from React --%>
  <div x-data="{ show: false, msg: '' }"
       x-on:student-notify.window="msg = $event.detail.msg; show = true; setTimeout(() => show = false, 3000)">
    <div x-show="show" x-cloak
         x-transition:enter="transition ease-out duration-300"
         x-transition:enter-start="opacity-0 translate-y-2"
         x-transition:enter-end="opacity-100 translate-y-0"
         x-transition:leave="transition ease-in duration-150"
         x-transition:leave-end="opacity-0"
         class="fixed bottom-6 left-1/2 -translate-x-1/2 z-[200] flex items-center gap-3 px-5 py-3 rounded-2xl text-sm font-semibold shadow-xl pointer-events-none"
         style="background: var(--ink); color: var(--paper); border: 1px solid rgba(255,255,255,0.08);">
      <span x-text="msg"></span>
    </div>
  </div>

  <div id="root"></div>

  <script>
    var STUDENT_CONTEXT = {
      name:    "<%= jsName %>",
      initial: "<%= initial %>",
      streak:  <%= streak %>,
      xp:      <%= totalXP %>,
      level:   <%= level %>,
      ctx:     "<%= ctx %>"
    };
  </script>

  <script defer src="https://unpkg.com/alpinejs@3.14.3/dist/cdn.min.js"></script>
  <script src="https://unpkg.com/react@18.3.1/umd/react.development.js" crossorigin="anonymous"></script>
  <script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js" crossorigin="anonymous"></script>
  <script src="https://unpkg.com/@babel/standalone@7.29.0/babel.min.js" crossorigin="anonymous"></script>

  <script type="text/babel">
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
      Play:    (p) => <svg width="12" height="12" viewBox="0 0 12 12" fill="none" {...p}><path d="M3.5 2.5V9.5L9.5 6L3.5 2.5Z" fill="currentColor"/></svg>,
      Bolt:    (p) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}><path d="M9 1L3 9H8L7 15L13 7H8L9 1Z" fill="currentColor"/></svg>,
      Trophy:  (p) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}><path d="M5 2H11V7C11 9 9.5 10.5 8 10.5C6.5 10.5 5 9 5 7V2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><path d="M5 3.5H3V5C3 6 3.7 7 5 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M11 3.5H13V5C13 6 12.3 7 11 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M8 10.5V13M6 13.5H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
      Heart:   (p) => <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...p}><path d="M7 12C7 12 1.5 8.5 1.5 5C1.5 3.3 2.8 2 4.5 2C5.5 2 6.5 2.7 7 3.5C7.5 2.7 8.5 2 9.5 2C11.2 2 12.5 3.3 12.5 5C12.5 8.5 7 12 7 12Z" fill="currentColor"/></svg>,
      Target:  (p) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}><circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5"/><circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.5"/><circle cx="8" cy="8" r="1" fill="currentColor"/></svg>,
      Compass: (p) => <svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...p}><circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.6"/><path d="M13.5 6.5L11 11L6.5 13.5L9 9L13.5 6.5Z" fill="currentColor"/></svg>,
      Bell:    (p) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}><path d="M4 7C4 4.8 5.8 3 8 3C10.2 3 12 4.8 12 7V10L13 11.5H3L4 10V7Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><path d="M6.5 12.5C6.5 13.3 7.2 14 8 14C8.8 14 9.5 13.3 9.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
      Search:  (p) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}><circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5"/><path d="M10.5 10.5L13.5 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
      Clock:   (p) => <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...p}><circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.5"/><path d="M7 4V7L9 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
      Tree:    (p) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}><path d="M8 2V14M8 6L11 4M8 6L5 4M8 10L11.5 8M8 10L4.5 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
      Book:    (p) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}><path d="M3 3H7C7.5 3 8 3.5 8 4V13C8 12.5 7.5 12 7 12H3V3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><path d="M13 3H9C8.5 3 8 3.5 8 4V13C8 12.5 8.5 12 9 12H13V3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>,
      Plus:    (p) => <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...p}><path d="M7 3V11M3 7H11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>,
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

    // ── Nav ───────────────────────────────────────────────────────────────────
    const Nav = () => {
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
              <button style={{ width: 36, height: 36, borderRadius: 10, border: '1px solid var(--line)', background: 'var(--paper)', color: 'var(--ink-2)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                <Icon.Bell/>
                <span style={{ position: 'absolute', top: 7, right: 8, width: 7, height: 7, borderRadius: 999, background: 'var(--rose)', border: '1.5px solid var(--paper)' }}/>
              </button>

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

    // ── Greeting ──────────────────────────────────────────────────────────────
    const Greeting = () => (
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
          <div style={{ padding: '16px 20px', borderRadius: 20, background: 'var(--paper)', border: '1px solid var(--line)', boxShadow: 'var(--shadow-sm)', minWidth: 280 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span className="mono" style={{ width: 34, height: 34, borderRadius: 10, background: 'var(--green-soft)', color: 'var(--green-deep)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 14 }}>L{SC.level || 1}</span>
                <div>
                  <div style={{ fontSize: 11, color: 'var(--ink-3)', fontWeight: 600, letterSpacing: '0.04em' }}>CURRENT PATH</div>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>Calculus · Derivatives</div>
                </div>
              </div>
              <a href="#" style={{ fontSize: 12, fontWeight: 600, color: 'var(--blue-deep)' }}>Change ↗</a>
            </div>
            <div style={{ height: 8, borderRadius: 999, background: 'var(--bg-2)', overflow: 'hidden', display: 'flex' }}>
              <div style={{ width: '38%', background: 'var(--green)' }}/><div style={{ width: '14%', background: 'var(--blue)' }}/>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 11, color: 'var(--ink-3)', fontWeight: 600 }}>
              <span><b style={{ color: 'var(--ink)' }}>14</b> of 26 lessons</span><span>Next: Integrals →</span>
            </div>
          </div>
        </div>
      </section>
    );

    // ── Continue card ─────────────────────────────────────────────────────────
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

    const ContinueCard = () => (
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

    // ── Stats row ─────────────────────────────────────────────────────────────
    const StatCardShell = ({ children, accent }) => (
      <div style={{ position: 'relative', padding: 22, borderRadius: 20, background: 'var(--paper)', border: '1px solid var(--line)', boxShadow: 'var(--shadow-sm)', display: 'flex', flexDirection: 'column', minHeight: 188, overflow: 'hidden' }}>
        {accent && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: accent }}/>}
        {children}
      </div>
    );

    const StatLabel = ({ icon, color, label, deep }) => (
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 10px', borderRadius: 999, background: color, color: deep, fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', width: 'fit-content', marginBottom: 14 }}>{icon}{label}</div>
    );

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

    const StatsRow = () => (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-[14px] mt-[18px]">
        <StreakCard/><XPCard/><HeartsCard/><GoalCard/>
      </div>
    );

    // ── Quests ────────────────────────────────────────────────────────────────
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

    const QuestsPanel = () => (
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

    // ── Path snapshot ─────────────────────────────────────────────────────────
    const PathNode = ({ node }) => {
      const isDone = node.status === 'done', isActive = node.status === 'active';
      const fill = isDone ? 'var(--green)' : isActive ? 'var(--paper)' : 'var(--bg-2)';
      const ring = isDone ? 'var(--green-deep)' : isActive ? 'var(--blue)' : 'var(--line)';
      const text = isDone ? 'white' : isActive ? 'var(--blue-deep)' : 'var(--ink-3)';
      return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: 100, position: 'relative' }}>
          <div style={{ position: 'relative' }}>
            {isActive && <div style={{ position: 'absolute', inset: -8, borderRadius: 999, background: 'var(--blue)', opacity: 0.12, animation: 'pulse 2.4s ease-in-out infinite' }}/>}
            <div style={{ width: 64, height: 64, borderRadius: '50%', background: fill, border: `${isActive ? 3 : 2}px solid ${ring}`, borderStyle: node.status === 'locked' ? 'dashed' : 'solid', display: 'flex', alignItems: 'center', justifyContent: 'center', color: text, fontWeight: 700, fontSize: 14, fontFamily: "'JetBrains Mono', monospace", position: 'relative' }}>
              {node.status === 'locked' ? <Icon.Lock/> : isDone ? <Icon.Check/> : node.icon}
            </div>
          </div>
          <div style={{ marginTop: 10, fontSize: 12, fontWeight: 700, color: node.status === 'locked' ? 'var(--ink-3)' : 'var(--ink)', textAlign: 'center' }}>{node.label}</div>
          <div className="mono" style={{ fontSize: 10, color: 'var(--ink-3)', marginTop: 2 }}>{node.lvl}</div>
          {isActive && <span style={{ marginTop: 6, padding: '2px 8px', borderRadius: 999, background: 'var(--blue-soft)', color: 'var(--blue-deep)', fontSize: 10, fontWeight: 700, letterSpacing: '0.04em' }}>YOU ARE HERE</span>}
          <style>{`@keyframes pulse{0%,100%{transform:scale(1);opacity:.12}50%{transform:scale(1.15);opacity:.04}}`}</style>
        </div>
      );
    };

    const PathConnector = ({ from, to }) => {
      const bothDone = from === 'done' && to === 'done', reaching = from === 'done' && to === 'active';
      const stroke = bothDone ? 'var(--green)' : reaching ? 'var(--blue)' : 'var(--line)';
      const dashed = from === 'locked' || to === 'locked';
      return <div style={{ flex: 1, minWidth: 24, height: 2, background: dashed ? 'transparent' : stroke, borderTop: dashed ? `2px dashed ${stroke}` : 'none', marginTop: -38, alignSelf: 'flex-start', transform: 'translateY(32px)' }}/>;
    };

    const PathLegend = ({ color, label, outline }) => (
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
        <span style={{ width: 10, height: 10, borderRadius: 999, background: outline ? 'transparent' : color, border: outline ? `1.5px dashed ${color}` : 'none' }}/>
        {label}
      </div>
    );

    const PathSnapshot = () => {
      const nodes = [
        { id: 'frac',  label: 'Fractions',    lvl: 'L1', status: 'done',   icon: '½'    },
        { id: 'ratio', label: 'Ratios',        lvl: 'L2', status: 'done',   icon: '÷'    },
        { id: 'alg',   label: 'Algebra',       lvl: 'L3', status: 'done',   icon: 'x'    },
        { id: 'geo',   label: 'Geometry',      lvl: 'L4', status: 'done',   icon: '△'    },
        { id: 'der',   label: 'Derivatives',   lvl: 'L8', status: 'active', icon: 'd/dx' },
        { id: 'int',   label: 'Integrals',     lvl: 'L8', status: 'locked', icon: '∫'    },
        { id: 'multi', label: 'Multivariable', lvl: 'L9', status: 'locked', icon: '∂'    },
      ];
      return (
        <div style={{ background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: 24, padding: 24, boxShadow: 'var(--shadow-sm)', position: 'relative', overflow: 'hidden' }}>
          <div className="dot-grid" style={{ position: 'absolute', inset: 0, opacity: 0.5 }}/>
          <div style={{ position: 'relative', zIndex: 2 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <h3 style={{ margin: 0, fontSize: 20, fontWeight: 700, letterSpacing: '-0.015em' }}>Your path</h3>
                  <span style={{ padding: '3px 8px', borderRadius: 999, background: 'var(--green-soft)', color: 'var(--green-deep)', fontSize: 11, fontWeight: 700, letterSpacing: '0.04em' }}>4 / 11 NODES</span>
                </div>
                <p style={{ margin: 0, fontSize: 13, color: 'var(--ink-3)' }}>A slice of the skill tree, centered on where you are right now.</p>
              </div>
              <a href="#" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, color: 'var(--blue-deep)' }}>Open full tree <Icon.Arrow/></a>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 0, padding: '24px 8px 8px', overflowX: 'auto' }}>
              {nodes.map((n, i) => (
                <React.Fragment key={n.id}>
                  <PathNode node={n}/>
                  {i < nodes.length - 1 && <PathConnector from={n.status} to={nodes[i+1].status}/>}
                </React.Fragment>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 14, fontSize: 11, color: 'var(--ink-3)', marginTop: 12, justifyContent: 'center' }}>
              <PathLegend color="var(--green)" label="Mastered"/>
              <PathLegend color="var(--blue)"  label="In progress"/>
              <PathLegend color="var(--ink-3)" label="Locked" outline/>
            </div>
          </div>
        </div>
      );
    };

    // ── Social row ────────────────────────────────────────────────────────────
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

    const AchievementsCard = () => {
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

    const LeaderRow = ({ rank, name, xp, color, me, delta }) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', borderRadius: 10, background: me ? 'var(--green-soft)' : 'transparent', border: me ? '1px solid var(--green)' : '1px solid transparent' }}>
        <div className="mono" style={{ width: 22, fontSize: 12, fontWeight: 700, color: 'var(--ink-3)', textAlign: 'center' }}>{rank}</div>
        <Avatar letter={name[0]} color={color} size={28}/>
        <div style={{ flex: 1, fontSize: 14, fontWeight: me ? 700 : 600 }}>{name}</div>
        <span style={{ fontSize: 11, color: 'var(--ink-3)', fontFamily: "'JetBrains Mono', monospace" }}>{delta}</span>
        <span style={{ fontSize: 13, fontWeight: 700 }}>{xp.toLocaleString()} <span style={{ fontSize: 11, color: 'var(--ink-3)', fontWeight: 500 }}>XP</span></span>
      </div>
    );

    const SocialRow = () => {
      const leaderRows = [
        { rank: 1, name: 'Ava L.',          xp: 2410,          color: 'var(--amber)', delta: '↑1' },
        { rank: 2, name: SC.name || 'You',  xp: SC.xp || 1284, color: 'var(--green)', me: true, delta: '↑3' },
        { rank: 3, name: 'Kai O.',           xp: 1190,          color: 'var(--blue)',  delta: '↓1' },
        { rank: 4, name: 'Jordan P.',        xp: 980,           color: 'var(--plum)',  delta: '—'  },
        { rank: 5, name: 'Sam R.',           xp: 870,           color: 'var(--ink-2)', delta: '↓2' },
      ];
      return (
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-[18px] mt-[18px]">
          <AchievementsCard/>
          <div style={{ background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: 24, padding: 24, boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <h3 style={{ margin: 0, fontSize: 20, fontWeight: 700, letterSpacing: '-0.015em' }}>Class league</h3>
                  <span style={{ padding: '3px 8px', borderRadius: 999, background: 'var(--plum-soft)', color: 'var(--plum)', fontSize: 11, fontWeight: 700, letterSpacing: '0.04em' }}>EMERALD · WK 21</span>
                </div>
                <p style={{ margin: 0, fontSize: 13, color: 'var(--ink-3)' }}>Top 3 promote on Sunday. Bottom 3 demote.</p>
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {leaderRows.map((r) => <LeaderRow key={r.rank} {...r}/>)}
            </div>
            <button style={{ marginTop: 14, width: '100%', padding: 10, borderRadius: 10, border: '1px solid var(--line)', background: 'var(--bg)', color: 'var(--ink-2)', fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
              See full league →
            </button>
          </div>
        </div>
      );
    };

    // ── App ───────────────────────────────────────────────────────────────────
    const App = () => (
      <div>
        <Nav/>
        <main className="px-4 sm:px-6 lg:px-7 pb-20" style={{ maxWidth: 1280, margin: '0 auto' }}>
          <Greeting/>
          <ContinueCard/>
          <StatsRow/>
          <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-[18px] mt-[18px]">
            <PathSnapshot/><QuestsPanel/>
          </div>
          <SocialRow/>
          <div style={{ marginTop: 40, paddingTop: 24, borderTop: '1px solid var(--line)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 12, color: 'var(--ink-3)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Logo/><span>Mathify · v2.4 · last sync 2m ago</span></div>
            <div style={{ display: 'flex', gap: 18 }}>
              <a href="#" style={{ color: 'var(--ink-3)' }}>Help</a>
              <a href="#" style={{ color: 'var(--ink-3)' }}>Settings</a>
              <a href="#" style={{ color: 'var(--ink-3)' }}>What's new</a>
            </div>
          </div>
        </main>
      </div>
    );

    ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
  </script>

</body>
</html>
