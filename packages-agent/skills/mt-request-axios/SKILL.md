---
name: mt-request-axios
description: 当需要在内部或外部项目中接入、使用、定制或排查 @mt-kit/request-axios 时使用。覆盖 RequestClient、get/post/put/delete/request、responseReturn、paramsSerializer、请求/响应拦截器、默认响应处理、错误提示、401 token 刷新、文件上传下载和 axios 兼容问题。
---

# MT Request Axios

## 快速开始

使用本 skill 处理 `@mt-kit/request-axios`。它是基于 Axios 的请求客户端封装，提供统一请求方法、响应处理、错误提示、token 刷新、上传下载和类型定义。

先判断任务类型：

- 新项目接入请求客户端：读 `integration-recipes.md`。
- 查 API 和导出：读 `api-map.md`。
- 配置响应处理、错误提示、token 刷新：读 `interceptor-recipes.md`。
- 排查请求异常、返回结构、上传下载：读 `troubleshooting.md`。

## 工作流程

1. 检查目标项目是否已经使用 axios，以及是否有现存请求封装。
2. 确认安装 `@mt-kit/request-axios`，外部项目从包名导入，不引用源码路径。
3. 创建 `RequestClient` 实例，明确 `baseURL`、`timeout`、`responseReturn`、`paramsSerializer`。
4. 按业务响应格式接入 `defaultResponseInterceptor`。
5. 按认证需求接入 `authenticateResponseInterceptor`。
6. 按 UI 提示机制接入 `errorMessageResponseInterceptor`。
7. 对上传下载场景分别使用 `upload` 和 `download`，不要混用普通 JSON 请求配置。

## 参考资料

- `references/api-map.md`：导出 API、类型和请求方法。
- `references/integration-recipes.md`：基础接入、实例创建和调用模板。
- `references/interceptor-recipes.md`：内置拦截器配置模板。
- `references/troubleshooting.md`：常见请求、响应、token、上传下载问题。
