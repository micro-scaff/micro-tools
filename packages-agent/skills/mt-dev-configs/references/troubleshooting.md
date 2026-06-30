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

README 标题提到 ESLint 9.x，但当前 `package.json` peer dependency 是 `eslint >=10`。排查 peer dependency 时以当前包元信息和 lockfile 为准。

## Stylelint 与 Vue/React 场景不匹配

- Vue SFC 用 `@mt-kit/stylelint-config/vue`。
- React 项目用 `@mt-kit/stylelint-config/react`。
- 普通 CSS/SCSS 场景用默认导出。

## TSConfig 继承后构建异常

检查：

- 是否使用了正确环境配置：base/app/node/vue/react。
- 是否需要覆盖 `include`、`exclude`、`noEmit`、`emitDeclarationOnly`。
- 构建工具是否已经负责产物输出，避免 TypeScript 和构建工具重复输出。
