/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  AxiosRequestConfig,
  AxiosResponse
} from "axios";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi
} from "vitest";

import FileUploader from "./uploader";

describe("fileUploader", () => {
  let fileUploader: FileUploader;

  const mockAxiosInstance = {
    post: vi.fn()
  } as any;

  beforeEach(() => {
    fileUploader = new FileUploader(mockAxiosInstance);
  });

  it("创建 FileUploader 实例", () => {
    expect(fileUploader).toBeInstanceOf(FileUploader);
  });

  it("上传文件并返回响应", async () => {
    const url = "https://example.com/upload";

    const file = new File([
      "file content"
    ], "test.txt", {
      type: "text/plain"
    });

    const mockResponse: AxiosResponse = {
      config: {} as any,
      data: {
        success: true
      },
      headers: {},
      status: 200,
      statusText: "OK"
    };

    (
      mockAxiosInstance.post as unknown as ReturnType<typeof vi.fn>
    ).mockResolvedValueOnce(mockResponse);

    const result = await fileUploader.upload(url, {
      file
    });

    expect(result).toEqual(mockResponse);
    expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        url,
        expect.any(FormData),
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
    );
  });

  it("合并自定义配置", async () => {
    const url = "https://example.com/upload";

    const file = new File([
      "file content"
    ], "test.txt", {
      type: "text/plain"
    });

    const mockResponse: AxiosResponse = {
      config: {} as any,
      data: {
        success: true
      },
      headers: {},
      status: 200,
      statusText: "OK"
    };

    (
      mockAxiosInstance.post as unknown as ReturnType<typeof vi.fn>
    ).mockResolvedValueOnce(mockResponse);

    const customConfig: AxiosRequestConfig = {
      headers: {
        "Custom-Header": "value"
      }
    };

    const result = await fileUploader.upload(url, {
      file
    }, customConfig);

    expect(result).toEqual(mockResponse);
    expect(mockAxiosInstance.post).toHaveBeenCalledWith(
        url,
        expect.any(FormData),
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Custom-Header": "value"
          }
        }
    );
  });

  it("处理网络错误", async () => {
    const url = "https://example.com/upload";

    const file = new File([
      "file content"
    ], "test.txt", {
      type: "text/plain"
    });

    (
      mockAxiosInstance.post as unknown as ReturnType<typeof vi.fn>
    ).mockRejectedValueOnce(new Error("网络错误"));

    await expect(fileUploader.upload(url, {
      file
    })).rejects.toThrow("网络错误");
  });

  it("处理空 URL", async () => {
    const url = "";

    const file = new File([
      "file content"
    ], "test.txt", {
      type: "text/plain"
    });

    (
      mockAxiosInstance.post as unknown as ReturnType<typeof vi.fn>
    ).mockRejectedValueOnce(new Error("请求失败，状态码 404"));

    await expect(fileUploader.upload(url, {
      file
    })).rejects.toThrow("请求失败，状态码 404");
  });

  it("处理 null URL", async () => {
    const url = null as unknown as string;

    const file = new File([
      "file content"
    ], "test.txt", {
      type: "text/plain"
    });

    (
      mockAxiosInstance.post as unknown as ReturnType<typeof vi.fn>
    ).mockRejectedValueOnce(new Error("请求失败，状态码 404"));

    await expect(fileUploader.upload(url, {
      file
    })).rejects.toThrow("请求失败，状态码 404");
  });
});
