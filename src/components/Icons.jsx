// Small inline SVG icon set (no dependency). All are decorative; pair with visible text or aria-label.
const base = { width: 20, height: 20, viewBox: '0 0 24 24', 'aria-hidden': true, focusable: false }
const stroke = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' }

export const MailIcon = (p) => (
  <svg {...base} {...stroke} {...p}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
)
export const PinIcon = (p) => (
  <svg {...base} {...stroke} {...p}><path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21Z" /><circle cx="12" cy="9.5" r="2.5" /></svg>
)
export const ArrowLeftIcon = (p) => (
  <svg {...base} {...stroke} {...p}><path d="M15 5l-7 7 7 7" /></svg>
)
export const ArrowRightIcon = (p) => (
  <svg {...base} {...stroke} {...p}><path d="m9 5 7 7-7 7" /></svg>
)
export const ArrowUpIcon = (p) => (
  <svg {...base} {...stroke} {...p}><path d="M12 19V5M5 12l7-7 7 7" /></svg>
)
export const ExpandIcon = (p) => (
  <svg {...base} {...stroke} {...p}><path d="M14 4h6v6M10 20H4v-6M20 4l-7 7M4 20l7-7" /></svg>
)
export const PlayIcon = (p) => (
  <svg {...base} fill="currentColor" {...p}><path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" /></svg>
)
export const MenuIcon = (p) => (
  <svg {...base} {...stroke} {...p}><path d="M4 7h16M4 12h16M4 17h16" /></svg>
)
export const CloseIcon = (p) => (
  <svg {...base} {...stroke} {...p}><path d="M6 6l12 12M18 6 6 18" /></svg>
)
export const FacebookIcon = (p) => (
  <svg {...base} fill="currentColor" {...p}><path d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.4 1.5-1.4h1.6V4.5c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 3.9v2.2H8v3h2.5V21h3Z" /></svg>
)
export const LinkedInIcon = (p) => (
  <svg {...base} fill="currentColor" {...p}><path d="M5.2 8.9h3V19h-3V8.9ZM6.7 4a1.75 1.75 0 1 1 0 3.5 1.75 1.75 0 0 1 0-3.5ZM10.3 8.9h2.9v1.4h.04c.4-.8 1.4-1.6 2.9-1.6 3.1 0 3.7 2 3.7 4.7V19h-3v-5c0-1.2 0-2.7-1.7-2.7s-1.9 1.3-1.9 2.6V19h-3V8.9Z" /></svg>
)
