<!-- bmad:context -->
<!-- Verified 2026-09-22 against 4bf270b. Managed by bmad-project-context; edits inside this block are replaced on refresh. Keep anything you want preserved outside the markers. -->

## QianFan Blog

这是一个以简体中文内容为主的个人技术博客，使用 VitePress、Vue、TypeScript 和 Markdown 构建，包管理器为 pnpm。项目介绍见 `README.md` 和 `README.zh-CN.md`；产品目标、视觉系统、当前架构和行为规格分别位于 `PRODUCT.md`、`DESIGN.md`、`docs/architecture.md` 与 `openspec/`。

## Policy

- 文章、项目文档和面向维护者的说明默认使用简体中文；代码标识符沿用现有英文命名。
- 只使用 pnpm 管理前端依赖；不要执行 npm/yarn 安装或提交其他锁文件。
- 将项目级 `openspec/` 作为规格与决策历史提交；不要忽略活动 change 或 archive。
- 收到新的博客主题时，先提交大纲和编写思路；仅在用户明确确认后创建或大幅改写 `docs/posts/*.md`。

## Where things are

- 站点配置与 Markdown 构建入口：`docs/.vitepress/config.ts`。
- 主题组合及 Markdown 全局组件：`docs/.vitepress/theme/index.ts`。
- 修改视觉、布局或交互时，先读取 `DESIGN.md`；运行时 token 位于 `docs/.vitepress/theme/styles/tokens.css`。
- 修改系统边界、内容数据流或主题分层时，先读取 `docs/architecture.md`。
- 修改内容扫描、排序或路由数据时，从 `docs/.vitepress/theme/core/content/entries.ts` 开始，再检查对应的 `modules/*/utils/`。
- 存在对应 OpenSpec change 时，先读取 `openspec/config.yaml` 与 `openspec/changes/<change-id>/`，再开始实现。

## Running and verifying

- 修改内容、主题、配置或依赖后运行 `pnpm build`；构建成功是当前仓库的最低验证要求。
- 修改 `DESIGN.md` 后运行 `pnpm dlx @google/design.md lint DESIGN.md`。

## Known pitfalls

- 保持 `.github/workflows/deploy-pages.yml` 使用 `peaceiris/actions-gh-pages@v3`；不要把 action 所有者替换成本仓库所有者，历史上该误改曾多次导致部署失败。

<!-- /bmad:context -->
