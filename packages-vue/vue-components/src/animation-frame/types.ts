/**
 * 鼠标滚轮和组件实例方法共用的缩放配置。
 *
 * zoom 使用以 0 为原始比例的语义值：正数按 1 + zoom 放大，负数按
 * 1 / (1 + abs(zoom)) 缩小。因此 zoom=1 对应 scale=2，zoom=-1 对应 scale=0.5。
 */
export interface AnimationFrameZoomConfig {

  /**
   * 是否允许放大后的画面超出组件边界。
   */
  allowOverflow?: boolean;

  /**
   * 是否允许在画面放大后通过鼠标或触控拖动画面，默认为 false。
   */
  draggable?: boolean;

  /**
   * 最大缩放语义值，1 表示放大 100%。
   */
  max: number;

  /**
   * 最小缩放语义值，-1 对应实际 scale 0.5。
   */
  min: number;

  /**
   * 切换 frames 时是否重置缩放，默认为 true。
   */
  resetOnFramesChange?: boolean;

  /**
   * 每次滚轮缩放的语义步长，默认为 0.1。
   */
  step?: number;

  /**
   * 缩放过渡时间，单位毫秒，默认为 300。
   */
  transitionDuration?: number;
}

export interface AnimationFrameAutoZoomOptions {

  /**
   * 缩放原点百分比，默认为画布中心 `{ x: 50, y: 50 }`。
   * 超出 0-100 的值会在组件内部被夹到合法范围。
   */
  origin?: {
    x?: number;
    y?: number;
  };
}

/**
 * 每轮动画播放到末帧时，end 事件携带的信息。
 */
export interface AnimationFrameEndPayload {

  /**
   * 当前资源加载批次。
   */
  loadId: number;

  /**
   * 当前轮结束后是否还会继续循环。
   */
  willLoop: boolean;
}

/**
 * 用户滚轮缩放或调用 zoomIn/zoomOut 后的事件载荷。
 */
export interface AnimationFrameZoomChangePayload {
  zoom: number;
}

/**
 * AnimationFrame 组件支持的公开属性。
 */
export interface AnimationFrameProps {

  /**
   * 给读屏器使用的动画描述；不传时作为装饰内容隐藏。
   */
  ariaLabel?: string;

  /**
   * 动画帧尚未全部加载时优先展示的图片。
   */
  defaultFrame?: string;

  /**
   * 一轮动画播放时长，单位毫秒，默认为 1600。
   */
  duration?: number;

  /**
   * 按数组顺序播放的帧图片地址。
   */
  frames: string[];

  /**
   * 切换资源时保留旧画面，直到新首帧可绘制。
   */
  keepPreviousFrameOnSwitch?: boolean;

  /**
   * 循环间隔，单位毫秒；0 表示不循环。
   */
  loopInterval?: number;

  /**
   * 鼠标滚轮及实例方法使用的缩放配置。
   */
  zoom?: AnimationFrameZoomConfig;
}

/**
 * 通过 Vue template ref 暴露给父组件的控制方法。
 * resume/restart 返回 Promise，是因为帧缓存为空时可能需要等待重新加载。
 */
export interface AnimationFrameInstance {
  pause: () => void;
  restart: () => Promise<void>;
  resume: () => Promise<void>;
  zoomIn: (options?: AnimationFrameAutoZoomOptions) => boolean;
  zoomOut: (options?: AnimationFrameAutoZoomOptions) => boolean;
}

/**
 * 规则化序列帧 URL 的生成配置。
 *
 * 最终文件名结构为：
 * `framePrefix + 补零后的(frameStart + index) + frameExtension`。
 */
export interface AnimationFrameUrlOptions {

  /**
   * 帧序号补零后的总位数，默认为 5。
   */
  frameDigits?: number;

  /**
   * 帧图片文件扩展名，默认为 .png。
   */
  frameExtension?: string;

  /**
   * 帧图片所在目录 URL，可带或不带结尾斜杠。
   */
  framePath: string;

  /**
   * 帧图片文件名前缀。
   */
  framePrefix: string;

  /**
   * 起始帧序号，默认为 0。
   */
  frameStart?: number;

  /**
   * 需要生成的帧总数。
   */
  totalFrames: number;
}
