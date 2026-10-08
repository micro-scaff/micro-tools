<script lang="ts" setup>
import {
  ref
} from "vue";

import {
  AnimationFrame,
  getAnimationFrameUrls,
  AnimationFrameInstance,
  AnimationFrameZoomChangePayload
} from "../../src";

// import.meta.glob 让 Vite 在构建 Storybook 时收集本地 Demo 图片并生成最终 URL。
// key 会保留为 ./assets/owl_00000.png 这种源码相对路径。
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const frameAssets = import.meta.glob<string>("./assets/owl_*.png", {
  eager: true,
  import: "default",
  query: "?url"
});

// 先用公共工具生成有序的逻辑路径，再映射到 Vite 处理后的资源 URL。
// 这样 Demo 同时验证了补零、前缀和总帧数等 URL 生成规则。
const frames = getAnimationFrameUrls({
  framePath: "./assets",
  framePrefix: "owl_",
  totalFrames: 74
}).map(frameUrl => {
  return frameAssets[frameUrl];
});

const animationFrameRef = ref<AnimationFrameInstance>();

const completedLoops = ref(0);

const currentZoom = ref(0);

// 循环模式下每播放完一轮都会触发一次 end，可用于统计或衔接业务状态。
const handleEnd = (): void => {
  completedLoops.value += 1;
};

// zoom-change 返回语义化 zoom，而不是最终 CSS scale。
const handleZoomChange = (payload: AnimationFrameZoomChangePayload): void => {
  currentZoom.value = payload.zoom;
};
</script>

<template>
  <main class="animation-frame-demo">
    <section class="animation-frame-demo__stage">
      <AnimationFrame
        ref="animationFrameRef"
        aria-label="眨眼的猫头鹰"
        class="animation-frame-demo__player"
        :duration="2400"
        :frames="frames"
        :loop-interval="600"
        :zoom="{
          draggable: true,
          min: -1,
          max: 1,
          step: 0.1,
          transitionDuration: 180
        }"
        @end="handleEnd"
        @zoom-change="handleZoomChange"
      />
    </section>

    <div class="animation-frame-demo__toolbar">
      <button
        type="button"
        @click="animationFrameRef?.pause()"
      >
        暂停
      </button>
      <button
        type="button"
        @click="animationFrameRef?.resume()"
      >
        继续
      </button>
      <button
        type="button"
        @click="animationFrameRef?.restart()"
      >
        重新播放
      </button>
      <button
        type="button"
        @click="animationFrameRef?.zoomOut()"
      >
        缩小
      </button>
      <button
        type="button"
        @click="animationFrameRef?.zoomIn()"
      >
        放大
      </button>
    </div>

    <p class="animation-frame-demo__status">
      滚轮可缩放，放大后可拖动 · 当前 zoom：{{ currentZoom.toFixed(1) }} · 已完成：{{ completedLoops }} 轮
    </p>
  </main>
</template>

<style scoped>
.animation-frame-demo {
  display: grid;
  padding: 32px;
  background: #f5f7fb;
  min-height: 640px;
  color: #25324b;
  gap: 20px;
  justify-items: center;
}

.animation-frame-demo__stage {
  display: grid;
  border: 1px solid #dfe5ef;
  border-radius: 24px;
  box-shadow: 0 18px 50px rgb(43 57 84 / 12%);
  background: #fff;
  width: min(520px, 90vw);
  height: min(520px, 90vw);
  overflow: hidden;
  place-items: center;
}

.animation-frame-demo__player {
  width: 100%;
  max-width: 500px;
}

.animation-frame-demo__toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}

.animation-frame-demo__toolbar button {
  padding: 9px 16px;
  border: 0;
  border-radius: 8px;
  background: #465fff;
  cursor: pointer;
  color: #fff;
}

.animation-frame-demo__toolbar button:hover {
  background: #3549d5;
}

.animation-frame-demo__status {
  margin: 0;
  font-size: 14px;
  color: #667085;
}
</style>
