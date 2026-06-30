import {
  computed,
  ComputedRef
} from "vue";

import useModelProps from "./_use-model-props";

export default function usePropsZindex(): ComputedRef<number | undefined> {
  const props = useModelProps();

  return computed(() => {
    return props.value.zIndex;
  });
}
