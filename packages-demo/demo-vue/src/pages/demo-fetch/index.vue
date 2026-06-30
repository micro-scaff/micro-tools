<script setup lang="ts">

import {
  ElTable,
  ElTableColumn,
  ElButton
} from "element-plus";

import {
  createDedupedRequest
} from "@mt-kit/utils";

import {
  dataList
} from "@/api";
import {
  SelectFetch
} from "@/components";

const dedupedDataList = createDedupedRequest(dataList);

const handleClick = (): void => {
  dedupedDataList("123").then(res => {
    // eslint-disable-next-line no-console
    console.log(res, "res");
  }).catch(error => {
    console.error(error, "error");
  });
};

const tableData = [
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles"
  },
  {
    date: "2016-05-02",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles"
  },
  {
    date: "2016-05-04",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles"
  },
  {
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles"
  }
];
</script>

<template>
  <div>
    <ElTable
      :data="tableData"
      border
    >
      <ElTableColumn
        prop="date"
        label="Date"
      />
      <ElTableColumn
        prop="name"
        label="Name"
      />
      <ElTableColumn
        prop="address"
        label="Address"
      >
        <template #default="{ row }">
          <SelectFetch :value="row.address" />
        </template>
      </ElTableColumn>
    </ElTable>

    <SelectFetch />

    <ElButton @click="handleClick">
      Click me
    </ElButton>
  </div>
</template>
