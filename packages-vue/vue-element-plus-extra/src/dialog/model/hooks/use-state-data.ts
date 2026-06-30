import {
  computed,
  ComputedRef
} from "vue";

import useModelState from "./_use-model-state";

export default function useStateData<D extends object = Record<string, unknown>>(): ComputedRef<D | undefined> {
  const state = useModelState();

  return computed(() => {
    return state.value.data as D;
  });
}
