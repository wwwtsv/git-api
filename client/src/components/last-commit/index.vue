<template>
  <div class="LastCommit">
    Last commit
    <router-link class="LastCommit-Link" :to="{ path: `${hash}` }">
      {{ lastCommit.hash }}
    </router-link>
    on
    <router-link class="LastCommit-Link" :to="{ path: `${message}` }">
      {{ lastCommit.date }}
    </router-link>
    by
    <div class="LastCommit-Committer">
      {{ lastCommit.committer }}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from "vue";

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
  /*setup(props) {
    watch(props);
  },*/
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
  }
  &-Committer {
    &:first-letter {
      color: #ff4f49;
    }
  }
}
</style>
