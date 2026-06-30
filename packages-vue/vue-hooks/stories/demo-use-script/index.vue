<!-- eslint-disable no-console -->
<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<script lang="ts">
import {
  defineComponent,
  nextTick,
  ref
} from "vue";

import {
  useScript
} from "../../src";

export default defineComponent({
  name: "ScriptLoaderExample",
  setup() {

    // 初始化 useScript，传入要加载的脚本 URL（或相对路径）
    const {
      isLoading, error, success, promise
    } = useScript({
      src: "https://xxx.com/test.js"
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
      } catch (caughtError) {
        console.error("加载脚本失败：", caughtError);
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
