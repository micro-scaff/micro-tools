import {
  cac
} from "cac";

import {
  exit
} from "process";

import run from "./run";

try {
  const cli = cac("mt-cli-run");

  cli.command("[script]").
      usage("Run script.").
      option("--root <path>", "指定 monorepo 根目录").
      action(async (command: string, options: { root?: string }) => {
        await run({
          command,
          root: options.root
        });
      });

  cli.on("command:*", () => {
    console.error("无效的命令!");

    exit(1);
  });

  cli.usage("mt-cli-run");
  cli.help();
  cli.parse();
} catch (error) {
  console.error(error);

  exit(1);
}
