/**
 * 防抖
 *
 * 只有在某个时间内，没有再次触发某个函数时，才真正的调用这个函数
 *
 * 防抖的应用场景：
 * ① 搜索框（确保不会每次输入都发送请求）；
 * ② 频繁的点击按钮，触发某个事件；
 * ③ 监听浏览器滚动事件，完成某些特定操作；
 * ④ 用户缩放浏览器的 resize 事件。
 *
 * @param {Function} func  执行的方法
 * @param {number} wait 毫秒
 * @param {boolean} immediate 立即执行（让其在第一次输入的时候，就给用户一个联想）
 * @returns 返回一个函数，该函数返回一个 Promise，解析为执行的方法的返回值。另外，该函数还具有一个 cancel 方法，用于取消防抖
 */
export default function debounce<T extends(...args: unknown[]) => unknown>(func: Function, wait: number = 250, immediate: boolean = false): ((...args: Parameters<T>) => Promise<ReturnType<T>>) & {
    cancel: () => void;
} {

  /**
     * setTimeout 的返回类型是 number | NodeJS.Timeout。这是因为在 Node.js 环境中，setTimeout 返回的是一个 Timeout 对象，而在浏览器环境中，返回的是一个数字。
     */
  let timer: ReturnType<typeof setTimeout> | null = null;

  /**
     * 控制在中间暂停的时候，接下来也能立即执行
     */
  let isInvoke: boolean = false;

  /**
   * 保存等待防抖定时器执行的 Promise。
   * 每次调用仍返回独立 Promise，但同一防抖窗口内的调用最终共享最后一次执行结果，
   * 从而既保持“只执行最后一次”的语义，也保证早先调用不会永久 pending。
   */
  const pendingPromises: Array<{
    resolve: (value: ReturnType<T>) => void;
    reject: (reason?: unknown) => void;
  }> = [];

  /**
   * 原子地取出当前批次并清空队列。
   * 先复制再清空，可避免结算 Promise 的微任务触发新调用时污染当前批次。
   */
  const takePendingPromises = (): typeof pendingPromises => {
    const result = [
      ...pendingPromises
    ];

    pendingPromises.length = 0;

    return result;
  };

  const _debounce = function(...args: Parameters<T>): Promise<ReturnType<T>> {

    /**
         * 在外部获取 fn 中的返回值
         */
    return new Promise((resolve, reject) => {
      try {
        if (timer) {
          clearTimeout(timer);
        }

        if (immediate && !isInvoke) {
          // eslint-disable-next-line unicorn/no-this-outside-of-class
          const result = func.apply(this, args);

          isInvoke = true;

          /**
           * immediate 模式首次执行后也必须启动冷却定时器。
           * 如果没有后续调用，这个定时器负责恢复 isInvoke，使下一轮仍可立即执行；
           * 如果有后续调用，函数开头会清除此定时器并改为真正的尾部执行定时器。
           */
          timer = setTimeout(() => {
            timer = null;
            isInvoke = false;
          }, wait);

          resolve(result);

          return;
        }

        // 当前调用不会立即执行，先保存其结算函数，等待最终定时器统一处理。
        pendingPromises.push({
          resolve,
          reject
        });

        timer = setTimeout((): void => {
          try {

            /**
                       * 确保 this 指向的正确
                       */
            // eslint-disable-next-line unicorn/no-this-outside-of-class
            const result = func.apply(this, args) as ReturnType<T>;

            timer = null;
            isInvoke = false;

            // resolve 会自动吸收 Promise 返回值，因此同步和异步 func 都保持一致语义。
            for (const pending of takePendingPromises()) {
              pending.resolve(result);
            }
          } catch (error) {
            timer = null;
            isInvoke = false;

            for (const pending of takePendingPromises()) {
              pending.reject(error);
            }
          }
        }, wait);
      } catch (error) {
        reject(error);
      }
    });
  };

  /**
     * 取消功能：在触发的过程中，突然要取消
     * 取消之后，重置所有变量
     */
  _debounce.cancel = function(): void {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }

    isInvoke = false;

    // cancel 无法撤销已经执行的函数，只负责结束仍在定时器中等待的调用。
    const error = new DOMException("防抖调用已取消", "AbortError");

    for (const pending of takePendingPromises()) {
      pending.reject(error);
    }
  };

  return _debounce;
}

/*
// 简易版
let timer = null;

function debounce() {
  if(timer!=null){
    window.clearTimeout(myTimer);
  }
  //重新启动定时器
  timer = setTimeout(()=>{
    console.log("我是防抖");
    timer =null;
  },200);
}

// ts 类型定义解释：
//
// 通过泛型 T，你明确定义了 func 参数的类型，即一个函数，它接受任意参数并返回任意类型。
//
// 对于返回的函数，你使用了 Parameters<T> 获取 func 参数的类型，确保返回的函数接受与原始函数相同的参数。
//
// 使用 Promise<ReturnType<T>> 表示返回的函数返回一个 Promise，该 Promise 解析为原始函数的返回类型。
//
// 你使用了一个交叉类型 &，将返回的函数与具有 cancel 方法的对象类型组合在一起。这使得你的函数在使用时既能调用返回的函数，又能调用 cancel 方法。
 */
