# mock

仓库内部的 Mock API 服务，用于本地开发和请求功能联调，不会发布到 npm。

在仓库根目录运行：

```bash
pnpm --filter mock dev
```

服务默认使用 `.env` 中的 `PORT` 端口。启动后访问服务首页，可查看当前提供的 API 列表。
