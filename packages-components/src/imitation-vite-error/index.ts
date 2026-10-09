import {
  IErrorPayload
} from "./types";

import "./rc";

const overlayId = "imitation-vue-error";

/**
 * 模仿 Vite 中的错误控件
 * target
 * https://github.com/vitejs/vite/blob/main/packages/vite/src/client/overlay.ts
 *
 * 使用：
 *
 * import {
 *     imitationViteError
 * } from 'micro-rc';
 *
 * const overlay = imitationViteError(err);
 *
 * document.body.appendChild(overlay);
 *
 * 或
 *
 * 获取到的页面元素.appendChild(overlay);
 *
 */
export default function imitationViteError(err: IErrorPayload["err"], dialog?: boolean): HTMLElement {

  // 延迟到实际调用时再读取 Custom Elements 注册表，使模块能够在 SSR/Node 环境安全导入。
  const ErrorOverlay = globalThis.customElements?.get(overlayId);

  // 控件依赖浏览器 DOM；在不支持的环境中调用时，返回比 ReferenceError 更明确的信息。
  if (!ErrorOverlay) {
    throw new Error(`${overlayId} is only available in a browser environment.`);
  }

  return new ErrorOverlay(err, dialog);
}
