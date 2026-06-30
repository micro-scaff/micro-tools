<script setup lang="ts">
import {
  ref
} from "vue";
import {
  ElSelect,
  ElOption
} from "element-plus";

import {
  createDedupedRequest
} from "@mt-kit/utils";

import {
  dataList,
  dataObj
} from "@/api";

const value = ref("");

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const list = ref<any[]>([]);

// 在组件内部使用，基于函数引用自动共享缓存
const dedupedDataList = createDedupedRequest(dataList);

dedupedDataList("123").then(res => {
  list.value = res.items;
}).catch(error => {
  console.error(error, "error");
});

const dedupedDataObj = createDedupedRequest(dataObj);

dedupedDataObj("123").then(res => {
  // eslint-disable-next-line no-console
  console.log(res, "res");
}).catch(error => {
  console.error(error, "error");
});

</script>
<template>
  <ElSelect v-model="value">
    <ElOption
      v-for="item in list"
      :key="item?.id"
      :label="item?.category"
      :value="item?.id"
    >
      {{ item?.category }}
    </ElOption>
  </ElSelect>
</template>
