# @mt-kit/global-style

[![npm version](https://img.shields.io/npm/v/@mt-kit/global-style.svg?style=for-the-badge&labelColor=2c3e50&color=3498db&logo=npm&logoColor=white)](https://www.npmjs.com/package/@mt-kit/global-style)
[![GitHub stars](https://img.shields.io/github/stars/micro-scaff/micro-tools?style=for-the-badge&labelColor=2c3e50&color=e74c3c&logo=github&logoColor=white)](https://github.com/micro-scaff/micro-tools/tree/main/packages-theme/global-style)
[![GitHub issues](https://img.shields.io/github/issues/micro-scaff/micro-tools?style=for-the-badge&labelColor=2c3e50&color=27ae60&logo=github&logoColor=white)](https://github.com/micro-scaff/micro-tools/issues)
[![License](https://img.shields.io/github/license/micro-scaff/micro-tools?style=for-the-badge&labelColor=2c3e50&color=9b59b6&logo=opensourceinitiative&logoColor=white)](https://github.com/micro-scaff/micro-tools/blob/main/LICENSE)
[![Documentation](https://img.shields.io/badge/docs-online-blue?style=for-the-badge&labelColor=2c3e50&color=3498db&logoColor=white)](https://micro-scaff.github.io/)

一个支持服务端渲染的通用全局样式创建工具，不需要唯一类名。

## 特性

- ✅ 支持服务端渲染 (SSR)
- ✅ 不需要唯一类名
- ✅ 客户端和服务端统一 API
- ✅ 自动避免重复样式注入
- ✅ 自定义样式 ID 避免冲突
- ✅ 可配置样式属性
- ✅ 支持多种插入位置
- ✅ 强制更新已存在样式

## 安装

```bash
pnpm add @mt-kit/global-style
```

## 使用方法

### 基础用法

```typescript
import { createGlobalStyle } from '@mt-kit/global-style';

const styles = `
  .my-class {
    color: red;
    font-size: 16px;
  }
`;

createGlobalStyle(styles);
```
