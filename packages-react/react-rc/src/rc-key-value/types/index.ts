import React, {
  HTMLAttributes,
  ReactNode
} from "react";

export interface IItemResolved {
  key?: string;
  k: string | React.ReactElement;
  v: ReactNode;
}

export type TItems = (IItemResolved | null)[] | {
  [k: string]: ReactNode;
};

export interface IKeyValueProps extends HTMLAttributes<HTMLDivElement> {
  o: TItems;

  /**
   * 可用于扩展样式，默认 the-kv
   */
  classNameForItem?: string;

  /**
   * 可用于扩展样式，默认 the-kv-key
   */
  classNameForKey?: string;

  /**
   * 可用于扩展样式，默认 the-kv-value
   */
  classNameForValue?: string;

  /**
   * 是否水平排列
   */
  horizontal?: boolean;

  // 是否展示的时候去掉空的 value 项
  ignoreEmpty?: boolean;

  // 是否允许内容折行
  wrapValue?: boolean;
}
