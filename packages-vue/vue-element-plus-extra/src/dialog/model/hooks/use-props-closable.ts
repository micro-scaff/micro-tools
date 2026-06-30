import {
  computed,
  ComputedRef
} from "vue";

import useModelProps from "./_use-model-props";

export default function usePropsClosable(): ComputedRef<boolean> {
  const props = useModelProps();

  return computed(() => {
    return props.value.closable ?? true;
  });
}
