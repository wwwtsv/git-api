<template>
  <div class="RepoDropDown" :class="{ active: isActive }">
    <button class="RepoDropDown-Button" @click="isOpen = !isOpen">
      <span class="RepoDropDown-BoldText">Repository</span> {{ currentRepository }}
    </button>
    <ul v-if="isOpen" class="RepoDropDown-List">
      <li v-for="(repo, index) in repositories" :key="index" class="RepoDropDown-Elem">
        {{ repo }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useStore } from "@app/store";

export default defineComponent({
  setup() {
    const isOpen = ref(false);
    const { currentRepository, repositoryList } = useStore().state.appState;
    return {
      currentRepository,
      repositoryList,
      isOpen,
    };
  },
});
</script>

<style lang="scss" scoped>
.RepoDropDown {
  &-Button {
    position: relative;
    height: 60px;
    padding: 0;
    border: none;
    background: none;
    cursor: pointer;
    &:after {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 3px;
      background: #ff4f49;
    }
    &:before {
      content: "";
      position: absolute;
      top: 0;
      bottom: 0;
      right: -16px;
      width: 0;
      height: 0;
      margin: auto;
      border-style: solid;
      border-width: 5px 5px 0 5px;
      border-color: #060708 transparent transparent transparent;
    }
  }
  &-BoldText {
    font-weight: bold;
  }
}
</style>