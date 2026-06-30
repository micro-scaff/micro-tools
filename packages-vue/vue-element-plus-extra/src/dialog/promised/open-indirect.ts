import {
  createApp,
  App,
  h
} from "vue";

import {
  noop as _noop
} from "lodash-es";

import {
  createContainer,
  uuid,
  isUndefined
} from "@mt-kit/utils";

import WithModel from "../with-model/index.vue";
import {
  DialogProps
} from "../model";
import {
  IDialogIndirectPromise
} from "../types";

export default function openIndirect<T = void, D extends object = Record<string, unknown>>(props: DialogProps<T, D>): IDialogIndirectPromise<T> {

  let close: ((result?: T | Error | unknown, rejected?: boolean, isDestroy?: boolean) => void) | null = _noop;

  let container: HTMLDivElement | null = createContainer({
    append: true
  }).element;

  let root: null | App<Element> = null;

  const dialogId = uuid();

  const onClose: DialogProps<T, D>["onClose"] = (result, defaultData) => {

    if (result instanceof Error) {
      close?.(JSON.parse(result.message as string), true, false);

      return;
    }

    destroy();

    close?.(result, false);

    props?.onClose?.(result, defaultData);
  };

  function renderDialog(): void {
    container?.setAttribute("class", dialogId);

    root = createApp({
      render() {
        return h(WithModel, {
          props: {
            ...props,
            onClose
          } as DialogProps
        });
      }
    });

    root.mount(container as HTMLElement);
  }

  function destroy(): void {

    // 清理 DOM 和引用
    setTimeout(() => {
      root?.unmount();
      container?.remove();

      root = null;
      container = null;
      close = null;
    }, 800);
  }

  /**
   * 创建 Promise
   *
   * @param resolve 成功回调
   * @param reject 失败回调
   */
  const promise = new Promise<T>((resolve, reject) => {

    /**
     * Dialog 被关闭时会执行到此回调，这里会将 Promise 进行 resolve 或 reject，同时做一系列的清理动作
     *
     * isDestroy，用作内部消费，是否立即销毁元素
     */
    close = (result?: T | Error | unknown, rejected?: boolean, _isDestroy: boolean = true) => {
      try {

        // 如果容器已经被销毁，resolve 为 undefined 并返回
        if (!container) {
          resolve(undefined as T);

          return;
        }

        // 只有在关闭的时候才会为 undefined，其他情况为 Error
        if (isUndefined(result)) {
          resolve(undefined as T);
          destroy();

          return;
        }

        // 处理 Promise 的 resolve/reject
        if (rejected) {
          reject(result);
        } else {
          resolve(result as T);
        }

        // 统一处理销毁逻辑
        if (_isDestroy) {
          destroy();
        }
      } catch (error) {
        reject(error);
      }
    };

    renderDialog();
  });

  // 销毁 Promise 的方法
  const destroyPromise = (): void => {
    try {

      // 直接调用 destroy 方法，立即销毁 Promise
      destroy();
    } catch (error) {
      console.error("[DialogIndirect] 销毁 Promise 时出错:", error);
    }
  };

  return {
    promise,
    close,
    destroy: destroyPromise
  };
}
