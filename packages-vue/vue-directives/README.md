# @mt-kit/vue-directives

[![npm version](https://img.shields.io/npm/v/@mt-kit/vue-directives.svg?style=for-the-badge&labelColor=2c3e50&color=3498db&logo=npm&logoColor=white)](https://www.npmjs.com/package/@mt-kit/vue-directives)
[![GitHub stars](https://img.shields.io/github/stars/micro-scaff/micro-tools?style=for-the-badge&labelColor=2c3e50&color=e74c3c&logo=github&logoColor=white)](https://github.com/micro-scaff/micro-tools/tree/main/packages-vue/vue-directives)
[![GitHub issues](https://img.shields.io/github/issues/micro-scaff/micro-tools?style=for-the-badge&labelColor=2c3e50&color=27ae60&logo=github&logoColor=white)](https://github.com/micro-scaff/micro-tools/issues)
[![License](https://img.shields.io/github/license/micro-scaff/micro-tools?style=for-the-badge&labelColor=2c3e50&color=9b59b6&logo=opensourceinitiative&logoColor=white)](https://github.com/micro-scaff/micro-tools/blob/main/LICENSE)
[![Documentation](https://img.shields.io/badge/docs-online-blue?style=for-the-badge&labelColor=2c3e50&color=3498db&logoColor=white)](https://micro-scaff.github.io/)

Vue 自定义指令集合，提供元素拖拽、时间戳转换等常用指令。

## 安装

```bash
npm i @mt-kit/vue-directives
```

## API

### directiveDraggable

使元素可拖拽的自定义指令。

**参数：**

| 参数名 | 说明 | 类型 | 是否必传 | 默认值 |
|--------|------|------|----------|--------|
| value | 是否允许拖出边界 | `boolean` | 否 | `false` |

**全局注册：**

```ts
import { createApp } from 'vue';
import App from './App.vue';
import { directiveDraggable } from '@mt-kit/vue-directives';

const app = createApp(App);
directiveDraggable(app);
app.mount('#app');
```

**使用示例：**

```vue
<template>
  <!-- 普通拖拽（不允许拖出边界） -->
  <div v-directive-draggable>可拖拽元素</div>

  <!-- 允许拖出边界 -->
  <div v-directive-draggable="true">可拖出边界的元素</div>
</template>
```

### directiveConversionTime

将时间戳转换为格式化时间的自定义指令。

**参数：**

| 参数名 | 说明 | 类型 | 是否必传 |
|--------|------|------|----------|
| 元素文本 | 时间戳（毫秒或秒） | `number \| string` | 是 |

**全局注册：**

```ts
import { createApp } from 'vue';
import App from './App.vue';
import { directiveConversionTime } from '@mt-kit/vue-directives';

const app = createApp(App);
directiveConversionTime(app);
app.mount('#app');
```

**使用示例：**

```vue
<template>
  <!-- 毫秒时间戳 -->
  <div v-directive-conversion-time>1744560601775</div>

  <!-- 秒时间戳 -->
  <div v-directive-conversion-time>1672531200</div>
</template>
```
