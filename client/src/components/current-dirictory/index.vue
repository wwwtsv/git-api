<template>
  <h1 class="CurrentDirectory">
    {{ branch }}
  </h1>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      branch: "arcadia",
    };
  },
});
</script>

<style lang="scss" scoped>
.CurrentDirectory {
  font-size: 24px;
}
</style>
