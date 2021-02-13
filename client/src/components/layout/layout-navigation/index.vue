<template>
  <div class="LayoutNavigation">
    <breadcrumbs :breadcrumbs="breadcrumbs" :last-path="lastPath" :current-repository="currentRepository" />
    <div class="LayoutNavigation-Meta">
      <current-directory :last-path="lastPath" :current-repository="currentRepository" />
      <branch-drop-down v-if="currentBranch" :current-branch="currentBranch" :current-repository="currentRepository" />
    </div>
    <div class="LayoutNavigation-LastCommit">
      <last-commit :last-commit="lastCommit" />
    </div>

    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "@app/store/index.ts";
import Breadcrumbs from "@components/breadcrumbs/index.vue";
import CurrentDirectory from "@components/current-directory/index.vue";
import BranchDropDown from "@components/branch-drop-down/index.vue";
import LastCommit from "@components/last-commit/index.vue";

export default defineComponent({
  name: "LayoutNavigation",
  components: { LastCommit, BranchDropDown, CurrentDirectory, Breadcrumbs },
  setup() {
    const store = useStore();

    return {
      breadcrumbs: computed(() => store.state.appState.breadcrumbs),
      lastPath: computed(() => store.state.appState.lastPath),
      currentRepository: computed(() => store.state.appState.currentRepository),
      currentBranch: computed(() => store.state.appState.currentBranch),
      lastCommit: computed(() => store.state.appState.lastCommit),
    };
  },
});
</script>

<style lang="scss" scoped>
.LayoutNavigation {
  padding: 0 32px;
  &-Meta {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: max-content;
    align-items: center;
    gap: 4px;
    padding-top: 12px;
  }
  @media (max-width: 768px) {
    padding: 0 16px;
  }
}
</style>
