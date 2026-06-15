<%@ page contentType="text/html;charset=UTF-8" language="java" isELIgnored="true" %>
<%@ page import="com.mathify.model.AuthUser, com.mathify.model.UserProgress" %>
<%
    HttpSession  sess     = request.getSession(false);
    AuthUser     authUser = (sess != null) ? (AuthUser)     sess.getAttribute("authUser") : null;
    UserProgress up       = (sess != null) ? (UserProgress) sess.getAttribute("progress") : null;

    String userName = (authUser != null) ? authUser.preferredName() : "Student";
    String initial  = (authUser != null) ? authUser.initial()       : "S";
    int    streak   = (up != null) ? up.getCurrentStreak() : 0;
    int    totalXP  = (up != null) ? up.getTotalXP()       : 0;
    int    level    = (up != null) ? up.getLevel()         : 1;
    String jsName   = userName.replace("\\", "\\\\").replace("\"", "\\\"");
    String ctx      = request.getContextPath();

    String pageTitle = "Mathify — My Library";
    String activeNav = "library";
%>
<%@ include file="/WEB-INF/jsp/shared/student-shell.jspf" %>

  <script>
    var COURSES_DATA  = <%= request.getAttribute("coursesJson")     != null ? request.getAttribute("coursesJson")     : "[]"   %>;
    var ENROLLED_IDS  = <%= request.getAttribute("enrolledIdsJson") != null ? request.getAttribute("enrolledIdsJson") : "[]"   %>;
    var COMPLETED_IDS = <%= request.getAttribute("completedIdsJson")!= null ? request.getAttribute("completedIdsJson"): "[]"   %>;
    var FOCUS_COURSE  = <%= request.getAttribute("focusCourseJson") != null ? request.getAttribute("focusCourseJson") : "null" %>;
  </script>

  <script type="text/babel">
    const ALL_COURSES     = window.COURSES_DATA  || [];
    const ENROLLED_SET    = new Set(window.ENROLLED_IDS  || []);
    const COMPLETED_SET   = new Set(window.COMPLETED_IDS || []);
    const FOCUS           = window.FOCUS_COURSE  || null;

    const ENROLLED_COURSES  = ALL_COURSES.filter(c => ENROLLED_SET.has(c.id));
    const IN_PROGRESS       = ENROLLED_COURSES.filter(c => !COMPLETED_SET.has(c.id));
    const COMPLETED_COURSES = ENROLLED_COURSES.filter(c =>  COMPLETED_SET.has(c.id));

    // ── Your Current Focus (last course the user touched) ──────────────────────
    const CurrentFocus = () => {
      const base = SC.ctx || '';

      if (!FOCUS || ENROLLED_COURSES.length === 0) {
        return (
          <div style={{ borderRadius: 20, border: '1.5px dashed var(--line)', background: 'var(--paper)', padding: '32px 36px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, marginBottom: 36, flexWrap: 'wrap' }}>
            <div>
              <span className="mono" style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: 'var(--ink-3)', display: 'block', marginBottom: 10 }}>YOUR CURRENT FOCUS</span>
              <h2 style={{ margin: '0 0 8px', fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em' }}>Start your learning journey</h2>
              <p style={{ margin: 0, color: 'var(--ink-3)', fontSize: 14, maxWidth: 480, lineHeight: 1.55 }}>
                You haven&rsquo;t enrolled in any courses yet. Browse All Courses to begin.
              </p>
            </div>
            <a href={base + '/courses'}
               style={{ flexShrink: 0, display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 20px', borderRadius: 12, background: 'var(--green)', color: 'white', fontWeight: 700, fontSize: 14, boxShadow: '0 2px 0 var(--green-deep)' }}>
              Browse courses <Icon.Arrow/>
            </a>
          </div>
        );
      }

      const course = FOCUS;
      const c = COLOR_MAP[course.color] || COLOR_MAP.green;
      const isCompleted = COMPLETED_SET.has(course.id);

      return (
        <div style={{ position: 'relative', overflow: 'hidden', background: 'var(--ink)', color: 'var(--paper)', borderRadius: 24, padding: '28px 32px', display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 32, boxShadow: 'var(--shadow-md)', marginBottom: 36 }}>
          <span className="serif" style={{ position: 'absolute', right: -24, top: -64, fontSize: 300, lineHeight: 1, color: c.solid, opacity: 0.15, fontWeight: 600, pointerEvents: 'none', userSelect: 'none' }}>{course.glyph}</span>
          <div style={{ position: 'relative' }}>
            <span className="mono" style={{ display: 'inline-block', padding: '4px 10px', background: 'rgba(255,255,255,0.12)', borderRadius: 999, fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', marginBottom: 14 }}>YOUR CURRENT FOCUS</span>
            <h2 style={{ margin: '0 0 8px', fontSize: 28, fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 1.15 }}>{course.title}</h2>
            <p style={{ margin: 0, color: 'rgba(255,253,247,0.65)', fontSize: 14, maxWidth: 420, lineHeight: 1.55 }}>{course.blurb}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 22 }}>
              <a href={base + '/course?courseId=' + course.id}
                 style={{ padding: '11px 20px', borderRadius: 12, background: 'var(--green)', color: 'white', fontWeight: 700, fontSize: 14, display: 'inline-flex', alignItems: 'center', gap: 8, boxShadow: '0 2px 0 var(--green-deep)' }}>
                {isCompleted ? 'Review course' : 'Resume course'} <Icon.Arrow/>
              </a>
            </div>
          </div>
          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 14 }}>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'rgba(255,253,247,0.65)' }}>
                <Icon.Book/> {course.lessons} lessons
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'rgba(255,253,247,0.65)' }}>
                <Icon.Clock/> {flexTime(course.hours)}
              </span>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--amber)' }}>
                <Icon.Bolt/> {course.xp} XP
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span className="mono" style={{ padding: '4px 10px', background: 'rgba(255,255,255,0.1)', borderRadius: 8, fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', color: 'rgba(255,253,247,0.75)' }}>
                {course.track.toUpperCase()}
              </span>
              {isCompleted && (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '4px 10px', background: 'rgba(31,138,91,0.25)', borderRadius: 999, fontSize: 11, fontWeight: 700, color: 'var(--green-soft)' }}>
                  <Icon.Check/> COMPLETED
                </span>
              )}
            </div>
          </div>
        </div>
      );
    };

    // ── Library card (an enrolled course) ──────────────────────────────────────
    const LibraryCard = ({ course }) => {
      const base = SC.ctx || '';
      const c = COLOR_MAP[course.color] || COLOR_MAP.green;
      const completed = COMPLETED_SET.has(course.id);
      return (
        <a href={base + '/course?courseId=' + course.id}
           style={{ display: 'flex', flexDirection: 'column', background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: 20, overflow: 'hidden', boxShadow: 'var(--shadow-sm)', textDecoration: 'none' }}
           onMouseEnter={e => e.currentTarget.style.boxShadow = 'var(--shadow-md)'}
           onMouseLeave={e => e.currentTarget.style.boxShadow = 'var(--shadow-sm)'}>
          <div style={{ position: 'relative', height: 110, background: c.bg, overflow: 'hidden', borderBottom: '1px solid var(--line)', display: 'flex', alignItems: 'flex-end', padding: '0 16px 12px' }}>
            <span className="serif" style={{ position: 'absolute', right: 10, top: -24, fontSize: 140, color: c.deep, opacity: 0.18, fontWeight: 600, lineHeight: 1, pointerEvents: 'none' }}>{course.glyph}</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, position: 'relative' }}>
              <span className="mono" style={{ padding: '3px 8px', borderRadius: 6, background: 'rgba(255,253,247,0.7)', backdropFilter: 'blur(4px)', fontSize: 11, fontWeight: 700, color: c.deep }}>
                {course.track.toUpperCase()}
              </span>
              <span style={{ padding: '3px 10px', borderRadius: 999, fontSize: 11, fontWeight: 700, letterSpacing: '0.04em', background: completed ? 'var(--green)' : 'var(--amber-soft)', color: completed ? 'white' : 'var(--amber-deep)', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                {completed ? <><Icon.Check/> COMPLETED</> : 'IN PROGRESS'}
              </span>
            </div>
          </div>
          <div style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 700, letterSpacing: '-0.015em', lineHeight: 1.25 }}>{course.title}</h3>
            <p style={{ margin: 0, fontSize: 13, color: 'var(--ink-3)', lineHeight: 1.45, flex: 1 }}>{course.blurb}</p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 10, borderTop: '1px solid var(--line)', marginTop: 4 }}>
              <div style={{ display: 'flex', gap: 12, fontSize: 12, color: 'var(--ink-3)' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Icon.Book/> {course.lessons}</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}><Icon.Clock/> {flexTime(course.hours)}</span>
              </div>
              <span style={{ fontSize: 13, fontWeight: 700, color: c.deep, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                {completed ? 'Review' : 'Continue'} <Icon.Arrow/>
              </span>
            </div>
          </div>
        </a>
      );
    };

    // ── My Library (enrolled only, In Progress / Completed) ────────────────────
    const MyLibrary = () => {
      const [tab, setTab]     = React.useState('progress');
      const [query, setQuery] = React.useState('');

      const list = tab === 'progress' ? IN_PROGRESS : COMPLETED_COURSES;
      const shown = query.trim()
        ? list.filter(c => c.track.toLowerCase().includes(query.toLowerCase()))
        : list;

      const tabBtn = (id, label, count) => (
        <button onClick={() => setTab(id)}
                style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '8px 14px', borderRadius: 8, border: 'none', cursor: 'pointer', fontFamily: 'inherit', fontWeight: 600, fontSize: 13, background: tab === id ? 'var(--ink)' : 'transparent', color: tab === id ? 'var(--paper)' : 'var(--ink-2)' }}>
          {label}
          <span className="mono" style={{ fontSize: 11, opacity: tab === id ? 0.55 : 0.7 }}>{count}</span>
        </button>
      );

      return (
        <div style={{ marginBottom: 48 }}>
          <SectionHeader
            eyebrow={'MY LIBRARY · ' + ENROLLED_COURSES.length + ' ENROLLED'}
            title="My Library"
            right={
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                <CategorySearch value={query} onChange={setQuery}/>
                <div style={{ display: 'inline-flex', padding: 4, gap: 2, background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: 12 }}>
                  {tabBtn('progress',  'In Progress', IN_PROGRESS.length)}
                  {tabBtn('completed', 'Completed',   COMPLETED_COURSES.length)}
                </div>
              </div>
            }
          />
          {ENROLLED_COURSES.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px 24px', borderRadius: 20, border: '1.5px dashed var(--line)', background: 'var(--paper)', color: 'var(--ink-3)', fontSize: 14 }}>
              You aren&rsquo;t enrolled in any courses yet.{' '}
              <a href={(SC.ctx || '') + '/courses'} style={{ color: 'var(--green-deep)', fontWeight: 700 }}>Browse All Courses →</a>
            </div>
          ) : shown.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 24px', color: 'var(--ink-3)', fontSize: 14 }}>
              {query.trim()
                ? 'No ' + (tab === 'progress' ? 'in-progress' : 'completed') + ' courses match “' + query + '”.'
                : (tab === 'progress'
                    ? 'No courses in progress right now.'
                    : "You haven't completed any courses yet. Keep going!")}
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
              {shown.map(c => <LibraryCard key={c.id} course={c}/>)}
            </div>
          )}
        </div>
      );
    };

    const LibraryApp = () => {
      const base = SC.ctx || '';
      useFlashMessage();
      return (
        <div>
          <Nav/>
          <main style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 24px 80px' }}>
            <div style={{ marginBottom: 28 }}>
              <span className="mono" style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', color: 'var(--ink-3)' }}>
                MY LIBRARY · {ENROLLED_COURSES.length} ENROLLED
              </span>
              <h1 style={{ margin: '4px 0 0', fontSize: 40, fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.05 }}>
                Your courses, <span className="serif" style={{ color: 'var(--green-deep)' }}>in progress</span>.
              </h1>
            </div>

            <CurrentFocus/>
            <MyLibrary/>

            <StudentFooter label="My Library" links={[
              { label: 'Browse all courses', href: base + '/courses' },
              { label: 'Back to dashboard',  href: base + '/dashboard' },
            ]}/>
          </main>
        </div>
      );
    };

    ReactDOM.createRoot(document.getElementById('root')).render(<LibraryApp/>);
  </script>

</body>
</html>
