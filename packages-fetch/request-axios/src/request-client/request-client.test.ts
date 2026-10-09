/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it
} from "vitest";

import RequestClient from "./request-client";

describe("requestClient", () => {
  let mock: MockAdapter;

  let requestClient: RequestClient;

  beforeEach(() => {
    mock = new MockAdapter(axios);
    requestClient = new RequestClient();
  });

  afterEach(() => {
    mock.reset();
  });

  it("should successfully make a GET request", async () => {
    mock.onGet("test/url").reply(200, {
      data: "response"
    });

    const response = await requestClient.get<string>("test/url");

    expect(response).toBe("response");
  });

  it("should successfully make a POST request", async () => {
    const postData = {
      key: "value"
    };

    const mockData = {
      data: "response"
    };

    mock.onPost("/test/post", postData).reply(200, mockData);
    const response = await requestClient.post<string>("/test/post", postData);

    expect(response).toBe("response");
  });

  it("should successfully make a PUT request", async () => {
    const putData = {
      key: "updatedValue"
    };

    const mockData = {
      data: "updated response"
    };

    mock.onPut("/test/put", putData).reply(200, mockData);
    const response = await requestClient.put<string>("/test/put", putData);

    expect(response).toBe("updated response");
  });

  it("should successfully make a DELETE request", async () => {
    const mockData = {
      data: "delete response"
    };

    mock.onDelete("/test/delete").reply(200, mockData);
    const response = await requestClient.delete<string>("/test/delete");

    expect(response).toBe("delete response");
  });

  it("should handle network errors", async () => {
    mock.onGet("/test/error").networkError();

    try {
      await requestClient.get("/test/error");
      expect(true).toBe(false);
    } catch (error: any) {
      expect(error.isAxiosError).toBe(true);
      expect(error.message).toBe("Network Error");
    }
  });

  it("should handle timeout", async () => {
    mock.onGet("/test/timeout").timeout();

    try {
      await requestClient.get("/test/timeout");
      expect(true).toBe(false);
    } catch (error: any) {
      expect(error.isAxiosError).toBe(true);
      expect(error.code).toBe("ECONNABORTED");
    }
  });

  it("should preserve the complete AxiosError for HTTP errors", async () => {
    mock.onGet("/test/http-error").reply(500, {
      message: "server error"
    });

    await expect(requestClient.get("/test/http-error")).rejects.toMatchObject({
      isAxiosError: true,
      response: {
        data: {
          message: "server error"
        },
        status: 500
      }
    });
  });

  it("should return undefined for a valid 204 response", async () => {
    mock.onDelete("/test/no-content").reply(204);

    await expect(requestClient.delete("/test/no-content")).resolves.toBeUndefined();
  });

  it("should successfully upload a file", async () => {
    const fileData = new Blob([
      "file contents"
    ], {
      type: "text/plain"
    });

    mock.onPost("/test/upload").reply(config => {
      return (config.data instanceof FormData && config.data.has("file")
        ? [
          200,
          {
            data: "file uploaded"
          }
        ]
        : [
          400,
          {
            error: "Bad Request"
          }
        ]);
    });

    const response = await requestClient.upload<string>("/test/upload", {
      file: fileData
    });

    expect(response).toBe("file uploaded");
  });

  it("should successfully download a file as a blob", async () => {
    const mockFileContent = new Blob([
      "mock file content"
    ], {
      type: "text/plain"
    });

    mock.onGet("/test/download").reply(200, mockFileContent);

    const res = await requestClient.download("/test/download");

    expect(res).toBeInstanceOf(Blob);
  });
});
