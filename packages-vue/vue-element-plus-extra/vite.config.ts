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
      name: "microVueElementPlusExtra",

      // 这些依赖由宿主项目统一安装和复用，避免组件库重复打包框架、UI 库与工具库。
      external: [
        "vue",
        "element-plus",
        "lodash-es"
      ],

      // UMD 产物通过 script 标签使用时，从对应的浏览器全局变量读取外部依赖。
      globals: {
        vue: "Vue",
        "element-plus": "ElementPlus",
        "lodash-es": "_"
      }
    })
  ]
});
