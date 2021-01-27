<template>
  <div class="LastCommit">
    Last commit
    <router-link class="LastCommit-Link" :to="{ path: `` }">
      {{ lastCommit.hash }}
    </router-link>
    on
    <router-link class="LastCommit-Link" :to="{ path: `` }">
      {{ lastCommit.date }}
    </router-link>
    by
    <div class="LastCommit-Committer">
      {{ lastCommit.committer }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { AppStateActions } from "@app/store/modules/app-state/types/app-state";
import { useStore } from "@app/store";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "LastCommit",
  props: {
    lastCommit: {
      type: Object as PropType<{
        hash: string;
        date: string;
        committer: string;
      }>,
    },
  },
});
</script>

<style lang="scss" scoped>
.LastCommit {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: max-content;
  gap: 3px;
  color: #000000;
  &-Link {
    color: #1774e9;
    &:hover {
      color: darken(#1774e9, 18);
    }
  }
  &-Committer {
    &:first-letter {
      color: #ff4f49;
    }
  }
}
</style>
