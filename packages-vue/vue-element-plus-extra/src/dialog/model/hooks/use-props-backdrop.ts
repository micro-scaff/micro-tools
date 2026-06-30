import {
  computed,
  ComputedRef
} from "vue";

import useModelProps from "./_use-model-props";

export default function usePropsBackdrop(): ComputedRef<boolean> {
  const props = useModelProps();

  return computed(() => {
    return props.value.backdrop ?? true;
  });
}
