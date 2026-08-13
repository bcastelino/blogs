import { getDocsPageSections } from '@/lib/posts';
import DocsSidebar from '@/components/DocsSidebar';
import CopyButton from '@/components/CopyButton';
import MermaidRenderer from '@/components/MermaidRenderer';
import styles from './page.module.css';

export const metadata = {
  title: 'Writing guide',
  description: 'Guide to writing and adding posts to The Brian Journal.',
  alternates: {
    canonical: 'https://bcastelino.com/blogs/writing-guide/',
  },
  robots: { index: false, follow: true },
};

export default async function DocsPage() {
  const markdownSections = await getDocsPageSections('markdown');

  const tocSections = [
    { id: 'adding-a-post', title: 'Adding a post' },
    ...markdownSections.map((section) => ({ id: section.id, title: section.title })),
    { id: 'faq', title: 'FAQ' },
  ];

  return (
    <div className={styles.layout}>
      <aside className={styles.railCol}>
        <DocsSidebar sections={tocSections} />
      </aside>

      <article className={styles.article}>
        <header className={styles.header}>
          <h1 className={styles.title}>Writing for The Brian Journal</h1>
          <p className={styles.lead}>
            How to add posts, what Markdown features are supported, and what the current setup can and cannot do.
          </p>
        </header>

        <div className={`prose ${styles.body}`}>
          <section id="adding-a-post" className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2>Adding a post</h2>
            </div>
            <p>
              Posts are Markdown files in <code>content/posts/</code>. To add one:
            </p>
            <ol>
              <li>Create a new file named <code>your-post-slug.md</code>.</li>
              <li>Add frontmatter at the top.</li>
              <li>Write the body in Markdown.</li>
              <li>Commit and push to <code>main</code>. GitHub Actions builds and deploys the site.</li>
            </ol>

            <h3>Frontmatter reference</h3>
            <table>
              <thead>
                <tr>
                  <th>Field</th>
                  <th>Required</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <code>title</code>
                  </td>
                  <td>Yes</td>
                  <td>Used as the page heading and in listings.</td>
                </tr>
                <tr>
                  <td>
                    <code>seoTitle</code>
                  </td>
                  <td>Yes</td>
                  <td>Unique search-result title. Keep it at 60 characters or fewer.</td>
                </tr>
                <tr>
                  <td>
                    <code>metaDescription</code>
                  </td>
                  <td>Yes</td>
                  <td>Unique search summary between 120 and 160 characters.</td>
                </tr>
                <tr>
                  <td>
                    <code>date</code>
                  </td>
                  <td>No</td>
                  <td>
                    ISO date like <code>2026-06-20</code>. Posts are sorted by date.
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>excerpt</code>
                  </td>
                  <td>No</td>
                  <td>Short summary shown on the home page and in metadata.</td>
                </tr>
                <tr>
                  <td>
                    <code>tags</code>
                  </td>
                  <td>No</td>
                  <td>
                    Array of tags, e.g. <code>[nextjs, tutorial]</code>.
                  </td>
                </tr>
              </tbody>
            </table>

            <h3>Post template</h3>
            <pre>
              <code>{`---
title: My New Post
seoTitle: My Concise Search Title
metaDescription: A specific 120 to 160 character summary that explains the article's value and naturally includes its primary topic for search readers.
date: 2026-06-25
excerpt: A short summary of what this post is about.
tags: [example, demo]
---

## First section

Write your content here. Use headings, lists, code blocks, and tables as needed.
`}</code>
            </pre>

            <h3>SEO and image checklist</h3>
            <ul>
              <li>Keep every <code>seoTitle</code> unique and at 60 characters or fewer.</li>
              <li>Keep every <code>metaDescription</code> unique and between 120 and 160 characters.</li>
              <li>Add descriptive alt text to every Markdown or HTML image.</li>
              <li>
                When introducing a new tag, add its human-readable title and description to the topic SEO catalog in <code>lib/site.js</code>.
              </li>
              <li>Run <code>npm run build</code>; the post-build SEO audit blocks invalid metadata or images.</li>
            </ul>
          </section>

          {markdownSections.map((section) => (
            <section key={section.id} id={section.id} className={styles.section}>
              {section.hasHeading && (
                <div className={styles.sectionHeader}>
                  <h2>{section.title}</h2>
                  <CopyButton text={section.markdown} />
                </div>
              )}
              <div suppressHydrationWarning dangerouslySetInnerHTML={{ __html: section.html }} />
            </section>
          ))}

          <section id="faq" className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2>FAQ</h2>
            </div>

            <details className={styles.faqItem}>
              <summary className={styles.faqSummary}>
                What is not supported by default?
                <span className={styles.faqIcon} aria-hidden="true" />
              </summary>
              <div className={styles.faqAnswer}>
                <ul>
                  <li>
                    <strong>Math</strong> such as LaTeX requires a math plugin.
                  </li>
                  <li>
                    <strong>Interactive React components</strong> are not supported in plain Markdown. Use MDX or embed a custom component in the page instead.
                  </li>
                </ul>
              </div>
            </details>

            <details className={styles.faqItem}>
              <summary className={styles.faqSummary}>
                Can I add a post from the UI?
                <span className={styles.faqIcon} aria-hidden="true" />
              </summary>
              <div className={styles.faqAnswer}>
                <p>
                  <strong>Not with the current setup.</strong> This site is statically exported and hosted on GitHub Pages, so it has no server and no database at runtime. The list of posts is read from the filesystem at build time.
                </p>
                <p>Adding a post from the browser would require introducing a backend or a content service, such as:</p>
                <ul>
                  <li>A Next.js API route that writes to the repo via the GitHub API and triggers a rebuild.</li>
                  <li>A headless CMS like Contentful, Sanity, or Strapi.</li>
                  <li>A platform with built-in forms/CMS, like Netlify CMS or Vercel.</li>
                </ul>
                <p>
                  That is a bigger architectural change than the current static-only deploy. To keep things free and simple, creating a Markdown file in the repo remains the easiest path.
                </p>
              </div>
            </details>
          </section>
          <MermaidRenderer />
        </div>
      </article>
    </div>
  );
}
