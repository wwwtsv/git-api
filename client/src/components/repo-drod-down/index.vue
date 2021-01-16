<template>
  <div class="RepoDropDown">
    <button class="RepoDropDown-Button" :class="{ 'RepoDropDown-Button_active': isOpen }" @click="isOpen = !isOpen">
      <span class="RepoDropDown-BoldText">Repository</span> {{ currentRepository }}
    </button>
    <ul v-if="isOpen" class="RepoDropDown-List">
      <li v-for="(repo, index) in repositoryList" :key="index" class="RepoDropDown-Elem">
        <router-link
          v-if="routerRepository !== repo"
          class="RepoDropDown-Link"
          :to="{ path: `${route.path}/${repo}` }"
          >{{ repo }}</router-link
        >
        <p v-else class="RepoDropDown-Picked">{{ repo }}</p>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { last } from "lodash";
import { defineComponent, ref, computed } from "vue";
import { useStore } from "@app/store";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "RepoDropDown",
  setup() {
    const isOpen = ref(false);
    const route = useRoute();
    const state = useStore().state.appState;
    const routerRepository = ref(last(route.fullPath.split("/")));
    return {
      currentRepository: computed(() => state.currentRepository),
      repositoryList: computed(() => state.repositoryList),
      routerRepository,
      isOpen,
      route,
    };
  },
});
</script>

<style lang="scss" scoped>
.RepoDropDown {
  position: relative;
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
      transition: ease 0.2s;
    }
    &_active {
      &:before {
        transform: rotate(180deg);
      }
    }
  }
  &-BoldText {
    font-weight: bold;
  }
  &-List {
    position: absolute;
    min-width: 266px;
    padding: 14px 22px;
    margin: 0;
    list-style-type: none;
    background: #fff;
    box-shadow: 0 4px 16px rgba(53, 73, 93, 0.2);
  }
  &-Link {
    color: #000;
    font-size: 14px;
    &:hover {
      color: #ff4f49;
    }
  }
  &-Picked {
    margin: 0;
    padding: 0;
    color: #000;
    font-size: 14px;
  }
}
</style>
