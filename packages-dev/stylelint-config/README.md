# @mt-kit/stylelint-config

> 基于 Stylelint 16.x 的现代化 CSS 代码规范配置，支持多种框架和预处理器

[![npm version](https://img.shields.io/npm/v/@mt-kit/stylelint-config.svg?style=for-the-badge&labelColor=2c3e50&color=3498db&logo=npm&logoColor=white)](https://www.npmjs.com/package/@mt-kit/stylelint-config)
[![GitHub stars](https://img.shields.io/github/stars/micro-scaff/micro-tools?style=for-the-badge&labelColor=2c3e50&color=e74c3c&logo=github&logoColor=white)](https://github.com/micro-scaff/micro-tools/tree/main/packages-dev/stylelint-config)
[![GitHub issues](https://img.shields.io/github/issues/micro-scaff/micro-tools?style=for-the-badge&labelColor=2c3e50&color=27ae60&logo=github&logoColor=white)](https://github.com/micro-scaff/micro-tools/issues)
[![License](https://img.shields.io/github/license/micro-scaff/micro-tools?style=for-the-badge&labelColor=2c3e50&color=9b59b6&logo=opensourceinitiative&logoColor=white)](https://github.com/micro-scaff/micro-tools/blob/main/LICENSE)

## 📚 相关文档

- [Stylelint 官方文档](https://www.stylelint.cn/)
- [Stylelint 中文文档](https://stylelint.nodejs.cn/)
- [PostCSS 文档](https://postcss.org/)

## 🚀 快速开始

### 安装

```bash
# 使用 npm
npm install -D stylelint @mt-kit/stylelint-config

# 使用 pnpm
pnpm add -D stylelint @mt-kit/stylelint-config

# 使用 yarn
yarn add -D stylelint @mt-kit/stylelint-config
```

### 基础配置

创建 `stylelint.config.mjs` 文件：

```js
export default {
  extends: ["@mt-kit/stylelint-config"],
  ignoreFiles: [
    "**/*.json", 
    "**/*.mjs", 
    "**/*.cjs", 
    "**/*.svg",  
    "**/*.ico",  
    "**/*.js",  
    "**/*.ts",
    "node_modules/**",
    "dist/**",
    "**/*.md"
  ],
  root: true
};
```

### Vue 项目配置 `stylelint.config.mjs`

```js
export default {
  extends: ["@mt-kit/stylelint-config/vue"],
  ignoreFiles: [
    "**/*.json", 
    "**/*.mjs", 
    "**/*.cjs", 
    "**/*.svg",  
    "**/*.ico",  
    "**/*.js",  
    "**/*.ts",
    "node_modules/**",
    "dist/**",
    "**/*.jsx",
    "**/*.md"
  ],
  root: true
};
```

### React 项目配置 `stylelint.config.mjs`

```js
export default {
  extends: ["@mt-kit/stylelint-config/react"],
  ignoreFiles: [
    "**/*.json",
    "**/*.mjs",
    "**/*.cjs",
    "**/*.svg",
    "**/*.ico",
    "**/*.js", 
    "**/*.ts",
    "node_modules/**",
    "dist/**",
    "**/*.md"
  ],
  root: true
};
```

### 其他配置方式

#### 使用 .stylelintrc.mjs

```js
export default {
  extends: ["@mt-kit/stylelint-config"],
  ignoreFiles: ["node_modules/**", "dist/**"],
  root: true
};
```

#### 使用 package.json

```json
{
  "stylelint": {
    "extends": ["@mt-kit/stylelint-config"],
    "ignoreFiles": ["node_modules/**", "dist/**"]
  }
}
```

## 💡 推荐配置

> 建议配合 [@mt-kit/eslint-config](https://www.npmjs.com/package/@mt-kit/eslint-config) 和 [@mt-kit/prettier-config](https://www.npmjs.com/package/@mt-kit/prettier-config) 一起使用，确保代码风格的一致性。

## 📁 忽略文件配置

### 创建 .stylelintignore 文件

```.stylelintignore
# 构建输出目录
dist
build
.output
.nitro

# 依赖目录
node_modules

# 静态资源
public
assets

# 文档文件
*.md
README.md
CHANGELOG.md

# 配置文件
*.json
*.mjs
*.cjs
*.js
*.ts

# 图片文件
*.svg
*.ico
*.png
*.jpg
*.jpeg
*.gif

# 临时文件
*.tmp
*.temp
.DS_Store
Thumbs.db
```

> **注意**: `.stylelintignore` 文件的权重最高，会覆盖配置文件中的 `ignoreFiles` 设置。

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
    "lint": "stylelint '**/*.css'",
    "fix": "stylelint '**/*.css' --fix"
  },
  "peerDependencies": {
    "stylelint": ">=16.17.0"
  },
  "devDependencies": {
    "@mt-kit/stylelint-config": "^X.Y.Z",
    "stylelint": "^16.17.0"
  }
}
```

### VS Code 配置

创建 `.vscode/settings.json` 文件：

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.stylelint": "explicit"
  },
  "stylelint.enable": true,
  "stylelint.packageManager": "pnpm",
  "stylelint.validate": [
    "css", 
    "less", 
    "postcss", 
    "scss", 
    "vue", 
    "tsx", 
    "jsx", 
    "html"
  ],
  "stylelint.customSyntax": "postcss-html",
  "stylelint.snippet": [
    "css", 
    "less", 
    "postcss", 
    "scss", 
    "vue", 
    "tsx", 
    "jsx", 
    "html"
  ],
  "[css]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[scss]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[less]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[vue]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

### 支持的扩展

推荐安装以下 VS Code 扩展：

- [Stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)
- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [PostCSS Language Support](https://marketplace.visualstudio.com/items?itemName=csstools.postcss)

> **注意**: `stylelint.packageManager` 是包的加载依赖项，如果你的项目使用的是 npm 则不需要配置。

## ⚙️ 配置选项

### 默认配置

| 选项 | 值 | 说明 |
|------|-----|------|
| `extends` | `["@mt-kit/stylelint-config"]` | 继承基础配置 |
| `ignoreFiles` | `["node_modules/**", "dist/**"]` | 忽略的文件模式 |
| `root` | `true` | 标记为根配置文件 |

### 支持的文件类型

- **CSS**: `.css`
- **SCSS**: `.scss`
- **Less**: `.less`
- **PostCSS**: `.postcss`
- **Vue**: `.vue` (单文件组件)
- **React**: `.tsx`, `.jsx`
- **HTML**: `.html`

### 框架特定配置

| 配置 | 文件路径 | 适用场景 |
|------|----------|----------|
| `@mt-kit/stylelint-config` | 基础配置 | 普通项目 |
| `@mt-kit/stylelint-config/vue` | Vue 配置 | Vue 项目 |
| `@mt-kit/stylelint-config/react` | React 配置 | React 项目 |

## 🔧 高级配置

### 自定义规则

如果需要覆盖默认规则，可以创建自定义配置：

```js
// stylelint.config.mjs
export default {
  extends: ["@mt-kit/stylelint-config"],
  rules: {
    // 覆盖特定规则
    "color-no-invalid-hex": true,
    "font-family-no-duplicate-names": true,
    "function-calc-no-unspaced-operator": true,
    "unit-no-unknown": true,
    "property-no-unknown": true,
    "keyframe-declaration-no-important": true,
    "declaration-block-no-duplicate-properties": true,
    "block-no-empty": true,
    "selector-pseudo-class-no-unknown": true,
    "selector-pseudo-element-no-unknown": true,
    "selector-type-no-unknown": true,
    "media-feature-name-no-unknown": true,
    "at-rule-no-unknown": true,
    "comment-no-empty": true,
    "no-duplicate-at-import-rules": true,
    "no-duplicate-selectors": true,
    "no-empty-source": true,
    "no-extra-semicolons": true,
    "no-invalid-double-slash-comments": true
  },
  ignoreFiles: ["node_modules/**", "dist/**"],
  root: true
};
```

### 项目特定配置

为特定文件类型设置不同的规则：

```js
// stylelint.config.mjs
export default {
  extends: ["@mt-kit/stylelint-config"],
  overrides: [
    {
      files: ["**/*.vue"],
      rules: {
        "selector-pseudo-element-no-unknown": [
          true,
          {
            ignorePseudoElements: ["v-deep", "v-global", "v-slotted"]
          }
        ]
      }
    },
    {
      files: ["**/*.scss"],
      rules: {
        "at-rule-no-unknown": [
          true,
          {
            ignoreAtRules: ["use", "forward", "include", "mixin", "function"]
          }
        ]
      }
    }
  ],
  ignoreFiles: ["node_modules/**", "dist/**"],
  root: true
};
```

### 与 Prettier 集成

确保 Stylelint 和 Prettier 规则不冲突：

```js
// stylelint.config.mjs
export default {
  extends: [
    "@mt-kit/stylelint-config",
    "stylelint-prettier/recommended"
  ],
  rules: {
    "prettier/prettier": true
  },
  ignoreFiles: ["node_modules/**", "dist/**"],
  root: true
};
```

## 📋 常用命令

### 检查命令

```bash
# 检查所有样式文件
npx stylelint '**/*.css'

# 检查特定文件
npx stylelint 'src/**/*.css'

# 检查并显示详细信息
npx stylelint '**/*.css' --verbose

# 检查并显示格式化的输出
npx stylelint '**/*.css' --formatter verbose
```

### 修复命令

```bash
# 自动修复可修复的问题
npx stylelint '**/*.{css,scss,less,vue}' --fix

# 修复特定文件
npx stylelint 'src/styles/main.css' --fix

# 修复并显示修复的文件
npx stylelint '**/*.css' --fix --formatter verbose
```

### 配置检查

```bash
# 检查配置文件
npx stylelint --print-config src/styles/main.css

# 验证配置文件
npx stylelint --config stylelint.config.mjs '**/*.css'
```

## ❓ 常见问题

### 配置问题

#### 1. 配置文件不生效

**问题**: Stylelint 配置没有生效

**解决方案**:

- 确保配置文件名称正确（`stylelint.config.mjs`, `.stylelintrc.mjs`）
- 检查文件路径是否正确
- 重启 VS Code 或编辑器

#### 2. 与 Prettier 冲突

**问题**: Stylelint 和 Prettier 格式化规则冲突

**解决方案**:

```js
// stylelint.config.mjs
export default {
  extends: [
    "@mt-kit/stylelint-config",
    "stylelint-prettier/recommended"
  ],
  rules: {
    "prettier/prettier": true
  }
};
```

### 性能问题

#### 1. 检查速度慢

**原因**: 文件过多或规则配置复杂

**解决方案**:

```bash
# 使用缓存
npx stylelint '**/*.css' --cache

# 并行处理
npx stylelint '**/*.css' --max-warnings 0
```

#### 2. 内存不足

**原因**: 大型项目导致内存溢出

**解决方案**:

```bash
# 增加 Node.js 内存限制
node --max-old-space-size=4096 ./node_modules/.bin/stylelint '**/*.css'
```

## 🔧 故障排除

### 调试配置

```bash
# 显示配置信息
npx stylelint --print-config src/styles/main.css

# 显示解析的文件信息
npx stylelint --formatter json '**/*.css'

# 显示详细的错误信息
npx stylelint '**/*.css' --verbose
```

### 清理缓存

```bash
# 清理 Stylelint 缓存
rm -rf .stylelintcache

# 重新检查
npx stylelint '**/*.css' --cache
```

## 📞 支持

- **问题反馈**: [GitHub Issues](https://github.com/micro-scaff/micro-tools/issues)

## 📄 许可证

[MIT License](https://github.com/micro-scaff/micro-tools/blob/main/LICENSE)

## 🔌 插件生态

### 核心插件

| 插件名 | 版本 | 作用 |
|--------|------|------|
| `stylelint` | ^16.17.0 | CSS 静态代码分析工具 |
| `postcss` | ^8.4.0 | CSS 预处理工具 |
| `postcss-html` | ^1.5.0 | HTML 预处理工具 |

### 配置插件

| 插件名 | 版本 | 作用 |
|--------|------|------|
| `stylelint-config-recommended` | ^13.0.0 | 推荐的 Stylelint 配置 |
| `stylelint-config-standard` | ^34.0.0 | 标准规则配置，提供更严格风格约束 |
| `stylelint-config-recess-order` | ^4.0.0 | 样式属性排序规则 |

### 工具集成

| 插件名 | 版本 | 作用 |
|--------|------|------|
| `stylelint-order` | ^6.0.0 | 样式属性排序规则 |
| `stylelint-prettier` | ^4.0.0 | 结合 Prettier 格式化工具 |

### 已废弃插件

| 插件名 | 状态 | 说明 |
|--------|------|------|
| `@stylistic/stylelint-plugin` | ❌ 已废弃 | 自定义 Stylelint 规则扩展 |

## 🎯 规则特性

### 代码风格

- **属性排序**: 自动排序 CSS 属性
- **命名规范**: 统一的类名和 ID 命名
- **缩进**: 2 空格缩进
- **引号**: 单引号优先

### 代码质量

- **无效值检测**: 检测无效的 CSS 值
- **重复属性**: 检测重复的 CSS 属性
- **空规则**: 检测空的 CSS 规则
- **未知属性**: 检测未知的 CSS 属性

### 最佳实践

- **现代语法**: 支持最新的 CSS 特性
- **性能优化**: 避免性能反模式
- **可维护性**: 提高代码可读性和可维护性
- **浏览器兼容性**: 检测浏览器兼容性问题
