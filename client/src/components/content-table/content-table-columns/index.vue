<template>
  <div
    class="ContentTable-Columns"
    :class="{
      'ContentTable-Columns_tree': listType === 'tree',
      'ContentTable-Columns_branches': listType === 'branches',
    }"
  >
    <div v-for="(item, index) in columns" :key="index">
      {{ item }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "ContentTableColumns",
  props: {
    columns: Array,
    listType: Boolean,
  },
});
</script>

<style lang="scss" scoped>
.ContentTable {
  &-Columns {
    display: grid;
    grid-auto-flow: column;
    padding: 8px 0;
    color: #b8bec3;
    font-size: 14px;
    border-bottom: 1px solid #e5e5e5;
    &_tree {
      grid-template-columns: 14vw 8vw 23vw 12vw;
      gap: 5vw;
      > div:last-child {
        text-align: end;
      }
    }
    &_branches {
      grid-template-columns: 1fr auto;
      gap: unset;
    }
  }
}
</style>
