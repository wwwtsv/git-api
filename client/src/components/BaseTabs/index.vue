<template>
  <div class="BaseTabs">
    <menu class="BaseTabs-Menu">
      <ul class="BaseTabs-List">
        <li
          v-for="(tab, index) in tabs"
          :key="index"
          class="BaseTabs-Elem"
        >
          {{ tab }}
        </li>
      </ul>
    </menu>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

const BaseTabs = defineComponent({
  data() {
    return {
      tabs: ['one', 'two', 'three']
    }
  }
});

export default BaseTabs;
</script>

<style scoped>

</style>
