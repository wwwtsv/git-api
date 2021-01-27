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

<style lang="scss" scoped>
.FileViewerLines {
  font-size: 12px;
  text-align: right;
  padding: 0 28px;
  line-height: 24px;
  color: #999999;
}
</style>
