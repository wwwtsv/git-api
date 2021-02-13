<template>
  <div v-if="isDesktop">
    <div v-if="!loadingMarker && rows.length">
      <div
        v-for="(item, index) in rows"
        :key="index"
        class="ContentTable-Elem"
        :class="{
          'ContentTable-Elem_tree': listType === 'tree',
          'ContentTable-Elem_branches': listType === 'branches',
        }"
      >
        <div
          v-for="(value, key, i) in item"
          :key="i"
          class="ContentTable-Item"
          :class="{ 'ContentTable-Item_tree': listType === 'tree' }"
        >
          <content-table-rows-folder v-if="key === 'folder'" :content="value" />
          <content-table-rows-file v-else-if="key === 'file'" :content="value" />
          <content-table-rows-hash v-else-if="key === 'hash'" :content="value" />
          <content-table-rows-message v-else-if="key === 'message'" :content="value" />
          <content-table-rows-committer v-else-if="key === 'committer'" :content="value" />
          <content-table-rows-date v-else-if="key === 'date'" :content="value" />
          <content-table-rows-text v-else :content="value" />
        </div>
      </div>
    </div>
    <base-loading v-else />
  </div>
  <content-table-rows-mobile v-else :loading-marker="loadingMarker" :list-type="listType" :rows="rows" :route="route" />
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "@app/store";
import { BranchListElem, DeviceType, FileListElem } from "@app/store/modules/app-state/types/app-state";
import BaseLoading from "@components/base-loading";
import ContentTableRowsMobile from "@components/content-table/content-table-rows/mobile-template/index.vue";
import ContentTableRowsFolder from "@components/content-table/content-table-rows/content-table-rows-folder/index.vue";
import ContentTableRowsFile from "@components/content-table/content-table-rows/content-table-rows-file/index.vue";
import ContentTableRowsHash from "@components/content-table/content-table-rows/content-table-rows-hash/index.vue";
import ContentTableRowsMessage from "@components/content-table/content-table-rows/content-table-rows-message/index.vue";
import ContentTableRowsCommitter from "@components/content-table/content-table-rows/content-table-rows-committer/index.vue";
import ContentTableRowsDate from "@components/content-table/content-table-rows/content-table-rows-date/index.vue";
import ContentTableRowsText from "@components/content-table/content-table-rows/content-table-rows-text/index.vue";

export default defineComponent({
  name: "ContentTableRows",
  components: {
    ContentTableRowsText,
    ContentTableRowsDate,
    ContentTableRowsCommitter,
    ContentTableRowsMessage,
    ContentTableRowsHash,
    ContentTableRowsFile,
    ContentTableRowsFolder,
    ContentTableRowsMobile,
    BaseLoading,
  },
  props: {
    loadingMarker: Boolean,
    listType: String,
    rows: { type: Array as PropType<Array<FileListElem> | Array<BranchListElem>>, default: () => [] },
  },
  setup() {
    const route = useRoute();
    const store = useStore();
    const device = computed(() => store.state.appState.device);

    return {
      route: computed(() => route),
      isDesktop: computed(() => device.value === DeviceType.Desktop),
    };
  },
});
</script>

<style lang="scss" scoped>
.ContentTable {
  &-Elem {
    display: grid;
    grid-auto-flow: column;
    padding: 16px 0;
    border-bottom: 1px solid #f2f2f2;
    transition: background-color 0.2s ease;
    &:last-child {
      border-bottom: none;
    }
    &_tree {
      grid-template-columns: 14vw 8vw 23vw 12vw;
      gap: 5vw;
    }
    &_branches {
      grid-template-columns: 1fr auto;
      justify-content: space-between;
      gap: unset;
    }
    &:hover {
      background-color: rgba(#7f8285, 0.08);
    }
  }
  &-Item {
    position: relative;
    &_folder {
      display: grid;
      grid-auto-flow: column;
      gap: 8px;
    }
    &_tree {
      &:first-child {
        padding-left: 28px;
      }
      &:last-child {
        > div {
          text-align: end;
        }
      }
    }
  }
}
</style>
