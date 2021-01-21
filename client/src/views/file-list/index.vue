<template>
  <div class="FileList">
    <breadcrumbs :breadcrumbs="breadcrumbs" :last-path="lastPath" :current-repository="currentRepository" />
    <div class="FileList-Meta">
      <current-directory :last-path="lastPath" :current-repository="currentRepository" />
      <branch-drop-down v-if="currentBranch" :current-branch="currentBranch" :current-repository="currentRepository" />
    </div>
    <div class="FileList-LastCommit">
      <last-commit :last-commit="lastCommit" />
    </div>
    <div class="FileList-Table">
      <data-table
        :tabs="tabs"
        :is-loading="isLoading"
        :columns="columns"
        :rows="rows"
        :list-type="listType"
        :handle-change-tabs="handleChangeTabs"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { isEmpty } from "lodash";
import { computed, defineComponent, onBeforeMount, ref } from "vue";
import { onBeforeRouteUpdate, useRouter } from "vue-router";
import { last } from "lodash";
// Components
import Breadcrumbs from "@components/breadcrumbs/index.vue";
import CurrentDirectory from "@components/current-directory/index.vue";
import BranchDropDown from "@components/branch-drop-down/index.vue";
import DataTable from "@components/data-table/index.vue";
import LastCommit from "@components/last-commit/index.vue";
// State
import { useStore } from "@app/store";
import { AppStateActions } from "@app/store/modules/app-state/types/app-state";

export default defineComponent({
  name: "FileList",
  components: {
    DataTable,
    Breadcrumbs,
    CurrentDirectory,
    BranchDropDown,
    LastCommit,
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

    const breadcrumbs = ref();
    const lastPath = ref();
    const rows = ref();
    const columns = ref(tree);
    const tabs = ref([
      { id: 0, name: "Files", isActive: true, url: "tree" },
      { id: 1, name: "Branches", isActive: false, url: "branches" },
    ]);
    const listType = ref("tree");

    const fileList = computed(() => store.state.appState.fileList);
    const branchList = computed(() => store.state.appState.branchList);
    const currentBranch = computed(() => store.state.appState.currentBranch);

    onBeforeMount(async () => {
      await store.dispatch(AppStateActions.GetRepositoryList);
      const firstRepo = store.state.appState.currentRepository;
      if (firstRepo) {
        await store.dispatch(AppStateActions.GetBranchList, { repo: firstRepo });
        await store.dispatch(AppStateActions.GetCommitList, { repo: firstRepo, hash: "master", perPage: "1" });
        await store.dispatch(AppStateActions.GetFileList, { repo: firstRepo, hash: "master" });
        await router.push({ name: "file-list", params: { repository: firstRepo, category: "tree" } });
      }
    });

    onBeforeRouteUpdate(async (to) => {
      const isBranches = to.params.category === "branches";
      isBranches ? (rows.value = branchList.value) : (rows.value = fileList.value);

      const currentRepo = to.params.repository;
      if (isBranches && isEmpty(branchList.value)) {
        await store.dispatch(AppStateActions.GetBranchList, { repo: currentRepo, allBranches: true });
      }

      const pathSegments = to.params.path;
      if (pathSegments) {
        await store.dispatch(AppStateActions.GetFileList, {
          repo: currentRepo,
          hash: currentBranch.value,
          path: pathSegments,
        });
        breadcrumbs.value = pathSegments;
        lastPath.value = last(pathSegments) || "";
        rows.value = fileList.value;
      }
    });

    return {
      currentRepository: computed(() => store.state.appState.currentRepository),
      lastCommit: computed(() => store.state.appState.lastCommit),
      isLoading: computed(() => store.state.appState.isLoading),
      rows: computed(() => rows.value),
      tabs: computed(() => tabs.value),
      columns: computed(() => columns.value),
      listType: computed(() => listType.value),
      breadcrumbs,
      lastPath,
      currentBranch,

      handleChangeTabs,
    };
  },
});
</script>

<style lang="scss" scoped>
.FileList {
  padding: 0 32px;
  &-Meta {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: max-content;
    align-items: center;
    gap: 4px;
    padding-top: 12px;
  }
}
</style>
