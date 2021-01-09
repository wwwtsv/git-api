<template>
  <div class="BaseTabs">
    <menu class="BaseTabs-Menu">
      <ul class="BaseTabs-List">
        <li
          v-for="(tab, index) in tabs"
          :key="index"
          class="BaseTabs-Elem"
          :class="{ 'BaseTabs-Elem_active': tab.isActive }"
        >
          {{ tab.name }}
        </li>
      </ul>
    </menu>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

const BaseTabs = defineComponent({
  data() {
    return {
      tabs: [{ name: 'Files', isActive: true}, { name: 'Branches', isActive: false}]
    }
  }
});

export default BaseTabs;
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
    border-bottom: 1px solid #E5E5E5;
  }
  &-Elem {
    position: relative;
    cursor: pointer;
    color: #7F8285;
    font-size: 16px;
    text-transform: uppercase;
    &_active {
      color: #000;
      &:before {
        content: '';
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 3px;
        background: #FF4F49;
      }
    }
  }
}
</style>
