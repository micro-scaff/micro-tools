# 外部项目使用约定

当本 skill 被复制到其他项目使用时，先按这里判断上下文。

## 基本原则

- 优先读取目标项目自己的 `package.json`、锁文件、配置文件和源码入口。
- 从 npm 包名导入 MT 包，不引用 `micro-tools` 仓库里的 `packages-*/*/src` 源码路径。
- 不假设外部项目使用 pnpm、workspace、catalog 或本仓库脚本。
- 先接入最小需要的包，再按报错补 peer dependency、样式、类型或构建配置。
- 如果目标项目正在本地 link 未发布包，先说明这是 link/workspace 场景，再按该项目的 link 方式排查。

## 包管理器

文档示例默认使用 pnpm。外部项目应换成项目已有包管理器：

| 项目包管理器 | 安装依赖命令 |
| --- | --- |
| npm | `npm install` / `npm install -D` |
| pnpm | `pnpm add` / `pnpm add -D` |
| yarn | `yarn add` / `yarn add -D` |
| bun | `bun add` / `bun add -d` |

不要为了使用 MT 包强行迁移包管理器。

## 验证建议

优先使用目标项目已有脚本，例如 `lint`、`format`、`typecheck`、`build`。没有现成脚本时，再按目标包的工具补一个临时命令，并说明它只是验证命令。
