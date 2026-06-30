import React, {
  useState,
  useEffect
} from "react";

import {
  useIsUnmounted
} from "../../src";
import {
  IResponse,
  testFetch
} from "../fetch";

export default function DemoUseIsUnmounted(): React.ReactElement {
  const [
    data,
    setData
  ] = useState<IResponse | null>(null);

  const isUnmounted = useIsUnmounted();

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const result = await testFetch();

        // 在更新状态之前检查组件是否已卸载
        if (!isUnmounted()) {
          setData(result);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [
    isUnmounted
  ]);

  return (
    <div>
      <p>useIsUnmounted 的使用</p>

      <p>
      useIsUnmounted：
        {JSON.stringify(isUnmounted())}
      </p>

      {data ? (
        <pre>
          {JSON.stringify(data, null, 2)}
        </pre>
      )
        :
        <p>Loading...</p>
      }
    </div>
  );
}
