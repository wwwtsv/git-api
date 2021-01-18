<template>
  <div class="FileGrid">
    <base-tabs />
    <div class="FileGrid-Files">
      <file-grid-rows />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from "vue";
import { useRoute, useRouter } from "vue-router";
import BaseTabs from "@components/base-tabs/index.vue";
import FileGridRows from "@components/file-grid-rows/index.vue";
import { FileListElem } from "@app/store/modules/app-state/types/app-state";

export default defineComponent({
  name: "FileGrid",
  components: {
    BaseTabs,
    FileGridRows,
  },
  props: {
    fileList: { type: Array as PropType<Array<FileListElem>> },
    baseRoute: { type: String as PropType<string> },
  },
  setup(props) {
    console.log(props.fileList);
    const route = useRoute();
    const router = useRouter();

    const fileRows = ["Name", "Last Commit", "Commit message", "Committer", "Update"];
    const branchRows = ["Name", "Commit hash"];
    const tabs = [
      { name: "Files", isActive: true },
      { name: "Branches", isActive: false },
    ];

    const rows = ref();
  },
});
</script>

<style scoped></style>
