<template>
  <div class="FileGridRow">
    <div
      v-for="(item, fileIndex) in files"
      :key="fileIndex"
      class="FileGridRow-Elem"
    >
      <div
        v-for="(value, key, index) in item"
        :key="index"
        class="FileGridRow-Item"
        :class="{folder: key === 'folder'}"
      >
        {{ value }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      files: [{
        folder: 'api',
        commit: '123csadf2',
        message: 'commit message',
        committer: 'Alex',
        updated: '4s ago'
      }, {}, {}]
    }
  }
}
</script>

<style scoped>

</style>
