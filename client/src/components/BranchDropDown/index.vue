<template>
  <div class="BranchDropDown">
    <button class="BranchDropDown-Button">
      {{ currentBranch }}
    </button>
    <ul class="BranchDropDown-List">
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

<script>
import { defineComponent } from 'vue';

const BranchDropDown = defineComponent({
  data() {
    return {
      branchList: ['thunk', 'master', 'main'],
      currentBranch: 'thunk'
    }
  }
})

export default BranchDropDown
</script>

<style scoped>

</style>
