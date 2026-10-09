export interface IMessage {
  type: string;
  data: {
    [key: string]: string | number | boolean | object;
  };
}

class IframeMessage {
  private iframe: HTMLIFrameElement | null = null;

  private url: string | null = null;

  // 保存用户 callback 与实际包装函数的映射，移除监听时必须使用同一个函数引用。
  private messageListeners = new Map<(params: IMessage) => void, (event: MessageEvent) => void>();

  constructor() {

    // 页面卸载时自动移除 iframe
    window.addEventListener("beforeunload", () => {
      return this.destroy();
    });
  }

  private destroy(): void {
    for (const listener of this.messageListeners.values()) {
      window.removeEventListener("message", listener);
    }

    this.messageListeners.clear();

    if (!this.iframe) {
      return;
    }

    this.iframe?.remove();
    this.iframe = null;
  }

  createIframe(url: string): HTMLIFrameElement {

    // 重复创建前先释放旧 iframe 及其消息包装函数，避免隐藏节点和监听器累积。
    this.destroy();

    // postMessage 的 targetOrigin 只能包含协议、域名和端口，不能直接使用带路径的 URL。
    this.url = new URL(url, window.location.href).origin;

    this.iframe = document.createElement("iframe");

    Object.assign(this.iframe.style, {
      width: "1px",
      height: "1px",
      display: "none",
      position: "absolute",
      top: "0",
      left: "0",
      zIndex: "-1",
      border: "none",
      background: "transparent",
      pointerEvents: "none",
      opacity: "0",
      visibility: "hidden"
    });

    this.iframe.src = url;

    document.body.append(this.iframe);

    return this.iframe;
  }

  postMessage(message: IMessage): void {
    if (this.iframe) {
      this.iframe.contentWindow?.postMessage(message, this.url || "*");
    }
  }

  onMessage(callback: (params: IMessage) => void): void {
    this.removeMessageListener(callback);

    const listener = (event: MessageEvent): void => {

      /**
       * origin 限制消息必须来自目标域，source 进一步限制为当前 iframe 窗口。
       * 两项同时校验可阻止同源的其它窗口冒充目标 iframe 发送消息。
       * 最后的结构检查避免把任意 postMessage 数据直接传给业务回调。
       */
      if (
        event.origin !== this.url ||
        event.source !== this.iframe?.contentWindow ||
        !event.data ||
        typeof event.data !== "object" ||
        typeof event.data.type !== "string" ||
        !event.data.data ||
        typeof event.data.data !== "object"
      ) {
        return;
      }

      callback(event.data);
    };

    this.messageListeners.set(callback, listener);
    window.addEventListener("message", listener);
  }

  removeMessageListener(callback: (params: IMessage) => void): void {

    // removeEventListener 必须接收注册时的包装函数，不能直接传入用户 callback。
    const listener = this.messageListeners.get(callback);

    if (!listener) {
      return;
    }

    window.removeEventListener("message", listener);
    this.messageListeners.delete(callback);
  }
}

export default IframeMessage;
