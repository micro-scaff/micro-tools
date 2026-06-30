# 排错指南

## Invalid hook call

常见原因：

- hook 在组件外调用。
- 项目存在多份 React。
- 包链接或 workspace 导致 React 解析到不同实例。

先检查 `react` 和 `react-dom` 版本与解析路径。

## Router 相关 hook 报错

`react-hooks` 中部分 hook 依赖 `react-router-dom >=7`。确保组件位于 router provider 下。

## Ant Design extra 报错

检查：

- `antd >=5` 是否安装。
- `react` / `react-dom` 是否至少 18。
- 项目是否需要 `@ant-design/v5-patch-for-react-19`。
- 弹窗挂载点和上下文是否正确。

## 类型或构建报错

检查：

- 是否从包名导入，而不是源码路径。
- `dist/index.d.ts` 是否存在。
- TSConfig 是否与 React 项目匹配。
- unbuild 产物是否已生成。
