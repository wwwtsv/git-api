<template>
  <div class="LastCommit">
    Last commit {{ lastCommit }} on {{ lastCommitDate }} by {{ lastCommitAuthor }}
  </div>
</template>

<script>
import { defineComponent } from 'vue';

const LastCommit = defineComponent({
  data() {
    return {
      lastCommit: 'q3347435',
      lastCommitDate: '20 Oct 2017 12:24',
      lastCommitAuthor: 'robot',
    }
  }
})

export default LastCommit;
</script>

<style scoped>

</style>
