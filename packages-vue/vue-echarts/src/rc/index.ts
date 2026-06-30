import {
  Ref,
  unref,
  nextTick,
  watch,
  computed,
  ref,
  onUnmounted
} from "vue";

import {
  EChartsOption
} from "echarts";

import {
  useEventListener
} from "@mt-kit/vue-hooks";
import {
  debounce
} from "@mt-kit/utils";

import {
  IFn
} from "../types";
import {
  echarts,
  timeoutFn
} from "../utils";

interface IEchartsMethods {
  setOptions: (options: EChartsOption, clear?: boolean) => Promise<unknown>;
  resize: () => void;
  echarts: typeof echarts;
  getInstance: () => echarts.ECharts | null;
}

/**
 * ECharts 的使用
 * @param elRef 渲染 echarts 的 DOM
 * @param theme 主题色
 * @returns {IEchartsMethods} IEChartsMethods
 *
 * 文档：https://echarts.apache.org/handbook/zh/get-started/
 */
export default function useEcharts(
    elRef: Ref<HTMLDivElement>,
    theme: "light" | "dark" | "default" = "default"
): IEchartsMethods {

  /**
     * 主题监听，因为有可能全局修改了主题颜色
     */
  const getDarkMode = computed(() => {
    return theme;
  });

  const cacheOptions = ref({}) as Ref<EChartsOption>;

  const getOptions = computed(() => {
    if (getDarkMode.value !== "dark") {
      return cacheOptions.value as EChartsOption;
    }

    return {
      backgroundColor: "transparent",
      ...cacheOptions.value
    } as EChartsOption;
  });

  let chartInstance: echarts.ECharts | null = null;

  /**
     * 大小改变
     */
  function resize(): void {
    chartInstance?.resize({
      animation: {
        duration: 200,
        easing: "quadraticIn"
      }
    });
  }

  const resizeFn: IFn = debounce(resize, 200);

  let removeResizeFn: IFn; // 删除窗口监听

  /**
     * 初始化 echarts
     */
  function initCharts(t = theme): void {
    const el = unref(elRef);

    if (!el || !unref(el)) {
      return;
    }

    chartInstance = echarts.init(el, t);

    // 监听窗口变化
    const {
      removeEvent
    } = useEventListener({
      name: "resize",
      func: resizeFn
    });

    removeResizeFn = removeEvent;

    if (el.offsetHeight === 0) {
      timeoutFn(() => {
        resizeFn();
      });
    }
  }

  /**
     * 设置属性
     * clear 为 true 时修改数据
     */
  function setOptions(options: EChartsOption, clear = true): Promise<unknown> {
    cacheOptions.value = options;

    return new Promise(resolve => {
      if (unref(elRef)?.offsetHeight === 0) {
        timeoutFn(() => {
          setOptions(unref(getOptions));
          resolve(null);
        });
      }

      nextTick(() => {
        timeoutFn(() => {
          if (!chartInstance) {
            initCharts(getDarkMode.value as "default");

            if (!chartInstance) {
              return;
            }
          }

          clear && chartInstance?.clear();
          chartInstance?.setOption(unref(getOptions));
          resolve(null);
        });
      });
    });
  }

  /**
     * 监听主题变化
     */
  watch(
      () => {
        return getDarkMode.value;
      },
      theme => {
        if (!chartInstance) {
          return;
        }

        chartInstance.dispose();
        initCharts(theme as "default");
        setOptions(cacheOptions.value);
      }
  );

  onUnmounted(() => {
    if (!chartInstance) {
      return;
    }

    removeResizeFn();
    chartInstance.dispose();
    chartInstance = null;
  });

  function getInstance(): echarts.ECharts | null {
    if (!chartInstance) {
      initCharts(getDarkMode.value as "default");
    }

    return chartInstance;
  }

  return {
    setOptions,
    resize,
    echarts,
    getInstance
  };
}
