import {
  useMemo
} from "react";

import useModelState from "./_use-model-state";

export default function useStateFormData(): Record<string, unknown> | unknown | undefined {
  const state = useModelState();

  return useMemo(() => {
    return state.formData;
  }, [
    state
  ]);
}
