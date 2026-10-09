# @mt-kit/cli-run

[![npm version](https://img.shields.io/npm/v/@mt-kit/cli-run.svg?style=for-the-badge&labelColor=2c3e50&color=3498db&logo=npm&logoColor=white)](https://www.npmjs.com/package/@mt-kit/cli-run)
[![GitHub stars](https://img.shields.io/github/stars/micro-scaff/micro-tools?style=for-the-badge&labelColor=2c3e50&color=e74c3c&logo=github&logoColor=white)](https://github.com/micro-scaff/micro-tools/tree/main/packages-cli/cli-run)
[![GitHub issues](https://img.shields.io/github/issues/micro-scaff/micro-tools?style=for-the-badge&labelColor=2c3e50&color=27ae60&logo=github&logoColor=white)](https://github.com/micro-scaff/micro-tools/issues)
[![License](https://img.shields.io/github/license/micro-scaff/micro-tools?style=for-the-badge&labelColor=2c3e50&color=9b59b6&logo=opensourceinitiative&logoColor=white)](https://github.com/micro-scaff/micro-tools/blob/main/LICENSE)
[![Documentation](https://img.shields.io/badge/docs-online-blue?style=for-the-badge&labelColor=2c3e50&color=3498db&logoColor=white)](https://micro-scaff.github.io/)

一个用于在 monorepo 中智能运行脚本的 CLI 工具。

## 功能特性

- 🚀 **智能包发现**：自动发现 monorepo 中包含指定脚本的包，默认值为 `start,dev,storybook`
- 🎯 **精确范围控制**：支持指定目录范围，只在特定目录下查找包
- 📋 **交互式选择**：当有多个包时，提供友好的选择界面
- 🔧 **多命令支持**：支持单个命令或命令数组
- 📦 **包信息显示**：显示包名、描述和版本信息

## 安装

```bash
# 使用 npm
npm install -D @mt-kit/cli-run

# 使用 yarn
yarn add -D @mt-kit/cli-run

# 使用 pnpm
pnpm add -D @mt-kit/cli-run
```

## 使用方法

### 基本用法

```bash
# 运行单个命令
mt-cli-run start

# 运行多个命令（逗号分隔）（推荐）
mt-cli-run start,storybook

# 运行多个命令（JSON 数组格式）
mt-cli-run '["start", "storybook"]'

# 打包
mt-cli-run build
```

### 指定目录范围

```bash
# 只在 packages-vue 目录下查找包
mt-cli-run start --root ./packages-vue

# 只在 packages-react 目录下查找包
mt-cli-run storybook --root ./packages-react

# 使用绝对路径
mt-cli-run start --root /path/to/your/monorepo/packages-vue
```

### 在 package.json 中使用

```json
{
  "scripts": {
    "start": "mt-cli-run start",
    "start:vue": "mt-cli-run start --root ./packages-vue",
    "start:react": "mt-cli-run start --root ./packages-react",
    "dev": "mt-cli-run start,storybook",
    "dev:vue": "mt-cli-run start,storybook --root ./packages-vue"
  }
}
```

## 交互式选择

当有多个包包含相同的脚本时，工具会显示交互式选择界面：

```text
? 请选择需要执行的包 start, storybook: ›
❯ @mt-kit/vue-components (Vue 组件库) [start] v1.0.0
  @mt-kit/react-components (React 组件库) [start] v1.0.0
  @mt-kit/utils (工具函数库) [start] v1.0.0
```

选择界面会显示：

- 包名和描述
- 匹配的脚本类型
- 版本号

## 配置说明

### 支持的包管理器

- ✅ pnpm（推荐）
- ✅ npm
- ✅ yarn

### 包过滤规则

- 自动跳过 `private: true` 的包
- 自动排除 `node_modules` 目录
- 只查找包含指定脚本的包

## 故障排除

### 常见问题

1. **找不到包**
   + 检查 `--root` 路径是否正确
   + 确认包中包含指定的脚本

2. **权限问题**
   + 确保有执行脚本的权限
   + 检查包的 `package.json` 配置

3. **脚本不存在**
   + 确认包中确实包含指定的脚本
   + 检查脚本名称是否正确
