<template>
  <div class="Loading">
    <span class="Loading-Spinner"></span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "BaseLoading",
});
</script>

<style lang="scss" scoped>
.Loading {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  backdrop-filter: blur(8px);
  &-Spinner {
    width: 28px;
    height: 28px;
    border: 2px solid transparent;
    border-radius: 50%;
    animation: spin 1s infinite linear;
  }
}

@keyframes spin {
  from {
    border-top-color: #fc0;
    border-left-color: #fc0;
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
