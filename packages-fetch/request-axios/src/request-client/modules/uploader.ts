import {
  RequestClientConfig,
  UploadData
} from "../../types";
import type RequestClient from "../request-client";

interface IUploadRequestConfig extends RequestClientConfig {

  /**
   * 上传方法
   * put上传
   *
   * 文件内容通过 Socket 链接直接传输，无额外编码/解码开销，适合大文件上传
   * 华为云实测：上传 5GB 以下文件时，PUT 比 POST 效率高约 20%
   *
   *
   * post 上传
   *
   * 需将文件拆分为多部分并添加边界标识，服务器需解析表单数据，消耗更多CPU和内存
   */
  method?: "put" | "post";
}

class FileUploader {
  private client: RequestClient;

  constructor(client: RequestClient) {
    this.client = client;
  }

  /**
   * 上传文件
   *
   * @param url 地址
   * @param data 数据，必须包含 file 字段
   * @param config 可选配置对象，继承自Axios请求配置
   *
   * @returns 返回一个Promise，解析值为服务器返回的数据，类型为泛型T
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async upload<T = any>(
      url: string,
      data: UploadData,
      config?: IUploadRequestConfig
  ): Promise<T> {

    // 验证文件是否存在
    if (!data.file) {
      throw new Error("File is required for upload");
    }

    const {
      method = "post",
      ...rest
    } = config || {};

    if (method === "put") {

      // PUT 方法直接上传文件内容
      const finalConfig: RequestClientConfig = {
        ...rest,
        headers: {
          "x-amz-acl": "public-read", // 设置文件的访问权限为公共读
          "Content-Type": data.file.type || "application/octet-stream", // 设置文件的MIME类型
          ...rest?.headers
        }
      };

      return this.client.put<T>(url, data.file, finalConfig);
    }

    // POST 方法使用 FormData
    const formData = new FormData();

    for (const [
      key,
      value
    ] of Object.entries(data)) {
      if (Array.isArray(value)) {
        for (const [
          index,
          item
        ] of value.entries()) {
          formData.append(`${key}[${index}]`, item);
        }
      } else {
        formData.append(key, value);
      }
    }

    const finalConfig: RequestClientConfig = {
      ...config,
      headers: {
        "Content-Type": "multipart/form-data",
        ...config?.headers
      }
    };

    return this.client.post(url, formData, finalConfig);
  }
}

export default FileUploader;
