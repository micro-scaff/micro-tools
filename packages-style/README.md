# @mt-kit/style

[![npm version](https://img.shields.io/npm/v/@mt-kit/style.svg?style=for-the-badge&labelColor=2c3e50&color=3498db&logo=npm&logoColor=white)](https://www.npmjs.com/package/@mt-kit/style)
[![GitHub stars](https://img.shields.io/github/stars/micro-scaff/micro-tools?style=for-the-badge&labelColor=2c3e50&color=e74c3c&logo=github&logoColor=white)](https://github.com/micro-scaff/micro-tools/tree/main/packages-style)
[![GitHub issues](https://img.shields.io/github/issues/micro-scaff/micro-tools?style=for-the-badge&labelColor=2c3e50&color=27ae60&logo=github&logoColor=white)](https://github.com/micro-scaff/micro-tools/issues)
[![License](https://img.shields.io/github/license/micro-scaff/micro-tools?style=for-the-badge&labelColor=2c3e50&color=9b59b6&logo=opensourceinitiative&logoColor=white)](https://github.com/micro-scaff/micro-tools/blob/main/LICENSE)
[![Documentation](https://img.shields.io/badge/docs-online-blue?style=for-the-badge&labelColor=2c3e50&color=3498db&logoColor=white)](https://micro-scaff.github.io/)

样式工具库，提供 CSS 重置、文本省略、HTML 元素个性化样式等功能。

## 安装

```bash
npm i @mt-kit/style
```

## 样式

### 初始化样式

重置浏览器默认样式。

```ts
import '@mt-kit/style/reset';
```

### 个性化 HTML 元素样式

对 `a`、`code`、`del`、`mark` 等 HTML 元素进行样式修改。

```ts
import '@mt-kit/style/indivHtml';
```

## API

### cssEllipsis

生成文本省略的 CSS 类名，支持多行省略。

**参数：**

| 参数名 | 说明 | 类型 | 是否必传 | 默认值 |
|--------|------|------|----------|--------|
| lines | 显示的行数 | `number` | 是 | - |

**返回值：** `string` - CSS 类名

**使用示例：**

```ts
import { cssEllipsis } from "@mt-kit/style";

// 创建元素并应用 3 行省略样式
const div = document.createElement('div');
div.setAttribute('class', cssEllipsis(3));

// 可选：设置宽度
// div.style.width = '40px';

div.innerText = '这是一段很长的文本，超过指定行数后会被省略...';
document.body.appendChild(div);
```
