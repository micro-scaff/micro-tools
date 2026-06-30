import {
  ElMessage

} from "element-plus";
import type {
  MessageOptions, MessageHandler
} from "element-plus";

/**
 * ElMessage 单例类
 * 确保全局每次只能弹出一个消息
 */
interface IEnhancedMessageOptions extends MessageOptions {

  /**
   * 是否用新消息替换当前正在显示的消息，默认 false（与原逻辑保持一致）
   */
  replace?: boolean;
}

class Messages {
  private currentMessage: MessageHandler | null = null;

  private isClosing = false;

  private pendingOptions: IEnhancedMessageOptions | null = null;

  /**
   * 关闭所有现有消息
   */
  private closeAllMessages(): void {

    // 关闭当前消息
    if (this.currentMessage) {
      this.currentMessage.close();
      this.currentMessage = null;
    }

    // 使用 ElMessage 的 closeAll 方法关闭所有消息
    ElMessage.closeAll();
    this.isClosing = false;
    this.pendingOptions = null;
  }

  /**
   * 显示消息
   * @param options 消息配置选项
   * @returns MessageHandler
   */
  show(options: string | IEnhancedMessageOptions): MessageHandler {
    const normalized: IEnhancedMessageOptions =
      typeof options === "string"
        ? {
          message: options
        }
        : options;

    const replace = normalized.replace ?? false;

    // 去掉自定义字段，避免传递到 ElMessage
    const {
      replace: _replace,
      onClose: userOnClose,
      ...elMessageOptions
    } = normalized as IEnhancedMessageOptions & { onClose?: () => void };

    // 如果已有消息正在显示
    if (this.currentMessage) {

      // 默认行为与原逻辑一致：不替换，直接返回当前实例
      if (!replace) {
        return this.currentMessage;
      }

      // 需要替换
      // 若正在关闭动画中，只记录最新的替换请求
      if (this.isClosing) {
        this.pendingOptions = normalized;

        return this.currentMessage;
      }

      // 触发关闭，并在 onClose 中再创建新消息，确保不会同屏出现两条
      this.isClosing = true;
      this.pendingOptions = normalized;
      this.currentMessage.close();

      return this.currentMessage;
    }

    // 创建新的消息实例，并在关闭时清理状态（同时兼容用户自定义 onClose）
    this.currentMessage = ElMessage({
      ...elMessageOptions,
      onClose: () => {
        const wasClosing = this.isClosing;

        this.currentMessage = null;
        this.isClosing = false;

        // 若是替换流程，关闭完成后展示最新待替换的消息
        if (wasClosing && this.pendingOptions) {
          const pending = this.pendingOptions;

          this.pendingOptions = null;

          // 递归调用展示新消息
          this.show(pending);
        }

        userOnClose?.();
      }
    });

    // 修复 close 的 this 绑定，确保手动关闭也能正确触发
    const originalClose = this.currentMessage.close.bind(this.currentMessage);

    this.currentMessage.close = () => {

      // 直接调用原始 close，让 onClose 接管清理逻辑
      originalClose();
    };

    return this.currentMessage;
  }

  /**
   * 显示成功消息
   * @param message 消息内容
   * @param options 额外配置选项
   */
  success(
      message: string,
      options?: Omit<MessageOptions, "message" | "type"> & IEnhancedMessageOptions
  ): MessageHandler {
    return this.show({
      message,
      type: "success",
      ...options
    });
  }

  /**
   * 显示警告消息
   * @param message 消息内容
   * @param options 额外配置选项
   */
  warning(
      message: string,
      options?: Omit<MessageOptions, "message" | "type"> & IEnhancedMessageOptions
  ): MessageHandler {
    return this.show({
      message,
      type: "warning",
      ...options
    });
  }

  /**
   * 显示错误消息
   * @param message 消息内容
   * @param options 额外配置选项
   */
  error(
      message: string,
      options?: Omit<MessageOptions, "message" | "type"> & IEnhancedMessageOptions
  ): MessageHandler {
    return this.show({
      message,
      type: "error",
      ...options
    });
  }

  /**
   * 显示信息消息
   * @param message 消息内容
   * @param options 额外配置选项
   */
  info(
      message: string,
      options?: Omit<MessageOptions, "message" | "type"> & IEnhancedMessageOptions
  ): MessageHandler {
    return this.show({
      message,
      type: "info",
      ...options
    });
  }

  /**
   * 手动关闭当前消息
   */
  close(): void {
    this.closeAllMessages();
  }

  /**
   * 检查是否有消息正在显示
   */
  isShowing(): boolean {
    return this.currentMessage !== null;
  }
}

// 创建单例实例
const messages = new Messages();

// 导出单例实例
export default messages;

// 也可以导出类，以便在需要时创建多个实例
export { Messages };
