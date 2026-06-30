# ESLint Config

## 包定位

`@mt-kit/eslint-config` 是基于 ESLint flat config 的代码规范配置，面向 JavaScript、TypeScript、Vue、React、JSX、JSON/JSONC、import 排序和 stylistic 风格规则。

当前包入口是 `src/index.js`，`package.json` 的 peer dependency 是：

```json
{
  "eslint": ">=10"
}
```

README 中仍有 “ESLint 9.x” 和部分旧插件生态描述；接入和排错时以当前 `package.json` 与源码为准。

## 安装

```bash
npm install -D eslint @mt-kit/eslint-config
pnpm add -D eslint @mt-kit/eslint-config
yarn add -D eslint @mt-kit/eslint-config
```

## 根入口真实导出

`src/index.js` 对外提供：

- 默认导出：`DEFAULT` 配置数组；它不是命名导出，外部项目需要用默认导入接收。
- 命名导出：`VUE`
- 命名导出：`REACT`

README 中基础配置示例使用变量名 `EsLint`，生成接入代码时保持这个变量名，避免同一仓库文档风格不一致。

## 基础配置

`eslint.config.js`：

```js
import EsLint from "@mt-kit/eslint-config";

export default EsLint;
```

## TypeScript 项目

默认导出已经包含 TypeScript 配置块。需要添加忽略项时，把 overrides 追加在 `...EsLint` 后面：

```js
import EsLint from "@mt-kit/eslint-config";

export default [
  ...EsLint,
  {
    ignores: [
      ".vite",
      "node_modules",
      "dist",
      "build",
      "public",
      "forge.env.d.ts"
    ]
  }
];
```

## Vue 项目

```js
import {
  VUE
} from "@mt-kit/eslint-config";

export default [
  ...VUE
];
```

`VUE` 是 `DEFAULT + vue`，用于 `.vue` 文件和 Vue SFC 场景。

## React 项目

```js
import {
  REACT
} from "@mt-kit/eslint-config";

export default [
  ...REACT
];
```

`REACT` 是 `DEFAULT + jsx + react`，用于 React、React + TypeScript、JSX、TSX 场景。

## 自定义规则

```js
import EsLint from "@mt-kit/eslint-config";

export default [
  ...EsLint,
  {
    rules: {
      "no-console": "warn",
      "@typescript-eslint/no-unused-vars": "error"
    }
  }
];
```

## package scripts

```json
{
  "scripts": {
    "lint": "pnpm eslint .",
    "fix": "eslint \"./**/*.{css,tsx,vue,ts,js,html}\" --fix"
  }
}
```

非 pnpm 项目按项目包管理器调整 `lint` 命令。

## VS Code 建议

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
    "source.formatDocument": "explicit"
  },
  "editor.tabSize": 2,
  "editor.insertSpaces": true,
  "editor.detectIndentation": false
}
```

## 当前源码使用的关键插件

当前源码依赖包括：

- `@eslint/js`
- `@typescript-eslint/eslint-plugin`
- `@typescript-eslint/parser`
- `@stylistic/eslint-plugin`
- `@eslint-react/eslint-plugin`
- `eslint-plugin-react-compiler`
- `eslint-plugin-import-x`
- `eslint-plugin-jsonc`
- `eslint-plugin-vue`
- `eslint-plugin-unicorn`
- `eslint-plugin-unused-imports`
- `eslint-plugin-jsdoc`
- `eslint-plugin-regexp`
- `eslint-plugin-command`
- `eslint-plugin-eslint-comments`

不要按旧 README 插件表假设存在 `eslint-plugin-react`、`eslint-plugin-react-hooks`、`eslint-plugin-jsx-a11y` 或 `eslint-plugin-import`。

## 命名和变量规则

- 默认导入变量使用 `EsLint`。
- Vue 配置使用命名导出 `VUE`。
- React 配置使用命名导出 `REACT`。
- 本地 overrides 放在 preset 后面。
- 不从 `src/config/*` 直接导入内部模块，除非是在维护配置包源码。
