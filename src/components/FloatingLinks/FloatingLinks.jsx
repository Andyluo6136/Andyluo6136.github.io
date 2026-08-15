import './FloatingLinks.css';

const links = [
  {
    label: 'GitHub',
    href: 'https://github.com/Andyluo6136',
    icon: <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.18-3.37-1.18-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.54 1.04 1.54 1.04.9 1.54 2.35 1.1 2.92.84.09-.65.35-1.1.64-1.35-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.85-2.35 4.7-4.58 4.95.36.31.68.9.68 1.81v2.68c0 .26.18.58.69.48A10 10 0 0 0 12 2Z" />,
  },
  {
    label: 'Email',
    href: 'mailto:andyluo6136@outlook.com',
    icon: <path d="M3 5h18a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Zm0 2 9 6 9-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" />,
  },
  {
    label: 'Resume',
    href: '/Andy_Luo_Resume.pdf',
    icon: <path d="M6 2h8l4 4v16H6V2Zm8 0v5h5M9 12h6M9 16h6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" />,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/andy-luo06/',
    icon: <path d="M5 3.5A1.5 1.5 0 1 1 2 3.5a1.5 1.5 0 0 1 3 0ZM2 8h3v12H2V8Zm5 0h2.9v1.64h.04C10.34 8.88 11.32 8 13.12 8 16.25 8 17 10.06 17 12.73V20h-3v-6.45c0-1.54-.03-3.53-2.15-3.53-2.16 0-2.49 1.68-2.49 3.42V20h-3V8Z" transform="translate(2 1)" />,
  },
];

function FloatingLinks() {
  return (
    <nav className="floating-links" aria-label="External links">
      {links.map(({ label, href, icon }) => (
        <a
          key={label}
          className="floating-links__item"
          href={href}
          aria-label={label}
          title={label}
          target={label === 'Email' ? undefined : '_blank'}
          rel={label === 'Email' ? undefined : 'noreferrer'}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">{icon}</svg>
        </a>
      ))}
    </nav>
  );
}

export default FloatingLinks;
