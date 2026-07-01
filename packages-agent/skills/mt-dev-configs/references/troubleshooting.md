# 排错指南

## 依赖装错位置

monorepo 中最常见问题是依赖装在 root，但命令在子 package 中运行，或反过来。先确认：

- 配置文件在哪个目录。
- 命令从哪个目录执行。
- `node_modules` 或 workspace 解析是否能找到配置包。

## ESM/CJS 配置不匹配

这些配置包多使用 ESM 导出。CommonJS 项目中优先使用 `.mjs` 配置文件，例如 `prettier.config.mjs`、`stylelint.config.mjs`。

## ESLint 与 Prettier 冲突

先区分职责：

- ESLint：代码质量和部分风格规则。
- Prettier：纯格式化。

同一条格式规则重复报错时，减少重复管理，而不是同时加 override。

## ESLint 导出名或变量名写错

`@mt-kit/eslint-config` 根入口真实导出只有默认导出、`VUE`、`REACT`。常见错误：

- 写成 `import { vue } from "@mt-kit/eslint-config"`。
- 写成 `import { react } from "@mt-kit/eslint-config"`。
- 用 README 表格里的 `typescript` 当根命名导出。

正确写法：

```js
import EsLint from "@mt-kit/eslint-config";
import {
  VUE,
  REACT
} from "@mt-kit/eslint-config";
```

基础项目使用 `EsLint`；Vue 项目使用 `VUE`；React 项目使用 `REACT`。

## ESLint 版本描述冲突

当前 `package.json` peer dependency 是 `eslint >=10`。排查 peer dependency 时以当前包元信息和 lockfile 为准。

外部项目如果出现 peer dependency 警告，先查看目标项目实际安装版本：

```bash
npm ls eslint @mt-kit/eslint-config
```

pnpm/yarn/bun 项目使用对应包管理器的 list/why 命令。不要把本仓库 `packages-dev/eslint-config/package.json` 的状态直接等同于外部项目已安装版本。

## ESLint 外部项目路径问题

外部项目的 `eslint.config.*` 不应引用 `packages-dev/eslint-config/src/index.js` 这类仓库源码路径。应从 npm 包名导入：

```js
import EsLint from "@mt-kit/eslint-config";
```

如果用户正在本地联调未发布版本，先说明这是 linked/workspace 场景，再按该项目的 link 方式排查。

## ESLint TypeScript 项目错误

本配置默认不启用 `parserOptions.project`。如果用户自行添加后遇到 tsconfig inclusion 错误，要么移除 `project`，要么新增专用 `tsconfig.eslint.json`，把 config 文件和源码文件都纳入 include。

## ESLint Import 解析

`import-x/no-unresolved` 是有意关闭的。对于使用 TS paths、Vite aliases、monorepo 或 package export maps 的项目，不要在 resolver 设置不完整时贸然打开它。

遇到 import 排序失败时，先运行 `eslint --fix`，再考虑手动调整。当前配置会按 builtins、external dependencies、framework/UI packages、internal aliases、parent/sibling/index imports、object imports 和 type imports 分组。

## ESLint React 插件

本包使用 `@eslint-react/eslint-plugin`、`eslint-plugin-react-hooks`、`eslint-plugin-react-refresh` 和 `eslint-plugin-react-compiler`。

不要假设这些经典规则可用：

- `react/*`
- `jsx-a11y/*`

React 组件规则覆盖优先使用 `@eslint-react/*` 规则名。Hooks 覆盖使用 `react-hooks/*`，Fast Refresh 覆盖使用 `react-refresh/*`。

## ESLint Prettier

`config/prettier.js` 只关闭 `"prettier/prettier"`，不注册 `eslint-plugin-prettier`。如果项目报 `Definition for rule 'prettier/prettier' was not found`，检查是否有本地配置启用了该规则，但没有安装或注册对应插件。

## ESLint Vue Parser

Vue SFC 解析依赖 `vue-eslint-parser`，并为 `js`、`ts`、`tsx` script block 配置 `@typescript-eslint/parser`。如果解析失败，检查包安装、文件扩展名，以及是否有本地配置在 `VUE` 后覆盖了 `languageOptions.parser`。

## ESLint JSON 和 package.json 排序

JSONC 配置会排序 `package.json` 顶层字段和部分数组字段。对于生成文件或第三方 package 文件，优先添加本地 ignore block，而不是削弱全局 package 规则。

## 旧版 ESLint Comments 插件

comments 配置为了兼容新版 ESLint context，对 `eslint-plugin-eslint-comments` 做了包装。如果错误提到 `context.getSourceCode`，确认这个 wrapper 仍然生效，并且没有本地配置重新注册原始插件。

## Stylelint 与 Vue/React 场景不匹配

- Vue SFC 用 `@mt-kit/stylelint-config/vue`。
- React 项目用 `@mt-kit/stylelint-config/react`。
- 普通 CSS/SCSS 场景用默认导出。

## TSConfig 继承后构建异常

检查：

- 是否使用了正确环境配置：base/app/node/vue/react。
- 是否需要覆盖 `include`、`exclude`、`noEmit`、`emitDeclarationOnly`。
- 构建工具是否已经负责产物输出，避免 TypeScript 和构建工具重复输出。
