# 包映射

| 包 | 路径 | 主要导出 | 适用场景 |
| --- | --- | --- | --- |
| `@mt-kit/vue-components` | `packages-vue/vue-components` | `CountTo`、`Scrollbar` | 基础 Vue 组件 |
| `@mt-kit/vue-config` | `packages-vue/vue-config` | `configErrorHandler` | Vue app 全局错误处理 |
| `@mt-kit/vue-directives` | `packages-vue/vue-directives` | `directiveConversionTime`、`directiveDraggable` | 自定义指令 |
| `@mt-kit/vue-echarts` | `packages-vue/vue-echarts` | `useECharts`、`EChartsOption` | ECharts 实例封装 |
| `@mt-kit/vue-element-plus-extra` | `packages-vue/vue-element-plus-extra` | `DialogMode`、`DialogSize`、`open`、`openIndirect`、`useForm`、`WithModel`、`messages`、`Messages` | Element Plus dialog/message 增强 |
| `@mt-kit/vue-hooks` | `packages-vue/vue-hooks` | `useService`、`useScript`、`useLocationQuery`、`useWatermark`、`useState`、`useMount`、`useContextMenu`、`useEventListener`、`AsyncResult`、`ServiceConfig`、`ServiceFunction` | 通用 Vue composition hooks |

## 构建约定

这些包大多使用：

- Vite 构建。
- Storybook Vue3/Vite 做示例和调试。
- `vite-plugin-dts` 输出类型。
- `dist/index.es.js`、`dist/index.umd.js` 和 `dist/index.d.ts`。

## 依赖关系

- `vue-element-plus-extra` 需要外部项目提供 `element-plus >=2.11.4`。
- `vue-echarts` 的源码导入 `echarts`，但 `package.json` 只声明了 `@mt-kit/vue-hooks` 和 `@mt-kit/utils`；外部项目需要能解析 `echarts`，建议显式安装。
- `vue-hooks` 依赖 `@mt-kit/utils`、`lodash-es`、`resize-observer-polyfill`。
- `vue-config` 和 `vue-directives` 的 `package.json` 依赖 `@mt-kit/components`，外部项目需要能解析这个包。
