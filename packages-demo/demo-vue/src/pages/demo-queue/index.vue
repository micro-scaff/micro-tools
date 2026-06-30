<script setup lang="ts">
import {
  ElButton
} from "element-plus";

import {
  queue
} from "@mt-kit/utils";

const test01Fetch = (param?: string): Promise<string> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const result = `test01Fetch - 1s${param ? ` - ${param}` : ""}`;

      // eslint-disable-next-line no-console
      console.log(result, "test01Fetch");

      resolve(result);
    }, 1000);
  });
};

const test02Fetch = (): Promise<string> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const result = "test02Fetch - 2s";

      // eslint-disable-next-line no-console
      console.log(result, "test02Fetch");

      resolve(result);
    }, 2000);
  });
};

const test03Fetch = (): Promise<string> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const result = "test03Fetch - 3s";

      // eslint-disable-next-line no-console
      console.log(result, "test03Fetch");

      resolve(result);
    }, 3000);
  });
};

const handleSerialTest = (): void => {
  queue(test01Fetch);
  queue(test02Fetch);
  queue(test03Fetch);
};

const handleDurationTest = (): void => {

  // 如果 test01Fetch 需要参数，使用箭头函数包装
  queue(() => {
    return test01Fetch("参数值");
  }, {
    duration: 1000
  }).catch(error => {

    console.error(error, "error");
  });

  queue(test02Fetch, {
    duration: 1000
  }).catch(error => {
    console.error(error, "error");
  });

  queue(test03Fetch, {
    duration: 1000
  }).catch(error => {
    console.error(error, "error");
  });
};

</script>
<template>
  <div class="demo-queue">
    <ElButton @click="handleSerialTest">
      串行模式
    </ElButton>
    <ElButton @click="handleDurationTest">
      持续防抖模式
    </ElButton>
  </div>
</template>

<style scoped>
.demo-queue {
  padding: 20px;
}
</style>
