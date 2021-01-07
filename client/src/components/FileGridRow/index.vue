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
        <router-link
          v-if="key === 'commit'"
          :to="`/commit/${value}`"
        >
          {{ value }}
        </router-link>
        <div v-else>
          {{ value }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

const FileGridRow = defineComponent({
  data() {
    return {
      files: [{
        folder: 'api',
        commit: '123csadf2',
        message: 'commit message',
        committer: 'Alex',
        updated: '4s ago'
      }, {
        folder: 'api',
        commit: '123csadf2',
        message: 'commit message',
        committer: 'Alex',
        updated: '4s ago'
      }]
    }
  }
});

export default FileGridRow;
</script>

<style scoped>

</style>
