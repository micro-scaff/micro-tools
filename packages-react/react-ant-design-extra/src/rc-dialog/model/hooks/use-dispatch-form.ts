import {
  useCallback
} from "react";
import {
  FormInstance
} from "antd";

import {
  EAction
} from "../enum";
import useModelDispatch from "./_use-model-dispatch";

export default function useDispatchForm(): (payload?: FormInstance) => void {
  const dispatch = useModelDispatch();

  return useCallback((payload?: FormInstance) => {
    return dispatch({
      type: EAction.FORM,
      payload: payload ?? null
    });
  }, [
    dispatch
  ]);
}
