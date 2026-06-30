# Skills

这里存放可复用的 Agent Skills。可以把 skill 理解成“写给 AI Agent 的专项操作手册”：它告诉 Agent 遇到某类任务时应该读哪些资料、按什么步骤做、用什么脚本或工具验证。

当前目录以 Codex 使用为主，同时尽量兼容 Agent Skills 标准和 Claude Code。

## 先看这个

| 你想做什么 | 看哪里 |
| --- | --- |
| 找已有 skill | [Skills 清单](#skills-清单) |
| 新写一个 skill | [书写规范](#书写规范) |
| 看示例 | [经典示例](#经典示例) |
| 给别人用 | [发布方式](#发布方式) |
| 在 Codex 或 Claude Code 中使用 | [在 Codex 和 Claude Code 中使用](#在-codex-和-claude-code-中使用) |
| 配合 MCP 或其他 Agent | [配合其他 Agent 和 MCP 使用](#配合其他-agent-和-mcp-使用) |

## 官方文档

优先参考这些官方资料。平时写 skill 不需要全读，遇到不确定的字段、发布方式或工具集成时再查。

| 主题 | 文档 |
| --- | --- |
| Agent Skills 标准 | [Agent Skills Specification](https://agentskills.io/specification) |
| Codex skills | [OpenAI Codex Agent Skills](https://developers.openai.com/codex/skills) |
| Codex plugins | [OpenAI Codex Build plugins](https://developers.openai.com/codex/plugins/build) |
| Codex MCP | [OpenAI Codex MCP](https://developers.openai.com/codex/mcp) |
| Codex subagents | [OpenAI Codex Subagents](https://developers.openai.com/codex/subagents) |
| Claude Code skills | [Claude Code Skills](https://code.claude.com/docs/en/skills) |
| Claude Code plugins | [Claude Code Plugins](https://code.claude.com/docs/en/plugins) |
| Claude Code MCP | [Claude Code MCP](https://code.claude.com/docs/en/mcp) |
| Claude Code subagents | [Claude Code Subagents](https://code.claude.com/docs/en/sub-agents) |

## Skills 清单

| Skill | 路径 | 用途 |
| --- | --- | --- |
| `mt-eslint-config` | `packages-agent/skills/mt-eslint-config` | 为内部或外部项目接入、迁移、定制和排查 `@mt-kit/eslint-config` |

外部项目使用时，可以将需要的 skill 目录复制到目标环境的 skills 目录，或在任务中显式引用该 skill 路径。

## 书写规范

### 一个 skill 应该解决什么

适合做成 skill 的内容：

- 一类会重复出现的任务，例如“接入 ESLint 配置”。
- 一套稳定流程，例如“发布 npm 包”。
- 一份项目知识，例如“组件库目录规范”。
- 一组需要按需读取的资料，例如“配置映射、接入模板、排错指南”。

不适合做成 skill 的内容：

- 只执行一次的临时任务。
- 与当前项目无关的长篇说明。
- 没有被 `SKILL.md` 引用的杂散文档。

### 目录结构

每个 skill 至少包含 `SKILL.md`，其他目录按需添加。

```text
skill-name/
├── SKILL.md
├── agents/
│   └── openai.yaml
├── scripts/
├── references/
└── assets/
```

文件作用：

- `SKILL.md`：必需。skill 的入口文件，写触发条件和核心步骤。
- `agents/openai.yaml`：推荐。Codex UI 展示信息、默认提示、是否允许自动触发、工具依赖。
- `scripts/`：可选。放可重复执行的脚本，比如生成、校验、转换、提取。
- `references/`：可选。放较长的说明资料，比如配置映射、接入模板、排错指南。
- `assets/`：可选。放模板、图片、字体、示例数据、样板工程等资源。

### `SKILL.md` 怎么写

`SKILL.md` 的开头必须是 YAML frontmatter。

```md
---
name: skill-name
description: 说明这个 skill 做什么，以及什么时候应该使用。
---

这里写 Agent 需要遵循的具体流程。
```

字段含义：

- `name`：必填。skill 名称，使用小写字母、数字和连字符，例如 `mt-eslint-config`。
- `description`：必填。触发说明。Agent 主要靠它判断什么时候使用这个 skill。
- `license`：可选。许可声明或许可文件名。
- `metadata`：可选。作者、版本、团队等补充信息。
- `allowed-tools`：可选。不同工具支持不完全一致，只在明确需要时使用。

写 `description` 时要说清楚三件事：

- 这个 skill 解决什么问题。
- 什么场景下应该使用。
- 覆盖哪些技术或文件类型。

好例子：

```md
description: 当需要为内部或外部项目接入、迁移、定制或排查 @mt-kit/eslint-config 时使用。覆盖 JavaScript、TypeScript、Vue、React、JSON/JSONC、import 排序和常见 ESLint 报错。
```

不推荐：

```md
description: 帮助处理 ESLint。
```

### `agents/openai.yaml` 怎么写

`agents/openai.yaml` 是 Codex 侧的展示和策略配置。

```yaml
interface:
  display_name: "MT ESLint Config"
  short_description: "接入和排查 @mt-kit/eslint-config"
  default_prompt: "使用 $mt-eslint-config 为这个项目接入或排查 @mt-kit/eslint-config。"

policy:
  allow_implicit_invocation: true

dependencies:
  tools:
    - type: "mcp"
      value: "openaiDeveloperDocs"
      description: "读取 OpenAI 官方文档"
      transport: "streamable_http"
      url: "https://developers.openai.com/mcp"
```

字段含义：

- `interface.display_name`：展示名称。
- `interface.short_description`：短描述。
- `interface.default_prompt`：默认调用提示，建议包含 `$skill-name`。
- `policy.allow_implicit_invocation`：是否允许 Codex 根据任务自动触发。不写时默认允许。
- `dependencies.tools`：声明依赖的 MCP 或工具，方便安装和使用时提醒用户配置。

### 写作原则

- 一个 skill 只做一类事。
- `SKILL.md` 写核心流程，长细节放到 `references/`。
- 需要稳定执行的逻辑放到 `scripts/`，不要每次让 Agent 临时重写。
- 所有 reference 都要能从 `SKILL.md` 找到入口。
- 文件名使用小写英文和连字符，例如 `integration-recipes.md`。
- 不在 skill 目录里放未引用的 README、CHANGELOG、QUICK_REFERENCE。

## 经典示例

### 参考知识类

适合编码规范、API 约定、项目风格、领域知识。

```md
---
name: api-conventions
description: API 设计规范。用于新增或修改接口、统一错误格式、请求校验和响应结构。
---

新增 API 时：

1. 使用 RESTful 路径命名。
2. 返回统一错误结构。
3. 对输入参数做显式校验。
4. 为边界情况补充测试。
```

### 任务流程类

适合部署、发布、迁移、修复 issue 等明确流程。

```md
---
name: fix-issue
description: 修复指定 GitHub issue。用于用户要求按 issue 编号实现、补测试并提交修复时。
---

修复 issue $ARGUMENTS：

1. 读取 issue 描述和验收标准。
2. 定位相关代码。
3. 实现最小修复。
4. 补充或更新测试。
5. 总结改动和验证结果。
```

### 脚本增强类

适合需要可重复、可验证输出的任务。`SKILL.md` 负责说明何时运行脚本，脚本放在 `scripts/`。

```text
codebase-visualizer/
├── SKILL.md
└── scripts/
    └── visualize.py
```

````md
---
name: codebase-visualizer
description: 生成代码库结构可视化。用于理解新仓库、检查目录规模或定位大型文件。
---

从项目根目录运行：

```bash
python3 ${SKILL_DIR}/scripts/visualize.py .
```
````

### 当前仓库示例

`mt-eslint-config` 是一个“参考知识 + 接入流程”类 skill：

- `SKILL.md`：触发说明、项目类型判断和主流程。
- `references/config-map.md`：`@mt-kit/eslint-config` 的内部模块映射。
- `references/integration-recipes.md`：外部项目安装和配置模板。
- `references/troubleshooting.md`：常见问题分类排查。

## 发布方式

### Codex

Codex 里有两种常见发布方式：

- 直接放 skill 目录：适合个人、本仓库或单个项目使用。
- 打包成 plugin：适合团队分发、版本化安装，或者同时带上 MCP、app、资源文件。

常见位置：

| 范围 | 位置 |
| --- | --- |
| 仓库级 | `.agents/skills/<skill-name>/SKILL.md` |
| 用户级 | `~/.agents/skills/<skill-name>/SKILL.md` |
| 管理员级 | `/etc/codex/skills/<skill-name>/SKILL.md` |
| 插件级 | `<plugin>/skills/<skill-name>/SKILL.md` |

建议流程：

1. 先在 `packages-agent/skills/<skill-name>` 维护源文件。
2. 项目内使用时复制或同步到 `.agents/skills/<skill-name>`。
3. 个人长期使用时复制到 `~/.agents/skills/<skill-name>`。
4. 需要团队安装或附带 MCP/app/资源时，再封装为 Codex plugin。

### Claude Code

Claude Code 也可以使用项目级、用户级或 plugin 级 skill。

常见位置：

| 范围 | 位置 |
| --- | --- |
| 项目级 | `.claude/skills/<skill-name>/SKILL.md` |
| 用户级 | `~/.claude/skills/<skill-name>/SKILL.md` |
| 插件级 | `<plugin>/skills/<skill-name>/SKILL.md` |

建议流程：

1. 单项目共享：提交 `.claude/skills/` 到版本库。
2. 多项目个人使用：复制到 `~/.claude/skills/`。
3. 团队或社区分发：创建 Claude Code plugin，并用 `.claude-plugin/plugin.json` 声明名称、描述、版本。
4. 本地测试 plugin：使用 `claude --plugin-dir ./my-plugin`。
5. 修改 plugin 后，在 Claude Code 中运行 `/reload-plugins` 重新加载。

## 在 Codex 和 Claude Code 中使用

### Codex

常见用法：

- 显式调用：在提示词中写 `$skill-name`，例如 `$mt-eslint-config`。
- 选择器调用：在 CLI/IDE 中使用 `/skills` 或输入 `$` 选择 skill。
- 自动触发：任务与 `description` 匹配时，Codex 可以自动加载 skill。

Codex 会先看到 skill 的 `name` 和 `description`。只有决定使用这个 skill 时，才读取完整 `SKILL.md`，再按说明读取 `references/` 或运行 `scripts/`。

如果更新后没有出现，检查两件事：

- skill 是否放在 Codex 会扫描的位置。
- 是否需要重启 Codex。

### Claude Code

常见用法：

- 显式调用：输入 `/skill-name`，例如 `/summarize-changes`。
- plugin skill：输入 `/plugin-name:skill-name`。
- 自动触发：任务与 `description` 匹配时，Claude Code 可以自动加载 skill。

Claude Code 支持更多专属 frontmatter，例如 `disable-model-invocation`、`user-invocable`、`allowed-tools`、`context: fork`、`agent`、`paths` 等。为了跨工具兼容，本仓库默认只使用通用字段；只有明确面向 Claude Code 的 skill 才添加 Claude 专属字段。

## 配合其他 Agent 和 MCP 使用

### Skill、MCP、Agent 分别负责什么

| 角色 | 负责什么 |
| --- | --- |
| Skill | 告诉 Agent 怎么做：流程、规则、输出格式、参考资料 |
| MCP | 给 Agent 工具和外部上下文：GitHub、Figma、Sentry、数据库、浏览器、文档系统 |
| Agent | 读 skill，调用 MCP 或本地工具，完成任务 |

简单说：skill 是说明书，MCP 是工具箱，Agent 是执行者。

### 与 MCP 配合

Codex 中可以在 `agents/openai.yaml` 的 `dependencies.tools` 声明 MCP 依赖；真正的 MCP 配置通常放在 `~/.codex/config.toml` 或项目 `.codex/config.toml`。

Claude Code 中可以通过 `claude mcp add` 或 `.mcp.json` 配置 MCP；需要一起分发时可放进 plugin。

适合配合 MCP 的场景：

- 从 GitHub 读取 issue、PR、review comment。
- 从 Figma 读取设计稿。
- 从 Sentry 读取错误日志。
- 从文档系统读取内部规范。
- 用浏览器或 Playwright 检查页面行为。

### 与 Subagents 配合

当任务会产生大量搜索、日志、测试输出或并行分析时，可以把工作拆给 subagents，主 Agent 只负责汇总。

适合拆给 subagent 的任务：

- 大代码库探索。
- PR review 的安全、测试、性能、可维护性多维扫描。
- 日志或监控数据分析。
- 只读调研和资料归纳。

Codex 中，用户需要明确要求使用 subagents，例如“派生三个 agent 分别检查安全、测试和可维护性”。自定义 agent 可放在 `.codex/agents/` 或 `~/.codex/agents/`。

Claude Code 中，可以用 `context: fork` 让 skill 在隔离上下文运行，也可以在 subagent 配置中预加载 skills。Claude Code 自定义 subagent 通常放在 `.claude/agents/` 或 `~/.claude/agents/`。

### 组合示例

```text
用户请求：
使用 $mt-eslint-config 检查这个外部 Vue 项目的 ESLint 接入问题。

推荐执行：
1. 主 Agent 读取 mt-eslint-config 的 SKILL.md。
2. 读取 references/integration-recipes.md 判断 Vue 项目配置。
3. 如需官方文档或包版本，调用 docs/search 类 MCP。
4. 如需检查 GitHub issue 或 PR，调用 GitHub MCP。
5. 如果项目很大，派生只读 subagent 分别检查 package.json、eslint.config.* 和 lint 输出。
6. 主 Agent 汇总修改建议和验证命令。
```

## 扩展计划

后续新增 skill 时，优先按下面方向扩展：

1. `mt-prettier-config`：沉淀 `@mt-kit/prettier-config` 的安装、迁移、冲突排查和与 ESLint 的协作方式。
2. `mt-tsconfig`：沉淀 TypeScript 配置模板、monorepo references、构建产物声明文件和常见 tsconfig 报错处理。
3. `mt-release-workflow`：沉淀 changeset、版本发布、包构建、registry 发布和回滚流程。
4. `mt-monorepo-package`：沉淀新增 package、目录结构、package.json 字段、workspace 依赖和脚本约定。
5. `mt-vue-library`：沉淀 Vue 组件库开发、类型导出、样式组织、文档示例和测试策略。
6. `mt-react-library`：沉淀 React 组件库开发、JSX/TSX 规则、构建入口、类型导出和兼容性策略。

新增 skill 的基本步骤：

1. 在 `packages-agent/skills/<skill-name>` 下创建 `SKILL.md`。
2. 补充 `agents/openai.yaml`，保证 `default_prompt` 包含 `$<skill-name>`。
3. 只在需要时添加 `references/`、`scripts/` 或 `assets/`，并从 `SKILL.md` 明确说明何时读取或运行。
4. 用实际项目任务验证 skill 是否能指导 Agent 完成接入或排错。
5. 在本 README 的 Skills 清单和扩展计划中同步更新状态。
