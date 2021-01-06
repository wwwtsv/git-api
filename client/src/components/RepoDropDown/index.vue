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
export default {
  data() {
    return {
      repositories: ["Arc", "Arc2", "Etc"],
    };
  },
};
</script>

<style scoped></style>
