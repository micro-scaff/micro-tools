# @mt-kit/vue-echarts

[![npm version](https://img.shields.io/npm/v/@mt-kit/vue-echarts.svg?style=for-the-badge&labelColor=2c3e50&color=3498db&logo=npm&logoColor=white)](https://www.npmjs.com/package/@mt-kit/vue-echarts)
[![GitHub stars](https://img.shields.io/github/stars/micro-scaff/micro-tools?style=for-the-badge&labelColor=2c3e50&color=e74c3c&logo=github&logoColor=white)](https://github.com/micro-scaff/micro-tools/tree/main/packages-vue/vue-echarts)
[![GitHub issues](https://img.shields.io/github/issues/micro-scaff/micro-tools?style=for-the-badge&labelColor=2c3e50&color=27ae60&logo=github&logoColor=white)](https://github.com/micro-scaff/micro-tools/issues)
[![License](https://img.shields.io/github/license/micro-scaff/micro-tools?style=for-the-badge&labelColor=2c3e50&color=9b59b6&logo=opensourceinitiative&logoColor=white)](https://github.com/micro-scaff/micro-tools/blob/main/LICENSE)
[![Documentation](https://img.shields.io/badge/docs-online-blue?style=for-the-badge&labelColor=2c3e50&color=3498db&logoColor=white)](https://micro-scaff.github.io/)

Vue 3 中 ECharts 的封装，提供响应式的图表配置和便捷的使用方式。

**相关资源：**

- [ECharts 官方文档](https://echarts.apache.org/)
- [makeapie](https://www.makeapie.cn/echarts) - ECharts 社区
- [ISQQW](https://www.isqqw.com/) - ECharts 示例
- [PPchart](https://ppchart.com/) - ECharts 图表库

## 安装

```bash
npm i echarts @mt-kit/vue-echarts
```

## API

### useECharts

ECharts 图表 Hook，提供响应式的图表配置和更新方法。

**参数：**

| 参数名 | 说明 | 类型 | 是否必传 |
|--------|------|------|----------|
| chartRef | 图表容器的 ref | `Ref<HTMLDivElement>` | 是 |

**返回值：**

| 属性名 | 说明 | 类型 |
|--------|------|------|
| setOptions | 设置图表配置 | `(options: EChartsOption) => void` |

**使用示例：**

```vue
<script lang="ts" setup>
import type { ComputedRef, Ref } from "vue";
import type { EChartsOption } from "@mt-kit/vue-echarts";
import { computed, ref } from "vue";
import { useECharts } from "@mt-kit/vue-echarts";

const chartRef = ref<HTMLDivElement | null>(null);

const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);

// 推荐使用 computed 创建响应式配置
// 注意：tooltip、grid、xAxis、yAxis 等配置应该根据项目提取为公共配置
const options: ComputedRef<EChartsOption> = computed(() => ({
  tooltip: {
    trigger: "axis",
    axisPointer: {
      lineStyle: {
        width: 1,
        color: "#019680"
      }
    }
  },
  grid: {
    left: "1%",
    right: "1%",
    top: "2%",
    bottom: 0,
    containLabel: true
  },
  xAxis: {
    type: "category",
    data: Array.from({ length: 12 }).map((_item, index) => `${index + 1}月`)
  },
  yAxis: {
    type: "value",
    max: 8000,
    splitNumber: 4
  },
  series: [
    {
      data: [3000, 2000, 3333, 5000, 3200, 4200, 3200, 2100, 3000, 5100, 6000, 3200],
      type: "bar",
      barMaxWidth: 80
    }
  ]
}));

setOptions(options.value);
</script>

<template>
  <div ref="chartRef" style="height: 500px; width: 100%"></div>
</template>
```

**更多示例：** [查看完整示例](https://github.com/micro-scaff/micro-tools/blob/main/packages-vue/vue-echarts/stories/demo/index.vue)
