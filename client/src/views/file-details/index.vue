<template>
  <div class="FileDetails">
    <file-data :commit-list="commitList" :file-data="fileData" :tabs="tabs" />
  </div>
</template>

<script lang="ts">
import { isEmpty } from "lodash";
import { computed, defineComponent, ref } from "vue";
import FileData from "@components/file-data/index.vue";
import { onBeforeRouteUpdate, RouteLocationNormalized, RouteLocationNormalizedLoaded, useRoute } from "vue-router";
import { useStore } from "@app/store";
import { AppStateActions } from "@app/store/modules/app-state/types/app-state";

export default defineComponent({
  name: "FileDetails",
  components: {
    FileData,
  },
  setup() {
    const store = useStore();
    const route = useRoute();

    const currentRepository = computed(() => store.state.appState.currentRepository);
    const lastPath = computed(() => store.state.appState.lastPath);
    const hash = computed(() => store.state.appState.currentBranch);

    const tabs = ref([
      { id: 0, name: "details", isActive: route.params.category === "details", url: "details" },
      { id: 1, name: "history", isActive: route.params.category === "history", url: "history" },
    ]);

    const getFileData = async (to: RouteLocationNormalized | RouteLocationNormalizedLoaded) => {
      await store.dispatch(AppStateActions.InitRootData);
      if (isEmpty(store.state.appState.fileData)) {
        await store.dispatch(AppStateActions.GetFileData, {
          repo: currentRepository.value || to.params.repository,
          hash: hash.value || "master",
          path: to.params.path,
          name: lastPath,
        });
      }
      if (to.params.category === "history") {
        const repo = to.params.repository;
        const file = to.params.path;
        await store.dispatch(AppStateActions.GetCommitList, { repo, hash: file, perPage: "10" });
      }
    };
    getFileData(route);

    onBeforeRouteUpdate(async (to) => {
      await getFileData(to);
    });

    return {
      fileData: computed(() => store.state.appState.fileData),
      commitList: computed(() => store.state.appState.commitList),
      tabs: computed(() => tabs.value),
    };
  },
});
</script>

<style lang="scss" scoped></style>
