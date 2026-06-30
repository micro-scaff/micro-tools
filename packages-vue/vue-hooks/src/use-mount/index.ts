import {
  App,
  Component,
  Ref,
  createApp,
  h,
  onUnmounted,
  isRef
} from "vue";

import {
  isObject,
  isUndefined
} from "@mt-kit/utils";

import {
  TChildren,
  TExtractProps
} from "./types";

/**
 * 使用 useMount 进行渲染元素，比如渲染弹出框
 * @param rootEl 渲染元素的根元素，默认 body
 * @returns
 */
export default function useMount(rootEl?: string | Ref<HTMLElement>): <T extends Component>(
  type: T | string,
  props?: Partial<TExtractProps<T>>,
  children?: TChildren
) => App<Element> | HTMLElement {
  let app: App<Element>;

  let div: HTMLDivElement;

  onUnmounted(() => {
    if (app) {
      app.unmount();
    }

    if (div) {
      div.remove();
    }
  });

  return (type, props, children) => {
    let root: HTMLElement;

    if (isUndefined(rootEl)) {
      root = document.body;
    } else if (isRef(rootEl)) {
      root = rootEl.value;
    } else {
      const _root = document.querySelector(rootEl as string) as HTMLElement;

      if (_root) {
        root = _root;
      } else {
        throw new Error("Element not found!");
      }
    }

    if (div) {
      div.remove();
    }

    div = document.createElement("div");

    if (typeof type === "string") {
      const el = document.createElement(type);

      if (isObject(props)) {
        for (const [
          key,
          value
        ] of Object.entries(props as Record<string, unknown>)) {
          el.setAttribute(key, String(value));
        }
      }

      if (children) {
        if (typeof children === "string") {
          el.textContent = children;
        } else if (Array.isArray(children)) {
          for (const item of children) {
            el.append(item as unknown as Node);
          }
        } else {
          el.append(children as unknown as Node);
        }
      }

      root.append(el);

      return el;
    }

    root.append(div);

    app = createApp({
      render() {
        return h(type, props, children);
      }
    });

    app.mount(div);

    return app;
  };
}
