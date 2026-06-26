---
title: "How to Build a Free Static Blog with Next.js and GitHub Pages"
date: 2026-06-20
updated: 2026-06-26
excerpt: "A step-by-step guide to building a fast static blog with Next.js, Markdown, and CSS Modules, then deploying it free on GitHub Pages with GitHub Actions."
tags: [nextjs, github-pages, tutorial, static-site, markdown]
author: Brian Castelino
authorUrl: https://www.linkedin.com/in/cas7elino/
faq:
  - question: "Is Next.js a good choice for a static blog?"
    answer: "Yes. Next.js can export a fully static site with the output export option, giving you React components, Markdown rendering at build time, and zero hosting cost on platforms like GitHub Pages."
  - question: "How much does it cost to host a blog on GitHub Pages?"
    answer: "Nothing. GitHub Pages hosts public static sites for free, including HTTPS and a github.io subdomain. You only pay if you add a custom domain you buy elsewhere."
  - question: "Can I use a custom domain with GitHub Pages?"
    answer: "Yes. Add a CNAME record at your DNS provider pointing to your github.io site, then set the custom domain in the repository Pages settings."
  - question: "How do I add a new post to the blog?"
    answer: "Create a Markdown file in content/posts with a frontmatter block for title, date, excerpt, and tags. The build generates a static page and lists it on the home page automatically."
---

A static blog is a website made of pre-built HTML, CSS, and JavaScript files with no server or database behind it. Everything is generated at build time, so it loads fast, costs nothing to host, and is hard to break. This guide shows how I built this blog with Next.js and deployed it free on GitHub Pages.

## The stack: Next.js, Markdown, and GitHub Pages

I wanted a fast, good-looking blog that costs nothing to host and is trivial to update. A static site on free hosting is the obvious answer. Here is the stack:

- **Next.js (App Router)** exported to static HTML with `output: 'export'`.
- **CSS Modules** with an OKLCH design-token system for theming.
- **Markdown** files compiled at build time with `remark`.
- **GitHub Pages** for hosting, with **GitHub Actions** for automatic deploys.

## Why use Next.js static export for a blog

GitHub Pages only serves static files, with no servers or databases. Next.js handles this with a single config flag:

```js
// next.config.mjs
const nextConfig = {
  output: 'export',
  basePath: '/blogs',
  images: { unoptimized: true },
};
```

Because the site lives at a sub-path (`/blogs`), I set a `basePath` so every asset and link URL resolves correctly.

## How to write posts in Markdown

Each post is a Markdown file with a small frontmatter block:

```md
---
title: My Post
date: 2026-06-20
excerpt: A short summary.
tags: [example]
author: Brian Castelino
authorUrl: https://www.linkedin.com/in/cas7elino/
---

Your content here.
```

`author` and `authorUrl` are optional. If you omit them, every post defaults to my name linked to my LinkedIn, so the byline stays consistent across the site.

The build reads every file in `content/posts`, generates a static page for each, and lists them on the home page sorted by date.

## How to deploy a Next.js blog to GitHub Pages

Deployment runs automatically through GitHub Actions on every push to `main`:

1. Push your new post to the `main` branch.
2. A GitHub Actions workflow runs `next build`, which exports the site to the `out/` folder.
3. The workflow publishes `out/` to GitHub Pages.
4. Wait about a minute, and the post is live.

That is the whole system: simple, fast, and free.

## Related reading

New here? Start with [why I built The Brian Journal](../welcome-to-my-blog/), or read my first deep dive on [Databricks Data + AI Summit 2026](../databricks-data-ai-summit-2026/).
