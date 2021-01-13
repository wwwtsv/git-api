<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "@app/store";
export default defineComponent({
  setup() {
    const store = useStore();
    store.dispatch("GetRepositoryList");
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
:link {
  color: #1774e9;
  text-decoration: none;
  transition: ease 0.2s;
  &:hover {
    color: darken(#1774e9, 18);
  }
}
</style>
