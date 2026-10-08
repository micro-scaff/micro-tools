import type {
  AnimationFrameUrlOptions
} from "./types";

/**
 * 把外部数字配置转换为稳定整数。
 *
 * URL 中的帧序号和数组长度都不能使用小数；NaN、Infinity 等非有限数字则
 * 使用调用方给出的兜底值，避免 Array.from 或 padStart 收到异常参数。
 */
const toFiniteInteger = (value: number, fallback: number) => {
  return Number.isFinite(value) ? Math.trunc(value) : fallback;
};

/**
 * 生成指定数组下标对应的单张帧图片 URL。
 *
 * index 是从 0 开始的数组下标，真正写入文件名的序号为 frameStart + index。
 * 文件名整体经过 encodeURIComponent，目录部分保持原样，以兼容已经包含协议、
 * 域名、查询参数签名前缀或 CDN 路径的 framePath。
 */
const getAnimationFrameUrl = (options: AnimationFrameUrlOptions, index: number) => {

  // 至少保留 1 位；传入小数时向 0 取整，非法值回退到默认的 5 位。
  const frameDigits = Math.max(1, toFiniteInteger(options.frameDigits ?? 5, 5));

  // 同时接受 "png" 和 ".png"，内部统一成带点扩展名；空字符串表示无扩展名。
  const rawExtension = options.frameExtension ?? ".png";

  const frameExtension = rawExtension && !rawExtension.startsWith(".") ? `.${rawExtension}` : rawExtension;

  // 资源序号按非负整数处理，避免生成 000-1 这类不符合常见命名规则的文件名。
  const frameStart = Math.max(0, toFiniteInteger(options.frameStart ?? 0, 0));

  const frameNumber = (frameStart + index).toString().padStart(frameDigits, "0");

  const fileName = `${options.framePrefix}${frameNumber}${frameExtension}`;

  // 空目录会直接返回文件名；非空目录只补一个结尾斜杠，避免出现双斜杠。
  const framePath = options.framePath && !options.framePath.endsWith("/") ? `${options.framePath}/` : options.framePath;

  return `${framePath}${encodeURIComponent(fileName)}`;
};

/**
 * 按固定命名规则生成完整的动画帧 URL 数组。
 *
 * @example
 * getAnimationFrameUrls({
 *   framePath: "/assets/frames",
 *   framePrefix: "owl_",
 *   totalFrames: 74
 * });
 */
export const getAnimationFrameUrls = (options: AnimationFrameUrlOptions) => {

  // Array.from 的 length 需要非负整数。非法、负数或 0 都会安全返回空数组。
  const totalFrames = Math.max(0, toFiniteInteger(options.totalFrames, 0));

  // Array.from 天然按 index 递增生成，返回顺序可以直接交给 AnimationFrame 播放。
  return Array.from({
    length: totalFrames
  }, (_value, index) => {
    return getAnimationFrameUrl(options, index);
  });
};
