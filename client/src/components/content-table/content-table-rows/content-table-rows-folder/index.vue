<template>
  <div class="ContentTableRowsFolder">
    <div class="ContentTableRowsFolder-Icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="9" viewBox="0 0 12 9" fill="none">
        <path
          d="M10.875 1.5H6.375L4.875 0H1.125C0.492188 0 0 0.515625 0 1.125V7.875C0 8.50781 0.492188 9 1.125 9H10.875C11.4844 9 12 8.50781 12 7.875V2.625C12 2.01562 11.4844 1.5 10.875 1.5Z"
          fill="black"
        />
      </svg>
    </div>

    <router-link class="ContentTableRowsFolder-Link" :to="{ path: `${route.fullPath}/${content}` }">
      {{ content }}
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "ContentTableRowsFolder",
  props: {
    content: String,
  },
  setup() {
    const route = useRoute();
    return {
      route,
    };
  },
});
</script>

<style lang="scss" scoped>
.ContentTableRowsFolder {
  &-Icon {
    position: absolute;
    left: 4px;
  }
  &-Link {
    color: #000;
    transition: unset;
    &:hover {
      color: #1774e9;
      text-decoration: underline;
    }
    @media (max-width: 768px) {
      padding-left: 36px;
    }
  }
}
</style>
