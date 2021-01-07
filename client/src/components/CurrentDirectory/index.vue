<template>
  <div class="CurrentDirectory">
    {{ branch }}
  </div>
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

<style scoped>

</style>
