<template>
  <div v-if="fileData" class="FileViewer">
    <div class="FileViewer-FileName">
      {{ fileData.fileName }}
    </div>
    <div class="FileViewer-Code">
      <file-viewer-code :content="fileData.content" />
    </div>
    <div class="FileViewer-Lines">
      <file-viewer-lines :rows="fileData.rows" />
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

<style lang="scss" scoped></style>
