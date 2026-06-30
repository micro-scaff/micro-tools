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
