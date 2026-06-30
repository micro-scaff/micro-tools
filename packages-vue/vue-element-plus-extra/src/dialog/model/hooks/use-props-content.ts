import {
  ComputedRef,
  computed,
  VNode
} from "vue";

import useModelProps from "./_use-model-props";

export default function usePropsContent(): ComputedRef<string | VNode> {
  const props = useModelProps();

  return computed(() => {
    return props.value.content as string | VNode;
  });
}
