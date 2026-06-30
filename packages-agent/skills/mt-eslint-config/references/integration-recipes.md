# 接入配方

将 `@mt-kit/eslint-config` 接入项目时使用这些模板。

## 安装

在实际运行 lint 的 package 中安装依赖。外部项目优先使用 registry 包，不依赖 `micro-tools` 仓库路径或 workspace catalog。

```bash
pnpm add -D eslint @mt-kit/eslint-config
```

如果项目不是 pnpm，使用该项目已有的包管理器：

```bash
npm install -D eslint @mt-kit/eslint-config
yarn add -D eslint @mt-kit/eslint-config
bun add -d eslint @mt-kit/eslint-config
```

在 monorepo 中，把依赖安装到实际执行 `eslint` 的 root 或 package。不要同时在 root 和 package 下放多份互相冲突的 ESLint 主配置，除非项目已经明确采用分层配置。

## 配置文件类型

优先使用 ESLint flat config。

- 如果 `package.json` 含 `"type": "module"`，可使用 `eslint.config.js`。
- 如果项目是 CommonJS 或不确定模块类型，优先使用 `eslint.config.mjs`。
- 如果已有 `eslint.config.js` 能正常运行，不为了改名而重命名。

## 默认项目

```js
import EsLint from "@mt-kit/eslint-config";

export default EsLint;
```

## TypeScript 项目

默认导出已经包含 TypeScript 配置块。

```js
import EsLint from "@mt-kit/eslint-config";

export default [
  ...EsLint,
  {
    ignores: [
      "dist/**",
      "build/**",
      "coverage/**"
    ]
  }
];
```

除非用户明确需要 type-aware lint rules，否则避免主动添加 `parserOptions.project`。配置包有意关闭它，避免 config 文件和混合 workspace 出现 tsconfig 归属错误。

## Vue 项目

```js
import { VUE } from "@mt-kit/eslint-config";

export default [
  ...VUE
];
```

用于 `.vue` 文件，包括 `<script setup lang="ts">`。

## React 项目

```js
import { REACT } from "@mt-kit/eslint-config";

export default [
  ...REACT
];
```

用于 React、React + TypeScript、JSX 和 TSX。不要仅为了 Hooks 规则额外添加 `eslint-plugin-react-hooks`；这个配置包使用 `@eslint-react` 的等价规则。

## 本地覆盖

把项目规则追加到 preset 后面：

```js
import { REACT } from "@mt-kit/eslint-config";

export default [
  ...REACT,
  {
    rules: {
      "@eslint-react/no-missing-component-display-name": "off"
    }
  }
];
```

临时迁移、生成代码、框架特定约定和仓库特定命名要求，都优先使用这个追加覆盖模式。

## Package Scripts

优先使用项目已有 scripts。没有时可添加：

```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  }
}
```

从拥有 `eslint.config.js` 的 package 或 workspace root 运行命令。

## 外部项目检查清单

接入完成后确认：

- `@mt-kit/eslint-config` 出现在目标项目自己的 `devDependencies` 中。
- `eslint.config.*` 不引用 `micro-tools` 仓库内的相对路径。
- Vue 项目使用 `VUE`，React 项目使用 `REACT`，普通 JS/TS 项目使用默认导出。
- 本地 overrides 追加在 preset 后面，而不是改写配置包内部规则。
- lint 命令从拥有配置文件和依赖的目录运行。
