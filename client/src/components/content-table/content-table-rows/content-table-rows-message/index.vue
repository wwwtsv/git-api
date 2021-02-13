<template>
  <div class="ContentTableRowsMessage">
    <div class="ContentTableRowsMessage-Text">
      {{ content }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ContentTableRowsMessage",
  props: {
    content: String,
  },
});
</script>

<style lang="scss" scoped>
.ContentTableRowsMessage {
  &-Text {
    max-width: 920px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
