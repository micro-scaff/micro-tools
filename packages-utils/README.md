# @mt-kit/utils

[![npm version](https://img.shields.io/npm/v/@mt-kit/utils.svg?style=for-the-badge&labelColor=2c3e50&color=3498db&logo=npm&logoColor=white)](https://www.npmjs.com/~not-have-warehouse)
[![GitHub stars](https://img.shields.io/github/stars/micro-scaff/micro-tools?style=for-the-badge&labelColor=2c3e50&color=e74c3c&logo=github&logoColor=white)](https://github.com/micro-scaff/micro-tools/tree/main/packages-utils)
[![GitHub issues](https://img.shields.io/github/issues/micro-scaff/micro-tools?style=for-the-badge&labelColor=2c3e50&color=27ae60&logo=github&logoColor=white)](https://github.com/micro-scaff/micro-tools/issues)
[![License](https://img.shields.io/github/license/micro-scaff/micro-tools?style=for-the-badge&labelColor=2c3e50&color=9b59b6&logo=opensourceinitiative&logoColor=white)](https://github.com/micro-scaff/micro-tools/blob/main/LICENSE)

## 安装

```bash
npm i @mt-kit/utils
```

## 使用

[查看使用示例](https://github.com/micro-scaff/micro-tools/tree/main/packages-utils/stories)

## API

### animationFrameThrottle

- 使用 `requestAnimationFrame` 创建函数节流版本，限制函数在特定时间内的调用次数
- 适用于高频事件如滚动、窗口大小改变等场景

| 参数名 | 说明 | 是否必传 | 类型 |
|--------|------|----------|------|
| fn | 需要节流的回调函数 | 是 | `Function` |

**返回值：** `Function` - 节流后的函数

**使用场景：**

- 滚动事件处理
- 窗口大小改变监听
- 动画更新函数
- 鼠标移动事件

```ts
import { animationFrameThrottle } from "@mt-kit/utils";

// 滚动事件处理
const handleScroll = () => {
  console.log('页面滚动中...');
};
window.addEventListener('scroll', animationFrameThrottle(handleScroll));

// 窗口大小改变
const handleResize = () => {
  console.log('窗口大小改变');
};
window.addEventListener('resize', animationFrameThrottle(handleResize));

// 动画效果
const updateAnimation = () => {
  // 更新动画逻辑
};
const throttledAnimation = animationFrameThrottle(updateAnimation);
```

### imageBase64ToBlob

- 将 Base64 格式的图片转换为 Blob 对象
- 支持各种图片格式（PNG、JPEG、GIF、WebP 等）

| 参数名 | 说明 | 是否必传 | 类型 |
|--------|------|----------|------|
| base64 | Base64 格式的图片数据 | 是 | `string` |

**返回值：** `Blob` - 转换后的 Blob 对象

**使用场景：**

- 图片上传前的格式转换
- Canvas 导出图片
- 图片压缩处理
- 文件下载

```ts
import { imageBase64ToBlob } from "@mt-kit/utils";

// 转换 Base64 图片为 Blob
const base64Data = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...';
const blob = imageBase64ToBlob(base64Data);

// 上传图片
const formData = new FormData();
formData.append('image', blob, 'image.png');

// 创建下载链接
const url = URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = 'image.png';
a.click();
```

### imageUrlToBase64

- 将图片 URL 转换为 Base64 格式
- 支持跨域图片（需要服务器支持 CORS）

| 参数名 | 说明 | 是否必传 | 类型 | 默认值 |
|--------|------|----------|------|--------|
| url | 图片的 URL 地址 | 是 | `string` | - |
| mimeType | 生成的 Base64 字符串的 MIME 类型 | 否 | `string` | `"image/png"` |

**返回值：** `Promise<string>` - Base64 格式的图片数据

**使用场景：**

- 图片缓存处理
- 离线图片存储
- 图片压缩上传
- 图片预览功能

```ts
import { imageUrlToBase64 } from "@mt-kit/utils";

// 转换图片 URL 为 Base64
imageUrlToBase64('https://example.com/image.png')
  .then(base64 => {
    console.log(base64); // data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...
    
    // 在页面中显示
    const img = document.createElement('img');
    img.src = base64;
    document.body.appendChild(img);
  })
  .catch(error => {
    console.error('图片转换失败:', error);
  });

// 指定 MIME 类型
imageUrlToBase64('https://example.com/image.jpg', 'image/jpeg')
  .then(base64 => {
    console.log(base64); // data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ...
  });
```

### downloadByUrl

- 根据文件地址进行下载
- 支持各种文件格式（PDF、图片、文档等）

| 参数名 | 说明 | 是否必传 | 类型 | 默认值 |
|--------|------|----------|------|--------|
| url | 文件的 URL 地址 | 是 | `string` | - |
| target | 链接的打开方式 | 否 | `string` | `"_blank"` |
| fileName | 下载的文件名 | 否 | `string` | 自动从 URL 提取 |

**返回值：** `void`

**使用场景：**

- 文件下载功能
- 文档导出
- 图片保存
- 资源下载

```ts
import { downloadByUrl } from "@mt-kit/utils";

// 下载 PDF 文档
downloadByUrl({
  url: 'https://example.com/document.pdf',
  target: '_blank',
  fileName: 'my-document.pdf'
});

// 下载图片
downloadByUrl({
  url: 'https://example.com/image.jpg',
  fileName: 'beautiful-image.jpg'
});

// 下载 Excel 文件
downloadByUrl({
  url: 'https://example.com/data.xlsx',
  fileName: 'report-2024.xlsx'
});
```

### downloadDataFile

- 根据文件数据进行下载
- 支持各种数据类型（文本、二进制、ArrayBuffer 等）

| 参数名 | 说明 | 是否必传 | 类型 | 默认值 |
|--------|------|----------|------|--------|
| data | 文件数据（BlobPart 类型） | 是 | `BlobPart` | - |
| filename | 保存的文件名 | 是 | `string` | - |
| mime | 文件的 MIME 类型 | 否 | `string` | 自动检测 |

**返回值：** `void`

**使用场景：**

- 动态生成文件下载
- 文本文件导出
- 二进制数据处理
- 数据备份功能

```ts
import { downloadDataFile } from "@mt-kit/utils";

// 下载文本文件
const textData = "Hello, World!";
downloadDataFile(textData, 'hello.txt', 'text/plain');

// 下载 JSON 数据
const jsonData = JSON.stringify({ name: 'John', age: 30 }, null, 2);
downloadDataFile(jsonData, 'data.json', 'application/json');

// 下载二进制数据
const binaryData = new Uint8Array([72, 101, 108, 108, 111]); // "Hello"
downloadDataFile(binaryData, 'hello.bin', 'application/octet-stream');

// 下载 CSV 数据
const csvData = "Name,Age,City\nJohn,30,New York\nJane,25,London";
downloadDataFile(csvData, 'users.csv', 'text/csv');
```

### downloadBase64File

- 根据 Base64 数据下载文件
- 支持各种文件格式的 Base64 数据

| 参数名 | 说明 | 是否必传 | 类型 | 默认值 |
|--------|------|----------|------|--------|
| base64 | Base64 格式的文件数据 | 是 | `string` | - |
| filename | 保存的文件名 | 是 | `string` | - |
| mime | 文件的 MIME 类型 | 否 | `string` | 自动检测 |

**返回值：** `void`

**使用场景：**

- Base64 图片下载
- 编码文件导出
- 数据恢复功能
- 文件格式转换

```ts
import { downloadBase64File } from "@mt-kit/utils";

// 下载 Base64 文本文件
const base64Text = 'data:text/plain;base64,SGVsbG8gV29ybGQh'; // "Hello World!"
downloadBase64File(base64Text, 'hello.txt');

// 下载 Base64 图片
const base64Image = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...';
downloadBase64File(base64Image, 'image.png', 'image/png');

// 下载 Base64 PDF
const base64Pdf = 'data:application/pdf;base64,JVBERi0xLjQKJcfsj6IK...';
downloadBase64File(base64Pdf, 'document.pdf', 'application/pdf');
```

### downloadUrlFile

- 根据在线文件的 URL 进行下载
- 支持各种文件格式（图片、文档、视频等）

| 参数名 | 说明 | 是否必传 | 类型 | 默认值 |
|--------|------|----------|------|--------|
| url | 文件的 URL 地址 | 是 | `string` | - |
| filename | 保存的文件名 | 是 | `string` | - |
| mime | 文件的 MIME 类型 | 否 | `string` | 自动检测 |

**返回值：** `Promise<void>`

**使用场景：**

- 在线图片保存
- 文档下载
- 媒体文件下载
- 资源备份

```ts
import { downloadUrlFile } from "@mt-kit/utils";

// 下载图片
downloadUrlFile(
  'https://example.com/image.png',
  'my-image.png',
  'image/png'
);

// 下载 PDF 文档
downloadUrlFile(
  'https://example.com/document.pdf',
  'report.pdf',
  'application/pdf'
);

// 下载视频文件
downloadUrlFile(
  'https://example.com/video.mp4',
  'tutorial.mp4',
  'video/mp4'
);
```

### copyText

- 复制文本到剪贴板
- 支持现代浏览器的 Clipboard API

| 参数名 | 说明 | 是否必传 | 类型 | 默认值 |
|--------|------|----------|------|--------|
| text | 要复制的文本内容 | 是 | `string` | - |
| fn | 复制成功的回调函数 | 否 | `Function` | - |

**返回值：** `Promise<void>`

**使用场景：**

- 一键复制功能
- 分享链接复制
- 代码片段复制
- 用户反馈功能

```ts
import { copyText } from "@mt-kit/utils";

// 基本使用
copyText('Hello World!').then(() => {
  console.log('文本已复制到剪贴板');
});

// 带回调函数
copyText('https://example.com', () => {
  alert('链接已复制！');
});

// 错误处理
copyText('Some text')
  .then(() => {
    console.log('复制成功');
  })
  .catch(error => {
    console.error('复制失败:', error);
  });
```

### queryStringToObject

- 将查询字符串转换为对象
- 支持 URL 参数解析和对象化处理

| 参数名 | 说明 | 是否必传 | 类型 | 默认值 |
|--------|------|----------|------|--------|
| queryString | 查询字符串（包含 ? 或不包含都可以） | 是 | `string` | - |

**返回值：** `Record<string, string>` - 解析后的参数对象

**使用场景：**

- URL 参数解析
- 表单数据处理
- 路由参数提取
- API 参数构建

```ts
import { queryStringToObject } from "@mt-kit/utils";

// 基本使用
const query = queryStringToObject('?name=John&age=30');
console.log(query); // { name: 'John', age: '30' }

// 不包含 ? 的字符串
const query2 = queryStringToObject('name=John&age=30');
console.log(query2); // { name: 'John', age: '30' }

// 空查询字符串
const query3 = queryStringToObject('');
console.log(query3); // {}

// 复杂参数
const query4 = queryStringToObject('?search=hello%20world&page=1&sort=desc');
console.log(query4); // { search: 'hello world', page: '1', sort: 'desc' }
```

### openWindow

- 打开新窗口
- 支持自定义窗口属性和打开方式

| 参数名 | 说明 | 是否必传 | 类型 | 默认值 |
|--------|------|----------|------|--------|
| url | 要打开的链接地址 | 是 | `string` | - |
| options | 窗口打开选项 | 否 | `object` | `{ target: '_blank' }` |

**返回值：** `Window | null` - 新打开的窗口对象

**Options 配置项：**

- `target`: 窗口打开方式（`_blank`, `_self`, `_parent`, `_top`）
- `features`: 窗口特性（宽度、高度、位置等）

**使用场景：**

- 外部链接打开
- 弹窗功能
- 新页面跳转
- 第三方集成

```ts
import { openWindow } from "@mt-kit/utils";

// 基本使用
openWindow('https://example.com');

// 自定义窗口属性
openWindow('https://example.com', {
  target: '_blank',
  features: 'width=800,height=600,scrollbars=yes,resizable=yes'
});

// 居中打开窗口
const windowFeatures = 'width=600,height=400,left=' + 
  (screen.width / 2 - 300) + ',top=' + (screen.height / 2 - 200);
openWindow('https://example.com', {
  target: '_blank',
  features: windowFeatures
});
```

### cookieHelper

- Cookie 操作助手
- 提供完整的 Cookie 增删改查功能

| 参数名 | 说明 | 是否必传 | 类型 | 默认值 |
|--------|------|----------|------|--------|
| name | Cookie 名称 | 是 | `string` | - |
| value | Cookie 值 | 是 | `string` | - |
| options | Cookie 配置选项 | 否 | `object` | `{}` |

**方法列表：**

- `get(name)`: 获取指定名称的 Cookie
- `set(name, value, options)`: 设置 Cookie
- `remove(name)`: 删除指定名称的 Cookie

**Options 配置项：**

- `expires`: 过期时间（天数）
- `path`: Cookie 路径
- `domain`: Cookie 域名
- `secure`: 是否只在 HTTPS 下传输
- `sameSite`: SameSite 属性

**使用场景：**

- 用户登录状态
- 用户偏好设置
- 购物车数据
- 主题配置

```ts
import { cookieHelper } from "@mt-kit/utils";

// 设置 Cookie
cookieHelper.set('username', 'John', { expires: 7 }); // 7天过期
cookieHelper.set('theme', 'dark', { path: '/', secure: true });

// 获取 Cookie
const username = cookieHelper.get('username');
const theme = cookieHelper.get('theme');

// 删除 Cookie
cookieHelper.remove('username');

// 设置带路径的 Cookie
cookieHelper.set('session', 'abc123', {
  expires: 1,
  path: '/admin',
  secure: true,
  sameSite: 'strict'
});
```

### localStorageHelper

- localStorage 操作助手
- 提供本地存储的增删改查功能，支持 JSON 序列化

| 参数名 | 说明 | 是否必传 | 类型 | 默认值 |
|--------|------|----------|------|--------|
| name | 本地存储的键名 | 是 | `string` | - |
| value | 本地存储的值 | 是 | `any` | - |

**方法列表：**

- `get(name)`: 获取指定名称的本地存储
- `set(name, value)`: 设置本地存储
- `remove(name)`: 删除指定名称的本地存储
- `clear()`: 清空所有数据

**使用场景：**

- 用户数据持久化
- 应用配置存储
- 缓存数据管理
- 离线数据存储

```ts
import { localStorageHelper } from "@mt-kit/utils";

// 设置数据
localStorageHelper.set('user', { name: 'John', age: 30 });
localStorageHelper.set('theme', 'dark');
localStorageHelper.set('settings', { language: 'zh-CN', currency: 'CNY' });

// 获取数据
const user = localStorageHelper.get('user');
const theme = localStorageHelper.get('theme');
const settings = localStorageHelper.get('settings');

// 删除数据
localStorageHelper.remove('user');

// 清空所有数据
localStorageHelper.clear();

// 处理不存在的键
const nonExistent = localStorageHelper.get('nonExistent');
console.log(nonExistent); // null
```

### isElement

- 判断是否为 DOM 元素
- 支持各种 DOM 元素类型检测

| 参数名 | 说明 | 是否必传 | 类型 | 默认值 |
|--------|------|----------|------|--------|
| element | 要检测的元素 | 是 | `any` | - |

**返回值：** `boolean` - 是否为 DOM 元素

**使用场景：**

- DOM 操作前的类型检查
- 事件处理中的元素验证
- 组件库开发
- 工具函数开发

```ts
import { isElement } from "@mt-kit/utils";

// 检测 DOM 元素
const div = document.createElement('div');
console.log(isElement(div)); // true

const span = document.createElement('span');
console.log(isElement(span)); // true

// 检测非 DOM 元素
console.log(isElement({})); // false
console.log(isElement('string')); // false
console.log(isElement(123)); // false
console.log(isElement(null)); // false
console.log(isElement(undefined)); // false

// 在事件处理中使用
document.addEventListener('click', (event) => {
  if (isElement(event.target)) {
    console.log('点击了 DOM 元素:', event.target);
  }
});
```

### isFunction

- 判断是否为函数
- 支持各种函数类型检测（普通函数、箭头函数、构造函数等）

| 参数名 | 说明 | 是否必传 | 类型 | 默认值 |
|--------|------|----------|------|--------|
| fn | 要检测的值 | 是 | `any` | - |

**返回值：** `boolean` - 是否为函数

**使用场景：**

- 回调函数验证
- 高阶函数开发
- 事件处理器检查
- 工具函数开发

```ts
import { isFunction } from "@mt-kit/utils";

// 检测各种函数类型
console.log(isFunction(() => {})); // true - 箭头函数
console.log(isFunction(function() {})); // true - 普通函数
console.log(isFunction(async () => {})); // true - 异步函数
console.log(isFunction(function*() {})); // true - 生成器函数
console.log(isFunction(Array)); // true - 构造函数
console.log(isFunction(Math.max)); // true - 内置函数

// 检测非函数
console.log(isFunction({})); // false
console.log(isFunction('string')); // false
console.log(isFunction(123)); // false
console.log(isFunction(null)); // false
console.log(isFunction(undefined)); // false

// 在回调中使用
function processCallback(callback) {
  if (isFunction(callback)) {
    callback('处理完成');
  } else {
    console.error('回调必须是一个函数');
  }
}
```

### isEqual

- 深度比较两个值是否相等
- 支持对象、数组、基本类型的深度比较

| 参数名 | 说明 | 是否必传 | 类型 | 默认值 |
|--------|------|----------|------|--------|
| a | 要比较的第一个值 | 是 | `any` | - |
| b | 要比较的第二个值 | 是 | `any` | - |

**返回值：** `boolean` - 两个值是否相等

**使用场景：**

- 对象状态比较
- 表单数据验证
- 缓存数据检查
- 组件更新判断

```ts
import { isEqual } from "@mt-kit/utils";

// 基本类型比较
console.log(isEqual(1, 1)); // true
console.log(isEqual('hello', 'hello')); // true
console.log(isEqual(true, true)); // true
console.log(isEqual(null, null)); // true
console.log(isEqual(undefined, undefined)); // true

// 对象深度比较
const objA = { a: 1, b: { c: 2 } };
const objB = { a: 1, b: { c: 2 } };
const objC = { a: 1, b: { c: 3 } };

console.log(isEqual(objA, objB)); // true
console.log(isEqual(objA, objC)); // false

// 数组比较
const arr1 = [1, 2, { a: 3 }];
const arr2 = [1, 2, { a: 3 }];
const arr3 = [1, 2, { a: 4 }];

console.log(isEqual(arr1, arr2)); // true
console.log(isEqual(arr1, arr3)); // false

// 复杂嵌套比较
const complex1 = {
  users: [
    { id: 1, name: 'John', settings: { theme: 'dark' } }
  ],
  config: { api: 'https://api.example.com' }
};

const complex2 = {
  users: [
    { id: 1, name: 'John', settings: { theme: 'dark' } }
  ],
  config: { api: 'https://api.example.com' }
};

console.log(isEqual(complex1, complex2)); // true
```

### isNull

- 判断是否为 null
- 严格检查 null 值，不包括 undefined

| 参数名 | 说明 | 是否必传 | 类型 | 默认值 |
|--------|------|----------|------|--------|
| value | 要检测的值 | 是 | `any` | - |

**返回值：** `boolean` - 是否为 null

**使用场景：**

- 数据验证
- 空值检查
- 条件判断
- 类型守卫

```ts
import { isNull } from "@mt-kit/utils";

// 检测 null
console.log(isNull(null)); // true

// 检测非 null 值
console.log(isNull(undefined)); // false
console.log(isNull(0)); // false
console.log(isNull('')); // false
console.log(isNull(false)); // false
console.log(isNull({})); // false
console.log(isNull([])); // false

// 在条件判断中使用
function processValue(value) {
  if (isNull(value)) {
    console.log('值为 null');
  } else {
    console.log('值不为 null:', value);
  }
}

processValue(null); // 值为 null
processValue('hello'); // 值不为 null: hello
```

### isObject

- 判断是否为对象类型
- 包括普通对象、数组、函数等，但不包括 null

| 参数名 | 说明 | 是否必传 | 类型 | 默认值 |
|--------|------|----------|------|--------|
| value | 要检测的值 | 是 | `any` | - |

**返回值：** `boolean` - 是否为对象类型

**使用场景：**

- 类型检查
- 对象操作前的验证
- 数据结构判断
- 工具函数开发

```ts
import { isObject } from "@mt-kit/utils";

// 检测对象类型
console.log(isObject({})); // true - 普通对象
console.log(isObject([])); // true - 数组
console.log(isObject(() => {})); // true - 函数
console.log(isObject(new Date())); // true - 日期对象
console.log(isObject(/regex/)); // true - 正则表达式

// 检测非对象类型
console.log(isObject(null)); // false
console.log(isObject(undefined)); // false
console.log(isObject('string')); // false
console.log(isObject(123)); // false
console.log(isObject(true)); // false

// 在对象操作中使用
function processData(data) {
  if (isObject(data)) {
    console.log('处理对象数据:', data);
    // 安全地进行对象操作
    Object.keys(data).forEach(key => {
      console.log(`${key}: ${data[key]}`);
    });
  } else {
    console.log('数据不是对象类型');
  }
}
```

### isUndefined

- 判断是否为 undefined
- 严格检查 undefined 值，不包括 null

| 参数名 | 说明 | 是否必传 | 类型 | 默认值 |
|--------|------|----------|------|--------|
| value | 要检测的值 | 是 | `any` | - |

**返回值：** `boolean` - 是否为 undefined

**使用场景：**

- 参数验证
- 可选属性检查
- 条件判断
- 类型守卫

```ts
import { isUndefined } from "@mt-kit/utils";

// 检测 undefined
console.log(isUndefined(undefined)); // true

// 检测非 undefined 值
console.log(isUndefined(null)); // false
console.log(isUndefined(0)); // false
console.log(isUndefined('')); // false
console.log(isUndefined(false)); // false
console.log(isUndefined({})); // false
console.log(isUndefined([])); // false

// 在函数参数中使用
function greet(name, greeting) {
  if (isUndefined(name)) {
    console.log('请提供姓名');
    return;
  }
  
  const message = isUndefined(greeting) ? 'Hello' : greeting;
  console.log(`${message}, ${name}!`);
}

greet(); // 请提供姓名
greet('John'); // Hello, John!
greet('John', 'Hi'); // Hi, John!

// 在对象属性检查中使用
const user = { name: 'John' };
if (isUndefined(user.age)) {
  console.log('年龄未设置');
}
```

### clone

- 浅拷贝对象
- 只复制对象的第一层属性，嵌套对象保持引用

| 参数名 | 说明 | 是否必传 | 类型 | 默认值 |
|--------|------|----------|------|--------|
| value | 要拷贝的值 | 是 | `any` | - |

**返回值：** `any` - 拷贝后的对象

**使用场景：**

- 对象状态备份
- 避免直接修改原对象
- 快速对象复制
- 性能要求较高的场景

```ts
import { clone } from "@mt-kit/utils";

// 基本对象拷贝
const obj = { a: 1, b: { c: 2 } };
const cloned = clone(obj);

console.log(cloned); // { a: 1, b: { c: 2 } }
console.log(cloned === obj); // false - 不是同一个对象
console.log(cloned.b === obj.b); // true - 嵌套对象引用相同

// 数组拷贝
const arr = [1, 2, { x: 3 }];
const clonedArr = clone(arr);
console.log(clonedArr); // [1, 2, { x: 3 }]
console.log(clonedArr === arr); // false
console.log(clonedArr[2] === arr[2]); // true - 嵌套对象引用相同

// 修改拷贝后的对象
cloned.a = 10;
console.log(obj.a); // 1 - 原对象不受影响
console.log(cloned.a); // 10 - 拷贝对象已修改

// 修改嵌套对象
cloned.b.c = 20;
console.log(obj.b.c); // 20 - 原对象的嵌套对象也被修改
console.log(cloned.b.c); // 20 - 拷贝对象的嵌套对象也被修改
```

### cloneDeep

- 深拷贝对象
- 递归复制所有嵌套对象，完全独立于原对象

| 参数名 | 说明 | 是否必传 | 类型 | 默认值 |
|--------|------|----------|------|--------|
| value | 要拷贝的值 | 是 | `any` | - |

**返回值：** `any` - 深拷贝后的对象

**使用场景：**

- 完全独立的对象复制
- 状态管理
- 数据备份
- 避免引用污染

```ts
import { cloneDeep } from "@mt-kit/utils";

// 基本对象深拷贝
const obj = { a: 1, b: { c: 2 } };
const cloned = cloneDeep(obj);

console.log(cloned); // { a: 1, b: { c: 2 } }
console.log(cloned === obj); // false - 不是同一个对象
console.log(cloned.b === obj.b); // false - 嵌套对象也是独立的

// 复杂嵌套对象
const complex = {
  users: [
    { id: 1, profile: { name: 'John', settings: { theme: 'dark' } } }
  ],
  config: { api: 'https://api.example.com' }
};

const clonedComplex = cloneDeep(complex);
console.log(clonedComplex.users[0] === complex.users[0]); // false
console.log(clonedComplex.users[0].profile === complex.users[0].profile); // false

// 修改深拷贝后的对象
cloned.b.c = 20;
console.log(obj.b.c); // 2 - 原对象不受影响
console.log(cloned.b.c); // 20 - 拷贝对象已修改

// 数组深拷贝
const arr = [1, 2, { x: 3, y: { z: 4 } }];
const clonedArr = cloneDeep(arr);
clonedArr[2].y.z = 40;
console.log(arr[2].y.z); // 4 - 原数组不受影响
console.log(clonedArr[2].y.z); // 40 - 拷贝数组已修改
```

### debounce

- 创建一个防抖函数，延迟调用函数直到上一次调用后的一段时间已经过去
- 适用于频繁触发的事件，如搜索输入、窗口调整等

| 参数名 | 说明 | 是否必传 | 类型 | 默认值 |
|--------|------|----------|------|--------|
| fn | 要防抖的函数 | 是 | `Function` | - |
| wait | 延迟时间（毫秒） | 是 | `number` | - |
| options | 配置选项 | 否 | `object` | `{}` |

**返回值：** `Function` - 防抖后的函数

**Options 配置项：**

- `leading`: 是否在延迟开始前调用
- `trailing`: 是否在延迟结束后调用
- `maxWait`: 最大等待时间

**使用场景：**

- 搜索输入防抖
- 窗口大小调整
- 按钮点击防抖
- API 请求优化

```ts
import { debounce } from "@mt-kit/utils";

// 搜索输入防抖
const debouncedSearch = debounce((query) => {
  console.log('搜索:', query);
  fetchSearchResults(query);
}, 300);

// 在输入框中使用
const input = document.getElementById('search');
input.addEventListener('input', (e) => {
  debouncedSearch(e.target.value);
});

// 窗口大小调整防抖
const debouncedResize = debounce(() => {
  console.log('窗口大小已调整');
  updateLayout();
}, 250);

window.addEventListener('resize', debouncedResize);

// 按钮点击防抖
const debouncedClick = debounce(() => {
  console.log('按钮被点击');
  submitForm();
}, 1000);

document.getElementById('submitBtn').addEventListener('click', debouncedClick);

// 带配置选项的防抖
const debouncedWithOptions = debounce((data) => {
  console.log('处理数据:', data);
}, 500, {
  leading: true,  // 立即执行第一次
  trailing: true, // 延迟结束后执行
  maxWait: 2000   // 最大等待 2 秒
});
```

### throttle

- 创建一个节流函数，限制函数在一段时间内只能调用一次
- 适用于需要定期执行但不想过于频繁的场景

| 参数名 | 说明 | 是否必传 | 类型 | 默认值 |
|--------|------|----------|------|--------|
| fn | 要节流的函数 | 是 | `Function` | - |
| wait | 节流时间（毫秒） | 是 | `number` | - |
| options | 配置选项 | 否 | `object` | `{}` |

**返回值：** `Function` - 节流后的函数

**Options 配置项：**

- `leading`: 是否在节流开始前调用
- `trailing`: 是否在节流结束后调用

**使用场景：**

- 滚动事件节流
- 鼠标移动事件
- 动画更新
- 性能优化

```ts
import { throttle } from "@mt-kit/utils";

// 滚动事件节流
const throttledScroll = throttle(() => {
  console.log('滚动位置更新');
  updateScrollPosition();
}, 100);

// 在滚动事件中使用
window.addEventListener('scroll', throttledScroll);

// 鼠标移动节流
const throttledMouseMove = throttle((event) => {
  console.log('鼠标位置:', event.clientX, event.clientY);
  updateMousePosition(event);
}, 16); // 约 60fps

document.addEventListener('mousemove', throttledMouseMove);

// 窗口大小调整节流
const throttledResize = throttle(() => {
  console.log('窗口大小调整');
  updateLayout();
}, 200);

window.addEventListener('resize', throttledResize);

// 带配置选项的节流
const throttledWithOptions = throttle((data) => {
  console.log('处理数据:', data);
}, 500, {
  leading: true,  // 立即执行第一次
  trailing: true  // 节流结束后执行
});

// 动画更新节流
const throttledAnimation = throttle(() => {
  updateAnimationFrame();
}, 16); // 60fps

function startAnimation() {
  const animate = () => {
    throttledAnimation();
    requestAnimationFrame(animate);
  };
  animate();
}
```

### omitBy

- 创建一个从对象中排除满足条件的属性的新对象
- 根据条件函数过滤对象属性

| 参数名 | 说明 | 是否必传 | 类型 | 默认值 |
|--------|------|----------|------|--------|
| obj | 源对象 | 是 | `object` | - |
| condition | 用于判断是否排除属性的条件函数 | 是 | `Function` | - |

**返回值：** `object` - 过滤后的新对象

**使用场景：**

- 对象属性过滤
- 数据清理
- 条件性属性排除
- 对象转换

```ts
import { omitBy } from "@mt-kit/utils";

// 基本使用 - 排除值大于 2 的属性
const sampleObject = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
};

const result = omitBy(sampleObject, (value) => value > 2);
console.log(result); // { a: 1, b: 2 }

// 排除空值
const dataWithEmpty = {
  name: 'John',
  age: 30,
  email: '',
  phone: null,
  address: undefined
};

const cleanedData = omitBy(dataWithEmpty, (value) => 
  value === '' || value === null || value === undefined
);
console.log(cleanedData); // { name: 'John', age: 30 }

// 排除特定类型的属性
const mixedData = {
  id: 1,
  name: 'John',
  isActive: true,
  createdAt: new Date(),
  tags: ['admin', 'user']
};

const stringOnly = omitBy(mixedData, (value) => typeof value !== 'string');
console.log(stringOnly); // { name: 'John' }

// 排除特定键名的属性
const userData = {
  id: 1,
  name: 'John',
  password: 'secret',
  email: 'john@example.com',
  token: 'abc123'
};

const publicData = omitBy(userData, (value, key) => 
  key === 'password' || key === 'token'
);
console.log(publicData); // { id: 1, name: 'John', email: 'john@example.com' }
```

### objectValueToString

- 将对象的值转换为字符串
- 保持对象结构不变，只转换值类型

| 参数名 | 说明 | 是否必传 | 类型 | 默认值 |
|--------|------|----------|------|--------|
| obj | 源对象 | 是 | `object` | - |

**返回值：** `object` - 值转换为字符串的新对象

**使用场景：**

- 数据序列化准备
- 表单数据处理
- API 参数转换
- 数据格式统一

```ts
import { objectValueToString } from "@mt-kit/utils";

// 基本使用
const obj = {
  id: 123,
  active: true,
  score: 98.5
};

const stringified = objectValueToString(obj);
console.log(stringified);
// 输出: { id: '123', active: 'true', score: '98.5' }

// 复杂对象
const complexObj = {
  user: {
    id: 1,
    name: 'John',
    age: 30,
    isActive: true
  },
  settings: {
    theme: 'dark',
    notifications: false,
    language: 'zh-CN'
  },
  scores: [85, 92, 78]
};

const stringifiedComplex = objectValueToString(complexObj);
console.log(stringifiedComplex);
// 输出: {
//   user: { id: '1', name: 'John', age: '30', isActive: 'true' },
//   settings: { theme: 'dark', notifications: 'false', language: 'zh-CN' },
//   scores: ['85', '92', '78']
// }

// 处理特殊值
const specialObj = {
  nullValue: null,
  undefinedValue: undefined,
  emptyString: '',
  zero: 0,
  falseValue: false
};

const stringifiedSpecial = objectValueToString(specialObj);
console.log(stringifiedSpecial);
// 输出: {
//   nullValue: 'null',
//   undefinedValue: 'undefined',
//   emptyString: '',
//   zero: '0',
//   falseValue: 'false'
// }
```

### IframeMessage

- 创建一个 iframe 通信工具，与内嵌的页面进行双向通讯
- 支持父子页面之间的消息传递和事件监听

**主要方法：**

- `createIframe(url)`: 创建 iframe 元素
- `postMessage(message)`: 发送消息
- `onMessage(callback)`: 监听消息
- `removeMessageListener(callback)`: 移除消息监听

**使用场景：**

- 跨域页面通信
- 微前端架构
- 嵌入式应用
- 父子页面数据同步

**调用界面（父页面）：**

```tsx
import { JSX, useCallback, useMemo } from "react";
import { IframeMessage } from "@mt-kit/utils";

export default function DemoIframeMessage(): JSX.Element {
  const url = "http://localhost:5173/";

  const iframe = useMemo(() => {
    const communicator = new IframeMessage();
    communicator.createIframe(url);
    return communicator;
  }, [url]);

  const handleClick = useCallback(() => {
    iframe.postMessage({
      type: "message",
      data: {
        name: "hello",
        age: 18
      }
    });
  }, [iframe]);

  return (
    <div>
      <p>iframe 通信</p>
      <button onClick={handleClick}>传值</button>
    </div>
  );
}
```

**接收通信（子页面）：**

```vue
<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import { Message, IframeMessage } from "@mt-kit/utils";

const iframe = new IframeMessage();

const handleMessage = (e: Message): void => {
  console.log('收到消息:', e);
  
  // 处理不同类型的消息
  switch (e.type) {
    case 'message':
      console.log('数据:', e.data);
      break;
    case 'command':
      console.log('命令:', e.data);
      break;
  }
};

onMounted(() => {
  iframe.onMessage(handleMessage);
});

onUnmounted(() => {
  iframe.removeMessageListener(handleMessage);
});
</script>

<template>
  <div>
    <h1>子页面</h1>
    <p>等待接收消息...</p>
  </div>
</template>
```

**双向通信示例：**

```ts
// 父页面
const iframe = new IframeMessage();
iframe.createIframe('http://localhost:5173/');

// 监听子页面消息
iframe.onMessage((message) => {
  console.log('父页面收到:', message);
});

// 发送消息到子页面
iframe.postMessage({
  type: 'userData',
  data: { userId: 123, name: 'John' }
});

// 子页面
const iframe = new IframeMessage();

// 监听父页面消息
iframe.onMessage((message) => {
  console.log('子页面收到:', message);
  
  // 回复消息给父页面
  iframe.postMessage({
    type: 'response',
    data: { status: 'received' }
  });
});
```

### flattenAndSort

将对象扁平化为键值对并按键排序，确保输出结果的确定性。

**参数：**

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| `obj` | `Record<string, unknown>` | ✅ | - | 要扁平化的对象 |
| `prefix` | `string` | ❌ | `""` | 键前缀，用于嵌套对象的键名 |

**返回值：**

| 类型 | 说明 |
|------|------|
| `Record<string, string>` | 扁平化的对象，所有值都转换为字符串 |

**特性：**

- **确定性输出**: 通过按键排序确保相同输入产生相同输出
- **递归处理**: 自动处理嵌套对象
- **类型安全**: 所有值统一转换为字符串
- **空值处理**: `undefined` 和 `null` 转换为空字符串

**使用示例：**

```typescript
import { flattenAndSort } from '@mt-kit/utils';

// 基础用法
const obj = {
  name: 'John',
  age: 30,
  address: {
    city: 'New York',
    country: 'USA'
  }
};

const result = flattenAndSort(obj);
// 结果: {
//   "address.city": "New York",
//   "address.country": "USA", 
//   "age": "30",
//   "name": "John"
// }

// 带前缀
const resultWithPrefix = flattenAndSort(obj, 'user');
// 结果: {
//   "user.address.city": "New York",
//   "user.address.country": "USA",
//   "user.age": "30", 
//   "user.name": "John"
// }
```

**应用场景：**

- 对象序列化前的预处理
- 生成确定性哈希值
- 对象比较和去重
- 配置文件的扁平化处理

---

### arrayBufferToBase64

将 ArrayBuffer 转换为 Base64 字符串，提供安全高效的转换。

**参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `buffer` | `ArrayBuffer` | ✅ | 要转换的 ArrayBuffer |

**返回值：**

| 类型 | 说明 |
|------|------|
| `string` | Base64 编码的字符串，失败时返回空字符串 |

**特性：**

- **容错处理**: 输入无效时返回空字符串，不抛出异常
- **高效转换**: 使用 `String.fromCharCode` 进行安全转换
- **类型验证**: 自动验证输入是否为有效的 ArrayBuffer
- **错误日志**: 失败时输出警告信息便于调试

**使用示例：**

```typescript
import { arrayBufferToBase64 } from '@mt-kit/utils';

// 基础用法
const buffer = new ArrayBuffer(8);
const view = new Uint8Array(buffer);
view[0] = 72; // 'H'
view[1] = 101; // 'e'
view[2] = 108; // 'l'
view[3] = 108; // 'l'
view[4] = 111; // 'o'

const base64 = arrayBufferToBase64(buffer);
console.log(base64); // "SGVsbG8="

// 错误处理
const invalid = arrayBufferToBase64(null as any);
console.log(invalid); // ""

// 从文件读取
const file = new File(['Hello'], 'test.txt');
const reader = new FileReader();
reader.onload = (e) => {
  const base64 = arrayBufferToBase64(e.target?.result as ArrayBuffer);
  console.log(base64);
};
reader.readAsArrayBuffer(file);
```

**应用场景：**

- 文件上传前的编码
- 图片数据处理
- 二进制数据传输
- 加密数据存储

---

### sha256Base64

将字符串转换为 SHA-256 哈希的 Base64 编码，提供安全的哈希功能。

**参数：**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `str` | `string` | ✅ | 要哈希的字符串 |

**返回值：**

| 类型 | 说明 |
|------|------|
| `Promise<string>` | Base64 编码的 SHA-256 哈希值 |

**特性：**

- **异步处理**: 使用 Web Crypto API 进行异步哈希计算
- **安全算法**: 使用 SHA-256 算法确保安全性
- **Base64 输出**: 直接输出 Base64 编码，便于存储和传输
- **错误处理**: 哈希失败时抛出错误，便于上层处理

**使用示例：**

```typescript
import { sha256Base64 } from '@mt-kit/utils';

// 基础用法
const hash = await sha256Base64('Hello World');
console.log(hash); // "pZGm1Av0IEBKARCz7JZcLAuUx7QgTz+ekpJZeBc7uT0="

// 密码哈希
const password = 'myPassword123';
const passwordHash = await sha256Base64(password);
console.log(passwordHash);

// 文件内容哈希
const fileContent = 'file content here';
const fileHash = await sha256Base64(fileContent);
console.log(fileHash);

// 错误处理
try {
  const hash = await sha256Base64('test');
  console.log(hash);
} catch (error) {
  console.error('哈希生成失败:', error);
}
```

**应用场景：**

- 密码存储和验证
- 数据完整性校验
- 唯一标识符生成
- 缓存键生成

---

### createDedupedRequest

创建一个带请求去重功能的函数包装器，支持在指定时间窗口内多次调用同一个函数时，只有第一次会真正向后端请求，其它调用会等待第一次请求完成，并拿到相同结果。请求完成后会清除缓存，确保下次调用时重新请求。

**参数：**

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| `fn` | `(...args: unknown[]) => Promise<unknown>` | ✅ | - | 要包装的函数 |
| `cacheWindow` | `number` | ❌ | 500 | 时间窗口（毫秒），默认 500ms |

**返回值：**

| 类型 | 说明 |
|------|------|
| `(...args: unknown[]) => Promise<unknown>` | 返回一个函数，该函数返回一个 Promise，解析为包装函数的返回值 |

**使用示例：**

```typescript
import { 
  createDedupedRequest
} from '@mt-kit/utils';

const dataList = () => {
  return fetch("https://api.example.com/data").then(res => res.json());
};

const dedupedDataList = createDedupedRequest(dataList);

dedupedDataList().then(res => {
  console.log(res, "res");
}).catch(error => {
  console.error(error, "error");
});
```

**应用场景：**

- 防止重复请求
- 提高性能
- 减少服务器压力
- 确保数据一致性

**注意事项：**

- 时间窗口不能小于 0 毫秒，默认 500 毫秒
- 时间窗口不能大于 60000 毫秒，默认 60 秒

---

### getAvailableFonts

检测系统中可用的字体列表，支持批量检测和容错处理。

**参数：**

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| `fontList` | `string[]` | ❌ | `COMMON_FONTS` | 要检测的字体列表 |

**返回值：**

| 类型 | 说明 |
|------|------|
| `string[]` | 可用的字体列表 |

**特性：**

- **Canvas 检测**: 使用 Canvas 2D 上下文进行字体检测
- **批量处理**: 支持同时检测多个字体
- **容错机制**: 单个字体检测失败不影响其他字体
- **精度控制**: 使用宽度差异阈值避免浮点数精度问题
- **详细日志**: 提供检测过程和结果的详细日志

**使用示例：**

```typescript
import { getAvailableFonts } from '@mt-kit/utils';

// 检测常用字体
const availableFonts = getAvailableFonts();
console.log(availableFonts); // ['Arial', 'Helvetica', 'Times New Roman', ...]

// 检测自定义字体列表
const customFonts = ['CustomFont', 'AnotherFont', 'Arial'];
const available = getAvailableFonts(customFonts);
console.log(available); // ['Arial'] (假设其他字体不可用)

// 空列表处理
const empty = getAvailableFonts([]);
console.log(empty); // []
```

**检测原理：**

1. 使用回退字体测量基准宽度
2. 使用目标字体测量文本宽度
3. 比较宽度差异，超过阈值则认为字体可用
4. 阈值设置为 0.1px，避免浮点数精度问题

**应用场景：**

- 字体回退策略
- 设备指纹生成
- 字体兼容性检测
- 动态字体加载

---

### measureTextWidthDom

使用 DOM 元素测量文本宽度，提供精确的文本尺寸测量。

**参数：**

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| `text` | `string` | ✅ | - | 要测量的文本 |
| `font` | `string` | ✅ | - | 字体样式 |
| `size` | `string` | ❌ | `FONT_CONFIG.size` | 字体大小 |

**返回值：**

| 类型 | 说明 |
|------|------|
| `number` | 文本宽度（像素），测量失败返回 -1 |

**特性：**

- **DOM 测量**: 使用真实的 DOM 元素进行测量
- **样式隔离**: 创建隐藏元素避免影响页面布局
- **强制重排**: 确保样式生效后再测量
- **自动清理**: 测量完成后自动移除临时元素
- **错误处理**: 测量失败时返回 -1

**使用示例：**

```typescript
import { measureTextWidthDom } from '@mt-kit/utils';

// 基础用法
const width = measureTextWidthDom('Hello World', 'Arial');
console.log(width); // 82.5

// 自定义字体大小
const width2 = measureTextWidthDom('Test', 'Times New Roman', '16px');
console.log(width2); // 24.8

// 错误处理
const invalid = measureTextWidthDom('', 'InvalidFont');
console.log(invalid); // -1
```

**应用场景：**

- 文本布局计算
- 字体检测
- 动态宽度调整
- 文本溢出处理

---

### measureTextWidthCanvas

使用 Canvas 2D 上下文测量文本宽度，提供高性能的文本尺寸测量。

**参数：**

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| `text` | `string` | ✅ | - | 要测量的文本 |
| `font` | `string` | ✅ | - | 字体样式 |
| `size` | `string` | ❌ | `FONT_CONFIG.size` | 字体大小 |

**返回值：**

| 类型 | 说明 |
|------|------|
| `number` | 文本宽度（像素），测量失败返回 -1 |

**特性：**

- **Canvas 测量**: 使用 Canvas 2D 上下文进行测量
- **高性能**: 不操作 DOM，性能优于 DOM 方法
- **高精度**: 设置固定 Canvas 尺寸确保测量精度
- **错误处理**: 测量失败时返回 -1
- **类型安全**: 验证测量结果的数值有效性

**使用示例：**

```typescript
import { measureTextWidthCanvas } from '@mt-kit/utils';

// 基础用法
const width = measureTextWidthCanvas('Hello World', 'Arial');
console.log(width); // 82.5

// 自定义字体大小
const width2 = measureTextWidthCanvas('Test', 'Times New Roman', '16px');
console.log(width2); // 24.8

// 批量测量
const texts = ['Short', 'Medium Length Text', 'Very Long Text Here'];
const widths = texts.map(text => measureTextWidthCanvas(text, 'Arial'));
console.log(widths); // [32.5, 95.2, 158.7]
```

**Canvas vs DOM 对比：**

| 特性 | Canvas | DOM |
|------|--------|-----|
| 性能 | ✅ 高 | ❌ 低 |
| 精度 | ✅ 高 | ✅ 高 |
| 兼容性 | ✅ 好 | ✅ 好 |
| 内存使用 | ✅ 低 | ❌ 高 |
| 布局影响 | ✅ 无 | ❌ 有 |

**应用场景：**

- 字体检测（推荐）
- 批量文本测量
- 性能敏感场景
- 字体指纹生成

### createContainer

- 创建容器
- 支持自定义元素插入到容器中
- 支持追加到容器中
- 支持追加到 body
- 支持追加到指定元素

**参数：**

| 参数 | 说明 | 是否必传 | 默认值 |
|--------|------|----------|--------|
| positionOptions | 位置选项 | 否 | 所有功能启用 |
| append | 是否追加到容器中 | 否 | false |
| customElement | 自定义元素 | 否 | 无 |

**返回值：**

| 类型 | 说明 |
|--------|------|
| `{ remove: () => void; element: HTMLDivElement; }` | 容器 |

**positionOptions 参数：**

| 参数 | 说明 | 是否必传 | 默认值 |
|--------|------|----------|--------|
| position | 位置 | 否 | 无 |

**append 参数：**

| 参数 | 说明 | 是否必传 | 默认值 |
|--------|------|----------|--------|
| append | 是否追加到容器中 | 否 | false |

**customElement 参数：**

| 参数 | 说明 | 是否必传 | 默认值 |
|--------|------|----------|--------|
| customElement | 自定义元素 | 否 | 无 |

**使用示例：**

```ts
import { createContainer } from "@mt-kit/utils";

const container = createContainer();
console.log(container);
```

### uuid

- 生成唯一的 ID
- 使用 Date.now() 和 Math.random() 生成唯一的 ID
- 使用 slice(2, 15) 生成唯一的 ID
- 使用 _ 连接
- 使用 toString(36) 生成唯一的 ID

```ts
import { uuid } from "@mt-kit/utils";

const id = uuid();
console.log(id);
```

### queue

- 消息队列
- 支持两种模式：
- 串行模式：按顺序执行，一个完成后再执行下一个
- 持续防抖模式：一段时间内有新请求就取消前面的，只保留最后一个，且只有在最后一次请求结束后的一段时间内没有新请求，才真正执行

**参数：**

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| `fn` | `() => Promise<unknown>` | ✅ | - | 要执行的函数 |
| `options` | `IQueueOptions` | ❌ | - | 配置选项 |

**返回值：**

| 类型 | 说明 |
|------|------|
| `Promise<T>` | 返回一个 Promise，解析为函数的返回值 |

**使用示例：**

- 数据请求

```ts
const test01Fetch = () => {
  return fetch("https://api.example.com/data").then(res => res.json());
};

const test02Fetch = () => {
  return fetch("https://api.example.com/data").then(res => res.json());
};

const test03Fetch = () => {
  return fetch("https://api.example.com/data").then(res => res.json());
};
```

- 串行模式：按顺序执行，一个完成后再执行下一个

```ts
import { 
  queue 
} from "@mt-kit/utils";

const result01 = queue(test01Fetch);
const result02 = queue(test02Fetch);
const result03 = queue(test03Fetch);

result01.then(res => {
  console.log(res);
});
result02.then(res => {
  console.log(res);
});
result03.then(res => {
  console.log(res);
});
```

- 持续防抖模式：一段时间内有新请求就取消前面的，只保留最后一个，且只有在最后一次请求结束后的一段时间内没有新请求，才真正执行

```ts
import { 
  queue 
} from "@mt-kit/utils";

const result01 = queue(test01Fetch, {
  duration: 1000
});

const result02 = queue(test02Fetch, {
  duration: 1000
});

const result03 = queue(test03Fetch, {
  duration: 1000
});

result01.then(res => {
  console.log(res);
});
result02.then(res => {
  console.log(res);
});
result03.then(res => {
  console.log(res);
});
```

## 设备信息

### deviceAll

- 获取所有设备信息（包括同步和异步信息）

| 参数名 | 说明 | 是否必传 | 默认值 |
|--------|------|----------|--------|
| options | 配置选项，可禁用某些功能 | 否 | 所有功能启用 |

返回类型：`Promise<IDeviceAll>`

**Options 配置项：**

- `operatingSystem`: 是否获取操作系统信息
- `browser`: 是否获取浏览器信息
- `language`: 是否获取语言信息
- `onLine`: 是否获取在线状态
- `screen`: 是否获取屏幕信息
- `cpuCores`: 是否获取CPU核心数
- `hardwareConcurrency`: 是否获取硬件并发数
- `memory`: 是否获取内存信息
- `features`: 是否获取设备特性
- `sensor`: 是否获取传感器信息
- `i18n`: 是否获取国际化信息
- `location`: 是否获取地理位置（异步）
- `publicIp`: 是否获取公网IP（异步）

```ts
import { deviceAll } from "@mt-kit/utils";

// 获取完整设备信息
const allDeviceInfo = await deviceAll();
console.log(allDeviceInfo);

// 禁用某些功能
const basicInfo = await deviceAll({
  location: false,    // 不获取地理位置
  publicIp: false,   // 不获取公网IP
  memory: false      // 不获取内存信息
});

// 只获取基础信息
const minimalInfo = await deviceAll({
  operatingSystem: true,
  browser: true,
  language: true,
  onLine: true,
  screen: false,
  cpuCores: false,
  hardwareConcurrency: false,
  memory: false,
  features: false,
  sensor: false,
  i18n: false,
  location: false,
  publicIp: false
});
```

### deviceOperatingSystem

- 获取操作系统信息

| 参数名 | 说明 | 是否必传 |
|--------|------|----------|
| 无 | 无参数 | - |

```ts
import { deviceOperatingSystem } from "@mt-kit/utils";

const os = deviceOperatingSystem();
console.log(os); // "Windows", "macOS", "Linux", "Android", "iOS", "unknown"
```

### deviceBrowser

- 获取浏览器信息

| 参数名 | 说明 | 是否必传 |
|--------|------|----------|
| 无 | 无参数 | - |

返回类型：`IBrowser`

```ts
import { deviceBrowser } from "@mt-kit/utils";

const browser = deviceBrowser();
console.log(browser); // { name: "Chrome", version: "120.0.0.0" }
```

### deviceLanguage

- 获取浏览器语言

| 参数名 | 说明 | 是否必传 |
|--------|------|----------|
| 无 | 无参数 | - |

```ts
import { deviceLanguage } from "@mt-kit/utils";

const language = deviceLanguage();
console.log(language); // "zh-CN", "en-US", etc.
```

### deviceOnLine

- 获取在线状态

| 参数名 | 说明 | 是否必传 |
|--------|------|----------|
| 无 | 无参数 | - |

```ts
import { deviceOnLine } from "@mt-kit/utils";

const isOnline = deviceOnLine();
console.log(isOnline); // true or false
```

### deviceScreen

- 获取屏幕信息

| 参数名 | 说明 | 是否必传 |
|--------|------|----------|
| 无 | 无参数 | - |

返回类型：`IScreen`

```ts
import { deviceScreen } from "@mt-kit/utils";

const screen = deviceScreen();
console.log(screen);
// {
//   width: 1920,
//   height: 1080,
//   availWidth: 1920,
//   availHeight: 1040,
//   colorDepth: 24,
//   pixelDepth: 24,
//   devicePixelRatio: 1
// }
```

### deviceLocation

- 获取地理位置信息（需要用户授权）

| 参数名 | 说明 | 是否必传 | 返回值 |
|--------|------|----------|--------|
| 无 | 无参数 | - | `{ latitude: number, longitude: number }` |

返回类型：`Promise<ILocation>`

**返回值说明：**

- `latitude`: 纬度，范围 -90 到 90
- `longitude`: 经度，范围 -180 到 180

**失败情况：**

- **定位服务不可用**：返回 `{ latitude: 0, longitude: 0 }`
- **用户拒绝授权**：返回 `{ latitude: -1, longitude: -1 }`
- **超时**：返回 `{ latitude: -1, longitude: -1 }`
- **其他错误**：返回 `{ latitude: -1, longitude: -1 }`

```ts
import { deviceLocation } from "@mt-kit/utils";

deviceLocation().then(location => {
  if (location.latitude === -1 && location.longitude === -1) {
    console.log("定位失败或用户拒绝授权");
  } else {
    console.log(`位置: ${location.latitude}, ${location.longitude}`);
  }
});
```

### devicePublicIp

**IP查询服务列表：**

1. `https://api.ipify.org?format=json` - 官方服务，稳定可靠
2. `https://ipapi.co/json/` - 官方 API，功能丰富
3. `https://ipinfo.io/json` - 官方服务，数据准确
4. `https://api.ip.sb/geoip` - 开源项目，稳定
5. `https://httpbin.org/ip` - 官方测试服务

**服务特点：**

- 按顺序尝试，成功即停止
- 总超时时间：15秒
- 单个服务超时：5秒
- 全部失败时返回 `127.0.0.1`

| 参数名 | 说明 | 是否必传 | 返回值 |
|--------|------|----------|--------|
| 无 | 无参数 | - | `string` |

返回类型：`Promise<string>`

**返回值说明：**

- 成功时：返回公网IP地址字符串，如 `"203.208.60.1"`
- 失败时：返回本地IP地址 `"127.0.0.1"` 作为容错处理
- 可能包含位置信息：`"203.208.60.1 (北京市)"`

```ts
import { devicePublicIp } from "@mt-kit/utils";

devicePublicIp().then(ip => {
  console.log(ip); // "127.0.0.1" (获取失败时返回本地IP)
});
```

### deviceCpuCores

- 获取CPU核心数

| 参数名 | 说明 | 是否必传 |
|--------|------|----------|
| 无 | 无参数 | - |

```ts
import { deviceCpuCores } from "@mt-kit/utils";

const cores = deviceCpuCores();
console.log(cores); // 8
```

### deviceMemory

- 获取内存信息

| 参数名 | 说明 | 是否必传 |
|--------|------|----------|
| 无 | 无参数 | - |

返回类型：`IMemory`

```ts
import { deviceMemory } from "@mt-kit/utils";

const memory = deviceMemory();
console.log(memory);
// {
//   usedJSHeapSize: 43.18,
//   totalJSHeapSize: 46.07,
//   jsHeapSizeLimit: 4095.75,
//   deviceMemory: 8
// }
```

### deviceHardwareConcurrency

- 获取硬件并发数

| 参数名 | 说明 | 是否必传 |
|--------|------|----------|
| 无 | 无参数 | - |

```ts
import { deviceHardwareConcurrency } from "@mt-kit/utils";

const concurrency = deviceHardwareConcurrency();
console.log(concurrency); // 8
```

### deviceFeatures

- 获取设备特性支持

| 参数名 | 说明 | 是否必传 |
|--------|------|----------|
| 无 | 无参数 | - |

返回类型：`IFeatures`

```ts
import { deviceFeatures } from "@mt-kit/utils";

const features = deviceFeatures();
console.log(features);
// {
//   touchSupport: true,
//   maxTouchPoints: 5,
//   vibrate: true,
//   webglSupport: true,
//   webrtcSupport: true
// }
```

### deviceSensor

- 获取传感器支持

| 参数名 | 说明 | 是否必传 |
|--------|------|----------|
| 无 | 无参数 | - |

返回类型：`ISensor`

```ts
import { deviceSensor } from "@mt-kit/utils";

const sensor = deviceSensor();
console.log(sensor);
// {
//   accelerometer: true,
//   gyroscope: true,
//   magnetometer: false,
//   ambientLight: false,
//   barometer: false
// }
```

### deviceI18n

- 获取国际化信息

| 参数名 | 说明 | 是否必传 |
|--------|------|----------|
| 无 | 无参数 | - |

返回类型：`II18n`

```ts
import { deviceI18n } from "@mt-kit/utils";

const i18n = deviceI18n();
console.log(i18n);
// {
//   timeZone: "Asia/Shanghai",
//   daylightSaving: false,
//   numberFormat: "1,234.56",
//   currencyFormat: "¥1,234.56",
//   dateFormat: "2024/1/1",
//   timeFormat: "14:30:00"
// }
```

## 获取设备指纹

### fingerprint

生成综合设备指纹，整合多种指纹信息创建唯一标识符。

**参数：**

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| `strength` | `boolean` | ❌ | `true` | 是否生成强指纹（包含屏幕信息） |

**返回值：**

| 类型 | 说明 |
|------|------|
| `Promise<string>` | SHA-256 哈希的 Base64 编码指纹字符串 |

**指纹组成：**

- **设备信息**: 操作系统、浏览器、屏幕等基础信息
- **Canvas 指纹**: 基于 Canvas 渲染的像素数据
- **WebGL 指纹**: 显卡硬件信息
- **音频指纹**: 音频处理特征
- **字体指纹**: 可用字体列表
- **国际化信息**: 时区、语言、数字格式等

**特性：**

- **综合指纹**: 整合多种指纹信息提高唯一性
- **确定性**: 相同环境产生相同指纹
- **容错处理**: 单个指纹失败不影响整体结果
- **强度控制**: 可选择是否包含屏幕信息

**使用示例：**

```typescript
import { fingerprint } from '@mt-kit/utils';

// 生成强指纹（包含屏幕信息）
const strongFingerprint = await fingerprint(true);
console.log(strongFingerprint); // "a1b2c3d4e5f6..."

// 生成弱指纹（不包含屏幕信息）
const weakFingerprint = await fingerprint(false);
console.log(weakFingerprint); // "x1y2z3a4b5c6..."

// 默认强指纹
const defaultFingerprint = await fingerprint();
console.log(defaultFingerprint); // "m1n2o3p4q5r6..."
```

**指纹稳定性：**

| 因素 | 影响程度 | 说明 |
|------|----------|------|
| 屏幕分辨率 | 🔴 高 | 改变分辨率会改变指纹 |
| 浏览器版本 | 🟡 中 | 更新可能影响指纹 |
| 操作系统 | 🔴 高 | 不同系统指纹不同 |
| 硬件配置 | 🔴 高 | 显卡、音频设备影响指纹 |
| 字体安装 | 🟡 中 | 字体变化影响指纹 |

**应用场景：**

- 用户身份识别
- 设备唯一标识
- 反爬虫检测
- 用户行为分析
- 安全验证

**注意事项：**

- 指纹可能因环境变化而改变
- 建议结合其他身份验证方式
- 遵守隐私法规，明确告知用户
- 定期更新指纹算法以提高安全性

<details>

<summary>生成指纹的原理 API 列表</summary>

#### fingerprintFonts

生成字体指纹，通过检测可用字体列表创建设备指纹。

**参数：**

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| `fonts` | `string[]` | ❌ | `COMMON_FONTS` | 要检测的字体列表 |

**返回值：**

| 类型 | 说明 |
|------|------|
| `string` | 可用字体列表的逗号分隔字符串 |

**特性：**

- **字体检测**: 基于 Canvas 2D 上下文检测字体可用性
- **批量处理**: 支持检测多个字体
- **容错机制**: 单个字体检测失败不影响整体结果
- **确定性输出**: 相同字体列表产生相同结果

**使用示例：**

```typescript
import { fingerprintFonts } from '@mt-kit/utils';

// 检测默认字体列表
const fontFingerprint = fingerprintFonts();
console.log(fontFingerprint); // "Arial,Helvetica,Times New Roman,Georgia"

// 检测自定义字体列表
const customFonts = ['CustomFont', 'AnotherFont', 'Arial'];
const customFingerprint = fingerprintFonts(customFonts);
console.log(customFingerprint); // "Arial" (假设其他字体不可用)
```

**应用场景：**

- 设备指纹生成
- 字体兼容性检测
- 浏览器环境识别
- 反爬虫检测

---

#### fingerprintCanvas

生成 Canvas 指纹，通过渲染特定内容获取设备特定的渲染特征。

**参数：**

无参数

**返回值：**

| 类型 | 说明 |
|------|------|
| `string` | Canvas 渲染数据的像素值字符串，失败时返回空字符串 |

**特性：**

- **渲染指纹**: 基于 Canvas 2D 渲染结果生成指纹
- **固定内容**: 使用固定的文本和样式确保一致性
- **像素采样**: 提取特定位置的像素值作为指纹
- **容错处理**: 渲染失败时返回空字符串

**渲染内容：**

- 文本: 使用固定字体渲染特定文本
- 图形: 绘制矩形和半透明文本
- 采样: 提取前 100 个像素的 RGB 值

**使用示例：**

```typescript
import { fingerprintCanvas } from '@mt-kit/utils';

// 生成 Canvas 指纹
const canvasFingerprint = fingerprintCanvas();
console.log(canvasFingerprint); // "255,0,0,0,0,255,102,204,0,..."

// 错误处理
if (!canvasFingerprint) {
  console.warn('Canvas 指纹生成失败');
}
```

**技术原理：**

1. 创建 200x50 像素的 Canvas
2. 设置固定的字体和样式
3. 渲染文本和图形内容
4. 提取图像数据的 RGB 像素值
5. 按固定间隔采样并拼接成字符串

**应用场景：**

- 设备指纹生成
- 浏览器环境识别
- 反爬虫检测
- 用户行为分析

---

#### fingerprintWebgl

生成 WebGL 指纹，通过获取显卡信息创建硬件指纹。

**参数：**

无参数

**返回值：**

| 类型 | 说明 |
|------|------|
| `string` | WebGL 厂商和渲染器信息，失败时返回空字符串 |

**特性：**

- **硬件指纹**: 基于显卡硬件信息生成指纹
- **调试扩展**: 使用 `WEBGL_debug_renderer_info` 扩展获取详细信息
- **厂商信息**: 包含显卡厂商和渲染器型号
- **容错处理**: 不支持时返回空字符串

**获取信息：**

- **厂商**: 显卡厂商名称（如 NVIDIA、AMD、Intel）
- **渲染器**: 显卡型号和驱动信息

**使用示例：**

```typescript
import { fingerprintWebgl } from '@mt-kit/utils';

// 生成 WebGL 指纹
const webglFingerprint = fingerprintWebgl();
console.log(webglFingerprint); // "NVIDIA Corporation~NVIDIA GeForce RTX 3080/PCIe/SSE2"

// 检查支持情况
if (!webglFingerprint) {
  console.warn('WebGL 调试扩展不支持');
}
```

**兼容性：**

- **桌面浏览器**: Chrome、Firefox、Safari 支持较好
- **移动浏览器**: 支持有限，很多移动浏览器禁用此扩展
- **隐私模式**: 可能被禁用或返回受限信息

**应用场景：**

- 设备指纹生成
- 硬件环境识别
- 反爬虫检测
- 用户设备分析

---

#### fingerprintAudio

生成音频指纹，通过音频处理获取设备特定的音频特征。

**参数：**

无参数

**返回值：**

| 类型 | 说明 |
|------|------|
| `Promise<string>` | 音频处理数据的样本值字符串，失败时返回空字符串 |

**特性：**

- **音频处理**: 基于 Web Audio API 生成音频指纹
- **离线渲染**: 使用 OfflineAudioContext 避免播放音频
- **固定参数**: 使用固定的音频参数确保一致性
- **样本采样**: 提取特定位置的音频样本值

**音频配置：**

- **采样率**: 44.1kHz
- **声道数**: 单声道
- **振荡器**: 三角波，1000Hz
- **压缩器**: 固定参数配置

**使用示例：**

```typescript
import { fingerprintAudio } from '@mt-kit/utils';

// 生成音频指纹
const audioFingerprint = await fingerprintAudio();
console.log(audioFingerprint); // "0.1,0.2,0.3,0.4,0.5,..."

// 错误处理
try {
  const fingerprint = await fingerprintAudio();
  if (!fingerprint) {
    console.warn('音频指纹生成失败');
  }
} catch (error) {
  console.error('音频处理错误:', error);
}
```

**技术原理：**

1. 创建 OfflineAudioContext
2. 生成三角波振荡器
3. 通过动态压缩器处理音频
4. 离线渲染音频数据
5. 提取特定间隔的样本值

**应用场景：**

- 设备指纹生成
- 音频环境识别
- 反爬虫检测
- 用户设备分析

---

</details>
