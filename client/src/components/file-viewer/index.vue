<template>
  <div v-if="fileData" class="FileViewer">
    <div class="FileViewer-FileName">
      {{ fileData.fileName }}
    </div>
    <div class="FileViewer-Code">
      <file-viewer-lines :rows="fileData.rows" />
      <file-viewer-code :content="fileData.content" />
    </div>
  </div>
  <base-loading v-else />
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import FileViewerLines from "@components/file-viewer/file-viewer-lines/index.vue";
import FileViewerCode from "@components/file-viewer/file-viewer-code/index.vue";
import BaseLoading from "@components/base-loading/index.vue";

export default defineComponent({
  name: "FileViewer",
  components: { BaseLoading, FileViewerCode, FileViewerLines },
  props: {
    fileData: { type: Object as PropType<{ fileName: string; rows: number; content: string }> },
  },
});
</script>

<style lang="scss" scoped>
.FileViewer {
  border-radius: 4px;
  border: 1px solid #e5e5e5;
  &-FileName {
    padding: 16px;
    background: #f5f5f5;
  }
}
</style>
