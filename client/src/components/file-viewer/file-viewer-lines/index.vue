<template>
  <div class="FileViewerLines">
    <div v-for="n in rows" :key="n" class="FileViewerLines-Line">
      {{ n }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "FileViewerLines",
  props: {
    rows: Number,
  },
});
</script>

<style lang="scss" scoped></style>
