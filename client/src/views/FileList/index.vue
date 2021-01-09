<template>
  <div class="FileList">
    <breadcrumbs />
    <div class="FileList-Meta">
      <current-directory />
      <branch-drop-down />
    </div>
    <div class="FileList-LastCommit">
      <last-commit />
    </div>
    <div class="FileList-Table">
      <file-grid />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Breadcrumbs from '@components/Breadcrumbs/index.vue'
import CurrentDirectory from '@components/CurrentDirectory/index.vue'
import BranchDropDown from '@components/BranchDropDown/index.vue'
import FileGrid from '@components/FileGrid/index.vue'
import LastCommit from '@components/LastCommit/index.vue'

const FileList = defineComponent({
  components: {
    Breadcrumbs,
    CurrentDirectory,
    BranchDropDown,
    FileGrid,
    LastCommit
  }
})

export default FileList;
</script>

<style lang="scss" scoped>
.FileList {
  padding: 0 32px;
  &-Meta {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: max-content;
    align-items: center;
    gap: 4px;
    padding-top: 12px;
  }
}
</style>
