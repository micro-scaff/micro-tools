/**
 * Storybook vue-Router Link(Not recommended)
 * https://www.npmjs.com/package/storybook-vue3-router
 */
import {
  ref,
  computed,
  watchEffect,
  Ref,
  UnwrapRef
} from "vue";
import {
  LocationQuery,
  useRoute,
  useRouter
} from "vue-router";

import {
  isEqual,
  queryStringToObject
} from "@mt-kit/utils";

import type {
  TQueryTypes,
  IOptions,
  TQueryHookResult
} from "./type";

/**
 * 把 search string 转成对象，如果从 URL 中获取到的参数为空串，将被忽略，且只有在 defaults 中有的才会被接受
 */
function searchToQuery<T>(
    search: LocationQuery,
    keys: Array<keyof T>,
    defaults: Partial<T>,
    types: TQueryTypes<T>
): Partial<T> {
  // eslint-disable-next-line unicorn/no-array-reduce
  return keys.reduce((result, key) => {
    const originalValue = search[key] as unknown;

    // 忽略 undefined 和 空串
    if (!originalValue) {
      if (Object.hasOwn(defaults, key)) {
        result[key] = defaults[key];
      }

      return result;
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

    return result;
  }, {} as Record<keyof T, unknown>) as Partial<T>;
}

function queryToSearch<T>(
    query: Partial<T>,
    defaults: Partial<T>
): LocationQuery {
  const filteredObj = Object.fromEntries(Object.entries(query).filter(([
    key,
    value
  ]) => {
    const stringValue = String(value);

    return stringValue !== "" && stringValue !== undefined && stringValue !== String(defaults[key as keyof T]);
  }));

  return filteredObj as LocationQuery;
}

/**
 * 修改 Vue URL 的 query 参数
 * @param {Array<keyof T>} keys 从 URL 中获取的参数的 key
 * @param {Partial<T> | undefined} defaults 设置默认值，会优先通过它把 URL 中的字符串参数转成对应的格式，且如果给的值等于默认值（或为空）将从 URL 的参数中剔除，干净
 * @param {TQueryTypes<T> | undefined} types 如果 defaults 中没有（即 undefined），则需要明确类型以便做对应的数据转换
 * @return {TQueryHookResult<T>} [url query, update url query]
 */
export default function useLocationQuery<T>({
  keys,
  defaults = {},
  types = {}
}: IOptions<T>): TQueryHookResult<T> {
  const route = useRoute();

  const router = useRouter();

  const query = ref<Partial<T>>(defaults);

  const getQuery = computed(() => {
    return searchToQuery(
        {
          ...defaults,
          ...route.query
        },
        keys,
        defaults,
        types
    );
  });

  watchEffect(() => {
    query.value = getQuery.value;
  });

  /**
   * 更新 query
   * 如果值是默认值会被忽略
   * 忽略 undefined 和 空串
   * 并把所有 value 先转换为 string
   */
  const updateQuery = function(queryUpdate: Partial<T>): void {
    const windowSearch = decodeURIComponent(window.location.search);

    const newQuery = queryToSearch(
        {
          ...queryStringToObject(windowSearch),
          ...queryUpdate
        },
        defaults
    );

    if (isEqual(query.value, newQuery)) {
      return;
    }

    router.push({
      query: newQuery
    });
  };

  return [
query as Ref<UnwrapRef<Partial<T>>>,
updateQuery
  ];
}
