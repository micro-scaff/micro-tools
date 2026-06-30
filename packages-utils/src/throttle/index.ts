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

          return;
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
          const result = func.apply(this, args);

          resolve(result);

          lastTime = nowTime;

          return;
        }

        if (trailing === true && remainTime > 0 && timer === null) {
          timer = setTimeout(() => {
            timer = null;
            // eslint-disable-next-line unicorn/no-this-outside-of-class
            const result = func.apply(this, args);

            /**
                         * 处理边界性问题
                         */
            lastTime = leading === true ? Date.now() : 0;
            resolve(result);
          }, remainTime);
        }
      } catch (error) {
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
