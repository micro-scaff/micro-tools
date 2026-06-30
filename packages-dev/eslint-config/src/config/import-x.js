import {
  createNodeResolver,
  flatConfigs
} from "eslint-plugin-import-x";

// Vue 核心生态和常见全家桶
const VUE_ECOSYSTEM_IMPORTS = [
  "vue",
  "vue-*",
  "@vue/**",
  "pinia",
  "vuex",
  "nuxt",
  "nuxt/**",
  "@nuxt/**"
];

// Vue 常见 UI 库
const VUE_UI_IMPORTS = [
  "element-plus",
  "element-ui",
  "ant-design-vue",
  "naive-ui",
  "vant",
  "vant/**",
  "vuetify",
  "vuetify/**",
  "quasar",
  "quasar/**",
  "@arco-design/web-vue",
  "@varlet/ui",
  "primevue"
];

// React 核心生态和常见全家桶
const REACT_ECOSYSTEM_IMPORTS = [
  "react",
  "react-*",
  "@react/**",
  "redux",
  "redux-*",
  "@reduxjs/**",
  "next",
  "next/**",
  "@next/**"
];

// React 常见 UI 库
const REACT_UI_IMPORTS = [
  "antd",
  "@ant-design/**",
  "@mui/**",
  "@material-ui/**",
  "@chakra-ui/**",
  "@mantine/**",
  "semantic-ui-react",
  "react-bootstrap",
  "@arco-design/web-react",
  "@douyinfe/semi-ui",
  "primereact",
  "evergreen-ui",
  "rsuite"
];

// 保持为一个 pattern，避免 import-x/order 把 Vue / React 生态拆成多个需要空行的子组
const FRAMEWORK_IMPORT_PATTERN = `{${[
  ...VUE_ECOSYSTEM_IMPORTS,
  ...VUE_UI_IMPORTS,
  ...REACT_ECOSYSTEM_IMPORTS,
  ...REACT_UI_IMPORTS
].join(",")}}`;

/**
 * Import X
 *
 * https://github.com/un-ts/eslint-plugin-import-x
 */
export default [

  // 使用 import-x 推荐规则，注册插件并启用基础 import/export 校验
  flatConfigs.recommended,

  // 补充 TS 后缀识别，并使用 import-x 自带的 Node resolver 避免缺少 TS resolver 时报错
  {
    settings: {
      "import-x/extensions": [
        ".js",
        ".jsx",
        ".mjs",
        ".cjs",
        ".ts",
        ".tsx",
        ".mts",
        ".cts"
      ],
      "import-x/external-module-folders": [
        "node_modules",
        "node_modules/@types"
      ],
      "import-x/parsers": {
        "@typescript-eslint/parser": [
          ".ts",
          ".tsx",
          ".mts",
          ".cts"
        ]
      },
      "import-x/resolver-next": [
        createNodeResolver({
          extensions: [
            ".js",
            ".jsx",
            ".mjs",
            ".cjs",
            ".json",
            ".node",
            ".ts",
            ".tsx",
            ".mts",
            ".cts"
          ]
        })
      ]
    }
  },
  {
    files: [
      "**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx,vue}"
    ],
    ignores: [
      "eslint.config.js"
    ],
    rules: {

      // 类型导入统一提升到顶层 `import type`，避免内联 type specifier 风格混用
      "import-x/consistent-type-specifier-style": [
        "error",
        "prefer-top-level"
      ],

      // 所有 import 必须放在文件顶部，避免在逻辑代码中穿插导入
      "import-x/first": "error",

      // import 区块后必须保留一个空行，区分依赖导入和业务代码
      "import-x/newline-after-import": "error",

      // 禁止重复导入同一个模块，避免多条 import 分散同一依赖
      "import-x/no-duplicates": "error",

      // 禁止导出可变绑定，避免外部模块依赖会变化的导出值
      "import-x/no-mutable-exports": "error",

      // 禁止 `import { default as foo }`，优先使用默认导入语法
      "import-x/no-named-default": "error",

      // 禁止模块导入自身，避免无意义或循环的自引用
      "import-x/no-self-import": "error",

      // 关闭路径解析校验，避免别名、TS paths、包导出字段导致误报
      "import-x/no-unresolved": "off",

      // 禁止 webpack loader 写法，例如 `style-loader!css-loader!file`
      "import-x/no-webpack-loader-syntax": "error",

      // 校验 namespace import 的成员访问是否真实存在
      "import-x/namespace": "error",

      // 禁止循环依赖，最多向下检查 4 层依赖链
      "import-x/no-cycle": [
        "error",
        {
          ignoreExternal: false,
          maxDepth: 4
        }
      ],

      // 检查可简化的路径片段，例如多余的 `./` 或 `../`
      "import-x/no-useless-path-segments": "warn",

      // 建议 export 放在文件末尾，减少导入、声明、导出交错
      "import-x/exports-last": "warn",

      // 统一 import 分组顺序，并要求不同分组之间保留空行
      "import-x/order": [
        "error",
        {
          groups: [
            "external",
            "builtin",
            "internal",
            [
              "parent",
              "sibling",
              "index"
            ]
          ],
          pathGroups: [
            {

              // Vue / React、全家桶及常见 UI 库优先放在第三方依赖分组最前，并保持为同一组
              pattern: FRAMEWORK_IMPORT_PATTERN,
              group: "external",
              position: "before"
            },
            {

              // 其他第三方包如 lodash、axios、dayjs 等仍属于 external，默认排在 Vue/React 生态之后
              // 厂内二方包按 external 处理，并放在普通第三方包之后
              pattern: "@mt-kit/**",
              group: "external",
              position: "after"
            },
            {

              // `@/` 开头的项目别名按 internal 处理，不影响 `@mt-kit/**` 二方包
              pattern: "@/**",
              group: "internal"
            },
            {

              // `:/` 开头的项目别名按 internal 处理
              pattern: ":/**",
              group: "internal"
            },
            {

              // `~/` 开头的项目别名按 internal 处理
              pattern: "~/**",
              group: "internal"
            }
          ],
          pathGroupsExcludedImportTypes: [],
          "newlines-between": "always"
        }
      ]
    }
  }
];
