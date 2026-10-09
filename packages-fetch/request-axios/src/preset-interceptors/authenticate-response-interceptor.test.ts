import {
  describe,
  expect,
  it,
  vi
} from "vitest";

import type {
  RequestClient
} from "../request-client";
import authenticateResponseInterceptor from "./authenticate-response-interceptor";

const createUnauthorizedError = (url: string): {
  config: Record<string, unknown> & {
    headers: Record<string, null | string>;
    url: string;
  };
  data: {
    code: number;
  };
  status: number;
} => {
  return {
    config: {
      headers: {
        Authorization: "Bearer old-token"
      },
      url
    },
    data: {
      code: 401
    },
    status: 401
  };
};

describe("authenticateResponseInterceptor", () => {
  it("多个 401 共享一次刷新并使用新 Token 重试", async () => {
    const {
      promise: refreshPromise,
      resolve: resolveRefresh
    } = Promise.withResolvers<string>();

    const doRefreshToken = vi.fn(() => {
      return refreshPromise;
    });

    const request = vi.fn(async (_url: string, config: unknown) => {
      return config;
    });

    const client = {
      errorQueue: [],
      isRefreshing: false,
      refreshTokenPromise: null,
      refreshTokenQueue: [],
      request
    } as unknown as RequestClient;

    const {
      rejected
    } = authenticateResponseInterceptor({
      client,
      doRefreshToken,
      enableRefreshToken: true,
      formatToken: token => {
        return `Bearer ${token}`;
      }
    });

    const first = rejected?.(createUnauthorizedError("/first"));

    const second = rejected?.(createUnauthorizedError("/second"));

    // 刷新函数通过微任务启动，以同时捕获同步 throw 和 rejected Promise。
    await Promise.resolve();
    expect(doRefreshToken).toHaveBeenCalledTimes(1);
    resolveRefresh("new-token");

    await expect(Promise.all([
      first,
      second
    ])).resolves.toHaveLength(2);
    expect(request).toHaveBeenCalledTimes(2);

    for (const call of request.mock.calls) {
      const [
        , config
      ] = call;

      expect(Reflect.get(config as object, "__isRetryRequest")).toBe(true);
      expect(config).toMatchObject({
        headers: {
          Authorization: "Bearer new-token"
        }
      });
    }
  });

  it("刷新失败时所有等待请求都 reject，且只重新认证一次", async () => {
    const refreshError = new Error("refresh failed");

    const doReAuthenticate = vi.fn(async () => {
      return undefined;
    });

    const client = {
      errorQueue: [],
      isRefreshing: false,
      refreshTokenPromise: null,
      refreshTokenQueue: [],
      request: vi.fn()
    } as unknown as RequestClient;

    const {
      rejected
    } = authenticateResponseInterceptor({
      client,
      doReAuthenticate,
      doRefreshToken: async () => {
        await Promise.resolve();

        throw refreshError;
      },
      enableRefreshToken: true
    });

    const first = rejected?.(createUnauthorizedError("/first"));

    const second = rejected?.(createUnauthorizedError("/second"));

    const results = await Promise.allSettled([
      first,
      second
    ]);

    expect(results.every(result => {
      return result.status === "rejected" && result.reason === refreshError;
    })).toBe(true);
    expect(doReAuthenticate).toHaveBeenCalledTimes(1);
    expect(client.request).not.toHaveBeenCalled();
  });

  it("刷新函数同步抛错时也会释放刷新状态", async () => {
    const refreshError = new Error("synchronous refresh failure");

    const doReAuthenticate = vi.fn(async () => {
      return undefined;
    });

    const client = {
      errorQueue: [],
      isRefreshing: false,
      refreshTokenPromise: null,
      refreshTokenQueue: [],
      request: vi.fn()
    } as unknown as RequestClient;

    const {
      rejected
    } = authenticateResponseInterceptor({
      client,
      doReAuthenticate,
      doRefreshToken: () => {
        throw refreshError;
      },
      enableRefreshToken: true
    });

    await expect(rejected?.(createUnauthorizedError("/resource"))).rejects.toBe(refreshError);
    expect(client.isRefreshing).toBe(false);
    expect(client.refreshTokenPromise).toBeNull();
    expect(doReAuthenticate).toHaveBeenCalledOnce();
  });

  it("支持函数形式的未授权状态判断", async () => {
    const request = vi.fn(async () => {
      return "retried";
    });

    const client = {
      errorQueue: [],
      isRefreshing: false,
      refreshTokenPromise: null,
      refreshTokenQueue: [],
      request
    } as unknown as RequestClient;

    const {
      rejected
    } = authenticateResponseInterceptor({
      client,
      doRefreshToken: async () => {
        return "new-token";
      },
      enableRefreshToken: true,
      options: {
        code: status => {
          return status === 401;
        }
      }
    });

    await expect(rejected?.(createUnauthorizedError("/resource"))).resolves.toBe("retried");
    expect(request).toHaveBeenCalledOnce();
  });
});
