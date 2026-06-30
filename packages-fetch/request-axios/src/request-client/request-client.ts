/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, {
  AxiosInstance,
  AxiosResponse
} from "axios";
import {
  defu as merge
} from "defu";
import qs from "qs";

import {
  RequestClientConfig,
  RequestClientOptions
} from "../types";
import {
  bindMethods
} from "../utils";
import {
  InterceptorManager,
  FileDownloader,
  FileUploader
} from "./modules";

/**
 * 获取参数序列化函数
 * @param paramsSerializer - 参数序列化函数或字符串
 * @returns 参数序列化函数
 *
 * 参数序列化方式。预置的有
 * - brackets: ids[]=1&ids[]=2&ids[]=3
 * - comma: ids=1,2,3
 * - indices: ids[0]=1&ids[1]=2&ids[2]=3
 * - repeat: ids=1&ids=2&ids=3
 */
function getParamsSerializer(paramsSerializer: RequestClientOptions["paramsSerializer"]): RequestClientOptions["paramsSerializer"] {
  if (typeof paramsSerializer === "string") {
    switch (paramsSerializer) {
      case "brackets": {
        return (params: any) => {
          return qs.stringify(params, {
            arrayFormat: "brackets"
          });
        };
      }
      case "comma": {
        return (params: any) => {
          return qs.stringify(params, {
            arrayFormat: "comma"
          });
        };
      }
      case "indices": {
        return (params: any) => {
          return qs.stringify(params, {
            arrayFormat: "indices"
          });
        };
      }
      case "repeat": {
        return (params: any) => {
          return qs.stringify(params, {
            arrayFormat: "repeat"
          });
        };
      }
      default: {
        return paramsSerializer;
      }
    }
  }

  return paramsSerializer;
}

class RequestClient {
  private readonly instance: AxiosInstance;

  public addRequestInterceptor: InterceptorManager["addRequestInterceptor"];

  public addResponseInterceptor: InterceptorManager["addResponseInterceptor"];

  public download: FileDownloader["download"];

  // 是否正在刷新token
  public isRefreshing = false;

  // 刷新token队列
  public refreshTokenQueue: ((token: string) => void)[] = [];

  public errorQueue: (() => void)[] = [];

  public upload: FileUploader["upload"];

  /**
   * 构造函数，用于创建Axios实例
   * @param options - Axios请求配置，可选
   */
  constructor(options: RequestClientOptions = {}) {

    // 合并默认配置和传入的配置
    const defaultConfig: RequestClientOptions = {
      headers: {
        "Content-Type": "application/json;charset=utf-8"
      },
      responseReturn: "data",

      // 默认超时时间（10 秒）
      timeout: 10_000
    };

    const {
      ...axiosConfig
    } = options;

    const requestConfig = merge(axiosConfig, defaultConfig);

    requestConfig.paramsSerializer = getParamsSerializer(requestConfig.paramsSerializer);
    this.instance = axios.create(requestConfig);

    // bindMethods(this) 的作用是确保 RequestClient 实例的方法在调用时， this 始终指向实例本身，避免因上下文丢失导致的错误。这是 JavaScript/TypeScript 中处理 this 指向问题的常见做法
    bindMethods(this);

    // 实例化拦截器管理器
    const interceptorManager = new InterceptorManager(this.instance);

    this.addRequestInterceptor = interceptorManager.addRequestInterceptor.bind(interceptorManager);
    this.addResponseInterceptor = interceptorManager.addResponseInterceptor.bind(interceptorManager);

    // 实例化文件上传器
    const fileUploader = new FileUploader(this);

    this.upload = fileUploader.upload.bind(fileUploader);

    // 实例化文件下载器
    const fileDownloader = new FileDownloader(this);

    this.download = fileDownloader.download.bind(fileDownloader);
  }

  /**
   * DELETE请求方法
   */
  public delete<T = any, Q = any>(
      url: string,
      data?: Q,
      config?: RequestClientConfig
  ): Promise<T> {
    return this.request<T>(url, {
      ...config,
      data,
      method: "DELETE"
    });
  }

  /**
   * GET请求方法
   */
  public get<T = any, Q = any>(url: string, params?: Q, config?: RequestClientConfig): Promise<T> {
    return this.request<T>(url, {
      ...config,
      params,
      method: "GET"
    });
  }

  /**
   * POST请求方法
   */
  public post<T = any, Q = any>(
      url: string,
      data?: Q,
      config?: RequestClientConfig
  ): Promise<T> {
    return this.request<T>(url, {
      ...config,
      data,
      method: "POST"
    });
  }

  /**
   * PUT请求方法
   */
  public put<T = any, Q = any>(
      url: string,
      data?: Q,
      config?: RequestClientConfig
  ): Promise<T> {
    return this.request<T>(url, {
      ...config,
      data,
      method: "PUT"
    });
  }

  /**
   * 通用的请求方法
   */
  public async request<T>(
      url: string,
      config: RequestClientConfig
  ): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.instance({
        url,
        ...config,
        ...(config.paramsSerializer && {
          paramsSerializer: getParamsSerializer(config.paramsSerializer)
        })
      });

      return response as T;
    } catch (error: any) {
      throw error.response ? error.response.data : error;
    }
  }
}

export default RequestClient;
