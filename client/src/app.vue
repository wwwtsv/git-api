<template>
  <router-view />
</template>

<script lang="ts">
import { head } from "lodash";
import { defineComponent, onBeforeMount } from "vue";
import { useStore } from "@app/store";
import { AppStateActions } from "@app/store/modules/types/app-state";
import { useRouter } from "vue-router";
export default defineComponent({
  name: "App",
  setup() {
    const store = useStore();
    const router = useRouter();
    onBeforeMount(async () => {
      await store.dispatch(AppStateActions.GetRepositoryList);
      const firstRepo = head(store.state.appState.repositoryList);
      if (firstRepo) {
        await router.push(`/file-list/${firstRepo}`);
      }
    });
  },
});
</script>

<style lang="scss">
*,
:before,
:after {
  box-sizing: border-box;
  font-family: sans-serif;
}
body {
  margin: 0;
}
::selection {
  background: rgba(#ff4f49, 0.2);
}
:link {
  color: #1774e9;
  text-decoration: none;
  transition: ease 0.2s;
  &:hover {
    color: darken(#1774e9, 18);
  }
}
</style>
