<template>
  <div class="Layout">
    <header class="Header">
      <base-logo :current-repository="currentRepository" />
      <repo-drop-down />
    </header>
    <main class="Main">
      <router-view />
    </main>
    <footer class="Footer">
      <meta-info />
    </footer>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from "vue";
import BaseLogo from "@components/base-logo/index.vue";
import RepoDropDown from "@components/repo-drod-down/index.vue";
import MetaInfo from "@components/meta-info/index.vue";
import { useStore } from "@app/store";

export default defineComponent({
  name: "Layout",
  components: {
    BaseLogo,
    RepoDropDown,
    MetaInfo,
  },
  setup() {
    const store = useStore();
    return {
      currentRepository: computed(() => store.state.appState.currentRepository),
    };
  },
});
</script>

<style lang="scss" scoped>
.Header {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: max-content;
  align-items: center;
  gap: 40px;
  border-bottom: 1px solid #f0f2f3;
  padding: 0 34px;
}
</style>
