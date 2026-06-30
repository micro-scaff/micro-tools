import {
  ComputedRef,
  computed
} from "vue";

import {
  IModelState
} from "../types";
import useModelContext from "./_use-model-context";

export default function useModelState(): ComputedRef<IModelState> {
  const context = useModelContext();

  return computed(() => {
    return context.value.state;
  });
}
