<%@ page contentType="text/html;charset=UTF-8" language="java" isELIgnored="true" %>
<%
    String ctx           = request.getContextPath();
    String fbApiKey      = System.getenv("FIREBASE_API_KEY");            if (fbApiKey      == null) fbApiKey      = "";
    String fbAuthDomain  = System.getenv("FIREBASE_AUTH_DOMAIN");        if (fbAuthDomain  == null) fbAuthDomain  = "";
    String fbProjectId   = System.getenv("FIREBASE_PROJECT_ID");         if (fbProjectId   == null) fbProjectId   = "";
    String fbBucket      = System.getenv("FIREBASE_STORAGE_BUCKET");     if (fbBucket      == null) fbBucket      = "";
    String fbSenderId    = System.getenv("FIREBASE_MESSAGING_SENDER_ID");if (fbSenderId    == null) fbSenderId    = "";
    String fbAppId       = System.getenv("FIREBASE_APP_ID");             if (fbAppId       == null) fbAppId       = "";
%>
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>Mathify — Sign in</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&family=Fraunces:opsz,wght@9..144,500;9..144,600&display=swap" rel="stylesheet">
<script src="https://cdn.tailwindcss.com"></script>
<script>tailwind.config = { theme: { extend: {} } };</script>
<style>
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
  /* Layout */
  .auth { min-height:100vh; display:grid; grid-template-columns:1.05fr 1fr; }
  .auth-brand { position:relative; overflow:hidden; padding:44px 48px; background:radial-gradient(120% 80% at 80% 0%,#2aa06c 0%,var(--green) 42%,var(--green-deep) 100%); display:flex; flex-direction:column; }
  .auth-form-col { display:flex; align-items:center; justify-content:center; padding:48px 40px; }
  .auth-card { width:100%; max-width:420px; }
  /* Brand panel */
  .auth-streak { display:flex; align-items:center; gap:14px; padding:16px 18px; border-radius:18px; background:rgba(255,255,255,.12); border:1px solid rgba(255,255,255,.22); backdrop-filter:blur(6px); }
  .auth-streak__flame { width:42px; height:42px; flex:none; border-radius:12px; background:var(--amber); color:var(--amber-deep); display:inline-flex; align-items:center; justify-content:center; box-shadow:0 2px 0 rgba(140,91,18,.5); }
  .auth-stars { margin-left:auto; display:inline-flex; align-items:center; color:var(--amber); }
  /* Form */
  .auth-eyebrow { display:inline-flex; align-items:center; gap:8px; padding:5px 12px 5px 6px; border-radius:999px; background:var(--paper); border:1px solid var(--line); box-shadow:var(--shadow-sm); font-size:12px; font-weight:600; color:var(--ink-2); margin-bottom:22px; }
  .auth-eyebrow .tag { padding:3px 9px; border-radius:999px; background:var(--green-soft); color:var(--green-deep); font-weight:700; font-size:10px; letter-spacing:.05em; }
  .auth-title { font-size:clamp(28px,3.4vw,36px); font-weight:700; letter-spacing:-.03em; line-height:1.05; margin:0 0 10px; color:var(--ink); }
  .auth-sub { font-size:15px; color:var(--ink-2); margin:0 0 28px; line-height:1.5; }
  .auth-form { display:flex; flex-direction:column; gap:16px; }
  .auth-field { display:flex; flex-direction:column; gap:7px; }
  .auth-field__row { display:flex; align-items:baseline; justify-content:space-between; }
  .auth-field__label { font-size:13px; font-weight:600; color:var(--ink-2); }
  .auth-field__wrap { position:relative; display:flex; align-items:center; }
  .auth-input { width:100%; padding:14px 15px; border-radius:13px; border:1.5px solid var(--line); background:var(--paper); color:var(--ink); font-size:15px; font-family:inherit; transition:border-color .15s,box-shadow .15s,background .15s; }
  .auth-input::placeholder { color:var(--ink-3); opacity:.7; }
  .auth-input:hover { border-color:#d8cfb6; }
  .auth-input:focus { outline:none; border-color:var(--green); background:#fff; box-shadow:0 0 0 4px var(--green-soft); }
  .auth-field__wrap:has(.auth-eye) .auth-input { padding-right:46px; }
  .auth-eye { position:absolute; right:8px; width:32px; height:32px; display:inline-flex; align-items:center; justify-content:center; border:none; background:transparent; cursor:pointer; color:var(--ink-3); border-radius:8px; transition:color .15s,background .15s; }
  .auth-eye:hover { color:var(--ink); background:var(--bg-2); }
  .auth-submit { margin-top:4px; display:inline-flex; align-items:center; justify-content:center; gap:8px; width:100%; padding:15px 22px; border-radius:14px; border:none; background:var(--green); color:#fff; font-size:16px; font-weight:700; cursor:pointer; box-shadow:0 2px 0 var(--green-deep),0 12px 24px -8px rgba(31,138,91,.5); transition:transform .12s,box-shadow .12s,background .15s; }
  .auth-submit:hover { background:#1b7d52; }
  .auth-submit:active { transform:translateY(2px); }
  .auth-google { display:inline-flex; align-items:center; justify-content:center; gap:10px; width:100%; padding:14px 22px; border-radius:14px; border:1.5px solid var(--line); background:var(--paper); color:var(--ink); font-size:15px; font-weight:600; cursor:pointer; box-shadow:var(--shadow-sm); transition:border-color .15s,background .15s,transform .12s; }
  .auth-google:hover { border-color:#d8cfb6; background:#fff; }
  .auth-divider { display:flex; align-items:center; gap:14px; margin:22px 0; color:var(--ink-3); font-size:12px; font-weight:600; letter-spacing:.06em; text-transform:uppercase; }
  .auth-divider::before,.auth-divider::after { content:""; flex:1; height:1px; background:var(--line); }
  .auth-link { color:var(--green-deep); font-weight:600; text-decoration:none; }
  .auth-link:hover { text-decoration:underline; }
  .auth-foot { margin-top:26px; text-align:center; font-size:14px; color:var(--ink-2); }
  .auth-mini-logo { display:none; align-items:center; gap:9px; margin-bottom:26px; }
  .auth-mini-logo span { font-weight:800; font-size:18px; letter-spacing:-.01em; }
  @media(max-width:880px){ .auth{grid-template-columns:1fr} .auth-brand{display:none} .auth-form-col{padding:40px 24px;min-height:100vh} .auth-mini-logo{display:inline-flex} }
  @keyframes drift {
    0%   { transform: translateY(0px)   rotate(0deg);   opacity: .18; }
    50%  { transform: translateY(-28px) rotate(8deg);   opacity: .28; }
    100% { transform: translateY(0px)   rotate(0deg);   opacity: .18; }
  }
</style>
</head>
<body>
  <div id="root"></div>

  <script>
    var PAGE_CTX = "<%= ctx %>";
    var FIREBASE_CONFIG = {
      apiKey:            "<%= fbApiKey %>",
      authDomain:        "<%= fbAuthDomain %>",
      projectId:         "<%= fbProjectId %>",
      storageBucket:     "<%= fbBucket %>",
      messagingSenderId: "<%= fbSenderId %>",
      appId:             "<%= fbAppId %>"
    };
  </script>

  <!-- Firebase compat SDK (must load before Babel/React) -->
  <script src="https://www.gstatic.com/firebasejs/10.14.1/firebase-app-compat.js"></script>
  <script src="https://www.gstatic.com/firebasejs/10.14.1/firebase-auth-compat.js"></script>
  <script>
    if (FIREBASE_CONFIG.apiKey) firebase.initializeApp(FIREBASE_CONFIG);
  </script>

  <script src="https://cdn.tailwindcss.com"></script>
  <script defer src="https://unpkg.com/alpinejs@3.14.3/dist/cdn.min.js"></script>
  <script src="https://unpkg.com/react@18.3.1/umd/react.development.js" crossorigin="anonymous"></script>
  <script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js" crossorigin="anonymous"></script>
  <script src="https://unpkg.com/@babel/standalone@7.29.0/babel.min.js" crossorigin="anonymous"></script>

  <script type="text/babel">
    const PAGE_CTX = window.PAGE_CTX || '';

    // ── Icons ──────────────────────────────────────────────────────────────────
    const Icon = {
      Arrow:  (p) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}><path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
      Check:  (p) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}><path d="M3 8.5L6.5 12L13 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
      Eye:    (p) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}><ellipse cx="8" cy="8" rx="6" ry="4" stroke="currentColor" strokeWidth="1.5"/><circle cx="8" cy="8" r="2" fill="currentColor"/></svg>,
      EyeOff: (p) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}><path d="M2 2L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M6.5 6.6C6.2 6.9 6 7.4 6 8C6 9.1 6.9 10 8 10C8.6 10 9.1 9.8 9.4 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M4.4 4.5C3 5.3 2 6.5 2 8C2 9.7 3.4 11.1 5.2 11.8M8 5C8.1 5 8.2 5 8.3 5C9.8 5.2 11 6.4 11 8C11 8.3 10.9 8.7 10.8 9M10.5 10.2C11.6 9.5 12.8 8.4 14 8C13.3 6.1 11.8 5 10 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
      Flame:  (p) => <svg width="18" height="18" viewBox="0 0 18 18" fill="none" {...p}><path d="M9 2C9 5 6 5.5 6 9C6 11.5 7.5 13.5 9 13.5C10.5 13.5 12 11.5 12 9C12 7 11 6 11 4C12 5 13 6.5 13 9C13 12 11.2 14.5 9 14.5C6.8 14.5 5 12.5 5 9.5C5 6 9 5 9 2Z" fill="currentColor"/></svg>,
      Star:   (p) => <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...p}><path d="M7 1.5L8.7 5L12.5 5.55L9.75 8.2L10.4 12L7 10.2L3.6 12L4.25 8.2L1.5 5.55L5.3 5Z" fill="currentColor"/></svg>,
    };

    // ── Logo ───────────────────────────────────────────────────────────────────
    const Logo = () => (
      <svg width="36" height="36" viewBox="0 0 32 32" fill="none">
        <rect x="1.5" y="1.5" width="29" height="29" rx="9" fill="var(--green)"/>
        <rect x="1.5" y="1.5" width="29" height="29" rx="9" stroke="var(--green-deep)" strokeWidth="1.5"/>
        <path d="M8 22V10L13 18L18 10V22" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="22" cy="11" r="2" fill="var(--amber)"/>
      </svg>
    );

    // ── Google G ───────────────────────────────────────────────────────────────
    const GoogleG = () => (
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
        <path d="M17.64 9.2C17.64 8.57 17.58 7.96 17.47 7.36H9V10.84H13.84C13.63 11.97 12.99 12.92 12.04 13.57V15.82H14.96C16.66 14.25 17.64 11.93 17.64 9.2Z" fill="#4285F4"/>
        <path d="M9 18C11.43 18 13.47 17.19 14.96 15.82L12.04 13.57C11.23 14.1 10.21 14.42 9 14.42C6.66 14.42 4.67 12.84 3.96 10.71H0.96V13.03C2.44 15.98 5.48 18 9 18Z" fill="#34A853"/>
        <path d="M3.96 10.71C3.78 10.18 3.68 9.6 3.68 9C3.68 8.4 3.78 7.82 3.96 7.29V4.97H0.96C0.35 6.17 0 7.55 0 9C0 10.45 0.35 11.83 0.96 13.03L3.96 10.71Z" fill="#FBBC05"/>
        <path d="M9 3.58C10.32 3.58 11.5 4.04 12.44 4.93L15.02 2.34C13.47 0.89 11.43 0 9 0C5.48 0 2.44 2.02 0.96 4.97L3.96 7.29C4.67 5.16 6.66 3.58 9 3.58Z" fill="#EA4335"/>
      </svg>
    );

    // ── Floating Math Glyphs ───────────────────────────────────────────────────
    const FloatingGlyphs = () => {
      const glyphs = [
        { sym: '∫', x: 12, y: 18, size: 48, delay: 0   },
        { sym: 'π', x: 78, y: 30, size: 36, delay: 1.2 },
        { sym: '√', x: 55, y: 65, size: 40, delay: 2.4 },
        { sym: '∑', x: 30, y: 78, size: 32, delay: 0.8 },
        { sym: 'x²',x: 88, y: 70, size: 28, delay: 1.8 },
        { sym: 'θ', x: 65, y: 12, size: 34, delay: 3.0 },
      ];
      return (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
          {glyphs.map((g, i) => (
            <span key={i} className="serif" style={{
              position: 'absolute',
              left: g.x + '%',
              top:  g.y + '%',
              fontSize: g.size,
              color: 'white',
              opacity: 0.18,
              fontWeight: 600,
              animation: 'drift 6s ease-in-out infinite',
              animationDelay: g.delay + 's',
            }}>{g.sym}</span>
          ))}
        </div>
      );
    };

    // ── Brand Panel ────────────────────────────────────────────────────────────
    const BrandPanel = () => (
      <div className="auth-brand">
        <FloatingGlyphs/>
        <div style={{ position: 'relative', zIndex: 2 }}>
          <a href={PAGE_CTX + '/'} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, color: 'white', marginBottom: 48 }}>
            <Logo/>
            <span style={{ fontWeight: 800, fontSize: 20, letterSpacing: '-0.015em' }}>Mathify</span>
          </a>
          <div style={{ flex: 1 }}>
            <h2 style={{ color: 'white', fontSize: 'clamp(26px,3vw,38px)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.1, margin: '0 0 16px', maxWidth: 380 }}>
              Pick up your streak{' '}
              <span className="serif" style={{ fontWeight: 500 }}>where you left off</span>.
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 15, lineHeight: 1.6, maxWidth: 360, margin: '0 0 36px' }}>
              Your lessons, your pace — Mathify remembers every step of the way.
            </p>
          </div>
          <div className="auth-streak">
            <div className="auth-streak__flame">
              <Icon.Flame style={{ width: 20, height: 20 }}/>
            </div>
            <div>
              <div style={{ color: 'white', fontWeight: 700, fontSize: 15 }}>12-day streak</div>
              <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: 12, marginTop: 2 }}>Keep it going — log in to continue</div>
            </div>
            <div className="auth-stars">
              {[1,2,3,4,5].map((i) => <Icon.Star key={i} style={{ width: 13, height: 13 }}/>)}
            </div>
          </div>
          <div style={{ marginTop: 20, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {['Calculus', 'Linear Algebra', 'Probability', 'Number Theory'].map((t) => (
              <span key={t} style={{ padding: '5px 12px', borderRadius: 999, background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', fontSize: 12, fontWeight: 600 }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    );

    // ── Field ──────────────────────────────────────────────────────────────────
    const Field = ({ id, label, aside, children }) => (
      <div className="auth-field">
        <div className="auth-field__row">
          <label className="auth-field__label" htmlFor={id}>{label}</label>
          {aside}
        </div>
        {children}
      </div>
    );

    // ── Password Input ─────────────────────────────────────────────────────────
    const PasswordInput = ({ id, name, value, onChange, placeholder }) => {
      const [show, setShow] = React.useState(false);
      return (
        <div className="auth-field__wrap">
          <input
            id={id} name={name}
            type={show ? 'text' : 'password'}
            className="auth-input"
            placeholder={placeholder || 'Password'}
            value={value}
            onChange={onChange}
            autoComplete="current-password"
          />
          <button type="button" className="auth-eye" onClick={() => setShow(!show)} aria-label={show ? 'Hide password' : 'Show password'}>
            {show ? <Icon.EyeOff/> : <Icon.Eye/>}
          </button>
        </div>
      );
    };

    // ── Divider ────────────────────────────────────────────────────────────────
    const Divider = () => <div className="auth-divider">or</div>;

    // ── Firebase error code → human message ────────────────────────────────────
    const friendlyError = (code) => ({
      'auth/user-not-found':      'No account found with that email.',
      'auth/wrong-password':      'Incorrect password. Try again.',
      'auth/invalid-credential':  'Invalid email or password.',
      'auth/too-many-requests':   'Too many attempts — please wait a moment.',
      'auth/user-disabled':       'This account has been disabled.',
      'auth/invalid-email':       'Please enter a valid email address.',
      'auth/network-request-failed': 'Network error — check your connection.',
    }[code] || 'Sign in failed. Please try again.');

    // Submits idToken to servlet via a hidden form (lets browser handle the redirect)
    const postTokenToServlet = (route, idToken) => {
      const form  = document.createElement('form');
      form.method = 'POST';
      form.action = PAGE_CTX + route;
      const inp   = document.createElement('input');
      inp.type    = 'hidden';
      inp.name    = 'idToken';
      inp.value   = idToken;
      form.appendChild(inp);
      document.body.appendChild(form);
      form.submit();
    };

    // ── Login ──────────────────────────────────────────────────────────────────
    const Login = () => {
      const [email, setEmail]       = React.useState('');
      const [password, setPassword] = React.useState('');
      const [error, setError]       = React.useState('');
      const [loading, setLoading]   = React.useState(false);

      const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); setLoading(true);
        try {
          const cred    = await firebase.auth().signInWithEmailAndPassword(email, password);
          const idToken = await cred.user.getIdToken();
          postTokenToServlet('/login', idToken);
        } catch (err) {
          setError(friendlyError(err.code));
          setLoading(false);
        }
      };

      const handleGoogle = async () => {
        setError(''); setLoading(true);
        try {
          const cred    = await firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider());
          const idToken = await cred.user.getIdToken();
          postTokenToServlet('/login', idToken);
        } catch (err) {
          if (err.code !== 'auth/popup-closed-by-user') setError(friendlyError(err.code));
          setLoading(false);
        }
      };

      return (
        <div className="auth">
          <BrandPanel/>
          <div className="auth-form-col">
            <div className="auth-card">
              <div className="auth-mini-logo">
                <Logo/>
                <span>Mathify</span>
              </div>
              <div className="auth-eyebrow">
                <span className="tag">WELCOME BACK</span>
                Sign back in
              </div>
              <h1 className="auth-title">Sign in to Mathify</h1>
              <p className="auth-sub">Continue your streak and pick up exactly where you stopped.</p>

              {error && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', borderRadius: 12, background: 'var(--rose-soft)', border: '1px solid var(--rose)', color: 'var(--rose)', fontSize: 13, fontWeight: 600, marginBottom: 4 }}>
                  <span style={{ flexShrink: 0 }}>⚠</span> {error}
                </div>
              )}

              <form className="auth-form" onSubmit={handleSubmit}>
                <Field id="email" label="Email">
                  <div className="auth-field__wrap">
                    <input
                      id="email" type="email" className="auth-input"
                      placeholder="you@example.com"
                      value={email} onChange={(e) => setEmail(e.target.value)}
                      autoComplete="email" required
                    />
                  </div>
                </Field>

                <Field
                  id="password" label="Password"
                  aside={<a href="#" className="auth-link" style={{ fontSize: 12 }}>Forgot?</a>}
                >
                  <PasswordInput
                    id="password" value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Your password"
                  />
                </Field>

                <button type="submit" className="auth-submit" disabled={loading}>
                  {loading ? 'Signing in…' : <><span>Sign in</span> <Icon.Arrow/></>}
                </button>
              </form>

              <Divider/>
              <button type="button" className="auth-google" onClick={handleGoogle} disabled={loading}>
                <GoogleG/>
                Sign in with Google
              </button>

              <p className="auth-foot">
                New to Mathify?{' '}
                <a href={PAGE_CTX + '/register'} className="auth-link">Create an account</a>
              </p>
            </div>
          </div>
        </div>
      );
    };

    ReactDOM.createRoot(document.getElementById('root')).render(<Login/>);
  </script>
</body>
</html>
