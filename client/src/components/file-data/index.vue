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
    tabs: { type: Array as PropType<Array<string>> },
    fileData: { type: Object as PropType<{ fileName: string; rows: number; content: string }> },
  },
});
</script>

<style lang="scss" scoped></style>
