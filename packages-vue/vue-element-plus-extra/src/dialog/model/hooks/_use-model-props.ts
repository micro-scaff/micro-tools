import {
  computed,
  ComputedRef
} from "vue";

import {
  IDialogProps
} from "../types";
import useModelContext from "./_use-model-context";

export default function useModelProps(): ComputedRef<IDialogProps> {
  const context = useModelContext();

  return computed(() => {
    return context?.value.props;
  });
}
