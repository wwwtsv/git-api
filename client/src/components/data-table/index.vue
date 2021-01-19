<template>
  <div class="DataTable">
    <base-tabs :initial-tabs="tabs" @tab-click="handleChangeTabs" />
    <div class="DataTable-Content">
      <base-table :columns="columns" :rows="rows" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, PropType, computed, onBeforeMount } from "vue";
import { onBeforeRouteUpdate, useRoute, useRouter } from "vue-router";
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
  },
  setup(props) {
    const route = useRoute();
    const router = useRouter();
    const fileColumns = ["Name", "Last Commit", "Commit message", "Committer", "Update"];
    const branchColumns = ["Name", "Commit hash"];

    const columns = ref(fileColumns);
    const tabs = ref([
      { id: 0, name: "Files", isActive: true },
      { id: 1, name: "Branches", isActive: false },
    ]);
    const category = ref(route.params.category);

    const handleChangeTabs = (id) => {
      const currentTab = tabs.value.find((tab) => tab.id === id);
      const routeParse = route.fullPath.split("/").filter(Boolean);
      router.push();
      console.log();
    };

    return {
      tabs: computed(() => tabs.value),
      columns: computed(() => columns.value),

      handleChangeTabs,
    };
  },
});
</script>

<style scoped></style>
