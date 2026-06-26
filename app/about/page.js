import styles from './page.module.css';

export const metadata = {
  title: 'About',
  description: 'About Brian Castelino and this blog.',
};

export default function AboutPage() {
  return (
    <div className="container">
      <section className={styles.wrap}>
        <h1 className={styles.title}>About</h1>
        <div className="prose">
          <p>
            Hi, I&apos;m Brian. This is my personal blog where I write about technology,
            the things I build, and ideas I&apos;m working through.
          </p>
          <p>
            The site is intentionally simple: a statically generated Next.js app hosted
            on GitHub Pages, with posts written in Markdown.
          </p>
          <p>
            You can find more of my work on{' '}
            <a href="https://github.com/bcastelino" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>{' '}
            or visit my{' '}
            <a
              href="https://bcastelino.github.io/?utm_source=brian-journal&utm_medium=referral&utm_campaign=about&utm_content=text-link"
              target="_blank"
              rel="noopener"
            >
              personal website
            </a>
            .
          </p>
        </div>

        <figure className={styles.preview}>
          <div className={styles.previewWindow}>
            <div className={styles.previewBar}>
              <span className={`${styles.dot} ${styles.dotRed}`} />
              <span className={`${styles.dot} ${styles.dotYellow}`} />
              <span className={`${styles.dot} ${styles.dotGreen}`} />
              <span className={styles.previewUrl}>bcastelino.github.io</span>
            </div>
            <div className={styles.previewViewport}>
              <iframe
                src="https://bcastelino.github.io/?utm_source=brian-journal&utm_medium=referral&utm_campaign=about&utm_content=preview-embed"
                title="Preview of Brian Castelino's personal website"
                loading="lazy"
                className={styles.previewFrame}
              />
            </div>
          </div>
          <figcaption className={styles.previewCaption}>
            <a
              href="https://bcastelino.github.io/?utm_source=brian-journal&utm_medium=referral&utm_campaign=about&utm_content=preview-link"
              target="_blank"
              rel="noopener"
            >
              Open bcastelino.github.io →
            </a>
          </figcaption>
        </figure>
      </section>
    </div>
  );
}
