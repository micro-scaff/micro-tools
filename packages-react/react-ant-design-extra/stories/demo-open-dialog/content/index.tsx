import React from "react";
import {
  Form,
  Input
} from "antd";

import {
  useForm
} from "../../../src";

export default function Content(): React.ReactElement {
  const [
    form
  ] = useForm();

  return (
    <Form
      autoComplete="off"
      form={form}
      initialValues={{
        remember: true
      }}
      labelCol={{
        span: 8
      }}
      name="basic"
      style={{
        maxWidth: 600
      }}
      wrapperCol={{
        span: 16
      }}>
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your username!"
          }
        ]}>
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!"
          }
        ]}>
        <Input />
      </Form.Item>
    </Form>
  );
}
