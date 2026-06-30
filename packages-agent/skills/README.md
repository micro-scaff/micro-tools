# Skills

这里存放可复用的 Codex agent 资产，包括 skills 和 MCP 配置。当前重点维护 `packages-agent/skills`，用于沉淀项目级工作流、接入经验和可复用排错知识。

## Skills 清单

| Skill | 路径 | 用途 |
| --- | --- | --- |
| `mt-eslint-config` | `packages-agent/skills/mt-eslint-config` | 为内部或外部项目接入、迁移、定制和排查 `@mt-kit/eslint-config` |

外部项目使用时，可以将需要的 skill 目录复制到目标环境的 Codex skills 目录，或在任务中显式引用该 skill 路径。

## Skill 目录规范

每个 skill 目录建议保持下面的结构：

```text
skill-name/
├── SKILL.md
├── agents/
│   └── openai.yaml
└── references/
    └── *.md
```

### `SKILL.md`

`SKILL.md` 是 skill 的入口文件，负责触发识别和核心工作流说明。

字段含义：

- `name`：skill 的唯一名称，使用小写字母、数字和连字符，例如 `mt-eslint-config`。
- `description`：触发说明，描述这个 skill 解决什么问题、什么时候应该使用。这里的信息会影响 Codex 是否自动选择该 skill。
- 正文标题与说明：给 Codex 读取后的操作指南，通常包含快速开始、决策规则、工作流程和 reference 导航。

编写约定：

- `description` 要覆盖具体触发场景，不只写一句泛泛介绍。
- 正文保留核心流程，细节放到 `references/`。
- 不在正文里重复大段源码或长规则清单。

### `agents/openai.yaml`

`agents/openai.yaml` 是面向 Codex UI 和 skill 列表的展示元信息。

字段含义：

- `interface.display_name`：展示名称，给用户在列表或 chip 中识别 skill。
- `interface.short_description`：简短描述，用一句话说明 skill 的作用。
- `interface.default_prompt`：默认调用提示，需要显式包含 `$skill-name`，方便用户快速发起任务。

当前不强制配置图标、品牌色或外部工具依赖；只有确实需要时再补充。

### `references/`

`references/` 存放按需读取的细节文档。它不应该替代 `SKILL.md`，而是承接更具体、更长、更容易变化的说明。

常见文件类型：

- `config-map.md`：模块、配置、依赖或内部结构映射。
- `integration-recipes.md`：接入模板、安装命令、常见项目形态。
- `troubleshooting.md`：错误分类、排查步骤和兼容性说明。

编写约定：

- 每个 reference 只覆盖一个主题。
- 文件名使用小写英文和连字符。
- 不新增 README、CHANGELOG、QUICK_REFERENCE 等额外旁支文档，除非它们会被 skill 明确引用。

## `mt-eslint-config`

`mt-eslint-config` 用于处理 `@mt-kit/eslint-config` 的接入、迁移、定制和排错，适用于内部仓库和外部项目。

### 文件作用

| 文件 | 作用 |
| --- | --- |
| `SKILL.md` | 定义 skill 名称、触发描述、项目类型判断、配置选择和主工作流 |
| `agents/openai.yaml` | 定义 Codex UI 展示名、短描述和默认调用提示 |
| `references/config-map.md` | 说明 `@mt-kit/eslint-config` 的导出结构、源码模块、插件选择和依赖事实来源 |
| `references/integration-recipes.md` | 提供 pnpm/npm/yarn/bun 安装命令、ESLint flat config 模板、Vue/React/TS 接入方式和外部项目检查清单 |
| `references/troubleshooting.md` | 记录 ESLint 版本、外部路径、TypeScript parser、import-x、React 插件、Prettier、Vue parser 等常见问题排查 |

### 使用边界

- 外部项目应从 `@mt-kit/eslint-config` 包名导入，不引用本仓库源码路径。
- Vue 项目优先使用 `VUE`，React 项目优先使用 `REACT`，普通 JS/TS 项目使用默认导出。
- 本地项目 overrides 应追加在 preset 后面，不直接修改配置包内部规则。
- monorepo 项目先确认 lint 命令从 root 运行还是从具体 package 运行。

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
3. 只在需要时添加 `references/`，并从 `SKILL.md` 明确说明何时读取。
4. 用实际项目任务验证 skill 是否能指导 Codex 完成接入或排错。
5. 在本 README 的 Skills 清单和扩展计划中同步更新状态。
