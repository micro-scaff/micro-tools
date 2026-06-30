# Stylelint Config

## 安装

```bash
pnpm add -D stylelint @mt-kit/stylelint-config
```

## 默认配置

`stylelint.config.mjs`：

```js
export { default } from "@mt-kit/stylelint-config";
```

## Vue 项目

```js
export { default } from "@mt-kit/stylelint-config/vue";
```

Vue 配置使用 `postcss-html` 处理 `.html` 和 `.vue`，并允许 `:deep`、`:global`、`v-deep`、`v-global`、`v-slotted` 等 Vue 语法。

## React 项目

```js
export { default } from "@mt-kit/stylelint-config/react";
```

React 配置继承默认配置和 `stylelint-config-recommended`。

## 关键行为

- 使用 `stylelint-config-standard`。
- 使用 `stylelint-config-recess-order` 和 `stylelint-order` 控制属性顺序。
- 使用 `@stylistic/stylelint-plugin` 和 `stylelint-prettier`。
- 默认忽略 JS、TS、JSON、Markdown。

## 排查方向

- Vue SFC 报未知选择器时，先确认是否使用 `/vue` 导出。
- 样式排序报错时，优先运行 stylelint fix，而不是手工大面积重排。
- 如果与 Prettier 冲突，确认 Stylelint 和 Prettier 是否重复处理同一文件。
