import {
  useMemo
} from "react";

import {
  ESize,
  EMode
} from "../enum";
import useModelProps from "./_use-model-props";
import usePropsMode from "./use-props-mode";

export default function usePropsSize(): number | ESize {
  const props = useModelProps();

  const mode = usePropsMode();

  return useMemo(() => {
    return props?.size || (mode === EMode.DRAWER ? ESize.M : ESize.L);
  }, [
    props,
    mode
  ]);
}
