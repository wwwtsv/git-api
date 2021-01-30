<template>
  <div class="HistoryViewerDay">
    <history-viewer-commit v-for="commit in days" :key="commit.id" :commit="commit" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HistoryViewerCommit from "@components/history-viewer/history-viewer-commit/index.vue";

export default defineComponent({
  name: "HistoryViewerDay",
  components: { HistoryViewerCommit },
  props: {
    day: Array,
  },
});
</script>

<style lang="scss" scoped></style>
