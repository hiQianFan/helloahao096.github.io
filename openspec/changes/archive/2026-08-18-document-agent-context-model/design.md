# 设计：Code Agent 项目的最小上下文文件体系

## 核心结论

文章采用四层模型，不再增加通用 Markdown 文件：

```text
AGENTS.md
  ├─ docs/context.md 或 PROJECT.md
  ├─ docs/architecture.md
  └─ openspec/
       ├─ specs/
       └─ changes/<change-id>/
```

其中前三层描述仓库长期有效的操作、业务与架构事实，OpenSpec 同时管理当前行为规格和单次变更执行包。代码、测试、构建配置与机器合同仍是更高优先级的可执行事实，但不另造通用上下文 Markdown。

## 文章大纲

# Code Agent 项目的上下文文件设计指南

## 1. 问题不是上下文不足，而是上下文没有分层

- 为什么把所有内容写进一个 `CONTEXT.md` 会腐化
- 文件名标准与信息角色标准的区别
- 本文的选择标准：跨工具、低重复、可验证、按需读取

## 2. 最小四层模型

### 2.1 `AGENTS.md`：操作协议与导航入口

- 工作方式、命令、验证要求、禁止事项
- 只写非显而易见的规则和指向其他事实源的链接
- 根文件与子目录 delta-only 规则

### 2.2 `docs/context.md` 或 `PROJECT.md`：项目背景

- 产品目的、用户、领域术语、范围、边界、非目标
- 两个文件二选一，不并存
- 不写架构细节、任务进度或代码可推导信息

### 2.3 `docs/architecture.md`：系统设计

- 系统边界、组件、数据流、部署、质量属性和不变量
- 参考 arc42 的内容维度和 C4 的视图层级，但只保留项目真正需要的部分
- 小而直观的项目可以不创建

### 2.4 `openspec/`：当前行为真相与变更执行

- `specs/` 表示当前系统行为
- `changes/` 通过 proposal → delta specs → design → tasks 管理变化
- archive 将已完成变化合并回当前真相
- OpenSpec 取代自制 `tasks.md`、`plan.md` 和临时状态体系

## 3. 四层如何渐进式披露

- 启动任务：先读 `AGENTS.md`
- 涉及业务语义：再读 context/project
- 涉及边界或技术方案：再读 architecture 与相关 ADR
- 开始变更：只加载对应 OpenSpec change 和相关主 spec
- 接口边界：最后读取 OpenAPI、JSON Schema、protobuf 等机器合同

用 Mermaid 表达读取路径，而不是把全部文档预加载。

## 4. 还有哪些内容值得保留，但不是必选层

### 4.1 ADR：重大且持久的决策

- 只记录需要保留“为什么”的决策
- 普通实现选择留在 OpenSpec design 或代码即可

### 4.2 机器合同：API 和数据边界

- OpenAPI、AsyncAPI、JSON Schema、protobuf
- 它们是可验证的事实源，不是给 agent 写的散文上下文

### 4.3 `DESIGN.md`：只在视觉系统存在时

- UI/design token 项目可使用
- 不应被误当作所有软件项目的架构文件

## 5. 明确不沉淀的文件

- 全局 `MEMORY.md`、`STATUS.md`、`PROGRESS.md`、`LEARNINGS.md`
- 原因：与 Git、issue、OpenSpec tasks 和代码事实重复，且易过期
- 临时交接由对话、issue/PR 或任务系统承担，不晋升为仓库长期真相

## 6. 推荐目录与最小模板

- 小项目：`AGENTS.md + openspec/`
- 有业务语义：增加 context/project
- 非平凡系统：增加 architecture
- 重大决策/API 边界：按需增加 ADR 和机器合同
- 给出精简目录树和每个文件的章节模板

## 7. 维护规则：一条事实只有一个所有者

- AGENTS 负责路由，不复制文档
- context 负责 why/domain，不复制需求变化
- architecture 负责当前结构，不充当决策流水账
- OpenSpec 负责行为和变化闭环
- 代码、测试、配置与 schema 优先于自然语言摘要

## 8. 结论：四层足够，扩展必须由真实复杂度触发

- 提供采用检查表
- 强调 YAGNI：没有信息就不创建空文件

## 编写思路

1. 先建立判断原则，再给文件清单，避免文章沦为模板目录。
2. 以“长期事实”和“单次变化”为主轴解释四层边界。
3. OpenSpec 不只定位为任务清单：其主 specs 负责当前行为真相，change artifacts 负责变化过程。
4. 用一个读取流程图展示渐进式披露，用一个职责表完成快速复习。
5. 每个推荐文件同时写“包含什么”和“不包含什么”，降低重复与漂移。
6. 结尾提供三档采用方案，读者可以停在满足当前复杂度的最小档。

## 不采用的方案

### 单一巨型 `CONTEXT.md`

职责混杂、更新频率不同，容易积累过时任务状态，也无法按需加载。

### 创建完整 Memory Bank

适合依赖该结构的特定工具，但不是跨 agent 的公共标准；与用户选择的 OpenSpec 工作流重复。

### 继续扩充社区健康与治理文件

README、CONTRIBUTING、SECURITY 等有各自用途，但不是 code-agent 上下文模型的必要组成，不进入本文核心目录。
