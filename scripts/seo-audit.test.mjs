import assert from 'node:assert/strict';
import test from 'node:test';
import { validateHtmlPage, validatePostMetadata } from './seo-audit.mjs';

const description = (length) => 'd'.repeat(length);
const document = ({
  title = 'Valid title',
  metaDescription = description(120),
  robots = '',
  image = '<img src="/image.png" alt="Descriptive image">',
} = {}) => `<!doctype html><html><head><title>${title}</title><meta name="description" content="${metaDescription}">${
  robots ? `<meta name="robots" content="${robots}">` : ''
}</head><body>${image}</body></html>`;

test('post metadata accepts title and description boundaries', () => {
  assert.deepEqual(
    validatePostMetadata([
      { file: 'lower.md', seoTitle: 't'.repeat(60), metaDescription: description(120) },
      { file: 'upper.md', seoTitle: 'u'.repeat(60), metaDescription: description(160) },
    ]),
    []
  );
});

test('post metadata rejects 61-character titles and descriptions outside 120-160', () => {
  const errors = validatePostMetadata([
    { file: 'short.md', seoTitle: 't'.repeat(61), metaDescription: description(119) },
    { file: 'long.md', seoTitle: 'u'.repeat(60), metaDescription: description(161) },
  ]);
  assert.ok(errors.some((error) => error.includes('seoTitle is 61')));
  assert.ok(errors.some((error) => error.includes('metaDescription is 119')));
  assert.ok(errors.some((error) => error.includes('metaDescription is 161')));
});

test('post metadata rejects missing and duplicate fields', () => {
  const sharedDescription = description(120);
  const errors = validatePostMetadata([
    { file: 'missing.md' },
    { file: 'one.md', seoTitle: 'Shared', metaDescription: sharedDescription },
    { file: 'two.md', seoTitle: 'Shared', metaDescription: sharedDescription },
  ]);
  assert.ok(errors.some((error) => error.includes('missing required seoTitle')));
  assert.ok(errors.some((error) => error.includes('missing required metaDescription')));
  assert.ok(errors.some((error) => error.includes('duplicate seoTitle')));
  assert.ok(errors.some((error) => error.includes('duplicate metaDescription')));
});

test('noindex pages skip title and description lengths but still validate images', () => {
  const result = validateHtmlPage({
    url: '/blogs/draft/',
    html: document({ title: 't'.repeat(61), metaDescription: 'short', robots: 'noindex, follow' }),
  });
  assert.deepEqual(result.errors, []);
  assert.equal(result.noindex, true);
});

test('HTML audit enforces title and description boundaries', () => {
  assert.deepEqual(
    validateHtmlPage({
      url: '/blogs/valid/',
      html: document({ title: 't'.repeat(60), metaDescription: description(120) }),
    }).errors,
    []
  );
  const errors = validateHtmlPage({
    url: '/blogs/invalid/',
    html: document({ title: 't'.repeat(61), metaDescription: description(161) }),
  }).errors;
  assert.ok(errors.some((error) => error.includes('title is 61')));
  assert.ok(errors.some((error) => error.includes('meta description is 161')));
});

test('HTML audit rejects missing and empty alt text and accepts descriptive alt text', () => {
  const missing = validateHtmlPage({
    url: '/blogs/missing/',
    html: document({ image: '<img src="/image.png">' }),
  }).errors;
  const empty = validateHtmlPage({
    url: '/blogs/empty/',
    html: document({ image: '<img src="/image.png" alt="">' }),
  }).errors;
  const valid = validateHtmlPage({ url: '/blogs/valid/', html: document() }).errors;
  assert.ok(missing.some((error) => error.includes('missing alt text')));
  assert.ok(empty.some((error) => error.includes('empty alt text')));
  assert.deepEqual(valid, []);
});
