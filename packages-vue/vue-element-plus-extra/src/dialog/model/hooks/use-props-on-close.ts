import {
  computed,
  ComputedRef
} from "vue";

import {
  IDialogProps
} from "../types";
import useModelProps from "./_use-model-props";

export default function usePropsOnClose(): ComputedRef<IDialogProps["onClose"]> {
  const props = useModelProps();

  return computed(() => {
    return props.value.onClose;
  });
}
