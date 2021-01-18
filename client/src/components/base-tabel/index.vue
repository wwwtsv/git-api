<template>
  <div class="BaseTable">
    <div
      class="BaseTable-Columns"
      :class="{ 'BaseTable-Columns_file': listType === 'file', 'BaseTable-Columns_branch': listType === 'branch' }"
    >
      <div v-for="(item, index) in columns" :key="index">
        {{ item }}
      </div>
    </div>
    <div class="BaseTable-Rows">
      <div v-if="rows.length">
        <div
          v-for="(item, index) in rows"
          :key="index"
          class="BaseTable-Elem"
          :class="{ 'BaseTable-Elem_file': listType === 'file', 'BaseTable-Elem_branch': listType === 'branch' }"
        >
          <div
            v-for="(value, key, i) in item"
            :key="i"
            class="BaseTable-Item"
            :class="{ 'BaseTable-Item_folder': key === 'folder', 'BaseTable-Item_file': listType === 'file' }"
          >
            <div v-if="key === 'folder'" class="BaseTable-Folder">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="9" viewBox="0 0 12 9" fill="none">
                <path
                  d="M10.875 1.5H6.375L4.875 0H1.125C0.492188 0 0 0.515625 0 1.125V7.875C0 8.50781 0.492188 9 1.125 9H10.875C11.4844 9 12 8.50781 12 7.875V2.625C12 2.01562 11.4844 1.5 10.875 1.5Z"
                  fill="black"
                />
              </svg>
            </div>
            <router-link v-if="key === 'hash'" :to="{ path: `/commit/${value}` }">
              {{ value }}
            </router-link>
            <div v-else class="BaseTable-Text">
              {{ value }}
            </div>
          </div>
        </div>
      </div>
      <base-loading v-else />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import BaseLoading from "@components/base-loading/index.vue";

export default defineComponent({
  name: "BaseTable",
  components: { BaseLoading },
  props: {
    columns: Array,
    rows: Array,
    listType: { type: String as PropType<"file" | "branch">, default: () => "file" },
  },
});
</script>

<style lang="scss" scoped>
.BaseTable {
  &-Rows {
    position: relative;
    min-height: 300px;
  }
  &-Elem {
    display: grid;
    grid-auto-flow: column;
    padding: 16px 0;
    border-bottom: 1px solid #f2f2f2;
    &:last-child {
      border-bottom: none;
    }
    &_file {
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 60px;
    }
  }
  &-Item {
    &_folder {
      display: grid;
      grid-auto-flow: column;
      gap: 8px;
    }
    &_file {
      &:last-child {
        > div {
          text-align: end;
        }
      }
    }
  }
  &-Text {
    max-width: 920px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  &-Columns {
    display: grid;
    grid-auto-flow: column;
    justify-content: space-between;
    padding: 8px 0;
    color: #b8bec3;
    font-size: 14px;
    border-bottom: 1px solid #e5e5e5;
    &_file {
      grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
      gap: 60px;
      > div:last-child {
        text-align: end;
      }
    }
  }
}
</style>
