import { app } from "@app/index";
import { createStore } from "vuex";

const store = createStore({});

app.use(store);
