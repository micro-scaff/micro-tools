import {
  useMemo
} from "react";

import {
  ELockState
} from "../enum";
import useModelState from "./_use-model-state";

export default function useStateLocked(): ELockState {
  const state = useModelState();

  return useMemo(() => {
    return state.locked;
  }, [
    state
  ]);
}
