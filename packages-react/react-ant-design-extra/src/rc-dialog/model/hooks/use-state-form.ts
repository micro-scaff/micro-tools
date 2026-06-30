import {
  useMemo
} from "react";
import {
  FormInstance
} from "antd";

import useModelState from "./_use-model-state";

export default function useStateForm(): FormInstance | null {
  const state = useModelState();

  return useMemo(() => {
    return state.form;
  }, [
    state
  ]);
}
