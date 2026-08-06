// Central site metadata reused across metadata routes, JSON-LD, OG images,
// and the RSS feed so values never drift.
export const SITE_URL = 'https://bcastelino.com/blogs';
export const SITE_NAME = 'The Brian Journal';
export const SITE_DESCRIPTION =
  'Personal blog by Brian Castelino, writing about technology, building things, and various topics.';

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
