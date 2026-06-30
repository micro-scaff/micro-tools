import {
  Package
} from "@manypkg/get-packages";
import {
  glob
} from "glob";

import {
  readFileSync
} from "fs";
import {
  join
} from "path";

/**
 * 在指定目录下手动查找包
 */
export default async function findPackagesInDir(dir: string): Promise<Package[]> {

  try {

    // 查找所有 package.json 文件
    const packageJsonFiles = await glob("**/package.json", {
      cwd: dir,
      absolute: true,
      ignore: [
        "**/node_modules/**"
      ]
    });

    const packages: Package[] = [];

    for (const packageJsonFile of packageJsonFiles) {
      try {
        const content = readFileSync(packageJsonFile, "utf8");

        const packageJson = JSON.parse(content);

        // 跳过私有包（除非明确需要）
        if (packageJson.private) {
          continue;
        }

        packages.push({
          packageJson,
          dir: join(packageJsonFile, ".."),
          relativeDir: join(packageJsonFile, "..").replace(dir, "")
        });
      } catch (error) {
        console.warn(`无法解析包文件: ${packageJsonFile}`, error);
      }
    }

    return packages;
  } catch (error) {
    console.error(`查找包时出错: ${dir}`, error);

    return [];
  }
}
