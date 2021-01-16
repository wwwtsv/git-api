<template>
  <div class="LastCommit">
    Last commit
    <router-link class="LastCommit-Link" :to="{ path: `${lastCommit}` }">
      {{ lastCommit }}
    </router-link>
    on
    <router-link class="LastCommit-Link" :to="{ path: `${lastCommitDate}` }">
      {{ lastCommitDate }}
    </router-link>
    by
    <div class="LastCommit-Committer">
      {{ lastCommitAuthor }}
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "LastCommit",
  data() {
    return {
      lastCommit: "q3347435",
      lastCommitDate: "20 Oct 2017 12:24",
      lastCommitAuthor: "robot",
    };
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
  }
  &-Committer {
    &:first-letter {
      color: #ff4f49;
    }
  }
}
</style>
