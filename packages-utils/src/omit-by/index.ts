import isObject from "../is-object";

interface IDictionary<T> {
    [key: string]: T;
}

type TOmitByFunction<T> = (value: T, key: string) => boolean;

/**
 * 从创建的一个从对象中，排除满足某些条件的属性的属性
 * @param obj 要处理的对象
 * @param condition 用于判断是否排除属性的条件函数
 * @returns 新的对象，排除了满足条件的属性
 */
export default function omitBy<T>(obj: IDictionary<T> | null | undefined, condition: TOmitByFunction<T>): IDictionary<T> {
  const result: IDictionary<T> = {};

  if (!isObject(obj)) {
    return result;
  }

  for (const key in obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, key)) {
      continue;
    }

    const value = obj[key];

    if (!condition(value, key)) {
      result[key] = value;
    }
  }

  return result;
}

/*
// 示例
const sampleObject = {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
};

// 从对象中排除值大于 2 的属性
const result = omitBy(sampleObject, (value) => value > 2);
console.log(result); // { a: 1, b: 2 }
*/
