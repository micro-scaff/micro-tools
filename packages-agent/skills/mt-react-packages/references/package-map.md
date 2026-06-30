# 包映射

| 包 | 路径 | 主要导出 | 适用场景 |
| --- | --- | --- | --- |
| `@mt-kit/react-ant-design-extra` | `packages-react/react-ant-design-extra` | `DialogMode`、`DialogProps`、`DialogSize`、`open`、`openIndirect`、`useForm`、`WithModel` | Ant Design dialog/form 增强 |
| `@mt-kit/react-hooks` | `packages-react/react-hooks` | `useIsUnmounted`、`useAsync`、`useRequest`、`useHistory`、`useLocationQuery`、`useService`、`QueryHookResult`、`QueryTypes` | 通用 React hooks |
| `@mt-kit/react-rc` | `packages-react/react-rc` | `KeyValue` | 基础 React 组件 |

## 构建约定

- `react-ant-design-extra` 和 `react-rc` 使用 ESM 包模式。
- 多数 React 包使用 `unbuild` 输出 `dist/index.mjs` 和 `dist/index.d.ts`。
- 使用 Storybook React/Vite 做示例和调试。

## peer dependencies

- `react-ant-design-extra` 需要 `react >=18`、`react-dom >=18`、`react-router-dom >=7`、`antd >=5`、`@ant-design/v5-patch-for-react-19 >=1`。
- `react-hooks` 需要 `react >=18` 和 `react-router-dom >=7`。
- `react-rc` 未显式声明 peer，但实际使用时仍需要 React 环境。

## 依赖注意

- `react-ant-design-extra` 依赖 `@mt-kit/utils`、`lodash-es`、`styled-components`。
- `react-hooks` 依赖 `lodash-es`、`qs`，并把 `@mt-kit/ts-config` 放在 dependencies 中。
- `react-rc` 依赖 `lodash-es`、`styled-components`。
