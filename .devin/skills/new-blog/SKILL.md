---
name: new-blog
description: Create and validate a new blog post in the bcastelino/blogs repo, including required search metadata, image alt text, topic SEO coverage, and the build-blocking SEO audit. Use when drafting, adding, or preparing a post for publication.
---

Use this workflow whenever creating a new blog post in this repo. Always run the
three skills below **before** drafting, then apply their guidance to the post.

0. If any of the skills are not installed/found, install them first:

   ```bash
   npx skills add https://github.com/getsentry/skills --skill blog-writing-guide
   npx skills add https://github.com/coreyhaines31/marketingskills --skill seo-audit
   npx skills add https://github.com/coreyhaines31/marketingskills --skill ai-seo
   ```

1. Invoke the `blog-writing-guide` skill to load voice, structure, and quality
   standards. Use it to outline the post.

2. Invoke the `ai-seo` skill. Apply its guidance so the post is discoverable and
   citable by AI search engines (clear definitions, self-contained answer blocks,
   stats with sources, FAQ section, comparison tables where relevant).

3. Invoke the `seo-audit` skill. Apply on-page/technical SEO: search title,
   meta description, headings, internal links, image alt text, and frontmatter
   `tags`.

4. Create the post at `content/posts/<slug>.md` with frontmatter:

   ```md
   ---
   title: My Post Title
   seoTitle: A concise, unique search title
   metaDescription: A unique 120 to 160 character search summary that states the article's value and primary topic.
   date: YYYY-MM-DD
   excerpt: A one-line summary shown on the home page.
   tags: [topic, another]
   takeaways:
     - First key point (renders in the accent "Key Takeaways" callout).
     - Second key point.
   ---
   ```

   The file name becomes the URL slug (`/blogs/blog/<slug>/`).

   **Search metadata**:

   - `seoTitle` and `metaDescription` are required for every post, including
     `noindex` drafts.
   - Keep `seoTitle` unique and at 60 characters or fewer. It controls the
     article's `<title>` without the site-wide brand suffix.
   - Keep `metaDescription` unique and between 120 and 160 characters. It
     controls the standard search description.
   - Keep `title` and `excerpt` editorial: they continue to control the H1,
     cards, standfirst, social metadata, and structured-data headline.

   **Topics and images**:

   - Reuse an existing tag when it accurately fits. When introducing a new
     tag, add a matching entry to `TOPIC_SEO` in `lib/site.js` with a unique,
     human-readable title and a 120 to 160 character description.
   - Give every Markdown or HTML image accurate, descriptive, nonempty alt
     text. Use CSS rather than an empty-alt `<img>` for decoration.

   **Accent color**: each post is automatically assigned an accent color
   derived deterministically from its slug (one of blue, orange, green,
   indigo, pink, red). It is stable across reloads and colors the whole
   post page (kicker, section numbers, links, drop cap, tags, reading bar).
   No frontmatter is needed to set it. To change a post's color, rename its
   slug (file name).

   **Key Takeaways**: the optional `takeaways:` list renders as an
   accent-tinted callout box (accent background tint, accent left border,
   and accent title) at the top of the post, using that post's accent color.
   Omit the field to hide the box.

5. Review the draft against all three skills' checklists. Then run:

   ```bash
   npm run test:seo
   npm run build
   ```

   `npm run build` automatically runs `scripts/check-seo.mjs` after the static
   export. Do not commit or publish while either command fails. The audit
   verifies required post fields, topic catalog coverage, unique and compliant
   metadata on every indexable generated route, and nonempty alt text on every
   generated HTML image.

6. After both checks pass, commit and push to `main` to trigger the GitHub Pages
   deploy.
