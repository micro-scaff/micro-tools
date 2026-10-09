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

  /**
   * Rollup 构建时需要排除的外部依赖。
   *
   * 字符串适合匹配单个明确的包名；正则表达式适合同时匹配包本身及其子路径，
   * 例如 `/^example(?:\/|$)/` 可以匹配 `example` 和 `example/sub-module`。
   * 被排除的依赖不会写入最终产物，需要由使用方安装或在运行环境中提供。
   */
  external?: Array<RegExp | string>;

  /**
   * UMD 构建中外部依赖对应的全局变量名。
   *
   * ES 模块会保留 import 语句，因此不需要该映射；UMD 产物通过 script 标签运行时，
   * Rollup 需要知道每个 external 依赖应从哪个全局变量读取。
   */
  globals?: Record<string, string>;
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
    ],
    globals = {}
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

            // 外置体积较大或应由使用方共享的依赖，避免重复打包多个副本。
            external,
            output: {

              // 为 UMD 产物声明 external 依赖对应的浏览器全局变量。
              globals
            }
          },

          // 非 watch 模式下清空输出目录，保证输出干净
          emptyOutDir: !isWatchMode
        }
      };
    }
  };
}
