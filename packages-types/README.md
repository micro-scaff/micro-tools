# @mt-kit/types

[![npm version](https://img.shields.io/npm/v/@mt-kit/types.svg?style=for-the-badge&labelColor=2c3e50&color=3498db&logo=npm&logoColor=white)](https://www.npmjs.com/package/@mt-kit/types)
[![GitHub stars](https://img.shields.io/github/stars/micro-scaff/micro-tools?style=for-the-badge&labelColor=2c3e50&color=e74c3c&logo=github&logoColor=white)](https://github.com/micro-scaff/micro-tools/tree/main/packages-types)
[![GitHub issues](https://img.shields.io/github/issues/micro-scaff/micro-tools?style=for-the-badge&labelColor=2c3e50&color=27ae60&logo=github&logoColor=white)](https://github.com/micro-scaff/micro-tools/issues)
[![License](https://img.shields.io/github/license/micro-scaff/micro-tools?style=for-the-badge&labelColor=2c3e50&color=9b59b6&logo=opensourceinitiative&logoColor=white)](https://github.com/micro-scaff/micro-tools/blob/main/LICENSE)
[![Documentation](https://img.shields.io/badge/docs-online-blue?style=for-the-badge&labelColor=2c3e50&color=3498db&logoColor=white)](https://micro-scaff.github.io/)

通用 TypeScript 类型定义集合，提供常用的类型工具。

## 安装

```bash
npm i @mt-kit/types -D
```

## API

### AnyObject

TypeScript 对象的通用类型，用于表示不确定 key 和 value 类型的对象。

```ts
import type { AnyObject } from '@mt-kit/types';

const obj: AnyObject = {
  name: 'test',
  age: 18
};
```

### EventName

事件名称的类型，用于类型安全的事件处理。

```ts
import type { EventName } from '@mt-kit/types';

const eventName: EventName = 'click'; // ✅ 正确
// const invalid: EventName = 'invalid'; // ❌ 错误
```
