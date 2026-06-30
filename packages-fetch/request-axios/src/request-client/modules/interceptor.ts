import {
  AxiosInstance,
  AxiosResponse
} from "axios";

import {
  RequestInterceptorConfig,
  ResponseInterceptorConfig
} from "../../types";

// 默认的请求拦截器配置
const defaultRequestInterceptorConfig: RequestInterceptorConfig = {
  fulfilled: response => {
    return response;
  }, // 请求成功时的处理函数
  rejected: error => {
    return Promise.reject(error);
  } // 请求失败时的处理函数
};

// 默认的响应拦截器配置
const defaultResponseInterceptorConfig: ResponseInterceptorConfig = {
  fulfilled: (response: AxiosResponse) => {
    return response;
  }, // 响应成功时的处理函数
  rejected: error => {
    return Promise.reject(error);
  } // 响应失败时的处理函数
};

/**
 * 拦截器管理器类
 *
 * https://axios-http.com/zh/docs/interceptors
 */
class InterceptorManager {
  private axiosInstance: AxiosInstance; // Axios 实例

  // 构造函数，接收一个 Axios 实例
  constructor(instance: AxiosInstance) {
    this.axiosInstance = instance;
  }

  /**
   * 添加请求拦截器
   * @param config - 请求拦截器配置，可选
   * @param config.rejected - 请求失败时的处理函数
   * @param config.fulfilled - 请求成功时的处理函数
   */
  addRequestInterceptor({
    fulfilled,
    rejected
  }: RequestInterceptorConfig = defaultRequestInterceptorConfig): void {
    this.axiosInstance.interceptors.request.use(fulfilled, rejected);
  }

  /**
   * 添加响应拦截器
   * @param config - 响应拦截器配置，可选
   * @param config.rejected - 响应失败时的处理函数
   * @param config.fulfilled - 响应成功时的处理函数
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  addResponseInterceptor<T = any>({
    fulfilled,
    rejected
  }: ResponseInterceptorConfig<T> = defaultResponseInterceptorConfig): void {
    this.axiosInstance.interceptors.response.use(fulfilled, rejected);
  }
}

export default InterceptorManager;
