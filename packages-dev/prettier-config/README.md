# @mt-kit/prettier-config

> 基于 Prettier 3.x 的现代化代码格式化配置，支持多种文件类型和框架

[![npm version](https://img.shields.io/npm/v/@mt-kit/prettier-config.svg?style=for-the-badge&labelColor=2c3e50&color=3498db&logo=npm&logoColor=white)](https://www.npmjs.com/package/@mt-kit/prettier-config)
[![GitHub stars](https://img.shields.io/github/stars/micro-scaff/micro-tools?style=for-the-badge&labelColor=2c3e50&color=e74c3c&logo=github&logoColor=white)](https://github.com/micro-scaff/micro-tools/tree/main/packages-dev/prettier-config)
[![GitHub issues](https://img.shields.io/github/issues/micro-scaff/micro-tools?style=for-the-badge&labelColor=2c3e50&color=27ae60&logo=github&logoColor=white)](https://github.com/micro-scaff/micro-tools/issues)
[![License](https://img.shields.io/github/license/micro-scaff/micro-tools?style=for-the-badge&labelColor=2c3e50&color=9b59b6&logo=opensourceinitiative&logoColor=white)](https://github.com/micro-scaff/micro-tools/blob/main/LICENSE)

## 📚 相关文档

- [Prettier 官方文档](https://prettier.nodejs.cn/)
- [ESLint 配置](https://www.npmjs.com/package/@mt-kit/eslint-config)

## 🚀 快速开始

### 安装

```bash
# 使用 npm
npm install -D prettier @mt-kit/prettier-config

# 使用 pnpm
pnpm add -D prettier @mt-kit/prettier-config

# 使用 yarn
yarn add -D prettier @mt-kit/prettier-config
```

### 基础配置

创建 `.prettier.mjs` 文件：

```js
export { default } from "@mt-kit/prettier-config";
```

### 其他配置方式

#### 使用 .prettierrc.mjs

```js
export { default } from "@mt-kit/prettier-config";
```

#### 使用 package.json

```json
{
  "prettier": "@mt-kit/prettier-config"
}
```

#### 使用 .prettierrc.json

```json
"@mt-kit/prettier-config"
```

## 💡 推荐配置

> 建议配合 [@mt-kit/eslint-config](https://www.npmjs.com/package/@mt-kit/eslint-config) 一起使用，确保代码风格的一致性。

## 📁 忽略文件配置

### 创建 .prettierignore 文件

```.prettierignore
**/*
!**/*.json5
```

## 🛠️ 脚本配置

### package.json 配置

```json
{
  "name": "demo",
  "version": "1.0.0",
  "description": "",
  "keywords": [],
  "type": "module",
  "scripts": {
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "format:staged": "prettier --write --ignore-unknown",
    "clear": "rm -fr node_modules"
  },
  "peerDependencies": {
    "prettier": ">=3.5.3"
  },
  "devDependencies": {
    "@mt-kit/prettier-config": "^X.Y.Z",
    "prettier": "^3.5.3"
  }
}
```

### VS Code 配置

创建 `.vscode/settings.json` 文件：

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.formatOnPaste": true,
  "editor.formatOnType": false,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit",
    "source.formatDocument": "explicit"
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[vue]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[css]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[scss]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[html]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[markdown]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

### 支持的扩展

推荐安装以下 VS Code 扩展：

- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## ⚙️ 配置选项

### 默认配置

| 选项             | 值        | 说明                             |
| ---------------- | --------- | -------------------------------- |
| `semi`           | `true`    | 在语句末尾添加分号               |
| `singleQuote`    | `false`   | 使用双引号而不是单引号           |
| `tabWidth`       | `2`       | 缩进空格数                       |
| `useTabs`        | `false`   | 使用空格而不是制表符             |
| `trailingComma`  | `"none"`  | 不添加尾随逗号                   |
| `printWidth`     | `200`     | 换行长度                         |
| `bracketSpacing` | `true`    | 在对象字面量的大括号之间打印空格 |
| `arrowParens`    | `"avoid"` | 箭头函数参数周围避免括号         |
| `endOfLine`      | `"lf"`    | 使用 LF 作为换行符               |

### 支持的文件类型

- **JavaScript**: `.js`, `.jsx`, `.mjs`, `.cjs`
- **TypeScript**: `.ts`, `.tsx`, `.mts`, `.cts`
- **Vue**: `.vue`
- **JSON**: `.json`, `.jsonc`
- **CSS**: `.css`, `.scss`, `.sass`, `.less`
- **HTML**: `.html`, `.htm`
- **Markdown**: `.md`, `.mdx`
- **YAML**: `.yml`, `.yaml`
- **其他**: `.graphql`, `.gql`

## 🔧 高级配置

### 自定义配置

如果需要覆盖默认配置，可以创建自定义配置：

```js
// .prettier.mjs
import baseConfig from "@mt-kit/prettier-config";

export default {
  ...baseConfig,
  // 覆盖特定选项
  printWidth: 100,
  tabWidth: 4,
  semi: false
};
```

### 项目特定配置

为特定文件类型设置不同的配置：

```js
// .prettier.mjs
import baseConfig from "@mt-kit/prettier-config";

export default {
  // 基础配置
  ...baseConfig,

  // 覆盖特定文件类型
  overrides: [
    {
      files: "*.md",
      options: {
        printWidth: 120,
        proseWrap: "always"
      }
    },
    {
      files: "*.json",
      options: {
        printWidth: 200
      }
    }
  ]
};
```

## 📋 常用命令

### 格式化命令

```bash
# 格式化所有文件
npx prettier --write .

# 检查格式化状态
npx prettier --check .

# 格式化特定文件
npx prettier --write src/**/*.{js,ts,vue}

# 格式化并显示差异
npx prettier --write --list-different .

# 格式化忽略的文件
npx prettier --write --ignore-unknown .
```

### 配置检查

```bash
# 检查当前配置
npx prettier --find-config-path .

# 显示配置信息
npx prettier --get-file-info src/index.js

# 验证配置文件
npx prettier --check-config .
```

## ❓ 常见问题

### 配置问题

**问题**: Prettier 配置没有生效

**解决方案**:

- 确保配置文件名称正确（`.prettier.mjs`, `.prettierrc.mjs`, `prettier.config.mjs`）
- 检查文件路径是否正确
- 重启 VS Code 或编辑器

### 性能问题

#### 1. 格式化速度慢

**原因**: 文件过多或配置复杂

**解决方案**:

```bash
# 使用缓存
npx prettier --write --cache .

# 并行处理
npx prettier --write --parallel .
```

#### 2. 内存不足

**原因**: 大型项目导致内存溢出

**解决方案**:

```bash
# 增加 Node.js 内存限制
node --max-old-space-size=4096 ./node_modules/.bin/prettier --write .
```

## 🔧 故障排除

### 调试配置

```bash
# 显示配置信息
npx prettier --find-config-path src/index.js

# 显示解析的文件信息
npx prettier --get-file-info src/index.js

# 显示配置详情
npx prettier --print-config src/index.js
```

### 清理缓存

```bash
# 清理 Prettier 缓存
rm -rf node_modules/.cache/prettier

# 重新格式化
npx prettier --write --cache .
```

## 📞 支持

- **问题反馈**: [GitHub Issues](https://github.com/micro-scaff/micro-tools/issues)

## 📄 许可证

[MIT License](https://github.com/micro-scaff/micro-tools/blob/main/LICENSE)
