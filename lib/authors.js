import { tagSlug } from './posts';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const AUTHORS = [
  {
    slug: 'brian-castelino',
    name: 'Brian Castelino',
    bio: 'AI Data Engineer at WorldLink US. I ship ML and LLM systems into production on Databricks and write about what breaks along the way.',
    avatar: `${basePath}/authors/brian-castelino.jpg`,
    url: 'https://www.linkedin.com/in/cas7elino/',
  },
];

export function getAuthorSlugs() {
  return AUTHORS.map((author) => author.slug);
}

export function getAuthor(slug) {
  return AUTHORS.find((author) => author.slug === slug) ?? null;
}

export function getAuthorByName(name) {
  return AUTHORS.find((author) => author.slug === tagSlug(name)) ?? null;
}
