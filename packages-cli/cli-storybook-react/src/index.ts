/* eslint-disable no-console */
import {
  execa
} from "execa";

import {
  existsSync
} from "fs";
import {
  dirname,
  join
} from "path";
import {
  exit
} from "process";
import {
  fileURLToPath
} from "url";

import {
  root
} from "./utils";

async function main(): Promise<void> {
  try {
    const rootDir = root();

    console.log(`🚀 启动 Storybook for: ${rootDir}`);

    // 获取 CLI 工具目录
    const cliDir = dirname(dirname(fileURLToPath(import.meta.url)));

    console.log(`CLI 工具目录: ${cliDir}`);

    // 判断是否存在 .storybook 目录
    const storybookDir = join(rootDir, "stories");

    let STORYBOOK_STORIES_PATH = "";

    let STORYBOOK_STORIES_MDX_PATH = "";

    if (existsSync(storybookDir)) {
      console.log("✅ stories 目录存在");
      STORYBOOK_STORIES_PATH = `${rootDir}/stories/**/*.stories.@(js|jsx|mjs|ts|tsx)`;
      STORYBOOK_STORIES_MDX_PATH = `${rootDir}/stories/**/*.mdx`;
    } else {
      console.error("❌ stories 目录不存在，请创建 stories 目录");
      exit(1);
    }

    // 运行 CLI 工具自己的 storybook 脚本，并传递环境变量
    const childProcess = execa("pnpm", [
      "run",
      "storybook"
    ], {
      cwd: cliDir,
      stdio: "inherit",
      env: {
        ...process.env,
        STORYBOOK_STORIES_PATH,
        STORYBOOK_STORIES_MDX_PATH
      }
    });

    // 处理进程退出信号
    const cleanup = () => {
      console.log("\n🛑 正在停止 Storybook...");
      childProcess.kill("SIGINT");
    };

    process.on("SIGINT", cleanup);
    process.on("SIGTERM", cleanup);

    await childProcess;

  } catch (error) {
    console.error("❌ 运行失败:", error);
    exit(1);
  }
}

main();
