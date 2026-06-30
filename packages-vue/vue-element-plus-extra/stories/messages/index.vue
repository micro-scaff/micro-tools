<script lang="ts" setup>
import {
  ref
} from "vue";
import {
  ElButton,
  ElMessage
} from "element-plus";

import {
  messages
} from "../../src";

const handleClick = (): void => {
  ElMessage.success("Success");
};

const num = ref(0);

const handleReplaceClick = (): void => {
  num.value++;
  messages.error(`Success${ num.value}`, {
    replace: true
  });
};
</script>
<template>
  Message Demo
  <hr />
  <ElButton @click="handleClick">
    Click me
  </ElButton>

  <hr />

  <ElButton
    @click="messages.error('Success')"
  >
    单例消息
  </ElButton>

  <hr />

  <ElButton @click="handleReplaceClick">
    单例消息(替换)
  </ElButton>
</template>
