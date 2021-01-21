<template>
  <div class="DataTable">
    <base-tabs :initial-tabs="tabs" @tab-click="handleChangeTabs" />
    <div class="DataTable-Content">
      <content-table :loading-marker="isLoading" :list-type="listType" :columns="columns" :rows="rows" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BaseTabs from "@components/base-tabs/index.vue";
import ContentTable from "@components/content-table/index.vue";

export default defineComponent({
  name: "DataTable",
  components: {
    ContentTable,
    BaseTabs,
  },
  props: {
    tabs: Array,
    columns: Array,
    rows: Array,
    isLoading: Boolean,
    listType: String,
    handleChangeTabs: Function,
  },
});
</script>

<style scoped></style>
