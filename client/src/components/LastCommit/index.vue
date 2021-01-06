<template>
  <div class="LastCommit">
    Last commit {{ lastCommit }} on {{ lastCommitDate }} by {{ lastCommitAuthor }}
  </div>
</template>

<script>
export default {
  data() {
    return {
      lastCommit: 'q3347435',
      lastCommitDate: '20 Oct 2017 12:24',
      lastCommitAuthor: 'robot',
    }
  }
}
</script>

<style scoped>

</style>
