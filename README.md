# QianFan Blog

> 基于 VitePress 的个人博客源码，用于技术笔记、项目记录和长文写作。

[![VitePress](https://img.shields.io/badge/VitePress-1.6.4-646CFF?logo=vite&logoColor=white)](https://vitepress.dev/)
[![pnpm](https://img.shields.io/badge/pnpm-9.15.3-F69220?logo=pnpm&logoColor=white)](https://pnpm.io/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](package.json)
[![Deploy](https://img.shields.io/badge/GitHub%20Actions-Deploy-2088FF?logo=github-actions&logoColor=white)](.github/workflows/deploy-pages.yml)

线上地址：[https://blog.mapin.net](https://blog.mapin.net)

English: [README.en.md](README.en.md)

## 简介

这是 QianFan 的个人博客源码，基于 VitePress 和 Vue 构建。项目包含文章自动索引、项目与投资内容聚合、giscus 评论、访问统计、Mermaid 图表、SEO 元信息、站点地图、`llms.txt` 生成和 GitHub Pages 自动部署。

如果你想搭建一个可维护的个人技术博客，可以 Fork 后替换站点配置、内容和静态资源。

## 功能

- VitePress 1.6 + Vue 3.5
- Markdown 文章、项目、投资内容自动扫描
- 首页、文章列表、文章分页、侧边栏和上一篇/下一篇
- giscus 评论与评论数
- 不蒜子 PV/UV 统计
- Mermaid 图表支持
- Sitemap、Open Graph、Twitter Card 和 canonical URL
- `llms.txt` 与 Markdown 内容复制，便于 AI 工具读取
- GitHub Actions 自动构建并发布到 `gh-pages`

## 技术栈

- VitePress, Vue, Vite
- pnpm, Sass, autoprefixer
- fast-glob, globby, gray-matter, fs-extra, dayjs
- giscus, busuanzi.pure.js, cursor-effects, Pinia
- mermaid, vitepress-plugin-mermaid

## 快速开始

环境要求：

- Node.js 20+
- pnpm 9.15.3+

```bash
pnpm install
pnpm run dev
```

本地开发服务默认运行在 `http://localhost:5173`。

构建和预览：

```bash
pnpm run build
pnpm run preview
```

构建产物位于 `docs/.vitepress/dist`。

## 内容管理

- 博客文章：`docs/posts/*.md`
- 项目记录：`docs/projects/*.md`
- 投资记录：`docs/invest/*.md`
- 静态资源：`docs/public`

推荐的 Front Matter：

```markdown
---
title: GitHub Actions 部署指南
date: 2024-11-01
tags: [CI/CD, GitHub Actions]
description: 用于文章列表摘要和 SEO 描述。
---
```

文章会按 `date` 倒序展示。修改内容目录时，请同步检查对应模块下的扫描工具：

- `docs/.vitepress/theme/modules/post/utils/posts.ts`
- `docs/.vitepress/theme/modules/projects/utils/projects.ts`
- `docs/.vitepress/theme/modules/invest/utils/invest.ts`

## 配置

主要配置入口是 `docs/.vitepress/config.ts`。

常见需要修改的内容：

- `siteUrl`：站点域名
- `title` / `description`：站点标题和描述
- `themeConfig.nav`：导航
- `themeConfig.socialLinks`：社交链接
- `logo`、favicon 和默认分享图
- `docs/.vitepress/theme/modules/comment/constants/index.ts`：giscus 默认配置
- `.github/workflows/deploy-pages.yml`：部署分支、自定义域名和 Secrets

giscus 建议通过环境变量或 GitHub Secrets 注入：

```bash
VITE_GISCUS_REPO=
VITE_GISCUS_REPO_ID=
VITE_GISCUS_CATEGORY=
VITE_GISCUS_CATEGORY_ID=
```

## 部署

当前 GitHub Actions 流程会在 `master` 分支 push 后运行：

1. 安装 pnpm 和 Node.js 20。
2. 安装依赖。
3. 执行 `pnpm run build`。
4. 写入 `CNAME`。
5. 发布 `docs/.vitepress/dist` 到 `gh-pages` 分支。

部署到其他静态托管平台时，上传 `docs/.vitepress/dist` 即可。

## 项目结构

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

## 贡献

欢迎提交 Issue 和 PR。适合贡献的内容包括：

- 修复构建、部署或文档问题
- 改进 VitePress 主题组件
- 优化可访问性、性能和 SEO
- 补充通用配置说明

个人内容、站点文案和私有配置不建议直接复用，Fork 后请替换为你自己的内容。

## 许可证

本项目使用 MIT License。当前许可证声明以 `package.json` 为准。
