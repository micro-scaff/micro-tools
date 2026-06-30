import {
  useMemo
} from "react";

import useModelProps from "./_use-model-props";

export default function usePropsFooterExtra(): React.ReactElement[] {
  const props = useModelProps();

  return useMemo(() => {
    return props.footerExtra || [];
  }, [
    props
  ]);
}
