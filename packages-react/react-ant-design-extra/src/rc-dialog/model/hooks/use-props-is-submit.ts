import {
  useMemo
} from "react";

import useModelProps from "./_use-model-props";

/**
 * @deprecated
 */
export default function usePropsIsSubmit(): boolean {
  const props = useModelProps();

  return useMemo(() => {
    return !props.isSubmit;
  }, [
    props
  ]);
}
