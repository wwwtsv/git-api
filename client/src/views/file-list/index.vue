<template>
  <div class="FileList">
    <data-table
      :tabs="tabs"
      :is-loading="isLoading"
      :columns="columns"
      :rows="rows"
      :list-type="listType"
      :handle-change-tabs="handleChangeTabs"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from "vue";
import { onBeforeRouteUpdate, useRouter } from "vue-router";
// Components
import DataTable from "@components/data-table/index.vue";
// State
import { useStore } from "@app/store";
import { AppStateActions } from "@app/store/modules/app-state/types/app-state";

export default defineComponent({
  name: "FileList",
  components: {
    DataTable,
  },
  setup() {
    const router = useRouter();
    const store = useStore();

    const tree = ["Name", "Last Commit", "Commit message", "Committer", "Update"];
    const branches = ["Name", "Update"];
    const columnVariants = {
      tree,
      branches,
    };
    const handleChangeTabs = (id: number) => {
      const currentTab = tabs.value.find((tab) => tab.id === id);
      if (currentTab) {
        columns.value = columnVariants[currentTab.url as "tree" | "branches"];
        listType.value = currentTab.url;
        router.push({ params: { category: currentTab.url } });
      }
    };

    const rows = ref();
    const columns = ref(tree);
    const tabs = ref([
      { id: 0, name: "Files", isActive: true, url: "tree" },
      { id: 1, name: "Branches", isActive: false, url: "branches" },
    ]);
    const listType = ref("tree");

    const getFileListData = async () => {
      await store.dispatch(AppStateActions.InitRootData);
      const currentRepository = store.state.appState.currentRepository;
      await store.dispatch(AppStateActions.GetFileList, { repo: currentRepository, hash: "master" });
      await router.push({ name: "file-list", params: { repository: currentRepository, category: "tree" } });
    };
    getFileListData();

    onBeforeRouteUpdate(async (to) => {
      const branchList = computed(() => store.state.appState.branchList);
      const currentBranch = computed(() => store.state.appState.currentBranch);
      const fileList = computed(() => store.state.appState.fileList);

      const category = to.params.category;
      const currentRepo = to.params.repository;
      const isBranches = category === "branches";

      const pathSegments = to.params.path;
      await store.dispatch(AppStateActions.GetFileList, {
        repo: currentRepo,
        hash: currentBranch.value,
        path: pathSegments,
      });

      isBranches ? (rows.value = branchList.value) : (rows.value = fileList.value);
    });

    return {
      isLoading: computed(() => store.state.appState.isLoading),
      columns: computed(() => columns.value),
      listType: computed(() => listType.value),
      rows: computed(() => rows.value),
      tabs: computed(() => tabs.value),

      handleChangeTabs,
    };
  },
});
</script>

<style lang="scss" scoped></style>
