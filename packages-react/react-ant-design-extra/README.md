# @mt-kit/react-ant-design-extra

[![npm version](https://img.shields.io/npm/v/@mt-kit/react-ant-design-extra.svg?style=for-the-badge&labelColor=2c3e50&color=3498db&logo=npm&logoColor=white)](https://www.npmjs.com/package/@mt-kit/react-ant-design-extra)
[![GitHub stars](https://img.shields.io/github/stars/micro-scaff/micro-tools?style=for-the-badge&labelColor=2c3e50&color=e74c3c&logo=github&logoColor=white)](https://github.com/micro-scaff/micro-tools/tree/main/packages-react/react-ant-design-extra)
[![GitHub issues](https://img.shields.io/github/issues/micro-scaff/micro-tools?style=for-the-badge&labelColor=2c3e50&color=27ae60&logo=github&logoColor=white)](https://github.com/micro-scaff/micro-tools/issues)
[![License](https://img.shields.io/github/license/micro-scaff/micro-tools?style=for-the-badge&labelColor=2c3e50&color=9b59b6&logo=opensourceinitiative&logoColor=white)](https://github.com/micro-scaff/micro-tools/blob/main/LICENSE)
[![Documentation](https://img.shields.io/badge/docs-online-blue?style=for-the-badge&labelColor=2c3e50&color=3498db&logoColor=white)](https://micro-scaff.github.io/)

基于 Ant Design 的 React 组件库，提供增强的 UI 组件和工具。

## 🪟 弹出窗

一个功能强大的弹窗组件，支持 Modal 和 Drawer 两种模式，提供 Promise 化的 API 和完整的表单验证支持。

### 特性

- 🎯 **双模式支持**：Modal 和 Drawer 两种展示模式
- 🚀 **Promise 化 API**：支持 async/await 语法
- 📝 **表单验证**：内置 Ant Design Form 支持
- 🎨 **自定义按钮**：支持自定义按钮和事件处理
- 🔒 **状态管理**：内置加载、锁定等状态管理
- 📱 **响应式设计**：支持不同屏幕尺寸
- 🎭 **动画支持**：流畅的打开/关闭动画

### 安装

```bash
npm install @mt-kit/react-ant-design-extra
# 或
yarn add @mt-kit/react-ant-design-extra
# 或
pnpm add @mt-kit/react-ant-design-extra
```

### 基础用法

```tsx
import React from 'react';
import { Button } from 'antd';
import { open, EMode, ESize } from '@mt-kit/react-ant-design-extra';

const App = () => {
  const handleClick = () => {
    open({
      title: '基础弹窗',
      content: <div>这是弹窗内容</div>,
      mode: EMode.MODAL,
      size: ESize.M
    });
  };

  return <Button onClick={handleClick}>打开弹窗</Button>;
};
```

### API

#### open(props)

打开弹窗的主要方法。

**参数：**

| 参数 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| op | `string` | - | 记录当前操作类型（便于埋点等） |
| title | `string \| ReactElement` | - | 弹窗标题 |
| titleExtra | `string \| ReactElement` | - | 标题右侧额外内容 |
| buttonsExtra | `ReactElement[]` | - | 底部额外按钮区域 |
| content | `string \| ReactElement` | - | 弹窗内容 |
| mode | `DialogMode` | `DialogMode.MODAL` | 展示模式：模态框或抽屉 |
| size | `number \| DialogSize` | - | 尺寸，支持枚举 `DialogSize` 或自定义像素值 |
| classNameOnBody | `string` | - | 容器（Body）附加类名 |
| backdrop | `boolean` | `true` | 是否显示背投（遮罩） |
| backdropClosable | `boolean` | `true` | 点击遮罩是否允许关闭 |
| closable | `boolean` | `true` | 是否显示右上角关闭按钮 |
| esc | `boolean` | - | 是否允许 ESC 关闭 |
| zIndex | `number` | - | 弹窗的 zIndex |
| data | `D \| () => Promise<D \| unknown \| string \| undefined \| number \| Record<string, unknown>>` | - | 初始数据或异步拉取函数（当为 Promise 时，会自动显示加载状态） |
| onClose | `(result?: T \| Error, defaultResult?: D) => void` | - | 关闭回调（`defaultResult` 为销毁时默认值） |
| onSubmit | `(result?: D, defaultResult?: D) => Promise<Record<string, unknown> \| undefined \| T>` | - | 提交回调，返回 `T` 或对象 |
| isSubmit | `boolean` | `true` | 已废弃：为 `false` 时仅展示关闭（查看/详情） |
| ok | `IButtonProps \| string` | - | 确认按钮配置或文案 |
| cancel | `IButtonProps \| string` | - | 取消按钮配置或文案 |
| options | `Partial<Omit<DrawerProps, TExcludedProps>> \| Partial<Omit<ModalProps, TExcludedProps>>` | - | 透传 antd 抽屉/模态框属性（与已存在同名属性冲突时以上述 props 为准） |

#### DialogMode

弹窗模式枚举：

```tsx
enum DialogMode {
  MODAL = 'modal',    // 模态框
  DRAWER = 'drawer'   // 抽屉
}
```

#### DialogSize

尺寸枚举：

```tsx
enum ESize {
  S = 300,    // 小尺寸
  M = 400,    // 中尺寸
  L = 600,    // 大尺寸
  XL = 800    // 超大尺寸
}
```

### 高级用法

#### 表单验证

```tsx
import React from 'react';
import { Form, Input, Button } from 'antd';
import { open, DialogMode, useForm } from '@mt-kit/react-ant-design-extra';

const FormContent = () => {
  const [form, initData, currentData ] = useForm();

  return (
    <Form
      form={form}
      initialValues={initData}
    >
      <Form.Item
        name="username"
        label="用户名"
        rules={[{ required: true, message: '请输入用户名' }]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="email"
        label="邮箱"
        rules={[
          { required: true, message: '请输入邮箱' },
          { type: 'email', message: '请输入正确的邮箱格式' }
        ]}
      >
        <Input />
      </Form.Item>
    </Form>
  );
};

const App = () => {
  const handleSubmit = async (data: Record<string, unknown>) => {
    // 模拟 API 请求
    const result = await fetch('/api/submit', {
      method: 'POST',
      body: JSON.stringify(data)
    });
    return result.json();
  };

  const handleClick = () => {
    open({
      title: '用户信息',
      content: <FormContent />,
      mode: DialogMode.DRAWER,
      onSubmit: handleSubmit
    }).then(result => {
      console.log('提交成功:', result);
    }).catch(error => {
      console.error('提交失败:', error);
    });
  };

  return <Button onClick={handleClick}>打开表单弹窗</Button>;
};
```

#### 自定义按钮

```tsx
import React from 'react';
import { Button, Space } from 'antd';
import { open } from '@mt-kit/react-ant-design-extra';

const App = () => {
  const handleClick = () => {
    open({
      title: '自定义按钮弹窗',
      content: <div>弹窗内容</div>,
      buttonsExtra: [
        <Button key="save" type="primary">保存草稿</Button>,
        <Button key="preview">预览</Button>
      ],
      ok: {
        label: '确认提交',
        type: 'primary',
        danger: true
      },
      cancel: '取消'
    });
  };

  return <Button onClick={handleClick}>打开自定义按钮弹窗</Button>;
};
```

#### 不同模式示例

```tsx
import React from 'react';
import { Button, Space } from 'antd';
import { open } from '@mt-kit/react-ant-design-extra';

const App = () => {
  const openModal = () => {
    open({
      title: '模态框',
      content: <div>这是模态框内容</div>
    });
  };

  const openDrawer = () => {
    open({
      title: '抽屉',
      content: <div>这是抽屉内容</div>,
    });
  };

  return (
    <Space>
      <Button onClick={openModal}>打开模态框</Button>
      <Button onClick={openDrawer}>打开抽屉</Button>
    </Space>
  );
};
```

#### 异步数据与键盘/遮罩行为

```tsx
import React from 'react';
import { Button } from 'antd';
import { open, EMode, ESize } from '@mt-kit/react-ant-design-extra';

const App = () => {
  const handleClick = () => {
    open({
      title: '异步数据示例',
      mode: EMode.MODAL,
      size: ESize.S,
      // 异步拉取数据
      data: async () => {
        const res = await fetch('/api/detail');
        return res.json();
      },
      // 键盘与遮罩行为
      esc: true,
      backdrop: true,
      backdropClosable: false,
      content: <div>内容会基于 data 渲染</div>
    });
  };

  return <Button onClick={handleClick}>打开异步数据弹窗</Button>;
};
```

#### 透传 antd 选项（options）

```tsx
import React from 'react';
import { Button } from 'antd';
import { open, EMode, ESize } from '@mt-kit/react-ant-design-extra';

const App = () => {
  const openDrawer = () => {
    open({
      title: '自定义抽屉',
      mode: EMode.DRAWER,
      size: ESize.L,
      options: {
        placement: 'right',
        width: 520,
        destroyOnClose: true
      }
    });
  };

  return <Button onClick={openDrawer}>打开右侧抽屉</Button>;
};
```

### 注意事项

1. **表单验证**：使用 `useForm` hook 时，确保将 `form` 实例传递给 `Form` 组件
2. **异步操作**：`onSubmit` 函数应该返回 Promise，支持 async/await
3. **错误处理**：表单验证失败或提交失败时会自动处理错误状态
4. **内存管理**：弹窗关闭时会自动清理相关资源
