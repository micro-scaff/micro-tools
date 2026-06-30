/**
 * 将 RGB 颜色转换为十六进制颜色
 * @param r 红色通道的值，范围为 0-255
 * @param g 绿色通道的值，范围为 0-255
 * @param b 蓝色通道的值，范围为 0-255
 * @returns 返回一个十六进制颜色字符串，例如 #FF0000
 */
const rgbToHex = (r: number, g: number, b: number): string => {
  return `#${[
    r,
    g,
    b
  ].map(channel => {
    return channel.toString(16).padStart(2, "0");
  }).join("")}`;
};

export default rgbToHex;
