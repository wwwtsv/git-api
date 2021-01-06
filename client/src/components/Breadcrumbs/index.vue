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
export default {
  data() {
    return {
      breadcrumbs: ['arcadia', 'api', 'ci']
    }
  }
};
</script>

<style scoped></style>
