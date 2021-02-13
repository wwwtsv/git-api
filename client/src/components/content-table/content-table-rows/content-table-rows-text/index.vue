<template>
  <div class="ContentTableRowsText" :class="{ 'ContentTable-Text_committer': key === 'committer' }">
    {{ content }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ContentTableRowsText",
  props: {
    content: String,
  },
});
</script>

<style lang="scss" scoped>
.ContentTableRowsText {
  max-width: 920px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  &_committer {
    &:first-letter {
      color: #ff4f49;
    }
  }
}
</style>
