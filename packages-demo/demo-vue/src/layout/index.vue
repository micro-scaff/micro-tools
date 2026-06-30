<script setup lang="ts">
import {
  watch,
  ref
} from "vue";
import {
  useRoute
} from "vue-router";
import {
  ElContainer,
  ElHeader,
  ElMain,
  ElMenu,
  ElMenuItem,
  ElFooter
} from "element-plus";

import {
  ROUTER
} from "@/const";

const route = useRoute();

const activeIndex = ref("");

const syncActive = (): void => {
  activeIndex.value = route.path === "/" ? "/" : route.path;
};

watch(() => {
  return route.path;
}, syncActive, {
  immediate: true
});
</script>

<template>
  <ElContainer class="layout-root">
    <ElHeader height="60px">
      <ElMenu
        :default-active="activeIndex"
        mode="horizontal"
        router
        background-color="#ffffff"
        text-color="#303133"
        active-text-color="#409eff"
        :ellipsis="false"
      >
        <ElMenuItem
          v-for="item in ROUTER"
          :key="item.path"
          :index="item.path"
          :disabled="item.meta?.disabled"
        >
          {{ item.title }}
        </ElMenuItem>
      </ElMenu>
    </ElHeader>
    <ElMain>
      <router-view />
    </ElMain>
    <ElFooter
      height="60px"
      style="background-color: #f0f2f5;"
    />
  </ElContainer>
</template>

<style scoped>
.layout-root {
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
}

.el-header {
  display: flex;
  align-items: center;
  box-shadow: 0 2px 8px rgb(0 0 0 / 6%);
}

.el-main {
  flex: 1;
  padding: 16px;
  overflow-y: auto;
}
</style>
