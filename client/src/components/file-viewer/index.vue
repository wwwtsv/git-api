<template>
  <div v-if="fileData" class="FileViewer">
    <div class="FileViewer-FileName">
      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="13" viewBox="0 0 10 13" fill="none">
        <path
          d="M5.75 3.6875V0.5H1.0625C0.734375 0.5 0.5 0.757812 0.5 1.0625V11.9375C0.5 12.2656 0.734375 12.5 1.0625 12.5H8.9375C9.24219 12.5 9.5 12.2656 9.5 11.9375V4.25H6.3125C5.98438 4.25 5.75 4.01562 5.75 3.6875ZM7.25 9.21875C7.25 9.38281 7.10938 9.5 6.96875 9.5H3.03125C2.86719 9.5 2.75 9.38281 2.75 9.21875V9.03125C2.75 8.89062 2.86719 8.75 3.03125 8.75H6.96875C7.10938 8.75 7.25 8.89062 7.25 9.03125V9.21875ZM7.25 7.71875C7.25 7.88281 7.10938 8 6.96875 8H3.03125C2.86719 8 2.75 7.88281 2.75 7.71875V7.53125C2.75 7.39062 2.86719 7.25 3.03125 7.25H6.96875C7.10938 7.25 7.25 7.39062 7.25 7.53125V7.71875ZM7.25 6.03125V6.21875C7.25 6.38281 7.10938 6.5 6.96875 6.5H3.03125C2.86719 6.5 2.75 6.38281 2.75 6.21875V6.03125C2.75 5.89062 2.86719 5.75 3.03125 5.75H6.96875C7.10938 5.75 7.25 5.89062 7.25 6.03125ZM9.5 3.35938C9.5 3.21875 9.42969 3.07812 9.33594 2.96094L7.03906 0.664062C6.92188 0.570312 6.78125 0.5 6.64062 0.5H6.5V3.5H9.5V3.35938Z"
          fill="black"
        />
      </svg>
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
    display: grid;
    gap: 12px;
    grid-auto-flow: column;
    grid-auto-columns: max-content;
    align-items: center;
    padding: 16px;
    background: #f5f5f5;
  }
  &-Code {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: max-content;
  }
}
</style>
