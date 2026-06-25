import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="container" style={{ padding: '96px 0', textAlign: 'center' }}>
      <h1 style={{ fontSize: '2.4rem', letterSpacing: '-0.03em', margin: '0 0 12px' }}>
        404
      </h1>
      <p style={{ color: 'var(--color-text-secondary)', margin: '0 0 24px' }}>
        This page could not be found.
      </p>
      <Link href="/" style={{ color: 'var(--color-accent)' }}>
        ← Back home
      </Link>
    </div>
  );
}
