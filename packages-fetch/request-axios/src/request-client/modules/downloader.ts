import {
  RequestClientConfig
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
  public async download<T = Blob>(
      url: string,
      config?: TDownloadRequestConfig
  ): Promise<T> {
    const {
      method = "get",
      ...rest
    } = config || {};

    const finalConfig: TDownloadRequestConfig = {
      responseReturn: "body",
      ...rest,
      responseType: "blob"
    };

    const response = await this.client[method]<T>(url, finalConfig);

    return response;
  }
}

export default FileDownloader;
