<template>
  <div class="BaseTabs">
    <menu class="BaseTabs-Menu">
      <ul class="BaseTabs-List">
        <li
          v-for="(tab, index) in tabs"
          :key="index"
          class="BaseTabs-Elem"
          :class="{ 'BaseTabs-Elem_active': tab.isActive }"
          @click="changeTabs(tab.id)"
        >
          {{ tab.name }}
        </li>
      </ul>
    </menu>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref } from "vue";

export default defineComponent({
  name: "BaseTabs",
  props: {
    initialTabs: {
      type: Array as PropType<Array<{ id: number; name: string; isActive: boolean }>>,
      default: () => [{ id: 0, name: "Tab", isActive: true }],
    },
  },
  setup(props) {
    const tabs = ref(props.initialTabs);
    const changeTabs = (id) =>
      (tabs.value = tabs.value.map((tab) => {
        if (tab.id !== id) {
          tab.isActive = false;
          return tab;
        } else {
          tab.isActive = true;
          return tab;
        }
      }));

    return {
      changeTabs,
      tabs: computed(() => tabs.value),
    };
  },
});
</script>

<style lang="scss" scoped>
.BaseTabs {
  &-Menu {
    margin: 0;
    padding: 18px 0 10px 0;
  }
  &-List {
    height: 30px;
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: max-content;
    gap: 32px;
    margin: 0;
    padding: 0;
    list-style-type: none;
    border-bottom: 1px solid #e5e5e5;
  }
  &-Elem {
    position: relative;
    cursor: pointer;
    color: #7f8285;
    font-size: 16px;
    text-transform: uppercase;
    &_active {
      color: #000;
      &:before {
        content: "";
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 3px;
        background: #ff4f49;
      }
    }
  }
}
</style>
