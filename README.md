# QianFan Blog

> A VitePress-powered personal blog for technical notes, project logs, and long-form writing.

[![VitePress](https://img.shields.io/badge/VitePress-1.6.4-646CFF?logo=vite&logoColor=white)](https://vitepress.dev/)
[![pnpm](https://img.shields.io/badge/pnpm-9.15.3-F69220?logo=pnpm&logoColor=white)](https://pnpm.io/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](package.json)
[![Deploy](https://img.shields.io/badge/GitHub%20Actions-Deploy-2088FF?logo=github-actions&logoColor=white)](.github/workflows/deploy-pages.yml)

Live site: [https://blog.mapin.net](https://blog.mapin.net)

<p align="center">
  <strong>English</strong> | <a href="./README.zh-CN.md">简体中文</a>
</p>

## Overview

This is the source code for QianFan's personal blog, built with VitePress and Vue. It includes automatic content indexing, project and investment sections, giscus comments, page views, Mermaid diagrams, SEO metadata, sitemap generation, `llms.txt`, and GitHub Pages deployment.

You can fork it as a starting point for your own technical blog by replacing the site config, content, and static assets.

## Features

- VitePress 1.6 + Vue 3.5
- Automatic indexing for posts, projects, and investment notes
- Home page, post list, pagination, sidebar, and post navigation
- giscus comments and comment counts
- Busuanzi PV/UV counters
- Mermaid diagram support
- Sitemap, Open Graph, Twitter Card, and canonical URLs
- `llms.txt` and Markdown copies for AI-readable content
- GitHub Actions deployment to `gh-pages`

## Tech Stack

- VitePress, Vue, Vite
- pnpm, Sass, autoprefixer
- fast-glob, globby, gray-matter, fs-extra, dayjs
- giscus, busuanzi.pure.js, cursor-effects, Pinia
- mermaid, @panzoom/panzoom

## Getting Started

Requirements:

- Node.js 20+
- pnpm 9.15.3+

```bash
pnpm install
pnpm run dev
```

The dev server runs at `http://localhost:5173` by default.

Build and preview:

```bash
pnpm run build
pnpm run preview
```

The production output is generated in `docs/.vitepress/dist`.

## Content

- Blog posts: `docs/posts/*.md`
- Project notes: `docs/projects/*.md`
- Investment notes: `docs/invest/*.md`
- Static assets: `docs/public`

Recommended Front Matter:

```markdown
---
title: GitHub Actions Deployment Guide
date: 2024-11-01
tags: [CI/CD, GitHub Actions]
description: Used for post summaries and SEO metadata.
---
```

Tags are stable archive terms, not an exhaustive list of every term mentioned in an article:

- Use 2 tags per post when possible, with a hard maximum of 3.
- Reuse existing tags first. Search `docs/posts/` before adding one to avoid synonymous tags.
- Prefer reusable technology, platform, or topic names over one-off phrases copied from the title.
- The post list displays at most the first 2 tags, so order tags by importance.

Posts are sorted by Git `lastUpdated` in descending order, falling back to frontmatter `date`. Shared behavior lives in `docs/.vitepress/theme/core/content/entries.ts`; when changing content directories, also check the matching domain adapter:

- `docs/.vitepress/theme/modules/post/utils/posts.ts`
- `docs/.vitepress/theme/modules/projects/utils/projects.ts`
- `docs/.vitepress/theme/modules/invest/utils/invest.ts`

## Configuration

The main config file is `docs/.vitepress/config.ts`.

Common fields to update:

- `siteUrl`: production domain
- `title` / `description`: site title and description
- `themeConfig.nav`: navigation
- `themeConfig.socialLinks`: social links
- `logo`, favicon, and default social sharing image
- `docs/.vitepress/theme/modules/comment/constants/index.ts`: giscus defaults
- `.github/workflows/deploy-pages.yml`: deployment branch, custom domain, and Secrets

Recommended giscus environment variables:

```bash
VITE_GISCUS_REPO=
VITE_GISCUS_REPO_ID=
VITE_GISCUS_CATEGORY=
VITE_GISCUS_CATEGORY_ID=
```

## Deployment

The current GitHub Actions workflow runs on pushes to `master`:

1. Set up pnpm and Node.js 20.
2. Install dependencies.
3. Run `pnpm run build`.
4. Write the `CNAME` file.
5. Publish `docs/.vitepress/dist` to the `gh-pages` branch.

For other static hosting platforms, upload `docs/.vitepress/dist`.

## Further Reading

- Agent instructions: `AGENTS.md`
- Product context: `PRODUCT.md`
- Visual design system: `DESIGN.md`
- Current architecture: `docs/architecture.md`
- Behavior specifications and changes: `openspec/`

## Contributing

Issues and pull requests are welcome. Good contributions include:

- Fixing build, deployment, or documentation issues
- Improving VitePress theme components
- Improving accessibility, performance, and SEO
- Adding general configuration notes

Personal content, site copy, and private configuration should be replaced after forking.

## License

This project is licensed under the MIT License. The current license declaration is in `package.json`.
