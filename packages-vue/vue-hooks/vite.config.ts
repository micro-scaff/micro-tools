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

      // 仅为正式源码生成声明，避免将 Storybook 示例扫描并输出到 dist 目录之外。
      include: [
        "src"
      ],
      rollupTypes: false,
      strictOutput: true,
      outDir: "dist",
      entryRoot: "./src"
    }),
    libPlugin({
      name: "microVueHooks",
      entry: "./src/index.ts",
      fileName: "index",
      external: [
        "vue",
        "vue-router",
        "lodash-es",
        "resize-observer-polyfill"
      ],

      // @mt-kit/utils 保留在产物内，避免 UMD 使用方额外提供一个不存在的浏览器全局包。
      // 其余依赖由宿主项目共享，并在 UMD 场景映射到常见的浏览器全局变量。
      globals: {
        vue: "Vue",
        "vue-router": "VueRouter",
        "lodash-es": "_",
        "resize-observer-polyfill": "ResizeObserver"
      }
    })
  ]
});
