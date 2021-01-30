<template>
  <div class="HistoryViewer">
    <div class="HistoryViewer-Days">
      <history-viewer-day v-for="(day, i) in days" :key="i" :day="day" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import HistoryViewerDay from "@components/history-viewer/history-viewer-day/index.vue";

export default defineComponent({
  name: "HistoryViewer",
  components: { HistoryViewerDay },
  props: {
    days: Array,
  },
});
</script>

<style lang="scss" scoped></style>
