---
name: mt-dev-configs
description: 当需要为内部或外部项目接入、迁移、定制或排查 MT 开发配置包时使用。覆盖 @mt-kit/eslint-config、@mt-kit/prettier-config、@mt-kit/stylelint-config、@mt-kit/ts-config，以及 ESLint、Prettier、Stylelint、TypeScript 配置协作和 monorepo 接入问题。
---

# MT Dev Configs

## 快速开始

使用本 skill 处理 MT 开发配置包。遇到 ESLint 深度规则解释时，可继续使用已有 `$mt-eslint-config`；本 skill 也记录 `@mt-kit/eslint-config` 的正确安装、导出名和 README 接入方式，方便做开发配置包总览、组合接入和跨工具排错。

先判断任务属于哪类：

- ESLint：使用 `@mt-kit/eslint-config`；默认导入变量按 README 写作 `EsLint`，框架配置使用命名导出 `VUE`、`REACT`。
- Prettier：使用 `@mt-kit/prettier-config`。
- Stylelint：使用 `@mt-kit/stylelint-config`、`@mt-kit/stylelint-config/vue` 或 `@mt-kit/stylelint-config/react`。
- TypeScript：使用 `@mt-kit/ts-config/base.json`、`app.json`、`node.json`、`vue.json` 或 `react.json`。
- 多工具协作：先明确哪个工具负责格式化、哪个工具负责质量检查，避免重复修同一类问题。

## 工作流程

1. 检查目标项目的 `package.json`、配置文件、框架类型和包管理器。
2. 确认依赖安装在实际运行 lint、format 或 typecheck 的 workspace/package 中。
3. 按工具选择最小配置，不把所有配置包一次性塞进项目。
4. 保留项目已有 overrides，新增配置放在可回退的位置。
5. 执行项目已有命令验证，例如 `lint`、`format`、`typecheck`。
6. 如果失败，先判断是依赖版本、模块类型、配置路径、规则冲突，还是源码真实问题。

## 参考资料

只读取当前任务需要的 reference：

- `references/package-map.md`：4 个配置包的包名、入口、导出和用途。
- `references/eslint-config.md`：ESLint 配置包的安装、导出名、接入模板和注意事项。
- `references/prettier-config.md`：Prettier 配置接入和与 ESLint 的边界。
- `references/stylelint-config.md`：Stylelint 默认、Vue、React 配置接入。
- `references/ts-config.md`：TypeScript 配置继承模板。
- `references/troubleshooting.md`：跨工具常见问题排查。
