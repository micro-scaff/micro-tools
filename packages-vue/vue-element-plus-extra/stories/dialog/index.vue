<script lang="tsx" setup>

import {
  ElButton
} from "element-plus";

import Content from "./content/index.vue";
import {
  open,
  DialogSize
} from "../../src";
import {
  submit
} from "./utils";

const handleClick = (): void => {
  open({
    title: "Title",
    titleExtra: "<Content />",
    content: <Content />,
    ok: "✅",
    cancel: "❌",
    isSubmit: true,
    footerExtra: " <Content />",
    size: DialogSize.ALMOST_FULL,
    data: {
      name: "John Doe",
      age: 20
    },
    onSubmit: submit,
    closable: false,
    backdrop: false,
    esc: false,
    backdropClosable: false
  }).catch(error => {

    // eslint-disable-next-line no-console
    console.log("error", error);
  });
};

</script>
<template>
  demo
  <hr />
  <ElButton @click="handleClick">
    Click me
  </ElButton>
</template>
