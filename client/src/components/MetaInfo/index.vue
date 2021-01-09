<template>
  <div class="MetaInfo">
    <span>Trade secrets of Yandex LLC, 16, LevTolstoy Str., Moscow, Russia, 119021</span>
    <span>UI 0.1.15 © 2007—2019 Yandex</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

const MetaInfo = defineComponent({});

export default MetaInfo;
</script>

<style lang="scss" scoped>
.MetaInfo {
  display: grid;
  grid-auto-flow: column;
  justify-content: space-between;
  padding: 18px 20px;
  border-top: 1px solid #F0F2F3;
  color: #7F8285;
  font-size: 13px;
}
</style>
