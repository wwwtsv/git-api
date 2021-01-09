<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
const App = defineComponent({});

export default App;
</script>

<style lang="scss">
*, :before, :after {
  box-sizing: border-box;
  font-family: sans-serif;
}
body {
  margin: 0;
}
:link {
  color: #1774E9;
  text-decoration: none;
  transition: ease 0.2s;
  &:hover {
    color: darken(#1774E9, 18)
  }
}

</style>
