import { tagSlug } from './posts';

const AUTHORS = [
  {
    slug: 'brian-castelino',
    name: 'Brian Castelino',
    bio: 'Engineer and writer. This is his personal blog about technology, the things he builds, and ideas he is working through.',
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
