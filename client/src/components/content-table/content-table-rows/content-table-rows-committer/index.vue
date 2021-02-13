<template>
  <div class="ContentTableRowsCommitter">
    <div class="ContentTableRowsCommitter-Text">
      {{ content }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ContentTableRowsCommitter",
  props: {
    content: String,
  },
});
</script>

<style lang="scss" scoped>
.ContentTableRowsCommitter {
  &-Text {
    max-width: 920px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    &:first-letter {
      color: #ff4f49;
    }
  }
}
</style>
