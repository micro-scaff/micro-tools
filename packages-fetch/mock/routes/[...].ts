export default defineEventHandler(() => {
  return `
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Mock服务API列表</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; padding: 20px; }
        h1 { color: #333; }
        ul { list-style: none; padding: 0; }
        li { margin: 10px 0; }
        a { color: #0066cc; text-decoration: none; }
        a:hover { text-decoration: underline; }
    </style>
</head>
<body>
    <h1>Mock服务API列表</h1>
    <h2>模拟服务正在运行</h2>
    <ul>
        <li><a href="/api/obj">/api/obj</a> - 用户信息</li>
        <li><a href="/api/menu">/api/menu</a> - 菜单数据</li>
        <li><a href="/api/upload">/api/upload</a> - 文件上传</li>
        <li><a href="/api/file-upload">/api/file-upload</a> - 文件上传 (新)</li>
        <li><a href="/api/file-download">/api/file-download</a> - 文件下载</li>
        <li><a href="/api/list">/api/list</a> - 表格数据</li>
    </ul>
</body>
</html>
`;
});
