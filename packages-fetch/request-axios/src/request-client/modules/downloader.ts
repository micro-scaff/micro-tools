import {
  RequestClientConfig,
  RequestResponse
} from "../../types";
import type RequestClient from "../request-client";

type TDownloadRequestConfig = {
  method?: "get" | "post";

  /**
   * 定义期望获得的数据类型。
   * raw: 原始的AxiosResponse，包括headers、status等。
   * body: 只返回响应数据的BODY部分(Blob)
   */
  responseReturn?: "body" | "raw";
} & Omit<RequestClientConfig, "responseReturn">;

type TDownloadBodyRequestConfig = TDownloadRequestConfig & {
  responseReturn?: "body";
};

type TDownloadRawRequestConfig = TDownloadRequestConfig & {
  responseReturn: "raw";
};

const isRequestResponse = <T>(response: T | RequestResponse<T>): response is RequestResponse<T> => {

  // AxiosResponse 的结构字段用于区分“原始响应”和已经被拦截器解包的业务 body。
  return Boolean(response &&
      typeof response === "object" &&
      "config" in response &&
      "data" in response &&
      "status" in response);
};

class FileDownloader {
  private client: RequestClient;

  constructor(client: RequestClient) {
    this.client = client;
  }

  /**
   * 下载文件
   * @param url 文件的完整链接
   * @param config 配置信息，可选
   *
   * onDownloadProgress 下载进度回调
   *
   * @returns 如果config.responseReturn为'body'，则返回Blob(默认)，否则返回RequestResponse<Blob>， 配和 import { downloadDataFile } from "@mt-kit/utils"; 进行文件下载
   */
  public download<T = Blob>(
      url: string,
      config: TDownloadRawRequestConfig
  ): Promise<RequestResponse<T>>;

  public download<T = Blob>(
      url: string,
      config?: TDownloadBodyRequestConfig
  ): Promise<T>;

  public async download<T = Blob>(
      url: string,
      config?: TDownloadRequestConfig
  ): Promise<T | RequestResponse<T>> {
    const {
      method = "get",
      ...rest
    } = config || {};

    const finalConfig: TDownloadRequestConfig = {
      responseReturn: "body",
      ...rest,
      responseType: "blob"
    };

    /**
     * 使用统一 request 方法，避免 get/post 的第二参数把下载配置误当成 params/data。
     * 同时显式传入 method，GET 与 POST 下载都走完全相同的响应处理路径。
     */
    const response = await this.client.request<T | RequestResponse<T>>(url, {
      ...finalConfig,
      method
    });

    /**
     * 没有注册响应拦截器时 request 返回 AxiosResponse；body 模式在此兜底解包。
     * 如果拦截器已经返回 body，isRequestResponse 为 false，直接透传，避免重复读取 data。
     * raw 模式则始终保留状态码、响应头等完整信息，与公开返回类型保持一致。
     */
    return isRequestResponse(response) && finalConfig.responseReturn === "body"
      ? response.data
      : response;
  }
}

export default FileDownloader;
