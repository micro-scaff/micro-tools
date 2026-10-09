# @mt-kit/components

[![npm version](https://img.shields.io/npm/v/@mt-kit/components.svg?style=for-the-badge&labelColor=2c3e50&color=3498db&logo=npm&logoColor=white)](https://www.npmjs.com/package/@mt-kit/components)
[![GitHub stars](https://img.shields.io/github/stars/micro-scaff/micro-tools?style=for-the-badge&labelColor=2c3e50&color=e74c3c&logo=github&logoColor=white)](https://github.com/micro-scaff/micro-tools/tree/main/packages-components)
[![GitHub issues](https://img.shields.io/github/issues/micro-scaff/micro-tools?style=for-the-badge&labelColor=2c3e50&color=27ae60&logo=github&logoColor=white)](https://github.com/micro-scaff/micro-tools/issues)
[![License](https://img.shields.io/github/license/micro-scaff/micro-tools?style=for-the-badge&labelColor=2c3e50&color=9b59b6&logo=opensourceinitiative&logoColor=white)](https://github.com/micro-scaff/micro-tools/blob/main/LICENSE)
[![Documentation](https://img.shields.io/badge/docs-online-blue?style=for-the-badge&labelColor=2c3e50&color=3498db&logoColor=white)](https://micro-scaff.github.io/)

常用 JavaScript UI 组件库，提供 CSS 三角形生成、错误提示覆盖层、元素拖拽等功能。

## 安装

```bash
npm i @mt-kit/components
```

## API

### cssGenerateTriangle

生成 CSS 三角形的样式字符串。

**参数：**

| 参数名 | 说明 | 类型 | 是否必传 | 默认值 |
|--------|------|------|----------|--------|
| color | 三角形颜色 | `string` | 是 | - |
| size | 三角形大小（像素） | `number` | 是 | - |
| direction | 三角形方向 | `"top" \| "bottom" \| "left" \| "right"` | 否 | `"bottom"` |

**返回值：** `string` - CSS 样式字符串

**使用示例：**

```ts
import { cssGenerateTriangle } from "@mt-kit/components";

// 生成红色向下三角形样式（默认）
const triangleStyle = cssGenerateTriangle("red", 10);

// 生成向上三角形
const triangleTop = cssGenerateTriangle("blue", 15, "top");

// 在 HTML 中使用
const div = document.createElement('div');
div.setAttribute('style', triangleStyle);
document.body.appendChild(div);
```

### imitationViteError

生成一个类似 Vite 报错的错误覆盖层。

**参数：**

| 参数名 | 说明 | 类型 | 是否必传 | 默认值 |
|--------|------|------|----------|--------|
| err | 错误对象或错误信息 | `Error \| string` | 是 | - |
| dialog | 是否以对话框形式显示 | `boolean` | 否 | `false` |

**返回值：** `HTMLElement` - 错误覆盖层 DOM 元素

**使用示例：**

```ts
import { imitationViteError } from '@mt-kit/components';

// 创建错误覆盖层
const overlay = imitationViteError(err);

// 添加到页面
document.body.appendChild(overlay);

// 或添加到指定元素
const container = document.querySelector('.container');
container?.appendChild(overlay);
```

**效果预览：**

<img src="https://not-have.github.io/file/images/vite-error.png" alt="ErrorOverlay" style="zoom:40%;" />

### draggable

使 DOM 元素可拖拽。

**参数：**

| 参数名 | 说明 | 类型 | 是否必传 | 默认值 |
|--------|------|------|----------|--------|
| el | 要拖拽的 DOM 元素 | `Element` | 是 | - |
| overflow | 是否允许拖出边界 | `boolean` | 否 | `false` |
| options | 配置选项 | `IOptions` | 否 | - |
| options.observer | 是否使用 IntersectionObserver 监听元素可见性 | `boolean` | 否 | `false` |

**返回值：** `ITransform \| IDraggable` - 元素位置信息或包含 `offDraggable` 方法的对象

**注意：** 使用前需要设置 `html, body { height: 100%; width: 100%; overflow: hidden; }`

**使用示例：**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>demo-draggable</title>
  <style>
    html, body {
      height: 100%;
      width: 100%;
      overflow: hidden;
      margin: 0;
    }
    div {
      display: inline-block;
      position: relative;
    }
  </style>
</head>
<body>
  <div>
    <div class="demo-draggable-test01">拖动1</div>
    <div class="demo-draggable-test02">拖动2</div>
  </div>
</body>
</html>
<script type="module">
  import { draggable } from '@mt-kit/components';
  
  // 普通拖拽（不允许拖出边界）
  const el = document.querySelector(".demo-draggable-test01");
  draggable(el);
  
  // 允许拖出边界
  const el2 = document.querySelector(".demo-draggable-test02");
  draggable(el2, true);
</script>
```
