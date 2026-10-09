/*
 * 这两条规则只在本 CI 工具脚本中关闭：
 * 1. 当前 ESLint 对 .mjs 变量产生“仅作为类型使用”的误报。
 * 2. 目录遍历、重试等待和分批请求需要串行 await，避免过量并发。
 */
/* eslint-disable unused-imports/no-unused-vars, no-await-in-loop */

import {
  appendFile,
  readdir,
  readFile
} from "node:fs/promises";
import path from "node:path";

// GitHub Actions 会在仓库根目录执行脚本。
const workspaceRoot = process.cwd();

// Changesets 的配置和变更记录都存放在该目录。
const changesetDirectory = path.join(workspaceRoot, ".changeset");

// 只查询 npm 官方 registry，避免镜像同步延迟导致误判。
const registryUrl = "https://registry.npmjs.org";

// 递归查找 package.json 时跳过构建产物和依赖目录。
const ignoredDirectories = new Set([
  ".git",
  ".turbo",
  "coverage",
  "dist",
  "node_modules"
]);

/**
 * 写入 GitHub Actions 步骤输出。
 *
 * 工作流后续通过 steps.release-check.outputs.should_run 读取结果。
 * 本地执行时没有 GITHUB_OUTPUT，函数会安全跳过写入。
 */
async function writeOutput(name, value) {
  if (process.env.GITHUB_OUTPUT) {
    await appendFile(process.env.GITHUB_OUTPUT, `${name}=${value}\n`);
  }
}

/**
 * 遍历 workspace 包目录，收集所有 package.json。
 *
 * 根目录中只进入 packages* 和 envs，进入包目录后再递归查找子包。
 */
async function findPackageFiles(directory) {
  const entries = await readdir(directory, {
    withFileTypes: true
  });

  const packageFiles = [];

  for (const entry of entries) {
    if (!entry.isDirectory() || ignoredDirectories.has(entry.name)) {
      continue;
    }

    const childDirectory = path.join(directory, entry.name);

    if (entry.name.startsWith("packages") || directory !== workspaceRoot) {
      try {

        // 当前目录本身是一个包时，先记录它。
        await readFile(path.join(childDirectory, "package.json"));
        packageFiles.push(path.join(childDirectory, "package.json"));
      } catch {}

      // 继续查找诸如 packages-vue/vue-hooks 这样的嵌套工作区包。
      packageFiles.push(...(await findPackageFiles(childDirectory)));
    } else if (entry.name === "envs") {
      packageFiles.push(path.join(childDirectory, "package.json"));
    }
  }

  return packageFiles;
}

/**
 * README.md 是 Changesets 自带说明，其他 Markdown 文件才是待处理 Changeset。
 */
async function hasPendingChangesets() {
  const files = await readdir(changesetDirectory);

  return files.some(file => {
    return file.endsWith(".md") && file !== "README.md";
  });
}

/**
 * 返回可能发布的包：
 * - 跳过 private: true 的包。
 * - 跳过 .changeset/config.json 的 ignore 列表。
 * - 跳过缺少 name 或 version 的无效配置。
 * - 使用 Map 按包名去重。
 */
async function getPublishablePackages() {
  const config = JSON.parse(await readFile(path.join(changesetDirectory, "config.json"), "utf8"));

  const ignoredPackages = new Set(config.ignore);

  const packageFiles = await findPackageFiles(workspaceRoot);

  const packages = new Map();

  for (const packageFile of packageFiles) {
    const packageJson = JSON.parse(await readFile(packageFile, "utf8"));

    if (
      packageJson.private === true ||
      !packageJson.name ||
      !packageJson.version ||
      ignoredPackages.has(packageJson.name)
    ) {
      continue;
    }

    packages.set(packageJson.name, {
      name: packageJson.name,
      version: packageJson.version
    });
  }

  return [
    ...packages.values()
  ];
}

/**
 * 查询 name@version 是否已经存在于 npm。
 *
 * 404 表示当前版本未发布。
 * 429、5xx 或网络中断会最多重试 3 次。
 * 单次请求超过 10 秒会主动中止，避免 CI 长时间卡在网络请求上。
 * 其他错误直接终止工作流，不会把查询失败当成“无需发布”。
 */
async function isPublished({
  name, version
}) {
  const packageName = encodeURIComponent(name);

  const packageVersion = encodeURIComponent(version);

  const packageUrl = `${registryUrl}/${packageName}/${packageVersion}`;

  let response;

  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      response = await fetch(packageUrl, {
        signal: AbortSignal.timeout(10_000)
      });

      if (response.status !== 429 && response.status < 500) {
        break;
      }
    } catch (error) {
      if (attempt === 3) {
        throw new Error(`查询 ${name}@${version} 失败：无法连接 npm registry`, {
          cause: error
        });
      }
    }

    if (attempt < 3) {
      await new Promise(resolve => {
        return setTimeout(resolve, attempt * 1000);
      });
    }
  }

  if (response.status === 404) {
    return false;
  }

  if (!response.ok) {
    throw new Error(`查询 ${name}@${version} 失败：npm registry 返回 ${response.status}`);
  }

  return true;
}

// 有 Changeset 时不查 npm，直接交给 Changesets Action 生成或更新版本 PR。
if (await hasPendingChangesets()) {
  console.info("检测到待处理的 Changeset，将继续生成或更新版本 PR。");
  await writeOutput("should_run", "true");
  await writeOutput("reason", "changesets");
  process.exit(0);
}

const publishablePackages = await getPublishablePackages();

const unpublishedPackages = [];

// 每批最多查询 4 个包，减少 npm 限流或连接重置的概率。
for (let index = 0; index < publishablePackages.length; index += 4) {
  const batch = publishablePackages.slice(index, index + 4);

  const results = await Promise.all(batch.map(async packageInfo => {
    return {
      packageInfo,
      published: await isPublished(packageInfo)
    };
  }));

  for (const result of results) {
    if (!result.published) {
      unpublishedPackages.push(result.packageInfo);
    }
  }
}

// 没有未发布版本时返回 false，Workflow 后续步骤会显示为 Skipped。
if (unpublishedPackages.length === 0) {
  console.info("没有待处理的 Changeset，也没有未发布的包；后续步骤将跳过。");
  await writeOutput("should_run", "false");
  await writeOutput("reason", "nothing-to-release");
  process.exit(0);
}

// 记录具体包名和版本，方便在 Actions 日志中审核本次发布范围。
console.info("检测到以下尚未发布的版本：");

for (const packageInfo of unpublishedPackages) {
  console.info(`- ${packageInfo.name}@${packageInfo.version}`);
}

// should_run=true 使 Workflow 继续安装依赖并执行发布。
await writeOutput("should_run", "true");
await writeOutput("reason", "unpublished-packages");
