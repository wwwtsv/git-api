<template>
  <h1 class="CurrentDirectory">
    {{ lastPath || currentRepository }}
  </h1>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "CurrentDirectory",
  props: {
    currentRepository: { type: String as PropType<string> },
    lastPath: { type: String as PropType<string> },
  },
});
</script>

<style lang="scss" scoped>
.CurrentDirectory {
  font-size: 24px;
}
</style>
