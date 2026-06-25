# Brian Castelino — Blog

A personal blog built with **Next.js (App Router)**, statically exported and hosted
on **GitHub Pages** at <https://bcastelino.github.io/blogs/>.

## Stack

- **Next.js 15** with `output: 'export'` (fully static, no server needed)
- **CSS Modules** + an OKLCH design-token system (light/dark theming)
- **Geist** font via `next/font`
- **Markdown** posts compiled at build time with `remark` + `remark-gfm`
- **GitHub Actions** for automatic deploys on every push to `main`

## Local development

```bash
npm install
npm run dev
```

Open <http://localhost:3000>. (Locally there is no `/blogs` base path; that is only
applied in production builds.)

## Writing a post

Create a Markdown file in `content/posts/` with frontmatter:

```md
---
title: My Post Title
date: 2026-06-24
excerpt: A one-line summary shown on the home page.
tags: [topic, another]
---

Your content in **Markdown**.
```

The file name becomes the URL slug, e.g. `content/posts/my-post.md` →
`/blogs/blog/my-post/`.

## Build & preview the static export

```bash
npm run build      # outputs static site to ./out
npx serve out      # optional: preview the production build locally
```

## Deploying to GitHub Pages

1. Create a GitHub repo named **`blogs`** and push this project to the `main` branch.
2. In the repo, go to **Settings → Pages → Build and deployment** and set
   **Source** to **GitHub Actions**.
3. Every push to `main` runs `.github/workflows/deploy.yml`, which builds the site
   and publishes it. The site goes live at `https://<your-username>.github.io/blogs/`.

> Note: the `basePath` in `next.config.mjs` is set to `/blogs` to match the repo
> name. If you rename the repo, update that value (and the `repo` constant) too.

## Project structure

```text
app/                 App Router pages (home, /about, /blog/[slug])
components/           Nav, Footer, ThemeToggle, PostCard (CSS Modules)
content/posts/        Markdown blog posts
lib/posts.js          Markdown loading + rendering
public/.nojekyll      Tells Pages to skip Jekyll processing
.github/workflows/    GitHub Actions deploy pipeline
next.config.mjs       Static export + basePath config
```
