# 任务：Code Agent 项目的上下文文件设计指南

## 1. 大纲确认

- [x] 1.1 用户确认 `design.md` 中的文章大纲、四层模型和编写思路

  **验收**：用户明确同意开始撰写；确认前不创建 `docs/posts/*.md`。

## 2. 文章撰写

- [x] 2.1 创建 `docs/posts/Code Agent 项目的上下文文件设计指南.md`

  **验收**：frontmatter 包含 title、description、date、tags；tags 复用 `AI工具`、`工程化`。

- [x] 2.2 按已确认大纲完成正文、职责表、渐进读取 Mermaid 图和最小目录模板

  **验收**：明确区分 AGENTS、项目背景、架构、OpenSpec；ADR、机器合同和 DESIGN.md 仅作为按需扩展。

- [x] 2.3 校对外部来源和站内链接

  **验收**：链接 AGENTS.md、OpenSpec、arc42、C4、ADR 的一手资料，以及站内《OpenSpec 使用指南》《BMAD 与 OpenSpec 配合使用指南》；不存在失效的相对资源路径。

- [x] 2.4 为每类上下文文件补充定义、官方资料与标准实现

  **验收**：AGENTS、项目背景、架构、OpenSpec、ADR、机器合同和 DESIGN.md 均提供可直接读取的一手文档或模板；不存在公共标准的文件明确标注其社区约定属性。

## 3. 验证

- [x] 3.1 运行项目现有文档构建命令

  **验收**：VitePress 构建通过，frontmatter、Markdown、Mermaid 和链接语法不造成构建错误。

- [x] 3.2 检查文章是否遵循“一条事实一个所有者”和 YAGNI 原则

  **验收**：没有推荐无真实用途的空文件；没有把 OpenSpec 已管理的信息重复到新的状态文件。
