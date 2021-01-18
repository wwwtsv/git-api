<template>
  <div class="DataTable">
    <base-tabs :initial-tabs="tabs" />
    <div class="DataTable-Content">
      <base-table :columns="columns" :rows="rows" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType } from "vue";
import { useRoute, useRouter } from "vue-router";
import BaseTabs from "@components/base-tabs/index.vue";
import BaseTable from "@components/base-tabel/index.vue";
import { FileListElem } from "@app/store/modules/app-state/types/app-state";

export default defineComponent({
  name: "DataTable",
  components: {
    BaseTable,
    BaseTabs,
  },
  props: {
    rows: { type: Array as PropType<Array<FileListElem>> },
    baseRoute: { type: String as PropType<string> },
  },
  setup(props) {
    const route = useRoute();
    const router = useRouter();
    const fileColumns = ["Name", "Last Commit", "Commit message", "Committer", "Update"];
    const branchColumns = ["Name", "Commit hash"];

    const columns = ref(fileColumns);

    const tabs = [
      { id: 0, name: "Files", isActive: true },
      { id: 1, name: "Branches", isActive: false },
    ];

    return {
      tabs,
      columns,
    };
  },
});
</script>

<style scoped></style>
