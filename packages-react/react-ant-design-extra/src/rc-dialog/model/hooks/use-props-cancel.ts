import {
  useMemo
} from "react";

import {
  IButtonProps
} from "../types";
import useModelProps from "./_use-model-props";

export default function usePropsCancel(): IButtonProps | string | undefined {
  const props = useModelProps();

  return useMemo(() => {
    return props.cancel;
  }, [
    props
  ]);
}
