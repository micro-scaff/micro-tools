# 排错指南

当 lint 配置或 lint 执行失败时使用本指南。

## Preset 不匹配

如果 Vue 文件无法解析，确认项目使用：

```js
import { VUE } from "@mt-kit/eslint-config";
```

如果 JSX 或 TSX React 文件缺少 React 相关规则，确认项目使用：

```js
import { REACT } from "@mt-kit/eslint-config";
```

## ESLint 版本

检查已安装 ESLint 版本和配置包 peer dependency。当前包元信息要求 `eslint >=10`。旧 README 片段可能仍提到 ESLint 9。

外部项目如果出现 peer dependency 警告，先查看目标项目实际安装版本：

```bash
npm ls eslint @mt-kit/eslint-config
```

pnpm/yarn/bun 项目使用对应包管理器的 list/why 命令。不要把本仓库 `packages-dev/eslint-config/package.json` 的状态直接等同于外部项目已安装版本。

## 外部项目路径问题

外部项目的 `eslint.config.*` 不应引用 `packages-dev/eslint-config/src/index.js` 这类仓库源码路径。应从 npm 包名导入：

```js
import EsLint from "@mt-kit/eslint-config";
```

如果用户正在本地联调未发布版本，先说明这是 linked/workspace 场景，再按该项目的 link 方式排查。

## TypeScript 项目错误

本配置默认不启用 `parserOptions.project`。如果用户自行添加后遇到 tsconfig inclusion 错误，要么移除 `project`，要么新增专用 `tsconfig.eslint.json`，把 config 文件和源码文件都纳入 include。

## Import 解析

`import-x/no-unresolved` 是有意关闭的。对于使用 TS paths、Vite aliases、monorepo 或 package export maps 的项目，不要在 resolver 设置不完整时贸然打开它。

遇到 import 排序失败时，先运行 `eslint --fix`，再考虑手动调整。当前配置会按 builtins、external dependencies、framework/UI packages、internal aliases、parent/sibling/index imports、object imports 和 type imports 分组。

## React 插件

本包使用 `@eslint-react/eslint-plugin` 和 `eslint-plugin-react-compiler`。

不要假设这些经典规则可用：

- `react/*`
- `react-hooks/*`
- `jsx-a11y/*`

React 相关覆盖应使用 `@eslint-react/*` 规则名。

## Prettier

`config/prettier.js` 只关闭 `"prettier/prettier"`，不注册 `eslint-plugin-prettier`。如果项目报 `Definition for rule 'prettier/prettier' was not found`，检查是否有本地配置启用了该规则，但没有安装或注册对应插件。

## Vue Parser

Vue SFC 解析依赖 `vue-eslint-parser`，并为 `js`、`ts`、`tsx` script block 配置 `@typescript-eslint/parser`。如果解析失败，检查包安装、文件扩展名，以及是否有本地配置在 `VUE` 后覆盖了 `languageOptions.parser`。

## JSON 和 package.json 排序

JSONC 配置会排序 `package.json` 顶层字段和部分数组字段。对于生成文件或第三方 package 文件，优先添加本地 ignore block，而不是削弱全局 package 规则。

## 旧版 ESLint Comments 插件

comments 配置为了兼容新版 ESLint context，对 `eslint-plugin-eslint-comments` 做了包装。如果错误提到 `context.getSourceCode`，确认这个 wrapper 仍然生效，并且没有本地配置重新注册原始插件。
