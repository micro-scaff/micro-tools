# @mt-kit/vue-config

[![npm version](https://img.shields.io/npm/v/@mt-kit/vue-config.svg?style=for-the-badge&labelColor=2c3e50&color=3498db&logo=npm&logoColor=white)](https://www.npmjs.com/package/@mt-kit/vue-config)
[![GitHub stars](https://img.shields.io/github/stars/micro-scaff/micro-tools?style=for-the-badge&labelColor=2c3e50&color=e74c3c&logo=github&logoColor=white)](https://github.com/micro-scaff/micro-tools/tree/main/packages-vue/vue-config)
[![GitHub issues](https://img.shields.io/github/issues/micro-scaff/micro-tools?style=for-the-badge&labelColor=2c3e50&color=27ae60&logo=github&logoColor=white)](https://github.com/micro-scaff/micro-tools/issues)
[![License](https://img.shields.io/github/license/micro-scaff/micro-tools?style=for-the-badge&labelColor=2c3e50&color=9b59b6&logo=opensourceinitiative&logoColor=white)](https://github.com/micro-scaff/micro-tools/blob/main/LICENSE)
[![Documentation](https://img.shields.io/badge/docs-online-blue?style=for-the-badge&labelColor=2c3e50&color=3498db&logoColor=white)](https://micro-scaff.github.io/)

Vue 应用配置工具，提供全局错误处理、请求错误处理等常用配置。

## 安装

```bash
npm i @mt-kit/vue-config
```

## API

### configErrorHandler

全局错误处理函数，用于捕获 Vue 应用中的错误。

**参数：** 无

**返回值：** `(err: unknown, instance: ComponentPublicInstance | null, info: string) => void` - 错误处理函数

**使用示例：**

```ts
// main.ts
import App from "./App.vue";
import { configErrorHandler } from "@mt-kit/vue-config";
import { createApp } from "vue";

const app = createApp(App);

// 配置全局错误处理
app.config.errorHandler = configErrorHandler;

app.mount("#app");
```

**错误提示效果：**

- 组件错误提示：

![errorHandler](https://not-have.github.io/file/images/20250413234956.png)

- 内部组件错误提示：

![info](https://not-have.github.io/file/images/20250413235331.png)
