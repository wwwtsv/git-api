<template>
  <div class="HistoryViewerCommit">
    <div class="HistoryViewerCommit-Image">
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="20" fill="#EBF6FD" />
        <path
          d="M12 12V18.4H15.29C15.395 17.5475 15.62 16.4575 16.09 16.03C16.5287 15.6312 17.5775 15.4188 18.4 15.31V12H12ZM19.52 15.84C19.1362 15.84 17.0012 16.0625 16.52 16.5C15.9962 16.9762 15.84 19.2862 15.84 19.52C15.84 19.8675 16.025 22.045 16.5 22.52C16.87 22.9262 18.3387 23.1075 19.09 23.17C19.2312 22.1362 19.695 21.185 20.44 20.44C21.185 19.695 22.1362 19.2312 23.17 19.09C23.105 18.3325 22.915 16.895 22.54 16.52C22.0638 15.9962 19.7537 15.84 19.52 15.84ZM23.84 19.68C22.7225 19.68 21.6725 20.1075 20.89 20.89C20.1075 21.6725 19.68 22.7225 19.68 23.84C19.68 24.9575 20.1075 26.0075 20.89 26.79C21.6725 27.5725 22.7225 28 23.84 28C24.9575 28 26.0075 27.5725 26.79 26.79C27.5725 26.0075 28 24.9575 28 23.84C28 22.7225 27.5725 21.6725 26.79 20.89C26.0075 20.1075 24.9575 19.68 23.84 19.68Z"
          fill="#FF5668"
        />
      </svg>
    </div>
    <div class="HistoryViewerCommit-Content">
      <p class="HistoryViewerCommit-Title">
        {{ commit.name }}
      </p>
      <p class="HistoryViewerCommit-Description">
        {{ commit.body }}
      </p>
      <div class="HistoryViewerCommit-Hash">
        {{ commit.hash }}
      </div>
      <div class="HistoryViewerCommit-Committer">
        {{ commit.committer }}
      </div>
      <div class="HistoryViewerCommit-Date">
        {{ commit.date }}
      </div>
    </div>
    <div class="HistoryViewerCommit-LargeHash">
      {{ commit.largeHash }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "HistoryViewerCommit",
  props: {
    commit: Object,
  },
});
</script>

<style lang="scss" scoped></style>
