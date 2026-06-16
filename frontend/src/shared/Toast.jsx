import React from 'react';

// Transient toast — replaces the old Alpine.js toast. Listens for the
// `student-notify` window event (dispatched by shared/notify.js).
export const Toast = () => {
  const [msg, setMsg] = React.useState('');
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    let timer;
    const handler = (e) => {
      setMsg((e.detail && e.detail.msg) || '');
      setShow(true);
      clearTimeout(timer);
      timer = setTimeout(() => setShow(false), 3000);
    };
    window.addEventListener('student-notify', handler);
    return () => { window.removeEventListener('student-notify', handler); clearTimeout(timer); };
  }, []);

  return (
    <div style={{
      position: 'fixed', bottom: 24, left: '50%', zIndex: 200,
      display: 'flex', alignItems: 'center', gap: 12,
      padding: '12px 20px', borderRadius: 16, fontSize: 14, fontWeight: 600,
      background: 'var(--ink)', color: 'var(--paper)', border: '1px solid rgba(255,255,255,0.08)',
      boxShadow: '0 10px 30px -10px rgba(0,0,0,0.4)', pointerEvents: 'none',
      transform: show ? 'translate(-50%, 0)' : 'translate(-50%, 8px)',
      opacity: show ? 1 : 0, transition: 'opacity .25s ease, transform .25s ease',
    }}>
      <span>{msg}</span>
    </div>
  );
};
