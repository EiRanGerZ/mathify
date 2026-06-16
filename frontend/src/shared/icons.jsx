import React from 'react';

// Inline SVG icon set, keyed by name. Notification icons reference these keys
// (Trophy, Bolt, Star, Close, Bell) — keep names in sync with NotificationType.
export const Icon = {
  Check:   (p) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}><path d="M3 8.5L6.5 12L13 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  Arrow:   (p) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}><path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  Lock:    (p) => <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...p}><rect x="2.5" y="6" width="9" height="6.5" rx="1.5" stroke="currentColor" strokeWidth="1.6"/><path d="M4.5 6V4.5C4.5 3.12 5.62 2 7 2C8.38 2 9.5 3.12 9.5 4.5V6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/></svg>,
  Flame:   (p) => <svg width="18" height="18" viewBox="0 0 18 18" fill="none" {...p}><path d="M9 2C9 5 6 5.5 6 9C6 11.5 7.5 13.5 9 13.5C10.5 13.5 12 11.5 12 9C12 7 11 6 11 4C12 5 13 6.5 13 9C13 12 11.2 14.5 9 14.5C6.8 14.5 5 12.5 5 9.5C5 6 9 5 9 2Z" fill="currentColor"/></svg>,
  Star:    (p) => <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...p}><path d="M7 1.5L8.7 5L12.5 5.55L9.75 8.2L10.4 12L7 10.2L3.6 12L4.25 8.2L1.5 5.55L5.3 5Z" fill="currentColor"/></svg>,
  Sparkle: (p) => <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...p}><path d="M7 1L8 6L13 7L8 8L7 13L6 8L1 7L6 6Z" fill="currentColor"/></svg>,
  Play:    (p) => <svg width="12" height="12" viewBox="0 0 12 12" fill="none" {...p}><path d="M3.5 2.5V9.5L9.5 6L3.5 2.5Z" fill="currentColor"/></svg>,
  Bolt:    (p) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}><path d="M9 1L3 9H8L7 15L13 7H8L9 1Z" fill="currentColor"/></svg>,
  Trophy:  (p) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}><path d="M5 2H11V7C11 9 9.5 10.5 8 10.5C6.5 10.5 5 9 5 7V2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><path d="M5 3.5H3V5C3 6 3.7 7 5 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M11 3.5H13V5C13 6 12.3 7 11 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M8 10.5V13M6 13.5H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  Heart:   (p) => <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...p}><path d="M7 12C7 12 1.5 8.5 1.5 5C1.5 3.3 2.8 2 4.5 2C5.5 2 6.5 2.7 7 3.5C7.5 2.7 8.5 2 9.5 2C11.2 2 12.5 3.3 12.5 5C12.5 8.5 7 12 7 12Z" fill="currentColor"/></svg>,
  Target:  (p) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}><circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5"/><circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.5"/><circle cx="8" cy="8" r="1" fill="currentColor"/></svg>,
  Compass: (p) => <svg width="20" height="20" viewBox="0 0 20 20" fill="none" {...p}><circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.6"/><path d="M13.5 6.5L11 11L6.5 13.5L9 9L13.5 6.5Z" fill="currentColor"/></svg>,
  Bell:    (p) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}><path d="M4 7C4 4.8 5.8 3 8 3C10.2 3 12 4.8 12 7V10L13 11.5H3L4 10V7Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><path d="M6.5 12.5C6.5 13.3 7.2 14 8 14C8.8 14 9.5 13.3 9.5 12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  Search:  (p) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}><circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.5"/><path d="M10.5 10.5L13.5 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  Clock:   (p) => <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...p}><circle cx="7" cy="7" r="5.5" stroke="currentColor" strokeWidth="1.5"/><path d="M7 4V7L9 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  Tree:    (p) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}><path d="M8 2V14M8 6L11 4M8 6L5 4M8 10L11.5 8M8 10L4.5 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  Book:    (p) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}><path d="M3 3H7C7.5 3 8 3.5 8 4V13C8 12.5 7.5 12 7 12H3V3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><path d="M13 3H9C8.5 3 8 3.5 8 4V13C8 12.5 8.5 12 9 12H13V3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>,
  Plus:    (p) => <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...p}><path d="M7 3V11M3 7H11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>,
  Menu:    (p) => <svg width="18" height="18" viewBox="0 0 18 18" fill="none" {...p}><path d="M3 5H15M3 9H15M3 13H15" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>,
  Close:   (p) => <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...p}><path d="M4 4L12 12M12 4L4 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>,
};

export const Logo = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
    <rect x="1.5" y="1.5" width="29" height="29" rx="9" fill="var(--green)"/>
    <rect x="1.5" y="1.5" width="29" height="29" rx="9" stroke="var(--green-deep)" strokeWidth="1.5"/>
    <path d="M8 22V10L13 18L18 10V22" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="22" cy="11" r="2" fill="var(--amber)"/>
  </svg>
);
