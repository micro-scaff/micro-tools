import type {
  ButtonProps,
  DrawerProps,
  ModalProps
} from "antd";
import type {
  HTMLAttributes
} from "react";

import {
  EMode,
  ESize
} from "../enum";

export interface IButtonProps extends Partial<ButtonProps> {
  label?: string;
}

// 抽离出公共的排除属性
type TExcludedProps = "open" | "onClose" | "footer" | "header" | "children" | "onCancel" | "maskClosable" | "mask" | "zIndex" | "keyboard" | "title" | "className" | "closable" | "rootClassName";

export type TDialogPropsOptions = Partial<Omit<DrawerProps, TExcludedProps>> | Partial<Omit<ModalProps, TExcludedProps>>;

/**
 * Dialog props 定义
 *
 * T: 返回值类型
 * D: 数据类型
 */
export interface IDialogProps<T = void, D extends object = Record<string, unknown>> extends Omit<HTMLAttributes<HTMLDivElement>, "title" | "content" | "onSubmit"> {

  /**
   * @todo 记录当前的操作类型
   *
   * 埋点的时候，也许需要
   */
  op?: string;

  /**
   * 标题
   */
  title?: string | React.ReactElement;

  /**
   * 标题额外内容
   */
  titleExtra?: string | React.ReactElement;

  /**
   * 底部操作按钮
   */
  footerExtra?: React.ReactElement[];

  /**
   * 内容
   */
  content?: string | React.ReactElement;

  /**
   * 模式
   *
   * @default EMode.MODAL 模态框
   * @default EMode.DRAWER 抽屉
   */
  mode?: EMode;

  /**
   * 尺寸
   */
  size?: number | ESize;

  /**
   * 容器类名
   */
  classNameOnBody?: string;

  /**
   * 是否需要背投
   *
   * @default true
   */
  backdrop?: boolean; // 是否需要背投
  /**
   * 点击蒙层是否允许关闭
   *
   * @default true
   */
  backdropClosable?: boolean;

  /**
   * 显示关闭按钮
   *
   * @default true
   */
  closable?: boolean;

  /**
   * 键盘的 ESC
   */
  esc?: boolean;

  /**
   * Dialog 本体的 zIndex
   */
  zIndex?: number;

  /**
   * 数据
   */
  data?: D | (() => Promise<D | unknown | string | undefined | number | Record<string, unknown>>);

  /**
   * Dialog props.onClose 方法定义，value 的类型为 Promise resolve 的类型
   *
   * 执行关闭后发生（然而，真正的从 DOM 上移除还是必须要使用者自行处理）
   *
   * @param result 结果（也就是当前的弹出框状态值）
   * @deprecated defaultResult 默认结果（销毁时）,后面考虑销毁
   */
  onClose?(result?: T | Error, data?: D): void;

  /**
   * Dialog props.onSubmit 方法定义，value 的类型为 Promise resolve 的类型，
   * 执行提交后发生
   */
  onSubmit?(result?: D, defaultResult?: D): Promise<Record<string, unknown> | undefined | T | boolean>;

  /**
   * @deprecated 是否进行提交操作，默认 true
   *
   * 传入 false 时只显示关闭 - 查看/详情
   */
  isSubmit?: boolean;

  /**
   * 确认按钮
   */
  ok?: IButtonProps | string;

  /**
   * 取消按钮
   */
  cancel?: IButtonProps | string;

  /**
   * 选项
   *
   * 传入抽屉和模态框的各个自带 api
   *
   * 但是要注意，已有属性的值会覆盖传入的值
   */
  options?: TDialogPropsOptions;
}
