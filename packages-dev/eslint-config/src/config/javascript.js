import js from "@eslint/js";
import pluginUnicorn from "eslint-plugin-unicorn";
import pluginUnusedImports from "eslint-plugin-unused-imports";
import globals from "globals";

export default {

  // ignores: [
  //   "**/*.json"
  // ],

  languageOptions: {
    ecmaVersion: "latest",
    globals: {

      // 合并浏览器相关的全局变量声明
      ...globals.browser,

      // 合并ES2021相关的全局变量声明
      ...globals.es2021,

      // 合并Node相关的全局变量声明
      ...globals.node,

      // // 将document声明为只读的全局变量
      // document: "readonly",

      // // 将navigator声明为只读的全局变量
      // navigator: "readonly",

      // // 将window声明为只读的全局变量
      // window: "readonly",

      React: "readonly"
    },
    parserOptions: {
      ecmaFeatures: {

        // 开启对JSX语法的支持
        jsx: true
      },
      ecmaVersion: "latest",

      // 表明代码是基于模块的形式
      sourceType: "module"
    },
    sourceType: "module"
  },
  linterOptions: {

    // 报告未使用的禁用指令
    reportUnusedDisableDirectives: true
  },
  plugins: {
    "unused-imports": pluginUnusedImports,
    unicorn: pluginUnicorn
  },
  rules: {

    // 继承js推荐配置中的规则
    ...js.configs.recommended.rules,
    "accessor-pairs": [
      "error",
      {

        // 强制类成员也要遵循访问器对的规则
        enforceForClassMembers: true,

        // 允许在没有对应getter的情况下设置setter
        setWithoutGet: true
      }
    ],
    "unicorn/prefer-string-raw": "off",

    /**
     * 数组
     */
    // "array-bracket-newline": "off", // 在数组括号内强制换行
    // "array-bracket-spacing": "error", // 强制数组方括号中使用一致的空格
    "array-callback-return": "error", // 强制数组方法的回调函数中有 return 语句
    // "array-element-newline": [
    //   "error",
    //   {
    //     "ArrayExpression": "consistent",
    //     "ArrayPattern": {
    //       "minItems": 2
    //     }
    //   }
    // ], // 在数组元素的周围强制换行
    /**
     * 箭头函数
     */
    "arrow-body-style": [
      "error",
      "always"
    ], // 要求箭头函数体使用大括号

    "arrow-parens": [
      "error",
      "as-needed"
    ], // 要求箭头函数的参数使用圆括号，但当只有一个参数时允许省略括号
    "arrow-spacing": [
      "error",
      {
        after: true,
        before: true
      }
    ], // 强制箭头函数的箭头前后使用一致的空格
    "block-scoped-var": "error",

    /**
     * 变量
     */
    camelcase: [
      0,
      {
        properties: "always"
      }
    ], // 强制使用骆驼拼写法命名约定
    /**
     * 注释
     */
    "capitalized-comments": "off", // 强制注释的首字母大写
    // 禁止尾部逗号
    "comma-dangle": [
      "error",
      "never"
    ], // 对象字面量项尾不能有逗号
    "comma-spacing": [
      "error",
      {
        after: true,
        before: false
      }
    ], // 强制在逗号前后使用一致的空格
    "computed-property-spacing": [
      2,
      "never"
    ], // 禁止或强制在计算属性中使用空格
    "constructor-super": "error",

    /**
     * 括号
     */
    curly: [
      "error",
      "all"
    ], // 要求遵循大括号约定
    "default-case": "error", // 要求 switch 语句中有 default 分支
    "default-case-last": "error", // 强制 default 分支必须在 switch 语句的最后
    "default-param-last": "error", // 要求函数的默认参数在最后
    "dot-location": "error", // 强制在点号之前和之后一致的换行
    "dot-notation": [
      "error",
      {
        allowKeywords: true
      }
    ], // 强制尽可能地使用点号
    "eol-last": [
      "error",
      "always"
    ], // 要求文件末尾保留一行空行，或不保留
    eqeqeq: [
      "error",
      "always",
      {
        null: "ignore"
      }
    ], // 使用 === 替代 ==
    "for-direction": "error", // Error; for循转方向出错
    "func-call-spacing": "error", // 要求或禁止在函数标识符和其调用之间有空格
    "func-name-matching": "error", // 强制函数名与赋值给它们的变量名或属性名相匹配
    "func-names": "off", // 要求函数表达式有名字
    "func-style": [
      "off",
      "expression"
    ], // 强制一致地使用函数声明或函数表达式
    "function-call-argument-newline": [
      "error",
      "consistent"
    ], // 强制在函数括号内使用一致的换行
    "function-paren-newline": "error", // 强制函数括号前后使用一致的换行
    "generator-star-spacing": "error", // 强制 generator 函数中 * 号周围使用一致的空格
    "getter-return": [
      2,
      {
        allowImplicit: false
      }
    ], // Getter必须有返回值，并且禁止返回值为undefined, 比如 return
    "grouped-accessor-pairs": "error", // 强制 getter 和 setter 在对象中成对出现
    "guard-for-in": "error", // 要求 for-in 循环中有一个 if 语句
    "id-denylist": [
      "error",
      "foo",
      "bar",
      "baz",
      "qux",
      "tmp",
      "temp",
      "data",
      "obj",
      "arr",
      "str",
      "num",
      "bool",
      "val",
      "retval",
      "cb",
      "callback",
      "err",
      "e"
    ], // 禁止使用指定的标识符，避免无意义的占位命名
    "id-length": "off", // 禁止在标识符中使用悬空下划线
    "id-match": [
      "error",
      "^_?([a-z][a-zA-Z0-9]*|[A-Z][a-zA-Z0-9]*|[A-Z][A-Z0-9]*(?:_[A-Z0-9]+)*)$",
      {
        classFields: true,
        onlyDeclarations: false,
        properties: false
      }
    ], // 强制标识符使用 camelCase、PascalCase 或 UPPER_SNAKE_CASE
    "implicit-arrow-linebreak": [
      "error",
      "beside"
    ], // 强制隐式返回的箭头函数体的位置
    indent: [
      "error",
      2,
      {
        ArrayExpression: 1,
        CallExpression: {
          arguments: 2
        },
        FunctionDeclaration: {
          body: 1,
          parameters: 2
        },
        FunctionExpression: {
          body: 1,
          parameters: 2
        },
        MemberExpression: 2,
        SwitchCase: 1
      }
    ], // 一个缩进必须用四个空格替代, switch语句里面的case 2个空格
    "key-spacing": "error", // 强制在对象字面量属性中键和值之间使用一致的间距
    "keyword-spacing": "off",
    "line-comment-position": [
      "off",
      {
        position: "beside"
      }
    ], // 强制行注释的位置,  // 强制行注释的位置
    "lines-around-comment": [
      "error",
      {
        beforeBlockComment: true,
        beforeLineComment: true,
        allowBlockEnd: true,
        ignorePattern: "prettier-ignore"
      }
    ], // 要求在注释周围有空行
    "lines-between-class-members": [
      "error",
      "always",
      {
        exceptAfterSingleLine: false
      }
    ], // 类成员之间使用空行
    "max-depth": [
      2,
      {
        max: 4
      }
    ], // 强制可嵌套的块的最大深度
    /**
     * 文件
     */
    "max-len": [
      "warn",
      200,
      2,
      {
        ignoreComments: false,
        ignorePattern: "data:image/\\w+;base64,",
        ignoreRegExpLiterals: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreTrailingComments: true,
        ignoreUrls: true
      }
    ], // 单行最多允许200个字符, 对包含url的行不进行此限制
    "multiline-comment-style": "off", // 强制对多行注释使用特定风格
    "new-cap": [
      "error",
      {
        capIsNew: false,
        newIsCap: true,
        properties: true
      }
    ], // 要求构造函数名以大写字母开头
    "new-parens": "error", // 要求调用无参构造函数时有圆括号
    "newline-per-chained-call": "off", // 要求方法链中每个调用都有一个换行符
    "no-alert": "error", // 禁用 alert、confirm 和 prompt
    "no-array-constructor": "error",
    "no-async-promise-executor": "error",

    /**
     * 遍历
     */
    "no-await-in-loop": "error", // 禁止在循环中出现 await
    "no-caller": "error", // 禁用 arguments.caller 或 arguments.callee
    "no-case-declarations": "error", // 禁止 case 中 变量
    "no-class-assign": "error",
    "no-compare-neg-zero": "error",

    // "no-cond-assign": ["error", "always"],
    "no-confusing-arrow": "error", // 禁止在可能与比较操作符相混淆的地方使用箭头函数
    "no-console": [
      "error",
      {
        allow: [
          "warn",
          "error"
        ]
      }
    ], // 禁止使用console（可根据配置允许warn、error等情况），使用了则报错
    "no-const-assign": "error", // 禁止对const声明的变量进行重新赋值，赋值了则报错
    "no-control-regex": "error", // 禁止使用控制字符的正则表达式，使用了则报错
    "no-debugger": "error", // 禁止使用debugger语句，使用了则报错
    "no-delete-var": "error", // 禁止删除使用var声明的变量，删除了则报错
    "no-dupe-args": "error", // 禁止函数参数重复定义，重复了则报错
    "no-dupe-class-members": "error", // 禁止类成员重复定义，重复了则报错
    "no-dupe-keys": "error", // 禁止对象字面量中键重复，重复了则报错
    "no-duplicate-case": "error", // 禁止switch语句中case重复，重复了则报错

    /**
     * ES6
     */
    // "no-duplicate-imports": "error", // Error; 禁止import重复模块
    "no-duplicate-imports": [
      "error",
      {
        includeExports: true
      }
    ],
    "no-else-return": [
      "warn",
      {
        allowElseIf: false
      }
    ], // 禁止 if 语句中 return 语句之后有 else 块
    "no-empty": [
      "error",
      {
        allowEmptyCatch: true
      }
    ],
    "no-empty-character-class": "error", // 禁止出现空的字符类的正则表达式，出现则报错
    "no-empty-function": "error", // 禁止出现空函数
    "no-empty-pattern": "error", // 禁止出现空的解构模式，出现则报错
    "no-eval": "error", // 禁止使用eval函数，使用了则报错
    "no-ex-assign": "error", // 禁止在try语句中对已经存在的变量进行重新赋值，赋值了则报错
    "no-extend-native": "error", // 禁止扩展原生对象的原型，扩展了则报错
    "no-extra-bind": "error", // 禁止多余的bind调用，调用了则报错
    "no-extra-boolean-cast": "error", // 禁止不必要的布尔类型转换，转换了则报错
    "no-fallthrough": "error", // 禁止在switch语句中没有break等导致的贯穿情况，出现则报错

    "no-func-assign": "error", // 禁止对函数进行重新赋值，赋值了则报错
    "no-global-assign": "error", // 禁止对全局变量进行重新赋值，赋值了则报错
    "no-implicit-coercion": [
      2,
      {
        boolean: false,
        string: false
      }
    ], // 强制类型转换的相关规则，可根据配置对布尔、字符串等类型转换进行限制
    "no-implied-eval": "error", // 禁止隐式调用eval，调用了则报错
    "no-import-assign": "error", // 禁止对import的模块进行重新赋值，赋值了则报错
    "no-inline-comments": "off", // 禁止在代码后使用内联注释
    "no-invalid-regexp": "error", // 禁止使用无效的正则表达式，使用了则报错
    "no-irregular-whitespace": "error", // 禁止出现不规则的空白字符，出现则报错
    "no-iterator": "error", // 禁止使用迭代器，使用了则报错

    "no-label-var": "error", // 不允许标签与变量同名
    "no-labels": [
      "error",
      {
        allowLoop: false,
        allowSwitch: false
      }
    ], // 禁止使用标签（除了特定允许的循环、switch情况外），使用了则报错
    "no-lone-blocks": "error", // 禁止单独的代码块（没有实际作用的孤立代码块），出现则报错

    /**
     * 条件语句
     */
    "no-lonely-if": "error", // 禁止 if 作为唯一的语句出现在 else 语句中
    "no-loop-func": "error", // 禁止在循环中出现 function 声明和表达式
    "no-loss-of-precision": "error", // 禁止出现精度损失的情况，出现则报错
    "no-misleading-character-class": "error", // 禁止使用容易误导的字符类的正则表达式，使用了则报错

    // 禁止行末尾空格
    "no-mixed-spaces-and-tabs": [
      "error",
      "smart-tabs"
    ],
    "no-multi-assign": "error", // 禁止连续赋值
    "no-multi-spaces": [
      "error",
      {
        ignoreEOLComments: true
      }
    ], // 禁止出现多个空格
    "no-multi-str": "error", // 禁止使用多行字符串，使用了则报错
    "no-multiple-empty-lines": [
      "error",
      {
        max: 1,
        maxBOF: 0,
        maxEOF: 0
      }
    ], // 禁止出现多个空行（根据配置限制最大空行数等情况），不符合则报错
    "no-nested-ternary": 2, // 禁止使用嵌套的三元表达式
    "no-new": "error", // 禁止使用new操作符创建对象（除了特定允许的情况外），使用了则报错
    "no-new-func": "error",
    "no-new-object": "error", // 禁止使用 Object 构造函数
    "no-new-symbol": "error",
    "no-new-wrappers": "error",
    "no-nonoctal-decimal-escape": "error", // 禁止在字符串中使用八进制转义序列
    "no-obj-calls": "error",
    "no-octal": "error",
    "no-octal-escape": "error",

    /**
     * 方法 / 函数
     */
    "no-param-reassign": 1, // 禁止对 function 的参数进行重新赋值
    "no-proto": "error", // 禁止使用对象的 __proto__ 属性，若使用则报错
    "no-prototype-builtins": "warn", // 禁止使用如 hasOwnProperty、isPrototypeOf 等基于原型的内置方法，使用则警告
    "no-redeclare": [
      "error",
      {

        // 设置为 false 表示不将内置全局变量视为重复声明的情况（即允许自定义变量与内置全局变量同名等情况），若代码中出现重复声明（按此配置情况判断）则报错
        builtinGlobals: false
      }
    ],
    "no-regex-spaces": "error", // 禁止在正则表达式中使用多余的空格，若有则报错，确保正则表达式书写规范简洁
    "no-restricted-globals": [
      "error",
      {

        // 提示信息，告知应使用 globalThis 来替代，当代码中使用名为 global 的变量时会触发此规则报错
        message: "Use `globalThis` instead.",
        name: "global"
      },
      {

        // 提示信息，告知应使用 globalThis 来替代，当代码中使用名为 self 的变量时会触发此规则报错
        message: "Use `globalThis` instead.",
        name: "self"
      }
    ],
    "no-restricted-properties": [
      "error",
      {

        // 提示信息，告知应使用 Object.getPrototypeOf 或 Object.setPrototypeOf 来替代，当代码中使用 __proto__ 属性时会触发此规则报错
        message: "Use `Object.getPrototypeOf` or `Object.setPrototypeOf` instead.",
        property: "__proto__"
      },
      {

        // 提示信息，告知应使用 Object.defineProperty 来替代，当代码中使用 __defineGetter__ 属性时会触发此规则报错
        message: "Use `Object.defineProperty` instead.",
        property: "__defineGetter__"
      },
      {

        // 提示信息，告知应使用 Object.defineProperty 来替代，当代码中使用 __defineSetter__ 属性时会触发此规则报错
        message: "Use `Object.defineProperty` instead.",
        property: "__defineSetter__"
      },
      {

        // 提示信息，告知应使用 Object.getOwnPropertyDescriptor 来替代，当代码中使用 __lookupGetter__ 属性时会触发此规则报错
        message: "Use `Object.getOwnPropertyDescriptor` instead.",
        property: "__lookupGetter__"
      },
      {

        // 提示信息，告知应使用 Object.getOwnPropertyDescriptor 来替代，当代码中使用 __lookupSetter__ 属性时会触发此规则报错
        message: "Use `Object.getOwnPropertyDescriptor` instead.",
        property: "__lookupSetter__"
      }
    ],
    "no-restricted-syntax": [
      "error",
      "DebuggerStatement", // 禁止使用 debugger 语句，若代码中出现则触发此规则报错，常用于生产环境避免调试代码残留
      "LabeledStatement", // 禁止使用带标签的语句（如 label: for 循环这种形式），出现则触发此规则报错
      "WithStatement", // 禁止使用 with 语句，因其可能导致作用域混乱等问题，使用则触发此规则报错
      "TSEnumDeclaration[const=true]", // 禁止使用定义为 const 的枚举声明（TS 中的特定语法情况），若使用则触发此规则报错
      "TSExportAssignment" // 禁止使用 TS 中的导出赋值语句，若使用则触发此规则报错
    ],
    "no-return-assign": "error", // 禁止在返回语句中赋值
    "no-return-await": "error", // 禁止在 return 语句中使用await
    "no-self-assign": [
      "error",
      {
        props: true
      }
    ],
    "no-self-compare": "error", // 禁止自身比较
    "no-sequences": "error",
    "no-shadow-restricted-names": "error",
    "no-sparse-arrays": "error",
    "no-template-curly-in-string": "error", // 禁止在普通字符串中使用模板字面量占位符语法
    "no-this-before-super": "error",
    "no-throw-literal": "error",

    // 禁止在语句末尾出现多余的空格
    "no-trailing-spaces": "error",
    "no-undef": "error",
    "no-undef-init": "error",
    "no-unexpected-multiline": "error",
    "no-unmodified-loop-condition": "error",
    "no-unneeded-ternary": [
      "error",
      {
        defaultAssignment: false
      }
    ],
    "no-unreachable": "error",
    "no-unreachable-loop": "error",
    "no-unsafe-finally": "error",
    "no-unsafe-negation": "error",
    "no-unused-expressions": [
      "error",
      {
        allowShortCircuit: true,
        allowTaggedTemplates: true,
        allowTernary: true
      }
    ],
    "no-unused-vars": [
      "error",
      {
        args: "none",
        caughtErrors: "none",
        ignoreRestSiblings: true,
        vars: "all"
      }
    ],
    "no-use-before-define": [
      "error",
      {
        classes: false,
        functions: false,
        variables: true
      }
    ],
    "no-useless-backreference": "error",
    "no-useless-call": "error",
    "no-useless-catch": "error",
    "no-useless-computed-key": "error",
    "no-useless-concat": "error", // 禁止不必要的字符串字面量或模板字面量的连接
    "no-useless-constructor": "error",
    "no-useless-rename": "error",
    "no-useless-return": "error",
    "no-var": "error",
    "no-warning-comments": "warn", // 禁止在注释中使用特定的警告术语
    // 强制每行末尾的空格（可选）
    "no-whitespace-before-property": "error",
    "no-with": "error",
    "object-curly-spacing": [
      "error",
      "always"
    ],
    "object-shorthand": [
      "error",
      "always",
      {
        avoidQuotes: true,
        ignoreConstructors: false
      }
    ],
    "one-var": [
      "error",
      {
        initialized: "never"
      }
    ],
    "one-var-declaration-per-line": "error", // 要求每个变量声明语句单独一行
    "padded-blocks": [
      "error",
      {
        classes: "never", // 禁止类定义内的空行
        switches: "never" // 禁止 switch 语句内的空行
      }
    ],
    "padding-line-between-statements": [
      "error",
      {
        blankLine: "always",
        next: "*",
        prev: [
          "const",
          "let",
          "var",
          "block",
          "block-like"
        ]
      },
      {
        blankLine: "always",
        next: [
          "return",
          "throw",
          "break",
          "continue",
          "block",
          "block-like",
          "export"
        ],
        prev: "*"
      },
      {
        blankLine: "always",
        next: [
          "const",
          "let",
          "var"
        ],
        prev: [
          "const",
          "let",
          "var"
        ]
      },
      {
        blankLine: "any",
        next: [
          "export"
        ],
        prev: [
          "export"
        ]
      },
      {
        blankLine: "never",
        next: [
          "case",
          "default"
        ],
        prev: "*"
      }
    ],
    "prefer-arrow-callback": [
      "error",
      {
        allowNamedFunctions: false,
        allowUnboundThis: true
      }
    ],
    "prefer-const": [
      "error",
      {
        destructuring: "all",
        ignoreReadBeforeAssign: true
      }
    ],
    "prefer-destructuring": [
      1,
      {
        array: true,
        object: true
      },
      {
        enforceForRenamedProperties: false
      }
    ], // Warn; 推荐结构赋值
    "prefer-exponentiation-operator": "error",
    "prefer-object-spread": "error", // 禁止使用 Object.assign 来创建对象
    "prefer-promise-reject-errors": "error",
    "prefer-regex-literals": [
      "error",
      {
        disallowRedundantWrapping: true
      }
    ],
    "prefer-rest-params": "error",
    "prefer-spread": "error",
    "prefer-template": "error",
    quotes: "error", // 强制使用一致的引号风格 double（双引号）、single（single）、backtick（模板字符串）
    "require-await": "off", // 禁止使用不带 await 表达式的 async 函数
    "rest-spread-spacing": [
      2,
      "never"
    ], // Error; rest 空格
    // 强制使用分号
    semi: [
      "error",
      "always"
    ],

    /*
    "sort-imports": ["error", {
      allowSeparatedGroups: false,
      ignoreCase: true,
      ignoreDeclarationSort: false,
      ignoreMemberSort: false
    }],                                // 强制模块导入语句的排
    */
    "sort-keys": "off", // 要求对象字面量属性键按顺序排列
    "sort-vars": "error", // 要求同一个声明块中的变量按顺序排列
    "space-before-function-paren": [
      "error",
      {
        anonymous: "never",
        asyncArrow: "always",
        named: "never"
      }
    ], // 要求函数名与圆括号之间有空格no-multi-spaces
    "spaced-comment": [
      "error",
      "always"
    ], // 强制在注释中 // 或 /* 使用一致的空格
    "symbol-description": "error",
    "template-curly-spacing": "off", // 强制模板字符串中空格的使用

    // 禁止在文件开头出现 Unicode 字节顺序标记（BOM），若出现则报错，保证文件编码规范，避免因 BOM 带来的一些兼容性等问题
    "unicode-bom": [
      "error",
      "never"
    ],

    // 针对“unused-imports”插件中的“no-unused-imports”规则，若存在未使用的导入语句则报错，用于清理代码中多余的导入，提升代码整洁性
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "error",
      {

        // 表示函数参数在被使用之后才允许被视为未使用（避免误判参数未使用的情况），按照此规则来检查变量是否被使用
        args: "after-used",

        // 以“^_”开头的函数参数名会被忽略（即不检查这类参数是否被使用），常用于忽略一些以下划线开头的临时参数等情况
        argsIgnorePattern: "^_",

        // 检查所有变量（包括各种声明方式定义的变量）是否被使用，未使用则可能触发报错
        vars: "all",

        // 以“^_”开头的变量名会被忽略（即不检查这类变量是否被使用），方便对一些特定命名规范的变量不做使用与否的检查
        varsIgnorePattern: "^_"
      }
    ],
    "use-isnan": [
      "error",
      {

        // 强制在使用 indexOf 方法时（比如判断数组元素索引是否为 NaN 情况）要使用正确的方式来检测 NaN，遵循此规则进行检查，不符合则报错
        enforceForIndexOf: true,

        // 强制在 switch 语句的 case 中（比如判断值是否为 NaN 情况）要使用正确的方式来检测 NaN，按此规则执行，不符合则报错
        enforceForSwitchCase: true
      }
    ],
    "valid-typeof": [
      "error",
      {

        // 要求在使用 typeof 操作符时，操作数必须是字符串字面量（不能是变量等其他形式），这样能更规范 typeof 的使用，不符合则报错
        requireStringLiterals: true
      }
    ],

    // 强制变量声明要放在作用域（比如函数作用域、全局作用域等）的顶部，使变量声明集中且遵循规范，若变量声明位置不符合要求则报错
    "vars-on-top": "error",

    /**
     * 其他
     */
    "wrap-regex": "error", // 要求正则表达式被括号括起来

    /**
     * “yoda”规则用于检查条件表达式中是否出现了“尤达”式的写法（即把常量写在比较运算符的左边，变量写在右边，例如："42 === num"这种形式，正常习惯是"num === 42"）
     *
     * 这里配置为 ["error", "never"] 表示禁止出现“尤达”式的写法，若代码中出现了这种写法就会触发报错，目的是让代码中的条件表达式遵循常规的、更易读的书写习惯
     */
    yoda: [
      "error",
      "never"
    ],

    // 因为 webpack 相关兼容，暂时关闭该规则
    // 允许 require 的使用
    "unicorn/prefer-module": "off",

    // 允许直接使用 path
    "unicorn/prefer-node-protocol": "off"
  }
};
