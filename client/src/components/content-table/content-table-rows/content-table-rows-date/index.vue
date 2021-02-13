<template>
  <div class="ContentTableRowsDate">
    <div class="ContentTableRowsDate-Text">
      {{ content }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ContentTableRowsDate",
  props: {
    content: String,
  },
});
</script>

<style lang="scss" scoped></style>
