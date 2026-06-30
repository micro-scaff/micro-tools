import {
  computed,
  ComputedRef
} from "vue";

import {
  TFormInstance
} from "../types";
import useModelState from "./_use-model-state";

export default function useStateForm(): ComputedRef<TFormInstance> {
  const state = useModelState();

  return computed(() => {
    return state.value.form;
  });
}
