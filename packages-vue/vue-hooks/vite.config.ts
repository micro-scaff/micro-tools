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
      name: "microVueHooks",
      entry: "./src/index.ts",
      fileName: "index",
      external: [
        "vue",
        "vue-router",
        "@mt-kit/utils",
        "lodash-es",
        "resize-observer-polyfill"
      ]
    })
  ]
});
