import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkHtml from 'remark-html';

const postsDir = path.join(process.cwd(), 'content', 'posts');
const docsDir = path.join(process.cwd(), 'content', 'docs');

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

export function getPostMeta(slug) {
  const { data, content } = readPost(slug);
  return {
    slug,
    title: data.title ?? slug,
    date: data.date ? new Date(data.date).toISOString() : null,
    excerpt: data.excerpt ?? '',
    tags: Array.isArray(data.tags) ? data.tags : [],
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

async function processMarkdownContent(content) {
  const processed = await remark()
    .use(remarkGfm)
    .use(remarkHtml, { sanitize: false })
    .process(content);

  let html = processed.toString();
  const headings = [];
  const seen = {};

  // Inject ids into h2/h3 headings and collect a table of contents.
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
    return `<h${level} id="${id}">${inner}</h${level}>`;
  });

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
  const fullPath = path.join(docsDir, `${slug}.md`);
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
  const fullPath = path.join(docsDir, `${slug}.md`);
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
