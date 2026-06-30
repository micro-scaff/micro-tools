/**
 * 用于将对象实例的方法绑定到实例本身
 */
export default function bindMethods<T extends object>(instance: T): void {

  // 获取实例的原型对象
  const prototype = Object.getPrototypeOf(instance);

  // 获取原型对象的所有属性名
  const propertyNames = Object.getOwnPropertyNames(prototype);

  // 遍历所有属性名
  for (const propertyName of propertyNames) {

    // 获取属性的描述符
    const descriptor = Object.getOwnPropertyDescriptor(prototype, propertyName);

    // 获取属性的值
    const propertyValue = instance[propertyName as keyof T];

    // 检查属性值是否为函数，且不是构造函数，且描述符存在，且不是 getter 或 setter
    if (
      typeof propertyValue === "function" &&
      propertyName !== "constructor" &&
      descriptor &&
      !descriptor.get &&
      !descriptor.set
    ) {

      // 将方法绑定到实例上
      instance[propertyName as keyof T] = propertyValue.bind(instance);
    }
  }
}
