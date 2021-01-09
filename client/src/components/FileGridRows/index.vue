<template>
  <div class="FileGridRows">
    <div class="FileGridRows-Columns">
      <div
        v-for="(item, rowIndex) in rows"
        :key="rowIndex"
      >
        {{ item }}
      </div>
    </div>
    <div class="FileGridRows-Files">
      <div
        v-for="(item, fileIndex) in files"
        :key="fileIndex"
        class="FileGridRows-Elem"
      >
        <div
          v-for="(value, key, index) in item"
          :key="index"
          class="FileGridRows-Item"
          :class="{'FileGridRows-Item_folder': key === 'folder'}"
        >
          <div
            v-if="key === 'folder'"
            class="FileGridRows-Folder"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="9"
              viewBox="0 0 12 9"
              fill="none"
            >
              <path
                d="M10.875 1.5H6.375L4.875 0H1.125C0.492188 0 0 0.515625 0 1.125V7.875C0 8.50781 0.492188 9 1.125 9H10.875C11.4844 9 12 8.50781 12 7.875V2.625C12 2.01562 11.4844 1.5 10.875 1.5Z"
                fill="black"
              />
            </svg>
          </div>
          <router-link
            v-if="key === 'commit'"
            :to="{ path: `/commit/${value}` }"
          >
            {{ value }}
          </router-link>
          <div v-else>
            {{ value }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

const FileGridRows = defineComponent({
  data() {
    return {
      rows: [
        'Name',
        'Last Commit',
        'Commit message',
        'Committer',
        'Update'
      ],
      files: [
        {
        folder: 'api',
        commit: '123csadf2',
        message: 'commit message',
        committer: 'Alex',
        updated: '4s ago'
      }, {
        folder: 'api',
        commit: '123csadf2',
        message: 'commit message',
        committer: 'Alex',
        updated: '4s ago'
      }
      ]
    }
  }
});

export default FileGridRows;
</script>

<style lang="scss" scoped>
.FileGridRows {
  &-Elem {
    display: grid;
    grid-auto-flow: column;
    justify-content: space-between;
    padding: 16px 0;
    border-bottom: 1px solid #F2F2F2;
    &:last-child {
      border-bottom: none;
    }
  }
  &-Item {
    &_folder {
      display: grid;
      grid-auto-flow: column;
      gap: 8px;
    }
  }
  &-Columns {
    display: grid;
    grid-auto-flow: column;
    justify-content: space-between;
    padding: 8px 0;
    color: #B8BEC3;
    font-size: 14px;
    border-bottom: 1px solid #E5E5E5;
  }
}
</style>
