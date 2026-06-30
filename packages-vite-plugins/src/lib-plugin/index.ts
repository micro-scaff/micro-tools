import {
  Plugin,
  UserConfig
} from "vite";

import {
  resolve
} from "path";

/**
 * 插件选项接口
 */
export interface ILibPluginOptions {

  // 库名称
  name: string;

  // 库入口文件路径，默认为 "./src/index.ts"
  entry?: string;

  // 输出文件名，默认为 "index"
  fileName?: string;

  // Rollup 构建时需要排除的外部依赖
  external?: string[];
}

/**
 * 创建 Vite 库插件
 * @param options 插件配置选项
 * @returns Vite 插件对象
 */
export default function libPlugin(options: ILibPluginOptions): Plugin {

  // 解构赋值并设置默认值，方便配置和维护
  const {
    name = "lib-plugin",
    entry = "./src/index.ts",
    fileName = "index",
    external = [
      "path",
      "vite"
    ]
  } = options;

  // 获取当前工作目录，避免重复调用 process.cwd()
  const cwd = process.cwd();

  return {
    name: "vite-plugin-lib-config",
    config: (): UserConfig => {

      // 判断是否处于 watch 模式（监听文件变更）
      const isWatchMode = process.argv.includes("--watch");

      return {
        build: {

          // 配置库模式构建
          lib: {

            // 解析入口文件的绝对路径
            entry: resolve(cwd, entry),
            name,
            fileName: format => {
              return `${fileName}.${format}.js`;
            },
            formats: [
              "es",
              "umd"
            ]
          },
          rollupOptions: {

            // 指定外部依赖，防止将这些依赖打包进最终输出
            external
          },

          // 非 watch 模式下清空输出目录，保证输出干净
          emptyOutDir: !isWatchMode
        }
      };
    }
  };
}
