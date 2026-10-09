interface IOptions {

    /**
     * 输入第一个字符的时候，是否触发，默认 true
     */
    leading?: boolean;

    /**
     * 输入最后一个字符的时候，是否触发，默认 false
     */
    trailing?: boolean;
}

/**
 * 节流
 *
 * ① 当事件触发时，会执行这个事件的响应函数，如果这个事件会被频繁触发，那么节流函数会按照一定的频率来执行函数
 * ② 不管在这个中间有多少次触发这个事件，执行函数的频率总是固定的，不管在中间究竟点了几次
 * ③ 他在初次是立即触发的
 *
 * 节流的应用场景：
 * ① 监听页面的滚动事件；
 * ② 鼠标移动事件；
 * ③ 用户频繁点击按钮操作；
 * ④ 按照固定的频率去触发时。
 *
 * @param {Function} func 执行的方法
 * @param {number} wait 毫秒
 * @param {IOptions} options
 * @returns 返回一个函数，该函数返回一个 Promise，解析为执行的方法的返回值。另外，该函数还具有一个 cancel 方法，用于取消防抖
 *
 * 使用：
 *
 * const inputEl = document.querySelector("input");
 *
 * const onInput = function(event) {
 *     console.log(event);
 * };
 *
 * const onInputThrottle = throttle(onInput, 3000);
 *
 * inputEl.oninput = onInputThrottle;
 */
const defaultOptions: IOptions = {
  leading: true,
  trailing: false
};

export default function throttle<T extends(...args: unknown[]) => unknown>(func: Function, wait: number = 300, options: IOptions = defaultOptions): ((...args: Parameters<T>) => Promise<ReturnType<T>>) & {
    cancel: () => void;
} {
  const {
    leading, trailing
  } = options;

  let lastTime: number = 0;

  let timer: NodeJS.Timeout | number | null = null;

  let lastResult: ReturnType<T> | undefined;

  let hasLastResult = false;

  // trailing 定时器执行时必须使用窗口内最后一次调用的参数和 this。
  let trailingCall: {
    args: Parameters<T>;
    context: unknown;
  } | null = null;

  // 通过参数传入 this，避免复制包装函数逻辑，并完整保留调用方上下文。
  const updateTrailingCall = (args: Parameters<T>, context: unknown): void => {
    trailingCall = {
      args,
      context
    };
  };

  /**
   * 保存等待 trailing 执行的调用。
   * 同一窗口只执行一次 func，但所有调用方都会共享该次执行结果或错误。
   */
  const pendingPromises: Array<{
    resolve: (value: ReturnType<T>) => void;
    reject: (reason?: unknown) => void;
  }> = [];

  // 复制并清空当前批次，避免结算过程中产生的新调用被本轮错误处理。
  const takePendingPromises = (): typeof pendingPromises => {
    const result = [
      ...pendingPromises
    ];

    pendingPromises.length = 0;

    return result;
  };

  /**
     * 事件触发时真正执行的函数
     */
  const _throttle = function(...args: Parameters<T>): Promise<ReturnType<T>> {
    return new Promise((resolve, reject) => {
      try {

        /**
                 * 获取最新的时间
                 * 当第一次执行完 lastTime = nowTime 时，wait - (nowTime - lastTime) 一定大于 0，这个时候是不执行的
                 */
        const nowTime = Date.now();

        if (lastTime === 0 && leading === false) {
          lastTime = nowTime;
        }

        const remainTime = wait - (nowTime - lastTime);

        if (remainTime <= 0) {

          /**
                     * 只有在这重置了，才能开启下一个定时器
                     */
          if (timer) {
            clearTimeout(timer);
            timer = null;
          }

          // eslint-disable-next-line unicorn/no-this-outside-of-class
          const result = func.apply(this, args) as ReturnType<T>;

          lastResult = result;
          hasLastResult = true;
          trailingCall = null;

          resolve(result);

          for (const pending of takePendingPromises()) {
            pending.resolve(result);
          }

          lastTime = nowTime;

          return;
        }

        if (trailing === true && remainTime > 0 && timer === null) {
          // eslint-disable-next-line unicorn/no-this-outside-of-class
          updateTrailingCall(args, this);

          pendingPromises.push({
            resolve,
            reject
          });

          timer = setTimeout(() => {
            try {
              timer = null;

              // 定时器只会在 trailingCall 存在时创建，这里保留回退值防止外部取消竞态。
              const invokeCall = trailingCall ?? {
                args,
                // eslint-disable-next-line unicorn/no-this-outside-of-class
                context: this
              };

              trailingCall = null;

              const result = func.apply(invokeCall.context, invokeCall.args) as ReturnType<T>;

              lastResult = result;
              hasLastResult = true;

              /**
                           * 处理边界性问题
                           */
              lastTime = leading === true ? Date.now() : 0;

              for (const pending of takePendingPromises()) {
                pending.resolve(result);
              }
            } catch (error) {
              timer = null;

              for (const pending of takePendingPromises()) {
                pending.reject(error);
              }
            }
          }, remainTime);

          return;
        }

        if (trailing === true && remainTime > 0) {

          // 定时器已经存在时只更新最后一次参数，不重复创建计时器。
          // eslint-disable-next-line unicorn/no-this-outside-of-class
          updateTrailingCall(args, this);

          pendingPromises.push({
            resolve,
            reject
          });

          return;
        }

        if (hasLastResult) {

          // trailing 关闭时没有新的执行结果，复用最近一次执行结果来结束本次 Promise。
          resolve(lastResult as ReturnType<T>);

          return;
        }

        reject(new Error("节流调用未执行"));
      } catch (error) {
        for (const pending of takePendingPromises()) {
          pending.reject(error);
        }

        reject(error);
      }
    });
  };

  /**
     * 取消节流
     */
  _throttle.cancel = function() {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }

    lastTime = 0;
    lastResult = undefined;
    hasLastResult = false;
    trailingCall = null;

    // 被 cancel 的 trailing 调用统一使用 AbortError 结束，调用方可明确区分业务异常。
    const error = new DOMException("节流调用已取消", "AbortError");

    for (const pending of takePendingPromises()) {
      pending.reject(error);
    }
  };

  return _throttle;
}

/*
// 简易版
let timer = null;

function throttle() {
	if( timer !== null ){
		return;
	}
	timer = setTimeout(()=>{
        console.log("我是节流");
		timer = null;
	},200);
}
 */
