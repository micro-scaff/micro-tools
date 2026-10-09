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
      entry: "./src/index.ts",
      name: "microVueDirectives",
      external: [
        "vue"
      ]
    })
  ]
});
