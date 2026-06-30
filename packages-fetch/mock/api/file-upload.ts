import type {
  EventHandlerRequest,
  H3Event
} from "h3";
import {
  faker
} from "@faker-js/faker";

import {
  useResponseSuccess,
  useResponseError
} from "../utils/response";

interface IUploadResponse {
  id: string;
  filename: string;
  originalName: string;
  size: number;
  type: string;
  url: string;
  uploadTime: string;
}

export default eventHandler(async (event: H3Event<EventHandlerRequest>) => {
  try {

    // 模拟处理上传的文件
    const body = await readBody(event);

    // 模拟文件信息
    const fileId = faker.string.uuid();

    const filename = faker.system.fileName();

    const fileSize = faker.number.int({
      min: 1024,
      max: 10 * 1024 * 1024
    }); // 1KB - 10MB

    const fileType = faker.system.mimeType();

    const response: IUploadResponse = {
      id: fileId,
      filename,
      originalName: body.originalName || filename,
      size: fileSize,
      type: fileType,
      url: `/api/file-download/${fileId}`,
      uploadTime: new Date().toISOString()
    };

    // 模拟上传延迟
    await new Promise(resolve => {
      return setTimeout(resolve, 1000);
    });

    return useResponseSuccess(response);
  } catch (error) {
    return useResponseError("文件上传失败", error);
  }
});
