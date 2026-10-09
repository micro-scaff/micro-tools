# @mt-kit/vue-element-plus-extra

[![npm version](https://img.shields.io/npm/v/@mt-kit/vue-element-plus-extra.svg?style=for-the-badge&labelColor=2c3e50&color=3498db&logo=npm&logoColor=white)](https://www.npmjs.com/package/@mt-kit/vue-element-plus-extra)
[![GitHub stars](https://img.shields.io/github/stars/micro-scaff/micro-tools?style=for-the-badge&labelColor=2c3e50&color=e74c3c&logo=github&logoColor=white)](https://github.com/micro-scaff/micro-tools/tree/main/packages-vue/vue-element-plus-extra)
[![GitHub issues](https://img.shields.io/github/issues/micro-scaff/micro-tools?style=for-the-badge&labelColor=2c3e50&color=27ae60&logo=github&logoColor=white)](https://github.com/micro-scaff/micro-tools/issues)
[![License](https://img.shields.io/github/license/micro-scaff/micro-tools?style=for-the-badge&labelColor=2c3e50&color=9b59b6&logo=opensourceinitiative&logoColor=white)](https://github.com/micro-scaff/micro-tools/blob/main/LICENSE)
[![Documentation](https://img.shields.io/badge/docs-online-blue?style=for-the-badge&labelColor=2c3e50&color=3498db&logoColor=white)](https://micro-scaff.github.io/)

基于 Element Plus 的 Vue 组件库，提供增强的 UI 组件和工具。

## 安装

```bash
pnpm add @mt-kit/vue-element-plus-extra
# 或
yarn add @mt-kit/vue-element-plus-extra
# 或
npm install @mt-kit/vue-element-plus-extra
```

## 🪟 弹出窗

一个功能强大的弹窗组件，支持 Modal 和 Drawer 两种模式，提供 Promise 化的 API 和完整的表单验证支持。

### 特性

- 🎯 **双模式支持**：Modal 和 Drawer 两种展示模式
- 🚀 **Promise 化 API**：支持 async/await 语法
- 📝 **表单验证**：内置 Element Plus Form 支持
- 🎨 **自定义按钮**：支持自定义按钮和事件处理
- 🔒 **状态管理**：内置加载、锁定等状态管理
- 📱 **响应式设计**：支持不同屏幕尺寸
- 🎭 **动画支持**：流畅的打开/关闭动画

### 使用

```vue
<script lang="ts" setup>
import {
  ElButton
} from 'element-plus';
import { 
  open
} from '@mt-kit/vue-element-plus-extra';

const handleClick = () => {
  open({
    title: '基础弹窗',
    content: '这是弹窗内容',
    mode: DialogMode.MODAL
  });
};
</script>

<template>
  <ElButton @click="handleClick">打开弹窗</ElButton>
</template>
```

### API

#### open(props)

打开弹窗的主要方法。

**参数：**

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| op | `string` | - | 记录当前操作类型（便于埋点等） |
| title | `string \| VNode` | - | 弹窗标题 |
| titleExtra | `string \| VNode` | - | 标题右侧额外内容 |
| footerExtra | `VNode \| string` | - | 底部额外按钮区域 |
| content | `string \| VNode` | - | 弹窗内容 |
| mode | `DialogMode` | `DialogMode.MODAL` | 展示模式：模态框或抽屉 |
| size | `number \| ESize` | - | 尺寸，支持枚举 `ESize` 或自定义像素值 |
| classNameOnBody | `string` | - | 容器（Body）附加类名 |
| backdrop | `boolean` | `true` | 是否显示背投（遮罩） |
| backdropClosable | `boolean` | `true` | 点击遮罩是否允许关闭 |
| closable | `boolean` | `true` | 是否显示右上角关闭按钮 |
| esc | `boolean` | - | 是否允许 ESC 关闭 |
| zIndex | `number` | - | 弹窗的 zIndex |
| data | `D \| () => Promise<D \| unknown \| string \| undefined \| number \| Record<string, unknown>>` | - | 初始数据或异步拉取函数（当为 Promise 时，会自动显示加载状态）|
| onClose | `(result?: T \| Error \| unknown, defaultData?: D) => void` | - | 关闭回调 |
| onSubmit | `(result?: D, defaultData?: D) => Promise<Record<string, unknown> \| undefined \| T \| boolean>` | - | 提交回调，返回 `T` 或对象 |
| isSubmit | `boolean` | `true` | 已废弃：为 `false` 时仅展示关闭（查看/详情） |
| ok | `IButtonProps \| string` | - | 确认按钮配置或文案 |
| cancel | `IButtonProps \| string` | - | 取消按钮配置或文案 |
| options | `Partial<Omit<DrawerProps, TExcludedProps>> \| Partial<Omit<ModalProps, TExcludedProps>>` | - | 透传 Element Plus 抽屉/模态框属性（与已存在同名属性冲突时以上述 props 为准） |

#### DialogMode

弹窗模式枚举：

```ts
enum DialogMode {
  MODAL = 'modal',    // 模态框
  DRAWER = 'drawer'   // 抽屉
}

enum DialogSize {
  S = 300,    // 小尺寸
  M = 400,    // 中尺寸
  L = 600,    // 大尺寸
  XL = 800    // 超大尺寸
  XXL = 1000   // 超大尺寸
  AUTO = 'auto', // 自动
  ALMOST_FULL = 'almost-full', // 几乎全屏
  FULL = 'full' // 全屏
}
```

## 🔔 消息提示

基于 Element Plus `ElMessage` 的单例消息控制器，保证同一时刻仅显示一条消息，并提供“替换”语义以在单例下刷新最新消息。

### 快速使用

```vue
<script lang="ts" setup>
import { ElButton } from "element-plus";
import { messages } from "@mt-kit/vue-element-plus-extra";

const handleSingleton = () => {
  // 单例：已有消息则复用，不会新建
  messages.error("单例消息");
};

const handleReplace = () => {
  // 替换：关闭当前并在关闭后展示最新消息
  messages.error("新的消息", { replace: true });
};
</script>

<template>
  <ElButton @click="handleSingleton">单例消息</ElButton>
  <ElButton @click="handleReplace">单例消息（替换）</ElButton>
</template>
```

### API

- `messages.show(options: string | IEnhancedMessageOptions): MessageHandler`
- `messages.success(message: string, options?: IEnhancedMessageOptions): MessageHandler`
- `messages.warning(message: string, options?: IEnhancedMessageOptions): MessageHandler`
- `messages.error(message: string, options?: IEnhancedMessageOptions): MessageHandler`
- `messages.info(message: string, options?: IEnhancedMessageOptions): MessageHandler`
- `messages.close(): void` 手动关闭当前消息
- `messages.isShowing(): boolean` 是否正在显示消息

#### IEnhancedMessageOptions

在 `ElMessage` 的 `MessageOptions` 基础上，新增：

- `replace?: boolean` 是否用新消息替换当前正在显示的消息，默认 `false`

> 设计说明：当当前有消息且 `replace=true` 时，控制器会先关闭当前消息，等待关闭结束后再展示最新待替换的消息，以确保同屏不出现多条消息同时又能“刷新”展示。
