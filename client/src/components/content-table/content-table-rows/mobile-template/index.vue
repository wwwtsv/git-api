<template>
  <div class="ContentTableRowsMobile">
    <div v-if="!loadingMarker && rows.length">
      <div
        v-for="(item, index) in rows"
        :key="index"
        class="ContentTableRowsMobile-Elem"
        :class="{
          'ContentTableRowsMobile-Elem_tree': listType === 'tree',
          'ContentTableRowsMobile-Elem_branches': listType === 'branches',
        }"
      >
        <div
          v-for="(value, key, i) in item"
          :key="i"
          class="ContentTableRowsMobile-Item"
          :class="{ 'ContentTableRowsMobile-Item_tree': listType === 'tree' }"
        >
          <content-table-rows-file v-if="key === 'file'" :content="value" />
          <content-table-rows-folder v-if="key === 'folder'" :content="value" />
          <content-table-rows-message v-else-if="key === 'message'" :content="value" />
          <content-table-rows-hash v-if="key === 'hash'" :content="value" />
          <content-table-rows-committer v-else-if="key === 'committer'" :content="value" />
          <content-table-rows-date v-else-if="key === 'date'" :content="value" />
        </div>
      </div>
    </div>
    <base-loading v-else />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { BranchListElem, FileListElem } from "@app/store/modules/app-state/types/app-state";
import ContentTableRowsFolder from "@components/content-table/content-table-rows/content-table-rows-folder/index.vue";
import ContentTableRowsMessage from "@components/content-table/content-table-rows/content-table-rows-message/index.vue";
import ContentTableRowsHash from "@components/content-table/content-table-rows/content-table-rows-hash/index.vue";
import ContentTableRowsCommitter from "@components/content-table/content-table-rows/content-table-rows-committer/index.vue";
import ContentTableRowsDate from "@components/content-table/content-table-rows/content-table-rows-date/index.vue";
import BaseLoading from "@components/base-loading/index.vue";
import ContentTableRowsFile from "@components/content-table/content-table-rows/content-table-rows-file/index.vue";

export default defineComponent({
  name: "ContentTableRowsMobile",
  components: {
    ContentTableRowsFile,
    BaseLoading,
    ContentTableRowsDate,
    ContentTableRowsCommitter,
    ContentTableRowsHash,
    ContentTableRowsMessage,
    ContentTableRowsFolder,
  },
  props: {
    loadingMarker: Boolean,
    listType: String,
    rows: { type: Array as PropType<Array<FileListElem> | Array<BranchListElem>>, default: () => [] },
    route: Object,
  },
});
</script>

<style lang="scss" scoped>
.ContentTableRowsMobile {
  overflow: hidden;
  &-Folder {
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: max-content;
    gap: 8px;
  }
  &-Elem {
    position: relative;
    display: grid;
    grid-auto-flow: row;
    gap: 10px;
    padding: 25px 0;

    &:not(:last-child) {
      &::before {
        position: absolute;
        bottom: 0;
        content: "";
        display: block;
        width: 100%;
        height: 1px;
        background: #e5e5e5;
      }
    }
  }
}
</style>
