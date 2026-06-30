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
    rejected: async (error): Promise<void> => {
      const {
        config,
        data: responseData
      } = error;

      const {
        codeField = Field.CODE,
        code = Status.StatusUnauthorized
      } = options || {};

      const status = responseData ? responseData?.[codeField] : error?.status;

      // 如果不是 401 错误，直接抛出异常
      if (status !== code) {
        throw error;
      }

      // 判断是否启用了 refreshToken 功能
      // 如果没有启用或者已经是重试请求了，直接跳转到重新登录
      if (!enableRefreshToken || config.__isRetryRequest) {
        await doReAuthenticate?.();
        console.error("Re-authenticate failed, please login again.");

        throw error;
      }

      // 如果正在刷新 token，则将请求加入队列，等待刷新完成
      if (client.isRefreshing) {
        return new Promise(resolve => {
          client.refreshTokenQueue.push((newToken: string) => {
            config.headers.Authorization = formatToken ? formatToken(newToken) : newToken;
            resolve(client.request(config.url, {
              ...config
            }));
          });
        });
      }

      // 标记开始刷新 token
      client.isRefreshing = true;

      // 标记当前请求为重试请求，避免无限循环
      config.__isRetryRequest = true;

      try {
        const newToken = await doRefreshToken();

        // 处理队列中的请求
        client.refreshTokenQueue.forEach(callback => {
          return callback(newToken);
        });

        // 清空队列
        client.refreshTokenQueue = [];

        return client.request(error.config.url, {
          ...error.config
        });
      } catch (refreshError) {

        // 如果刷新 token 失败，处理错误（如强制登出或跳转登录页面）
        client.refreshTokenQueue.forEach(callback => {
          return callback("");
        });
        client.refreshTokenQueue = [];
        console.error("Refresh token failed, please login again.");
        await doReAuthenticate?.();

        throw refreshError;
      } finally {
        client.isRefreshing = false;
      }
    }
  };
};

export default authenticateResponseInterceptor;
