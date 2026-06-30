import {
  ComputedRef,
  computed
} from "vue";

import {
  IButtonProps
} from "../types";
import useModelProps from "./_use-model-props";

export default function usePropsOk(): ComputedRef<IButtonProps | string> {
  const props = useModelProps();

  return computed(() => {
    return props.value.ok || "提交";
  });
}
