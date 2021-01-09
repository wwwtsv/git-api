import { InjectionKey } from 'vue'
import { createStore, Store } from "vuex";
import appState, { AppState } from "@app/store/modules/app";

interface State {
  appState: AppState
}

export const key: InjectionKey<Store<State>> = Symbol()

const store = createStore<State>({
  modules: {
    appState
  }
});

export default store;
