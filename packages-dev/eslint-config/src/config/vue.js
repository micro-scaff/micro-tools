import parserVue from "vue-eslint-parser";

import parserTs from "@typescript-eslint/parser";
import pluginVue from "eslint-plugin-vue";

const VUE_RECOMMENDED_CONFIGS = pluginVue.configs["flat/recommended"] ?? [];

/**
 * Vue SFC
 *
 * 使用 eslint-plugin-vue 的 flat recommended 配置，并补充项目内的 Vue SFC 规则。
 */
export default [

  // recommended 已包含 essential 和 strongly-recommended，避免重复展开多套 Vue 配置
  ...VUE_RECOMMENDED_CONFIGS,
  {
    files: [
      "**/*.vue"
    ],
    languageOptions: {

      // 使用 vue-eslint-parser 解析 <template>、<script>、<script setup>
      parser: parserVue,
      parserOptions: {

        // 支持 <script setup>、<script setup lang="ts">、<script setup lang="tsx">
        parser: {
          js: parserTs,
          ts: parserTs,
          tsx: parserTs
        },

        // 让 TypeScript parser 明确接受 .vue 作为额外文件后缀
        extraFileExtensions: [
          ".vue"
        ],

        // 允许 Vue SFC 中的 JSX / TSX 脚本内容
        ecmaFeatures: {
          jsx: true
        },

        // 使用最新 ECMAScript 语法
        ecmaVersion: "latest",

        // 按 ES Module 方式解析 <script>
        sourceType: "module"
      },

      // Vue SFC 按 ES Module 处理
      sourceType: "module"
    },
    rules: {

      // 关闭 JS core 规则，改用 vue/* 对 template 和 script 做一致校验
      "func-call-spacing": "off",

      // Vue 表达式中的箭头函数前后空格不规范时给出警告
      "vue/arrow-spacing": "warn",

      // 组件属性统一使用连字符命名
      "vue/attribute-hyphenation": [
        "error",
        "always",
        {
          ignore: []
        }
      ],

      // 不限制 block 的 lang 属性
      "vue/block-lang": "off",

      // 统一 Vue template 属性排序
      "vue/attributes-order": [
        "error",
        {
          alphabetical: false,
          order: [
            "DEFINITION",
            "LIST_RENDERING",
            "CONDITIONALS",
            "RENDER_MODIFIERS",
            "GLOBAL",
            [
              "UNIQUE",
              "SLOT"
            ],
            "TWO_WAY_BINDING",
            "OTHER_DIRECTIVES",
            "OTHER_ATTR",
            "EVENTS",
            "CONTENT"
          ]
        }
      ],

      // Vue SFC block 顺序固定为 script、template、style
      "vue/block-order": [
        "error",
        {
          order: [
            "script",
            "template",
            "style"
          ]
        }
      ],

      // template 中组件名统一使用 PascalCase
      "vue/component-name-in-template-casing": [
        "error",
        "PascalCase"
      ],

      // 组件 options name 统一使用 PascalCase
      "vue/component-options-name-casing": [
        "error",
        "PascalCase"
      ],

      // 自定义事件名统一使用 camelCase
      "vue/custom-event-name-casing": [
        "error",
        "camelCase"
      ],

      // 统一 setup 宏的声明顺序
      "vue/define-macros-order": [
        "error",
        {
          order: [
            "defineOptions",
            "defineProps",
            "defineEmits",
            "defineSlots"
          ]
        }
      ],

      // 链式属性访问的点号和属性保持在同一侧
      "vue/dot-location": [
        "error",
        "property"
      ],

      // 优先使用点号访问属性
      "vue/dot-notation": [
        "error",
        {
          allowKeywords: true
        }
      ],

      // Vue 表达式中使用 smart 等值判断策略
      "vue/eqeqeq": [
        "error",
        "smart"
      ],

      // 统一 HTML 闭合括号换行
      "vue/html-closing-bracket-newline": "error",

      // 自闭合标签前必须有空格，普通开始/结束标签前不加空格
      "vue/html-closing-bracket-spacing": [
        "error",
        {
          endTag: "never",
          selfClosingTag: "always",
          startTag: "never"
        }
      ],

      // HTML 注释内容统一换行
      "vue/html-comment-content-newline": [
        "error",
        {
          multiline: "always",
          singleline: "always"
        },
        {
          exceptions: []
        }
      ],

      // template 中 HTML 缩进统一为 2 个空格
      "vue/html-indent": [
        "error",
        2
      ],

      // template 属性统一使用双引号
      "vue/html-quotes": [
        "error",
        "double"
      ],

      // Vue 表达式对象属性冒号前后空格保持一致
      "vue/key-spacing": "error",

      // 每行最多一个属性，提升 template 可读性
      "vue/max-attributes-per-line": [
        "error",
        {
          singleline: 1
        }
      ],

      // 多行 HTML 元素内容必须按规则换行
      "vue/multiline-html-element-content-newline": "error",

      // 禁止已废弃的 v-is 用法
      "vue/no-deprecated-v-is": "error",

      // 禁止组件选项中重复 key
      "vue/no-dupe-keys": "error",

      // 禁止重复的 v-else-if 条件
      "vue/no-dupe-v-else-if": "error",

      // 重复属性继承时给出警告
      "vue/no-duplicate-attr-inheritance": "warn",

      // 禁止空解构模式
      "vue/no-empty-pattern": "error",

      // 禁止函数表达式中多余括号
      "vue/no-extra-parens": [
        "error",
        "functions"
      ],

      // 禁止不规则空白字符
      "vue/no-irregular-whitespace": "error",

      // 禁止丢失精度的数字字面量
      "vue/no-loss-of-precision": "error",

      // 禁止多余空格
      "vue/no-multi-spaces": [
        "error",
        {
          ignoreProperties: false
        }
      ],

      // 允许使用 Vue 保留组件名
      "vue/no-reserved-component-names": "off",

      // 禁止指定的危险语法
      "vue/no-restricted-syntax": [
        "error",
        "DebuggerStatement",
        "LabeledStatement",
        "WithStatement"
      ],

      // 禁止对 v-* 名称再使用 v-bind
      "vue/no-restricted-v-bind": [
        "error",
        "/^v-/"
      ],

      // 属性等号两侧不允许空格
      "vue/no-spaces-around-equal-signs-in-attribute": [
        "error"
      ],

      // 禁止稀疏数组
      "vue/no-sparse-arrays": "error",

      // 禁止未使用的 emits 声明
      "vue/no-unused-emit-declarations": "error",

      // 禁止未使用的 template ref
      "vue/no-unused-refs": "error",

      // 统一 HTML、SVG、MathML 的自闭合风格
      "vue/html-self-closing": [
        "error",
        {
          html: {
            void: "always",
            normal: "never",
            component: "always"
          },
          svg: "always",
          math: "always"
        }
      ],

      // 禁止 template 中未使用变量，允许下划线前缀
      "vue/no-unused-vars": [
        "error",
        {
          ignorePattern: "^_"
        }
      ],

      // 禁止在同一元素上同时使用 v-if 和 v-for
      "vue/no-use-v-if-with-v-for": [
        "error",
        {
          allowUsingIterationVar: false
        }
      ],

      // 禁止不必要的 mustache 插值
      "vue/no-useless-mustaches": [
        "error",
        {
          ignoreIncludesComment: false,
          ignoreStringEscape: false
        }
      ],

      // 禁止不必要的 v-bind
      "vue/no-useless-v-bind": "error",

      // 允许使用 v-html
      "vue/no-v-html": "off",

      // Vue 表达式对象优先使用对象简写
      "vue/object-shorthand": [
        "error",
        "always",
        {
          avoidQuotes: true,
          ignoreConstructors: false
        }
      ],

      // 每个文件只定义一个组件
      "vue/one-component-per-file": "error",

      // Vue API 优先从 vue 包导入
      "vue/prefer-import-from-vue": "error",

      // 优先拆分静态 class
      "vue/prefer-separate-static-class": "error",

      // Vue 表达式优先使用模板字符串
      "vue/prefer-template": "error",

      // prop 名称统一使用 camelCase
      "vue/prop-name-casing": [
        "error",
        "camelCase"
      ],

      // prop 必须提供默认值
      "vue/require-default-prop": "error",

      // emits 必须显式声明
      "vue/require-explicit-emits": "error",

      // prop 必须声明类型
      "vue/require-prop-types": "error",

      // 不强制 transition 内部使用 toggle
      "vue/require-toggle-inside-transition": "off",

      // computed 必须返回值
      "vue/return-in-computed-property": [
        "error",
        {
          treatUndefinedAsUnspecified: true
        }
      ],

      // 关闭 Vue script 专属缩进，避免和现有缩进规则重复
      "vue/script-indent": "off",

      // 单行 HTML 元素内容按规则换行
      "vue/singleline-html-element-content-newline": [
        "error",
        {
          externalIgnores: [],
          ignores: [
            "pre",
            "textarea"
          ],
          ignoreWhenEmpty: true,
          ignoreWhenNoAttributes: true
        }
      ],

      // Vue 表达式中二元运算符两侧必须有空格
      "vue/space-infix-ops": "error",

      // Vue 表达式中一元运算符空格保持一致
      "vue/space-unary-ops": [
        "error",
        {
          nonwords: false,
          words: true
        }
      ],

      // v-on 事件名统一使用连字符形式
      "vue/v-on-event-hyphenation": [
        "error",
        "always",
        {
          autofix: true,
          ignore: []
        }
      ],

      // 校验 v-text 指令有效性
      "vue/valid-v-text": "error",

      // 允许单词组件名，适配业务中的短组件名
      "vue/multi-word-component-names": "off"
    }
  }
];
