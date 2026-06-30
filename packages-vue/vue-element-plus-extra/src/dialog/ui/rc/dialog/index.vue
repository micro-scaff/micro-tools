<script setup lang="ts">
import {
  isVNode
} from "vue";
import {
  ElDialog
} from "element-plus";

import Footer from "../footer/index.vue";
import Header from "../header/index.vue";
import Skeleton from "../skeleton/index.vue";
import {
  transformWidthSize,
  usePropsContent,
  useStateOpen,
  useHandleOnClose,
  usePropsSize,
  useStateDataLoading,
  usePropsOptions,
  usePropsBackdrop,
  usePropsBackdropClosable,
  usePropsClosable,
  usePropsEsc,
  usePropsZIndex,
  usePropsClassNameOnBody
} from "../../../model";

const open = useStateOpen();

const handleClose = useHandleOnClose();

const size = usePropsSize();

const content = usePropsContent();

const dataLoading = useStateDataLoading();

const backdrop = usePropsBackdrop();

const backdropClosable = usePropsBackdropClosable();

const closable = usePropsClosable();

const esc = usePropsEsc();

const zIndex = usePropsZIndex();

const classNameOnBody = usePropsClassNameOnBody();

const options = usePropsOptions();

</script>

<template>
  <ElDialog
    v-bind="options"
    v-model="open"
    :width="transformWidthSize(size)"
    :z-index="zIndex"
    :body-class="classNameOnBody"
    :close-on-press-escape="esc"
    :show-close="closable"
    :modal="backdrop"
    :close-on-click-modal="backdropClosable"
    destroy-on-close
    @close="handleClose"
  >
    <template #header>
      <Header />
    </template>
    <Skeleton v-if="dataLoading" />
    <template v-else>
      <component
        :is="content"
        v-if="isVNode(content)"
      />
      <template v-else>
        {{ content }}
      </template>
    </template>
    <slot></slot>
    <template #footer>
      <Footer />
    </template>
  </ElDialog>
</template>
