---
version: alpha
name: QianFan Terminal Green
description: 阅读优先、技术感明确且克制的个人知识站视觉系统
colors:
  primary: "#08CB00"
  primary-hover: "#06A300"
  primary-muted: "#B5F6AC"
  accent: "#253900"
  link: "#057A00"
  link-hover: "#036600"
  background: "#FFFFFF"
  surface: "#FFFFFF"
  border: "rgba(37, 57, 0, 0.15)"
  overlay: "rgba(8, 203, 0, 0.08)"
  text: "#0B1400"
  text-soft: "rgba(11, 20, 0, 0.70)"
  text-muted: "rgba(11, 20, 0, 0.60)"
  dark-primary: "#4ADE80"
  dark-primary-hover: "#86EFAC"
  dark-background: "#0F1110"
  dark-surface: "#1A1D1A"
  dark-border: "rgba(255, 255, 255, 0.08)"
  dark-text: "#F3F4F6"
  dark-text-soft: "rgba(243, 244, 246, 0.85)"
typography:
  heading:
    fontFamily: Noto Sans SC
    fontSize: 1.35rem
    fontWeight: 600
    lineHeight: 1.4
  body:
    fontFamily: Noto Sans SC
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.7
  body-small:
    fontFamily: Noto Sans SC
    fontSize: 0.95rem
    fontWeight: 400
    lineHeight: 1.7
  metadata:
    fontFamily: JetBrains Mono
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.5
rounded:
  sm: 8px
  md: 12px
  lg: 14px
  card: 18px
  full: 999px
shadow:
  card: 0 18px 35px rgb(var(--color-shadow-rgb) / 0.12)
  overlay: 0 12px 30px rgba(0, 0, 0, 0.14)
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 40px
components:
  link-pill:
    backgroundColor: "{colors.background}"
    textColor: "{colors.text}"
    rounded: "{rounded.full}"
    padding: 12px
    height: 44px
  inline-link:
    backgroundColor: "{colors.background}"
    textColor: "{colors.link}"
  inline-link-hover:
    backgroundColor: "{colors.background}"
    textColor: "{colors.link-hover}"
  supporting-copy:
    backgroundColor: "{colors.background}"
    textColor: "{colors.text-soft}"
  muted-copy:
    backgroundColor: "{colors.background}"
    textColor: "{colors.text-muted}"
  donation-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    rounded: "{rounded.lg}"
    padding: 16px
  divider:
    backgroundColor: "{colors.border}"
    height: 1px
---

# QianFan 视觉设计系统

## Overview

QianFan 是面向开发者、技术读者和搜索访问者的个人知识站。界面应像一份持续维护的技术手册：直接、可靠、易扫描，并保留鲜明的终端绿色识别。阅读始终是第一层级，导航、统计、赞助和社交入口只提供必要支持，不与正文争夺注意力。

品牌性格是实用、技术、透明。避免通用 SaaS 落地页、装饰性卡片网格、过度圆角和与阅读无关的视觉效果。设计不追求营销感，而是让长文在桌面和移动端都清楚、稳定、可信。

## Colors

颜色策略为高对比中性色加单一终端绿。绿色用于链接、当前状态、交互反馈和少量品牌识别，不铺满大面积正文背景。

- `primary` 承担品牌识别和大号状态元素；白底正文链接使用更深的 `link`，避免亮绿色文字对比度不足。浅色下 `primary` 仅 2.20:1，**任何情况下都不得作为文字色**。
- `text` 用于正文与标题，`text-soft` 用于说明，`text-muted` 只用于非关键元信息。
- `background` 是页面底色，`surface` 用于确实需要边界的内容容器。
- 深色主题使用独立的 `dark-*` token，不通过简单反相生成。
- 正文文字与背景至少满足 WCAG AA 4.5:1；不得为了“轻盈”继续降低说明文字对比度。
- 半透明品牌绿一律通过 `rgb(var(--color-primary-rgb) / <alpha>)` 取色，不得写死 `rgba(8, 203, 0, …)`：硬编码值在深色主题下不会跟随切换。阴影染色同理使用 `--color-shadow-rgb`。
- 实心按钮底色走 VitePress 的 `--vp-c-brand-3`，其文字恒为白色，因此该值必须保持足够深；深色主题改用中绿并把按钮文字翻转为深色。

## Typography

中文正文以 Noto Sans SC 为主，Inter 只作为拉丁字符补充；系统字体作为降级方案。正文保持自然、克制，不使用装饰性衬线体。代码、时间和结构化元信息使用等宽字体。

- 标题依靠字号和字重建立层级，不使用渐变文字、全大写眉题或夸张字距。
- 正文默认 16px、1.7 行高，长文行宽控制在约 65–75 个字符。
- 小号说明最低使用 0.95rem；0.875rem 用于时间、标签等辅助元数据；0.8rem 是辅助文字的下限，仅用于标签与列表元信息。
- 唯一例外是正文大纲的 h6 层级可降到 0.75rem——该层级是深层嵌套的导航辅助，不承载正文信息。
- 字体通过 `docs/.vitepress/config.ts` 的 `head` 加载（配 `preconnect`），不使用 CSS `@import`，后者会阻塞样式表解析。
- 中文与拉丁文本均不得使用小于 `-0.04em` 的负字距。

## Layout

页面沿用 VitePress 的正文、侧栏和大纲结构。内容区以单列阅读为主；只有二维码、统计或结构化列表确实需要比较时才使用并列布局。

间距遵循 4px 基础尺度：组件内部以 8–16px 为主，模块之间使用 24–40px。移动端优先保证内容不横向溢出、44px 触控目标和自然换行。文章底部的扩展模块用完整的 1px 分割线建立节奏，而不是包裹进额外卡片。

## Elevation & Depth

视觉层级主要通过留白、分割线、文字层级与表面色差表达。边框与大范围柔和阴影不得同时用于装饰同一元素。正文模块默认无阴影：赞助统计卡、收支表格和正文大纲都只用 1px 边框加 `surface` 底色界定容器。

阴影只留给确实脱离文档流的元素——当前仅有两处：`PostActions` 的下拉浮层和 `BackToTop` 悬浮按钮。浮层阴影使用中性黑，不染品牌色。

## Shapes

圆角只使用 `rounded` 尺度里的四档：`sm` 8px 用于按钮、分页、大纲条目和工具栏等紧凑控件；`md` 12px 用于二维码和引用块；`lg` 14px 用于二维码卡片；`card` 18px 用于统计卡和表格容器。胶囊形只用于标签、紧凑链接和图标入口，不用于大面积容器。

不得再出现 4px、5px、6px 或 `0.375rem` 这类脱离尺度的中间值——它们在同一屏内与 token 值并存时会产生可见的不一致。图标使用清晰的品牌图标或简洁线性 SVG，不使用手绘装饰图。

## Components

- **文章正文：** 永远保持最高视觉优先级，链接使用主绿色，标题保持高对比。
- **文章列表：** 使用分割线形成连续列表，不把每篇文章包装成浮动卡片；标题左对齐，时间和标签作为次级信息。
- **链接入口：** 图标入口至少 44×44px，具备可见的键盘焦点；微信因不可直接跳转而保留账号文字。
- **赞助模块：** 二维码直接展开以缩短访问链路；桌面提示扫码，移动端提示保存后识别。文章底部使用紧凑尺寸，独立赞助页使用完整尺寸。
- **分割线：** 文章底部的赞助与「找到我」各自从一条完整边界开始，保持模块关系清楚，不额外制造卡片层级。
- **动效：** 只使用短促的颜色、位移或透明度反馈；任何非必要动效必须支持 `prefers-reduced-motion`。

## Do's and Don'ts

- 应优先保证长文可读性、移动端稳定性和清楚的信息层级。
- 应复用 `docs/.vitepress/theme/styles/tokens.css` 中与本文件对应的 CSS 变量；全局样式由 `theme/index.ts` 按 token、基础样式、VitePress 覆盖的顺序加载。
- 覆盖 VitePress 默认主题时必须使用当前大版本的变量名。项目运行在 VitePress 2，品牌色变量是 `--vp-c-brand-1/2/3/soft`；`--vp-c-brand-light`、`--vp-c-brand-dark` 和 `--vp-c-text` 在 2.x 不存在，写了不生效。
- 应保留 `--vp-c-text-1/2/3` 的三级差异（对应 `text` / `text-soft` / `text-muted`），不要把它们指向同一个灰值——那会抹平 VitePress 内建的文字层级。
- 运行 `pnpm build` 后可用 `node scripts/check-design-tokens.mjs` 校验上述约束。
- 应为交互控件提供键盘焦点、语义标签和至少 44px 的移动端触控面积。
- 不应使用渐变文字、玻璃拟态、装饰性条纹背景或大范围柔光阴影。
- 不应重复堆叠卡片，也不应让辅助模块比文章标题或正文更醒目。
- 不应随意引入新的品牌色、字体或圆角尺度；确有需要时先更新本文件，再更新运行时 CSS。
