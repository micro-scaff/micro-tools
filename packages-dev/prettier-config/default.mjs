/**
 * Prettier 默认配置
 *
 * 注意：由于与 ESLint 规则存在冲突，大部分格式化规则已被注释
 * 建议使用 ESLint 的 @stylistic 规则进行代码格式化
 *
 * 使用方法：
 * 1. 在项目根目录创建 .prettierrc.mjs
 * 2. 导入此配置：export { default } from "@mt-kit/prettier-config/default"
 * 3. 或者直接使用：export { default } from "@mt-kit/prettier-config"
 */

export default {

  // ===== 基础格式化规则 =====

  // 设置代码的最大行宽度
  printWidth: 80,

  // 禁止自动换行，代码始终保持一行
  proseWrap: "never",

  // 是否在语句末尾添加分号
  semi: true,

  // 使用双引号
  singleQuote: false,

  // 对象和数组的尾部不添加逗号
  trailingComma: "none",

  // 在箭头函数只有一个参数时，不保留圆括号
  arrowParens: "avoid",

  // 在 HTML、Vue 和 JSX 中，将属性放在单独的行上
  singleAttributePerLine: false,

  // 大括号内的首尾需要空格
  bracketSpacing: true,

  // 使用 2 个空格缩进
  tabWidth: 2,

  // 不使用缩进符，而使用空格
  useTabs: false,

  // 换行符使用 lf
  endOfLine: "lf",

  // 格式化嵌入的内容
  embeddedLanguageFormatting: "auto",

  // vue 文件中的 script 和 style 内不用缩进
  vueIndentScriptAndStyle: false,

  // ===== 特殊文件类型配置 =====

  // 针对特定文件类型的重写配置
  overrides: [
    {

      // 匹配所有 `.json5` 扩展名的文件

      files: [
        "*.json5"
      ],

      // 为 `.json5` 文件配置的格式化选项

      options: {

        // 保留属性名称的引号样式 (保留原始样式，不进行更改)

        quoteProps: "preserve",

        // 使用双引号 (单引号被禁用)

        singleQuote: false
      }
    },
    {

      // 匹配所有 `.json` 文件

      files: [
        "*.json"
      ],

      // 为 `.json` 文件配置的格式化选项

      options: {

        // 使用双引号

        singleQuote: false,

        // 不添加尾随逗号

        trailingComma: "none"
      }
    },
    {

      // 匹配所有 `.md` 文件

      files: [
        "*.md"
      ],

      // 为 Markdown 文件配置的格式化选项

      options: {

        // 保持 Markdown 格式

        proseWrap: "preserve",

        // 使用双引号

        singleQuote: false
      }
    },
    {

      // 匹配所有 `.html` 文件

      files: [
        "*.html"
      ],

      // 为 HTML 文件配置的格式化选项

      options: {

        // 保持 HTML 格式

        htmlWhitespaceSensitivity: "css",

        // 使用双引号

        singleQuote: false
      }
    }
  ],

  // ===== 插件配置 =====

  // 推荐插件配置
  plugins: [

    // Tailwind CSS 类名自动排序
    "prettier-plugin-tailwindcss",

    // JSX 格式化插件（实验性）
    "@prettier/plugin-jsx"
  ],

  // Tailwind CSS 插件配置
  tailwindFunctions: [
    "clsx",
    "cn",
    "tw"
  ] // 自定义函数名

  // ===== 忽略文件配置 =====

  // 注意：ignoreFiles 应该在 .prettierignore 文件中配置，而不是在这里

  // 建议创建 .prettierignore 文件来忽略不需要格式化的文件
};
