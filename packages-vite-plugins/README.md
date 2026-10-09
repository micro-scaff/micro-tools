# @mt-kit/vite-plugins

[![npm version](https://img.shields.io/npm/v/@mt-kit/vite-plugins.svg?style=for-the-badge&labelColor=2c3e50&color=3498db&logo=npm&logoColor=white)](https://www.npmjs.com/package/@mt-kit/vite-plugins)
[![GitHub stars](https://img.shields.io/github/stars/micro-scaff/micro-tools?style=for-the-badge&labelColor=2c3e50&color=e74c3c&logo=github&logoColor=white)](https://github.com/micro-scaff/micro-tools/tree/main/packages-vite-plugins)
[![GitHub issues](https://img.shields.io/github/issues/micro-scaff/micro-tools?style=for-the-badge&labelColor=2c3e50&color=27ae60&logo=github&logoColor=white)](https://github.com/micro-scaff/micro-tools/issues)
[![License](https://img.shields.io/github/license/micro-scaff/micro-tools?style=for-the-badge&labelColor=2c3e50&color=9b59b6&logo=opensourceinitiative&logoColor=white)](https://github.com/micro-scaff/micro-tools/blob/main/LICENSE)
[![Documentation](https://img.shields.io/badge/docs-online-blue?style=for-the-badge&labelColor=2c3e50&color=3498db&logoColor=white)](https://micro-scaff.github.io/)

Vite 插件集合，提供库构建、TypeScript 类型生成等常用插件。

## 安装

```bash
npm install @mt-kit/vite-plugins -D
```

## TypeScript 类型生成

> **注意**：直接内嵌到插件，无法使用，待修复。请使用 `vite-plugin-dts`。

**安装：**

```bash
npm i vite-plugin-dts -D
```

**配置：**

```ts
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig(() => ({
  plugins: [
    dts({
      tsconfigPath: "./tsconfig.json",
      rollupTypes: false,
      strictOutput: true,
      outDir: "dist",
      entryRoot: "./src"
    })
  ]
}));
```

**相关文档：** [vite-plugin-dts](https://github.com/qmhc/vite-plugin-dts)

## API

### libPlugin

Vite 库构建插件，用于构建可发布的库文件。

**参数：**

| 属性名 | 说明 | 类型 | 是否必传 | 默认值 |
|--------|------|------|----------|--------|
| name | UMD 构建使用的全局变量名 | `string` | 是 | - |
| fileName | 打包的文件名 | `string` | 否 | `index` |
| entry | 入口文件路径 | `string` | 否 | `src/index.ts` |
| external | 不打入产物的依赖 | `Array<string \| RegExp>` | 否 | `["path", "vite"]` |
| globals | UMD 构建中外部依赖对应的全局变量名 | `Record<string, string>` | 否 | `{}` |

**package.json 配置：**

| 字段 | 说明 | 对应文件 |
|------|------|----------|
| main | CommonJS 规范，也可在浏览器使用全局变量引用 | `dist/index.umd.js` |
| module | ES 模块规范 | `dist/index.es.js` |
| types | 类型声明文件 | `dist/index.d.ts` |
| exports | 多入口条件导出 | 按模块类型映射路径 |

**package.json 示例：**

```json
{
  "name": "demo",
  "version": "1.0.0",
  "description": "Demo",
  "type": "module",
  "scripts": {
    "clear:build": "rm -fr dist",
    "clear": "rm -fr node_modules && pnpm run clear:build",
    "build": "pnpm run clear:build && vite build",
    "dev": "vite build --watch"
  },
  "main": "dist/index.umd.js",
  "module": "dist/index.es.js",
  "types": "dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.es.js",
      "require": "./dist/index.umd.js"
    }
  }
}
```

**vite.config.ts 示例：**

```ts
import { defineConfig } from "vite";
import { libPlugin } from '@mt-kit/vite-plugins';

export default defineConfig({
  plugins: [
    libPlugin({
      name: "Demo"
    })
  ]
});
```
