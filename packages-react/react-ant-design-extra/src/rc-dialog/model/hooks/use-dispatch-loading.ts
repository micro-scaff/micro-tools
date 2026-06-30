import {
  useCallback
} from "react";

import {
  EAction,
  ELockState
} from "../enum";
import useModelDispatch from "./_use-model-dispatch";

export default function useDispatchLoading(): () => void {
  const dispatch = useModelDispatch();

  return useCallback(() => {
    return dispatch({
      type: EAction.LOCK,
      payload: ELockState.LOADING
    });
  }, [
    dispatch
  ]);
}
