<template>
  <div class="FileList">
    <breadcrumbs :breadcrumbs="breadcrumbs" :last-path="lastPath" :current-repository="currentRepository" />
    <div class="FileList-Meta">
      <current-directory :last-path="lastPath" :current-repository="currentRepository" />
      <branch-drop-down />
    </div>
    <div class="FileList-LastCommit">
      <last-commit />
    </div>
    <div class="FileList-Table">
      <file-grid />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";
import { last } from "lodash";
import Breadcrumbs from "@components/breadcrumbs/index.vue";
import CurrentDirectory from "@components/current-directory/index.vue";
import BranchDropDown from "@components/branch-drop-down/index.vue";
import FileGrid from "@components/file-grid/index.vue";
import LastCommit from "@components/last-commit/index.vue";
import { useRoute } from "vue-router";
import { useStore } from "@app/store";

export default defineComponent({
  name: "FileList",
  components: {
    Breadcrumbs,
    CurrentDirectory,
    BranchDropDown,
    FileGrid,
    LastCommit,
  },
  setup() {
    const route = useRoute();
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

    return {
      currentRepository: computed(() => store.state.appState.currentRepository),
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
