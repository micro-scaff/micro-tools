import React from "react";

import styled, {
  css
} from "styled-components";

import {
  IItemResolved,
  IKeyValueProps
} from "../types";
import {
  convertItems
} from "../util";

interface IPropsScKeyValue {
  horizontal?: boolean;
}

interface IPropsScKeyValueItemV {
  wrapValue?: boolean;
}

const ScKeyValue = styled.div<IPropsScKeyValue>`
  ${props => {
    return (props.horizontal ? css`
    display: flex;
    overflow: hidden;
  ` : null);
  }};
`;

const ScKeyValueItem = styled.div<IPropsScKeyValue>`
  display: flex;
  margin: 4px ${props => {
    return (props.horizontal ? 16 : 0);
  }}px 4px 0;
  color: #333;
  color: var(--cb-color-text-primary, #333);

  &:last-child {
    margin-right: 0;
  }
`;

const ScKeyValueItemK = styled.div`
  margin-right: 8px;
  color: #999;
  color: var(--cb-color-text-tertiary, #999);
`;

const ScKeyValueItemV = styled.div<IPropsScKeyValueItemV>`
  flex: 1;
  ${props => {
    return (props.wrapValue ? css`
    white-space: normal;
    word-wrap: break-word;
  ` : css`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `);
  }}
`;

/**
 * 功能简单的 key-value 对展示
 */
export default function KeyValue({
  o,
  classNameForItem = "the-kv",
  classNameForKey = "the-kv-key",
  classNameForValue = "the-kv-value",
  horizontal,
  ignoreEmpty,
  wrapValue,
  ...props
}: IKeyValueProps): React.ReactElement | null {
  const items: IItemResolved[] = convertItems(o, ignoreEmpty);

  if (items.length === 0) {
    return null;
  }

  return (
    <ScKeyValue
      horizontal={horizontal}
      {...props}>
      {items.map(({
        key,
        k,
        v
      }, i) => {
        return (
          <ScKeyValueItem {...{
            key: key || i,
            className: classNameForItem,
            horizontal
          }}>
            <ScKeyValueItemK className={classNameForKey}>
              {k}
            </ScKeyValueItemK>

            <ScKeyValueItemV
              className={classNameForValue}
              wrapValue={wrapValue}>
              {v}
            </ScKeyValueItemV>
          </ScKeyValueItem>
        );
      })}
    </ScKeyValue>
  );
}
