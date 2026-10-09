import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import {
  defineConfig
} from "vite";
import dts from "vite-plugin-dts";

import {
  libPlugin
} from "@mt-kit/vite-plugins";

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    dts({
      tsconfigPath: "./tsconfig.json",
      rollupTypes: false,
      strictOutput: true,
      outDir: "dist",
      entryRoot: "./src"
    }),
    libPlugin({
      name: "MicroVueECharts",

      // Vue 和 ECharts 均由使用方提供，避免将框架及图表运行时重复打入组件库。
      external: [
        "vue",

        // ECharts 使用了按需导入路径。仅匹配 "echarts" 无法排除
        // "echarts/core"、"echarts/charts" 等子模块，因此需要覆盖整个包命名空间。
        /^echarts(?:\/|$)/
      ],

      // UMD 产物没有模块解析能力，需要将外部依赖映射到页面上的全局变量。
      globals: {
        vue: "Vue",

        // ECharts 的各个子路径在浏览器 UMD 场景下均由同一个 echarts 全局对象提供。
        echarts: "echarts",
        "echarts/core": "echarts",
        "echarts/charts": "echarts",
        "echarts/components": "echarts",
        "echarts/renderers": "echarts"
      }
    })
  ]
});
