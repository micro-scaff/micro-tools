# 接入配方

## 安装

```bash
pnpm add @mt-kit/request-axios
```

非 pnpm 项目使用自己的包管理器。

## 基础实例

```ts
import RequestClient from "@mt-kit/request-axios";

const client = new RequestClient({
  baseURL: "https://api.example.com",
  timeout: 10_000,
  responseReturn: "data",
  paramsSerializer: "brackets"
});

const users = await client.get("/users");
```

## 类型使用

```ts
import RequestClient, {
  type RequestClientOptions
} from "@mt-kit/request-axios";

const options: RequestClientOptions = {
  baseURL: "/api"
};

const client = new RequestClient(options);
```

## 上传文件

```ts
await client.upload("/upload", {
  file,
  bizType: "avatar"
});
```

PUT 直传：

```ts
await client.upload("/signed-url", {
  file
}, {
  method: "put"
});
```

## 下载文件

```ts
const blob = await client.download("/export");
```

如需完整响应：

```ts
const response = await client.download("/export", {
  responseReturn: "raw"
});
```

## 外部项目检查清单

- 从 `@mt-kit/request-axios` 包名导入。
- 保留项目已有认证、错误提示、loading 机制，再逐步接入拦截器。
- 后端响应结构不是 `{ code, data, message }` 时，要配置 `defaultResponseInterceptor`。
- 文件上传下载不要复用普通 JSON headers。
