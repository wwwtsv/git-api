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
      <data-table :rows="fileList" />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
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
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const breadcrumbs = ref();
    const lastPath = ref();

    watch(
      () => route.fullPath,
      (newParams) => {
        const pathToDir = newParams.match(/tree\/(.+)+/);
        const pathSegments = pathToDir ? pathToDir[1].split("/") : [];
        breadcrumbs.value = pathSegments;
        lastPath.value = last(pathSegments) || "";
      }
    );

    const initFileList = async () => {
      await store.dispatch(AppStateActions.GetRepositoryList);
      const firstRepo = store.state.appState.currentRepository;
      if (firstRepo) {
        await store.dispatch(AppStateActions.GetBranchList, { repo: firstRepo });
        await store.dispatch(AppStateActions.GetCommitList, { repo: firstRepo, hash: "HEAD", perPage: "1" });
        await store.dispatch(AppStateActions.GetFileList, { repo: firstRepo, hash: "HEAD" });
        await router.push({ name: "file-list", params: { repository: firstRepo, category: "tree" } });
      }
    };

    onBeforeMount(() => initFileList());

    return {
      currentRepository: computed(() => store.state.appState.currentRepository),
      currentBranch: computed(() => store.state.appState.currentBranch),
      lastCommit: computed(() => store.state.appState.lastCommit),
      fileList: computed(() => store.state.appState.fileList),
      breadcrumbs,
      lastPath,
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
