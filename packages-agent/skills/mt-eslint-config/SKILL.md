---
name: mt-eslint-config
description: 当需要为内部或外部项目接入、迁移、定制或排查 @mt-kit/eslint-config 时使用。本 skill 覆盖 JavaScript、TypeScript、Vue、React、JSX、JSON/JSONC、import 排序、stylistic 风格规则、忽略配置、package.json lint、monorepo 接入以及该配置包引发的常见 ESLint 问题。
---

# MT ESLint Config

## 快速开始

使用本 skill 处理应用项目或包项目中的 `@mt-kit/eslint-config`。当 README 示例、依赖表或旧版 ESLint 生态命名与源码不一致时，以配置包源码和 `package.json` 为准。

外部项目使用时，不假设项目位于 `micro-tools` 仓库内，也不假设存在 pnpm catalog、workspace link 或本仓库路径。优先按目标项目自己的包管理器、模块类型、lint script 和目录结构接入。

先识别项目类型：

- 普通 JavaScript 或 TypeScript 项目使用默认导出。
- Vue SFC 项目使用 `VUE`。
- React 或 React + TypeScript 项目使用 `REACT`。
- 除非用户明确要求替换，否则保留项目已有的 ignores、parser settings、globals 和 rule overrides。
- 如果项目是 monorepo，先确认 lint 是从 root 运行，还是从具体 package 运行。

## 配置选择

创建或更新 `eslint.config.js`，选择最小可用 preset。

默认 JavaScript/TypeScript：

```js
import EsLint from "@mt-kit/eslint-config";

export default EsLint;
```

Vue：

```js
import { VUE } from "@mt-kit/eslint-config";

export default [
  ...VUE
];
```

React：

```js
import { REACT } from "@mt-kit/eslint-config";

export default [
  ...REACT
];
```

追加项目自定义 ignores 或 rules：

```js
import EsLint from "@mt-kit/eslint-config";

export default [
  ...EsLint,
  {
    ignores: [
      "dist/**",
      "coverage/**"
    ]
  },
  {
    rules: {
      "no-console": "warn"
    }
  }
];
```

## 工作流程

1. 检查 `package.json`、已有 `eslint.config.*`、框架文件和包管理器信息。
2. 确认运行 lint 的 workspace 或 package 中安装了 `eslint` 和 `@mt-kit/eslint-config`，外部项目使用 registry 版本，不依赖本仓库源码路径。
3. 根据项目模块类型选择 `eslint.config.js` 或 `eslint.config.mjs`；不要在 CommonJS 项目里写无法执行的 ESM 配置。
4. 根据项目类型选择正确 preset，并把本地 overrides 追加到 preset 数组后面。
5. 运行项目 lint 命令，通常是已有的 `lint` script，或按包管理器执行 `eslint .`。
6. 如果 lint 失败，先归类问题再改规则：依赖解析、parser 设置、框架 preset 不匹配、import 排序、stylistic 格式，或真实源码问题。

## 参考资料

只读取当前任务需要的 reference：

- `references/config-map.md`：源码模块映射、导出结构和包内关键行为。
- `references/integration-recipes.md`：外部项目和常见项目类型的接入模板。
- `references/troubleshooting.md`：常见失败场景和排查方法。
