<template>
  <div class="FileGrid">
    <base-tabs />
    <div class="FileGrid-Files">
      <file-grid-rows />
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import BaseTabs from "@components/base-tabs/index.vue";
import FileGridRows from "@components/file-grid-rows/index.vue";

export default defineComponent({
  name: "FileGrid",
  components: {
    BaseTabs,
    FileGridRows,
  },
});
</script>

<style scoped></style>
