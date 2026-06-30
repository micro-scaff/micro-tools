/**
 * 消息队列
 * 支持两种模式：
 * 1. 串行模式：按顺序执行，一个完成后再执行下一个
 * 2. 持续防抖模式：一段时间内有新请求就取消前面的，只保留最后一个，且只有在最后一次请求结束后的一段时间内没有新请求，才真正执行
 */

// 默认防抖时间（毫秒）
const DEFAULT_DEBOUNCE_TIME = 300;

interface IQueueItem<T = unknown> {
  id: symbol;
  task: () => Promise<T>;
  resolve: (value: T) => void;
  reject: (reason?: unknown) => void;
  timer?: ReturnType<typeof setTimeout>; // 用于防抖模式的定时器
}

// 存储各队列的待执行任务
const queues = new Map<string, IQueueItem<unknown>[]>();

// 存储各队列正在执行的任务ID (用于取消正在执行的任务)
const runningTaskIds = new Map<string, symbol>();

// 存储各队列的取消ID集合
const cancelledIds = new Map<string, Set<symbol>>();

// 存储队列是否正在处理中
const processing = new Map<string, boolean>();

// 存储防抖模式下的待执行任务 (key -> item)
const pendingDebounceItem = new Map<string, IQueueItem<unknown>>();

/**
 * 检查任务是否被取消
 */
const isCancelled = (key: string, id: symbol): boolean => {
  return cancelledIds.get(key)?.has(id) ?? false;
};

/**
 * 标记之前的任务为已取消
 */
const markPreviousAsCancelled = (key: string, currentId: symbol): void => {
  const cancelledSet = cancelledIds.get(key) ?? new Set<symbol>();

  cancelledIds.set(key, cancelledSet);

  // 1. 取消排队中的任务 (普通队列模式)
  queues.get(key)?.forEach(item => {
    if (item.id !== currentId) {
      cancelledSet.add(item.id);
    }
  });

  // 2. 取消正在执行的任务
  const runningId = runningTaskIds.get(key);

  if (runningId && runningId !== currentId) {
    cancelledSet.add(runningId);
  }

  // 3. 取消防抖等待中的任务
  const pendingItem = pendingDebounceItem.get(key);

  if (pendingItem && pendingItem.id !== currentId) {
    cancelledSet.add(pendingItem.id);

    if (pendingItem.timer) {
      clearTimeout(pendingItem.timer);
    }

    // 立即 reject 旧任务
    pendingItem.reject(new Error("任务已取消：新任务已到达"));
    pendingDebounceItem.delete(key);
  }
};

/**
 * 清理已取消的任务ID（避免内存泄漏）
 */
const cleanupCancelledIds = (key: string): void => {
  const cancelledSet = cancelledIds.get(key);

  if (!cancelledSet) {
    return;
  }

  // 清理已不在队列中的取消ID
  const queueList = queues.get(key);

  const runningId = runningTaskIds.get(key);

  const pendingItem = pendingDebounceItem.get(key);

  const activeIds = new Set<symbol>();

  if (queueList) {
    queueList.forEach(item => {
      return activeIds.add(item.id);
    });
  }

  if (runningId) {
    activeIds.add(runningId);
  }

  if (pendingItem) {
    activeIds.add(pendingItem.id);
  }

  // 只保留活跃的取消ID，清理不再需要的
  if (cancelledSet.size > activeIds.size * 2) {

    // 如果取消集合太大，清理所有不在活跃列表中的ID
    const toDelete: symbol[] = [];

    cancelledSet.forEach(id => {
      if (!activeIds.has(id)) {
        toDelete.push(id);
      }
    });

    for (const id of toDelete) {
      cancelledSet.delete(id);
    }
  }
};

/**
 * 检查队列是否空闲，如果空闲则清理相关资源
 */
const checkAndCleanQueue = (key: string): void => {
  const queueList = queues.get(key);

  const isQueueEmpty = !queueList || queueList.length === 0;

  const isRunning = runningTaskIds.has(key);

  const isPendingDebounce = pendingDebounceItem.has(key);

  // 如果既没有排队的任务，也没有正在运行的任务，也没有正在防抖等待的任务，则清理资源
  if (isQueueEmpty && !isRunning && !isPendingDebounce) {
    queues.delete(key);
    cancelledIds.delete(key);
    processing.delete(key);
    runningTaskIds.delete(key);
    pendingDebounceItem.delete(key);
  } else {

    // 队列还在使用中，清理已取消的ID避免内存泄漏
    cleanupCancelledIds(key);
  }
};

/**
 * 处理普通队列
 */
const processQueue = async (key: string): Promise<void> => {

  // 如果正在处理，直接返回
  if (processing.get(key)) {
    return;
  }

  const queueList = queues.get(key);

  if (!queueList || queueList.length === 0) {
    processing.set(key, false);
    runningTaskIds.delete(key);
    checkAndCleanQueue(key);

    return;
  }

  // 开始处理队列
  processing.set(key, true);

  while (queueList.length > 0) {
    const item = queueList.shift();

    if (!item) {
      break;
    }

    // 记录正在执行的任务ID
    runningTaskIds.set(key, item.id);

    // 检查是否被取消 (执行前)
    if (isCancelled(key, item.id)) {
      item.reject(new Error("任务已取消：前置任务已被取消"));

      continue;
    }

    try {
      // eslint-disable-next-line no-await-in-loop
      const result = await item.task();

      // 检查是否被取消 (执行后)
      if (isCancelled(key, item.id)) {
        item.reject(new Error("任务已取消"));
      } else {
        item.resolve(result);
      }
    } catch (error) {

      // 检查是否被取消 (出错后)
      if (!isCancelled(key, item.id)) {
        item.reject(error);
      }

      // 如果被取消，静默忽略错误
    }
  }

  // 处理完成，清理状态
  runningTaskIds.delete(key);
  processing.set(key, false);
  checkAndCleanQueue(key);
};

/**
 * 执行单个任务 (用于防抖模式)
 */
const executeTask = async <T>(
  key: string,
  item: IQueueItem<T>
): Promise<void> => {
  runningTaskIds.set(key, item.id);

  if (isCancelled(key, item.id)) {
    item.reject(new Error("任务已取消"));
    runningTaskIds.delete(key);
    checkAndCleanQueue(key);

    return;
  }

  try {
    const result = await item.task();

    if (isCancelled(key, item.id)) {
      item.reject(new Error("任务已取消"));
    } else {
      item.resolve(result);
    }
  } catch (error) {
    if (!isCancelled(key, item.id)) {
      item.reject(error);
    }
  } finally {
    runningTaskIds.delete(key);

    // 执行完后清除 pending 记录 (虽然在开始执行前其实已经不在 pending 里了，但为了保险)
    if (pendingDebounceItem.get(key)?.id === item.id) {
      pendingDebounceItem.delete(key);
    }

    checkAndCleanQueue(key);
  }
};

interface IQueueOptions {
  key?: string;

  /**
   * 防抖时间 (毫秒)
   * 如果为 true，默认为 300ms
   * 如果为 false 或 undefined，则为普通串行队列
   * 如果有值，则开启防抖模式：在该时间内有新请求进入，会取消上一个请求，重新计时。
   */
  duration?: boolean | number;
}

/**
 * 队列请求方法
 * @param fn 数据请求函数
 * @param options 配置项 (包含 key, duration)
 */
export default function queue<T = unknown>(
    fn: () => Promise<T>,
    options?: IQueueOptions
): Promise<T> {
  const {
    key = "default-queue",
    duration
  } = options ?? {};

  // 参数验证
  if (!key || typeof key !== "string") {
    return Promise.reject(new Error("队列 key 必须是有效的字符串"));
  }

  if (typeof fn !== "function") {
    return Promise.reject(new Error("任务必须是一个返回 Promise 的函数"));
  }

  return new Promise<T>((resolve, reject) => {
    const id = Symbol(`${key}-${Date.now()}-${Math.random()}`);

    // 确定是否启用防抖模式及时间
    const isDebounceMode = typeof duration === "number" || duration === true;

    let debounceTime = 0;

    if (typeof duration === "number") {

      // 验证防抖时间必须是非负数
      if (duration < 0) {
        reject(new Error("防抖时间不能为负数"));

        return;
      }

      debounceTime = duration;
    } else if (duration === true) {
      debounceTime = DEFAULT_DEBOUNCE_TIME;
    }

    // 初始化取消集合
    if (!cancelledIds.has(key)) {
      cancelledIds.set(key, new Set());
    }

    if (isDebounceMode) {

      // 防抖模式：
      // 1. 标记之前的任务为取消 (包括正在 pending 的和正在执行的)
      markPreviousAsCancelled(key, id);

      const item: IQueueItem<T> = {
        id,
        task: fn,
        resolve,
        reject
      };

      // 2. 设置定时器
      item.timer = setTimeout(() => {

        // 定时器结束，执行任务
        // 从 pending 中移除 (因为它即将开始执行)
        if (pendingDebounceItem.get(key)?.id !== id) {
        	return;
        }

        pendingDebounceItem.delete(key);
        executeTask(key, item);
      }, debounceTime);

      // 3. 存入 pending
      // 类型兼容修正: 使 resolve 和 reject 适配 unknown
      pendingDebounceItem.set(key, {
        ...item,
        resolve: (value: unknown) => {
          return resolve(value as T);
        },
        reject
      });
    } else {

      // 普通串行模式
      const queueList = queues.get(key) ?? [];

      if (!queues.has(key)) {
        queues.set(key, queueList);
      }

      queueList.push({
        id,
        task: fn,

        // 类型兼容修正: 使 resolve 和 reject 适配 unknown
        resolve: (value: unknown) => {
          return resolve(value as T);
        },
        reject
      });

      processQueue(key);
    }
  });
}
