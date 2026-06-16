import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

// ── Icons ─────────────────────────────────────────────────────────────────
    const Icon = {
      Check:     (p) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}><path d="M3 8.5L6.5 12L13 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
      Arrow:     (p) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}><path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
      TrendUp:   (p) => <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...p}><path d="M2 9L5.5 5.5L8 8L12 3.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 3.5H12V6.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>,
      TrendDown: (p) => <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...p}><path d="M2 5L5.5 8.5L8 6L12 10.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 10.5H12V7.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"/></svg>,
      Users:     (p) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}><circle cx="6" cy="5.5" r="2.5" stroke="currentColor" strokeWidth="1.5"/><path d="M2 13.5C2 11 3.8 9.5 6 9.5C8.2 9.5 10 11 10 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M11 4C12.1 4 13 4.9 13 6C13 7.1 12.1 8 11 8M11.5 9.6C13 9.9 14 11.2 14 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
      Dollar:    (p) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}><path d="M8 2V14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M11 4.5C11 4.5 9.8 3.5 7.8 3.5C5.8 3.5 4.8 4.6 4.8 5.8C4.8 8.8 11.2 7.2 11.2 10.2C11.2 11.4 10.2 12.5 8 12.5C6 12.5 5 11.5 5 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
      Layers:    (p) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}><path d="M8 1.5L14.5 5L8 8.5L1.5 5L8 1.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><path d="M2 8L8 11.2L14 8M2 11L8 14.2L14 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
      Book:      (p) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}><path d="M3 3H7C7.5 3 8 3.5 8 4V13C8 12.5 7.5 12 7 12H3V3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><path d="M13 3H9C8.5 3 8 3.5 8 4V13C8 12.5 8.5 12 9 12H13V3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>,
      Grid:      (p) => <svg width="18" height="18" viewBox="0 0 18 18" fill="none" {...p}><rect x="2.5" y="2.5" width="5.5" height="5.5" rx="1.5" stroke="currentColor" strokeWidth="1.6"/><rect x="10" y="2.5" width="5.5" height="5.5" rx="1.5" stroke="currentColor" strokeWidth="1.6"/><rect x="2.5" y="10" width="5.5" height="5.5" rx="1.5" stroke="currentColor" strokeWidth="1.6"/><rect x="10" y="10" width="5.5" height="5.5" rx="1.5" stroke="currentColor" strokeWidth="1.6"/></svg>,
      Chart:     (p) => <svg width="18" height="18" viewBox="0 0 18 18" fill="none" {...p}><path d="M3 15V8M7 15V4M11 15V10M15 15V6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>,
      Search:    (p) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}><circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5"/><path d="M10.5 10.5L13.5 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
      Bell:      (p) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}><path d="M4 7C4 4.8 5.8 3 8 3C10.2 3 12 4.8 12 7V10L13 11.5H3L4 10V7Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><path d="M6.5 12.5C6.5 13.3 7.2 14 8 14C8.8 14 9.5 13.3 9.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
      Clock:     (p) => <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...p}><circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.5"/><path d="M7 4V7L9 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
      Chevron:   (p) => <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...p}><path d="M3.5 5.5L7 9L10.5 5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/></svg>,
      Dots:      (p) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}><circle cx="3.5" cy="8" r="1.3" fill="currentColor"/><circle cx="8" cy="8" r="1.3" fill="currentColor"/><circle cx="12.5" cy="8" r="1.3" fill="currentColor"/></svg>,
      Filter:    (p) => <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...p}><path d="M1.5 3H12.5L8.5 7.5V11.5L5.5 12.5V7.5L1.5 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>,
      Download:  (p) => <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...p}><path d="M7 2V9M7 9L4 6M7 9L10 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/><path d="M2.5 11.5H11.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>,
      Plus:      (p) => <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...p}><path d="M7 3V11M3 7H11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>,
      Warning:   (p) => <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...p}><path d="M7 1.5L13 12H1L7 1.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><path d="M7 5.5V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><circle cx="7" cy="9.8" r="0.5" fill="currentColor"/></svg>,
      Star:      (p) => <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...p}><path d="M7 1.5L8.7 5L12.5 5.55L9.75 8.2L10.4 12L7 10.2L3.6 12L4.25 8.2L1.5 5.55L5.3 5Z" fill="currentColor"/></svg>,
      Sparkle:   (p) => <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...p}><path d="M7 1L8 6L13 7L8 8L7 13L6 8L1 7L6 6Z" fill="currentColor"/></svg>,
      Moon:      (p) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}><path d="M12 10.5A5.5 5.5 0 0 1 5.5 4c0-.42.05-.83.14-1.22A5.5 5.5 0 1 0 13.22 10.36 5.53 5.53 0 0 1 12 10.5Z" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>,
      Sun:       (p) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}><circle cx="8" cy="8" r="2.8" stroke="currentColor" strokeWidth="1.4"/><path d="M8 2V1M8 15V14M2 8H1M15 8H14M3.76 3.76L3.05 3.05M12.95 12.95L12.24 12.24M12.24 3.76L12.95 3.05M3.05 12.95L3.76 12.24" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>,
    };

    const Logo = () => (
      <svg width="30" height="30" viewBox="0 0 32 32" fill="none">
        <rect x="1.5" y="1.5" width="29" height="29" rx="9" fill="var(--green)"/>
        <rect x="1.5" y="1.5" width="29" height="29" rx="9" stroke="var(--green-deep)" strokeWidth="1.5"/>
        <path d="M8 22V10L13 18L18 10V22" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="22" cy="11" r="2" fill="var(--amber)"/>
      </svg>
    );

    const Avatar = ({ letter, color, size = 32 }) => (
      <div style={{
        width: size, height: size, borderRadius: 999,
        background: color, color: 'white',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        fontWeight: 700, fontSize: size * 0.42, flexShrink: 0
      }}>{letter}</div>
    );

    // ── KPI strip ─────────────────────────────────────────────────────────────
    const ACC = {
      green: { soft: 'var(--green-soft)', deep: 'var(--green-deep)', solid: 'var(--green)' },
      blue:  { soft: 'var(--blue-soft)',  deep: 'var(--blue-deep)',  solid: 'var(--blue)'  },
      plum:  { soft: 'var(--plum-soft)',  deep: 'var(--plum-deep)',  solid: 'var(--plum)'  },
      amber: { soft: 'var(--amber-soft)', deep: 'var(--amber-deep)', solid: 'var(--amber)' },
    };

    const Sparkline = ({ data, color, up }) => {
      const w = 84, h = 28;
      const max = Math.max(...data), min = Math.min(...data);
      const pts = data.map((v, i) => [
        (i / (data.length - 1)) * w,
        h - ((v - min) / (max - min || 1)) * (h - 4) - 2
      ]);
      const line = pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ');
      const fill = line + ' L' + w + ' ' + h + ' L0 ' + h + ' Z';
      const id   = 'sg' + color.replace(/[^a-z]/gi, '') + (up ? 'u' : 'd');
      return (
        <svg width={w} height={h} viewBox={'0 0 ' + w + ' ' + h} style={{ flexShrink: 0 }}>
          <defs>
            <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity="0.18"/>
              <stop offset="100%" stopColor={color} stopOpacity="0"/>
            </linearGradient>
          </defs>
          <path d={fill} fill={'url(#' + id + ')'}/>
          <path d={line} fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx={pts[pts.length-1][0]} cy={pts[pts.length-1][1]} r="2.4" fill={color}/>
        </svg>
      );
    };

    const KpiCard = ({ label, icon, accent, value, delta, up, sub, spark }) => {
      const c = ACC[accent];
      return (
        <div style={{
          padding: 'var(--pad-card)', borderRadius: 'var(--radius)',
          background: 'var(--paper)', border: '1px solid var(--line)',
          boxShadow: 'var(--shadow-sm)', display: 'flex', flexDirection: 'column', gap: 12
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              padding: '4px 9px', borderRadius: 8, background: c.soft, color: c.deep,
              fontSize: 10.5, fontWeight: 700, letterSpacing: '0.05em'
            }}>{icon}{label}</span>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 3, fontSize: 12, fontWeight: 700,
              color: up ? 'var(--green-deep)' : 'var(--rose-deep)'
            }}>{up ? <Icon.TrendUp/> : <Icon.TrendDown/>}{delta}</span>
          </div>
          <span className="tnum" style={{ fontSize: 30, fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1 }}>{value}</span>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 10 }}>
            <span style={{ fontSize: 11.5, color: 'var(--ink-3)' }}>{sub}</span>
            <Sparkline data={spark} color={c.solid} up={up}/>
          </div>
        </div>
      );
    };

    const KpiRow = () => {
      const kpis = [
        { label: 'MRR', icon: <Icon.Dollar/>, accent: 'green', value: '$248.6k', delta: '+8.4%',  up: true,  sub: 'vs. prev 30d',  spark: [30,32,31,35,34,38,40,39,43,46,45,50] },
        { label: 'ACTIVE LEARNERS',    icon: <Icon.Users/>,   accent: 'blue',  value: '94,210',  delta: '+5.1%',  up: true,  sub: '30-day active', spark: [60,58,62,61,64,66,65,68,70,69,72,74] },
        { label: 'COURSE COMPLETIONS', icon: <Icon.Check/>,   accent: 'plum',  value: '12,840',  delta: '+11.2%', up: true,  sub: 'this period',   spark: [20,24,22,28,30,34,33,38,42,45,48,52] },
        { label: 'NEW SIGNUPS',        icon: <Icon.Sparkle/>, accent: 'amber', value: '6,302',   delta: '−2.3%',  up: false, sub: 'vs. prev 30d',  spark: [50,52,48,54,51,49,47,50,46,44,45,43] },
      ];
      return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--gap)' }}>
          {kpis.map((k) => <KpiCard key={k.label} {...k}/>)}
        </div>
      );
    };

    // ── Shared card shell ─────────────────────────────────────────────────────
    const Card = ({ children, style }) => (
      <div style={{
        padding: 'var(--pad-card)', borderRadius: 'var(--radius)',
        background: 'var(--paper)', border: '1px solid var(--line)',
        boxShadow: 'var(--shadow-sm)', ...style
      }}>{children}</div>
    );

    const CardHead = ({ title, sub, right }) => (
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 18 }}>
        <div>
          <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, letterSpacing: '-0.01em' }}>{title}</h3>
          {sub && <p style={{ margin: '3px 0 0', fontSize: 12.5, color: 'var(--ink-3)' }}>{sub}</p>}
        </div>
        {right}
      </div>
    );

    // ── Revenue panel ─────────────────────────────────────────────────────────
    const Legend = ({ color, label }) => (
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--ink-2)', fontWeight: 600 }}>
        <span style={{ width: 9, height: 9, borderRadius: 3, background: color }}/>{label}
      </span>
    );

    const RevenueChart = () => {
      const months    = ['Jun','Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar','Apr','May'];
      const recurring = [148,155,159,166,172,178,182,190,198,210,224,236];
      const expansion = [9,10,11,10,13,12,14,13,15,16,18,13];
      const W = 640, H = 230, padB = 26, padT = 10, maxVal = 270;
      const xOf = (i) => (i / (months.length - 1)) * W;
      const yOf = (v) => padT + (1 - v / maxVal) * (H - padB - padT);
      const totals  = recurring.map((r, i) => r + expansion[i]);
      const areaTop = totals.map((v, i) => [xOf(i), yOf(v)]);
      const recTop  = recurring.map((v, i) => [xOf(i), yOf(v)]);
      const toLine  = (pts) => pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ');
      const totalArea = toLine(areaTop) + ' L' + W + ' ' + (H-padB) + ' L0 ' + (H-padB) + ' Z';
      const recArea   = toLine(recTop)  + ' L' + W + ' ' + (H-padB) + ' L0 ' + (H-padB) + ' Z';
      const last = recTop[recTop.length - 1];
      return (
        <Card>
          <CardHead title="Recurring revenue" sub="Monthly recurring revenue, last 12 months"
            right={
              <div style={{ display: 'flex', gap: 14, alignItems: 'center', paddingTop: 2 }}>
                <Legend color="var(--accent)" label="Recurring"/>
                <Legend color="var(--amber)"  label="Expansion"/>
              </div>
            }
          />
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 14 }}>
            <span className="tnum" style={{ fontSize: 34, fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1 }}>$248.6k</span>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 13, fontWeight: 700, color: 'var(--green-deep)' }}>
              <Icon.TrendUp/> +8.4% MoM
            </span>
            <span style={{ fontSize: 12.5, color: 'var(--ink-3)' }}>
              · net revenue retention <b className="tnum" style={{ color: 'var(--ink-2)' }}>112%</b>
            </span>
          </div>
          <svg viewBox={'0 0 ' + W + ' ' + H} style={{ width: '100%', height: 'auto', display: 'block' }} preserveAspectRatio="none">
            {[0,90,180,270].map((g) => (
              <g key={g}>
                <line x1="0" x2={W} y1={yOf(g)} y2={yOf(g)} stroke="var(--line)" strokeWidth="1" strokeDasharray="3 4"/>
                <text x="2" y={yOf(g) - 4} fontSize="10" fill="var(--ink-3)" fontFamily="JetBrains Mono, monospace">{'$' + g + 'k'}</text>
              </g>
            ))}
            <defs>
              <linearGradient id="revFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor="var(--accent)" stopOpacity="0.22"/>
                <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.01"/>
              </linearGradient>
            </defs>
            <path d={totalArea} fill="var(--amber)" opacity="0.13"/>
            <path d={recArea}   fill="url(#revFill)"/>
            <path d={toLine(areaTop)} fill="none" stroke="var(--amber)" strokeWidth="2" strokeLinejoin="round" opacity="0.65"/>
            <path d={toLine(recTop)}  fill="none" stroke="var(--accent)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx={last[0]} cy={last[1]} r="3.5" fill="var(--accent)"/>
            {months.map((m, i) => (
              <text key={m} x={xOf(i)} y={H - 8} fontSize="10" fill="var(--ink-3)"
                    textAnchor={i === 0 ? 'start' : i === months.length-1 ? 'end' : 'middle'}
                    fontFamily="JetBrains Mono, monospace">{m}</text>
            ))}
          </svg>
        </Card>
      );
    };

    const PlanMix = () => {
      const plans = [
        { name: 'Annual Pro',  pct: 46, mrr: '$114.3k', color: 'var(--accent)' },
        { name: 'Monthly Pro', pct: 28, mrr: '$69.6k',  color: 'var(--blue)'   },
        { name: 'Family',      pct: 18, mrr: '$44.7k',  color: 'var(--plum)'   },
        { name: 'Schools',     pct:  8, mrr: '$20.0k',  color: 'var(--amber)'  },
      ];
      const r = 52, cx = 64, cy = 64, sw = 18;
      const circ = 2 * Math.PI * r;
      let acc = 0;
      const segs = plans.map((p) => {
        const len = (p.pct / 100) * circ;
        const seg = { ...p, dash: len, offset: -acc };
        acc += len;
        return seg;
      });
      return (
        <Card>
          <CardHead title="Plan mix" sub="Share of MRR by plan"/>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <div style={{ position: 'relative', width: 128, height: 128, flexShrink: 0 }}>
              <svg width="128" height="128" viewBox="0 0 128 128">
                <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--bg-2)" strokeWidth={sw}/>
                {segs.map((s, i) => (
                  <circle key={i} cx={cx} cy={cy} r={r} fill="none"
                    stroke={s.color} strokeWidth={sw}
                    strokeDasharray={s.dash + ' ' + (circ - s.dash)}
                    strokeDashoffset={s.offset}
                    transform={'rotate(-90 ' + cx + ' ' + cy + ')'}
                    strokeLinecap="butt"/>
                ))}
              </svg>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <span className="tnum" style={{ fontSize: 22, fontWeight: 800, lineHeight: 1 }}>4</span>
                <span style={{ fontSize: 10.5, color: 'var(--ink-3)' }}>plans</span>
              </div>
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 9 }}>
              {plans.map((p) => (
                <div key={p.name} style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                  <span style={{ width: 9, height: 9, borderRadius: 3, background: p.color, flexShrink: 0 }}/>
                  <span style={{ fontSize: 12.5, fontWeight: 600, flex: 1 }}>{p.name}</span>
                  <span className="tnum" style={{ fontSize: 12.5, color: 'var(--ink-3)' }}>{p.mrr}</span>
                  <span className="tnum mono" style={{ fontSize: 11.5, fontWeight: 600, width: 30, textAlign: 'right' }}>{p.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </Card>
      );
    };

    const RevenuePanel = () => (
      <div style={{ display: 'grid', gridTemplateColumns: '1.7fr 1fr', gap: 'var(--gap)' }}>
        <RevenueChart/><PlanMix/>
      </div>
    );

    // ── Content panel ─────────────────────────────────────────────────────────
    const COURSES = [
      { name: 'Algebra Foundations', cat: 'Algebra',    color: 'var(--green)', status: 'Live',   enroll: '38,420', comp: 78, rating: 4.8, updated: '2d ago' },
      { name: 'Fractions & Decimals', cat: 'Arithmetic', color: 'var(--blue)',  status: 'Live',   enroll: '29,110', comp: 71, rating: 4.7, updated: '6d ago' },
      { name: 'Intro to Geometry',    cat: 'Geometry',   color: 'var(--plum)',  status: 'Live',   enroll: '24,860', comp: 64, rating: 4.6, updated: '1w ago' },
      { name: 'Linear Equations',     cat: 'Algebra',    color: 'var(--green)', status: 'Live',   enroll: '21,300', comp: 59, rating: 4.5, updated: '3d ago' },
      { name: 'Probability Basics',   cat: 'Statistics', color: 'var(--amber)', status: 'Review', enroll: '—',      comp:  0, rating:   0, updated: '5h ago' },
      { name: 'Trigonometry I',       cat: 'Geometry',   color: 'var(--plum)',  status: 'Live',   enroll: '14,720', comp: 42, rating: 4.2, updated: '3w ago' },
      { name: 'Calculus Primer',      cat: 'Advanced',   color: 'var(--rose)',  status: 'Draft',  enroll: '—',      comp:  0, rating:   0, updated: '1d ago' },
    ];
    const STATUS_STYLES = {
      Live:   { bg: 'var(--green-soft)', fg: 'var(--green-deep)' },
      Review: { bg: 'var(--amber-soft)', fg: 'var(--amber-deep)' },
      Draft:  { bg: 'var(--bg-2)',       fg: 'var(--ink-3)'      },
    };

    const CourseTable = () => (
      <Card style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: 'var(--pad-card)', paddingBottom: 14 }}>
          <CardHead title="Course performance" sub="Top courses by enrollment this period"
            right={
              <button style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                padding: '6px 11px', borderRadius: 8, cursor: 'pointer',
                background: 'var(--paper)', border: '1px solid var(--line)',
                color: 'var(--ink-2)', fontSize: 12.5, fontWeight: 600
              }}><Icon.Filter/> Filter</button>
            }
          />
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
          <thead>
            <tr style={{ background: 'var(--paper-2)', borderTop: '1px solid var(--line)', borderBottom: '1px solid var(--line)' }}>
              {['Course','Status','Enrollments','Completion','Rating','Updated',''].map((h, i) => (
                <th key={i} style={{
                  textAlign: 'left', padding: '9px 16px',
                  fontSize: 10.5, fontWeight: 700, letterSpacing: '0.06em',
                  color: 'var(--ink-3)', textTransform: 'uppercase'
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {COURSES.map((c, i) => {
              const st = STATUS_STYLES[c.status];
              return (
                <tr key={c.name} style={{ borderBottom: i < COURSES.length - 1 ? '1px solid var(--line-2)' : 'none' }}>
                  <td style={{ padding: '12px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
                      <span style={{
                        width: 30, height: 30, borderRadius: 8, flexShrink: 0,
                        background: 'color-mix(in srgb, ' + c.color + ' 16%, var(--paper))',
                        color: c.color, display: 'inline-flex', alignItems: 'center', justifyContent: 'center'
                      }}><Icon.Book/></span>
                      <div style={{ lineHeight: 1.25 }}>
                        <div style={{ fontWeight: 700, fontSize: 13 }}>{c.name}</div>
                        <div style={{ fontSize: 11, color: 'var(--ink-3)' }}>{c.cat}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    <span style={{
                      display: 'inline-flex', alignItems: 'center', gap: 5,
                      padding: '3px 9px', borderRadius: 999, fontSize: 11, fontWeight: 700,
                      background: st.bg, color: st.fg
                    }}>
                      {c.status === 'Live' && <span style={{ width: 5, height: 5, borderRadius: 999, background: 'currentColor' }}/>}
                      {c.status}
                    </span>
                  </td>
                  <td className="tnum" style={{ padding: '12px 16px', fontWeight: 600 }}>{c.enroll}</td>
                  <td style={{ padding: '12px 16px', minWidth: 120 }}>
                    {c.comp > 0 ? (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ flex: 1, height: 6, borderRadius: 999, background: 'var(--bg-2)', overflow: 'hidden', minWidth: 56 }}>
                          <div style={{
                            width: c.comp + '%', height: '100%', borderRadius: 999,
                            background: c.comp >= 65 ? 'var(--green)' : c.comp >= 50 ? 'var(--amber)' : 'var(--rose)'
                          }}/>
                        </div>
                        <span className="tnum mono" style={{ fontSize: 11.5, color: 'var(--ink-2)', width: 30 }}>{c.comp}%</span>
                      </div>
                    ) : <span style={{ color: 'var(--ink-3)' }}>—</span>}
                  </td>
                  <td style={{ padding: '12px 16px' }}>
                    {c.rating > 0 ? (
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontWeight: 600 }}>
                        <span style={{ color: 'var(--amber)' }}><Icon.Star/></span>
                        <span className="tnum">{c.rating}</span>
                      </span>
                    ) : <span style={{ color: 'var(--ink-3)' }}>—</span>}
                  </td>
                  <td className="mono" style={{ padding: '12px 16px', color: 'var(--ink-3)', fontSize: 12 }}>{c.updated}</td>
                  <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                    <button style={{
                      width: 28, height: 28, borderRadius: 7, cursor: 'pointer',
                      border: '1px solid var(--line)', background: 'var(--paper)',
                      color: 'var(--ink-3)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center'
                    }}><Icon.Dots/></button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div style={{ padding: '12px 16px', borderTop: '1px solid var(--line)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 12, color: 'var(--ink-3)' }}>Showing 7 of 64 courses</span>
          <a href="#" style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 12.5, fontWeight: 700, color: 'var(--accent-deep)' }}>
            View all courses <Icon.Arrow/>
          </a>
        </div>
      </Card>
    );

    const ContentHealth = () => {
      const pipeline = [
        { label: 'Published', count: 64, color: 'var(--green)' },
        { label: 'In review', count:  5, color: 'var(--amber)' },
        { label: 'Drafts',    count: 12, color: 'var(--ink-3)' },
      ];
      const attention = [
        { title: 'Trigonometry I',    note: 'Completion dropped to 42%',         kind: 'warn',  icon: <Icon.TrendDown/> },
        { title: 'Intro to Geometry', note: 'Lesson 4 flagged by 18 learners',   kind: 'rose',  icon: <Icon.Warning/>   },
        { title: 'Linear Equations',  note: 'Not updated in 3 weeks',            kind: 'amber', icon: <Icon.Clock/>     },
      ];
      const KIND = {
        warn:  { bg: 'var(--amber-soft)', fg: 'var(--amber-deep)' },
        rose:  { bg: 'var(--rose-soft)',  fg: 'var(--rose-deep)'  },
        amber: { bg: 'var(--bg-2)',       fg: 'var(--ink-3)'      },
      };
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap)' }}>
          <Card>
            <CardHead title="Content pipeline"/>
            <div style={{ display: 'flex', gap: 10 }}>
              {pipeline.map((p) => (
                <div key={p.label} style={{
                  flex: 1, padding: '14px 12px', borderRadius: 12,
                  background: 'var(--paper-2)', border: '1px solid var(--line)', textAlign: 'center'
                }}>
                  <div className="tnum" style={{ fontSize: 26, fontWeight: 800, color: p.color, lineHeight: 1, letterSpacing: '-0.02em' }}>{p.count}</div>
                  <div style={{ fontSize: 11, color: 'var(--ink-3)', fontWeight: 600, marginTop: 5 }}>{p.label}</div>
                </div>
              ))}
            </div>
          </Card>
          <Card style={{ flex: 1 }}>
            <CardHead title="Needs attention"
              right={<span style={{ fontSize: 11, fontWeight: 700, color: 'var(--rose-deep)', background: 'var(--rose-soft)', padding: '3px 8px', borderRadius: 999 }}>3</span>}
            />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {attention.map((a) => {
                const k = KIND[a.kind];
                return (
                  <div key={a.title} style={{ display: 'flex', alignItems: 'center', gap: 11, padding: '4px 0' }}>
                    <span style={{
                      width: 32, height: 32, borderRadius: 9, flexShrink: 0,
                      background: k.bg, color: k.fg,
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center'
                    }}>{a.icon}</span>
                    <div style={{ flex: 1, lineHeight: 1.3 }}>
                      <div style={{ fontSize: 13, fontWeight: 700 }}>{a.title}</div>
                      <div style={{ fontSize: 11.5, color: 'var(--ink-3)' }}>{a.note}</div>
                    </div>
                    <button style={{
                      padding: '5px 10px', borderRadius: 7, cursor: 'pointer',
                      border: '1px solid var(--line)', background: 'var(--paper)',
                      color: 'var(--ink-2)', fontSize: 11.5, fontWeight: 600
                    }}>Review</button>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>
      );
    };

    const ContentPanel = () => (
      <div style={{ display: 'grid', gridTemplateColumns: '1.7fr 1fr', gap: 'var(--gap)' }}>
        <CourseTable/><ContentHealth/>
      </div>
    );

    // ── Nav ───────────────────────────────────────────────────────────────────
    const notify = (msg) => window.dispatchEvent(new CustomEvent('admin-notify', { detail: { msg } }));

    const Nav = ({ dark, onToggleDark }) => {
      const { name, role, initial } = window.ADMIN_CONTEXT || {};
      const items = [
        { label: 'Overview', icon: <Icon.Grid/>,   active: true },
        { label: 'Content',  icon: <Icon.Layers/>, onClick: () => { window.location.href = ((window.ADMIN_CONTEXT || {}).ctx || '') + '/admin/content'; } },
        { label: 'Learners', icon: <Icon.Users/>,  onClick: () => notify('Learner analytics coming soon') },
        { label: 'Revenue',  icon: <Icon.Chart/>,  onClick: () => notify('Revenue detail coming soon') },
      ];
      return (
        <header style={{
          position: 'sticky', top: 0, zIndex: 50,
          background: 'color-mix(in srgb, var(--bg) 85%, transparent)',
          backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)',
          borderBottom: '1px solid var(--line)'
        }}>
          <div style={{ maxWidth: 1320, margin: '0 auto', padding: '12px 28px', display: 'flex', alignItems: 'center', gap: 22 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
              <Logo/>
              <div style={{ lineHeight: 1.1 }}>
                <div style={{ fontWeight: 700, fontSize: 16, letterSpacing: '-0.01em' }}>Mathify</div>
                <div className="mono" style={{ fontSize: 10.5, color: 'var(--ink-3)', letterSpacing: '0.04em' }}>ADMIN CONSOLE</div>
              </div>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 6, marginLeft: 6,
                padding: '5px 9px', borderRadius: 9, background: 'var(--paper)',
                border: '1px solid var(--line)', fontSize: 12.5, fontWeight: 600,
                color: 'var(--ink-2)', cursor: 'pointer'
              }}>
                <span style={{ width: 6, height: 6, borderRadius: 999, background: 'var(--green)' }}/>
                Production
                <span style={{ color: 'var(--ink-3)' }}><Icon.Chevron/></span>
              </div>
            </div>

            <nav style={{ display: 'flex', alignItems: 'center', gap: 2, marginLeft: 4 }}>
              {items.map((item) => (
                <a key={item.label} href="#"
                   onClick={(e) => { e.preventDefault(); item.onClick && item.onClick(); }}
                   style={{
                    display: 'inline-flex', alignItems: 'center', gap: 7,
                    padding: '7px 13px', borderRadius: 9, fontSize: 13.5, fontWeight: 600,
                    background: item.active ? 'var(--ink)' : 'transparent',
                    color: item.active ? 'var(--paper)' : 'var(--ink-2)'
                  }}>
                  <span style={{ opacity: item.active ? 1 : 0.65 }}>{item.icon}</span>
                  {item.label}
                </a>
              ))}
            </nav>

            <div style={{ flex: 1 }}/>

            <div style={{
              display: 'flex', alignItems: 'center', gap: 8, padding: '7px 11px',
              borderRadius: 9, width: 220, background: 'var(--paper)',
              border: '1px solid var(--line)', color: 'var(--ink-3)', fontSize: 13
            }}>
              <Icon.Search/>
              <span>Search…</span>
              <span className="mono" style={{ marginLeft: 'auto', fontSize: 10.5, padding: '2px 6px', borderRadius: 4, background: 'var(--bg-2)' }}>⌘K</span>
            </div>

            <button onClick={onToggleDark} style={{
              width: 34, height: 34, borderRadius: 9, border: '1px solid var(--line)',
              background: 'var(--paper)', color: 'var(--ink-2)', cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center'
            }} title={dark ? 'Switch to light mode' : 'Switch to dark mode'}>
              {dark ? <Icon.Sun/> : <Icon.Moon/>}
            </button>

            <button style={{
              width: 34, height: 34, borderRadius: 9, border: '1px solid var(--line)',
              background: 'var(--paper)', color: 'var(--ink-2)', cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', position: 'relative'
            }}>
              <Icon.Bell/>
              <span style={{
                position: 'absolute', top: 6, right: 7,
                width: 7, height: 7, borderRadius: 999, background: 'var(--rose)',
                border: '1.5px solid var(--paper)'
              }}/>
            </button>

            <div style={{
              display: 'flex', alignItems: 'center', gap: 8, padding: '4px 10px 4px 4px',
              borderRadius: 999, border: '1px solid var(--line)', background: 'var(--paper)'
            }}>
              <Avatar letter={initial || 'A'} color="var(--plum)" size={26}/>
              <div style={{ lineHeight: 1.15 }}>
                <div style={{ fontSize: 12.5, fontWeight: 700 }}>{name || 'Admin'}</div>
                <div style={{ fontSize: 10.5, color: 'var(--ink-3)' }}>{role || 'Owner'}</div>
              </div>
            </div>
          </div>
        </header>
      );
    };

    // ── Page header ───────────────────────────────────────────────────────────
    const PageHeader = () => {
      const [range, setRange] = React.useState('30d');
      return (
        <div style={{
          display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: 16, padding: '26px 0 18px'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
              <h1 style={{ margin: 0, fontSize: 26, fontWeight: 800, letterSpacing: '-0.02em' }}>Platform overview</h1>
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 5,
                padding: '3px 9px', borderRadius: 999, fontSize: 11.5, fontWeight: 700,
                background: 'var(--green-soft)', color: 'var(--green-deep)'
              }}>
                <span style={{ width: 6, height: 6, borderRadius: 999, background: 'var(--green)' }}/>
                All systems healthy
              </span>
            </div>
            <p style={{ margin: 0, fontSize: 13.5, color: 'var(--ink-3)' }}>
              <span className="mono">Thu · May 29, 2026</span> · last refreshed 4 min ago
            </p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ display: 'inline-flex', padding: 3, gap: 2, borderRadius: 10, background: 'var(--paper)', border: '1px solid var(--line)' }}>
              {['7d','30d','90d','YTD'].map((r) => (
                <button key={r} onClick={() => setRange(r)} className="mono" style={{
                  padding: '6px 12px', borderRadius: 7, border: 'none', cursor: 'pointer',
                  fontSize: 12, fontWeight: 600, letterSpacing: '0.02em',
                  background: range === r ? 'var(--ink)' : 'transparent',
                  color: range === r ? 'var(--paper)' : 'var(--ink-3)'
                }}>{r}</button>
              ))}
            </div>
            <button style={{
              display: 'inline-flex', alignItems: 'center', gap: 7,
              padding: '8px 13px', borderRadius: 10, cursor: 'pointer',
              background: 'var(--paper)', border: '1px solid var(--line)',
              color: 'var(--ink-2)', fontSize: 13, fontWeight: 600
            }}><Icon.Download/> Export</button>
            <button onClick={() => { window.location.href = ((window.ADMIN_CONTEXT || {}).ctx || '') + '/admin/content'; }} style={{
              display: 'inline-flex', alignItems: 'center', gap: 7,
              padding: '8px 14px', borderRadius: 10, cursor: 'pointer',
              background: 'var(--accent)', border: '1px solid var(--accent-deep)',
              color: 'white', fontSize: 13, fontWeight: 700, boxShadow: 'var(--shadow-sm)'
            }}><Icon.Plus/> New course</button>
          </div>
        </div>
      );
    };

    const SectionLabel = ({ title, sub }) => (
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginTop: 8 }}>
        <h2 style={{ margin: 0, fontSize: 16, fontWeight: 800, letterSpacing: '-0.01em', whiteSpace: 'nowrap' }}>{title}</h2>
        <span style={{ fontSize: 12.5, color: 'var(--ink-3)', whiteSpace: 'nowrap' }}>{sub}</span>
        <div style={{ flex: 1, height: 1, background: 'var(--line)' }}/>
      </div>
    );

    const Footer = () => {
      const ctx = (window.ADMIN_CONTEXT || {}).ctx || '';
      return (
        <div style={{
          marginTop: 36, paddingTop: 22, borderTop: '1px solid var(--line)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          fontSize: 12, color: 'var(--ink-3)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Logo/>
            <span>Mathify Admin · v2.4 · data refreshed 4m ago</span>
          </div>
          <div style={{ display: 'flex', gap: 18 }}>
            <a href="#" style={{ color: 'var(--ink-3)' }}>Docs</a>
            <a href={ctx + '/admin/audit'} style={{ color: 'var(--ink-3)' }}>Audit log</a>
            <a href={ctx + '/settings'}    style={{ color: 'var(--ink-3)' }}>Settings</a>
          </div>
        </div>
      );
    };

    // ── App root ──────────────────────────────────────────────────────────────
    const App = () => {
      const [dark, setDark] = React.useState(() => {
        try { return localStorage.getItem('mathify-admin-theme') === 'dark'; }
        catch { return false; }
      });

      React.useEffect(() => {
        document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
        try { localStorage.setItem('mathify-admin-theme', dark ? 'dark' : 'light'); } catch {}
      }, [dark]);

      return (
        <div>
          <Nav dark={dark} onToggleDark={() => setDark((d) => !d)}/>
          <main style={{ maxWidth: 1320, margin: '0 auto', padding: '0 28px 72px' }}>
            <PageHeader/>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--gap)' }}>
              <KpiRow/>
              <RevenuePanel/>
              <SectionLabel title="Content & curriculum" sub="What's performing, what needs work"/>
              <ContentPanel/>
            </div>
            <Footer/>
          </main>
        </div>
      );
    };

    createRoot(document.getElementById('root')).render(<App/>);
