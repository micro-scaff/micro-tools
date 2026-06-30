<script lang="ts" setup>
import {
  defineProps
} from "vue";

import Model, {
  DialogProps
} from "../model";
import Ui from "../ui/index.vue";

const {
  props
} = defineProps<{
  props: DialogProps;
}>();

</script>

<template>
  <Model :props="props">
    <Ui />
  </Model>
</template>
