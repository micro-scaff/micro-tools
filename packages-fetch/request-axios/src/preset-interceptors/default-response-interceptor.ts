import {
  isFunction,
  isUndefined
} from "@mt-kit/utils";

import {
  Status,
  Field
} from "../enum";
import {
  ResponseInterceptorConfig,
  DefaultResponseInterceptorOptions,
  RequestResponse
} from "../types";

/**
 * 根据 responseReturn 和默认业务响应约定转换 AxiosResponse。
 * 该函数同时供默认响应拦截器和 RequestClient 的兜底逻辑使用，确保无论调用方是否
 * 显式注册拦截器，raw/body/data 三种返回模式都具有一致的运行时语义。
 */
const transformResponse = <T>(
  response: RequestResponse<T>,
  options: DefaultResponseInterceptorOptions = {}
): unknown => {
  const codeField = options.codeField ?? Field.CODE;

  // 显式传入 undefined 表示返回完整 body；未提供该字段时才使用默认的 data。
  const dataField = Object.prototype.hasOwnProperty.call(options, "dataField")
    ? options.dataField
    : Field.DATA;

  const code = options.code ?? Status.StatusOk;

  const {
    config,
    data: responseData,
    status
  } = response;

  if (config.responseReturn === "raw") {
    return response;
  }

  if (status >= 200 && status < 400) {
    if (config.responseReturn === "body") {
      return responseData;
    }

    /**
     * 204、空 body 和原始值响应都不存在可读取的业务 code/data 字段。
     * 此时直接返回 body，避免合法响应被转换为无关的 TypeError。
     */
    if (responseData === null || typeof responseData !== "object") {
      return responseData;
    }

    const responseRecord = responseData as Record<string, unknown>;

    const hasBusinessCode = Object.prototype.hasOwnProperty.call(responseRecord, codeField);

    const isBusinessSuccess = !hasBusinessCode || (isFunction(code)
      ? code(responseRecord[codeField] as number | string)
      : responseRecord[codeField] === code);

    if (isBusinessSuccess) {
      if(isUndefined(dataField)) {
        return responseData;
      }

      if (isFunction(dataField)) {
        return dataField(responseRecord);
      }

      // 非业务信封响应没有默认 data 字段时，保留完整 body，兼容普通 REST API。
      return !hasBusinessCode && !Object.prototype.hasOwnProperty.call(responseRecord, dataField)
        ? responseData
        : responseRecord[dataField];
    }
  }

  throw response;
};

const defaultResponseInterceptor = (options: DefaultResponseInterceptorOptions = {}): ResponseInterceptorConfig => {
  return {
    fulfilled: response => {

      /**
       * 当 config.responseReturn 设置为 "raw" 时直接返回原始响应对象，这种设计主要有以下目的：
       * 1. 灵活性 ：允许调用方获取完整的响应对象（包括响应头、状态码等元数据），而不仅仅是业务数据
       * 2. 特殊需求 ：某些场景下需要直接处理原始HTTP响应（如文件下载、流式传输等）
       * 3. 调试用途 ：方便开发者在调试时查看完整的响应信息
       */
      /**
       * 是HTTP响应状态码的检查逻辑，具体含义如下：
       * 1、状态码范围 ：检查HTTP响应状态码是否在200-399之间
       * 2、成功状态 ：这个范围表示请求成功（2xx）或重定向（3xx）
       * 3、业务逻辑 ：只有在这个范围内的响应才会继续处理业务数据
       */
      /**
       * 在外部获取错误对象中的各个部分，可以通过以下方式分解：
       * try {
       *   // 发起请求...
       * } catch (error) {
       *   // 1. 获取完整的错误信息字符串
       *   const errorMessage = error.message;
       *
       *   // 2. 解析为JSON对象
       *   const errorObj = JSON.parse(error.message);
       *
       *   // 3. 获取各个部分
       *   const {
       *     status,        // HTTP状态码
       *     statusText,    // 状态文本
       *     config,        // 请求配置
       *     data,          // 响应数据
       *     response       // 完整响应对象
       *   } = errorObj;
       *
       *   // 使用示例
       *   console.log('HTTP状态码:', status);
       *   console.log('响应数据:', data);
       *
       * 或者使用 .catch 块捕获错误对象
       */

      /*
        throw new Error(JSON.stringify({
          ...response,
          response
        }));
       */

      return transformResponse(response, options);
    }
  };
};

export { transformResponse };
export default defaultResponseInterceptor;
