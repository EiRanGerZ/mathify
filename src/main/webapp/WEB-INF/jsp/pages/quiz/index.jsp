<%@ page contentType="text/html;charset=UTF-8" language="java" isELIgnored="true" %>
<%@ page import="com.mathify.model.User, com.mathify.model.UserProgress" %>
<%
    HttpSession sess = request.getSession(false);
    User user = (sess != null) ? (User) sess.getAttribute("user") : null;
    UserProgress up = (sess != null) ? (UserProgress) sess.getAttribute("progress") : null;
    String userName = (user != null && user.getName() != null) ? user.getName() : "Student";
    int streak = (up != null) ? up.getCurrentStreak() : 0;
    int totalXP = (up != null) ? up.getTotalXP() : 0;
    String initial = String.valueOf(userName.charAt(0)).toUpperCase();
    String jsName = userName.replace("\\","\\\\").replace("\"","\\\"");
    String ctx = request.getContextPath();
%>
<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>Mathify — Quiz</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&family=Fraunces:opsz,wght@9..144,500;9..144,600&display=swap" rel="stylesheet">
<script src="https://cdn.tailwindcss.com"></script>
<script>tailwind.config = { theme: { extend: {} } };</script>
<style>
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
  #root { min-height: 100vh; display: flex; flex-direction: column; }
</style>
</head>
<body>
  <div id="root"></div>

  <script>
    var STUDENT_CONTEXT = {
      name:    "<%= jsName %>",
      initial: "<%= initial %>",
      streak:  <%= streak %>,
      xp:      <%= totalXP %>,
      ctx:     "<%= ctx %>"
    };
  </script>

  <script defer src="https://unpkg.com/alpinejs@3.14.3/dist/cdn.min.js"></script>
  <script src="https://unpkg.com/react@18.3.1/umd/react.development.js" crossorigin="anonymous"></script>
  <script src="https://unpkg.com/react-dom@18.3.1/umd/react-dom.development.js" crossorigin="anonymous"></script>
  <script src="https://unpkg.com/@babel/standalone@7.29.0/babel.min.js" crossorigin="anonymous"></script>

  <script type="text/babel">
    const SC = window.STUDENT_CONTEXT || {};

    // ── Icons ──────────────────────────────────────────────────────────────────
    const Icon = {
      Clock:   (p) => <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...p}><circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.5"/><path d="M7 4V7L9 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
      Bolt:    (p) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}><path d="M9 1L3 9H8L7 15L13 7H8L9 1Z" fill="currentColor"/></svg>,
      Heart:   (p) => <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...p}><path d="M7 12C7 12 1.5 8.5 1.5 5C1.5 3.3 2.8 2 4.5 2C5.5 2 6.5 2.7 7 3.5C7.5 2.7 8.5 2 9.5 2C11.2 2 12.5 3.3 12.5 5C12.5 8.5 7 12 7 12Z" fill="currentColor"/></svg>,
      Check:   (p) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}><path d="M3 8.5L6.5 12L13 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
      Sparkle: (p) => <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...p}><path d="M7 1L8 6L13 7L8 8L7 13L6 8L1 7L6 6Z" fill="currentColor"/></svg>,
      Arrow:   (p) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}><path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
      Close:   (p) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}><path d="M3 3L13 13M13 3L3 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>,
    };

    // ── MathSpan ───────────────────────────────────────────────────────────────
    const MathSpan = ({ children, display }) => (
      <span className="mono" style={{ fontFamily: "'JetBrains Mono', monospace", background: display ? 'transparent' : 'var(--bg-2)', padding: display ? '0' : '2px 7px', borderRadius: 6, fontSize: display ? 'inherit' : '0.95em' }}>{children}</span>
    );

    // ── Quiz data ──────────────────────────────────────────────────────────────
    const QUIZ = {
      lesson:  'The chain rule, intuitively',
      chapter: 'Introduction to Derivatives',
      course:  'Differential Calculus',
      totalQ:  6,
      xpReward: 24,
      questions: [
        {
          id: 1,
          prompt: <span>If <MathSpan>h(x) = f(g(x))</MathSpan>, the chain rule states that:</span>,
          choices: [
            { id: 'a', text: <span><MathSpan>h′(x) = f′(g(x)) · g′(x)</MathSpan></span>, correct: true  },
            { id: 'b', text: <span><MathSpan>h′(x) = f′(x) · g′(x)</MathSpan></span>,    correct: false },
            { id: 'c', text: <span><MathSpan>h′(x) = f(g′(x))</MathSpan></span>,          correct: false },
            { id: 'd', text: <span><MathSpan>h′(x) = f′(g(x)) + g′(x)</MathSpan></span>, correct: false },
          ],
          explanation: <span>The chain rule says: differentiate the outer function (leaving the inner unchanged), then multiply by the derivative of the inner function. So <MathSpan>h′(x) = f′(g(x)) · g′(x)</MathSpan>.</span>,
        },
        {
          id: 2,
          prompt: <span>Find <MathSpan>dy/dx</MathSpan> if <MathSpan>y = sin(3x)</MathSpan>.</span>,
          choices: [
            { id: 'a', text: <span><MathSpan>cos(3x)</MathSpan></span>,    correct: false },
            { id: 'b', text: <span><MathSpan>3 cos(3x)</MathSpan></span>,  correct: true  },
            { id: 'c', text: <span><MathSpan>3 sin(3x)</MathSpan></span>,  correct: false },
            { id: 'd', text: <span><MathSpan>-3 cos(3x)</MathSpan></span>, correct: false },
          ],
          explanation: <span>Outer function: <MathSpan>sin(u)</MathSpan> → derivative <MathSpan>cos(u)</MathSpan>. Inner function: <MathSpan>3x</MathSpan> → derivative <MathSpan>3</MathSpan>. Chain rule gives <MathSpan>3 cos(3x)</MathSpan>.</span>,
        },
        {
          id: 3,
          prompt: <span>Differentiate <MathSpan>y = (x² + 1)⁵</MathSpan>.</span>,
          choices: [
            { id: 'a', text: <span><MathSpan>5(x² + 1)⁴</MathSpan></span>,        correct: false },
            { id: 'b', text: <span><MathSpan>10x(x² + 1)⁴</MathSpan></span>,      correct: true  },
            { id: 'c', text: <span><MathSpan>5x(x² + 1)⁴</MathSpan></span>,       correct: false },
            { id: 'd', text: <span><MathSpan>10(x² + 1)⁴</MathSpan></span>,       correct: false },
          ],
          explanation: <span>Outer: power rule gives <MathSpan>5(x² + 1)⁴</MathSpan>. Inner: <MathSpan>2x</MathSpan>. Product: <MathSpan>10x(x² + 1)⁴</MathSpan>.</span>,
        },
        {
          id: 4,
          prompt: <span>The "inner function" in <MathSpan>y = e^(x²)</MathSpan> is:</span>,
          choices: [
            { id: 'a', text: <span><MathSpan>e^x</MathSpan></span>,  correct: false },
            { id: 'b', text: <span><MathSpan>x²</MathSpan></span>,   correct: true  },
            { id: 'c', text: <span><MathSpan>2x</MathSpan></span>,   correct: false },
            { id: 'd', text: <span><MathSpan>e^(x²)</MathSpan></span>, correct: false },
          ],
          explanation: <span>Composing <MathSpan>e^u</MathSpan> with <MathSpan>u = x²</MathSpan>. The inner function is <MathSpan>g(x) = x²</MathSpan>.</span>,
        },
        {
          id: 5,
          prompt: <span>Which expression equals <MathSpan>d/dx[cos(x³)]</MathSpan>?</span>,
          choices: [
            { id: 'a', text: <span><MathSpan>-sin(x³)</MathSpan></span>,          correct: false },
            { id: 'b', text: <span><MathSpan>3x² sin(x³)</MathSpan></span>,       correct: false },
            { id: 'c', text: <span><MathSpan>-3x² sin(x³)</MathSpan></span>,      correct: true  },
            { id: 'd', text: <span><MathSpan>3x² cos(x³)</MathSpan></span>,       correct: false },
          ],
          explanation: <span>Outer: <MathSpan>-sin(u)</MathSpan>. Inner: <MathSpan>x³</MathSpan> → <MathSpan>3x²</MathSpan>. Result: <MathSpan>-3x² sin(x³)</MathSpan>.</span>,
        },
        {
          id: 6,
          prompt: <span>If <MathSpan>f(u) = u⁴</MathSpan> and <MathSpan>u = 2x + 1</MathSpan>, what is <MathSpan>df/dx</MathSpan>?</span>,
          choices: [
            { id: 'a', text: <span><MathSpan>4(2x + 1)³</MathSpan></span>,   correct: false },
            { id: 'b', text: <span><MathSpan>8(2x + 1)³</MathSpan></span>,   correct: true  },
            { id: 'c', text: <span><MathSpan>4u³</MathSpan></span>,           correct: false },
            { id: 'd', text: <span><MathSpan>2(2x + 1)⁴</MathSpan></span>,   correct: false },
          ],
          explanation: <span><MathSpan>df/du = 4u³ = 4(2x+1)³</MathSpan>, <MathSpan>du/dx = 2</MathSpan>. Chain: <MathSpan>8(2x+1)³</MathSpan>.</span>,
        },
      ],
    };

    // ── Timer hook ─────────────────────────────────────────────────────────────
    const useTimer = (startSeconds) => {
      const [secs, setSecs] = React.useState(startSeconds);
      React.useEffect(() => {
        const id = setInterval(() => setSecs((s) => s > 0 ? s - 1 : 0), 1000);
        return () => clearInterval(id);
      }, []);
      const m = String(Math.floor(secs / 60)).padStart(2, '0');
      const s = String(secs % 60).padStart(2, '0');
      return m + ':' + s;
    };

    // ── Quiz Bar ───────────────────────────────────────────────────────────────
    const QuizBar = ({ current, total, xp, hearts, timer }) => {
      const base = SC.ctx || '';
      const pct = (current / total) * 100;
      const warn = parseInt(timer) < 2;
      return (
        <div style={{ position: 'sticky', top: 0, zIndex: 50, background: 'rgba(251,248,241,0.9)', backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', borderBottom: '1px solid var(--line)' }}>
          <div style={{ maxWidth: 860, margin: '0 auto', padding: '14px 24px', display: 'flex', alignItems: 'center', gap: 16 }}>
            <a href={base + '/course'} style={{ width: 36, height: 36, borderRadius: 10, border: '1px solid var(--line)', background: 'var(--paper)', color: 'var(--ink-2)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Icon.Close/>
            </a>
            <div style={{ flex: 1, height: 8, borderRadius: 999, background: 'var(--bg-2)', overflow: 'hidden' }}>
              <div style={{ width: pct + '%', height: '100%', background: 'var(--green)', borderRadius: 999, transition: 'width .4s ease' }}/>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexShrink: 0 }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '5px 10px', borderRadius: 999, background: warn ? 'var(--rose-soft)' : 'var(--bg-2)', color: warn ? 'var(--rose)' : 'var(--ink-3)', fontWeight: 700, fontSize: 13 }}>
                <Icon.Clock/>{timer}
              </div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '5px 10px', borderRadius: 999, background: 'var(--amber-soft)', color: 'var(--amber-deep)', fontWeight: 700, fontSize: 13 }}>
                <Icon.Bolt/>{xp} XP
              </div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '5px 10px', borderRadius: 999, background: 'var(--rose-soft)', color: 'var(--rose)', fontWeight: 700, fontSize: 13 }}>
                {Array.from({ length: 5 }).map((_, i) => <Icon.Heart key={i} style={{ opacity: i < hearts ? 1 : 0.25 }}/>)}
              </div>
              <span className="mono" style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-3)' }}>{current}/{total}</span>
            </div>
          </div>
        </div>
      );
    };

    // ── Question Card ──────────────────────────────────────────────────────────
    const QuestionCard = ({ question, index }) => (
      <div style={{ background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: 24, padding: '36px 40px', boxShadow: 'var(--shadow-md)', marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 22 }}>
          <span className="mono" style={{ width: 36, height: 36, borderRadius: 10, background: 'var(--blue-soft)', color: 'var(--blue-deep)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 14, flexShrink: 0 }}>{index + 1}</span>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', color: 'var(--ink-3)' }}>QUESTION {index + 1} OF {QUIZ.totalQ}</div>
            <div style={{ fontSize: 13, color: 'var(--ink-3)' }}>{QUIZ.lesson}</div>
          </div>
        </div>
        <p style={{ margin: '0 0 8px', fontSize: 20, fontWeight: 700, letterSpacing: '-0.015em', lineHeight: 1.4, color: 'var(--ink)' }}>
          {question.prompt}
        </p>
      </div>
    );

    // ── Choice Button ──────────────────────────────────────────────────────────
    const ChoiceButton = ({ choice, selected, revealed, onSelect }) => {
      const isSelected = selected === choice.id;
      const correct = choice.correct;
      let bg = 'var(--paper)', border = 'var(--line)', color = 'var(--ink)', iconEl = null;
      if (revealed) {
        if (correct) {
          bg = 'var(--green-soft)'; border = 'var(--green)'; color = 'var(--green-deep)';
          iconEl = <span style={{ width: 24, height: 24, borderRadius: 999, background: 'var(--green)', color: 'white', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Icon.Check/></span>;
        } else if (isSelected) {
          bg = 'var(--rose-soft)'; border = 'var(--rose)'; color = 'var(--rose)';
          iconEl = <span style={{ width: 24, height: 24, borderRadius: 999, background: 'var(--rose)', color: 'white', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Icon.Close/></span>;
        }
      } else if (isSelected) {
        bg = 'var(--blue-soft)'; border = 'var(--blue)'; color = 'var(--blue-deep)';
      }
      return (
        <button
          onClick={() => !revealed && onSelect(choice.id)}
          style={{ width: '100%', padding: '16px 20px', borderRadius: 14, border: '1.5px solid ' + border, background: bg, color: color, textAlign: 'left', cursor: revealed ? 'default' : 'pointer', display: 'flex', alignItems: 'center', gap: 14, fontSize: 15, fontWeight: isSelected || (revealed && correct) ? 700 : 500, transition: 'border-color .15s,background .15s', boxShadow: isSelected && !revealed ? 'var(--shadow-sm)' : 'none' }}
        >
          <span className="mono" style={{ width: 28, height: 28, borderRadius: 8, background: 'var(--bg-2)', color: 'var(--ink-3)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{choice.id.toUpperCase()}</span>
          <span style={{ flex: 1 }}>{choice.text}</span>
          {iconEl}
        </button>
      );
    };

    // ── Quiz Action Bar ────────────────────────────────────────────────────────
    const QuizActionBar = ({ selected, revealed, isLast, onCheck, onNext, onFinish, correctAnswer, explanation }) => {
      if (!revealed) {
        return (
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 8 }}>
            <button
              onClick={onCheck}
              disabled={!selected}
              style={{ padding: '15px 32px', borderRadius: 14, border: 'none', background: selected ? 'var(--green)' : 'var(--bg-2)', color: selected ? 'white' : 'var(--ink-3)', fontWeight: 700, fontSize: 16, cursor: selected ? 'pointer' : 'not-allowed', boxShadow: selected ? '0 2px 0 var(--green-deep),0 8px 18px -6px rgba(31,138,91,0.4)' : 'none', transition: 'all .15s', display: 'inline-flex', alignItems: 'center', gap: 8 }}
            >
              Check answer <Icon.Arrow/>
            </button>
          </div>
        );
      }
      return (
        <div>
          <div style={{ padding: '16px 20px', borderRadius: 16, background: correctAnswer ? 'var(--green-soft)' : 'var(--rose-soft)', border: '1px solid ' + (correctAnswer ? 'var(--green)' : 'var(--rose)'), marginTop: 8, marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <span style={{ fontWeight: 700, fontSize: 14, color: correctAnswer ? 'var(--green-deep)' : 'var(--rose)' }}>
                {correctAnswer ? 'Correct!' : 'Not quite.'}
              </span>
              {correctAnswer && <Icon.Sparkle style={{ color: 'var(--green-deep)', width: 14, height: 14 }}/>}
            </div>
            <div style={{ fontSize: 14, color: correctAnswer ? 'var(--green-deep)' : 'var(--rose)', lineHeight: 1.5 }}>{explanation}</div>
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button
              onClick={isLast ? onFinish : onNext}
              style={{ padding: '15px 32px', borderRadius: 14, border: 'none', background: 'var(--green)', color: 'white', fontWeight: 700, fontSize: 16, cursor: 'pointer', boxShadow: '0 2px 0 var(--green-deep),0 8px 18px -6px rgba(31,138,91,0.4)', display: 'inline-flex', alignItems: 'center', gap: 8 }}
            >
              {isLast ? 'Finish quiz' : 'Next question'} <Icon.Arrow/>
            </button>
          </div>
        </div>
      );
    };

    // ── Session Panel ──────────────────────────────────────────────────────────
    const Row = ({ label, value, color }) => (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--line)' }}>
        <span style={{ fontSize: 13, color: 'var(--ink-3)' }}>{label}</span>
        <span style={{ fontSize: 14, fontWeight: 700, color: color || 'var(--ink)' }}>{value}</span>
      </div>
    );

    const SessionPanel = ({ total, correct, xpEarned, onContinue }) => {
      const base = SC.ctx || '';
      const pct = Math.round((correct / total) * 100);
      const passed = pct >= 70;
      return (
        <div style={{ maxWidth: 560, margin: '60px auto', padding: '0 24px' }}>
          <div style={{ background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: 28, padding: '44px 40px', boxShadow: 'var(--shadow-lg)', textAlign: 'center' }}>
            <div style={{ width: 80, height: 80, borderRadius: 999, background: passed ? 'var(--green-soft)' : 'var(--rose-soft)', color: passed ? 'var(--green)' : 'var(--rose)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: 36 }}>
              {passed ? '🎉' : '📖'}
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.08em', color: 'var(--ink-3)', marginBottom: 8 }}>QUIZ COMPLETE</div>
            <h2 style={{ margin: '0 0 6px', fontSize: 36, fontWeight: 800, letterSpacing: '-0.03em' }}>{pct}%</h2>
            <p style={{ margin: '0 0 32px', fontSize: 15, color: 'var(--ink-2)' }}>
              {passed ? 'Great work! You passed this lesson.' : 'Review the material and try again.'}
            </p>
            <div style={{ textAlign: 'left', marginBottom: 32 }}>
              <Row label="Questions answered" value={total + ' / ' + total}/>
              <Row label="Correct answers"    value={correct + ' / ' + total} color={passed ? 'var(--green-deep)' : 'var(--rose)'}/>
              <Row label="Accuracy"           value={pct + '%'}/>
              <Row label="XP earned"          value={'+' + xpEarned + ' XP'} color="var(--amber-deep)"/>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <button
                onClick={onContinue}
                style={{ padding: '15px 24px', borderRadius: 14, border: 'none', background: 'var(--green)', color: 'white', fontWeight: 700, fontSize: 16, cursor: 'pointer', boxShadow: '0 2px 0 var(--green-deep)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}
              >
                Continue to next lesson <Icon.Arrow/>
              </button>
              <a href={base + '/course'} style={{ padding: '14px 24px', borderRadius: 14, border: '1px solid var(--line)', background: 'var(--bg)', color: 'var(--ink-2)', fontWeight: 600, fontSize: 15, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                Back to course
              </a>
            </div>
          </div>
        </div>
      );
    };

    // ── Quiz App ───────────────────────────────────────────────────────────────
    const QuizApp = () => {
      const [qIndex,   setQIndex]   = React.useState(0);
      const [selected, setSelected] = React.useState(null);
      const [revealed, setRevealed] = React.useState(false);
      const [answers,  setAnswers]  = React.useState([]);
      const [done,     setDone]     = React.useState(false);
      const timer = useTimer(8 * 60);

      const question = QUIZ.questions[qIndex];
      const isLast   = qIndex === QUIZ.questions.length - 1;

      const handleCheck = () => {
        if (!selected) return;
        const correct = question.choices.find((c) => c.id === selected)?.correct || false;
        setAnswers((prev) => [...prev, { qId: question.id, correct }]);
        setRevealed(true);
      };

      const handleNext = () => {
        setSelected(null);
        setRevealed(false);
        setQIndex((i) => i + 1);
      };

      const handleFinish = () => {
        setDone(true);
      };

      if (done) {
        const correct = answers.filter((a) => a.correct).length;
        const xpEarned = Math.round(QUIZ.xpReward * correct / QUIZ.totalQ);
        return <SessionPanel total={QUIZ.totalQ} correct={correct} xpEarned={xpEarned} onContinue={() => { setDone(false); setQIndex(0); setAnswers([]); setSelected(null); setRevealed(false); }}/>;
      }

      const correctAnswer = revealed && (question.choices.find((c) => c.id === selected)?.correct || false);
      const heartsLeft    = 5 - answers.filter((a) => !a.correct).length;

      return (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <QuizBar
            current={qIndex + 1}
            total={QUIZ.totalQ}
            xp={QUIZ.xpReward}
            hearts={Math.max(0, heartsLeft)}
            timer={timer}
          />
          <div style={{ flex: 1, maxWidth: 760, margin: '0 auto', padding: '32px 24px 80px', width: '100%' }}>
            <div style={{ marginBottom: 16 }}>
              <span style={{ fontSize: 12, color: 'var(--ink-3)', fontWeight: 600 }}>{QUIZ.course} · {QUIZ.chapter}</span>
            </div>
            <QuestionCard question={question} index={qIndex}/>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
              {question.choices.map((choice) => (
                <ChoiceButton
                  key={choice.id}
                  choice={choice}
                  selected={selected}
                  revealed={revealed}
                  onSelect={setSelected}
                />
              ))}
            </div>
            <QuizActionBar
              selected={selected}
              revealed={revealed}
              isLast={isLast}
              onCheck={handleCheck}
              onNext={handleNext}
              onFinish={handleFinish}
              correctAnswer={correctAnswer}
              explanation={question.explanation}
            />
          </div>
        </div>
      );
    };

    ReactDOM.createRoot(document.getElementById('root')).render(<QuizApp/>);
  </script>
</body>
</html>
