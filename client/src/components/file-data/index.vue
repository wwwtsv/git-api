<template>
  <div class="FileData">
    <base-tabs :initial-tabs="tabs" @tab-click="handleChangeTabs" />
    <div class="FileData-Content">
      <file-viewer :file-data="fileData" />
      <history-viewer :days="days" />
    </div>
  </div>
</template>

<script lang="ts">
import { groupBy } from "lodash";
import { computed, defineComponent, PropType, ref } from "vue";
import BaseTabs from "@components/base-tabs/index.vue";
import FileViewer from "@components/file-viewer/index.vue";
import HistoryViewer from "@components/history-viewer/index.vue";
import { useRouter } from "vue-router";
import { DateTime } from "luxon";

export default defineComponent({
  name: "FileData",
  components: { FileViewer, BaseTabs, HistoryViewer },
  props: {
    tabs: { type: Array as PropType<Array<{ id: number; name: string; isActive: boolean; url: string }>> },
    fileData: { type: Object as PropType<{ fileName: string; rows: number; content: string }> },
    commitList: {
      type: Array as PropType<
        Array<{
          title: string;
          hash: string;
          fullHash: string;
          relativeTime: string;
          committer: string;
          message: string;
          date: string;
        }>
      >,
    },
  },
  setup(props) {
    const router = useRouter();
    const days = ref(groupBy(props.commitList, (obj) => DateTime.fromJSDate(new Date(obj.date)).day));

    const handleChangeTabs = (id: number) => {
      const currentTab = props.tabs?.find((tab) => tab.id === id);
      if (currentTab) {
        router.push({ params: { category: currentTab.url } });
      }
    };

    return {
      days: computed(() => days.value),
      handleChangeTabs,
    };
  },
});
</script>

<style lang="scss" scoped>
.FileData {
  &-Content {
    padding-top: 16px;
  }
}
</style>
