# agent-context-article Specification

## Purpose
TBD - created by archiving change document-agent-context-model. Update Purpose after archive.
## Requirements
### Requirement: Present a minimal vendor-neutral context model

The article SHALL present `AGENTS.md`, project context, system architecture, and OpenSpec as the minimal layered model for collaborating with code agents, while classifying ADRs and machine-readable contracts as optional extensions triggered by actual project needs.

#### Scenario: Reader selects repository context files

- **WHEN** a reader uses the article to design a repository for code-agent collaboration
- **THEN** the reader can identify the responsibility, loading trigger, and exclusion boundary of each core layer
- **AND** the reader is not instructed to create redundant global memory, status, progress, handoff, or learnings files

### Requirement: Explain progressive disclosure and ownership

The article SHALL explain that an agent starts from `AGENTS.md` and loads project, architecture, OpenSpec, decision, or machine-contract details only when the task requires them.

#### Scenario: Agent follows the documented context path

- **WHEN** a task concerns only repository operation and validation
- **THEN** `AGENTS.md` is sufficient
- **AND** deeper documents are loaded only when product semantics, architecture, a specific change, or an interface boundary is involved
