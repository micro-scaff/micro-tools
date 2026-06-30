import {
  computed,
  ComputedRef
} from "vue";

import {
  IButtonProps
} from "../types";
import useModelProps from "./_use-model-props";

export default function usePropsCancel(): ComputedRef<IButtonProps | string> {
  const props = useModelProps();

  return computed(() => {
    return props.value.cancel || "关闭";
  });
}
