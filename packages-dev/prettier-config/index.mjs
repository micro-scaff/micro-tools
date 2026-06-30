/**
 * Prettier 只用于补充 ESLint 预设未覆盖的格式化场景。
 * 保持 eslint-plugin-prettier 关闭，避免 ESLint 和 Prettier
 * 在同一个命令里争夺同一批文件的格式化控制权。
 *
 * @type {import("prettier").Config}
 */
export default {

  // 单参数箭头函数不加括号，对齐 ESLint 的 arrow-parens: "as-needed" 风格
  arrowParens: "avoid",

  // 多行 HTML / JSX / Vue 标签的闭合尖括号不贴在最后一个属性同行
  bracketSameLine: false,

  // 对象字面量花括号内保留空格，对齐 ESLint 的 object-curly-spacing 规则
  bracketSpacing: true,

  // 统一输出 LF 换行，避免跨平台换行差异
  endOfLine: "lf",

  // 与 ESLint max-len 的 200 字符限制保持一致
  printWidth: 200,

  // Markdown 文本不主动重排，减少文档内容被 Prettier 大幅改写
  proseWrap: "preserve",

  // 仅在必要时给对象属性名加引号，保持代码简洁
  quoteProps: "as-needed",

  // 语句末尾保留分号，对齐 ESLint / @stylistic 的 semi 规则
  semi: true,

  // 多属性 HTML / Vue / JSX 标签每行只放一个属性，对齐 Vue / JSX 属性换行规则
  singleAttributePerLine: true,

  // 使用双引号，对齐当前 ESLint quotes 和 vue/html-quotes 风格
  singleQuote: false,

  // 使用 2 空格缩进，对齐 ESLint 与 Vue template 缩进规则
  tabWidth: 2,

  // 禁止尾随逗号，对齐 ESLint comma-dangle: "never"
  trailingComma: "none",

  // 使用空格缩进，不使用 tab
  useTabs: false,

  // Vue <script> 和 <style> 内容不额外缩进，避免和脚本区 ESLint 缩进规则冲突
  vueIndentScriptAndStyle: false,

  // 对 JSX/TSX 单独覆盖闭合尖括号位置，对齐 @stylistic/jsx-closing-bracket-location: "after-props"
  overrides: [
    {

      // prettier-ignore
      files: [
        "*.jsx",
        "*.mjsx",
        "*.tsx",
        "*.mtsx"
      ],
      options: {
        bracketSameLine: true
      }
    }
  ]
};
