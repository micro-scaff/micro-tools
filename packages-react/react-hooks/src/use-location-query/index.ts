import {
  useCallback,
  useMemo
} from "react";

import {
  isNull as _isNull,
  omitBy as _omitBy
} from "lodash-es";
import qs from "qs";

import useHistory from "../use-history";

/**
 * 明确 URL 查询参数（字符串）与代码中实际类型的对应关系
 */
type TQueryTypes<T> = Partial<Record<keyof T, "number" | "boolean">>;

/**
 * 明确 useLocationQuery 返回值的类型
 */
type TQueryHookResult<T> = [Partial<T>, (queryUpdate: Partial<T>, replaceMode?: boolean) => void];

interface IOptions<T> {

  // 从 URL 中获取的参数的 key
  keys: Array<keyof T>;

  // 设置默认值，会优先通过它把 URL 中的字符串参数转成对应的格式，且如果给的值等于默认值（或为空）将从 URL 的参数中剔除，干净
  defaults?: Partial<T>;

  // 如果 defaults 中没有（即 undefined），则需要明确类型以便做对应的数据转换
  types?: TQueryTypes<T>;

  // 路由切换的时候用 location.replace 还是 location.push，默认是 push
  replaceMode?: boolean;
}

/**
 * 把 search string 转成对象，如果从 URL 中获取到的参数为空串，将被忽略，且只有在 defaults 中有的才会被接受
 */
function searchToQuery<T>(search: string, keys: Array<keyof T>, defaults: Partial<T>, types: TQueryTypes<T>): Partial<T> {
  const o = qs.parse(search.replace(/^\?/, "")) as Record<keyof T, unknown>;

  const result = {} as Record<keyof T, unknown>;

  for (const key of keys) {
    const originalValue = o[key];

    if (!originalValue) { // 忽略 undefined 和 空串
      if (key in defaults) {
        result[key] = defaults[key];
      }

      continue;
    }

    // 把 originalValue 转成正确的格式
    switch (types[key] || typeof defaults[key]) {
      case "boolean": {
        result[key] = originalValue === "1" || originalValue === "true";

        break;
      }
      case "number": {
        result[key] = Number(originalValue);

        break;
      }
      default: {
        result[key] = originalValue as string;

        break;
      }
    }
  }

  return result as Partial<T>;
}

/**
 * 把 query 对象转成 search 字符串，如果值是默认值会被忽略
 */
function queryToSearch<T>(query: Partial<T>, defaults: Partial<T>): string {

  return qs.stringify(_omitBy(query, (v: unknown, k: string) => {
    return _isNull(v) || v === "" || v === defaults[k as keyof T];
  }), {
    addQueryPrefix: true
  });
}

/**
 *  URL 中 search 参数的管理
 */
export default function useLocationQuery<T>({
  keys,
  defaults = {},
  types = {},
  replaceMode
}: IOptions<T>): TQueryHookResult<T> {
  const {
    location: {
      search: hookSearch,
      hash
    },
    push,
    replace
  } = useHistory();

  const getQuery = useCallback<(search: string) => Partial<T>>(search => {
    return searchToQuery<T>(search, keys, defaults, types);
  }, [
    keys,
    defaults,
    types
  ]);

  const query = useMemo<Partial<T>>(() => {
    return getQuery(hookSearch);
  }, [
    hookSearch,
    getQuery
  ]);

  const updateQuery = useCallback((queryUpdate: Partial<T>, replaceMode2?: boolean): void => {
    const windowSearch = window.location.search;

    const newSearchString: string = queryToSearch<T>({
      ...getQuery(windowSearch),
      ...queryUpdate
    }, defaults);

    if (windowSearch === newSearchString) {
      return;
    }

    (replaceMode2 ?? replaceMode ? replace : push)({
      search: newSearchString,
      hash
    });
  }, [
    getQuery,
    defaults,
    replaceMode,
    replace,
    push,
    hash
  ]);

  return [
    query,
    updateQuery
  ];
}

export type {
  TQueryHookResult as QueryHookResult,
  TQueryTypes as QueryTypes
};
