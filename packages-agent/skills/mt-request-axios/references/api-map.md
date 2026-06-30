# API 映射

## 导出

```ts
export { default as axios } from "axios";
export * from "./enum";
export * from "./types";
export { formatToken } from "./utils";
export {
  authenticateResponseInterceptor,
  defaultResponseInterceptor,
  errorMessageResponseInterceptor
} from "./preset-interceptors";
export { RequestClient as default } from "./request-client";
```

## 默认导出

`RequestClient` 是默认导出：

```ts
import RequestClient from "@mt-kit/request-axios";
```

## 类型导出

包根入口会透出 `./types`，常用类型包括：

- `RequestClientOptions`
- `RequestClientConfig`
- `RequestResponse`
- `RequestInterceptorConfig`
- `ResponseInterceptorConfig`
- `DefaultResponseInterceptorOptions`
- `AuthenticateResponseInterceptorOptions`
- `ErrorMessageResponseInterceptorOptions`
- `UploadData`

## 请求方法

`RequestClient` 实例提供：

- `request<T>(url, config)`
- `get<T, Q>(url, params?, config?)`
- `post<T, Q>(url, data?, config?)`
- `put<T, Q>(url, data?, config?)`
- `delete<T, Q>(url, data?, config?)`
- `upload<T>(url, data, config?)`
- `download<T>(url, config?)`
- `addRequestInterceptor(...)`
- `addResponseInterceptor(...)`

`delete` 的第二个参数是 `data`，不是 `params`。如果要发 query string，请放在第三个参数的 `params` 中。

## RequestClientOptions

继承 Axios `CreateAxiosDefaults`，并扩展：

- `responseReturn?: "raw" | "body" | "data"`
- `paramsSerializer?: "brackets" | "comma" | "indices" | "repeat" | Axios paramsSerializer`

`responseReturn`：

- `raw`：返回完整 AxiosResponse。
- `body`：返回 response body，不做业务 code 判断。
- `data`：默认值，检查 HTTP 状态和业务 code 后返回数据字段。

`paramsSerializer`：

- `brackets`：`ids[]=1&ids[]=2`
- `comma`：`ids=1,2`
- `indices`：`ids[0]=1&ids[1]=2`
- `repeat`：`ids=1&ids=2`

## 上传下载

- `upload<T>(url, data, config?)` 的 `data` 必须包含 `file` 字段。
- `upload` 默认用 `post` 和 `FormData`；`config.method: "put"` 时直接上传文件内容。
- PUT 直传会默认加 `x-amz-acl: public-read` 和文件 `Content-Type`，适合签名 URL 类场景。
- `download<T>(url, config?)` 默认 `method: "get"`、`responseReturn: "body"`、`responseType: "blob"`。
- `download` 需要完整响应时传 `responseReturn: "raw"`。
