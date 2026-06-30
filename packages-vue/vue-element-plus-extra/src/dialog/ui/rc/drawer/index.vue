<script lang="ts" setup>

import {
  isVNode
} from "vue";
import {
  ElDrawer
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
  usePropsClassNameOnBody,
  usePropsBackdrop,
  usePropsBackdropClosable,
  usePropsClosable,
  usePropsEsc,
  usePropsZIndex
} from "../../../model";

const open = useStateOpen();

const handleClose = useHandleOnClose();

const size = usePropsSize();

const content = usePropsContent();

const dataLoading = useStateDataLoading();

const options = usePropsOptions();

const classNameOnBody = usePropsClassNameOnBody();

const backdrop = usePropsBackdrop();

const backdropClosable = usePropsBackdropClosable();

const closable = usePropsClosable();

const esc = usePropsEsc();

const zIndex = usePropsZIndex();
</script>
<template>
  <ElDrawer
    v-bind="options"
    v-model="open"
    destroy-on-close
    :size="transformWidthSize(size)"
    :body-class="classNameOnBody"
    :z-index="zIndex"
    :close-on-press-escape="esc"
    :show-close="closable"
    :modal="backdrop"
    :close-on-click-modal="backdropClosable"
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
    <template #footer>
      <Footer />
    </template>
  </ElDrawer>
</template>
