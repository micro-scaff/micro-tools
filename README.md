# micro-tools（mt）

[![GitHub stars](https://img.shields.io/github/stars/micro-scaff/micro-tools?style=flat-square)](https://github.com/micro-scaff/micro-tools)
[![License](https://img.shields.io/github/license/micro-scaff/micro-tools?style=flat-square)](./LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-%3E%3D22-339933?style=flat-square&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![pnpm](https://img.shields.io/badge/pnpm-%3E%3D10-F69220?style=flat-square&logo=pnpm&logoColor=white)](https://pnpm.io/)

micro-tools 是一个前端工具集，采用 pnpm workspace 管理多个独立 npm 包。仓库包含通用工具函数、Vue/React Hooks、UI 组件、请求封装、Vite 插件和工程配置等内容。

你不需要安装整个仓库。请根据需要安装具体的 `@mt-kit/*` 包。下表中带链接的包可以直接打开详细文档，查看 API 和示例。

## 快速使用

以工具函数包 `@mt-kit/utils` 为例：

```bash
pnpm add @mt-kit/utils
```

```ts
import { animationFrameThrottle } from "@mt-kit/utils";

window.addEventListener(
  "scroll",
  animationFrameThrottle(() => {
    console.log("页面正在滚动");
  })
);
```

使用 npm 或 Yarn 时，把安装命令换成下面任意一种即可：

```bash
npm install @mt-kit/utils
yarn add @mt-kit/utils
```

其他包的安装方式相同，例如：

```bash
pnpm add @mt-kit/vue-hooks
pnpm add @mt-kit/react-hooks
pnpm add @mt-kit/request-axios
```

## 包目录

### 通用能力

| 包 | 用途 |
| --- | --- |
| [`@mt-kit/utils`](./packages-utils/README.md) | 常用工具函数 |
| [`@mt-kit/components`](./packages-components/README.md) | 与框架无关的 UI 和 DOM 工具 |
| [`@mt-kit/style`](./packages-style/README.md) | 通用样式和样式工具 |
| [`@mt-kit/request-axios`](./packages-fetch/request-axios/README.md) | 基于 Axios 的请求封装 |
| [`@mt-kit/conf`](./packages-conf/README.md) | 配置文件处理 |
| [`@mt-kit/env`](./packages-envs/README.md) | Storybook 通用配置 |
| [`@mt-kit/enum`](./packages-enum/README.md) | 通用枚举 |
| [`@mt-kit/types`](./packages-types/README.md) | 通用 TypeScript 类型 |
| [`@mt-kit/vite-plugins`](./packages-vite-plugins/README.md) | Vite 插件集合 |
| [`@mt-kit/lit`](./packages-lit/README.md) | Lit 组件 |
| [`@mt-kit/global-style`](./packages-theme/global-style/README.md) | 全局主题样式 |

### Vue

| 包 | 用途 |
| --- | --- |
| [`@mt-kit/vue-components`](./packages-vue/vue-components/README.md) | Vue 3 组件 |
| [`@mt-kit/vue-hooks`](./packages-vue/vue-hooks/README.md) | Vue 3 组合式函数 |
| [`@mt-kit/vue-directives`](./packages-vue/vue-directives/README.md) | Vue 3 指令 |
| [`@mt-kit/vue-config`](./packages-vue/vue-config/README.md) | Vue 项目配置工具 |
| [`@mt-kit/vue-echarts`](./packages-vue/vue-echarts/README.md) | ECharts 的 Vue 3 封装 |
| [`@mt-kit/vue-element-plus-extra`](./packages-vue/vue-element-plus-extra/README.md) | Element Plus 扩展组件 |

### React

| 包 | 用途 |
| --- | --- |
| [`@mt-kit/react-hooks`](./packages-react/react-hooks/README.md) | React Hooks |
| [`@mt-kit/react-ant-design-extra`](./packages-react/react-ant-design-extra/README.md) | Ant Design 扩展组件 |
| [`@mt-kit/react-rc`](./packages-react/react-rc/README.md) | React 基础组件 |

### 工程工具

| 包 | 用途 |
| --- | --- |
| [`@mt-kit/cli-run`](./packages-cli/cli-run/README.md) | 在 monorepo 中交互式选择并运行脚本 |
| [`@mt-kit/cli-storybook-vue`](./packages-cli/cli-storybook-vue/README.md) | Vue Storybook 配置 |
| [`@mt-kit/cli-storybook-react`](./packages-cli/cli-storybook-react/README.md) | React Storybook 配置 |
| [`@mt-kit/eslint-config`](./packages-dev/eslint-config/README.md) | ESLint 共享配置 |
| [`@mt-kit/prettier-config`](./packages-dev/prettier-config/README.md) | Prettier 共享配置 |
| [`@mt-kit/stylelint-config`](./packages-dev/stylelint-config/README.md) | Stylelint 共享配置 |
| [`@mt-kit/ts-config`](./packages-dev/ts-config/README.md) | TypeScript 共享配置 |

## 本地开发

这一部分面向准备修改或调试本仓库的开发者。

### 1. 准备环境

- Node.js 22 或更高版本；仓库当前使用的版本见 [`.node-version`](./.node-version)
- pnpm 10 或更高版本；仓库锁定的版本见 [`package.json`](./package.json)

如果没有安装 pnpm，可以通过 Corepack 启用：

```bash
corepack enable
corepack prepare pnpm@10.10.0 --activate
```

### 2. 获取代码并安装依赖

```bash
git clone https://github.com/micro-scaff/micro-tools.git
cd micro-tools
pnpm install
```

### 3. 启动开发任务

运行下面的命令后，按提示选择要启动的子包：

```bash
pnpm start
```

也可以直接启动指定子包：

```bash
# 启动工具函数包的监听构建
pnpm --filter @mt-kit/utils dev

# 启动 Vue 示例项目
pnpm --filter demo-vue dev

# 启动 Vue Hooks 的 Storybook
pnpm --filter @mt-kit/vue-hooks storybook
```

### 4. 构建和检查

```bash
# 构建所有包
pnpm build

# 串行构建所有包，便于定位构建失败的子包
pnpm run build:check

# 检查 Markdown、拼写、包配置、依赖、样式和代码
pnpm run lint:md
pnpm run lint:cspell
pnpm run lint:PkgJson
pnpm run lint:depcheck
pnpm run lint:css
pnpm run lint:eslint
```

`pnpm run boot` 会先清理依赖、pnpm 本地存储和构建产物，再重新安装和构建。普通安装请使用 `pnpm install`；只有需要完全重建环境时才使用 `pnpm run boot`。

## 仓库结构

```text
packages-agent/         Agent 和 Skills 相关内容
packages-cli/           CLI 与 Storybook 工具
packages-components/    与框架无关的 UI 组件
packages-conf/          配置文件处理
packages-demo/          示例项目
packages-dev/           ESLint、Prettier、Stylelint、TypeScript 配置
packages-enum/          通用枚举
packages-envs/          Storybook 通用配置
packages-fetch/         网络请求和 Mock 服务
packages-lit/           Lit 组件
packages-react/         React Hooks 与组件
packages-style/         通用样式
packages-theme/         主题与全局样式
packages-types/         通用 TypeScript 类型
packages-utils/         常用工具函数
packages-vite-plugins/  Vite 插件
packages-vue/           Vue 3 Hooks、指令与组件
doc/                    开发笔记和项目说明
```

## 更多文档

- [Storybook 组件开发](./doc/Storybook.md)
- [代码检查和格式化](./doc/lint.md)
- [pnpm workspace 使用说明](./doc/monorepo-pnpm.md)
- [Git 使用说明](./doc/git.md)

## 参与贡献

1. Fork 本仓库并创建分支，例如 `git switch -c feat/new-feature`。
2. 完成修改后，运行与改动相关的构建和检查命令。
3. 如果改动影响了公开包，请补充对应包的 README 和 Changeset。
4. 提交 Pull Request，并说明改动内容和验证方式。

问题和建议请提交到 [GitHub Issues](https://github.com/micro-scaff/micro-tools/issues)。

## 许可证

[MIT](./LICENSE)
