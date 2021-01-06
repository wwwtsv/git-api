// @ts-nocheck
import { createApp } from "vue";
import App from "./App.vue";

export const app = createApp(App);

if ("__VUE_DEVTOOLS_GLOBAL_HOOK__" in window) {
  window.__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue = app;
}

app.mount("#app");

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://www.snowpack.dev/concepts/hot-module-replacement
if (import.meta.hot) {
  import.meta.hot.accept();
  import.meta.hot.dispose(() => {
    app.unmount();
  });
}
