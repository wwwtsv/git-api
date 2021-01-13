import { InjectionKey } from "vue";
import { createStore, Store as VuexStore } from "vuex";
import appState from "@app/store/modules/app-state";

export interface RootState {
  version: string;
}

export const key: InjectionKey<VuexStore<RootState>> = Symbol();

const store = createStore<RootState>({
  modules: {
    appState,
  },
});

export default store;
