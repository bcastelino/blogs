---
title: Building a Static Blog with Next.js and GitHub Pages
date: 2026-06-20
excerpt: A walkthrough of how this site is structured and deployed for free.
tags: [nextjs, github-pages, tutorial]
---

## The goal

I wanted a fast, good-looking blog that costs nothing to host and is trivial to
update. Static site + free hosting is the obvious answer. Here's the stack:

- **Next.js (App Router)** exported to static HTML with `output: 'export'`.
- **CSS Modules** with an OKLCH design-token system for theming.
- **Markdown** files compiled at build time with `remark`.
- **GitHub Pages** for hosting, with **GitHub Actions** for automatic deploys.

## Why static export

GitHub Pages only serves static files — no servers, no databases. Next.js handles
this with a single config flag:

```js
// next.config.mjs
const nextConfig = {
  output: 'export',
  basePath: '/blogs',
  images: { unoptimized: true },
};
```

Because the site lives at a sub-path (`/blogs`), we set a `basePath` so all the
asset and link URLs resolve correctly.

## Writing posts

Each post is a Markdown file with a small frontmatter block:

```md
---
title: My Post
date: 2026-06-20
excerpt: A short summary.
tags: [example]
---

Your content here.
```

The build reads every file in `content/posts`, generates a static page for each,
and lists them on the home page sorted by date.

## Deploying

A GitHub Actions workflow builds the site and publishes the `out/` folder to Pages
on every push to `main`. Push your post, wait a minute, and it's live.

That's the whole system — simple, fast, and free.
