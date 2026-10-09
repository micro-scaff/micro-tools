import {
  Field,
  Status
} from "../enum";
import {
  RequestClient
} from "../request-client";
import {
  ResponseInterceptorConfig,
  AuthenticateResponseInterceptorOptions
} from "../types";

/**
 * 处理 401 未授权错误，并尝试刷新 token
 */
const authenticateResponseInterceptor = ({
  client,
  doReAuthenticate,
  doRefreshToken,
  enableRefreshToken,
  formatToken,
  options
}: {

  /**
   * 请求客户端
   */
  client: RequestClient;

  /**
   * 重新认证逻辑
   *
   * 退出登陆处理
   */
  doReAuthenticate?: () => Promise<void>;

  /**
   * 刷新 token 逻辑
   */
  doRefreshToken: () => Promise<string>;

  /**
   * 是否启用 refreshToken 功能
   *
   * 默认是关闭的
   */
  enableRefreshToken?: boolean;

  /**
   * 格式化 token 的函数
   */
  formatToken?: (token: string) => null | string;

  /**
   * 请求客户端选项
   */
  options?: AuthenticateResponseInterceptorOptions;

}): ResponseInterceptorConfig => {
  return {
    rejected: async (error): Promise<unknown> => {
      const {
        config,
        data: responseData
      } = error;

      const {
        codeField = Field.CODE,
        code = Status.StatusUnauthorized
      } = options || {};

      const status = responseData ? responseData?.[codeField] : error?.status;

      const isUnauthorized = typeof code === "function"
        ? code(status)
        : status === code;

      // 如果不是 401 错误，直接抛出异常
      if (!isUnauthorized) {
        throw error;
      }

      // 判断是否启用了 refreshToken 功能
      // 如果没有启用或者已经是重试请求了，直接跳转到重新登录
      if (!enableRefreshToken || config.__isRetryRequest) {
        await doReAuthenticate?.();
        console.error("Re-authenticate failed, please login again.");

        throw error;
      }

      /**
       * 只创建一次刷新 Promise，后续 401 直接等待同一个结果。
       * 刷新状态在 token 请求结束时立即复位，不再覆盖各个业务请求的重试生命周期。
       */
      if (!client.refreshTokenPromise) {
        client.isRefreshing = true;

        // 通过微任务调用可同时捕获“返回 rejected Promise”和“同步 throw”两类刷新失败。
        // eslint-disable-next-line unicorn/prefer-promise-try -- Promise.try 尚未获得目标浏览器的稳定支持
        client.refreshTokenPromise = Promise.resolve().then(() => {
          return doRefreshToken();
        }).then(newToken => {
          if (!newToken) {
            throw new Error("刷新 Token 返回了空值");
          }

          return newToken;
        }).catch(async refreshError => {
          console.error("Refresh token failed, please login again.");
          await doReAuthenticate?.();

          throw refreshError;
        }).finally(() => {
          client.isRefreshing = false;
          client.refreshTokenPromise = null;

          // 保留旧公开字段的兼容性，同时确保历史队列引用不会继续累积。
          client.refreshTokenQueue = [];
        });
      }

      const newToken = await client.refreshTokenPromise;

      // 每一个等待刷新结果的请求都必须标记为重试，防止新 Token 无效时再次进入刷新流程。
      config.__isRetryRequest = true;
      config.headers.Authorization = formatToken ? formatToken(newToken) : newToken;

      return client.request(config.url, {
        ...config
      });
    }
  };
};

export default authenticateResponseInterceptor;
