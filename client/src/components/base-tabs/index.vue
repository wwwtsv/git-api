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
import { defineComponent } from "vue";

export default defineComponent({
  data() {
    return {
      tabs: [
        { name: "Files", isActive: true },
        { name: "Branches", isActive: false },
      ],
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