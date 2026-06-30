export interface IMessage {
  type: string;
  data: {
    [key: string]: string | number | boolean | object;
  };
}

class IframeMessage {
  private iframe: HTMLIFrameElement | null = null;

  private url: string | null = null;

  constructor() {

    // 页面卸载时自动移除 iframe
    window.addEventListener("beforeunload", () => {
      return this.destroy();
    });
  }

  private destroy(): void {
    if (!this.iframe) {
      return;
    }

    this.iframe?.remove();
    this.iframe = null;
  }

  createIframe(url: string): HTMLIFrameElement {
    this.url = url;

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
    window.addEventListener("message", (event: MessageEvent) => {
      if (typeof event.data.type !== "string") {
        return;
      }

      callback(event.data);
    });
  }

  removeMessageListener(callback: (e: MessageEvent | IMessage | never) => void): void {
    window.removeEventListener("message", callback);
  }
}

export default IframeMessage;
