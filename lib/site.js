// Central site metadata reused across metadata routes, JSON-LD, OG images,
// and the RSS feed so values never drift.
export const SITE_URL = 'https://bcastelino.com/blogs';
export const SITE_NAME = 'The Brian Journal';
export const SITE_TITLE =
  'Databricks, Data and AI Engineering | Brian Castelino';
export const SITE_DESCRIPTION =
  'Brian Castelino on Databricks, data engineering, and shipping LLM systems into production. Long-form, sourced, and honest about what broke.';

// Search metadata for indexable topic collection pages. Keep these entries
// explicit so new topics cannot silently ship with thin, generic snippets.
export const TOPIC_SEO = {
  'ai-engineering': {
    title: 'AI Engineering',
    description:
      'Explore practical AI engineering articles on production agents, LLM systems, evaluation, failure modes, architecture, and lessons from real implementations.',
  },
  'book-review': {
    title: 'Technical Book Reviews',
    description:
      'Read candid technical book reviews for AI, data, and Power BI engineers, with clear takeaways on audience, depth, strengths, limitations, and value.',
  },
  career: {
    title: 'Engineering Career Guides',
    description:
      'Build a stronger engineering career with practical guides to resumes, ATS screening, role-specific tailoring, evidence, interviews, and professional growth.',
  },
  'data-engineering': {
    title: 'Data Engineering',
    description:
      'Explore data engineering guides on Databricks, lakehouse architecture, reliable pipelines, semantic models, replay, governance, and production tradeoffs.',
  },
  databricks: {
    title: 'Databricks',
    description:
      'Read practical Databricks articles on lakehouse architecture, partner solutions, Data + AI Summit launches, governed AI, and production data systems.',
  },
  meta: {
    title: 'Behind The Brian Journal',
    description:
      'See how The Brian Journal is designed, built, and published with Next.js, Markdown, GitHub Actions, and GitHub Pages, plus lessons from the process.',
  },
  'open-source': {
    title: 'Open Source',
    description:
      'Explore open-source engineering articles on contributing to unfamiliar codebases, building with public tools, shipping fixes, and learning in the open.',
  },
  'power-bi': {
    title: 'Power BI',
    description:
      'Read Power BI guides and reviews on DAX, TMDL, semantic models, natural-language visuals, automation, validation, and advanced analytics engineering.',
  },
};

export const AUTHOR = {
  name: 'Brian Castelino',
  url: 'https://www.linkedin.com/in/cas7elino/',
  sameAs: [
    'https://www.linkedin.com/in/cas7elino/',
    'https://github.com/bcastelino',
    'https://x.com/cas7elino',
    'https://bcastelino.com/',
  ],
};

export const LOGO_URL = `${SITE_URL}/brand/tbj-black-logo.png`;
export const DEFAULT_OG_IMAGE = `${SITE_URL}/brand/brian-blogs.png`;
