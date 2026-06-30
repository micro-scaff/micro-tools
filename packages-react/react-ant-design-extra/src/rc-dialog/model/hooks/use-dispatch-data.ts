import {
  useCallback
} from "react";

import {
  EAction
} from "../enum";
import useModelDispatch from "./_use-model-dispatch";

export default function useDispatchData(): (payload?: Record<string, unknown> | unknown) => void {
  const dispatch = useModelDispatch();

  return useCallback((payload?: Record<string, unknown> | unknown) => {
    return dispatch({
      type: EAction.DATA,
      payload: payload ?? undefined
    });
  }, [
    dispatch
  ]);
}
