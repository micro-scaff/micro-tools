# TS Config

## 安装

```bash
pnpm add -D typescript @mt-kit/ts-config
```

## 基础配置

`tsconfig.json`：

```json
{
  "extends": "@mt-kit/ts-config/base.json"
}
```

## 应用项目

```json
{
  "extends": "@mt-kit/ts-config/app.json"
}
```

## Node 项目

```json
{
  "extends": "@mt-kit/ts-config/node.json"
}
```

## Vue 项目

```json
{
  "extends": "@mt-kit/ts-config/vue.json"
}
```

Vue 配置保留 JSX，设置 `jsxImportSource: "vue"`，并启用 `experimentalDecorators`。

## React 项目

```json
{
  "extends": "@mt-kit/ts-config/react.json"
}
```

React 配置包含 DOM lib、`jsx: "react"`、`incremental: true` 和 Next plugin。

## 注意点

- `base.json` 默认严格，开启 declaration、composite、isolatedModules、noUnusedLocals、noUnusedParameters。
- 库包如果需要实际产物，检查 `emitDeclarationOnly`、`noEmit`、构建工具配置是否匹配。
- 外部项目不要直接继承本仓库源码路径。
