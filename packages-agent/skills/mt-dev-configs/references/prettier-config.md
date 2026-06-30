# Prettier Config

## 安装

```bash
pnpm add -D prettier @mt-kit/prettier-config
```

非 pnpm 项目使用自己的包管理器。

## 配置

`prettier.config.mjs`：

```js
export { default } from "@mt-kit/prettier-config";
```

如果需要显式引用默认配置：

```js
export { default } from "@mt-kit/prettier-config/default";
```

## 关键规则

- `printWidth: 200`
- `semi: true`
- `singleQuote: false`
- `tabWidth: 2`
- `trailingComma: "none"`
- `singleAttributePerLine: true`
- `vueIndentScriptAndStyle: false`
- JSX/TSX 覆盖 `bracketSameLine: true`

## 与 ESLint 的边界

不要同时启用 `eslint-plugin-prettier` 和 Prettier 命令去争夺同一批文件。推荐：

- ESLint 管代码质量和部分风格约束。
- Prettier 处理 markdown、json、html/vue/jsx/tsx 等格式化。
- 出现冲突时优先看 ESLint/Prettier 是否重复管理同一条规则。
