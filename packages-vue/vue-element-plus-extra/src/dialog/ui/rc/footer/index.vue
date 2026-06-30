<script lang="ts" setup>

import {
  computed,
  isVNode
} from "vue";
import{
  ElSpace,
  ElButton
} from "element-plus";

import {
  isObject
} from "@mt-kit/utils";

import {
  usePropsOk,
  usePropsCancel,
  usePropsIsSubmit,
  usePropsFooterExtra,
  useHandleOnClose,
  useHandleOnSubmit,
  useStateLocked,
  ModelLockState
} from "../../../model";

const ok = usePropsOk();

const okButtonProps = computed(() => {
  return (isObject(ok.value) ? {
    ...ok.value
  } : {
    label: ok.value
  });
});

const cancel = usePropsCancel();

const cancelButtonProps = computed(() => {
  return (isObject(cancel.value) ? {
    ...cancel.value
  } : {
    label: cancel.value
  });
});

const isSubmit = usePropsIsSubmit();

const footerExtra = usePropsFooterExtra();

const handleClose = useHandleOnClose();

const handleOnSubmit = useHandleOnSubmit();

const locked = useStateLocked();

</script>
<template>
  <ElSpace>
    <component
      :is="footerExtra"
      v-if="isVNode(footerExtra)"
    />
    <template v-else>
      {{ footerExtra }}
    </template>

    <ElButton
      v-bind="cancelButtonProps"
      @click="handleClose"
    >
      {{ cancelButtonProps?.label || "关闭" }}
    </ElButton>

    <!--
 是否进行提交操作, false 时只显示关闭 - 查看/详情
-->
    <ElButton
      v-if="isSubmit"
      type="primary"
      :loading="locked === ModelLockState.LOADING"
      v-bind="okButtonProps"
      @click="handleOnSubmit"
    >
      {{ okButtonProps?.label || "提交" }}
    </ElButton>
  </ElSpace>
</template>
