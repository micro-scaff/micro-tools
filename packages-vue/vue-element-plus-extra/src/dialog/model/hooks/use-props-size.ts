import {
  computed,
  ComputedRef
} from "vue";

import {
  ESize
} from "../enum";
import useModelProps from "./_use-model-props";

export default function usePropsSize(): ComputedRef<number | ESize> {
  const props = useModelProps();

  return computed(() => {
    return props.value?.size || ESize.M;
  });
}
