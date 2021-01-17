import { InjectionKey } from "vue";
import { createStore, Store as VuexStore, useStore as baseUseStore } from "vuex";
// Modules
import appState from "@app/store/modules/app-state/app-state";
import { AppState } from "@app/store/modules/app-state/types/app-state";

export interface RootState {
  appState: AppState;
}

export const key: InjectionKey<VuexStore<RootState>> = Symbol();

const store = createStore<RootState>({
  modules: {
    appState,
  },
});

export const useStore = (): VuexStore<RootState> => {
  return baseUseStore(key);
};

export default store;
