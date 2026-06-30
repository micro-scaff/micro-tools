import {
  computed,
  ComputedRef,
  VNode
} from "vue";

import useModelProps from "./_use-model-props";

export default function usePropsFooterExtra(): ComputedRef<VNode | string | undefined> {
  const props = useModelProps();

  return computed(() => {
    return props.value.footerExtra;
  });
}
