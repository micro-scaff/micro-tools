# 使用模式

## 组件类

`@mt-kit/vue-components` 适合直接导入组件：

```ts
import {
  CountTo,
  Scrollbar
} from "@mt-kit/vue-components";
```

优先检查组件是否需要样式导入、容器尺寸或浏览器 API。

## Hook 类

`@mt-kit/vue-hooks` 适合在 `setup` 或组合式函数中调用。使用时注意：

- 不在普通模块顶层调用依赖 Vue 生命周期的 hook。
- 涉及 DOM 的 hook 需要在客户端或 mounted 后使用。
- 涉及路由 query 的 hook 要确认目标项目使用的路由方案。

## Directive 类

`@mt-kit/vue-directives` 导出的 directive 可全局注册：

```ts
app.directive("draggable", directiveDraggable);
```

也可在组件内局部注册。排查时重点看 binding value、事件解绑和 DOM 生命周期。

## Element Plus 增强

`vue-element-plus-extra` 适合封装 dialog、form 和 message 交互。排查时重点看：

- `element-plus` 是否安装。
- 组件是否处在 Vue app 上下文中。
- 弹窗关闭、表单状态和异步提交是否正确处理。

## ECharts

`useECharts` 适合封装图表初始化和更新。排查时重点看：

- 容器是否有宽高。
- option 是否稳定。
- resize 和 dispose 是否在正确生命周期中执行。
