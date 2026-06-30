import pluginTs from "@typescript-eslint/eslint-plugin"; // 引入 @typescript-eslint 的 ESLint 插件规则集合
import parserTs from "@typescript-eslint/parser"; // 引入 @typescript-eslint 的 parser，用于解析 TypeScript / TSX 语法

/**
 * TypeScript 规则配置
 *
 * 当前直接使用 @typescript-eslint/eslint-plugin 和 @typescript-eslint/parser。
 */
export default {

  // 只对 TypeScript、TSX、MTS、CTS 和 Vue 文件启用这组规则
  files: [

    // 匹配 .ts、.tsx、.mts、.mtsx、.cts、.ctsx 文件
    "**/*.?([cm])[t]s?(x)",

    // 匹配 Vue 单文件组件，便于检查其中的 TypeScript 代码
    "**/*.vue"
  ],

  // TypeScript 文件的语言解析配置
  languageOptions: {

    // 使用 @typescript-eslint/parser 解析 TypeScript 语法
    parser: parserTs,

    // parser 的行为配置
    parserOptions: {

      // 不自动创建默认 TypeScript Program，避免额外的类型检查成本
      createDefaultProgram: false,

      // 启用 JSX 语法解析
      ecmaFeatures: {

        // 允许解析 JSX
        jsx: true
      },

      // 使用最新 ECMAScript 语法
      ecmaVersion: "latest",

      // JSX 转换时使用 React 作为 pragma
      jsxPragma: "React",

      // 暂不启用 project，避免 eslint.config.js 等非 TS 项触发 tsconfig 归属错误
      // project: "**/tsconfig.*?.json",

      // 按 ES Module 方式解析源码
      sourceType: "module"
    }
  },

  // 注册 @typescript-eslint 插件，规则前缀为 @typescript-eslint
  plugins: {

    // 将插件挂载到 @typescript-eslint 命名空间
    "@typescript-eslint": pluginTs
  },

  // TypeScript 规则集合
  rules: {

    // 关闭与 TypeScript 编译器重复或冲突的 ESLint core 规则
    ...pluginTs.configs["eslint-recommended"].overrides?.[0].rules,

    // 启用 @typescript-eslint 的严格规则
    ...pluginTs.configs.strict.rules,

    // 启用 @typescript-eslint 的推荐规则
    ...pluginTs.configs.recommended.rules,

    // 禁止无说明的 @ts-check、@ts-expect-error、@ts-ignore、@ts-nocheck 注释
    "@typescript-eslint/ban-ts-comment": [

      // 违规时按错误处理
      "error",

      // 细化各种 TypeScript 指令注释的允许方式
      {

        // 不允许使用 @ts-check
        "ts-check": false,

        // 允许带说明的 @ts-expect-error
        "ts-expect-error": "allow-with-description",

        // 允许带说明的 @ts-ignore
        "ts-ignore": "allow-with-description",

        // 允许带说明的 @ts-nocheck
        "ts-nocheck": "allow-with-description"
      }
    ],

    // 优先使用 interface 定义对象类型
    "@typescript-eslint/consistent-type-definitions": [

      // 不符合时给出警告
      "warn",

      // 类型定义优先使用 interface
      "interface"
    ],

    // 统一 TypeScript 命名风格
    "@typescript-eslint/naming-convention": [

      // 命名不符合时按错误处理
      "error",

      // 函数名使用 camelCase 或 PascalCase
      {

        // 函数名允许 strictCamelCase 和 StrictPascalCase
        format: [

          // 严格小驼峰，例如 fetchUser
          "strictCamelCase",

          // 严格大驼峰，例如 FetchUser
          "StrictPascalCase"
        ],

        // 允许函数名前带下划线
        leadingUnderscore: "allow",

        // 该规则项作用于函数
        selector: "function"
      },

      // 变量名使用 camelCase、PascalCase 或 UPPER_CASE
      {

        // 变量名允许的格式
        format: [

          // 严格小驼峰，例如 userName
          "strictCamelCase",

          // 严格大驼峰，例如 UserName
          "StrictPascalCase",

          // 全大写常量，例如 USER_NAME
          "UPPER_CASE"
        ],

        // 跳过类似 FOO__BAR 的变量名
        filter: {

          // 不匹配该正则时才应用本规则项
          match: false,

          // 双下划线分隔的大写变量名
          regex: "[A-Z\\d]__[A-Z\\d]"
        },

        // 允许变量名前带下划线
        leadingUnderscore: "allow",

        // 该规则项作用于变量
        selector: "variable"
      },

      // 函数参数名使用 camelCase
      {

        // 参数名允许 strictCamelCase
        format: [

          // 严格小驼峰，例如 userId
          "strictCamelCase"
        ],

        // 允许参数名前带下划线
        leadingUnderscore: "allow",

        // 该规则项作用于函数参数
        selector: "parameter"
      },

      // 类、接口、类型别名、枚举等类型名使用 PascalCase
      {

        // 类型名允许 StrictPascalCase
        format: [

          // 严格大驼峰，例如 UserProfile
          "StrictPascalCase"
        ],

        // 该规则项作用于所有类型类名称
        selector: "typeLike"
      },

      // 枚举名使用 E 前缀
      {

        // 枚举名允许 StrictPascalCase
        format: [

          // 严格大驼峰，例如 EUserStatus
          "StrictPascalCase"
        ],

        // 枚举名必须以 E 开头
        prefix: [

          // 枚举前缀
          "E"
        ],

        // 该规则项作用于 enum
        selector: "enum"
      },

      // 接口名使用 I 前缀
      {

        // 接口名允许 StrictPascalCase
        format: [

          // 严格大驼峰，例如 IUser
          "StrictPascalCase"
        ],

        // 接口名必须以 I 开头
        prefix: [

          // 接口前缀
          "I"
        ],

        // 该规则项作用于 interface
        selector: "interface"
      },

      // 类型别名使用 T 前缀
      {

        // 类型别名允许 StrictPascalCase
        format: [

          // 严格大驼峰，例如 TUser
          "StrictPascalCase"
        ],

        // 类型别名必须以 T 开头
        prefix: [

          // 类型别名前缀
          "T"
        ],

        // 该规则项作用于 type alias
        selector: "typeAlias"
      },

      // 私有成员使用 camelCase
      {

        // 私有成员名允许 strictCamelCase
        format: [

          // 严格小驼峰，例如 privateValue
          "strictCamelCase"
        ],

        // 允许私有成员名前带下划线
        leadingUnderscore: "allow",

        // 只匹配 private 成员
        modifiers: [

          // private 修饰符
          "private"
        ],

        // 该规则项作用于成员类名称
        selector: "memberLike"
      },

      // 枚举成员使用 PascalCase 或 UPPER_CASE
      {

        // 跳过类似 FOO__BAR 的枚举成员
        filter: {

          // 不匹配该正则时才应用本规则项
          match: false,

          // 双下划线分隔的大写枚举成员
          regex: "[A-Z\\d]__[A-Z\\d]"
        },

        // 枚举成员允许的格式
        format: [

          // 严格大驼峰，例如 Pending
          "StrictPascalCase",

          // 全大写，例如 PENDING
          "UPPER_CASE"
        ],

        // 允许枚举成员名前带下划线
        leadingUnderscore: "allow",

        // 该规则项作用于枚举成员
        selector: "enumMember"
      },

      // 解构出来的变量和参数不强制命名格式
      {

        // 解构命名不限制格式
        format: null,

        // 只匹配解构声明
        modifiers: [

          // destructured 修饰符
          "destructured"
        ],

        // 该规则项作用于变量和参数
        selector: [

          // 解构变量
          "variable",

          // 解构参数
          "parameter"
        ]
      }
    ],

    // 禁止枚举中出现重复值
    "@typescript-eslint/no-duplicate-enum-values": "error",

    // 限制空函数，但允许常见占位函数形态
    "@typescript-eslint/no-empty-function": [

      // 违规时按错误处理
      "error",

      // 配置允许为空的函数类型
      {

        // 允许这些函数形态为空
        allow: [

          // 允许空箭头函数
          "arrowFunctions",

          // 允许空普通函数
          "functions",

          // 允许空方法
          "methods"
        ]
      }
    ],

    // 禁止使用 any 类型
    "@typescript-eslint/no-explicit-any": "error",

    // 允许 namespace 语法
    "@typescript-eslint/no-namespace": "off",

    // 禁止非空断言操作符
    "@typescript-eslint/no-non-null-assertion": "error",

    // 禁止 require 导入写法
    "@typescript-eslint/no-require-imports": "error",

    // 不强制导出函数和方法显式声明返回类型
    "@typescript-eslint/explicit-module-boundary-types": "off",

    // TypeScript 由类型系统处理未定义变量，关闭 core no-undef
    "no-undef": "off",

    // 对 Function 类型这类不安全函数类型发出警告
    "@typescript-eslint/no-unsafe-function-type": "warn",

    // 禁止无用表达式，但允许短路和三元表达式
    "@typescript-eslint/no-unused-expressions": [

      // 违规时按错误处理
      "error",

      // 放宽部分表达式形态
      {

        // 允许短路表达式
        allowShortCircuit: true,

        // 允许三元表达式
        allowTernary: true
      }
    ],

    // 不限制声明前使用，避免和类型/函数提升场景冲突
    "@typescript-eslint/no-use-before-define": "off",

    // 检查未使用变量
    "@typescript-eslint/no-unused-vars": [

      // 违规时按错误处理
      "error",

      // 未使用变量的检查范围
      {

        // 检查所有变量
        vars: "all",

        // 只检查最后一个已使用参数之后的参数
        args: "after-used",

        // 忽略对象 rest 解构产生的未使用属性
        ignoreRestSiblings: true
      }
    ],

    // 关闭 unified-signatures，避免 Vue 文件中的重载签名误报
    "@typescript-eslint/unified-signatures": "off",

    // 使用两空格缩进
    indent: [

      // 缩进错误按错误处理
      "error",

      // 缩进宽度为 2 个空格
      2,

      // 缩进细节配置
      {

        // switch case 缩进 1 级
        SwitchCase: 1,

        // 数组表达式缩进 1 级
        ArrayExpression: 1,

        // 成员表达式缩进 2 级
        MemberExpression: 2,

        // 函数调用参数缩进配置
        CallExpression: {

          // 调用参数缩进 2 级
          arguments: 2
        },

        // 函数表达式缩进配置
        FunctionExpression: {

          // 函数体缩进 1 级
          body: 1,

          // 函数参数缩进 2 级
          parameters: 2
        },

        // 函数声明缩进配置
        FunctionDeclaration: {

          // 函数体缩进 1 级
          body: 1,

          // 函数参数缩进 2 级
          parameters: 2
        }

        // 如需处理 JSX 或模板字符串缩进，可后续添加 ignoredNodes
      }
    ],

    // 要求函数显式返回类型，但允许表达式和高阶函数等常见简写
    "@typescript-eslint/explicit-function-return-type": [

      // 缺少返回类型时给出警告
      "warn",

      // 返回类型规则的放宽选项
      {

        // 允许函数表达式省略返回类型
        allowExpressions: true,

        // 允许已经有类型标注的函数表达式省略返回类型
        allowTypedFunctionExpressions: true,

        // 允许高阶函数省略返回类型
        allowHigherOrderFunctions: true,

        // 允许箭头函数里的 const assertion 省略返回类型
        allowDirectConstAssertionInArrowFunctions: true,

        // 允许以 void 开头的简短箭头函数表达式省略返回类型
        allowConciseArrowFunctionExpressionsStartingWithVoid: true
      }
    ]
  }
};
