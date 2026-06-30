# 外部项目使用约定

当本 skill 被复制到其他项目使用时，先按这里判断上下文。

## 基本原则

- 优先读取目标项目自己的 `package.json`、锁文件、构建配置和源码入口。
- 从 npm 包名导入 React 包，不引用 `micro-tools` 仓库里的 `packages-react/*/src`。
- 不假设外部项目使用 pnpm、workspace、catalog 或本仓库脚本。
- 先接入最小需要的包，再按报错补 React、React DOM、React Router、Ant Design 或样式依赖。
- 如果目标项目正在本地 link 未发布包，先说明这是 link/workspace 场景，再按该项目的 link 方式排查。

## 包管理器

文档示例默认使用 pnpm。外部项目应换成项目已有包管理器，例如：

```bash
npm install @mt-kit/react-hooks react react-router-dom
pnpm add @mt-kit/react-hooks react react-router-dom
yarn add @mt-kit/react-hooks react react-router-dom
bun add @mt-kit/react-hooks react react-router-dom
```

不要为了使用 MT 包强行迁移包管理器。

## 验证建议

优先使用目标项目已有 `build`、`typecheck`、`storybook` 或页面联调。没有现成脚本时，再补最小导入验证。
