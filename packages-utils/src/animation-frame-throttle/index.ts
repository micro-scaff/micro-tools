type TFunctionArgs<Args extends unknown[] = unknown[], Return = void> = (...args: Args) => Return;

/**
 * 创建一个使用 requestAnimationFrame 的函数节流（throttle）版本
 *
 * 函数节流的目的是限制一个函数在特定时间内的调用次数，以避免过于频繁的执行，以确保性能优化或更平滑的动画效果时
 *
 * @param fn
 * @returns
 *
 * 使用场景：
 *
 * 1、滚动事件处理
 * window.addEventListener('scroll', animationFrameThrottle(handleScroll));
 *
 * 2、窗口大小改变
 * window.addEventListener('resize', animationFrameThrottle(handleResize));
 *
 * 3、动画效果
 * const animatedFunction = animationFrameThrottle(updateAnimation);
 */
export default function animationFrameThrottle<T extends TFunctionArgs>(fn: T): T {
  let isLocked = false;

  return function(this: unknown, ...args: Parameters<T>): ReturnType<T> {
    if (isLocked) {
      return undefined as unknown as ReturnType<T>;
    }

    isLocked = true;

    // window.requestAnimationFrame 用于在下一次浏览器重绘之前调用指定的函数
    window.requestAnimationFrame(() => {
      fn.apply(this, args);
      isLocked = false;
    });

    return undefined as unknown as ReturnType<T>;
  } as unknown as T;
}
