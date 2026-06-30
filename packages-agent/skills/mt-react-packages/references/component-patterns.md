# 使用模式

## Hooks

`@mt-kit/react-hooks` 适合在函数组件或自定义 hook 中调用：

- `useAsync`：管理异步任务状态。
- `useRequest`：封装请求调用。
- `useHistory`：处理路由历史。
- `useLocationQuery`：读取和管理 URL query。
- `useService`：服务调用封装。
- `useIsUnmounted`：避免组件卸载后继续更新状态。

不要在普通函数或模块顶层调用 React hook。

## Ant Design Extra

`@mt-kit/react-ant-design-extra` 适合封装 dialog/form 类交互：

- `open` / `openIndirect`：打开弹窗。
- `WithModel`：弹窗模型组件。
- `useForm`：表单辅助。
- `DialogMode` / `DialogSize`：弹窗模式和尺寸枚举。

排查时重点看 React tree 上下文、Ant Design 版本、表单状态和弹窗销毁时机。

## React RC

`@mt-kit/react-rc` 当前导出 `KeyValue`。用于展示键值结构时，优先确认数据结构和样式依赖。
