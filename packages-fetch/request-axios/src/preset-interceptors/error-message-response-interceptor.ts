import axios from "axios";

import {
  Field
} from "../enum";
import {
  RequestClient
} from "../request-client";
import {
  ResponseInterceptorConfig,
  ErrorMessageResponseInterceptorOptions
} from "../types";

interface IExtendOptions {
  client?: RequestClient;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errorFn: (message: string, error: Error | any) => void;
  options?: ErrorMessageResponseInterceptorOptions;
}

const errorMessageResponseInterceptor = ({
  client,
  errorFn,
  options = {}
}: IExtendOptions): ResponseInterceptorConfig => {
  return {
    rejected: (error): Promise<never> => {
      if (axios.isCancel(error)) {
        return Promise.reject(error);
      }

      const err: string = error?.toString?.() ?? "";

      let errMsg = "";

      const {
        message
      } = options;

      if (err?.includes("Network Error")) {
        errMsg = message?.networkErrorMsg || "网络异常，请检查您的网络连接后重试。";
      } else if (error?.message?.includes?.("timeout")) {
        errMsg = message?.timeoutMsg || "请求超时，请稍后重试。";
      } else if (err?.includes("Request failed with status code 500")) {
        errMsg = message?.serverErrorMsg || "服务器内部错误，请稍后重试。";
      } else if (err?.includes("Request failed with status code 404")) {
        errMsg = message?.notFoundMsg || "请求资源不存在，请稍后重试。";
      }

      if(client) {
        client.errorQueue.push(() => {
          return Promise.reject(error);
        });
      }

      if (errMsg) {
        errorFn?.(errMsg, error);

        return Promise.reject(error);
      }

      let errorMessage = "";

      const status = error?.[Field.DATA]?.[Field.CODE] ?? error?.status;

      switch (status) {
        case 400: {
          errorMessage = message?.badRequestMsg || "请求错误，请检查您的输入并重试。";

          break;
        }
        case 401: {
          errorMessage = message?.unauthorizedMsg || "登录认证过期，请重新登录后继续。";

          break;
        }
        case 403: {
          errorMessage = message?.forbiddenMsg || "禁止访问，您没有权限访问此资源。";

          break;
        }
        case 404: {
          errorMessage = message?.notFoundMsg || "未找到，请求的资源不存在。";

          break;
        }
        case 408: {
          errorMessage = message?.requestTimeoutMsg || "请求超时，请稍后重试。";

          break;
        }
        default: {
          errorMessage = message?.defaultMsg || "";
        }
      }

      errorFn?.(errorMessage, error);

      return Promise.reject(error);
    }
  };
};

export default errorMessageResponseInterceptor;
