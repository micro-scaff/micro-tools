import {
  findUpSync
} from "find-up";

import {
  existsSync
} from "fs";
import {
  dirname,
  resolve
} from "path";

/**
 * 查找大仓的根目录
 *
 * 使用的 pnpm
 *
 * @param cwd 指定目录，如果提供则直接使用该目录
 * @param fileName 查找的文件名，默认为 pnpm-workspace.yaml
 */
export default function root(cwd?: string, fileName: string = "pnpm-workspace.yaml"): string {

  // 如果没有提供 cwd，从当前目录开始查找
  if (!cwd) {
    const lockFile = findUpSync(fileName, {
      cwd: process.cwd(),
      type: "file"
    });

    return dirname(lockFile || "");
  }

  // 如果提供了 cwd，解析为绝对路径
  const resolvedCwd = resolve(process.cwd(), cwd);

  // 检查目录是否存在
  if (!existsSync(resolvedCwd)) {
    console.error(`目录不存在: ${resolvedCwd}`);

    return "";
  }

  // 如果指定目录下存在 workspace 文件，使用该目录
  const workspaceFile = resolve(resolvedCwd, fileName);

  if (existsSync(workspaceFile)) {
    return resolvedCwd;
  }

  // 如果指定目录下没有 workspace 文件，直接返回该目录
  // 这样可以在指定目录下查找包，而不是向上查找
  return resolvedCwd;
}
