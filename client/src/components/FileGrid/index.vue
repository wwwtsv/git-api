<template>
  <div class="FileGrid">
    <base-tabs />
    <div class="FileGrid-Files">
      <file-grid-rows />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import BaseTabs from '@components/BaseTabs/index.vue';
import FileGridRows from '@components/FileGridRows/index.vue';

const FileGrid = defineComponent({
  components: {
    BaseTabs,
    FileGridRows,
  }
})

export default FileGrid;
</script>

<style scoped>

</style>
