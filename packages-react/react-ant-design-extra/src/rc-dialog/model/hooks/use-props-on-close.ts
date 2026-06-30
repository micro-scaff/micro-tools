import {
  useMemo
} from "react";

import useModelProps from "./_use-model-props";

export default function usePropsOnClose<D extends object = Record<string, unknown>>(): ((result?: D | Error | unknown, defaultResult?: D) => void) | undefined {
  const props = useModelProps();

  return useMemo(() => {
    return props?.onClose;
  }, [
    props
  ]);
}
