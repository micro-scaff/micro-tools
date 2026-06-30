import pluginJsonc from "eslint-plugin-jsonc";
import * as parserJsonc from "jsonc-eslint-parser";

/**
 * JSON / JSONC / JSON5 规则配置
 *
 * https://www.npmjs.com/package/eslint-plugin-jsonc
 */
export default [
  {

    // 对常见 JSON 系列文件启用 JSONC parser 和 jsonc 插件
    files: [
      "**/*.json",
      "**/*.json5",
      "**/*.jsonc",
      "*.code-workspace"
    ],
    languageOptions: {

      // 使用 jsonc-eslint-parser 解析 JSON、JSONC 和 JSON5
      parser: parserJsonc
    },
    plugins: {

      // 注册 eslint-plugin-jsonc 插件，规则前缀为 jsonc
      jsonc: pluginJsonc
    },
    rules: {

      // 禁止 BigInt 字面量，JSON 不支持 1n 这种写法
      "jsonc/no-bigint-literals": "error",

      // 禁止二元表达式，JSON 值必须是静态字面量
      "jsonc/no-binary-expression": "error",

      // 禁止二进制数字字面量，例如 0b1010
      "jsonc/no-binary-numeric-literals": "error",

      // 禁止对象中出现重复 key
      "jsonc/no-dupe-keys": "error",

      // 禁止标识符里出现非法转义序列
      "jsonc/no-escape-sequence-in-identifier": "error",

      // 禁止省略整数或小数部分的数字，例如 .5 或 1.
      "jsonc/no-floating-decimal": "error",

      // 禁止十六进制数字字面量，例如 0xFF
      "jsonc/no-hexadecimal-numeric-literals": "error",

      // 禁止 Infinity，JSON 不支持无限大数值
      "jsonc/no-infinity": "error",

      // 禁止多行字符串写法
      "jsonc/no-multi-str": "error",

      // 禁止 NaN，JSON 不支持非数字值
      "jsonc/no-nan": "error",

      // 禁止数字对象属性访问写法
      "jsonc/no-number-props": "error",

      // 禁止数字分隔符，例如 1_000
      "jsonc/no-numeric-separators": "error",

      // 禁止旧式八进制数字
      "jsonc/no-octal": "error",

      // 禁止八进制转义
      "jsonc/no-octal-escape": "error",

      // 禁止八进制数字字面量，例如 0o755
      "jsonc/no-octal-numeric-literals": "error",

      // 禁止给 JSON 值额外包裹括号
      "jsonc/no-parenthesized": "error",

      // 禁止数字前的加号，例如 +1
      "jsonc/no-plus-sign": "error",

      // 禁止正则字面量
      "jsonc/no-regexp-literals": "error",

      // 禁止稀疏数组，例如 [1,,2]
      "jsonc/no-sparse-arrays": "error",

      // 禁止模板字符串
      "jsonc/no-template-literals": "error",

      // 禁止 undefined，JSON 不支持 undefined 值
      "jsonc/no-undefined-value": "error",

      // 禁止 Unicode code point escape，例如 \u{1F600}
      "jsonc/no-unicode-codepoint-escapes": "error",

      // 禁止无意义的转义
      "jsonc/no-useless-escape": "error",

      // 要求一元操作符周围的空格符合规范
      "jsonc/space-unary-ops": "error",

      // 校验 JSON 数字格式是否合法
      "jsonc/valid-json-number": "error",

      // 校验 Vue 自定义块中的 JSONC 解析错误
      "jsonc/vue-custom-block/no-parsing-error": "error"
    }
  },
  {

    // package.json 使用单独的字段排序规则
    files: [
      "**/package.json"
    ],
    rules: {

      // 对 package.json 中指定数组字段的值进行升序排序
      "jsonc/sort-array-values": [
        "error",
        {
          order: {
            type: "asc"
          },
          pathPattern: "^files$|^pnpm.neverBuiltDependencies$"
        }
      ],

      // 对 package.json 的顶层字段、依赖字段和 exports 字段进行固定排序
      "jsonc/sort-keys": [
        "error",
        {
          order: [
            "name",
            "version",
            "description",
            "private",
            "keywords",
            "homepage",
            "bugs",
            "repository",
            "license",
            "author",
            "contributors",
            "categories",
            "funding",
            "type",
            "scripts",
            "files",
            "sideEffects",
            "bin",
            "main",
            "module",
            "unpkg",
            "jsdelivr",
            "types",
            "typesVersions",
            "imports",
            "exports",
            "publishConfig",
            "icon",
            "activationEvents",
            "contributes",
            "peerDependencies",
            "peerDependenciesMeta",
            "dependencies",
            "optionalDependencies",
            "devDependencies",
            "engines",
            "packageManager",
            "pnpm",
            "overrides",
            "resolutions",
            "husky",
            "simple-git-hooks",
            "lint-staged",
            "eslintConfig"
          ],
          pathPattern: "^$"
        },
        {
          order: {
            type: "asc"
          },
          pathPattern: "^(?:dev|peer|optional|bundled)?[Dd]ependencies(Meta)?$"
        },
        {
          order: {
            type: "asc"
          },
          pathPattern: "^(?:resolutions|overrides|pnpm.overrides)$"
        },
        {
          order: [
            "types",
            "import",
            "require",
            "default"
          ],
          pathPattern: "^exports.*$"
        }
      ]
    }
  },
  {

    // tsconfig 系列文件使用 TypeScript 配置项的推荐顺序
    files: [
      "**/tsconfig.json",
      "**/tsconfig.*.json",
      "internal/tsconfig/*.json"
    ],
    rules: {

      // 对 tsconfig 顶层字段和 compilerOptions 字段进行固定排序
      "jsonc/sort-keys": [
        "error",
        {
          order: [
            "extends",
            "compilerOptions",
            "references",
            "files",
            "include",
            "exclude"
          ],
          pathPattern: "^$"
        },
        {
          order: [
            "incremental",
            "composite",
            "tsBuildInfoFile",
            "disableSourceOfProjectReferenceRedirect",
            "disableSolutionSearching",
            "disableReferencedProjectLoad",

            /* Language and Environment */
            "target",
            "jsx",
            "jsxFactory",
            "jsxFragmentFactory",
            "jsxImportSource",
            "lib",
            "moduleDetection",
            "noLib",
            "reactNamespace",
            "useDefineForClassFields",
            "emitDecoratorMetadata",
            "experimentalDecorators",

            /* Modules */
            "baseUrl",
            "rootDir",
            "rootDirs",
            "customConditions",
            "module",
            "moduleResolution",
            "moduleSuffixes",
            "noResolve",
            "paths",
            "resolveJsonModule",
            "resolvePackageJsonExports",
            "resolvePackageJsonImports",
            "typeRoots",
            "types",
            "allowArbitraryExtensions",
            "allowImportingTsExtensions",
            "allowUmdGlobalAccess",

            /* JavaScript Support */
            "allowJs",
            "checkJs",
            "maxNodeModuleJsDepth",

            /* Type Checking */
            "strict",
            "strictBindCallApply",
            "strictFunctionTypes",
            "strictNullChecks",
            "strictPropertyInitialization",
            "allowUnreachableCode",
            "allowUnusedLabels",
            "alwaysStrict",
            "exactOptionalPropertyTypes",
            "noFallthroughCasesInSwitch",
            "noImplicitAny",
            "noImplicitOverride",
            "noImplicitReturns",
            "noImplicitThis",
            "noPropertyAccessFromIndexSignature",
            "noUncheckedIndexedAccess",
            "noUnusedLocals",
            "noUnusedParameters",
            "useUnknownInCatchVariables",

            /* Emit */
            "declaration",
            "declarationDir",
            "declarationMap",
            "downlevelIteration",
            "emitBOM",
            "emitDeclarationOnly",
            "importHelpers",
            "importsNotUsedAsValues",
            "inlineSourceMap",
            "inlineSources",
            "mapRoot",
            "newLine",
            "noEmit",
            "noEmitHelpers",
            "noEmitOnError",
            "outDir",
            "outFile",
            "preserveConstEnums",
            "preserveValueImports",
            "removeComments",
            "sourceMap",
            "sourceRoot",
            "stripInternal",

            /* Interop Constraints */
            "allowSyntheticDefaultImports",
            "esModuleInterop",
            "forceConsistentCasingInFileNames",
            "isolatedModules",
            "preserveSymlinks",
            "verbatimModuleSyntax",

            /* Completeness */
            "skipDefaultLibCheck",
            "skipLibCheck"
          ],
          pathPattern: "^compilerOptions$"
        }
      ]
    }
  }
];
