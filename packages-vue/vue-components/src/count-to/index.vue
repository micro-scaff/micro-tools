<script setup lang="ts">
import {
  computed,
  CSSProperties,
  onUnmounted,
  PropType,
  reactive,
  watch
} from "vue";

import {
  COMPONENT_NAME
} from "../const";
import {
  isNumber
} from "./utils";

defineOptions({
  name: COMPONENT_NAME.COUNT_TO
});

const props = defineProps({

  /**
   * 是否自动播放
   */
  autoplay: {
    default: true,
    type: Boolean
  },

  /**
   * 根据小数位置来决定的
   *
   * 也就是具体数字到后面小数之间的分隔符
   *
   * 10.000
   */
  decimal: {
    default: ".",
    type: String
  },

  /**
   * 多少位小数
   */
  decimals: {
    default: 0,
    type: Number,
    validator(value: number) {
      return value >= 0;
    }
  },

  /**
   * 延迟执行动画开始的时间
   *
   * 默认：0
   *
   * 单位：毫秒
   */
  delay: {
    default: 0,
    type: Number,
    validator(value: number) {
      return value >= 0;
    }
  },

  /**
   * 数字滚动时间
   *
   * 默认：3000
   */
  duration: {
    default: 1000,
    type: Number
  },

  /**
   * 结束数字
   */
  endVal: {
    default: 100,
    required: true,
    type: Number
  },

  /**
   * 前缀
   */
  prefix: {
    default: "",
    type: String
  },

  /**
   * 分隔符
   */
  separator: {

    default: ",",
    type: String
  },

  /**
   * 开始数字
   */
  startVal: {
    default: 0,
    required: true,
    type: Number
  },

  /**
   * 滚动数字的样式
   */
  style: {
    default: () => {
      return {};
    },
    type: Object as PropType<CSSProperties>
  },

  /**
   * 后缀
   */
  suffix: {
    default: "",
    type: String
  }
});

// 格式化数据，返回想要展示的数据格式
const formatNumber = (val: number): string => {
  const value = val.toFixed(props.decimals);

  const x = value.split(".");

  let x1 = x[0];

  const x2 = x.length > 1 ? props.decimal + x[1] : "";

  const rgx = /(\d+)(\d{3})/;

  if (props.separator && !isNumber(props.separator)) {
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, (_match, prefix, suffix) => {
        return `${prefix}${props.separator}${suffix}`;
      });
    }
  }

  return props.prefix + x1 + x2 + props.suffix;
};

// 初始化props传进来的值
const state = reactive<{
  autoplay: boolean;
  delay: number;
  duration: number;
  end: number;
  paused: boolean;
  previousTimestamp: null | number;
  printVal: number;
  rAF: null | number;
  remaining: number;
  start: number;
  timer: null | ReturnType<typeof setTimeout>;
}>({
  autoplay: props.autoplay, // 是否自动播放
  delay: props.delay,
  duration: props.duration,
  end: props.endVal,
  paused: false, // 是否暂停
  previousTimestamp: null,
  printVal: props.startVal,
  rAF: null,
  remaining: 0,
  start: props.startVal,
  timer: null
});

// 初始化展示在页面上的值
const displayValue = computed(() => {
  return formatNumber(state.printVal);
});

// 定义一个计算属性，当开始数字大于结束数字时返回true
const stopCount = computed(() => {
  return props.startVal > props.endVal;
});

// 数字增加的过程函数
const step = (timestamp: number): void => {
  if (!state.previousTimestamp) {
    state.previousTimestamp = timestamp;
  }

  const progress = timestamp - state.previousTimestamp;

  state.remaining = state.duration - progress;

  // 如果startVal大于endVal
  state.printVal = stopCount.value ? state.start - (state.start - state.end) * (progress / state.duration) : state.start + (state.end - state.start) * (progress / state.duration);

  state.printVal = stopCount.value ? Math.max(state.printVal, props.endVal) : Math.min(state.printVal, props.endVal);

  if (progress < state.duration) {
    state.rAF = window.requestAnimationFrame(step);
  } else if (state.timer) {
    clearTimeout(state.timer);
    state.timer = null;
  }
};

// 使用setTimeOut延时执行
const delayStart = (): void => {

  // 如果有,先清除
  if (state.rAF) {
    window.cancelAnimationFrame(state.rAF);
  }

  // 如果有定时器,先清除
  if (state.timer) {
    clearTimeout(state.timer);
  }

  // 如果没有定时器,生成一个定时器
  state.timer = setTimeout(() => {
    state.rAF = window.requestAnimationFrame(step);
  }, state.delay);
};

/**
 * 开始
 */
const start = (): void => {
  state.start = props.startVal;
  state.end = props.endVal;
  state.previousTimestamp = null;
  state.paused = false;
  state.duration = props.duration;
  state.delay = props.delay;

  // 延时执行
  delayStart();
};

// 暂停
const pause = (): void => {
  if (state.rAF) {
    window.cancelAnimationFrame(state.rAF);
  }
};

// 恢复计数
const resume = (): void => {
  state.previousTimestamp = null;
  state.start = Number(state.printVal);
  state.duration = Number(state.remaining) || props.duration;
  window.requestAnimationFrame(step);
};

/**
 * 暂停之后继续
 */
const pauseResume = (): void => {
  if (state.paused) {
    resume();
    state.paused = false;
  } else {
    pause();
    state.paused = true;
  }
};

// 如果是autoplay为true时,自动执行
watch(() => {
  return state.autoplay;
}, autoplay => {
  autoplay && start();
}, {
  immediate: true
});

// 组件销毁之后取消动画
onUnmounted(() => {
  if (state.rAF) {
    window.cancelAnimationFrame(state.rAF);
  }
});

// 将start函数和pauseResume函数抛出去
defineExpose({
  pauseResume,
  start
});
</script>

<template>
  <span :style="style">
    {{ displayValue }}
  </span>
</template>
