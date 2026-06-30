// 判断是否为number
export const isNumber = (val: string): boolean => {
  return !Number.isNaN(Number.parseFloat(val));
};
