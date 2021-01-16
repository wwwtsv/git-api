<template>
  <div class="FileList">
    <breadcrumbs v-if="isTree" :breadcrumbs="breadcrumbs" :last-path="lastPath" />
    <div class="FileList-Meta">
      <current-directory />
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
import { defineComponent, ref, watch } from "vue";
import { last } from "lodash";
import Breadcrumbs from "@components/breadcrumbs/index.vue";
import CurrentDirectory from "@components/current-dirictory/index.vue";
import BranchDropDown from "@components/branch-drop-down/index.vue";
import FileGrid from "@components/file-grid/index.vue";
import LastCommit from "@components/last-commit/index.vue";
import { useRoute } from "vue-router";

export default defineComponent({
  components: {
    Breadcrumbs,
    CurrentDirectory,
    BranchDropDown,
    FileGrid,
    LastCommit,
  },
  setup() {
    const route = useRoute();
    const isTree = ref(false);
    const breadcrumbs = ref([""]);
    const lastPath = ref("");

    watch(
      () => route.fullPath,
      (newParams) => {
        isTree.value = !!newParams.match(/tree\//);
        if (isTree.value) {
          const pathToDir = newParams.match(/tree\/(.+)+/);
          const pathSegments = pathToDir ? pathToDir[1].split("/") : [];
          breadcrumbs.value = pathSegments;
          lastPath.value = last(pathSegments) || "";
        }
      }
    );

    return {
      isTree,
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
