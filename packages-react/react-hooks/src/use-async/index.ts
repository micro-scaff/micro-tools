import {
  useCallback,
  useMemo,
  useState
} from "react";

import {
  debounce as _debounce,
  DebouncedFunc
} from "lodash-es";

import useIsUnmounted from "../use-is-unmounted";

interface IConfig {
  ignoreAlert?: boolean;        // 不显示错误弹窗
  debounce?: boolean | number;    // 是否防抖，或指定防抖的时间（ms）
  error?: () => void;             // 请求错误时的额外处理函数
}

// 定义异步函数类型，使用泛型指定参数类型 Args 和返回值类型 R
export type TAsyncFunction<Args extends unknown[] = unknown[], R = unknown> = (
  ...args: Args
) => Promise<R>;

export interface IAsyncResult<Args extends unknown[] = unknown[], R = unknown> {
  run: (...args: Args) => Promise<R>;
  runWithDebounce?: DebouncedFunc<(...args: Args) => Promise<R>>;
  data?: R;
  loading: boolean;
}

interface IStateResult<R> {
  loading: boolean;
  data?: R;
}

const defaultConfig: IConfig = {
  ignoreAlert: false,
  debounce: false,
  error: undefined
};

/**
 * @deprecated useServer 用于执行异步请求
 *
 * @param asyncFunction 异步请求函数，返回 Promise，使用泛型设置参数和返回值类型
 * @param initData      初始数据
 * @param config        配置项
 * @returns             包含 run、runWithDebounce、loading、data 的结果对象
 */
export default function useAsync<Args extends unknown[], R>(
    asyncFunction: (...args: Args) => Promise<R>,
    initData?: R,
    config: IConfig = defaultConfig
): IAsyncResult<Args, R> {
  const isUnmounted = useIsUnmounted();

  const [
    stateResult,
    setStateResult
  ] = useState<IStateResult<R>>({
    loading: false,
    data: initData
  });

  const run = useCallback((...args: Args): Promise<R> => {
    setStateResult(state => {
      return {
        ...state,
        loading: true
      };
    });

    return asyncFunction(...args).
        then(response => {
          if (!isUnmounted()) {
            setStateResult({
              data: response,
              loading: false
            });
          }

          return response;
        }).
        catch((error: Error) => {
          if (!isUnmounted()) {
            setStateResult(state => {
              return {
                ...state,
                loading: false
              };
            });
          }

          if (!config.ignoreAlert) {
            console.error("请求失败时的处理");

            if (config.error) {
              config.error();
            }
          }

          throw error;
        });
  }, [
    asyncFunction,
    isUnmounted,
    config
  ]);

  const runWithDebounce = useMemo(() => {
    if (config.debounce) {
      const delay = typeof config.debounce === "number" ? config.debounce : 250;

      return _debounce(run, delay);
    }

    return undefined;
  }, [
    run,
    config.debounce
  ]);

  return {
    run,
    runWithDebounce,
    loading: stateResult.loading,
    data: stateResult.data
  };
}
