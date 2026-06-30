# 拦截器配方

## 默认响应拦截器

```ts
import {
  defaultResponseInterceptor
} from "@mt-kit/request-axios";

client.addResponseInterceptor(defaultResponseInterceptor({
  codeField: "code",
  dataField: "data",
  code: 0
}));
```

如果业务成功码不是固定值，可以传函数：

```ts
client.addResponseInterceptor(defaultResponseInterceptor({
  code: code => code === 0 || code === 200
}));
```

如果要返回整个 body：

```ts
client.addResponseInterceptor(defaultResponseInterceptor({
  dataField: undefined
}));
```

## 错误提示拦截器

```ts
import {
  errorMessageResponseInterceptor
} from "@mt-kit/request-axios";

client.addResponseInterceptor(errorMessageResponseInterceptor({
  client,
  errorFn: message => {
    console.error(message);
  },
  options: {
    message: {
      networkErrorMsg: "网络异常",
      timeoutMsg: "请求超时",
      unauthorizedMsg: "登录已过期"
    }
  }
}));
```

## 401 token 刷新

```ts
import {
  authenticateResponseInterceptor,
  formatToken
} from "@mt-kit/request-axios";

client.addResponseInterceptor(authenticateResponseInterceptor({
  client,
  enableRefreshToken: true,
  formatToken,
  doRefreshToken: async () => {
    const token = await refreshToken();
    return token;
  },
  doReAuthenticate: async () => {
    await logout();
  },
  options: {
    codeField: "code",
    code: 401
  }
}));
```

## 顺序建议

通常按下面顺序添加响应拦截器：

1. 默认响应解析。
2. 认证/token 刷新。
3. 错误提示。

原因：`defaultResponseInterceptor` 会根据 `responseReturn`、HTTP status 和业务 `code` 解析响应；当业务 `code` 表示未授权时，它会抛出响应对象，后续 `authenticateResponseInterceptor` 才能在 rejected 分支中执行刷新 token 逻辑。HTTP 401 这类 Axios 原生 rejected 错误也会继续进入后续 rejected 分支。

如果项目已有全局错误处理，先确认是否会重复弹出提示。
