/**
 * 介绍
 *
 * https://github.com/mysticatea/eslint-plugin-eslint-comments
 */
import eslintComments from "eslint-plugin-eslint-comments";

/**
 * 兼容 eslint-plugin-eslint-comments@3.2.0 仍然读取的旧版 context.getSourceCode() API
 * @param {import("eslint").ESLint.Plugin} plugin 需要兼容旧 API 的 ESLint 插件对象
 * @returns {import("eslint").ESLint.Plugin} 包装后的 ESLint 插件对象
 */
const withLegacyContext = plugin => {
  return {
    ...plugin,
    rules: Object.fromEntries(Object.entries(plugin.rules).map(([
      ruleName,
      rule
    ]) => {
      return [
        ruleName,
        {
          ...rule,
          create(context) {

            // ESLint 10 将 sourceCode 作为 context.sourceCode 暴露，这里用 Proxy 补回旧方法
            const legacyContext = new Proxy(context, {
              get(target, property, receiver) {
                if (property === "getSourceCode") {
                  return () => {
                    return target.sourceCode;
                  };
                }

                return Reflect.get(target, property, receiver);
              }
            });

            // 让插件原本的规则逻辑继续使用兼容后的 context
            return rule.create(legacyContext);
          }
        }
      ];
    }))
  };
};

export default {
  plugins: {
    "eslint-comments": withLegacyContext(eslintComments)
  },
  rules: {

    // 禁止一个 eslint-enable 同时恢复多个 eslint-disable，避免恢复范围不清晰
    "eslint-comments/no-aggregating-enable": "error",

    // 禁止重复禁用同一个规则，避免无意义或误导性的 eslint-disable
    "eslint-comments/no-duplicate-disable": "error",

    // 禁止不指定规则名的 eslint-disable，避免一次性关闭过多规则
    "eslint-comments/no-unlimited-disable": "error",

    // 禁止没有对应 eslint-disable 的 eslint-enable
    "eslint-comments/no-unused-enable": "error"
  }
};
