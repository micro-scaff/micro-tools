import pluginUnicorn from "eslint-plugin-unicorn";

/**
 * Unicorn 规则配置
 *
 * https://github.com/sindresorhus/eslint-plugin-unicorn
 */
export default {

  // 注册 eslint-plugin-unicorn 插件，规则前缀为 unicorn
  plugins: {
    unicorn: pluginUnicorn
  },

  // Unicorn 规则集合
  rules: {

    // 启用 eslint-plugin-unicorn 推荐规则
    ...pluginUnicorn.configs.recommended.rules,

    // 允许不强制把可解构的属性提前解构
    "unicorn/consistent-destructuring": "off",

    // 允许函数定义在当前作用域内，避免为了作用域提升而影响阅读顺序
    "unicorn/consistent-function-scoping": "off",

    // 不检查 TODO 注释是否过期
    "unicorn/expiring-todo-comments": "off",

    // 不限制文件命名格式
    "unicorn/filename-case": "off",

    // 不强制指定模块的导入风格
    "unicorn/import-style": "off",

    // 允许使用 unicorn/name-replacements 认为应替换的命名
    "unicorn/name-replacements": "off",

    // 允许使用 null
    "unicorn/no-null": "off",

    // 允许显式返回或赋值 undefined
    "unicorn/no-useless-undefined": "off",

    // 允许模块顶层调用函数，兼容当前测试文件中的直接执行写法
    "unicorn/no-top-level-side-effects": "off",

    // 不强制使用 Array.prototype.at
    "unicorn/prefer-at": "off",

    // 不强制 DOM 节点文本使用 textContent
    "unicorn/prefer-dom-node-text-content": "off",

    // 重新导出时优先使用 export ... from，并检查已使用的中间变量
    "unicorn/prefer-export-from": [
      "error",
      {
        checkUsedVariables: true
      }
    ],

    // 不强制使用 globalThis
    "unicorn/prefer-global-this": "off",

    // 不强制使用顶层 await
    "unicorn/prefer-top-level-await": "off",

    // 不强制使用 String.raw
    "unicorn/prefer-string-raw": "off",

    // 允许 CommonJS 相关写法，不强制 ES Module
    "unicorn/prefer-module": "off",

    // 允许直接写 node 内置模块名，不强制 node: 前缀
    "unicorn/prefer-node-protocol": "off",

    "unicorn/prefer-iterator-to-array": "off",

    // 当前组件库存在 payload、dialog、clear、usePropsX 等上下文命名，不强制布尔前缀
    "unicorn/consistent-boolean-name": "off",

    // Promise 链在当前仓库中大量存在，保留 .then/.catch/.finally 写法
    "unicorn/prefer-await": "off",

    "unicorn/no-process-exit": "off"
  }
};
