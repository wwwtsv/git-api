import { InjectionKey } from "vue";
import { createLogger, createStore, Store as VuexStore, useStore as baseUseStore } from "vuex";
import appState from "@app/store/modules/app-state";
import { AppState } from "@app/store/modules/types/app-state";

interface RootState {
  appState: AppState;
}

export const key: InjectionKey<VuexStore<RootState>> = Symbol();

const store = createStore({
  modules: {
    appState,
  },
  // @ts-ignore
  plugins: import.meta.mode === "development" ? [createLogger()] : [],
  strict: true,
  devtools: true,
});

export const useStore = () => {
  return baseUseStore(key);
};

export default store;
