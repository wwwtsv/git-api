<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useStore } from "@app/store";
import { AppStateActions, DeviceType } from "@app/store/modules/app-state/types/app-state";
export default defineComponent({
  name: "App",
  setup() {
    const store = useStore();
    if (window) {
      window.addEventListener("resize", () => {
        window.screen.availWidth >= 768
          ? store.dispatch(AppStateActions.SetDeviceType, DeviceType.Desktop)
          : store.dispatch(AppStateActions.SetDeviceType, DeviceType.Mobile);
      });
    }
  },
});
</script>

<style lang="scss">
*,
:before,
:after {
  box-sizing: border-box;
  font-family: sans-serif;
}
body {
  margin: 0;
}
::selection {
  background: rgba(#ff4f49, 0.2);
}
:link {
  color: #1774e9;
  text-decoration: none;
  transition: ease 0.2s;
  &:hover {
    color: darken(#1774e9, 18);
  }
}
</style>
