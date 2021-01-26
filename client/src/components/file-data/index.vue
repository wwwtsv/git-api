<template>
  <div class="FileData">
    <base-tabs :initial-tabs="tabs" />
    <div class="FileData-Content">
      <file-viewer :file-data="fileData" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import BaseTabs from "@components/base-tabs/index.vue";
import FileViewer from "@components/file-viewer/index.vue";

export default defineComponent({
  name: "FileData",
  components: { FileViewer, BaseTabs },
  props: {
    tabs: { type: Array as PropType<Array<{ id: number; name: string; isActive: boolean; url: string }>> },
    fileData: { type: Object as PropType<{ fileName: string; rows: number; content: string }> },
  },
  setup(props) {
    console.log(props.tabs);
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
