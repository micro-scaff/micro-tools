import {
  computed,
  ComputedRef
} from "vue";

import useModelProps from "./_use-model-props";

export default function usePropsClassNameOnBody(): ComputedRef<string | undefined> {
  const props = useModelProps();

  return computed(() => {
    return props.value.classNameOnBody;
  });
}
