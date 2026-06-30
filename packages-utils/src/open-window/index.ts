interface IOptions {

  /**
   * 指定打开链接的上下文，可以是 _self（当前窗口）或 _blank（新窗口），默认为 '_blank'
   */
  target?: "_self" | "_blank";

  /**
   * 如果为 true，将添加 noopener=yes，默认为 true
   */
  noopener?: boolean;

  /**
   * 如果为 true，将添加 noreferrer=yes，默认为 true
   */
  noreferrer?: boolean;
}

/**
 * 用于在浏览器中打开窗口
 * @param {string} url 要打开的目标 URL
 * @param {IOptions} opt
 */
export default function openWindow(url: string, opt?: IOptions): void {
  const {
    target = "__blank", noopener = true, noreferrer = true
  } = opt || {};

  const feature: string[] = [];

  if (noopener) {
    feature.push("noopener=yes");
  }

  if (noreferrer) {
    feature.push("noreferrer=yes");
  }

  window.open(url, target, feature.join(","));
}
