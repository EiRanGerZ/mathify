// Page context injected by the JSP shell as `window.STUDENT_CONTEXT`
// (name, initial, streak, xp, level, ctx). Server-rendered, read-only.
export const SC = (typeof window !== 'undefined' && window.STUDENT_CONTEXT) || {};
