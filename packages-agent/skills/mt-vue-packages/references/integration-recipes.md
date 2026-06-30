# 接入配方

## 安装

按需安装单个包：

```bash
pnpm add @mt-kit/vue-hooks
pnpm add @mt-kit/vue-element-plus-extra element-plus
pnpm add @mt-kit/vue-echarts echarts
```

非 pnpm 项目使用自己的包管理器。

## 使用 hooks

```ts
import {
  useService,
  useWatermark
} from "@mt-kit/vue-hooks";
```

## 使用 Element Plus 增强

```ts
import {
  open,
  DialogSize,
  messages
} from "@mt-kit/vue-element-plus-extra";
```

确保目标项目已经安装并配置 `element-plus`。

## 使用 ECharts

```ts
import {
  useECharts,
  type EChartsOption
} from "@mt-kit/vue-echarts";
```

确保目标项目安装 `echarts`，并在组件卸载时关注实例销毁。

## 使用指令

```ts
import {
  directiveDraggable,
  directiveConversionTime
} from "@mt-kit/vue-directives";
```

可在 app 初始化时注册为全局 directive，也可在组件局部注册。

## 外部项目检查清单

- 不引用 `packages-vue/*/src` 源码路径。
- 按需安装包和 peer dependency。
- Vue 版本与包的 Vue 3 预期一致。
- 如果样式或组件依赖缺失，先查 README 和 stories。
- 构建失败时检查类型导出和 `vue-tsc` 报错。
