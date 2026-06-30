import {
  ComputedRef,
  computed
} from "vue";

import {
  ELockState
} from "../enum";
import useModelState from "./_use-model-state";

export default function useStateLocked(): ComputedRef<ELockState> {
  const state = useModelState();

  return computed(() => {
    return state.value.locked;
  });
}
