# @mt-kit/conf

[![npm version](https://img.shields.io/npm/v/@mt-kit/conf.svg?style=for-the-badge&labelColor=2c3e50&color=3498db&logo=npm&logoColor=white)](https://www.npmjs.com/package/@mt-kit/conf)
[![GitHub stars](https://img.shields.io/github/stars/micro-scaff/micro-tools?style=for-the-badge&labelColor=2c3e50&color=e74c3c&logo=github&logoColor=white)](https://github.com/micro-scaff/micro-tools/tree/main/packages-conf)
[![GitHub issues](https://img.shields.io/github/issues/micro-scaff/micro-tools?style=for-the-badge&labelColor=2c3e50&color=27ae60&logo=github&logoColor=white)](https://github.com/micro-scaff/micro-tools/issues)
[![License](https://img.shields.io/github/license/micro-scaff/micro-tools?style=for-the-badge&labelColor=2c3e50&color=9b59b6&logo=opensourceinitiative&logoColor=white)](https://github.com/micro-scaff/micro-tools/blob/main/LICENSE)
[![Documentation](https://img.shields.io/badge/docs-online-blue?style=for-the-badge&labelColor=2c3e50&color=3498db&logoColor=white)](https://micro-scaff.github.io/)

配置文件集合，提供常用的配置常量和枚举值。

## 安装

```bash
npm i @mt-kit/conf -D
```

## API

### 阿里矢量图标库

#### ICONFONT_URL

阿里矢量图标库（iconfont）的在线地址常量。

```ts
import { ICONFONT_URL } from '@mt-kit/conf';

// 在 HTML 中使用
<link rel="stylesheet" href={ICONFONT_URL} />
```

#### IconType

图标类型枚举，用于类型安全的图标使用。

```ts
import { IconType } from '@mt-kit/conf';

// 使用示例
const icon: IconType = IconType.SUCCESS;
```
