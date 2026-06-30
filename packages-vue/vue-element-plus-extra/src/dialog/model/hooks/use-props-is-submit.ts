import {
  computed,
  ComputedRef
} from "vue";

import useModelProps from "./_use-model-props";

/**
 * @deprecated
 */
export default function usePropsIsSubmit(): ComputedRef<boolean> {
  const props = useModelProps();

  return computed(() => {
    return props.value.isSubmit ?? true;
  });
}
