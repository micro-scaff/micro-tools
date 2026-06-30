# 配置映射

解释、扩展或排查 `@mt-kit/eslint-config` 时使用本文件。

## 导出结构

包入口是 `src/index.js`。

- 默认导出：`DEFAULT`，由 JavaScript、TypeScript、JSON、import、stylistic、JSDoc、RegExp、comments、command、unicorn、ignores 和 prettier 兼容配置块组成。
- 命名导出 `VUE`：`DEFAULT` 加 Vue SFC 规则。
- 命名导出 `REACT`：`DEFAULT` 加 JSX stylistic 规则和 React 规则。

## 源码模块

- `config/javascript.js`：基础 language options、browser/ES2021/Node globals、JSX parser option、`@eslint/js` 推荐规则、`eslint-plugin-unused-imports`，以及部分 unicorn 行为。
- `config/typescript.js`：作用于 TS、TSX、MTS、CTS 和 Vue 文件。使用 `@typescript-eslint/parser`，注册 `@typescript-eslint`，启用 strict 与 recommended 规则，并约束项目命名习惯，例如 interface 使用 `I` 前缀、enum 使用 `E` 前缀。
- `config/vue.js`：使用 `vue-eslint-parser`，并为 script block 配置 `@typescript-eslint/parser`。继承 `eslint-plugin-vue` flat recommended 配置，再补充 Vue SFC 顺序、宏顺序、template casing、属性排序、HTML 缩进等 Vue 规则。
- `config/react.js`：使用 `@eslint-react/eslint-plugin` 和 `eslint-plugin-react-compiler`。不使用经典 `eslint-plugin-react` 或 `eslint-plugin-react-hooks`。Hooks 检查来自 `@eslint-react/rules-of-hooks` 和 `@eslint-react/exhaustive-deps`。
- `config/jsx.js`：使用 `@stylistic/eslint-plugin` 承接 JSX 排版规则，这些规则在旧 lint 体系里常见于 React 相关插件。
- `config/import-x.js`：使用 `eslint-plugin-import-x`、它的 flat recommended 配置，以及 `createNodeResolver`。默认关闭 `import-x/no-unresolved`，避免别名、TS paths 和 package export maps 带来的误报。
- `config/jsonc.js`：使用 `eslint-plugin-jsonc` 和 `jsonc-eslint-parser`，覆盖 JSON、JSONC、JSON5、workspace 文件和 package.json 字段排序。
- `config/stylistic.js`：注册 `@stylistic`，约束空格、分号、对象/数组换行、brace style、TypeScript member delimiter style。
- `config/comments.js`：用兼容代理包装 `eslint-plugin-eslint-comments`，补齐新版 ESLint context 下旧式 `context.getSourceCode()` 访问。
- `config/command.js`：导入 `eslint-plugin-command/config` 并导出 `command()`。
- `config/jsdoc.js`：注册 `eslint-plugin-jsdoc`，启用 warning 级别的文档一致性规则。
- `config/regexp.js`：注册 `eslint-plugin-regexp` 并应用 recommended 规则。
- `config/unicorn.js`：应用 unicorn recommended 规则，再关闭与当前项目约定冲突的强主张规则。
- `config/ignores.js`：集中维护 build outputs、包管理器 lock 文件、生成的类型文件、snapshots、fixtures、caches、fonts、shell scripts 和部分生成源码路径的忽略列表。
- `config/prettier.js`：只关闭 `prettier/prettier`，不注册 `eslint-plugin-prettier`。

## 依赖事实来源

当 README 的插件表与源码不一致时，优先相信 `package.json` 和源码 import。当前源码使用 `@eslint-react/eslint-plugin`，不是经典 `eslint-plugin-react`；使用 import-x，不是 import；没有安装 jsx-a11y 或 react-hooks 插件。

当前源码对应的 peer dependency 要求 `eslint >=10`。如果目标项目使用 ESLint 9，先检查实际安装的 `@mt-kit/eslint-config` 版本、lockfile 和 package manager resolution，再判断兼容性；不要只按旧 README 片段下结论。
