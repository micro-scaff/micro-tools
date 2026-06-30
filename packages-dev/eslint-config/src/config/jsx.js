import stylistic from "@stylistic/eslint-plugin";

const JSX_FILES = [
  "**/*.{jsx,mjsx,tsx,mtsx}"
];

/**
 * JSX Stylistic
 *
 * 从原 eslint-plugin-react 中迁移 JSX 排版类规则到 @stylistic。
 */
export default {
  files: JSX_FILES,
  languageOptions: {
    parserOptions: {
      ecmaFeatures: {

        // 允许解析 JSX / TSX
        jsx: true
      }
    }
  },
  plugins: {

    // 注册 @stylistic，用于 JSX 排版规则
    "@stylistic": stylistic
  },
  rules: {

    // 多行 JSX 闭合标签与起始行对齐
    "@stylistic/jsx-closing-tag-location": [
      "error",
      "line-aligned"
    ],

    // JSX 每行最多一个 props
    "@stylistic/jsx-max-props-per-line": [
      "error",
      {
        maximum: 1
      }
    ],

    // JSX props 缩进统一为 2 个空格
    "@stylistic/jsx-indent-props": [
      "error",
      2
    ],

    // JSX 子元素之间不允许出现容易误读的空白
    "@stylistic/jsx-child-element-spacing": "error",

    // JSX 相邻表达式按规则换行
    "@stylistic/jsx-newline": [
      "warn",
      {
        prevent: true,
        allowMultilines: true
      }
    ],

    // JSX 每行只保留一个表达式
    "@stylistic/jsx-one-expression-per-line": [
      "error",
      {
        allow: "literal"
      }
    ],

    // 无子元素的组件和 HTML 标签必须自闭合
    "@stylistic/jsx-self-closing-comp": [
      "error",
      {
        component: true,
        html: true
      }
    ],

    // JSX 右括号放在 props 之后
    "@stylistic/jsx-closing-bracket-location": [
      "error",
      "after-props"
    ],

    // JSX 花括号内不保留空格
    "@stylistic/jsx-curly-spacing": [
      "error",
      {
        when: "never",
        children: {
          when: "never"
        }
      }
    ],

    // JSX props 和 children 中不必要的花括号要去掉
    "@stylistic/jsx-curly-brace-presence": [
      "error",
      {
        props: "never",
        children: "never"
      }
    ],

    // JSX 多行表达式需要括号包裹
    "@stylistic/jsx-wrap-multilines": [
      "error",
      {
        declaration: "parens-new-line",
        assignment: "parens-new-line",
        return: "parens-new-line",
        arrow: "parens-new-line",
        condition: "parens-new-line",
        logical: "parens-new-line",
        prop: "parens-new-line"
      }
    ],

    // JSX 首个 prop 在多 prop 场景下换行
    "@stylistic/jsx-first-prop-new-line": [
      "error",
      "multiline-multiprop"
    ],

    // JSX 标签空格风格
    "@stylistic/jsx-tag-spacing": [
      "error",
      {
        closingSlash: "never",
        beforeSelfClosing: "always",
        afterOpening: "never",
        beforeClosing: "never"
      }
    ]
  }
};
