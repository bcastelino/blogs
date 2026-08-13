import assert from 'node:assert/strict';
import test from 'node:test';
import { getPostMarkdown } from '../lib/posts.js';

const slug = 'building-a-static-blog';
const markdown = getPostMarkdown(slug);

test('post Markdown includes public metadata and article content', () => {
  assert.match(markdown, /^# How to Build a Free Static Blog with Next\.js and GitHub Pages$/m);
  assert.match(markdown, /^> A step-by-step guide to building a fast static blog/m);
  assert.match(markdown, /^- Author: \[Brian Castelino\]\(https:\/\/www\.linkedin\.com\/in\/cas7elino\/\)$/m);
  assert.match(markdown, /^- Published: 2026-06-20$/m);
  assert.match(markdown, /^- Updated: 2026-06-26$/m);
  assert.match(markdown, /^- Topics: open-source, meta$/m);
  assert.match(markdown, /^- Reading time: \d+ min read$/m);
  assert.match(markdown, /^- Canonical URL: https:\/\/bcastelino\.com\/blogs\/blog\/building-a-static-blog\/$/m);
  assert.match(markdown, /A static blog is a website made of pre-built HTML/);
});

test('post Markdown excludes authoring-only frontmatter and is stable text', () => {
  assert.equal(markdown.startsWith('---'), false);
  assert.doesNotMatch(markdown, /^seoTitle:/m);
  assert.doesNotMatch(markdown, /^metaDescription:/m);
  assert.doesNotMatch(markdown, /^hidden:/m);
  assert.equal(markdown.endsWith('\n'), true);
});
