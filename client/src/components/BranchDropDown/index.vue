<template>
  <div class="BranchDropDown">
    <button class="BranchDropDown-Button">
      {{ currentBranch }}
    </button>
    <ul
      v-if="isOpen"
      class="BranchDropDown-List"
    >
      <li
        v-for="(branch, index) in branchList"
        :key="index"
        class="BranchDropDown-Elem"
      >
        {{ branch }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

const BranchDropDown = defineComponent({
  data() {
    return {
      branchList: ['thunk', 'master', 'main'],
      currentBranch: 'thunk',
      isOpen: false,
    }
  }
})

export default BranchDropDown
</script>

<style lang="scss" scoped>
.BranchDropDown {
  &-Button {
    position: relative;
    font-size: 24px;
    padding: 0;
    margin: 0;
    border: none;
    background: none;
    color: #7F8285;
    cursor: pointer;
    &:before {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      right: -16px;
      width: 0;
      height: 0;
      margin: auto;
      border-style: solid;
      border-width: 5px 5px 0 5px;
      border-color: #7F8285 transparent transparent transparent;
    }
  }
}
</style>
