<template>
  <div class="Layout">
    <transition name="slide">
      <div v-if="error" class="Layout-Error">
        {{ error }}
      </div>
    </transition>
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
import { computed, defineComponent, ref } from "vue";
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
      error: computed(() => store.state.appState.error),
    };
  },
});
</script>

<style lang="scss" scoped>
.Layout {
  position: relative;
  &-Error {
    position: absolute;
    padding: 12px;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 32px;
    border-bottom-right-radius: 4px;
    border-bottom-left-radius: 4px;
    background-color: #ff4f49;
    color: #fff;
    z-index: 1000;
  }
}
.Header {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: max-content;
  align-items: center;
  gap: 40px;
  border-bottom: 1px solid #f0f2f3;
  padding: 0 34px;
}

.slide-enter-active {
  animation: slide-in 0.2s ease-out forwards;
}

.slide-leave-active {
  animation: slide-in 0.2s reverse ease-in both;
}

@keyframes slide-in {
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
}
</style>
