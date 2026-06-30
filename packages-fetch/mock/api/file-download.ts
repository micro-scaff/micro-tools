import type {
  EventHandlerRequest,
  H3Event
} from "h3";
import {
  faker
} from "@faker-js/faker";

import {
  useResponseError
} from "../utils/response";

export default eventHandler(async (event: H3Event<EventHandlerRequest>) => {
  try {
    const query = getQuery(event);

    const fileId = query.id as string;

    if (!fileId) {
      setResponseStatus(event, 400);

      return useResponseError("文件ID不能为空");
    }

    // 模拟文件信息
    const filename = faker.system.fileName();

    const fileType = faker.system.mimeType();

    // 生成模拟文件内容
    const content = faker.lorem.paragraphs(10);

    const buffer = Buffer.from(content, "utf8");

    // 设置响应头
    setHeader(event, "Content-Type", fileType);
    setHeader(event, "Content-Disposition", `attachment; filename="${filename}"`);
    setHeader(event, "Content-Length", buffer.length.toString() as unknown as number);

    // 模拟下载延迟
    await new Promise(resolve => {
      return setTimeout(resolve, 500);
    });

    return buffer;
  } catch (error) {
    setResponseStatus(event, 500);

    return useResponseError("文件下载失败", error);
  }
});
