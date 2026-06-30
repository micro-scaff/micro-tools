/**
 * 注入图标字体
 * @param {string} fontFamily Font class 处生成的链接
 *
 * 使用：import { injectIconFont } from 'micro-rc';
 *
 * injectIconFont(Font class 处生成的链接);
 */
export default function injectIconfont(fontFamily: string): void {
  const head: HTMLHeadElement = document.head || document.querySelector("head");

  const link: HTMLLinkElement = document.createElement("link");

  link.rel = "stylesheet";
  link.href = `https:${fontFamily}`;

  link.addEventListener("error", (): void => {
    throw new Error("Inject iconFont fail!");
  });

  head.append(link);
}
