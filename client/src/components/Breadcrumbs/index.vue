<template>
  <div class="Breadcrumbs">
    <ul class="Breadcrumbs-List">
      <li
        v-for="(elem, index) in breadcrumbs"
        :key="index"
        class="Breadcrumbs-Elem"
        :class="{'Breadcrumbs-Elem_active': isActive}"
      >
        {{ elem }}
      </li>
    </ul>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

const Breadcrumbs = defineComponent({
  data() {
    return {
      breadcrumbs: ['arcadia', 'api', 'ci']
    }
  }
});

export default Breadcrumbs
</script>

<style scoped></style>
