import React, {
  useCallback
} from "react";
import {
  Button
} from "antd";

export default function Demo(): React.ReactElement {
  const handleClick = useCallback(() => {
    // eslint-disable-next-line no-console
    console.log("Click me");
  }, []);

  const handleTestClick = () => {
    // eslint-disable-next-line no-console
    console.log("React Ant Design Extra");
  };

  return (
    <div>
      <p onClick={handleTestClick}>React Ant Design Extra</p>
      <Button onClick={handleClick}>Click me</Button>

    </div>
  );
}
