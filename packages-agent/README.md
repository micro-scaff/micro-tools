# Agent

这里存放可复用的 Codex agent 资产，包括 skills 和 MCP 配置。

## Skills

| Skill | 路径 | 用途 |
| --- | --- | --- |
| `mt-eslint-config` | `packages-agent/skills/mt-eslint-config` | 为内部或外部项目接入、迁移、定制和排查 `@mt-kit/eslint-config` |

外部项目使用时，可以将需要的 skill 目录复制到目标环境的 Codex skills 目录，或在任务中显式引用该 skill 路径。
