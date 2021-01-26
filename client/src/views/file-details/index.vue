<template>
  <div class="FileDetails">
    <file-data :file-data="fileData" :tabs="tabs" />
  </div>
</template>

<script lang="ts">
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
      { id: 0, name: "details", isActive: true, url: "details" },
      { id: 0, name: "history", isActive: false, url: "history" },
    ]);

    const getFileData = async (to: RouteLocationNormalized | RouteLocationNormalizedLoaded) => {
      await store.dispatch(AppStateActions.GetFileData, {
        repo: currentRepository.value || to.params.repository,
        hash: hash.value || "master",
        path: to.params.path,
        name: lastPath,
      });
    };
    getFileData(route);

    onBeforeRouteUpdate(async (to) => {
      await getFileData(to);
    });

    return {
      fileData: computed(() => store.state.appState.fileData),
      tabs: computed(() => tabs.value),
    };
  },
});
</script>

<style lang="scss" scoped></style>
