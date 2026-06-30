import {
  findUpSync
} from "find-up";

import {
  dirname
} from "path";

export default function root(cwd: string = process.cwd()): string {
  const packageFile = findUpSync("package.json", {
    cwd,
    type: "file"
  });

  return dirname(packageFile || "");
}
