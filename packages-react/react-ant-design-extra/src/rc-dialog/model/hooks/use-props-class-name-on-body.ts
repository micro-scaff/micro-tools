import {
  useMemo
} from "react";

import useModelProps from "./_use-model-props";

export default function usePropsClassNameOnBody(): string | undefined {
  const props = useModelProps();

  return useMemo(() => {
    return props.classNameOnBody;
  }, [
    props
  ]);
}
