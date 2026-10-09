# @mt-kit/vue-hooks

Vue 3 组合式 API Hooks 集合，提供常用的业务逻辑封装。

[![npm version](https://img.shields.io/npm/v/@mt-kit/vue-hooks.svg?style=for-the-badge&labelColor=2c3e50&color=3498db&logo=npm&logoColor=white)](https://www.npmjs.com/package/@mt-kit/vue-hooks)
[![GitHub stars](https://img.shields.io/github/stars/micro-scaff/micro-tools?style=for-the-badge&labelColor=2c3e50&color=e74c3c&logo=github&logoColor=white)](https://github.com/micro-scaff/micro-tools/tree/main/packages-vue/vue-hooks)
[![GitHub issues](https://img.shields.io/github/issues/micro-scaff/micro-tools?style=for-the-badge&labelColor=2c3e50&color=27ae60&logo=github&logoColor=white)](https://github.com/micro-scaff/micro-tools/issues)
[![License](https://img.shields.io/github/license/micro-scaff/micro-tools?style=for-the-badge&labelColor=2c3e50&color=9b59b6&logo=opensourceinitiative&logoColor=white)](https://github.com/micro-scaff/micro-tools/blob/main/LICENSE)
[![Documentation](https://img.shields.io/badge/docs-online-blue?style=for-the-badge&labelColor=2c3e50&color=3498db&logoColor=white)](https://micro-scaff.github.io/)

## 安装

```bash
npm i @mt-kit/vue-hooks
```

## API

### useLocationQuery

修改 URL 查询参数，支持类型安全和默认值。

**使用场景：**

- URL 参数管理
- 页面状态同步到 URL
- 路由参数处理
- 筛选条件持久化

**参数：**

| 参数名 | 说明 | 是否必传 | 类型 | 默认值 |
|--------|------|----------|------|--------|
| options | 配置选项 | 是 | `IOptions<T>` | - |
| options.keys | 需要监听的查询参数键名数组 | 是 | `Array<keyof T>` | - |
| options.defaults | 参数的默认值 | 否 | `Partial<T>` | `{}` |
| options.types | 参数类型转换配置 | 否 | `TQueryTypes<T>` | - |

**返回值：** `[Ref<Partial<T>>, (query: Partial<T>) => void]` - 返回查询参数对象和更新函数

```vue
<script setup lang="ts">
import {
  useLocationQuery
} from "@mt-kit/vue-hooks";
import {
  watchEffect
} from "vue";

const [query, updateQuery] = useLocationQuery({
  keys: ["id", "name"],
  defaults: {
    id: 11,
    name: "哈哈哈"
  }
});

function handleChangeId(event: any) {
  updateQuery({
    id: event.target.value
  });
}

watchEffect(() => {
  console.log(query.value);
});
</script>

<template>
  id <input
    :defaultValue="query.id"
    @input="handleChangeId"
  />
</template>
```

### useService

数据请求 Hook，提供加载状态、错误处理和防抖功能。

**使用场景：**

- API 数据请求
- 表单提交
- 列表数据加载
- 搜索功能

**参数：**

| 参数名 | 说明 | 是否必传 | 类型 | 默认值 |
|--------|------|----------|------|--------|
| fetch | 请求函数 | 是 | `ServiceFunction<T, Q>` | - |
| query | 请求参数 | 否 | `Q` | - |
| initData | 初始数据 | 否 | `T` | - |
| config | 配置选项 | 否 | `ServiceConfig` | - |
| config.immediate | 是否立即执行 | 否 | `boolean` | `false` |
| config.debounce | 防抖配置（毫秒数或布尔值） | 否 | `boolean \| number` | `false` |
| config.watchQuery | 是否监听 query 参数变化 | 否 | `boolean` | `false` |
| config.error | 错误处理函数 | 否 | `Function` | - |
| config.dedupedRequestCacheWindow | 请求去重时间窗口（毫秒） | 否 | `number \| boolean` | `500` |

**返回值：** `IAsyncResult<T, Q>` - 包含以下属性：

| 属性 | 说明 | 类型 |
|------|------|------|
| data | 响应数据 | `Ref<T \| undefined>` |
| loading | 加载状态 | `Ref<boolean>` |
| error | 错误信息 | `Ref<string \| undefined>` |
| run | 执行请求函数 | `(arg?: Q) => Promise<T>` |

```vue
<script lang='ts' setup>
import {
  useService
} from "@mt-kit/vue-hooks";
import {
  reactive
} from "vue";

function fun(params): Promise<object> {
  // 构建 URL，将查询参数附加到 URL 上
  const url = new URL("https://mock.mengxuegu.com/mock/61922927f126df7bfd5b79ef/promise/promise3");

  url.search = new URLSearchParams({
    ...params,
    method: "get"
  }).toString();

  return new Promise((resolve, reject) => {
    fetch(url).then(req => req.json()).
        then(res => {
          resolve(res);
        }).
        catch(error => {
          reject(error);
        });
  });
}

const obj = reactive({
  value: "test"
});

const {
  run,
  data,
  loading
} = useService(fun, obj);

function handleEdit(): void {
  run({
    value: "test"
  });
}
</script>

<template>
  <div>数据请求</div>
  <button @click="handleEdit">
    修改数据
  </button>
  {{ loading }}
  {{ data }}
</template>
```

**在 uniapp 中使用：**

在 `uniapp` 中使用时，需要给类型一层约束，否则会报奇怪的 TypeScript 错误。

```ts
// use-service.ts
import type { Ref } from 'vue';
import { toRef } from 'vue';
import type { ServiceFunction, ServiceConfig } from '@mt-kit/vue-hooks';
import { useService as _useService } from '@mt-kit/vue-hooks';

interface IAsyncResult<T, Q> {
  data?: Ref<T | null | undefined>;
  loading: Ref<boolean>;
  error: Ref<string | undefined>;
  run: (arg?: Q) => Promise<T>;
}

export default function useService<T, Q>(
  fetch: ServiceFunction<T, Q>,
  query?: Q,
  initData?: T,
  config?: ServiceConfig
): IAsyncResult<T, Q> {
  const _data = _useService<T, Q>(fetch, query, initData, config);
  return {
    data: toRef(_data, 'data') as Ref<T | undefined>,
    loading: toRef(_data, 'loading') as unknown as Ref<boolean>,
    error: toRef(_data, 'error') as unknown as Ref<string | undefined>,
    run: toRef(_data, 'run') as unknown as (arg?: Q) => Promise<T>
  };
}
```

### useWatermark

页面水印功能，支持自定义样式和自动防篡改。

**使用场景：**

- 页面版权保护
- 数据安全标识
- 文档水印
- 截图防护

**参数：**

| 参数名 | 说明 | 是否必传 | 类型 | 默认值 |
|--------|------|----------|------|--------|
| target | 目标元素 | 否 | `Ref<HTMLElement \| undefined> \| HTMLElement` | `document.body` |
| options | 水印配置选项 | 否 | `IWaterMarkOptionsType` | - |
| options.fontSize | 文字大小 | 否 | `number` | `16` |
| options.fontColor | 文字颜色 | 否 | `string` | `"rgba(0, 0, 0, 0.15)"` |
| options.fontFamily | 文字字体 | 否 | `string` | `"Microsoft YaHei"` |
| options.textAlign | 文字对齐方式 | 否 | `CanvasTextAlign` | `"left"` |
| options.textBaseline | 文字基线 | 否 | `CanvasTextBaseline` | `"middle"` |
| options.rotate | 文字倾斜角度 | 否 | `number` | `-22` |

**返回值：** `IUseWatermarkRes` - 包含以下方法：

| 方法 | 说明 | 类型 |
|------|------|------|
| setWatermark | 设置水印文字 | `(str: string) => void` |
| clear | 清除当前水印 | `() => void` |
| clearAll | 清除所有水印 | `() => void` |

```vue
<template>
  <div>
    <Button type="primary"
            label="创建 Watermark1"
            @click="setWatermark('WaterMark 1')">
    </Button>
    <Button type="primary"
            label="Create custom style Watermark"
            @click="setWatermark2('创建 样式 WaterMark')">
    </Button>

    <Button label="Clear Watermark1"
            @click="clear"></Button>
    
    <Button label="ClearAll"
            @click="clearAll"></Button>

    <Button label="Update Watermark1"
            @click="setWatermark('WaterMark Info New')">
    </Button>
  </div>
</template>

<script lang="ts" setup>
import { onUnmounted, ref } from 'vue';

import { 
    useWatermark,
    Button
} from '@mt-kit/vue-hooks';

const app = ref(document.body);

const { setWatermark, clear, clearAll } = useWatermark();
const { setWatermark: setWatermark2 } = useWatermark(app, {
    fontColor: 'red',
    fontSize: 12,
    rotate: 30
});

onUnmounted(() => {
    clearAll();
});
</script>
```

### useState

集合 `ref` 和 `reactive` 的状态管理 Hook，提供类似 React `useState` 的 API。

**使用场景：**

- 组件状态管理
- 表单数据管理
- 临时状态存储
- 替代简单的 `reactive`

**参数：**

| 参数名 | 说明 | 是否必传 | 类型 | 默认值 |
|--------|------|----------|------|--------|
| initialState | 初始状态值 | 否 | `T \| (() => T)` | - |

**返回值：** `[Ref<T>, (state?: Partial<T>) => void]` - 返回状态对象和更新函数

```vue
<script lang="ts" setup>
import {
  useState
} from "@mt-kit/vue-hooks";
import {
  watch
} from "vue";

const [state, setState] = useState({
  age: 1
});

const handleClick = (): void => {
  setState({
    age: 2
  });
};

const handleReductionClick = (): void => {
  setState();
};

watch(() => state.age, (newValue, oldValue) => {
  console.log(newValue, oldValue);
});
</script>

<template>
  <div>
    {{ state.age }}
    <br />
    <br />
    <button @click="handleClick">
      修改
    </button>
    <br />
    <button @click="handleReductionClick">
      还原
    </button>
  </div>
</template>
```

### useMount

创建虚拟元素，常用于动态挂载组件或元素。

**使用场景：**

- 动态弹出框
- 临时组件挂载
- 工具提示
- 模态框管理

**参数：** 无

**返回值：** `(component: any, props?: any, slots?: any) => void` - 挂载函数

```vue
<script lang="tsx" setup>
import {
  ElButton,
  ElMessage
} from "element-plus";

import {
  useMount
} from "@mt-kit/vue-hooks";
import Modal from "./op/index.vue";

const dialogMount = useMount();

const handleConfirm = (): void => {
  ElMessage({
    message: "This is a message.",
    type: "info",
    plain: true
  });
};

const handleClick = (): void => {
  dialogMount(Modal, {
    visible: true,
    onClick: handleConfirm
  }, {
    default: <div>测试</div>
  });
};

const handleElClick = (): void => {
  dialogMount("span", undefined, "元素");
};
</script>

<template>
  DemoUseMount
  <br />
  <ElButton @click="handleClick">
    弹出框
  </ElButton>

  <ElButton @click="handleElClick">
    添加元素
  </ElButton>
  <div id="box"></div>
</template>
```

**示例组件 `op/index.vue`：**

```vue
<script setup lang="ts">
import {
  watch,
  defineProps,
  ref,
  onMounted,
  defineEmits
} from "vue";
import {
  ElDialog,
  ElButton
} from "element-plus";

const props = defineProps<{
  visible?: boolean;
}>();

const dialogVisible = ref<boolean>(props.visible);

watch(() => props.visible, newV => {
  dialogVisible.value = newV;
});

const handleClose = (): void => {
  dialogVisible.value = false;
};

const num = ref(1);

onMounted(() => {
  num.value = 2;
});

const emits = defineEmits(["click"]);

const handleClick = (): void => {
  emits("click");
  dialogVisible.value = false;
};
</script>

<template>
  <ElDialog
    v-model="dialogVisible"
    destroy-on-close
    title="批量修改需求"
    :before-close="handleClose"
  >
    <slot>
      <span @click="() => num++">
        This is a message {{ num }}
      </span>
    </slot>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleClose">
          Cancel
        </el-button>
        <el-button
          type="primary"
          @click="handleClick"
        >
          Confirm
        </el-button>
      </div>
    </template>
  </ElDialog>
</template>

<style scoped></style>
```

### useEventListener

监听 DOM 元素或 window 的事件，支持防抖和自动清理。

**使用场景：**

- 窗口大小监听
- 滚动事件处理
- 键盘事件监听
- 鼠标事件处理

**参数：**

| 参数名 | 说明 | 是否必传 | 类型 | 默认值 |
|--------|------|----------|------|--------|
| options | 事件监听配置 | 是 | `IEventListenerOptions` | - |
| options.el | DOM 元素或 window | 是 | `HTMLElement \| Window` | - |
| options.name | 事件名称 | 是 | `string` | - |
| options.func | 事件处理函数 | 是 | `Function` | - |
| options.options | 事件监听配置项（如 passive、capture 等） | 否 | `boolean \| AddEventListenerOptions` | `false` |
| options.autoRemove | 是否自动移除事件监听 | 否 | `boolean` | `true` |
| options.isDebounce | 是否使用防抖函数 | 否 | `boolean` | `true` |
| options.wait | 防抖/节流的等待时间（毫秒） | 否 | `number` | `80` |

**返回值：** `{ removeEvent: () => void }` - 包含手动移除事件监听的方法

```vue
<!-- eslint-disable no-console -->
<script lang="ts">
import {
  defineComponent,
  ref,
  onMounted,
  onBeforeUnmount
} from "vue";

import {
  useEventListener
} from "@mt-kit/vue-hooks";

export default defineComponent({
  name: "WindowResizeExample",
  setup() {
    const windowWidth = ref(window.innerWidth);

    // 事件处理函数：更新 windowWidth
    const handleResize = (): void => {
      windowWidth.value = window.innerWidth;
      console.log("窗口宽度更新为：", window.innerWidth);
    };

    // 使用 useEventListener 监听 window 的 resize 事件
    const {
      removeEvent
    } = useEventListener({
      el: window,
      name: "resize",
      func: handleResize,
      options: false,
      autoRemove: true,
      isDebounce: true,  // 使用防抖
      wait: 200          // 等待时间 200 毫秒
    });

    // 如有需要，可以在组件卸载前手动移除事件监听
    onBeforeUnmount(() => {
      removeEvent();
    });

    // 组件中提供手动移除事件的按钮回调
    const removeListener = (): void => {
      removeEvent();
      console.log("已手动移除 resize 事件监听");
    };

    // 可选择在组件挂载时初始化数据或其他处理
    onMounted(() => {
      console.log("组件已挂载，开始监听窗口 resize 事件");
    });

    return {
      windowWidth,
      removeListener
    };
  }
});
</script>

<template>
  <div>
    <h2>窗口宽度：{{ windowWidth }}px</h2>
    <button @click="removeListener">
      移除事件监听
    </button>
  </div>
</template>
```

### useScript

动态加载外部 JavaScript 脚本。

**使用场景：**

- 第三方库动态加载
- 条件加载脚本
- 按需加载资源
- CDN 脚本管理

**参数：**

| 参数名 | 说明 | 是否必传 | 类型 | 默认值 |
|--------|------|----------|------|--------|
| options | 脚本配置选项 | 是 | `IUseScriptOptions` | - |
| options.src | 脚本 URL 地址 | 是 | `string` | - |

**返回值：** `IUseScriptResult` - 包含以下属性：

| 属性 | 说明 | 类型 |
|------|------|------|
| isLoading | 是否正在加载 | `Ref<boolean>` |
| error | 加载错误信息 | `Ref<string \| null>` |
| success | 是否加载成功 | `Ref<boolean>` |
| promise | 加载 Promise | `() => Promise<void>` |

```vue
<script lang="ts">
import {
  defineComponent,
  nextTick,
  ref
} from "vue";

import {
  useScript
} from "@mt-kit/vue-hooks";

export default defineComponent({
  name: "ScriptLoaderExample",
  setup() {
    // 初始化 useScript，传入要加载的脚本 URL（或相对路径）
    const {
      isLoading,
      error,
      success,
      promise
    } = useScript({
      src: "http://xxx.com/test.js"
    });

    // 用于存储外部脚本定义的变量
    const testData = ref<any>(null);

    // 调用 promise 进行加载
    async function loadScript(): Promise<void> {
      try {
        // 标记加载开始
        isLoading.value = true;
        await promise();

        // 等待 DOM 更新（如果需要）
        await nextTick();

        // 假设 test.js 文件中定义了全局变量 test
        testData.value = (window as any).test;
        console.log("test.a 的值为：", testData.value.a);
      } catch (error_) {
        console.error("加载脚本失败：", error_);
      }
    }

    return {
      isLoading,
      error,
      success,
      loadScript,
      testData
    };
  }
});
</script>

<template>
  <div>
    <h2>加载外部脚本的示例</h2>
    <p v-if="isLoading">
      脚本加载中……
    </p>
    <p v-if="error">
      脚本加载失败！
    </p>
    <p v-if="success && testData">
      加载成功，test.a 的值为：{{ testData.a }}
    </p>
    <button @click="loadScript">
      加载脚本
    </button>
  </div>
</template>
```

### useContextMenu

用于创建上下文菜单（右键菜单）的 Vue 组合式 API。

**使用场景：**

- 自定义右键菜单
- 上下文操作菜单
- 快捷操作面板
- 文件管理器菜单

**参数：** 无

**返回值：** `[createContextMenu, destroyContextMenu]` - 创建和销毁上下文菜单的函数

| 函数 | 说明 | 类型 |
|------|------|------|
| createContextMenu | 创建上下文菜单 | `(options: IContextMenuOptions) => void` |
| destroyContextMenu | 销毁上下文菜单 | `() => void` |

**createContextMenu 参数：**

| 参数名 | 说明 | 是否必传 | 类型 |
|--------|------|----------|------|
| options | 菜单配置选项 | 是 | `IContextMenuOptions` |
| options.event | 鼠标事件对象 | 是 | `MouseEvent` |
| options.menu | 菜单组件或 VNode | 是 | `Component \| VNode` |

```vue
<script lang="tsx" setup>
import {
  onUnmounted,
  VNode
} from "vue";

import {
  useContextMenu
} from "@mt-kit/vue-hooks";

// 获取创建和销毁上下文菜单的方法
const [createContextMenu, destroyContextMenu] = useContextMenu();

// 定义菜单组件
const MenuComponent = (): VNode => (
  <div style="padding: 8px 16px;">
    <div style="cursor: pointer; padding: 4px 0;">复制</div>
    <div style="cursor: pointer; padding: 4px 0;">粘贴</div>
    <div style="cursor: pointer; padding: 4px 0;">剪切</div>
  </div>
);

// 处理右键点击事件
const handleRightClick = (e: MouseEvent): void => {
  // 阻止默认的右键菜单
  e.preventDefault();

  // 创建自定义上下文菜单
  createContextMenu({
    event: e,
    menu: MenuComponent
  });
};

onUnmounted(() => {
  // 默认是清理的，不需要自己在清理了
  destroyContextMenu();
});
</script>

<template>
  <div
    style="width: 300px; height: 200px; border: 1px solid #ccc; display: flex; justify-content: center; align-items: center;"
    @contextmenu="handleRightClick"
  >
    右键点击此区域
  </div>
</template>
```
