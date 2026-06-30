/**
 * JSDoc 注释规则配置
 *
 * https://github.com/gajus/eslint-plugin-jsdoc
 */
import pluginJsdoc from "eslint-plugin-jsdoc";

export default {

  // 注册 eslint-plugin-jsdoc 插件，规则前缀为 jsdoc
  plugins: {
    jsdoc: pluginJsdoc
  },
  rules: {

    // 检查 @access 标签的取值是否合法
    "jsdoc/check-access": "warn",

    // 检查 @param 标签中的参数名是否和函数参数一致
    "jsdoc/check-param-names": "warn",

    // 检查 @property 标签中的属性名是否重复或无效
    "jsdoc/check-property-names": "warn",

    // 检查 JSDoc 类型语法是否有效
    "jsdoc/check-types": "warn",

    // 禁止没有内容的 JSDoc 标签
    "jsdoc/empty-tags": "warn",

    // 要求 @implements 标签只能写在类声明上
    "jsdoc/implements-on-classes": "warn",

    // 禁止在 JSDoc 类型中写默认值，默认值应放在代码参数里
    "jsdoc/no-defaults": "warn",

    // 禁止 JSDoc 注释中出现多余的连续星号
    "jsdoc/no-multi-asterisks": "warn",

    // 要求 @param 标签必须写参数名
    "jsdoc/require-param-name": "warn",

    // 要求对象类型的属性使用 @property 进行说明
    "jsdoc/require-property": "warn",

    // 要求 @property 标签必须写属性描述
    "jsdoc/require-property-description": "warn",

    // 要求 @property 标签必须写属性名
    "jsdoc/require-property-name": "warn",

    // 检查 @returns 是否和函数实际返回行为一致
    "jsdoc/require-returns-check": "warn",

    // 要求 @returns 标签必须写返回值描述
    "jsdoc/require-returns-description": "warn",

    // 检查 @yields 是否和生成器函数实际 yield 行为一致
    "jsdoc/require-yields-check": "warn"
  }
};
