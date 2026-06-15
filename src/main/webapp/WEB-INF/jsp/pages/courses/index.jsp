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

    String pageTitle = "Mathify — All Courses";
    String activeNav = "courses";
%>
<%@ include file="/WEB-INF/jsp/shared/student-shell.jspf" %>

  <script>
    var COURSES_DATA  = <%= request.getAttribute("coursesJson")     != null ? request.getAttribute("coursesJson")     : "[]"   %>;
    var ENROLLED_IDS  = <%= request.getAttribute("enrolledIdsJson") != null ? request.getAttribute("enrolledIdsJson") : "[]"   %>;
    var COMPLETED_IDS = <%= request.getAttribute("completedIdsJson")!= null ? request.getAttribute("completedIdsJson"): "[]"   %>;
  </script>

  <script type="text/babel">
    const ALL_COURSES   = window.COURSES_DATA  || [];
    const ENROLLED_SET  = new Set(window.ENROLLED_IDS  || []);
    const COMPLETED_SET = new Set(window.COMPLETED_IDS || []);

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

    ReactDOM.createRoot(document.getElementById('root')).render(<CoursesApp/>);
  </script>

</body>
</html>
