import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkHtml from 'remark-html';

const postsDir = path.join(process.cwd(), 'content', 'posts');
const writingDir = path.join(process.cwd(), 'content', 'writing');

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/&amp;/g, ' and ')
    .replace(/&#?\w+;/g, '')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

export function tagSlug(tag) {
  return String(tag)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function getPostSlugs() {
  if (!fs.existsSync(postsDir)) return [];
  return fs
    .readdirSync(postsDir)
    .filter((file) => file.endsWith('.md'))
    .map((file) => file.replace(/\.md$/, ''));
}

function readPost(slug) {
  const fullPath = path.join(postsDir, `${slug}.md`);
  const raw = fs.readFileSync(fullPath, 'utf8');
  return matter(raw);
}

const DEFAULT_AUTHOR = 'Brian Castelino';
const DEFAULT_AUTHOR_URL = 'https://www.linkedin.com/in/cas7elino/';

export function getPostMeta(slug) {
  const { data, content } = readPost(slug);
  return {
    slug,
    title: data.title ?? slug,
    date: data.date ? new Date(data.date).toISOString() : null,
    excerpt: data.excerpt ?? '',
    tags: Array.isArray(data.tags) ? data.tags : [],
    author: data.author ?? DEFAULT_AUTHOR,
    authorUrl: data.authorUrl ?? DEFAULT_AUTHOR_URL,
    updated: data.updated ? new Date(data.updated).toISOString() : null,
    faq: Array.isArray(data.faq)
      ? data.faq.filter((item) => item && item.question && item.answer)
      : [],
    readingTime: readingTime(content).text,
    readingMinutes: Math.max(1, Math.round(readingTime(content).minutes)),
  };
}

export function getAllPosts() {
  return getPostSlugs()
    .map(getPostMeta)
    .sort((a, b) => {
      if (!a.date) return 1;
      if (!b.date) return -1;
      return new Date(b.date) - new Date(a.date);
    });
}

export function getAllTags() {
  const map = new Map();
  for (const post of getAllPosts()) {
    for (const tag of post.tags) {
      const slug = tagSlug(tag);
      if (!slug) continue;
      if (!map.has(slug)) {
        map.set(slug, { slug, name: tag, count: 0, posts: [] });
      }
      const entry = map.get(slug);
      entry.count += 1;
      entry.posts.push(post);
    }
  }
  return [...map.values()].sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

export function getTag(slug) {
  return getAllTags().find((tag) => tag.slug === slug) ?? null;
}

function compactTableLinks(inner) {
  return inner.replace(/<a href="([^"]+)">([^<]*)<\/a>/g, (match, href, text) => {
    const decodedText = text.replace(/&#x26;/g, '&').replace(/&amp;/g, '&').trim();
    if (!/^https?:\/\//i.test(decodedText)) return match;
    const label = href
      .replace(/&#x26;/g, '&')
      .replace(/&amp;/g, '&')
      .replace(/^https?:\/\//i, '')
      .replace(/^www\./i, '')
      .split(/[/?#]/)[0];
    return `<a href="${href}" target="_blank" rel="noopener noreferrer" class="table-link">${label}</a>`;
  });
}

// Wrap each table in a scroll container and tag it with its column count so
// CSS can pick shrink-to-fit (narrow) vs horizontal-scroll (wide) behaviour.
function enhanceTables(html) {
  return html.replace(/<table>([\s\S]*?)<\/table>/g, (_match, inner) => {
    const firstRow = inner.match(/<tr>([\s\S]*?)<\/tr>/);
    let cols = 0;
    if (firstRow) {
      const ths = firstRow[1].match(/<th[\s>]/g);
      const tds = firstRow[1].match(/<td[\s>]/g);
      cols = (ths ? ths.length : 0) || (tds ? tds.length : 0);
    }
    const compacted = compactTableLinks(inner);
    const wide = cols >= 4 ? ' is-wide' : '';
    return `<div class="table-wrap${wide}" data-cols="${cols}"><div class="table-scroll"><table>${compacted}</table></div></div>`;
  });
}

async function processMarkdownContent(content) {
  const processed = await remark()
    .use(remarkGfm)
    .use(remarkHtml, { sanitize: false })
    .process(content);

  let html = processed.toString();
  const headings = [];
  const seen = {};
  let h2Count = 0;

  // Inject ids into h2/h3 headings and collect a table of contents.
  // h2s also get a numbered accent span matching the reading-rail numbering.
  html = html.replace(/<h([23])>([\s\S]*?)<\/h\1>/g, (_match, level, inner) => {
    const text = inner
      .replace(/<[^>]+>/g, '')
      .replace(/&amp;/g, '&')
      .replace(/&#?\w+;/g, '')
      .trim();
    let id = slugify(text) || 'section';
    if (seen[id] != null) {
      seen[id] += 1;
      id = `${id}-${seen[id]}`;
    } else {
      seen[id] = 0;
    }
    headings.push({ id, text, level: Number(level) });
    if (level === '2') {
      h2Count += 1;
      const num = String(h2Count).padStart(2, '0');
      return `<h2 id="${id}"><span class="sec-num" aria-hidden="true">${num}</span>${inner}</h2>`;
    }
    return `<h${level} id="${id}">${inner}</h${level}>`;
  });

  html = enhanceTables(html);

  return { html, headings };
}

async function processMarkdown(raw) {
  const { content } = matter(raw);
  return processMarkdownContent(content);
}

export async function getPost(slug) {
  const { html, headings } = await processMarkdownContent(readPost(slug).content);
  return {
    ...getPostMeta(slug),
    html,
    headings,
  };
}

export async function getDocsPage(slug) {
  const fullPath = path.join(writingDir, `${slug}.md`);
  const raw = fs.readFileSync(fullPath, 'utf8');
  const { data } = matter(raw);
  const { html, headings } = await processMarkdown(raw);
  return {
    title: data.title ?? slug,
    html,
    headings,
  };
}

export async function getDocsPageSections(slug) {
  const fullPath = path.join(writingDir, `${slug}.md`);
  const raw = fs.readFileSync(fullPath, 'utf8');
  const { content } = matter(raw);

  const sections = [];
  let current = null;

  for (const line of content.trimStart().split('\n')) {
    if (line.startsWith('## ')) {
      if (current) sections.push(current);
      current = { heading: line, lines: [] };
    } else {
      if (!current) {
        current = { heading: null, lines: [] };
      }
      current.lines.push(line);
    }
  }
  if (current) sections.push(current);

  const seen = {};

  return Promise.all(
    sections
      .filter((section) => section.heading || section.lines.join('').trim().length > 0)
      .map(async (section) => {
        const heading = section.heading ? section.heading.replace(/^## /, '').trim() : '';
        const title = heading || 'Introduction';
        const bodyMarkdown = section.lines.join('\n').trim();
        const fullMarkdown = section.heading
          ? `${section.heading}\n\n${bodyMarkdown}`
          : bodyMarkdown;
        const { html } = await processMarkdownContent(bodyMarkdown);

        let id = slugify(title) || 'section';
        if (seen[id] != null) {
          seen[id] += 1;
          id = `${id}-${seen[id]}`;
        } else {
          seen[id] = 0;
        }

        return {
          id,
          title,
          markdown: fullMarkdown,
          html,
          hasHeading: !!section.heading,
        };
      })
  );
}

export function formatDate(iso) {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
