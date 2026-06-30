import stylistic from "@stylistic/eslint-plugin";

/**
 * ESLint Stylistic
 *
 * https://eslint.style
 */
export default {
  plugins: {
    "@stylistic": stylistic
  },
  rules: {

    // 运算符两侧必须保留空格，避免 `a+b` 这类紧贴写法影响可读性
    "@stylistic/space-infix-ops": [
      "error"
    ],

    // switch 的 case/default 冒号前不加空格、冒号后加空格
    "@stylistic/switch-colon-spacing": [
      "error",
      {
        after: true,
        before: false
      }
    ],

    // 对象属性冒号前不加空格、冒号后加空格，统一 key/value 的视觉间距
    "@stylistic/key-spacing": [
      "error",
      {
        beforeColon: false,
        afterColon: true
      }
    ],

    // 代码块左花括号前必须保留空格，例如 `if (foo) {`
    "@stylistic/space-before-blocks": "error",

    // 对 import、对象字面量、对象解构的花括号强制换行；导出包含两个及以上成员时才要求换行
    "@stylistic/object-curly-newline": [
      "error",
      {
        ExportDeclaration: {
          minProperties: 2
        },
        ImportDeclaration: {
          minProperties: 1,
          multiline: true
        },
        ObjectExpression: {
          minProperties: 1,
          multiline: true
        },
        ObjectPattern: {
          minProperties: 1,
          multiline: true
        }
      }
    ],

    // 对象的每个属性独占一行，配合 object-curly-newline 保持对象结构清晰
    "@stylistic/object-property-newline": "error",

    // 关闭缩进规则；当前换行规则和现有缩进习惯需要分开处理
    "@stylistic/indent": "off",

    // TypeScript 成员之间使用分号分隔，多行最后一个成员也要求分号
    "@stylistic/member-delimiter-style": [
      "error",
      {
        multiline: {
          delimiter: "semi",
          requireLast: true
        },
        singleline: {
          delimiter: "semi",
          requireLast: false
        },
        multilineDetection: "brackets"
      }
    ],

    // 数组只要包含元素就要求方括号换行，避免短数组和长数组风格混用
    "@stylistic/array-bracket-newline": [
      "error",
      {
        multiline: true,
        minItems: 1
      }
    ],

    // 所有语句都必须使用分号结尾
    "@stylistic/semi": [
      "error",
      "always"
    ],

    // 数组元素逐项换行，配合 array-bracket-newline 形成统一数组格式
    "@stylistic/array-element-newline": [
      "error",
      {
        minItems: 1
      }
    ],

    // 数组方括号内侧保留空格，例如 `[ value ]`
    "@stylistic/array-bracket-spacing": [
      "error",
      "always"
    ],

    // 花括号使用 1TBS 风格，并禁止单行代码块压缩写法
    "@stylistic/brace-style": [
      "error",
      "1tbs",
      {
        allowSingleLine: false
      }
    ]
  }
};
