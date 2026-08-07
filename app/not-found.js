import Link from 'next/link';
import styles from './not-found.module.css';

export const metadata = {
  title: 'Page not found',
  description: 'The page you were looking for could not be found on The Brian Journal.',
};

const suggestions = [
  { label: 'Archive', href: '/archive' },
  { label: 'Topics', href: '/topics' },
  { label: 'About', href: '/about' },
  { label: 'Portfolio', href: 'https://bcastelino.com/', external: true },
];

export default function NotFound() {
  return (
    <div className={styles.wrap}>
      <h1 className={styles.code} aria-label="Error 404">
        404
      </h1>
      <p className={styles.message}>
        The page you&apos;re looking for might have been
        <br />
        moved or doesn&apos;t exist.
      </p>
      <nav className={styles.suggestions} aria-label="Suggested pages">
        <span className={styles.suggestionsTitle}>You might be looking for:</span>
        <ul className={styles.suggestionsList}>
          {suggestions.map((item) => {
            const content = (
              <>
                <span>{item.label}</span>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14" />
                  <path d="m13 6 6 6-6 6" />
                </svg>
              </>
            );
            return (
              <li key={item.label}>
                {item.external ? (
                  <a href={item.href} target="_blank" rel="noopener" className={styles.suggestionRow}>
                    {content}
                  </a>
                ) : (
                  <Link href={item.href} className={styles.suggestionRow}>
                    {content}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      <div className={styles.actions}>
        <Link href="/" className={`${styles.button} ${styles.buttonPrimary}`}>
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          Go Home
        </Link>
        <a
          href="https://bcastelino.com/#contact"
          target="_blank"
          rel="noopener"
          className={`${styles.button} ${styles.buttonGhost}`}
        >
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="2" y="4" width="20" height="16" rx="2" />
            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
          </svg>
          Contact
        </a>
      </div>
    </div>
  );
}
