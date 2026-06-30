import {
  computed,
  ComputedRef
} from "vue";

import useModelState from "./_use-model-state";

export default function useStateDataLoading(): ComputedRef<boolean> {
  const state = useModelState();

  return computed(() => {
    return state.value.dataLoading;
  });
}
