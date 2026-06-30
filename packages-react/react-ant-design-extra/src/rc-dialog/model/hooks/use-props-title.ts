import {
  useMemo
} from "react";

import useModelProps from "./_use-model-props";

export default function usePropsTitle(): string | React.ReactElement | undefined {
  const props = useModelProps();

  return useMemo(() => {
    return props.title;
  }, [
    props
  ]);
}
