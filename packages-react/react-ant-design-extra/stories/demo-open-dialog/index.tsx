/* eslint-disable no-console */

import React, {
  useCallback
} from "react";
import {
  Button
} from "antd";

import {
  isFunction
} from "lodash-es";

import {
  open,
  DialogMode
} from "../../src";
import Content from "./content";

const data = (val: number) => {
  return fetch(`https://mock.mengxuegu.com/mock/61922927f126df7bfd5b79ef/promise/promise${val}#!method=get`).then(req => {
    return req.json();
  });
};

data(1).then(res => {
  console.log(res);
});

console.log(isFunction(data), "isFunction(data)");

// 模拟真实的 API 请求
const mockApiRequest = (val: unknown): Promise<Record<string, unknown>> => {
  return new Promise((resolve, reject) => {

    console.log(val, "val");

    // 模拟网络延迟
    const delay = Math.random() * 2000 + 1000; // 1-3秒随机延迟

    setTimeout(() => {

      // 模拟 90% 成功，10% 失败
      if (Math.random() > 0.4) {
        resolve({
          id: Date.now(),
          name: "张三",
          email: "zhangsan@example.com",
          createdAt: new Date().toISOString(),
          status: "success"
        });
      } else {
        reject(new Error("网络请求失败，请重试"));
      }
    }, delay);
  });
};

export default function Demo(): React.ReactElement {
  const handleClick = useCallback(() => {
    open({
      title: "我是标题",
      content: <Content />,
      onSubmit: data => {
        return mockApiRequest(data);
      },

      mode: DialogMode.MODAL,
      data: () => {
        return data(1);
      },
      backdropClosable: false
    }).then(result => {

      console.log("提交成功:", result);
    });
  }, []);

  return (
    <div>
      <p>React Ant Design Extra Dialog</p>
      <Button onClick={handleClick}>Click me</Button>
    </div>
  );
}
