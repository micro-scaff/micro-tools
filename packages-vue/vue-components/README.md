# @mt-kit/vue-components

[![npm version](https://img.shields.io/npm/v/@mt-kit/vue-components.svg?style=for-the-badge&labelColor=2c3e50&color=3498db&logo=npm&logoColor=white)](https://www.npmjs.com/package/@mt-kit/vue-components)
[![GitHub stars](https://img.shields.io/github/stars/Not-have/micro-tools?style=for-the-badge&labelColor=2c3e50&color=e74c3c&logo=github&logoColor=white)](https://github.com/Not-have/micro-tools/tree/main/packages-vue/vue-components)
[![GitHub issues](https://img.shields.io/github/issues/Not-have/micro-tools?style=for-the-badge&labelColor=2c3e50&color=27ae60&logo=github&logoColor=white)](https://github.com/Not-have/micro-tools/issues)
[![License](https://img.shields.io/github/license/Not-have/micro-tools?style=for-the-badge&labelColor=2c3e50&color=9b59b6&logo=opensourceinitiative&logoColor=white)](https://github.com/Not-have/micro-tools/blob/main/LICENSE)
[![Documentation](https://img.shields.io/badge/docs-online-blue?style=for-the-badge&labelColor=2c3e50&color=3498db&logoColor=white)](https://not-have.github.io/micro-tools/)

自定义 Vue 组件库，提供序列帧动画、数字滚动动画等常用组件。

## 安装

```bash
npm i @mt-kit/vue-components
```

## 组件

### AnimationFrame

基于 Canvas 的图片序列帧播放器，支持循环播放、暂停恢复、资源切换和滚轮缩放。

```vue
<script lang="ts" setup>
import {
  AnimationFrame,
  getAnimationFrameUrls
} from "@mt-kit/vue-components";
import "@mt-kit/vue-components/style.css";

const frames = getAnimationFrameUrls({
  framePath: "/assets/owl",
  framePrefix: "owl_",
  totalFrames: 74
});
</script>

<template>
  <AnimationFrame
    aria-label="眨眼的猫头鹰"
    :duration="2400"
    :frames="frames"
    :loop-interval="600"
    :zoom="{
      draggable: true,
      min: -1,
      max: 1
    }"
  />
</template>
```

组件实例提供 `pause`、`resume`、`restart`、`zoomIn` 和 `zoomOut` 方法，并抛出 `end`、`zoom-change` 事件。

### CountTo

数字滚动动画组件，支持从起始值到结束值的平滑滚动效果。

**Props：**

| 属性名 | 说明 | 类型 | 是否必传 | 默认值 |
|--------|------|------|----------|--------|
| autoplay | 是否自动播放动画 | `boolean` | 否 | `true` |
| decimal | 小数点符号 | `string` | 否 | `.` |
| decimals | 小数位数 | `number` | 否 | `0` |
| delay | 延迟执行动画开始的时间（毫秒） | `number` | 否 | `0` |
| duration | 数字滚动动画时长（毫秒） | `number` | 否 | `1000` |
| endVal | 结束数字 | `number` | 否 | `100` |
| startVal | 开始数字 | `number` | 否 | `0` |
| prefix | 前缀文本 | `string` | 否 | - |
| separator | 千位分隔符 | `string` | 否 | `,` |
| style | 滚动数字的样式对象 | `object` | 否 | - |
| suffix | 后缀文本 | `string` | 否 | - |

**使用示例：**

```vue
<script lang="ts" setup>
import { CountTo } from "@mt-kit/vue-components";
</script>

<template>
  <CountTo
    :start-val="1"
    :end-val="10"
    :decimals="3"
  />
</template>
```
