import {
  useMemo
} from "react";

import useModelProps from "./_use-model-props";

export default function usePropsEsc(): boolean {
  const props = useModelProps();

  return useMemo(() => {
    return props.esc ?? true;
  }, [
    props
  ]);
}
