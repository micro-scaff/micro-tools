import {
  Package,
  getPackages as getPackagesFunc
} from "@manypkg/get-packages";

import {
  existsSync
} from "fs";
import {
  resolve,
  join
} from "path";

import findPackagesInDir from "./find-packagesIn-dir";
import _root from "./root";

/**
 * 获取大仓的所有包
 *
 * 使用的 pnpm
 *
 * 参考的是 changesets，实现的是同步版本
 *
 * https://github.com/changesets/changesets/tree/main
 */
export default async function getPackagesSync(cwd?: string): Promise<Package[]> {

  // 如果没有指定目录，使用默认的 root 查找
  if (!cwd) {
    const rootDir = _root();

    return getPackagesFunc(rootDir).then(packages => {
      return packages.packages;
    });
  }

  // 如果指定了目录，检查该目录下是否有 workspace 文件
  const resolvedDir = resolve(process.cwd(), cwd);

  const workspaceFile = join(resolvedDir, "pnpm-workspace.yaml");

  if (existsSync(workspaceFile)) {

    // 如果有 workspace 文件，使用 @manypkg/get-packages
    return getPackagesFunc(resolvedDir).then(packages => {
      return packages.packages;
    });
  }

  // 如果没有 workspace 文件，手动查找该目录下的包
  return findPackagesInDir(resolvedDir);

}
