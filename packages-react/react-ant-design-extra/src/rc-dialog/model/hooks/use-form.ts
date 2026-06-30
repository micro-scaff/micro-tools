import {
  useEffect
} from "react";
import {
  Form,
  FormInstance
} from "antd";

import useDispatchForm from "./use-dispatch-form";
import useStateData from "./use-state-data";
import useStateFormData from "./use-state-form-data";

/**
 *创建一个 hook，这个 hook 返回一个 form 的捆绑方式，及 props.data
 *
 * @returns [form, formData, data]
 * @description form 表单实例
 * @description formData 表单数据
 * @description data 数据（props.data 的初始值）
 */
export default function useForm(): [FormInstance, Record<string, unknown> | undefined | unknown, Record<string, unknown> | unknown | undefined] {

  const data = useStateData();

  const formData = useStateFormData();

  const dispatchForm = useDispatchForm();

  const [
    form
  ] = Form.useForm();

  useEffect(() => {
    if (!form) {
      return;
    }

    dispatchForm(form);
  }, [
    form,
    dispatchForm
  ]);

  return [
    form,
    formData,
    data
  ];
}
