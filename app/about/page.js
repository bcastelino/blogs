import styles from './page.module.css';

export const metadata = {
  title: 'About',
  description:
    'Brian Castelino, AI Data Engineer at WorldLink US, building production ML and LLM systems on Databricks.',
  alternates: {
    canonical: 'https://bcastelino.com/blogs/about/',
  },
};

export default function AboutPage() {
  return (
    <div className="container">
      <section className={styles.wrap}>
        <h1 className={styles.title}>About</h1>
        <div className="prose">
          <p>
            I&apos;m Brian, an AI Data Engineer at WorldLink US. I build production ML and
            LLM systems on Databricks: Delta pipelines, MLflow registries, model
            serving, and the promotion workflows that get a model from a notebook to
            something a thousand people can query.
          </p>
          <p>
            I write here because explaining a system is the fastest way to find out
            whether I actually understand it. Most of what&apos;s on this site is long-form
            and sourced: Databricks platform deep dives, partner architecture, the
            seam between LLMs and BI, and the occasional honest book review.
          </p>
          <p>
            I also contribute to Databricks Labs&apos; OntoBricks, where debugging an
            event-loop stall in someone else&apos;s production codebase taught me more
            than any tutorial has.
          </p>
          <p>
            The case studies, code, and credentials live on my portfolio.
          </p>
        </div>

        <figure className={styles.preview}>
          <div className={styles.previewWindow}>
            <div className={styles.previewBar}>
              <span className={`${styles.dot} ${styles.dotRed}`} />
              <span className={`${styles.dot} ${styles.dotYellow}`} />
              <span className={`${styles.dot} ${styles.dotGreen}`} />
              <span className={styles.previewUrl}>bcastelino.com</span>
            </div>
            <div className={styles.previewViewport}>
              <iframe
                src="https://bcastelino.com/?utm_source=brian-journal&utm_medium=referral&utm_campaign=about&utm_content=preview-embed"
                title="Preview of Brian Castelino's personal website"
                loading="lazy"
                className={styles.previewFrame}
              />
            </div>
          </div>
          <figcaption className={styles.previewCaption}>
            <a
              href="https://bcastelino.com/?utm_source=brian-journal&utm_medium=referral&utm_campaign=about&utm_content=preview-link"
              target="_blank"
              rel="noopener"
              className={styles.ctaButton}
            >
              Open bcastelino.com
            </a>
          </figcaption>
        </figure>
      </section>
    </div>
  );
}
