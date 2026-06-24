# QianFan Blog

> A VitePress-powered personal blog for technical notes, project logs, and long-form writing.

[![VitePress](https://img.shields.io/badge/VitePress-1.6.4-646CFF?logo=vite&logoColor=white)](https://vitepress.dev/)
[![pnpm](https://img.shields.io/badge/pnpm-9.15.3-F69220?logo=pnpm&logoColor=white)](https://pnpm.io/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](package.json)
[![Deploy](https://img.shields.io/badge/GitHub%20Actions-Deploy-2088FF?logo=github-actions&logoColor=white)](.github/workflows/deploy-pages.yml)

Live site: [https://blog.mapin.net](https://blog.mapin.net)

中文：[README.md](README.md)

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
- mermaid, vitepress-plugin-mermaid

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

Posts are sorted by `date` in descending order. If you change content directories, update the matching scanner:

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

## Project Structure

```text
.
├── docs/
│   ├── .vitepress/
│   │   ├── config.ts
│   │   └── theme/
│   │       ├── core/
│   │       ├── modules/
│   │       │   ├── comment/
│   │       │   ├── home/
│   │       │   ├── invest/
│   │       │   ├── post/
│   │       │   ├── projects/
│   │       │   └── sponsor/
│   │       ├── shared/
│   │       └── views/
│   ├── invest/
│   ├── posts/
│   ├── projects/
│   └── public/
├── .github/workflows/deploy-pages.yml
├── package.json
├── pnpm-lock.yaml
├── README.en.md
└── README.md
```

## Contributing

Issues and pull requests are welcome. Good contributions include:

- Fixing build, deployment, or documentation issues
- Improving VitePress theme components
- Improving accessibility, performance, and SEO
- Adding general configuration notes

Personal content, site copy, and private configuration should be replaced after forking.

## License

This project is licensed under the MIT License. The current license declaration is in `package.json`.
