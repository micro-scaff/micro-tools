import {
  ref,
  isRef,
  reactive,
  isReactive
} from "vue";

import {
  isPlainObject as _isPlainObject
} from "lodash-es";

import {
  isFunction as _isFunction,
  isUndefined as _isUndefined,
  cloneDeep as _cloneDeep
} from "@mt-kit/utils";

import {
  TRef,
  TUnwrapNestedRefs,
  TState,
  TDispatch,
  TRecord
} from "./types";

/**
 * 仿 React 中 useState
 *
 * setState() 恢复初始值
 *
 *  ref 对象，你需要使用 watchEffect 函数或者在 .value 上使用 watch 函数来监听它的变化
 *
 *  reactive 对象，你可以直接使用 watch 函数来监听它的变化
 */
export default function useState<T>(params: T): [TState<T>, TDispatch<T>] {
  const deepParams = _cloneDeep(params);

  let _params: TRef<T> | TUnwrapNestedRefs<T> | null = null;

  _params = _isPlainObject(params) ? reactive(params as object) as TUnwrapNestedRefs<T> : ref<T>(params) as TRef<T>;

  // TODO 优化！！！
  function setState(args?: Partial<T> | ((prevState: T) => T)): void {
    if(_isFunction(args) && isRef(_params)) {
      _params.value = args(_params.value as T);
    }else {
      if(_isUndefined(args)) {
        if (isRef(_params)) {
          _params.value = deepParams as T;

          return;
        }

        Object.assign(_params as TRecord, deepParams);

        return;
      }

      if(isReactive(_params)) {

        Object.assign(_params as TRecord, args);
      }

      if (isRef(_params)) {
        _params.value = args as T;
      }
    }
  }

  // 使用 unref 包裹会丢失响应
  return [
_params as TState<T>,
setState
  ];
}
