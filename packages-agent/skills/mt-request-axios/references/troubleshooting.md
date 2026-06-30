# 排错指南

## 返回数据不是预期结构

先检查 `responseReturn`：

- 想拿完整响应：用 `raw`。
- 想拿 body：用 `body`。
- 想拿业务 data：用 `data`，并配置 `defaultResponseInterceptor` 的 `codeField`、`dataField`、`code`。

## 业务成功码不是 0

配置：

```ts
defaultResponseInterceptor({
  code: 200
});
```

或传函数：

```ts
defaultResponseInterceptor({
  code: code => code === "SUCCESS"
});
```

## 401 后重复刷新 token

`authenticateResponseInterceptor` 内部用 `client.isRefreshing` 和 `refreshTokenQueue` 防止重复刷新。排查：

- `defaultResponseInterceptor` 是否在 `authenticateResponseInterceptor` 之前添加，以便业务 `code=401` 能被抛给认证拦截器。
- 是否传入同一个 `client` 实例。
- 是否开启 `enableRefreshToken`。
- 是否设置了 `config.__isRetryRequest` 后仍重复触发。
- `doRefreshToken` 失败时是否正确执行 `doReAuthenticate`。

## 错误提示重复出现

检查是否同时有：

- 项目原有 axios interceptor。
- `errorMessageResponseInterceptor`。
- UI 框架全局错误提示。

保留一个统一出口即可。

## 上传失败

检查：

- `data.file` 是否存在。
- POST 上传是否需要 `multipart/form-data`。
- PUT 直传是否需要特定 headers，例如对象存储签名要求。
- 大文件上传时优先考虑 PUT 直传。

## 下载失败

检查：

- 是否设置 `responseType: "blob"`。
- 是否需要 `responseReturn: "raw"` 获取 headers。
- 是否用下载工具处理 Blob，例如 `downloadDataFile`。

## 参数序列化不符合后端要求

改用 `paramsSerializer`：

- 数组参数需要 `ids[]=1&ids[]=2`：使用 `brackets`。
- 后端要逗号：使用 `comma`。
- 后端要下标：使用 `indices`。
- 后端要重复 key：使用 `repeat`。
