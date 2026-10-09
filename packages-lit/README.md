# @mt-kit/lit

基于 Lit 的基础组件集合，当前提供 `Button` 和 `Table`。

## 安装

```bash
pnpm add @mt-kit/lit lit
```

## 使用

```ts
import { render } from "lit";
import { Button } from "@mt-kit/lit";

render(
  Button({
    label: "确定",
    primary: true
  }),
  document.querySelector("#app")!
);
```
