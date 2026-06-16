import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

// firebase compat SDK is loaded globally by the JSP shell
const firebase = window.firebase;

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
        <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', height: '100%' }}>
          <a href={PAGE_CTX + '/'} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, color: 'white', marginBottom: 48 }}>
            <Logo/>
            <span style={{ fontWeight: 800, fontSize: 20, letterSpacing: '-0.015em' }}>Mathify</span>
          </a>
          <div style={{ flex: 1 }}>
            <h2 style={{ color: 'white', fontSize: 'clamp(26px,3vw,38px)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.1, margin: '0 0 16px', maxWidth: 380 }}>
              Your math journey{' '}
              <span className="serif" style={{ fontWeight: 500 }}>starts today</span>.
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 15, lineHeight: 1.6, maxWidth: 360, margin: '0 0 36px' }}>
              From 2+2 to real analysis. Structured courses, daily streaks, and a community of learners.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, maxWidth: 360 }}>
              {[
                { num: '248', label: 'courses' },
                { num: '12k+', label: 'students' },
                { num: '5 levels', label: 'free forever' },
                { num: '4.9★', label: 'avg rating' },
              ].map((s) => (
                <div key={s.label} style={{ padding: '14px 16px', borderRadius: 14, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.18)' }}>
                  <div style={{ color: 'white', fontWeight: 800, fontSize: 22, letterSpacing: '-0.02em', lineHeight: 1 }}>{s.num}</div>
                  <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: 12, marginTop: 4 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="auth-streak" style={{ marginTop: 36 }}>
            <div className="auth-streak__flame">
              <Icon.Flame style={{ width: 20, height: 20 }}/>
            </div>
            <div>
              <div style={{ color: 'white', fontWeight: 700, fontSize: 15 }}>First 5 levels free</div>
              <div style={{ color: 'rgba(255,255,255,0.65)', fontSize: 12, marginTop: 2 }}>No credit card needed</div>
            </div>
            <div className="auth-stars">
              {[1,2,3,4,5].map((i) => <Icon.Star key={i} style={{ width: 13, height: 13 }}/>)}
            </div>
          </div>
        </div>
      </div>
    );

    // ── Field ──────────────────────────────────────────────────────────────────
    const Field = ({ id, label, children }) => (
      <div className="auth-field">
        <label className="auth-field__label" htmlFor={id}>{label}</label>
        {children}
      </div>
    );

    // ── Password Input ─────────────────────────────────────────────────────────
    const PasswordInput = ({ id, name, value, onChange, placeholder, autoComplete }) => {
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
            autoComplete={autoComplete || 'new-password'}
          />
          <button type="button" className="auth-eye" onClick={() => setShow(!show)} aria-label={show ? 'Hide password' : 'Show password'}>
            {show ? <Icon.EyeOff/> : <Icon.Eye/>}
          </button>
        </div>
      );
    };

    // ── Strength Meter ─────────────────────────────────────────────────────────
    const StrengthMeter = ({ password }) => {
      const getStrength = (p) => {
        if (!p) return 0;
        let s = 0;
        if (p.length >= 8)            s++;
        if (/[A-Z]/.test(p))          s++;
        if (/[0-9]/.test(p))          s++;
        if (/[^A-Za-z0-9]/.test(p))   s++;
        return s;
      };
      const strength = getStrength(password);
      const colors   = ['var(--line)', 'var(--rose)', 'var(--amber)', 'var(--blue)', 'var(--green)'];
      const labels   = ['', 'Weak', 'Fair', 'Good', 'Strong'];
      const barColor = colors[strength];
      return (
        <div>
          <div className="auth-strength">
            {[1,2,3,4].map((n) => (
              <span key={n} style={{ background: n <= strength ? barColor : 'var(--line)' }}/>
            ))}
          </div>
          {password.length > 0 && (
            <div style={{ fontSize: 11, fontWeight: 600, color: barColor, marginTop: 4 }}>{labels[strength]}</div>
          )}
        </div>
      );
    };

    // ── Divider ────────────────────────────────────────────────────────────────
    const Divider = () => <div className="auth-divider">or</div>;

    // ── Firebase error code → human message ────────────────────────────────────
    const friendlyError = (code) => ({
      'auth/email-already-in-use':   'An account with that email already exists.',
      'auth/weak-password':          'Password must be at least 6 characters.',
      'auth/invalid-email':          'Please enter a valid email address.',
      'auth/too-many-requests':      'Too many attempts — please wait a moment.',
      'auth/network-request-failed': 'Network error — check your connection.',
    }[code] || 'Registration failed. Please try again.');

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

    // ── Register ───────────────────────────────────────────────────────────────
    const Register = () => {
      const [name, setName]         = React.useState('');
      const [email, setEmail]       = React.useState('');
      const [password, setPassword] = React.useState('');
      const [agree, setAgree]       = React.useState(false);
      const [error, setError]       = React.useState('');
      const [loading, setLoading]   = React.useState(false);

      const handleSubmit = async (e) => {
        e.preventDefault();
        if (!agree) { setError('Please accept the Terms and Privacy Policy.'); return; }
        setError(''); setLoading(true);
        try {
          const cred = await firebase.auth().createUserWithEmailAndPassword(email, password);
          // Store display name in Firebase profile
          await cred.user.updateProfile({ displayName: name });
          const idToken = await cred.user.getIdToken();
          postTokenToServlet('/register', idToken);
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
          postTokenToServlet('/register', idToken);
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
                <span className="tag">FREE FOREVER</span>
                First 5 levels, no card
              </div>
              <h1 className="auth-title">Create your account</h1>
              <p className="auth-sub">Start your streak today — from 2+2 to real analysis.</p>

              {error && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', borderRadius: 12, background: 'var(--rose-soft)', border: '1px solid var(--rose)', color: 'var(--rose)', fontSize: 13, fontWeight: 600, marginBottom: 4 }}>
                  <span style={{ flexShrink: 0 }}>⚠</span> {error}
                </div>
              )}

              <form className="auth-form" onSubmit={handleSubmit}>
                <Field id="name" label="Full name">
                  <div className="auth-field__wrap">
                    <input
                      id="name" type="text" className="auth-input"
                      placeholder="Your full name"
                      value={name} onChange={(e) => setName(e.target.value)}
                      autoComplete="name" required
                    />
                  </div>
                </Field>

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

                <Field id="password" label="Password">
                  <PasswordInput
                    id="password" value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a password"
                    autoComplete="new-password"
                  />
                  <StrengthMeter password={password}/>
                </Field>

                <label className="auth-check" htmlFor="agree">
                  <input id="agree" type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)}/>
                  <span className="auth-check__box"><Icon.Check/></span>
                  <span>I agree to the <a href="#" className="auth-link">Terms</a> and <a href="#" className="auth-link">Privacy Policy</a>.</span>
                </label>

                <button type="submit" className="auth-submit" disabled={!agree || loading} style={{ opacity: agree && !loading ? 1 : 0.55 }}>
                  {loading ? 'Creating account…' : <><span>Create account</span> <Icon.Arrow/></>}
                </button>
              </form>

              <Divider/>
              <button type="button" className="auth-google" onClick={handleGoogle} disabled={loading}>
                <GoogleG/>
                Sign up with Google
              </button>

              <p className="auth-foot">
                Already have an account?{' '}
                <a href={PAGE_CTX + '/login'} className="auth-link">Sign in</a>
              </p>
            </div>
          </div>
        </div>
      );
    };

    createRoot(document.getElementById('root')).render(<Register/>);
