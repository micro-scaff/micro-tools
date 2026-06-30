/**
 * 测试运行完成后，终端会显示测试结果，包括通过的测试用例和失败的测试用例
 * pnpx vitest run /Users/yida/Desktop/github-work/micro-tools/packages-fetch/request-axios/src/request-client/modules/downloader.test.ts
 *
 * pnpx vitest watch /Users/yida/Desktop/github-work/micro-tools/packages-fetch/request-axios/src/request-client/modules/downloader.test.ts
 */
import type {
  AxiosRequestConfig
} from "axios";
import {
  beforeEach,
  describe,
  expect,
  it,
  vi
} from "vitest";

import FileDownloader from "./downloader";

describe("fileDownloader", () => {
  let fileDownloader: FileDownloader;

  const mockAxiosInstance = {
    get: vi.fn()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any;

  beforeEach(() => {
    fileDownloader = new FileDownloader(mockAxiosInstance);
  });

  it("创建 FileDownloader 实例", () => {
    expect(fileDownloader).toBeInstanceOf(FileDownloader);
  });

  it("下载文件并返回 Blob", async () => {
    const url = "https://example.com/file";

    const mockBlob = new Blob([
      "file content"
    ], {
      type: "text/plain"
    });

    const mockResponse: Blob = mockBlob;

    mockAxiosInstance.get.mockResolvedValueOnce(mockResponse);

    const result = await fileDownloader.download(url);

    expect(result).toBeInstanceOf(Blob);
    expect(result).toEqual(mockBlob);
    expect(mockAxiosInstance.get).toHaveBeenCalledWith(url, {
      responseType: "blob",
      responseReturn: "body"
    });
  });

  it("合并自定义配置", async () => {
    const url = "https://example.com/file";

    const mockBlob = new Blob([
      "file content"
    ], {
      type: "text/plain"
    });

    const mockResponse: Blob = mockBlob;

    mockAxiosInstance.get.mockResolvedValueOnce(mockResponse);

    const customConfig: AxiosRequestConfig = {
      headers: {
        "Custom-Header": "value"
      }
    };

    // @ts-ignore 修正类型不兼容问题
    const result = await fileDownloader.download(url, customConfig);

    expect(result).toBeInstanceOf(Blob);
    expect(result).toEqual(mockBlob);
    expect(mockAxiosInstance.get).toHaveBeenCalledWith(url, {
      ...customConfig,
      responseType: "blob",
      responseReturn: "body"
    });
  });

  it("处理网络错误", async () => {
    const url = "https://example.com/file";

    mockAxiosInstance.get.mockRejectedValueOnce(new Error("网络错误"));
    await expect(fileDownloader.download(url)).rejects.toThrow("网络错误");
  });

  it("处理空 URL", async () => {
    const url = "";

    mockAxiosInstance.get.mockRejectedValueOnce(new Error("请求失败，状态码 404"));

    await expect(fileDownloader.download(url)).rejects.toThrow("请求失败，状态码 404");
  });

  it("处理 null URL", async () => {
    const url = null as unknown as string;

    mockAxiosInstance.get.mockRejectedValueOnce(new Error("请求失败，状态码 404"));

    await expect(fileDownloader.download(url)).rejects.toThrow("请求失败，状态码 404");
  });
});
