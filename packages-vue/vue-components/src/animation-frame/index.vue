<script setup lang="ts">
import {
  computed,
  onBeforeUnmount,
  onMounted,
  ref,
  watch
} from "vue";

import {
  COMPONENT_NAME
} from "../const";
import type {
  AnimationFrameAutoZoomOptions,
  AnimationFrameEndPayload,
  AnimationFrameInstance,
  AnimationFrameProps,
  AnimationFrameZoomChangePayload
} from "./types";

/* eslint-disable unicorn/no-top-level-assignment-in-function -- script setup 中的状态属于组件实例，需要由播放控制方法更新。 */

interface IZoomBounds {
  maxZoom: number;
  minZoom: number;
}

interface IZoomOrigin {
  x: number;
  y: number;
}

defineOptions({
  name: COMPONENT_NAME.ANIMATION_FRAME
});

// 组件只负责消费已经排好顺序的图片 URL；规则化 URL 的生成由
// getAnimationFrameUrls 工具完成，因此业务方仍然可以传入任意来源的帧数组。
const props = withDefaults(defineProps<AnimationFrameProps>(), {
  duration: 1600,
  keepPreviousFrameOnSwitch: false,
  loopInterval: 0
});

// end 在每一轮播放到末帧时触发；zoom-change 只在用户或公开方法主动缩放时触发。
const emit = defineEmits<{
  end: [payload: AnimationFrameEndPayload];
  zoomChange: [payload: AnimationFrameZoomChangePayload];
}>();

// 缩放值会按 step 连续累加。统一保留 6 位小数，避免 0.1 + 0.2
// 产生的浮点误差导致边界判断失效或重复触发 zoom-change。
const ZOOM_PRECISION = 1_000_000;

// viewportRef 用于计算鼠标在组件中的相对坐标，canvasRef 是实际绘制目标。
const viewportRef = ref<HTMLDivElement>();

const canvasRef = ref<HTMLCanvasElement>();

// zoomValue 是对外语义值，zoomScale 是最终写入 CSS transform 的真实倍数。
// 两者分开维护是为了让负数缩放保持直观：zoom=-1 对应 scale=0.5。
const zoomScale = ref(1);

const zoomValue = ref(0);

// 缩放原点使用百分比保存，让窗口尺寸变化后仍能保持相同的相对位置。
const zoomOrigin = ref({
  x: 50,
  y: 50
});

const isZoomOverflowVisible = computed(() => {
  return props.zoom?.allowOverflow === true && zoomValue.value > 0;
});

// 所有帧完成加载后会保存在内存中。播放阶段只切换绘制对象，
// 不再发起图片请求，避免网络延迟干扰 requestAnimationFrame 的节奏。
let loadedFrames: HTMLImageElement[] = [];

// 分别记录播放用 rAF 和循环间隔 timer，切换资源、暂停和卸载时统一取消。
let animationRequestId: number | undefined;

let loopTimerId: ReturnType<typeof setTimeout> | undefined;

// startTime 是当前轮的时间原点；currentElapsedTime 是已经播放的毫秒数。
let startTime = 0;

let currentElapsedTime = 0;

// 暂停时单独保存进度，恢复播放时用它反推新的 startTime。
let pausedElapsedTime = 0;

// 同一个图片帧可能跨越多个浏览器刷新周期，记录下标可以避免重复绘制。
let lastFrame = -1;

let isAnimationPaused = false;

// 每次开始、暂停或停止播放都会更新运行批次。animate 闭包只允许继续操作
// 自己所属的批次，避免 end 事件中的同步 pause/restart 与旧回调互相覆盖。
let playbackRunId = 0;

// 每次加载资源都会递增批次号。较旧的异步任务即使更晚完成，
// 也会因为批次不一致被丢弃，防止旧动画覆盖新动画。
let loadId = 0;

/**
 * 将数值限制在闭区间内，统一处理缩放边界、进度和鼠标坐标。
 */
const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

const getFiniteNumber = (value: number | undefined, fallback: number): number => {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
};

const normalizeZoomValue = (value: number): number => {
  return Math.round(value * ZOOM_PRECISION) / ZOOM_PRECISION;
};

const zoomTransitionDuration = computed(() => {
  return Math.max(getFiniteNumber(props.zoom?.transitionDuration, 300), 0);
});

/**
 * 获取安全的播放时长。
 *
 * duration 会参与 elapsed / duration 运算，因此必须大于 0；非法值回退到
 * 默认值，0 或负数则夹到 1ms，避免产生 Infinity、NaN 或负播放进度。
 */
const getSafeDuration = (): number => {
  return Number.isFinite(props.duration) ? Math.max(props.duration, 1) : 1600;
};

/**
 * 获取安全的循环间隔；小于 0 或非有限数字都按不循环处理。
 */
const getSafeLoopInterval = (): number => {
  return Number.isFinite(props.loopInterval) ? Math.max(props.loopInterval, 0) : 0;
};

/**
 * 归一化缩放上下界。
 *
 * 无论调用方是否把 min/max 写反，最终区间都一定包含 0：
 * 0 代表原始比例，负数负责缩小，正数负责放大。
 */
const getZoomBounds = (): IZoomBounds | undefined => {
  if (!props.zoom) {
    return undefined;
  }

  const rawMinZoom = getFiniteNumber(props.zoom.min, 0);

  const rawMaxZoom = getFiniteNumber(props.zoom.max, 0);

  return {
    maxZoom: Math.max(rawMinZoom, rawMaxZoom, 0),
    minZoom: Math.min(rawMinZoom, rawMaxZoom, 0)
  };
};

/**
 * 把语义化 zoom 转换为 CSS scale。负数使用倒数，确保 scale 永远大于 0。
 */
const syncZoomScale = (): void => {
  zoomScale.value = zoomValue.value >= 0 ? 1 + zoomValue.value : 1 / (1 + Math.abs(zoomValue.value));
};

/**
 * 更新缩放值，并按需向父组件发送变化事件。
 */
const setZoomValue = (nextZoomValue: number, emitChange = false): void => {
  const normalizedZoomValue = normalizeZoomValue(nextZoomValue);

  if (normalizedZoomValue === zoomValue.value) {
    syncZoomScale();

    return;
  }

  zoomValue.value = normalizedZoomValue;
  syncZoomScale();

  if (emitChange) {
    emit("zoomChange", {
      zoom: zoomValue.value
    });
  }
};

/**
 * 将缩放比例和缩放原点恢复到初始状态。
 */
const resetZoom = (emitChange = false): void => {
  zoomOrigin.value = {
    x: 50,
    y: 50
  };
  setZoomValue(0, emitChange);
};

/**
 * 读取实例方法传入的缩放原点。
 *
 * 自动缩放没有鼠标坐标可参考，因此默认从画布中心缩放；外部传入的百分比
 * 会被限制在 0-100，防止 transform-origin 落到画布之外。
 */
const getAutoZoomOrigin = (options?: AnimationFrameAutoZoomOptions): IZoomOrigin => {
  return {
    x: clamp(getFiniteNumber(options?.origin?.x, 50), 0, 100),
    y: clamp(getFiniteNumber(options?.origin?.y, 50), 0, 100)
  };
};

/**
 * 将目标 zoom 夹到当前配置范围内，并同步缩放原点与变化事件。
 */
const autoZoomTo = (targetZoomValue: number, options?: AnimationFrameAutoZoomOptions): boolean => {
  const zoomBounds = getZoomBounds();

  if (!zoomBounds) {
    return false;
  }

  zoomOrigin.value = getAutoZoomOrigin(options);
  setZoomValue(clamp(targetZoomValue, zoomBounds.minZoom, zoomBounds.maxZoom), true);

  return true;
};

/**
 * 清空 canvas 的真实绘图缓冲区。
 *
 * 仅调用 clearRect 会保留画布尺寸；将 width/height 置 0 可以同时清除旧画面，
 * 下次成功绘制时 renderImage 会重新设置正确的原始像素尺寸。
 */
const clearCanvas = (): void => {
  const canvas = canvasRef.value;

  if (!canvas) {
    return;
  }

  canvas.width = 0;
  canvas.height = 0;
};

/**
 * 根据滚轮方向缩放画面，并把当前鼠标位置作为缩放原点。
 *
 * 未配置 zoom 时不会阻止默认滚动；启用 zoom 后才接管滚轮事件。缩放仅改变
 * canvas 的 CSS transform，不修改像素缓冲区，也不会打断正在播放的动画。
 */
const handleWheel = (event: WheelEvent): void => {
  const {
    zoom
  } = props;

  if (!zoom) {
    return;
  }

  event.preventDefault();

  const zoomBounds = getZoomBounds();

  const zoomStep = Math.abs(getFiniteNumber(zoom.step, 0.1));

  if (!zoomBounds || zoomStep <= 0) {
    return;
  }

  const direction = event.deltaY > 0 ? -1 : 1;

  const nextZoomValue = normalizeZoomValue(clamp(
      zoomValue.value + direction * zoomStep,
      zoomBounds.minZoom,
      zoomBounds.maxZoom
  ));

  // 到达边界时保持原来的 transform-origin，避免画面在边界处意外跳动。
  if (nextZoomValue === zoomValue.value) {
    return;
  }

  const viewport = viewportRef.value;

  if (viewport) {
    const rect = viewport.getBoundingClientRect();

    // 把视口内的鼠标像素坐标换算成 0-100 的百分比坐标。
    zoomOrigin.value = {
      x: clamp(((event.clientX - rect.left) / Math.max(rect.width, 1)) * 100, 0, 100),
      y: clamp(((event.clientY - rect.top) / Math.max(rect.height, 1)) * 100, 0, 100)
    };
  }

  setZoomValue(nextZoomValue, true);
};

/**
 * 取消所有尚未完成的浏览器调度任务。
 */
const cancelScheduledAnimation = (): void => {
  if (animationRequestId !== undefined) {
    cancelAnimationFrame(animationRequestId);
    animationRequestId = undefined;
  }

  if (loopTimerId !== undefined) {
    clearTimeout(loopTimerId);
    loopTimerId = undefined;
  }
};

/**
 * 重置单轮播放状态，但不释放已经加载好的图片。
 */
const resetPlaybackState = (): void => {
  startTime = 0;
  currentElapsedTime = 0;
  pausedElapsedTime = 0;
  lastFrame = -1;
  isAnimationPaused = false;
};

/**
 * 停止播放和循环等待，并把下一次播放恢复为从头开始。
 */
const stopAnimation = (): void => {

  // 先让当前 animate 闭包失效，防止它在同步事件回调返回后继续安排任务。
  playbackRunId += 1;
  cancelScheduledAnimation();
  resetPlaybackState();
};

/**
 * 加载并解码单张图片。
 *
 * 先等待 onload，再尽量等待 decode，可以降低首次绘制时同步解码造成的卡顿。
 * 个别浏览器或图片格式不支持 decode 时，仍然使用已经完成 onload 的图片。
 */
const loadFrameImage = (frameUrl: string): Promise<HTMLImageElement> => {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();

    image.addEventListener("load", async () => {
      try {
        await image.decode?.();
      } catch {

        // onload 已确认图片可用，解码失败时仍允许浏览器直接绘制。
      }

      resolve(image);
    });

    image.addEventListener("error", () => {
      reject(new Error(`Failed to load sequence frame: ${image.src}`));
    });

    image.src = frameUrl;
  });
};

/**
 * 将图片按原始像素尺寸绘制到 canvas。
 *
 * CSS 决定画布在页面上的展示宽度；canvas width/height 则保持图片真实尺寸，
 * 从而避免浏览器先按默认 300×150 缓冲区绘制再拉伸造成模糊。
 */
const renderImage = (frame: HTMLImageElement): void => {
  const canvas = canvasRef.value;

  const context = canvas?.getContext("2d");

  if (!canvas || !context) {
    return;
  }

  if (canvas.width !== frame.naturalWidth || canvas.height !== frame.naturalHeight) {
    canvas.width = frame.naturalWidth;
    canvas.height = frame.naturalHeight;
  }

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(frame, 0, 0, canvas.width, canvas.height);
};

/**
 * 按已加载数组中的下标绘制一帧；越界时安全忽略。
 */
const renderFrame = (index: number): void => {
  const frame = loadedFrames[index];

  if (frame) {
    renderImage(frame);
  }
};

/**
 * 并行预加载所有正式帧。
 *
 * Promise.allSettled 允许单张资源失败而不阻断整段动画；过滤后仍保持成功帧
 * 在原数组中的相对顺序。若 defaultFrame 与某一正式帧相同，则复用已加载对象。
 */
const preloadFrames = async (
    frames: string[],
    cachedFrame?: { image: HTMLImageElement;
url: string; }
): Promise<HTMLImageElement[]> => {
  const promises = frames.map(frameUrl => {
    return cachedFrame?.url === frameUrl ? Promise.resolve(cachedFrame.image) : loadFrameImage(frameUrl);
  });

  const results = await Promise.allSettled(promises);

  return results.
      filter((result): result is PromiseFulfilledResult<HTMLImageElement> => {
        return result.status === "fulfilled";
      }).
      map(result => {
        return result.value;
      });
};

/**
 * 从指定进度启动一轮动画。
 *
 * 每次浏览器刷新时用 elapsed / duration 得到 0-1 进度，再映射到图片下标。
 * 播放到末帧后触发 end；loopInterval 大于 0 时等待指定时间再开始下一轮。
 */
const playAnimation = (initialElapsedTime = 0): void => {
  const duration = getSafeDuration();

  cancelScheduledAnimation();

  // 保存本轮唯一标识。后续 restart 会创建新标识，旧 animate 即使仍处于
  // 调用栈中，也只能结束自身，不能再创建属于旧一轮的 rAF 或 timer。
  const currentPlaybackRunId = ++playbackRunId;

  startTime = 0;
  currentElapsedTime = clamp(initialElapsedTime, 0, duration);
  pausedElapsedTime = currentElapsedTime;
  lastFrame = -1;
  isAnimationPaused = false;

  if (loadedFrames.length === 0) {
    return;
  }

  const animate = (time: number): void => {

    // 当前回调可能已经被同步触发的 restart/stop 淘汰，失效后不再绘制或调度。
    if (currentPlaybackRunId !== playbackRunId) {
      return;
    }

    // 第一次回调时建立时间原点；恢复播放时扣除暂停前已完成的进度。
    if (!startTime) {
      startTime = time - pausedElapsedTime;
    }

    currentElapsedTime = Math.min(time - startTime, duration);

    // progress=1 时必须准确落到 loadedFrames.length - 1，确保末帧可见。
    const progress = Math.min(currentElapsedTime / duration, 1);

    const currentFrame = Math.floor(progress * (loadedFrames.length - 1));

    // 仅在图片下标变化时操作 Canvas，同一帧跨多个刷新周期不会重复绘制。
    if (currentFrame !== lastFrame) {
      renderFrame(currentFrame);
      lastFrame = currentFrame;
    }

    if (progress < 1) {
      animationRequestId = requestAnimationFrame(animate);

      return;
    }

    // 当前轮已经完成，先通知外部，再根据 loopInterval 决定是否继续。
    const loopInterval = getSafeLoopInterval();

    animationRequestId = undefined;
    pausedElapsedTime = 0;
    emit("end", {
      loadId,
      willLoop: loopInterval > 0
    });

    // emit 是同步的，父组件可能在 end 回调中调用 pause、restart 或卸载组件。
    // 这些操作会使当前批次失效；旧回调此时必须结束，不能再创建循环定时器。
    if (currentPlaybackRunId !== playbackRunId || isAnimationPaused) {
      return;
    }

    if (loopInterval <= 0) {
      return;
    }

    // 循环等待期间不占用 requestAnimationFrame；计时结束后再恢复渲染循环。
    loopTimerId = setTimeout(() => {

      // 正常情况下失效 timer 会被取消；这里再次校验批次，防止临界时序下
      // 已进入任务队列的旧 timer 恢复一段已经停止或重启的动画。
      if (currentPlaybackRunId !== playbackRunId) {
        return;
      }

      loopTimerId = undefined;
      startTime = 0;
      lastFrame = -1;
      currentElapsedTime = 0;
      pausedElapsedTime = 0;
      animationRequestId = requestAnimationFrame(animate);
    }, loopInterval);
  };

  // 在等待第一个 rAF 前同步绘制起始帧，避免组件短暂显示空画布。
  renderFrame(Math.floor((currentElapsedTime / duration) * (loadedFrames.length - 1)));
  animationRequestId = requestAnimationFrame(animate);
};

/**
 * 停止旧动画，加载当前 props 中的资源并从头播放。
 *
 * 加载顺序：
 * 1. 取消旧的 rAF/timer，并让旧帧缓存失效；
 * 2. 优先绘制 defaultFrame（未传时使用 frames[0]）；
 * 3. 并行加载全部正式帧；
 * 4. 批次仍有效时才替换缓存并启动播放。
 */
const loadAndPlay = async (): Promise<void> => {
  const currentLoadId = ++loadId;

  // 拷贝数组生成本批次快照，避免加载过程中父组件原地修改 frames。
  const frames = [
    ...props.frames
  ];

  stopAnimation();
  loadedFrames = [];

  if (props.zoom?.resetOnFramesChange !== false) {
    resetZoom(true);
  }

  // keepPreviousFrameOnSwitch 只影响加载过渡期，不会复用旧帧参与新动画。
  const defaultFrameUrl = props.defaultFrame || frames[0];

  const shouldKeepPreviousFrame = props.keepPreviousFrameOnSwitch && Boolean(defaultFrameUrl);

  if (!shouldKeepPreviousFrame) {
    clearCanvas();
  }

  let cachedFrame: { image: HTMLImageElement;
url: string; } | undefined;

  if (defaultFrameUrl) {
    try {
      const defaultFrame = await loadFrameImage(defaultFrameUrl);

      // 在 await 期间可能已经切换到另一组 frames，过期结果必须直接丢弃。
      if (currentLoadId !== loadId) {
        return;
      }

      renderImage(defaultFrame);

      // 兜底图若也在正式帧中，后续预加载会直接复用，避免重复请求。
      cachedFrame = {
        image: defaultFrame,
        url: defaultFrameUrl
      };
    } catch {

      // 兜底帧失败不会阻止其他帧继续加载。
    }
  }

  if (currentLoadId !== loadId) {
    return;
  }

  // 正式帧加载也可能晚于下一次资源切换，因此完成后再次核对批次。
  const nextFrames = await preloadFrames(frames, cachedFrame);

  if (currentLoadId !== loadId) {
    return;
  }

  loadedFrames = nextFrames;

  if (loadedFrames.length === 0) {
    if (!cachedFrame) {
      clearCanvas();
    }

    return;
  }

  playAnimation();
};

/**
 * 暂停播放并保留当前画面和图片缓存。
 * 若暂停发生在循环等待阶段，恢复时从下一轮第 0 帧开始。
 */
const pause = (): void => {
  if (loadedFrames.length === 0 || isAnimationPaused) {
    return;
  }

  pausedElapsedTime = loopTimerId === undefined ? currentElapsedTime : 0;
  isAnimationPaused = true;

  // 使当前 animate 闭包立即失效，包含正在同步执行 end 事件的情况。
  playbackRunId += 1;
  cancelScheduledAnimation();
};

/**
 * 从 pause 保存的毫秒进度继续播放。
 */
const resume = async (): Promise<void> => {
  if (!isAnimationPaused) {
    return;
  }

  if (loadedFrames.length === 0) {
    await loadAndPlay();

    return;
  }

  playAnimation(pausedElapsedTime);
};

/**
 * 使用已有缓存从第 0 帧重播；缓存尚未建立时先重新加载资源。
 */
const restart = async (): Promise<void> => {
  if (loadedFrames.length === 0) {
    await loadAndPlay();

    return;
  }

  playAnimation();
};

/**
 * 自动缩放到 zoom.max，未启用 zoom 时返回 false。
 */
const zoomIn = (options?: AnimationFrameAutoZoomOptions): boolean => {
  const zoomBounds = getZoomBounds();

  return zoomBounds ? autoZoomTo(zoomBounds.maxZoom, options) : false;
};

/**
 * 自动缩放到 zoom.min，未启用 zoom 时返回 false。
 */
const zoomOut = (options?: AnimationFrameAutoZoomOptions): boolean => {
  const zoomBounds = getZoomBounds();

  return zoomBounds ? autoZoomTo(zoomBounds.minZoom, options) : false;
};

// 公开实例方法，父组件可通过 template ref 控制播放和缩放。
defineExpose<AnimationFrameInstance>({
  pause,
  restart,
  resume,
  zoomIn,
  zoomOut
});

// zoom 对象允许被父组件原地修改，因此使用深度监听并实时夹住当前值。
watch(
    () => {
      return props.zoom;
    },
    () => {
      const zoomBounds = getZoomBounds();

      if (!zoomBounds) {
        resetZoom();

        return;
      }

      setZoomValue(clamp(zoomValue.value, zoomBounds.minZoom, zoomBounds.maxZoom));
    },
    {
      deep: true,
      immediate: true
    }
);

// 图片加载依赖浏览器的 Image API，延迟到 mounted 后启动可避免 SSR 阶段访问它。
onMounted(() => {
  watch(
      () => {
        return [
          props.frames,
          props.duration,
          props.defaultFrame,
          props.loopInterval
        ];
      },
      loadAndPlay,
      {
        deep: true,
        immediate: true
      }
  );
});

// 卸载时让未完成的图片 Promise 失效，并取消所有浏览器调度任务。
onBeforeUnmount(() => {
  loadId += 1;
  stopAnimation();
});
</script>

<template>
  <div
    ref="viewportRef"
    class="animation-frame"
    :class="{
      'animation-frame--overflow-visible': isZoomOverflowVisible
    }"
    @wheel="handleWheel"
  >
    <canvas
      ref="canvasRef"
      class="animation-frame__canvas"
      :aria-hidden="ariaLabel ? undefined : true"
      :aria-label="ariaLabel"
      :role="ariaLabel ? 'img' : undefined"
      :style="{
        transform: `scale(${zoomScale})`,
        transformOrigin: `${zoomOrigin.x}% ${zoomOrigin.y}%`,
        transitionDuration: `${zoomTransitionDuration}ms`
      }"
    ></canvas>
  </div>
</template>

<style scoped>
.animation-frame {
  display: inline-block;
  line-height: 0;
  overflow: hidden;
}

.animation-frame--overflow-visible {
  overflow: visible;
}

.animation-frame__canvas {
  display: block;
  width: 100%;
  height: auto;
  transition-property: transform;
  transition-timing-function: ease-out;
}
</style>
