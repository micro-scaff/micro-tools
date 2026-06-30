import ResizeObserver from "resize-observer-polyfill";

// 判断是否在服务端环境中运行
const isServer = typeof window === "undefined";

// 为 HTMLElement 扩展自定义属性
interface IResizeListenerElement extends HTMLElement {
  "__resizeListeners__"?: Array<() => void>;
  "__ro__"?: ResizeObserver;
}

/**
 * ResizeObserver 的回调函数
 */
function resizeHandler(entries: ResizeObserverEntry[]): void {
  for (const entry of entries) {
    const element = entry.target as IResizeListenerElement;

    const listeners = element.__resizeListeners__ ?? [];

    for (const fn of listeners) {
      fn();
    }
  }
}

/**
 * 添加 ResizeObserver 监听器
 */
export function domAddResizeListener(
    element: IResizeListenerElement,
    fn: () => void
): void {
  if (isServer) {
    return;
  }

  if (!element.__resizeListeners__) {
    element.__resizeListeners__ = [];
    element.__ro__ = new ResizeObserver(resizeHandler);
    element.__ro__.observe(element);
  }

  element.__resizeListeners__.push(fn);
}

/**
 * 移除 ResizeObserver 监听器
 */
export function domRemoveResizeListener(
    element: IResizeListenerElement,
    fn: () => void
): void {
  if (!element.__resizeListeners__) {
    return;
  }

  const index = element.__resizeListeners__.indexOf(fn);

  if (index !== -1) {
    element.__resizeListeners__.splice(index, 1);
  }

  if (element.__resizeListeners__.length === 0 && element.__ro__) {
    element.__ro__.disconnect();
  }
}

/**
 * 手动触发 window resize 事件
 */
export function domTriggerWindowResize(): void {
  const event = document.createEvent("HTMLEvents");

  event.initEvent("resize", true, true);
  window.dispatchEvent(event);
}
