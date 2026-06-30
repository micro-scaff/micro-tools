import type {
  EventHandlerRequest,
  H3Event
} from "h3";

export function useResponseSuccess<T = unknown>(data: T) {
  return {
    code: 200,
    data,
    error: null,
    message: "ok"
  };
}

export function useResponse401() {
  return {
    code: 401,
    data: null,
    message: "刷新！请重新登录"
  };
}

export function useResponse403() {
  return {
    code: 403,
    data: null,
    message: "暂无权限"
  };
}

export function usePageResponseSuccess<T = unknown>(
    page: number | string,
    pageSize: number | string,
    list: T[],
    {
      message = "ok"
    } = {}
) {
  const pageData = pagination(
      Number.parseInt(String(page)),
      Number.parseInt(String(pageSize)),
      list
  );

  return {
    ...useResponseSuccess({
      items: pageData,
      total: list.length
    }),
    message
  };
}

export function useResponseError(message: string, error: Error | string | null = null) {
  return {
    code: -1,
    data: null,
    error,
    message
  };
}

export function forbiddenResponse(
    event: H3Event<EventHandlerRequest>,
    message = "Forbidden Exception"
) {
  setResponseStatus(event, 403);

  return useResponseError(message, message);
}

export function unAuthorizedResponse(event: H3Event<EventHandlerRequest>) {
  setResponseStatus(event, 401);

  return useResponseError("Unauthorized Exception", "Unauthorized Exception");
}

export function sleep(ms: number) {
  return new Promise(resolve => {
    return setTimeout(resolve, ms);
  });
}

export function pagination<T = unknown>(
    pageNo: number,
    pageSize: number,
    array: T[]
): T[] {

  // 添加输入参数验证
  if (!array || array.length === 0) {
    return [];
  }

  // 确保pageNo和pageSize是有效数字
  const validPageNo = Math.max(1, Number.isNaN(pageNo) ? 1 : pageNo);

  const validPageSize = Math.max(1, Number.isNaN(pageSize) ? 10 : pageSize);

  const offset = (validPageNo - 1) * validPageSize;

  // 边界检查
  if (offset >= array.length) {
    return [];
  }

  return array.slice(offset, offset + validPageSize);
}
