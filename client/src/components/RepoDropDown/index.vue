<template>
  <div
    class="RepoDropDown"
    :class="{active: isActive}"
  >
    <button class="RepoDropDown-Button">
      Repository {{ currentRepository }}
    </button>
    <ul
      v-if="isOpen"
      class="RepoDropDown-List"
    >
      <li
        v-for="(repo, index) in repositories"
        :key="index"
        class="RepoDropDown-Elem"
      >
        {{ repo }}
      </li>
    </ul>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

const RepoDropDown = defineComponent({
  data() {
    return {
      repositories: ["Arc", "Arc2", "Etc"],
    };
  },
})
export default RepoDropDown;
</script>

<style scoped></style>
