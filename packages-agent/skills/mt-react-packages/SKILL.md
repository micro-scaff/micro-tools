---
name: mt-react-packages
description: 当需要在内部或外部 React 项目中接入、使用、迁移或排查 MT React 包时使用。覆盖 @mt-kit/react-ant-design-extra、@mt-kit/react-hooks、@mt-kit/react-rc，以及 React、React DOM、React Router、Ant Design、Storybook、unbuild 和 peer dependency 问题。
---

# MT React Packages

## 快速开始

使用本 skill 处理 `packages-react` 下的 React 包。先判断需求是 Ant Design 交互封装、通用 hooks，还是基础 RC 组件。

包选择：

- Ant Design dialog/form 增强：`@mt-kit/react-ant-design-extra`
- React hooks：`@mt-kit/react-hooks`
- 基础 React RC 组件：`@mt-kit/react-rc`

## 工作流程

1. 外部项目先读取 `references/external-usage.md`，确认包管理器、运行目录和依赖安装位置。
2. 检查目标项目 React 版本、路由版本、Ant Design 版本和构建方式。
3. 按需安装单个包和 peer dependency。
4. 对照 package map 确认导出 API。
5. 外部项目只从 npm 包名导入，不引用本仓库源码路径。
6. 若涉及 UI 行为，优先查 README、stories 和 `src/index.ts`。
7. 排错时先看 peer dependency、React 版本、router 上下文、样式依赖和类型导出。

## 参考资料

- `references/package-map.md`：包名、导出和依赖关系。
- `references/integration-recipes.md`：外部项目安装和使用模板。
- `references/component-patterns.md`：hooks、dialog、RC 组件使用模式。
- `references/troubleshooting.md`：常见接入和构建问题。
- `references/external-usage.md`：外部项目使用本 skill 时的通用约定。
