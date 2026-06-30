/**
 * 解析命令参数，支持多种格式
 * @param command 命令参数，可以是字符串或字符串数组
 * @returns 解析后的命令数组
 */
export default function parseCommands(command: string | string[]): string[] {
  if (Array.isArray(command)) {
    return command;
  }

  if (typeof command === "string") {

    // 检查是否是 JSON 数组格式 [item1, item2]
    if (command.startsWith("[") && command.endsWith("]")) {
      try {
        return JSON.parse(command);
      } catch {

        // 如果解析失败，按逗号分割
        return command.split(",").map(cmd => {
          return cmd.trim();
        });
      }
    }

    // 按逗号分割字符串
    return command.split(",").map(cmd => {
      return cmd.trim();
    });
  }

  return [
    command
  ];
}
