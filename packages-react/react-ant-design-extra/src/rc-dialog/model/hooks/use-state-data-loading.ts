import {
  useMemo
} from "react";

import useModelState from "./_use-model-state";

export default function useStateDataLoading(): boolean {
  const state = useModelState();

  return useMemo(() => {
    return state.dataLoading;
  }, [
    state
  ]);
}
