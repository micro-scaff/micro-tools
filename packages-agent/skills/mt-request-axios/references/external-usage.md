# 外部项目使用约定

当本 skill 被复制到其他项目使用时，先按这里判断上下文。

## 基本原则

- 优先读取目标项目自己的 `package.json`、锁文件、已有请求封装和 API 响应格式。
- 从 npm 包名导入 `@mt-kit/request-axios`，不引用 `micro-tools` 仓库里的 `packages-fetch/request-axios/src`。
- 不假设外部项目使用 pnpm、workspace、catalog 或本仓库脚本。
- 不急着替换全部请求代码，先选择一个接口或一个业务模块做最小接入。
- 如果目标项目正在本地 link 未发布包，先说明这是 link/workspace 场景，再按该项目的 link 方式排查。

## 包管理器

文档示例默认使用 pnpm。外部项目应换成项目已有包管理器：

```bash
npm install @mt-kit/request-axios
pnpm add @mt-kit/request-axios
yarn add @mt-kit/request-axios
bun add @mt-kit/request-axios
```

不要为了使用 MT 包强行迁移包管理器。

## 验证建议

优先使用目标项目已有单测、页面联调或最小 API 调用。重点验证 `responseReturn`、业务 code、token 刷新和错误提示是否符合项目预期。
