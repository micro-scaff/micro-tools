import {
  VNode
} from "vue";
import {
  ButtonProps,
  DrawerProps,
  DialogProps
} from "element-plus";

import {
  ESize,
  EMode
} from "../enum";

// 抽离出公共的排除属性
type TExcludedProps = "open" | "onClose" | "footer" | "header" | "children" | "onCancel" | "maskClosable" | "mask" | "zIndex" | "keyboard" | "title" | "className" | "closable" | "rootClassName";

export type TDialogPropsOptions = Partial<Omit<DrawerProps, TExcludedProps>> | Partial<Omit<DialogProps, TExcludedProps>>;

export interface IButtonProps extends Partial<ButtonProps> {
  label?: string;
}

export interface IDialogProps<T = void, D extends object = Record<string, unknown>> {

  /**
   * @todo 记录当前的操作类型
   *
   * 埋点的时候，也许需要
   */
  op?: string;

  /**
   * 模式
   *
   * @default EMode.MODAL 模态框
   * @default EMode.DRAWER 抽屉
   */
  mode?: EMode;

  /**
   * 标题
   */
  title?: string | VNode;

  /**
   * 标题额外内容
   */
  titleExtra?: string | VNode;

  /**
   * 底部操作按钮
   */
  footerExtra?: VNode | string;

  /**
   * 内容
   */
  content?: string | VNode;

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
   * @param result 提交等接口的返回值
   * @deprecated data 默认数据(props.data 的初始值) / 为表单数据
   */
  onClose?(result?: T | Error | unknown, data?: D | unknown): void;

  /**
   * Dialog props.onSubmit 方法定义，value 的类型为 Promise resolve 的类型，
   *
   * 执行提交后发生
   *
   * @param data 数据 (表单数据)
   * @param defaultData 默认数据 (props.data 的初始值)
   *
   * @returns 返回值
   */
  onSubmit?(data?: D, defaultData?: D): Promise<Record<string, unknown> | undefined | T | boolean>;

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
