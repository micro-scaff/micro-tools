const DEFAULT_CACHE_WINDOW = 500; // 500ms 内视为同一批次请求

const MIN_CACHE_WINDOW = 0; // 最小时间窗口

const MAX_CACHE_WINDOW = 60_000; // 最大时间窗口（60秒）

/**
 * 缓存状态接口
 */
interface ICacheState<R> {

  // 上次请求的结果
  lastResult?: R;

  // 上次请求的时间
  lastRequestTime: number;

  // 当前正在进行的请求
  pendingPromise: Promise<R> | null;
}

/**
 * 全局缓存 Map：以函数引用为 key，存储每个函数的缓存状态
 * 这样即使在不同组件中多次调用 createDedupedRequest(dataList)，
 * 只要传入的是同一个函数引用，它们就会共享同一个缓存状态
 *
 * 使用 Map 而不是 WeakMap，以便在请求完成后可以手动清除缓存
 */
const cacheMap = new Map<(...args: unknown[]) => Promise<unknown>, ICacheState<unknown>>();

/**
 * 验证并规范化时间窗口参数
 */
function normalizeCacheWindow(cacheWindow: number): number {

  // 如果时间窗口不是数字，或者是一个 NaN，则使用默认值
  if (typeof cacheWindow !== "number" || Number.isNaN(cacheWindow)) {
    console.warn(`[createDedupedRequest] 无效的时间窗口值: ${cacheWindow}，使用默认值 ${DEFAULT_CACHE_WINDOW}ms`);

    return DEFAULT_CACHE_WINDOW;
  }

  // 如果时间窗口小于最小值，则使用最小值
  if (cacheWindow < MIN_CACHE_WINDOW) {
    console.warn(`[createDedupedRequest] 时间窗口 ${cacheWindow}ms 小于最小值 ${MIN_CACHE_WINDOW}ms，使用最小值`);

    return MIN_CACHE_WINDOW;
  }

  // 如果时间窗口大于最大值，则使用最大值
  if (cacheWindow > MAX_CACHE_WINDOW) {
    console.warn(`[createDedupedRequest] 时间窗口 ${cacheWindow}ms 大于最大值 ${MAX_CACHE_WINDOW}ms，使用最大值`);

    return MAX_CACHE_WINDOW;
  }

  return Math.floor(cacheWindow);
}

/**
 * 安全地清理缓存状态
 */
function safeCleanupCache(fn: (...args: unknown[]) => Promise<unknown>): void {
  try {
    cacheMap.delete(fn);
  } catch (error) {
    console.error("[createDedupedRequest] 清理缓存时发生错误:", error);
  }
}

/**
 * 创建带请求去重功能的函数包装器
 *
 * 在指定时间窗口内，多次调用同一个函数时：
 * - 只有第一次会真正向后端请求
 * - 其它调用会等待第一次请求完成，并拿到相同结果
 * - 请求完成后会清除缓存，确保下次调用时重新请求
 *
 * 这里不关心具体请求逻辑，由外部传入真正的请求函数（如 dataList）。
 * 基于函数引用作为 key 进行全局缓存管理，所以可以在组件内部使用。
 *
 * @param fn - 需要包装的异步函数
 * @param cacheWindow - 时间窗口（毫秒），默认 500ms，范围 [0, 60000]
 * @returns 带去重功能的包装函数
 * @throws 如果 fn 不是函数，会抛出错误
 */
export default function createDedupedRequest<T extends unknown[], R>(
    fn: (...args: T) => Promise<R>,
    cacheWindow = DEFAULT_CACHE_WINDOW
): (...args: T) => Promise<R> {

  // 参数验证：确保 fn 是函数
  if (typeof fn !== "function") {
    throw new TypeError(`[createDedupedRequest] 参数 fn 必须是函数，但收到: ${typeof fn}`);
  }

  // 规范化时间窗口
  const normalizedCacheWindow = normalizeCacheWindow(cacheWindow);

  // 获取或创建该函数的缓存状态
  let cacheState = cacheMap.get(fn as (...args: unknown[]) => Promise<unknown>) as ICacheState<R> | undefined;

  if (!cacheState) {
    cacheState = {
      lastResult: undefined,
      lastRequestTime: 0,
      pendingPromise: null
    };
    cacheMap.set(fn as (...args: unknown[]) => Promise<unknown>, cacheState as ICacheState<unknown>);
  }

  return (...args: T): Promise<R> => {
    const now = Date.now();

    // 仍在时间窗口内，并且已有进行中的请求，直接复用该 Promise
    if (cacheState.pendingPromise && now - cacheState.lastRequestTime <= normalizedCacheWindow) {
      return cacheState.pendingPromise;
    }

    // 发起新请求
    cacheState.lastRequestTime = now;

    // 创建请求 Promise，并处理成功和失败情况
    cacheState.pendingPromise = Promise.resolve().then(() => {
      return fn(...args);
    }).then(
        res => {
          return res;
        },
        error => {

          // 请求失败时，确保错误能够正确传播
          throw error;
        }
    ).finally(() => {

      // 无论成功还是失败，都要清理缓存
      safeCleanupCache(fn as (...args: unknown[]) => Promise<unknown>);
    });

    return cacheState.pendingPromise;
  };
}
