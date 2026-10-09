# @mt-kit/react-rc

React 基础组件集合，当前提供用于展示键值对的 `KeyValue` 组件。

## 安装

```bash
pnpm add @mt-kit/react-rc
```

## 使用

```tsx
import { KeyValue } from "@mt-kit/react-rc";

export default function UserInfo() {
  return (
    <KeyValue
      ignoreEmpty
      o={{
        姓名: "张三",
        角色: "管理员"
      }}
    />
  );
}
```

设置 `horizontal` 可横向排列，设置 `wrapValue` 可让较长的值自动换行。
