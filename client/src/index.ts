// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { createApp } from "vue";
import router from '@app/routes/index';
import store, { key } from '@app/store/index';
import App from "@app/app.vue";

export const app = createApp(App);

if ("__VUE_DEVTOOLS_GLOBAL_HOOK__" in window) {
  window.__VUE_DEVTOOLS_GLOBAL_HOOK__.Vue = app;
}

app
  .use(store, key)
  .use(router)
  .mount('#app')

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://www.snowpack.dev/concepts/hot-module-replacement
if (import.meta.hot) {
  import.meta.hot.accept();
  import.meta.hot.dispose(() => {
    app.unmount();
  });
}
