<script lang="ts" setup>
import {
  Ref,
  ComputedRef,
  computed,
  ref
} from "vue";

import {
  useECharts,
  EChartsOption
} from "../../src/index";
import {
  tooltip
} from "./charts";

const chartRef = ref<HTMLDivElement | null>(null);

const {
  setOptions
} = useECharts(chartRef as Ref<HTMLDivElement>);

const data = ref([
  3000,
  2000,
  3333,
  5000,
  3200,
  4200,
  3200,
  2100,
  3000,
  5100,
  6000,
  3200
]);

// 推荐使用 computed
const ops: ComputedRef<EChartsOption> = computed(() => {
  return {
    tooltip: tooltip(),

    // 下面的应该也依次提取
    grid: {
      left: "1%",
      right: "1%",
      top: "2  %",
      bottom: 0,
      containLabel: true
    },
    xAxis: {
      type: "category",
      data: Array.from({
        length: 12
      }).map((_item, index) => {
        return `${index + 1}月`;
      })
    },
    yAxis: {
      type: "value",
      max: 8000,
      splitNumber: 6
    },
    series: [
      {
        data: data.value,
        type: "bar",
        barMaxWidth: 80
      }
    ]
  };
});

setOptions(ops.value);

const handleClick = (): void => {
  data.value = [
    3000,
    2000,
    3333,
    5000,
    3200,
    4200,
    3200,
    2100,
    3000,
    5100,
    6000,
    320
  ];

  setOptions(ops.value, true);
};

</script>

<template>
  <div
    ref="chartRef"
    style="width: 100%; height: 500px;"
  ></div>

  <button @click="handleClick">
    修改数据
  </button>
</template>
