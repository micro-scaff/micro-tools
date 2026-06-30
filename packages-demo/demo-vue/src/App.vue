<script setup lang="ts">

import {
  ElConfigProvider
} from "element-plus";

import zhCN from "element-plus/es/locale/lang/zh-cn";

import Layout from "./layout/index.vue";
</script>

<template>
  <ElConfigProvider :locale="zhCN">
    <Layout />
  </ElConfigProvider>
</template>

<style>
#app {
  width: 100%;
  height: 100%;
}
</style>
