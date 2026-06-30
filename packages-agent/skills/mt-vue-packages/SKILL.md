---
name: mt-vue-packages
description: 当需要在内部或外部 Vue 3 项目中接入、使用、迁移或排查 MT Vue 包时使用。覆盖 @mt-kit/vue-components、@mt-kit/vue-config、@mt-kit/vue-directives、@mt-kit/vue-echarts、@mt-kit/vue-element-plus-extra、@mt-kit/vue-hooks，以及 Storybook、Vite 构建和 Vue 包依赖关系。
---

# MT Vue Packages

## 快速开始

使用本 skill 处理 `packages-vue` 下的 Vue 3 包。先确认目标项目需要的是组件、hooks、directives、ECharts、Element Plus 增强能力，还是 Vue app 配置。

包选择：

- 基础组件：`@mt-kit/vue-components`
- Vue app 配置：`@mt-kit/vue-config`
- 自定义指令：`@mt-kit/vue-directives`
- ECharts hook：`@mt-kit/vue-echarts`
- Element Plus dialog/messages 增强：`@mt-kit/vue-element-plus-extra`
- 通用 Vue hooks：`@mt-kit/vue-hooks`

## 工作流程

1. 外部项目先读取 `references/external-usage.md`，确认包管理器、运行目录和依赖安装位置。
2. 检查目标项目是否是 Vue 3，是否使用 Vite、Element Plus、ECharts 等相关依赖。
3. 根据需求选择最小包，不一次性安装所有 Vue 包。
4. 确认外部项目安装的是 registry 包，不引用本仓库 `packages-vue/*` 源码路径。
5. 按 reference 中的导出表选择正确 API。
6. 若涉及组件或交互行为，优先参考 README、stories 和 `src/index.ts`。
7. 排错时先看 peer/dependency、样式依赖、自动导入、构建产物和类型导出。

## 参考资料

- `references/package-map.md`：包名、导出和依赖关系。
- `references/integration-recipes.md`：外部项目安装和使用模板。
- `references/component-patterns.md`：组件、hooks、directives 的使用模式。
- `references/troubleshooting.md`：常见接入和构建问题。
- `references/external-usage.md`：外部项目使用本 skill 时的通用约定。
