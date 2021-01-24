<template>
  <div class="FileViewerCode">
    <pre>
      <code>
        {{ content }}
      </code>
    </pre>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "FileViewerCode",
  props: {
    content: String,
  },
});
</script>

<style lang="scss" scoped></style>
