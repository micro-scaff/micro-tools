# 包映射

## 包清单

| 包 | 路径 | 用途 |
| --- | --- | --- |
| `@mt-kit/eslint-config` | `packages-dev/eslint-config` | ESLint flat config，默认导出 `DEFAULT` 配置数组（不是命名导出），对外用默认导入变量 `EsLint`；命名导出 `VUE`、`REACT` |
| `@mt-kit/prettier-config` | `packages-dev/prettier-config` | Prettier 3 配置，补充 ESLint 未覆盖的格式化场景 |
| `@mt-kit/stylelint-config` | `packages-dev/stylelint-config` | Stylelint 16 配置，提供默认、Vue、React 样式检查 |
| `@mt-kit/ts-config` | `packages-dev/ts-config` | TypeScript 配置集合，提供 base/app/node/vue/react |

## 使用边界

- ESLint 细节也由本 skill 处理；总览接入时必须使用源码真实导出：默认导出、`VUE`、`REACT`。
- Prettier 只做格式化，不承担代码质量检查。
- Stylelint 只处理样式文件和 Vue/HTML 中的样式语法。
- TSConfig 负责编译器行为，不负责 lint 规则。

## 外部项目注意

外部项目应从 npm 包名引用配置包，不引用 `packages-dev/*` 源码路径。monorepo 中要把依赖安装到实际运行命令的位置。

## README 与源码不一致时

优先相信当前源码和 `package.json`。例如 `@mt-kit/eslint-config` 的 README 里有部分旧插件生态描述，但当前源码实际使用 `@eslint-react/eslint-plugin`、`eslint-plugin-import-x`、`eslint-plugin-react-compiler`，且根入口只导出默认配置、`VUE`、`REACT`。
