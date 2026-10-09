# @mt-kit/cli-storybook-vue

[![npm version](https://img.shields.io/npm/v/@mt-kit/cli-storybook-vue.svg?style=for-the-badge&labelColor=2c3e50&color=3498db&logo=npm&logoColor=white)](https://www.npmjs.com/package/@mt-kit/cli-storybook-vue)
[![GitHub stars](https://img.shields.io/github/stars/micro-scaff/micro-tools?style=for-the-badge&labelColor=2c3e50&color=e74c3c&logo=github&logoColor=white)](https://github.com/micro-scaff/micro-tools/tree/main/packages-cli/cli-storybook-vue)
[![GitHub issues](https://img.shields.io/github/issues/micro-scaff/micro-tools?style=for-the-badge&labelColor=2c3e50&color=27ae60&logo=github&logoColor=white)](https://github.com/micro-scaff/micro-tools/issues)
[![License](https://img.shields.io/github/license/micro-scaff/micro-tools?style=for-the-badge&labelColor=2c3e50&color=9b59b6&logo=opensourceinitiative&logoColor=white)](https://github.com/micro-scaff/micro-tools/blob/main/LICENSE)
[![Documentation](https://img.shields.io/badge/docs-online-blue?style=for-the-badge&labelColor=2c3e50&color=3498db&logoColor=white)](https://micro-scaff.github.io/)

🚀 一个用于快速启动 Vue Storybook 项目的 CLI 工具，支持多项目同时运行，零配置开箱即用。

## ✨ 特性

- ⚡ **一键启动**: 无需复杂配置，直接运行
- 🏗️ **多项目支持**: 同时运行多个项目，自动避免冲突
- 📦 **零配置**: 开箱即用，自动检测 stories 文件
- 🎯 **智能路径**: 自动设置正确的 stories 路径

## 📦 安装

```bash
# 在项目根目录安装
pnpm add @mt-kit/cli-storybook-vue

# 或使用 npm
npm install @mt-kit/cli-storybook-vue

# 或使用 yarn
yarn add @mt-kit/cli-storybook-vue
```

## 🚀 快速开始

### 1. 安装并配置

```bash
# 安装依赖
pnpm add @mt-kit/cli-storybook-vue

# 在 package.json 中添加脚本
```

```json
{
  "scripts": {
    "start": "mt-storybook-vue"
  }
}
```

### 2. 创建 Stories

确保项目有 `stories/` 目录和 story 文件：

```text
your-project/
├── stories/
│   ├── demo/
│   │   └── index.stories.ts
│       └── index.vue
```

index.stories.ts

```ts
import Index from "./index.vue";
import type {
  Meta,
  StoryObj
} from "@mt-kit/cli-storybook-vue";

const meta = {
  component: Index,
  title: "Demo"
} satisfies Meta<typeof Index>;

export default meta;

type TStory = StoryObj<typeof meta>;

export const Demo: TStory = {};
```

index.vue

```vue
<script lang="ts" setup>
import {
  ref
} from "vue";
</script>

<template>
  <div>
    Demo
  </div>
</template>
```

### 3. 运行 Storybook

```bash
pnpm run storybook
```

### 4. 多项目支持

支持同时运行多个 Storybook 项目，每个项目独立运行：

```bash
# 终端 1: 项目 A
cd project-a && pnpm run storybook

# 终端 2: 项目 B  
cd project-b && pnpm run storybook

# 终端 3: 项目 C
cd project-c && pnpm run storybook
```

每个项目会：

- 自动分配不同端口
- 独立的环境变量
- 无冲突运行

## 📝 注意事项

- 确保项目有 `stories/` 目录和 story 文件
- 确保项目有 `package.json` 文件
