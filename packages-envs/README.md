# @mt-kit/env

Storybook 的通用配置，当前导出 `config` 和 `preview`。

## 安装

```bash
pnpm add -D @mt-kit/env
```

## 使用

```ts
// .storybook/main.ts
export { config as default } from "@mt-kit/env";
```

```ts
// .storybook/preview.ts
export { preview as default } from "@mt-kit/env";
```
