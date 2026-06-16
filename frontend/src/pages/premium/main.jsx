import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

// Page context injected by the JSP shell as window.PAGE_CTX.
const PC = window.PAGE_CTX || {};
const base = PC.ctx || '';

// ── Icons ─────────────────────────────────────────────────────────────────
const Icon = {
  Check:   (p) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}><path d="M3 8.5L6.5 12L13 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  Arrow:   (p) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}><path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  Star:    (p) => <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...p}><path d="M7 1.5L8.7 5L12.5 5.55L9.75 8.2L10.4 12L7 10.2L3.6 12L4.25 8.2L1.5 5.55L5.3 5Z" fill="currentColor"/></svg>,
  Sparkle: (p) => <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...p}><path d="M7 1L8 6L13 7L8 8L7 13L6 8L1 7L6 6Z" fill="currentColor"/></svg>,
  Crown:   (p) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}><path d="M2 11L4 6L8 10L12 6L14 11H2Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/><path d="M1.5 13H14.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/><circle cx="2" cy="5.5" r="1.2" fill="currentColor"/><circle cx="14" cy="5.5" r="1.2" fill="currentColor"/><circle cx="8" cy="4" r="1.2" fill="currentColor"/></svg>,
  Bolt:    (p) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}><path d="M9 1L3 9H8L7 15L13 7H8L9 1Z" fill="currentColor"/></svg>,
  Book:    (p) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}><path d="M3 3H7C7.5 3 8 3.5 8 4V13C8 12.5 7.5 12 7 12H3V3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><path d="M13 3H9C8.5 3 8 3.5 8 4V13C8 12.5 8.5 12 9 12H13V3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>,
  Compass: (p) => <svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...p}><circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.6"/><path d="M13.5 6.5L11 11L6.5 13.5L9 9L13.5 6.5Z" fill="currentColor"/></svg>,
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

const Avatar = ({ letter, size = 32 }) => (
  <div style={{ width: size, height: size, borderRadius: 999, background: 'var(--green)', color: 'white', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: size * 0.42, flexShrink: 0 }}>{letter}</div>
);

// ── Nav ───────────────────────────────────────────────────────────────────
const Nav = () => {
  const [open, setOpen] = React.useState(false);
  const items = [
    { label: 'Today',   icon: <Icon.Compass/>, href: base + '/dashboard' },
    { label: 'Library', icon: <Icon.Book/>,    href: base + '/library' },
  ];
  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(251,248,241,0.88)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', borderBottom: '1px solid var(--line)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, maxWidth: 1100, margin: '0 auto', padding: '0 24px', height: 60 }}>
        <a href={base + '/dashboard'} style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
          <Logo/>
          <span style={{ fontWeight: 700, fontSize: 18, letterSpacing: '-0.01em' }} className="hidden sm:inline">Mathify</span>
        </a>
        <nav style={{ display: 'flex', alignItems: 'center', gap: 4, marginLeft: 8 }} className="hidden sm:flex">
          {items.map(item => (
            <a key={item.label} href={item.href}
               style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '7px 13px', borderRadius: 10, fontWeight: 600, fontSize: 14, color: 'var(--ink-2)', textDecoration: 'none' }}>
              <span style={{ opacity: 0.65, display: 'inline-flex' }}>{item.icon}</span>
              <span className="hidden lg:inline">{item.label}</span>
            </a>
          ))}
        </nav>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginLeft: 'auto' }}>
          <button style={{ width: 36, height: 36, borderRadius: 10, border: '1px solid var(--line)', background: 'var(--paper)', color: 'var(--ink-2)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            <Icon.Bell/>
            <span style={{ position: 'absolute', top: 7, right: 8, width: 7, height: 7, borderRadius: 999, background: 'var(--rose)', border: '1.5px solid var(--paper)' }}/>
          </button>
          <a href={base + '/dashboard'} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 10px 4px 4px', borderRadius: 999, border: '1px solid var(--line)', background: 'var(--paper)', textDecoration: 'none' }}>
            <Avatar letter={PC.initial || 'S'} size={28}/>
            <span className="hidden sm:inline" style={{ fontSize: 13, fontWeight: 600, color: 'var(--ink)' }}>{PC.name || 'Student'}</span>
          </a>
          <button className="sm:hidden" onClick={() => setOpen(o => !o)}
                  style={{ width: 36, height: 36, borderRadius: 10, border: '1px solid var(--line)', background: 'var(--paper)', color: 'var(--ink-2)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
            {open ? <Icon.Close/> : <Icon.Menu/>}
          </button>
        </div>
      </div>
      {open && (
        <div className="sm:hidden" style={{ borderTop: '1px solid var(--line)', background: 'rgba(251,248,241,0.97)', padding: '10px 16px 16px' }}>
          {items.map(item => (
            <a key={item.label} href={item.href}
               style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px', borderRadius: 10, fontSize: 14, fontWeight: 600, color: 'var(--ink-2)' }}>
              {item.icon}{item.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
};

// ── Plan definitions ──────────────────────────────────────────────────────
const PLANS = [
  {
    id: 'FREE',
    label: 'Free',
    price: 'Rp 0',
    period: 'forever',
    description: 'Great for getting started with the basics.',
    color: 'ink',
    accent: 'var(--ink-3)',
    accentBg: 'var(--bg-2)',
    recommended: false,
    checkoutUrl: null,
    features: [
      { text: '3 starter courses',             included: true },
      { text: 'Basic progress tracking',        included: true },
      { text: 'Community forum access',         included: true },
      { text: 'Mobile-friendly interface',      included: true },
      { text: 'Full course library (50+ courses)', included: false },
      { text: 'Completion certificates',        included: false },
      { text: 'Priority support',               included: false },
      { text: 'Advanced analytics',             included: false },
      { text: 'Downloadable resources',         included: false },
    ],
  },
  {
    id: 'MONTHLY',
    label: 'Monthly',
    price: 'Rp 120.000',
    period: 'per month',
    description: 'Full access, billed monthly. Cancel anytime.',
    color: 'blue',
    accent: 'var(--blue)',
    accentBg: 'var(--blue-soft)',
    recommended: false,
    checkoutUrl: base + '/checkout?plan=MONTHLY',
    features: [
      { text: 'Everything in Free',             included: true },
      { text: 'Full course library (50+ courses)', included: true },
      { text: 'Completion certificates',        included: true },
      { text: 'Priority support',               included: true },
      { text: 'Advanced analytics dashboard',   included: true },
      { text: 'Downloadable resources',         included: true },
      { text: 'Early access to new courses',    included: true },
      { text: 'Offline mode',                   included: false },
      { text: 'Dedicated study coach',          included: false },
    ],
  },
  {
    id: 'ANNUAL',
    label: 'Annual',
    price: 'Rp 1.440.000',
    period: 'per year',
    sub: '≈ Rp 120.000 / month',
    description: 'Full access for a full year. Pay once, study all year.',
    color: 'green',
    accent: 'var(--green)',
    accentBg: 'var(--green-soft)',
    recommended: true,
    checkoutUrl: base + '/checkout?plan=ANNUAL',
    features: [
      { text: 'Everything in Free',             included: true },
      { text: 'Full course library (50+ courses)', included: true },
      { text: 'Completion certificates',        included: true },
      { text: 'Priority support',               included: true },
      { text: 'Advanced analytics dashboard',   included: true },
      { text: 'Downloadable resources',         included: true },
      { text: 'Early access to new courses',    included: true },
      { text: 'Offline mode (coming soon)',      included: true },
      { text: 'Dedicated study coach (coming soon)', included: true },
    ],
  },
];

// ── PlanCard ──────────────────────────────────────────────────────────────
const PlanCard = ({ plan }) => {
  const isCurrent = PC.currentPlan === plan.id;
  const isActive  = plan.id !== 'FREE';

  return (
    <div style={{
      position: 'relative',
      background: 'var(--paper)',
      border: isCurrent
        ? `2px solid ${plan.accent}`
        : plan.recommended
          ? `2px solid ${plan.accent}`
          : '1.5px solid var(--line)',
      borderRadius: 24,
      padding: '28px 28px 24px',
      display: 'flex',
      flexDirection: 'column',
      gap: 0,
      boxShadow: plan.recommended ? 'var(--shadow-lg)' : 'var(--shadow-sm)',
      transform: plan.recommended ? 'scale(1.02)' : 'none',
    }}>

      {/* Badges */}
      <div style={{ position: 'absolute', top: -13, left: 24, display: 'flex', gap: 6 }}>
        {plan.recommended && !isCurrent && (
          <span style={{ padding: '3px 10px', borderRadius: 999, background: plan.accent, color: 'white', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em' }}>
            RECOMMENDED
          </span>
        )}
        {isCurrent && (
          <span style={{ padding: '3px 10px', borderRadius: 999, background: plan.accent, color: 'white', fontSize: 11, fontWeight: 700, letterSpacing: '0.06em' }}>
            ✓ CURRENT PLAN
          </span>
        )}
      </div>

      {/* Plan name */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4, marginTop: plan.recommended || isCurrent ? 8 : 0 }}>
        {isActive && (
          <span style={{ display: 'inline-flex', color: plan.accent }}><Icon.Crown/></span>
        )}
        <span style={{ fontSize: 17, fontWeight: 700, letterSpacing: '-0.01em' }}>{plan.label}</span>
      </div>

      {/* Price */}
      <div style={{ marginBottom: 4 }}>
        <span style={{ fontSize: 32, fontWeight: 800, letterSpacing: '-0.03em', color: 'var(--ink)' }}>{plan.price}</span>
        <span style={{ fontSize: 14, color: 'var(--ink-3)', marginLeft: 4 }}>/ {plan.period}</span>
      </div>
      {plan.sub && (
        <div className="mono" style={{ fontSize: 11, color: 'var(--ink-3)', marginBottom: 0 }}>{plan.sub}</div>
      )}

      {/* Description */}
      <p style={{ margin: '12px 0 20px', fontSize: 14, color: 'var(--ink-3)', lineHeight: 1.5 }}>{plan.description}</p>

      {/* CTA */}
      {plan.checkoutUrl ? (
        isCurrent ? (
          <div style={{ padding: '11px 20px', borderRadius: 12, background: plan.accentBg, color: plan.accent, fontWeight: 700, fontSize: 14, textAlign: 'center', marginBottom: 24 }}>
            Active plan
          </div>
        ) : (
          <a href={plan.checkoutUrl}
             style={{ display: 'block', padding: '11px 20px', borderRadius: 12, background: plan.accent, color: 'white', fontWeight: 700, fontSize: 14, textAlign: 'center', boxShadow: `0 2px 0 color-mix(in srgb, ${plan.accent} 70%, black)`, marginBottom: 24 }}>
            Get {plan.label} <span style={{ fontSize: 13 }}>→</span>
          </a>
        )
      ) : (
        <div style={{ padding: '11px 20px', borderRadius: 12, background: isCurrent ? 'var(--bg-2)' : 'var(--bg)', border: '1px solid var(--line)', color: 'var(--ink-3)', fontWeight: 700, fontSize: 14, textAlign: 'center', marginBottom: 24 }}>
          {isCurrent ? 'Current plan' : 'No cost'}
        </div>
      )}

      {/* Divider */}
      <div style={{ height: 1, background: 'var(--line)', marginBottom: 20 }}/>

      {/* Features */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {plan.features.map((f, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
            <span style={{
              flexShrink: 0,
              marginTop: 1,
              width: 18, height: 18,
              borderRadius: 999,
              background: f.included ? plan.accentBg : 'var(--bg)',
              color: f.included ? plan.accent : 'var(--ink-3)',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {f.included
                ? <Icon.Check style={{ width: 11, height: 11 }}/>
                : <span style={{ fontSize: 11, fontWeight: 700, opacity: 0.4 }}>—</span>
              }
            </span>
            <span style={{ fontSize: 13, color: f.included ? 'var(--ink-2)' : 'var(--ink-3)', opacity: f.included ? 1 : 0.6, lineHeight: 1.4 }}>{f.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ── Page ─────────────────────────────────────────────────────────────────
const Page = () => (
  <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
    <Nav/>

    {/* Sandbox banner */}
    {!PC.isProduction && (
      <div style={{ background: 'var(--amber-soft)', borderBottom: '1px solid var(--amber)', padding: '8px 24px', textAlign: 'center' }}>
        <span className="mono" style={{ fontSize: 12, fontWeight: 700, color: 'var(--amber-deep)', letterSpacing: '0.04em' }}>
          ⚡ SANDBOX MODE — no real charges will be made
        </span>
      </div>
    )}

    {/* Hero */}
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '56px 24px 40px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
      <span className="serif" style={{ position: 'absolute', left: '5%', top: 20, fontSize: 120, color: 'var(--amber)', opacity: 0.08, fontWeight: 600, pointerEvents: 'none' }}>∑</span>
      <span className="serif" style={{ position: 'absolute', right: '8%', top: 40, fontSize: 90, color: 'var(--green)', opacity: 0.08, fontWeight: 600, pointerEvents: 'none' }}>π</span>

      {PC.premium ? (
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '5px 14px', borderRadius: 999, background: 'var(--amber-soft)', color: 'var(--amber-deep)', fontWeight: 700, fontSize: 13, marginBottom: 18 }}>
          <Icon.Crown/> You're on Premium · {PC.currentPlan}
        </div>
      ) : (
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '5px 14px', borderRadius: 999, background: 'var(--green-soft)', color: 'var(--green-deep)', fontWeight: 700, fontSize: 13, marginBottom: 18 }}>
          <Icon.Sparkle/> Upgrade your learning
        </div>
      )}

      <h1 style={{ margin: '0 0 16px', fontSize: 'clamp(32px, 5vw, 54px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.05 }}>
        {PC.premium ? 'Manage your plan' : 'Go'}{' '}
        <span className="serif" style={{ color: 'var(--green-deep)', fontWeight: 500 }}>
          {PC.premium ? '' : 'Premium'}
        </span>
      </h1>
      <p style={{ margin: '0 auto', fontSize: 17, color: 'var(--ink-3)', maxWidth: 520, lineHeight: 1.6 }}>
        {PC.premium
          ? 'You already have full access. Your subscription details are shown below.'
          : 'Unlock every course, earn certificates, and accelerate your math journey. No hidden fees.'}
      </p>
    </div>

    {/* Plan cards */}
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px 80px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, alignItems: 'start' }}>
        {PLANS.map(plan => <PlanCard key={plan.id} plan={plan}/>)}
      </div>

      {/* Fine print */}
      <div style={{ marginTop: 40, textAlign: 'center', color: 'var(--ink-3)', fontSize: 13, lineHeight: 1.7 }}>
        <p style={{ margin: '0 0 6px' }}>All payments are processed securely via Midtrans. Prices in Indonesian Rupiah (IDR).</p>
        <p style={{ margin: 0 }}>Premium grants access to all available courses for the duration of your subscription. Questions? <a href="#" style={{ color: 'var(--ink-2)', fontWeight: 600, textDecoration: 'underline' }}>Contact support</a>.</p>
      </div>
    </div>
  </div>
);

const rootEl = document.getElementById('root');
if (rootEl) createRoot(rootEl).render(<Page/>);
