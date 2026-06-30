import {
  useMemo
} from "react";

import {
  TDialogPropsOptions
} from "../types";
import useModelProps from "./_use-model-props";

export default function usePropsOptions(): TDialogPropsOptions {
  const props = useModelProps();

  return useMemo(() => {
    return props.options || {};
  }, [
    props
  ]);
}
