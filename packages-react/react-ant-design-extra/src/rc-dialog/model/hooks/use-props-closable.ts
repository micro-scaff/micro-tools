import {
  useMemo
} from "react";

import useModelProps from "./_use-model-props";

export default function usePropsClosable(): boolean {
  const props = useModelProps();

  return useMemo(() => {
    return props.closable ?? true;
  }, [
    props
  ]);
}
