import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

export const TITLE_MAX = 60;
export const DESCRIPTION_MIN = 120;
export const DESCRIPTION_MAX = 160;

export function characterCount(value) {
  return Array.from(String(value ?? '')).length;
}

function decodeHtmlEntities(value) {
  return String(value ?? '')
    .replace(/&#x([0-9a-f]+);/gi, (_match, code) => String.fromCodePoint(Number.parseInt(code, 16)))
    .replace(/&#([0-9]+);/g, (_match, code) => String.fromCodePoint(Number.parseInt(code, 10)))
    .replace(/&quot;/gi, '"')
    .replace(/&apos;|&#39;/gi, "'")
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>');
}

function parseAttributes(tag) {
  const attributes = new Map();
  const pattern = /([^\s=/>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g;
  let match;

  while ((match = pattern.exec(tag)) !== null) {
    const name = match[1].toLowerCase();
    if (name === '<meta' || name === '<img') continue;
    attributes.set(name, decodeHtmlEntities(match[2] ?? match[3] ?? match[4] ?? ''));
  }

  return attributes;
}

function findMetaContent(html, name) {
  for (const match of html.matchAll(/<meta\b[^>]*>/gi)) {
    const attributes = parseAttributes(match[0]);
    if (attributes.get('name')?.toLowerCase() === name.toLowerCase()) {
      return attributes.get('content') ?? '';
    }
  }
  return '';
}

function findTitle(html) {
  const match = html.match(/<title>([\s\S]*?)<\/title>/i);
  return decodeHtmlEntities(match?.[1]?.trim() ?? '');
}

function isNoindex(html) {
  return findMetaContent(html, 'robots')
    .toLowerCase()
    .split(/[\s,]+/)
    .includes('noindex');
}

export function validatePostMetadata(posts) {
  const errors = [];
  const titles = new Map();
  const descriptions = new Map();

  for (const post of posts) {
    const label = post.file ?? post.slug ?? 'unknown post';
    const title = String(post.seoTitle ?? '').trim();
    const description = String(post.metaDescription ?? '').trim();

    if (!title) {
      errors.push(`${label}: missing required seoTitle`);
    } else if (characterCount(title) > TITLE_MAX) {
      errors.push(`${label}: seoTitle is ${characterCount(title)} characters; maximum is ${TITLE_MAX}`);
    }

    if (!description) {
      errors.push(`${label}: missing required metaDescription`);
    } else if (
      characterCount(description) < DESCRIPTION_MIN ||
      characterCount(description) > DESCRIPTION_MAX
    ) {
      errors.push(
        `${label}: metaDescription is ${characterCount(description)} characters; expected ${DESCRIPTION_MIN}-${DESCRIPTION_MAX}`
      );
    }

    if (title) {
      if (titles.has(title)) errors.push(`${label}: duplicate seoTitle also used by ${titles.get(title)}`);
      else titles.set(title, label);
    }

    if (description) {
      if (descriptions.has(description)) {
        errors.push(`${label}: duplicate metaDescription also used by ${descriptions.get(description)}`);
      } else {
        descriptions.set(description, label);
      }
    }
  }

  return errors;
}

export function validateHtmlPage({ url, html }) {
  const errors = [];
  const title = findTitle(html);
  const description = findMetaContent(html, 'description');
  const noindex = isNoindex(html);

  if (!noindex) {
    if (!title) errors.push(`${url}: missing title`);
    else if (characterCount(title) > TITLE_MAX) {
      errors.push(`${url}: title is ${characterCount(title)} characters; maximum is ${TITLE_MAX}`);
    }

    if (!description) errors.push(`${url}: missing meta description`);
    else if (
      characterCount(description) < DESCRIPTION_MIN ||
      characterCount(description) > DESCRIPTION_MAX
    ) {
      errors.push(
        `${url}: meta description is ${characterCount(description)} characters; expected ${DESCRIPTION_MIN}-${DESCRIPTION_MAX}`
      );
    }
  }

  let imageNumber = 0;
  for (const match of html.matchAll(/<img\b[^>]*>/gi)) {
    imageNumber += 1;
    const attributes = parseAttributes(match[0]);
    if (!attributes.has('alt')) errors.push(`${url}: image ${imageNumber} is missing alt text`);
    else if (!attributes.get('alt').trim()) errors.push(`${url}: image ${imageNumber} has empty alt text`);
  }

  return { errors, title, description, noindex, imageCount: imageNumber };
}

function tagSlug(tag) {
  return String(tag)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function collectIndexFiles(directory) {
  const files = [];
  if (!fs.existsSync(directory)) return files;

  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...collectIndexFiles(fullPath));
    else if (entry.name === 'index.html') files.push(fullPath);
  }

  return files;
}

function pageUrl(file, outDir) {
  const relative = path.relative(outDir, path.dirname(file)).split(path.sep).join('/');
  return relative ? `/blogs/${relative}/` : '/blogs/';
}

export function readPostMetadata(postsDir) {
  if (!fs.existsSync(postsDir)) return [];
  return fs
    .readdirSync(postsDir)
    .filter((file) => file.endsWith('.md'))
    .sort()
    .map((file) => {
      const { data } = matter(fs.readFileSync(path.join(postsDir, file), 'utf8'));
      return {
        file,
        seoTitle: data.seoTitle,
        metaDescription: data.metaDescription,
        tags: Array.isArray(data.tags) ? data.tags : [],
      };
    });
}

export function runSeoAudit({ postsDir, outDir, topicSeo }) {
  const posts = readPostMetadata(postsDir);
  const errors = validatePostMetadata(posts);

  const usedTopicSlugs = new Set(posts.flatMap((post) => post.tags.map(tagSlug)).filter(Boolean));
  for (const slug of [...usedTopicSlugs].sort()) {
    if (!topicSeo[slug]) errors.push(`topic ${slug}: missing entry in TOPIC_SEO`);
  }

  const pages = collectIndexFiles(outDir).map((file) => {
    const url = pageUrl(file, outDir);
    const result = validateHtmlPage({ url, html: fs.readFileSync(file, 'utf8') });
    errors.push(...result.errors);
    return { url, ...result };
  });

  const indexedTitles = new Map();
  const indexedDescriptions = new Map();
  for (const page of pages.filter((entry) => !entry.noindex)) {
    if (page.title) {
      if (indexedTitles.has(page.title)) {
        errors.push(`${page.url}: duplicate title also used by ${indexedTitles.get(page.title)}`);
      } else {
        indexedTitles.set(page.title, page.url);
      }
    }
    if (page.description) {
      if (indexedDescriptions.has(page.description)) {
        errors.push(
          `${page.url}: duplicate meta description also used by ${indexedDescriptions.get(page.description)}`
        );
      } else {
        indexedDescriptions.set(page.description, page.url);
      }
    }
  }

  return {
    errors,
    postCount: posts.length,
    pageCount: pages.length,
    indexablePageCount: pages.filter((page) => !page.noindex).length,
    imageCount: pages.reduce((total, page) => total + page.imageCount, 0),
  };
}
