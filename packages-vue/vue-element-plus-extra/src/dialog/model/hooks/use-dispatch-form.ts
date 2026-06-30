import {
  EAction
} from "../enum";
import {
  TFormInstance
} from "../types";
import useModelDispatch from "./_use-model-dispatch";

export default function useDispatchForm(): (payload?: TFormInstance) => void {
  const dispatch = useModelDispatch();

  return ((payload?: TFormInstance) => {
    return dispatch({
      type: EAction.FORM,
      payload: payload ?? null
    });
  });
}
