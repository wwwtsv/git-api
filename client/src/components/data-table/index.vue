<template>
  <div class="DataTable">
    <base-tabs :initial-tabs="tabs" @tab-click="handleChangeTabs" />
    <div class="DataTable-Content">
      <base-table :columns="columns" :rows="rows" />
    </div>
  </div>
</template>

<script lang="ts">
import { isEmpty } from "lodash";
import { defineComponent, ref, PropType, computed } from "vue";
import { onBeforeRouteUpdate, useRoute, useRouter } from "vue-router";
import BaseTabs from "@components/base-tabs/index.vue";
import BaseTable from "@components/base-tabel/index.vue";
import { AppStateActions, FileListElem } from "@app/store/modules/app-state/types/app-state";
import { useStore } from "@app/store";

export default defineComponent({
  name: "DataTable",
  components: {
    BaseTable,
    BaseTabs,
  },
  props: {
    rows: { type: Array as PropType<Array<FileListElem>> },
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();

    const tree = ["Name", "Last Commit", "Commit message", "Committer", "Update"];
    const branches = ["Name", "Commit hash"];
    const columnVariants = {
      tree,
      branches,
    };

    const columns = ref(tree);
    const tabs = ref([
      { id: 0, name: "Files", isActive: true, url: "tree" },
      { id: 1, name: "Branches", isActive: false, url: "branches" },
    ]);
    const currentRepository = ref(route.params.repository);
    const branchList = computed(() => store.state.appState.branchList);

    const handleChangeTabs = (id: number) => {
      const currentTab = tabs.value.find((tab) => tab.id === id);
      if (currentTab) {
        columns.value = columnVariants[currentTab.url as "tree" | "branches"];
        router.push({ params: { category: currentTab.url } });
      }
    };

    onBeforeRouteUpdate(async (to) => {
      console.log(to, "routerChange");
      if (to.params.category === "branches" && isEmpty(branchList.value)) {
        await store.dispatch(AppStateActions.GetBranchList, { repo: currentRepository.value, allBranches: true });
      }
    });

    return {
      tabs: computed(() => tabs.value),
      columns: computed(() => columns.value),

      handleChangeTabs,
    };
  },
});
</script>

<style scoped></style>
