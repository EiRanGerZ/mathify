import React from 'react';
import { Icon } from './icons.jsx';
import { getJson, postForm } from './api.js';

export const timeAgo = (iso) => {
  if (!iso) return '';
  const then = new Date(iso).getTime();
  if (isNaN(then)) return '';
  const s = Math.max(0, Math.floor((Date.now() - then) / 1000));
  if (s < 60) return 'just now';
  const m = Math.floor(s / 60); if (m < 60) return m + 'm ago';
  const h = Math.floor(m / 60); if (h < 24) return h + 'h ago';
  const d = Math.floor(h / 24); if (d < 7) return d + 'd ago';
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

export const NotificationBell = ({ base }) => {
  const ref = React.useRef(null);
  const [open, setOpen] = React.useState(false);
  const [items, setItems] = React.useState([]);
  const [unread, setUnread] = React.useState(0);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    let alive = true;
    getJson(base + '/notifications')
      .then(data => { if (alive) { setItems(data.items || []); setUnread(data.unread || 0); } })
      .catch(() => {})            // bell just stays empty if the feed fails
      .finally(() => { if (alive) setLoading(false); });
    return () => { alive = false; };
  }, [base]);

  // Close on outside click — same pattern as ProfilePopover.
  React.useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const markAllRead = () => {
    if (unread === 0) return;
    setUnread(0);
    setItems(prev => prev.map(n => ({ ...n, read: true })));
    postForm(base + '/notifications', { action: 'markAllRead' }).catch(() => {});
  };

  const onItemClick = (n) => {
    if (!n.read) {
      setUnread(u => Math.max(0, u - 1));
      setItems(prev => prev.map(x => x.id === n.id ? { ...x, read: true } : x));
      postForm(base + '/notifications', { action: 'markRead', id: n.id }).catch(() => {});
    }
    if (n.link) window.location.href = base + n.link;
  };

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button onClick={() => setOpen(o => !o)} aria-label="Notifications"
              style={{ width: 36, height: 36, borderRadius: 10, border: `1px solid ${open ? 'var(--ink-3)' : 'var(--line)'}`, background: 'var(--paper)', color: 'var(--ink-2)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <Icon.Bell/>
        {unread > 0 && (
          <span style={{ position: 'absolute', top: -4, right: -4, minWidth: 16, height: 16, padding: '0 4px', borderRadius: 999, background: 'var(--rose)', color: '#fff', border: '1.5px solid var(--paper)', fontSize: 10, fontWeight: 700, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1 }}>
            {unread > 9 ? '9+' : unread}
          </span>
        )}
      </button>

      {open && (
        <div style={{ position: 'absolute', top: 'calc(100% + 10px)', right: 0, zIndex: 100, width: 320, borderRadius: 16, background: 'var(--paper)', border: '1px solid var(--line)', boxShadow: 'var(--shadow-lg)', overflow: 'hidden' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px', borderBottom: '1px solid var(--line)' }}>
            <span style={{ fontSize: 14, fontWeight: 700 }}>Notifications</span>
            <button onClick={markAllRead} disabled={unread === 0}
                    style={{ border: 'none', background: 'transparent', cursor: unread === 0 ? 'default' : 'pointer', fontFamily: 'inherit', fontSize: 12, fontWeight: 600, color: unread === 0 ? 'var(--ink-3)' : 'var(--blue-deep)', opacity: unread === 0 ? 0.5 : 1, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              <Icon.Check/> Mark all read
            </button>
          </div>
          <div style={{ maxHeight: 360, overflowY: 'auto' }}>
            {loading ? (
              <div style={{ padding: '28px 16px', textAlign: 'center', fontSize: 13, color: 'var(--ink-3)' }}>Loading…</div>
            ) : items.length === 0 ? (
              <div style={{ padding: '32px 16px', textAlign: 'center' }}>
                <div style={{ color: 'var(--ink-3)', opacity: 0.5, display: 'inline-flex' }}><Icon.Bell/></div>
                <div style={{ marginTop: 8, fontSize: 13, color: 'var(--ink-3)' }}>You're all caught up.</div>
              </div>
            ) : items.map((n) => {
              const ItemIcon = Icon[n.icon] || Icon.Bell;
              return (
                <div key={n.id} onClick={() => onItemClick(n)}
                     style={{ display: 'flex', gap: 12, padding: '12px 16px', cursor: 'pointer', borderBottom: '1px solid var(--line)', background: n.read ? 'transparent' : 'var(--green-soft)' }}>
                  <div style={{ width: 34, height: 34, borderRadius: 9, background: 'var(--bg-2)', color: 'var(--ink-2)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><ItemIcon/></div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)' }}>{n.title}</div>
                    {n.body && <div style={{ fontSize: 12, color: 'var(--ink-2)', marginTop: 2, lineHeight: 1.4 }}>{n.body}</div>}
                    <div className="mono" style={{ fontSize: 10, color: 'var(--ink-3)', marginTop: 4 }}>{timeAgo(n.createdAt)}</div>
                  </div>
                  {!n.read && <span style={{ width: 7, height: 7, borderRadius: 999, background: 'var(--rose)', flexShrink: 0, marginTop: 6 }}/>}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
