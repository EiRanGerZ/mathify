// Fire a transient toast. Picked up by the <Toast/> component, which listens for
// the `student-notify` window event.
export const notify = (msg) =>
  window.dispatchEvent(new CustomEvent('student-notify', { detail: { msg } }));
