<template>
  <h1 class="CurrentDirectory">
    {{ branch }}
  </h1>
</template>

<script>
import { defineComponent } from 'vue';

const CurrentDirectory = defineComponent({
  data() {
    return {
      branch: 'arcadia'
    }
  }
})

export default CurrentDirectory
</script>

<style lang="scss" scoped>
.CurrentDirectory {
  font-size: 24px;
}
</style>
