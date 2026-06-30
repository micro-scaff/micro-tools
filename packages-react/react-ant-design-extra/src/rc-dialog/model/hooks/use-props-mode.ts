import {
  useMemo
} from "react";

import {
  EMode
} from "../enum";
import useModelProps from "./_use-model-props";

export default function usePropsMode(): EMode {
  const props = useModelProps();

  return useMemo(() => {
    return props.mode || EMode.DRAWER;
  }, [
    props
  ]);
}
