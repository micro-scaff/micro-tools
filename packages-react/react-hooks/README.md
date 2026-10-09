# @mt-kit/react-hooks

[![npm version](https://img.shields.io/npm/v/@mt-kit/react-hooks.svg?style=for-the-badge&labelColor=2c3e50&color=3498db&logo=npm&logoColor=white)](https://www.npmjs.com/package/@mt-kit/react-hooks)
[![GitHub stars](https://img.shields.io/github/stars/micro-scaff/micro-tools?style=for-the-badge&labelColor=2c3e50&color=e74c3c&logo=github&logoColor=white)](https://github.com/micro-scaff/micro-tools/tree/main/packages-react/react-hooks)
[![GitHub issues](https://img.shields.io/github/issues/micro-scaff/micro-tools?style=for-the-badge&labelColor=2c3e50&color=27ae60&logo=github&logoColor=white)](https://github.com/micro-scaff/micro-tools/issues)
[![License](https://img.shields.io/github/license/micro-scaff/micro-tools?style=for-the-badge&labelColor=2c3e50&color=9b59b6&logo=opensourceinitiative&logoColor=white)](https://github.com/micro-scaff/micro-tools/blob/main/LICENSE)
[![Documentation](https://img.shields.io/badge/docs-online-blue?style=for-the-badge&labelColor=2c3e50&color=3498db&logoColor=white)](https://micro-scaff.github.io/)

React Hooks 集合，提供常用的业务逻辑封装。

## 安装

```bash
npm i @mt-kit/react-hooks
```

## API

### useIsUnmounted

- 查组件是否已经卸载

- 在某些情况下，当组件卸载后，我们可能会进行一些异步操作，而这些异步操作在组件卸载后执行可能会引发错误，比如更新已卸载组件的状态。使用这个 Hook 可以在异步操作中检查组件是否已卸载，从而避免这些错误

```tsx
import React, {
  useState,
  useEffect
} from "react";

import {
  useIsUnmounted
} from "@mt-kit/react-hooks";
import {
  IResponse,
  testFetch
} from "../fetch";

export default function DemoUseIsUnmounted(): React.ReactElement {
  const [data, setData] = useState<IResponse | null>(null);

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
  }, [isUnmounted]);

  return <div>
    <p>useIsUnmounted 的使用</p>

    <p>
      useIsUnmounted：
      {JSON.stringify(isUnmounted())}
    </p>

    {data ?
      <pre>
        {JSON.stringify(data, null, 2)}
      </pre>
      :
      <p>Loading...</p>
    }
  </div>;
}
```

### <del> useAsync </del>

- 数据请求

- 简化异步操作的管理，尤其是在处理网络请求等异步任务时，能帮助你更好地处理加载状态、数据获取和错误处理，同时还支持防抖功能

```tsx
import React, {
  useCallback
} from "react";

import {
  useAsync
} from "@mt-kit/react-hooks";
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
  }, [run]);

  const handleDebouncedClick = useCallback((): void => {
    if (runWithDebounce) {
      runWithDebounce();
    }
  }, [runWithDebounce]);

  return <div>
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

    {data && <pre>
      {JSON.stringify(data, null, 2)}
    </pre>}
  </div>;
}
```

### useHistory

- 主要作用是对 react-router-dom 中的 useLocation 和 useNavigate 进行封装，以提供更便捷的路由导航功能

```tsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import {
  useHistory
} from "@mt-kit/react-hooks";

// 定义页面组件
function HomePage(): React.ReactElement {
  const {
    push, replace
  } = useHistory();

  const handlePush = () => {

    // 使用 push 方法导航到新页面
    push("/about", {
      search: "?param=value",
      hash: "#section"
    });
  };

  const handleReplace = () => {

    // 使用 replace 方法替换当前页面
    replace({
      search: "?newParam=newValue",
      hash: "#newSection"
    });
  };

  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={handlePush}>Push to About Page</button>
      <button onClick={handleReplace}>Replace Current Page</button>
    </div>
  );
}

function AboutPage(): React.ReactElement {
  const {
    location
  } = useHistory();

  return <div>
    <h1>About Page</h1>

    <p>
      Current URL:
      {location.pathname + location.search + location.hash}
    </p>
  </div>;
}

export default function App(): React.ReactElement {
  return <Router>
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>

        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </nav>

    <Routes>
      <Route element={<HomePage />}
        path="/" />

      <Route element={<AboutPage />}
        path="/about" />
    </Routes>
  </Router>;
}
```

### useLocationQuery

- URL 中 search 参数的管理

```tsx
import React, {
  useCallback
} from "react";

import {
  QueryHookResult,
  QueryTypes,
  useLocationQuery
} from "@mt-kit/react-hooks";

// 定义查询参数的类型
interface IQueryParams {
  page: number;
  showDetails: boolean;
}

const types: QueryTypes<IQueryParams> = {
  page: "number",
  showDetails: "boolean"
};

// 或者
/*
const type = {
  page: "number" as const,          // ✅ 正确
  showDetails: "boolean" as const   // ✅ 正确
};
*/

const options = {
  keys: ["page", "showDetails"] as (keyof IQueryParams)[],
  defaults: {
    page: 1,
    showDetails: false
  },
  types,
  replaceMode: false
};

export default function TestUseLocationQuery(): React.ReactElement {

  const arr: QueryHookResult<IQueryParams> = useLocationQuery<IQueryParams>(options);

  const [query, updateQuery] = arr;

  const handlePageChange = useCallback((newPage: number) => {
    updateQuery({
      page: newPage
    });
  }, [updateQuery]);

  const handleShowDetailsChange = useCallback((show: boolean) => {
    updateQuery({
      showDetails: show
    });
  }, [updateQuery]);

  const handleResetClick = useCallback(() => {
    updateQuery(options.defaults);
  }, [updateQuery]);

  return <div>
    <p>useHistory 的使用</p>

    <p>
      Current Page:
      {query.page}
    </p>

    <p>
      Show Details:
      {query.showDetails ? "Yes" : "No"}
    </p>

    <button onClick={() => handlePageChange(2)}>Go to Page 2</button>
    <button onClick={() => handleShowDetailsChange(true)}>Show Details</button>
    <button onClick={() => handleResetClick()}>Show Details Reset</button>
  </div>;
}
```
