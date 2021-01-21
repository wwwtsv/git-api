<template>
  <div class="ContentTable">
    <content-table-columns :list-type="listType" :columns="columns" />

    <div class="ContentTable-Rows">
      <content-table-rows :list-type="listType" :loading-marker="loadingMarker" :rows="rows" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { BranchListElem, FileListElem } from "@app/store/modules/app-state/types/app-state";
import ContentTableRows from "@components/content-table/content-table-rows/index.vue";
import ContentTableColumns from "@components/content-table/content-table-columns/index.vue";

export default defineComponent({
  name: "ContentTable",
  components: {
    ContentTableRows,
    ContentTableColumns,
  },
  props: {
    columns: Array,
    rows: { type: Array as PropType<Array<FileListElem> | Array<BranchListElem>>, default: () => [] },
    listType: { type: String as PropType<"tree" | "branches">, default: () => "tree" },
    loadingMarker: Boolean,
  },
});
</script>

<style lang="scss" scoped>
.ContentTable {
  &-Rows {
    position: relative;
    min-height: 300px;
  }
}
</style>
