import {
  AxiosHeaders
} from "axios";
import {
  describe,
  expect,
  it
} from "vitest";

import type {
  RequestResponse
} from "../types";
import defaultResponseInterceptor from "./default-response-interceptor";

const createResponse = (data: unknown, status = 200): RequestResponse<unknown> => {
  return {
    config: {
      headers: new AxiosHeaders(),
      responseReturn: "data"
    },
    data,
    headers: {},
    status,
    statusText: "OK"
  };
};

describe("defaultResponseInterceptor", () => {
  it("204 空响应不会抛出 TypeError", () => {
    const {
      fulfilled
    } = defaultResponseInterceptor();

    expect(fulfilled?.(createResponse(undefined, 204))).toBeUndefined();
  });

  it("显式 dataField undefined 时返回完整 body", () => {
    const {
      fulfilled
    } = defaultResponseInterceptor({
      dataField: undefined
    });

    const body = {
      code: 200,
      value: "body"
    };

    expect(fulfilled?.(createResponse(body))).toBe(body);
  });
});
