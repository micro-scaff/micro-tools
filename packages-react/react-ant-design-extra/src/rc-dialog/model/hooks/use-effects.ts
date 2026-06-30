import {
  useEffect
} from "react";

import {
  isFunction
}from "lodash-es";

import useDispatchData from "./use-dispatch-data";
import useDispatchDataLoading from "./use-dispatch-data-loading";
import useDispatchLock from "./use-dispatch-lock";
import usePropsData from "./use-props-data";

export default function useEffects(): void {
  const dispatchLock = useDispatchLock();

  const dispatchData = useDispatchData();

  const dispatchDataLoading = useDispatchDataLoading();

  const data = usePropsData();

  useEffect(() => {
    dispatchLock();

    if (isFunction(data)) {
      dispatchDataLoading(true);

      data().then(dispatchData).finally(() => {
        dispatchDataLoading(false);
      });
    } else {
      dispatchData(data);
    }
  }, [
    dispatchLock,
    dispatchData,
    data,
    dispatchDataLoading
  ]);
}
