import {
  computed,
  ComputedRef
} from "vue";

import {
  TDialogPropsOptions
} from "../types";
import useModelProps from "./_use-model-props";

export default function usePropsOptions(): ComputedRef<TDialogPropsOptions> {
  const props = useModelProps();

  return computed(() => {
    return props.value.options || {};
  });
}
