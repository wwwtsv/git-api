<template>
  <div class="FileData">
    <base-tabs :initial-tabs="tabs" @tab-click="handleChangeTabs" />
    <div class="FileData-Content">
      <file-viewer :file-data="fileData" />
      <history-viewer />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import BaseTabs from "@components/base-tabs/index.vue";
import FileViewer from "@components/file-viewer/index.vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "FileData",
  components: { FileViewer, BaseTabs },
  props: {
    tabs: { type: Array as PropType<Array<{ id: number; name: string; isActive: boolean; url: string }>> },
    fileData: { type: Object as PropType<{ fileName: string; rows: number; content: string }> },
  },
  setup(props) {
    const router = useRouter();
    const handleChangeTabs = (id: number) => {
      const currentTab = props.tabs?.find((tab) => tab.id === id);
      if (currentTab) {
        router.push({ params: { category: currentTab.url } });
      }
    };

    return {
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
