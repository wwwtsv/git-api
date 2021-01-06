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
export default {
  data() {
    return {
      branchList: ['thunk', 'master', 'main'],
      currentBranch: 'thunk'
    }
  }
}
</script>

<style scoped>

</style>
