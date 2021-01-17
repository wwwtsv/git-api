<template>
  <div class="BranchDropDown">
    <button class="BranchDropDown-Button" @click="isOpen = !isOpen">
      {{ currentBranch }}
    </button>
    <ul v-if="isOpen" class="BranchDropDown-List">
      <li v-if="branchList.length === 0">
        <base-loading />
      </li>
      <li
        v-for="(branch, index) in branchList"
        :key="index"
        class="BranchDropDown-Elem"
        :class="{ 'BranchDropDown-Elem_active': currentBranch === branch.name }"
      >
        <span class="BranchDropDown-Name" :class="{ 'BranchDropDown-Name_active': currentBranch === branch.name }">{{
          branch.name
        }}</span>
        <span class="BranchDropDown-Time" :class="{ 'BranchDropDown-Time_active': currentBranch === branch.name }"
          >Last commit on {{ branch.time }}</span
        >
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { isEmpty } from "lodash";
import { defineComponent, ref, PropType, watch, computed } from "vue";
import { useStore } from "@app/store";
import { AppStateActions } from "@app/store/modules/app-state/types/app-state";
import BaseLoading from "@components/base-loading";

export default defineComponent({
  name: "BranchDropDown",
  components: {
    BaseLoading,
  },
  props: {
    currentBranch: { type: String as PropType<string> },
    currentRepository: { type: String as PropType<string> },
  },
  setup(props) {
    const isOpen = ref(false);
    const store = useStore();
    const branchList = computed(() => store.state.appState.branchList);

    watch([isOpen, branchList], async ([isOpen, branchList]) => {
      if (isOpen && isEmpty(branchList)) {
        await store.dispatch(AppStateActions.GetBranchList, { repo: props.currentRepository, allBranches: true });
      }
    });

    return {
      isOpen,
      branchList,
    };
  },
});
</script>

<style lang="scss" scoped>
.BranchDropDown {
  position: relative;
  &-Button {
    position: relative;
    font-size: 24px;
    padding: 0;
    margin: 0;
    border: none;
    background: none;
    color: #7f8285;
    cursor: pointer;
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
      border-color: #7f8285 transparent transparent transparent;
    }
  }
  &-List {
    position: absolute;
    display: grid;
    grid-auto-flow: row;
    padding: 2px 0;
    margin: 8px 0 0 0;
    width: 320px;
    height: 360px;
    overflow-y: auto;
    overflow-x: hidden;
    background: #fff;
    z-index: 100;
    box-shadow: 0 4px 16px rgba(53, 73, 93, 0.2);
    list-style-type: none;
    border-radius: 4px;
  }
  &-Elem {
    position: relative;
    display: grid;
    grid-auto-flow: row;
    gap: 8px;
    padding: 10px 12px;
    transition: background-color 0.2s;
    cursor: pointer;
    &:first-child {
      &:before {
        position: absolute;
        bottom: -6px;
        left: 50%;
        content: "";
        display: block;
        width: 296px;
        height: 1px;
        background: #e5e5e5;
        transform: translate(-50%);
      }
    }
    &:hover {
      background: #f4f5f6;
    }
    &_active {
      background: #4f4f4f;
      &:hover {
        background: #4f4f4f;
      }
    }
  }
  &-Name {
    font-size: 14px;
    color: #434445;
    &_active {
      color: #fff;
    }
  }
  &-Time {
    font-size: 13px;
    color: #7f8285;
    &_active {
      color: #e0e0e0;
    }
  }
}
</style>
