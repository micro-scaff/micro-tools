# 接入配方

## 安装

按需安装：

```bash
pnpm add @mt-kit/react-hooks react react-router-dom
pnpm add @mt-kit/react-ant-design-extra antd react react-dom react-router-dom
pnpm add @mt-kit/react-rc react
```

非 pnpm 项目使用自己的包管理器。

## 使用 React hooks

```ts
import {
  useAsync,
  useRequest,
  useLocationQuery
} from "@mt-kit/react-hooks";
```

如果 hook 依赖 router，确保组件位于 router provider 内。

## 使用 Ant Design 增强

```tsx
import {
  open,
  DialogSize,
  WithModel
} from "@mt-kit/react-ant-design-extra";
```

确保目标项目安装并正确配置 Ant Design。

## 使用 RC 组件

```tsx
import {
  KeyValue
} from "@mt-kit/react-rc";
```

## 外部项目检查清单

- 不引用 `packages-react/*/src` 源码路径。
- 安装对应 peer dependency。
- React 版本至少 18。
- 使用 `react-router-dom` 相关 hook 时确认 provider 存在。
- Ant Design extra 场景确认 `antd` 和 React 19 patch 是否符合项目需要。
