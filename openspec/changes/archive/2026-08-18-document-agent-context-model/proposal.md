# 提案：Code Agent 项目的最小上下文文件体系

## 变更类型

写 `docs/posts/*.md` 文章。本阶段只沉淀调研结论、大纲与编写思路；用户确认前不创建博客正文。

## Why

现有讨论已经区分了厂商私有规则、开源社区治理文件和真正面向 code agent 的项目上下文，但结论分散。需要形成一篇长期可复用的文章，回答：任何与 code agent 协作的项目，最少需要哪些稳定上下文文件，以及 OpenSpec 在其中承担什么职责。

## Goals

1. 提出最小四层模型：操作协议、项目背景、系统设计、OpenSpec 工作包。
2. 明确每层的唯一职责、建议文件、读取时机和不应包含的内容。
3. 说明 ADR、API/数据 schema、`DESIGN.md` 等为何属于按项目启用的扩展，而不是第五个必选层。
4. 给出从小项目到复杂项目的渐进采用路径和可复制目录。
5. 纠正 `CONTEXT.md`、`PROJECT.md` 等文件名存在统一行业 schema 的误解。

## Non-goals

1. 不收录厂商私有文件，如 `CLAUDE.md`、`GEMINI.md`、Copilot/Cursor rules。
2. 不推荐永久的 `MEMORY.md`、`STATUS.md`、`PROGRESS.md`、`HANDOFF.md` 或 `LEARNINGS.md`。
3. 不重复 OpenSpec 的完整安装与命令教程，链接既有《OpenSpec 使用指南》即可。
4. 不创建一个涵盖所有开源治理文件的清单。

## 预计文章

- 路径：`docs/posts/Code Agent 项目的上下文文件设计指南.md`
- title：`Code Agent 项目的上下文文件设计指南`
- tags：`AI工具`、`工程化`
- description：以 AGENTS.md、项目背景、架构文档和 OpenSpec 构成渐进式披露的最小上下文体系。

## Evidence baseline

- AGENTS.md 开放约定：https://agents.md/
- OpenSpec 核心模型：https://openspec.dev/docs/overview
- arc42 架构文档模型：https://arc42.org/overview
- C4 架构视图：https://c4model.com/diagrams
- ADR 社区：https://adr.github.io/
- 完整调研：`_bmad-output/planning-artifacts/research/technical-agent-2026-08-17/research.md`
