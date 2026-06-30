import {
  Ref,
  getCurrentInstance,
  onBeforeUnmount,
  ref,
  shallowRef,
  unref
} from "vue";

import {
  animationFrameThrottle
} from "@mt-kit/utils";

import {
  domAddResizeListener,
  domRemoveResizeListener
} from "./utils";

const watermarkSymbol = "watermark-dom";

const updateWatermarkText = ref<string | null>(null);

interface IWaterMarkOptionsType {

  // 自定义水印的文字大小
  fontSize?: number;

  // 自定义水印的文字颜色
  fontColor?: string;

  // 自定义水印的文字字体
  fontFamily?: string;

  // 自定义水印的文字对齐方式
  textAlign?: CanvasTextAlign;

  // 自定义水印的文字基线
  textBaseline?: CanvasTextBaseline;

  // 自定义水印的文字倾斜角度
  rotate?: number;
}

interface IUseWatermarkRes {
  setWatermark: (str: string) => void;
  clear: () => void;
  clearAll: () => void;
  waterMarkOptions?: IWaterMarkOptionsType;
  obInstance?: MutationObserver;
  targetElement?: HTMLElement;
  parentElement?: HTMLElement;
}

const sourceMap = new Map<symbol, Omit<IUseWatermarkRes, "clearAll">>();

function isDef<T = unknown>(val?: T): val is T {
  return val !== undefined;
}

function findTargetNode(el: unknown): Omit<IUseWatermarkRes, "clearAll"> | undefined {
  return [
    ...sourceMap.values()
  ].find(item => {
    return item.targetElement === el;
  });
}

function createBase64(
    str: string,
    waterMarkOptions: IWaterMarkOptionsType
): string {
  const can = document.createElement("canvas");

  const width = 300;

  const height = 240;

  Object.assign(can, {
    width,
    height
  });

  const cans = can.getContext("2d");

  if (cans) {
    const fontFamily = waterMarkOptions?.fontFamily || "Vedana";

    const fontSize = waterMarkOptions?.fontSize || 15;

    const fontColor = waterMarkOptions?.fontColor || "rgba(0, 0, 0, 0.15)";

    const textAlign = waterMarkOptions?.textAlign || "left";

    const textBaseline = waterMarkOptions?.textBaseline || "middle";

    const rotate = waterMarkOptions?.rotate || 20;

    cans.rotate((-rotate * Math.PI) / 180);
    cans.font = `${fontSize}px ${fontFamily}`;
    cans.fillStyle = fontColor;
    cans.textAlign = textAlign;
    cans.textBaseline = textBaseline;
    cans.fillText(str, width / 20, height);
  }

  return can.toDataURL("image/png");
}

const resetWatermarkStyle = (
    element: HTMLElement,
    watermarkText: string,
    waterMarkOptions: IWaterMarkOptionsType
): void => {
  element.className = `__${watermarkSymbol}`;
  element.style.pointerEvents = "none";
  element.style.display = "block";
  element.style.visibility = "visible";
  element.style.top = "0px";
  element.style.left = "0px";
  element.style.position = "absolute";
  element.style.zIndex = "100000";
  element.style.height = "100%";
  element.style.width = "100%";
  element.style.background = `url(${createBase64(
      unref(updateWatermarkText) || watermarkText,
      waterMarkOptions
  )}) left top repeat`;
};

const obFn = (): MutationObserver => {
  const obInstance = new MutationObserver(mutationRecords => {
    for (const mutation of mutationRecords) {
      for (const node of mutation.removedNodes) {
        const target = findTargetNode(node);

        if (!target) {
          return;
        }

        const {
          targetElement, parentElement
        } = target;

        // 父元素的子元素水印如果被删除 重新插入被删除的水印(防篡改，插入通过控制台删除的水印)
        if (!parentElement?.contains(targetElement as Node | null)) {
          target?.parentElement?.append(node as HTMLElement);
        }
      }

      if (mutation.attributeName === "style" && mutation.target) {
        const _target = mutation.target as HTMLElement;

        const target = findTargetNode(_target);

        if (target) {
          const {
            waterMarkOptions = {}
          } = target;

          resetWatermarkStyle(
            _target as HTMLElement,
            _target?.dataset.watermarkText || "",
            waterMarkOptions
          );
        }
      }
    }
  });

  return obInstance;
};

function clearAll(): void {
  for (const item of
    sourceMap.values()
  ) {
    item?.obInstance?.disconnect();
    item.clear();
  }
}

export default function useWatermark(
    appendEl: Ref<HTMLElement | null> = ref(document.body) as Ref<HTMLElement>,
    waterMarkOptions: IWaterMarkOptionsType = {}
): Omit<
  IUseWatermarkRes,
  "waterMarkOptions" | "obInstance" | "targetElement" | "parentElement"
> {
  const domSymbol = Symbol(watermarkSymbol);

  const appendElRaw = unref(appendEl);

  if (appendElRaw && sourceMap.has(domSymbol)) {
    const {
      setWatermark, clear
    } = sourceMap.get(domSymbol) as IUseWatermarkRes;

    return {
      setWatermark,
      clear,
      clearAll
    };
  }

  const watermarkEl = shallowRef<HTMLElement>();

  function updateWatermark(options: {
      width?: number;
      height?: number;
      str?: string;
    } = {}): void {
    const el = unref(watermarkEl);

    if (!el) {
      return;
    }

    if (isDef(options.width)) {
      el.style.width = `${options.width}px`;
    }

    if (isDef(options.height)) {
      el.style.height = `${options.height}px`;
    }

    if (isDef(options.str)) {
      el.style.background = `url(${createBase64(options.str, waterMarkOptions)}) left top repeat`;
    }
  }

  const func = animationFrameThrottle(() => {
    const el = unref(appendEl);

    if (!el) {
      return;
    }

    const {
      clientHeight: height, clientWidth: width
    } = el;

    updateWatermark({
      height,
      width
    });
  });

  const clear = (): void => {
    const domId = unref(watermarkEl);

    watermarkEl.value = undefined;
    const el = unref(appendEl);

    sourceMap.has(domSymbol) &&
      sourceMap.get(domSymbol)?.obInstance?.disconnect();
    sourceMap.delete(domSymbol);

    if (!el) {
      return;
    }

    domId && domId.remove();
    domRemoveResizeListener(el, func);
  };

  const createWatermark = (str: string): void => {
    if (unref(watermarkEl) && sourceMap.has(domSymbol)) {
      updateWatermarkText.value = str;
      updateWatermark({
        str
      });

      return;
    }

    const div = document.createElement("div");

    div.dataset.watermarkText = str; // 自定义属性 用于恢复水印
    updateWatermarkText.value = str;
    watermarkEl.value = div;
    resetWatermarkStyle(div, str, waterMarkOptions);
    const el = unref(appendEl);

    if (!el) {
      return;
    }

    const {
      clientHeight: height, clientWidth: width
    } = el;

    updateWatermark({
      str,
      width,
      height
    });
    el.append(div);
    sourceMap.set(domSymbol, {
      setWatermark,
      clear,
      parentElement: el,
      targetElement: div,
      obInstance: obFn(),
      waterMarkOptions
    });
    sourceMap.get(domSymbol)?.obInstance?.observe(el, {
      childList: true, // 子节点的变动（指新增，删除或者更改）
      subtree: true, // 该观察器应用于该节点的所有后代节点
      attributes: true // 属性的变动
    });
  };

  function setWatermark(str: string): void {
    createWatermark(str);
    domAddResizeListener(document.documentElement, func);
    const instance = getCurrentInstance();

    if (instance) {
      onBeforeUnmount(() => {
        clear();
      });
    }
  }

  return {
    setWatermark,
    clear,
    clearAll
  };
}
