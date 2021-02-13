<template>
  <div class="ContentTableRowsHash">
    <router-link class="ContentTable-Link_commit" :to="{ path: `${route.fullPath}/${content}` }">
      {{ content }}
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "ContentTableRowsHash",
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

<style lang="scss" scoped></style>
