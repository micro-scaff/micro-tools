<script lang="ts" setup>

import {
  isVNode
} from "vue";
import {
  ElSpace
}from "element-plus";

import {
  usePropsTitle,
  usePropsTitleExtra
} from "../../../model";

const title = usePropsTitle();

const titleExtra = usePropsTitleExtra();

</script>
<template>
  <ElSpace>
    <span>
      <component
        :is="title"
        v-if="isVNode(title)"
      />
      <template v-else>
        {{ title }}
      </template>
    </span>

    <span>
      <component
        :is="titleExtra"
        v-if="isVNode(titleExtra)"
      />
      <template v-else>
        {{ titleExtra }}
      </template>
    </span>
  </ElSpace>
</template>
