---
description: How to write a new blog post (run SEO + writing skills first)
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

3. Invoke the `seo-audit` skill. Apply on-page/technical SEO: title, meta/excerpt,
   headings, internal links, and frontmatter `tags`.

4. Create the post at `content/posts/<slug>.md` with frontmatter:

   ```md
   ---
   title: My Post Title
   date: YYYY-MM-DD
   excerpt: A one-line summary shown on the home page.
   tags: [topic, another]
   ---
   ```

   The file name becomes the URL slug (`/blogs/blog/<slug>/`).

5. Review the draft against all three skills' checklists before committing.

6. Commit and push to `main` to trigger the GitHub Pages deploy.
