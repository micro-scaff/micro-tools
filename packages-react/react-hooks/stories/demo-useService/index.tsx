import React from "react";

import {
  useService
} from "../../src";
import {
  testFetch
} from "../fetch";

export default function Index(): React.ReactElement {
  const {
    data,
    loading
  } = useService(testFetch);

  // eslint-disable-next-line no-console
  console.log(data, loading);

  return (
    <div>
      <p>useService</p>
    </div>
  );
}
