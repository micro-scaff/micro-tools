import React, {
  useCallback
} from "react";

import {
  useAsync
} from "../../src";
import {
  testFetch
} from "../fetch";

export default function DemoUseAsync(): React.ReactElement {
  const {
    run,
    runWithDebounce,
    loading,
    data
  } = useAsync(testFetch, null, {
    debounce: 500 // 启用防抖，延迟 500 毫秒
  });

  const handleClick = useCallback((): void => {
    run();
  }, [
    run
  ]);

  const handleDebouncedClick = useCallback((): void => {
    if (runWithDebounce) {
      runWithDebounce();
    }
  }, [
    runWithDebounce
  ]);

  return (
    <div>
      <p>useIsUnmounted 的使用</p>

      <button
        disabled={loading}
        onClick={handleClick}>
        {loading ? "Loading..." : "Fetch Data"}
      </button>

      <button
        disabled={loading}
        onClick={handleDebouncedClick}>
        {loading ? "Loading..." : "Fetch Data (Debounced)"}
      </button>

      {data && (
        <pre>
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
}
