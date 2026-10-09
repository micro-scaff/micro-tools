# @mt-kit/enum

[![npm version](https://img.shields.io/npm/v/@mt-kit/enum.svg?style=for-the-badge&labelColor=2c3e50&color=3498db&logo=npm&logoColor=white)](https://www.npmjs.com/package/@mt-kit/enum)
[![GitHub stars](https://img.shields.io/github/stars/micro-scaff/micro-tools?style=for-the-badge&labelColor=2c3e50&color=e74c3c&logo=github&logoColor=white)](https://github.com/micro-scaff/micro-tools/tree/main/packages-enum)
[![GitHub issues](https://img.shields.io/github/issues/micro-scaff/micro-tools?style=for-the-badge&labelColor=2c3e50&color=27ae60&logo=github&logoColor=white)](https://github.com/micro-scaff/micro-tools/issues)
[![License](https://img.shields.io/github/license/micro-scaff/micro-tools?style=for-the-badge&labelColor=2c3e50&color=9b59b6&logo=opensourceinitiative&logoColor=white)](https://github.com/micro-scaff/micro-tools/blob/main/LICENSE)
[![Documentation](https://img.shields.io/badge/docs-online-blue?style=for-the-badge&labelColor=2c3e50&color=3498db&logoColor=white)](https://micro-scaff.github.io/)

TypeScript 枚举类型定义集合，提供常用的枚举值。

## 安装

```bash
npm i @mt-kit/enum
```

## API

### CursorType

鼠标光标形状枚举，包含常用的 CSS cursor 值。

```ts
import { CursorType } from '@mt-kit/enum';

// 使用示例
element.style.cursor = CursorType.POINTER;
element.style.cursor = CursorType.WAIT;
element.style.cursor = CursorType.NOT_ALLOWED;
```
