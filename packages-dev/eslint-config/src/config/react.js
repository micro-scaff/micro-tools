import eslintReact from "@eslint-react/eslint-plugin";
import reactCompiler from "eslint-plugin-react-compiler";

const REACT_FILES = [
  "**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}"
];

const REACT_RECOMMENDED_CONFIG = eslintReact.configs["recommended-typescript"] ?? eslintReact.configs.recommended;

/**
 * React
 *
 * 使用 @eslint-react/eslint-plugin 替代 eslint-plugin-react。
 * eslint-plugin-jsx-a11y 当前未安装，暂不接入 a11y 规则。
 */
export default {
  files: REACT_FILES,
  languageOptions: {
    parserOptions: {
      ecmaFeatures: {

        // 允许解析 JSX / TSX
        jsx: true
      },

      // 使用最新 ECMAScript 语法
      ecmaVersion: "latest",

      // 按 ES Module 方式解析 React 文件
      sourceType: "module"
    }
  },
  plugins: {

    // @eslint-react 的推荐配置会注册该插件，这里保留显式注册便于 react.js 单独使用
    ...REACT_RECOMMENDED_CONFIG.plugins,

    // React Compiler 官方规则
    "react-compiler": reactCompiler
  },
  settings: {

    // 继承 @eslint-react 的 React 版本探测和 importSource 设置
    ...REACT_RECOMMENDED_CONFIG.settings
  },
  rules: {

    // 启用 @eslint-react 推荐的 React / JSX / DOM / Web API 规则
    ...REACT_RECOMMENDED_CONFIG.rules,

    // React Compiler 编译兼容性检查
    "react-compiler/react-compiler": "error",

    // Hook 调用规则，替代当前无法加载的 eslint-plugin-react-hooks
    "@eslint-react/rules-of-hooks": "error",

    // Hook 依赖数组检查，替代当前无法加载的 eslint-plugin-react-hooks
    "@eslint-react/exhaustive-deps": "error",

    // 禁止使用数组索引作为 key
    "@eslint-react/no-array-index-key": "error",

    // 禁止缺失组件 displayName
    "@eslint-react/no-missing-component-display-name": "error",

    // 统一 useState 变量和 setter 的命名
    "@eslint-react/use-state": "error",

    // 禁止在组件内部定义嵌套组件，替代 react/no-multi-comp 的主要风险控制
    "@eslint-react/no-nested-component-definitions": "error",

    // 禁止给 void DOM 元素传 children
    "@eslint-react/dom-no-void-elements-with-children": "error",

    // 参考原配置：暂不强制 JSX key
    "@eslint-react/no-missing-key": "off",

    // 禁止非必要 Fragment
    "@eslint-react/jsx-no-useless-fragment": "error",

    // 禁止 bind / inline function 这类旧 react/jsx-no-bind 暂无等价替代，先不强行模拟

    // 关闭 core 多余括号规则，避免和 JSX / TSX 场景产生冲突
    "no-extra-parens": "off"
  }
};
