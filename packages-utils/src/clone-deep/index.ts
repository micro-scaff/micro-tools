/* eslint-disable guard-for-in */
/* eslint-disable @typescript-eslint/no-empty-object-type */
import isFunction from "../is-function";
import isObject from "../is-object";

/**
 * 深拷贝
 *
 * @param value
 * @param map 外部使用的时候，不需要传入
 * @return value
 *
 * 对所有类型都进行了拷贝
 *
 * lodashjs、underscorejs 对函数、Symbol、Set、Map 等没做深拷贝处理
 *
 * 不建议使用：JSON.parse(JSON.stringify(value)); 它存在以下缺陷（案例见 ../stories/demo-clone-deep.html）：
 * ① 无法解析 Symbol 作为 key 或者 value
 * ② 无法循环引用
 */
export default function cloneDeep<T>(
    value: T | symbol,
    map = new WeakMap()
): T | {} {
  try {

    // Set 类型
    if (value instanceof Set) {
      if (map.has(value)) {
        return map.get(value);
      }

      const newSet = new Set();

      map.set(value, newSet);

      for (const item of value) {
        newSet.add(cloneDeep(item, map));
      }

      return newSet;
    }

    // Map 类型
    if (value instanceof Map) {
      if (map.has(value)) {
        return map.get(value);
      }

      const newMap = new Map();

      map.set(value, newMap);

      for (const [
        key,
        val
      ] of value) {
        newMap.set(cloneDeep(key, map), cloneDeep(val, map));
      }

      return newMap;
    }

    // Symbol 类型
    if (typeof value === "symbol") {
      return Symbol(value.description);
    }

    // 函数类型
    if (isFunction(value)) {
      return function(...args: unknown[]) {
        // eslint-disable-next-line unicorn/no-this-outside-of-class
        return value.apply(this, args);
      };
    }

    // 对象类型
    if (!isObject(value)) {
      return value;
    }

    // 判断 map 中是否有值，有了直接 return
    if (map.has(value)) {
      return map.get(value);
    }

    // 判断传入的对象是数组, 还是对象
    const newValue = Array.isArray(value) ? [] : {};

    // Map 没有值
    map.set(value, newValue);

    for (const key in value) {
      (newValue as Record<string, unknown>)[key] = cloneDeep(value[key], map);
    }

    // Symbol 作为 key 的处理（这个可以不做 Symbol(sKey.description) 处理）
    const symbolKeys = Object.getOwnPropertySymbols(value);

    for (const sKey of symbolKeys) {
      const newSKey = Symbol(sKey.description);

      Object.defineProperty(newValue, newSKey, {
        enumerable: true,
        configurable: true,
        writable: true,
        value: cloneDeep(Reflect.get(value, sKey), map)
      });
    }

    return newValue;
  } catch {
    throw new Error("Deep clone handle error!");
  }
}
