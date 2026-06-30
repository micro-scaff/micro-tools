import {
  useMemo
} from "react";

import useModelState from "./_use-model-state";

export default function useStateData<D extends object = Record<string, unknown>>(): D | undefined {
  const state = useModelState();

  return useMemo(() => {
    return state.data as D;
  }, [
    state
  ]);
}
