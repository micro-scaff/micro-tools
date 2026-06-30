# 排错指南

## 找不到包或导出

先确认外部项目安装的是发布包名，例如 `@mt-kit/vue-hooks`，不是 workspace 源码路径。再对照 `references/package-map.md` 检查导出名称。

## Element Plus 报错

`@mt-kit/vue-element-plus-extra` 声明 `element-plus >=2.11.4` 为 peer dependency。外部项目需要自己安装并配置 Element Plus。

## ECharts 不显示

常见原因：

- 容器没有宽高。
- `echarts` 未安装或版本不匹配。
- option 数据异步更新后没有触发重新渲染。
- 组件卸载时未正确释放实例。

## Hook 生命周期错误

如果 hook 依赖 DOM、window、router 或生命周期，不要在普通模块顶层调用。放到 `setup`、组件生命周期或自定义 composable 中。

## 构建或类型报错

检查：

- 是否安装 Vue 3。
- 是否安装对应 peer/dependency。
- 是否使用了正确的 TSConfig。
- 是否引用了 `dist` 导出而不是源码路径。
