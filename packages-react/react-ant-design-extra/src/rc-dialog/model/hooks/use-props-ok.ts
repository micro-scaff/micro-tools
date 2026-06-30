import {
  useMemo
} from "react";

import {
  IButtonProps
} from "../types";
import useModelProps from "./_use-model-props";

export default function usePropsOk(): IButtonProps | string | undefined {
  const props = useModelProps();

  return useMemo(() => {
    return props.ok;
  }, [
    props
  ]);
}
