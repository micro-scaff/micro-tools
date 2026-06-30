import {
  EAction
} from "../enum";
import useModelDispatch from "./_use-model-dispatch";

export default function useDispatchFormData(): (payload?: Record<string, unknown> | unknown) => void {
  const dispatch = useModelDispatch();

  return (payload?: Record<string, unknown> | unknown) => {
    return dispatch({
      type: EAction.FORM_DATA,
      payload: payload ?? undefined
    });
  };
}
