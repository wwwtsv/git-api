<template>
  <div class="HistoryViewerDay">
    <div class="HistoryViewerDay-Title">
      {{ currentDay }}
    </div>
    <history-viewer-commit v-for="(commit, i) in day" :key="i" :commit="commit" />
  </div>
</template>

<script lang="ts">
import { DateTime } from "luxon";
import { computed, defineComponent, PropType, ref } from "vue";
import HistoryViewerCommit from "@components/history-viewer/history-viewer-commit/index.vue";

export default defineComponent({
  name: "HistoryViewerDay",
  components: { HistoryViewerCommit },
  props: {
    day: {
      type: Array as PropType<
        Array<{
          title: string;
          hash: string;
          fullHash: string;
          relativeTime: string;
          committer: string;
          message: string;
          date: string;
        }>
      >,
      default: () => [
        {
          title: "empty",
          hash: "empty",
          fullHash: "empty",
          relativeTime: "empty",
          committer: "empty",
          message: "empty",
          date: "empty",
        },
      ],
    },
  },
  setup(props) {
    const currentDay = ref(DateTime.fromJSDate(new Date(props.day[0].date)).toFormat("MMM dd"));

    return {
      currentDay: computed(() => currentDay.value),
    };
  },
});
</script>

<style lang="scss" scoped>
.HistoryViewerDay {
  padding: 16px 0;
}
</style>
