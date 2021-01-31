<template>
  <div class="HistoryViewer">
    <div class="HistoryViewer-Days">
      <history-viewer-day v-for="(day, key, index) in days" :key="index" :day="day" />
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
    days: Object,
  },
});
</script>

<style lang="scss" scoped></style>
