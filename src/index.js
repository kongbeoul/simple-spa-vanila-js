import { createStore } from "./core/store.js";
import reducer from "./reducer/index.js";
import App from "./App.js";

const store = createStore(reducer);

new App(document.getElementById("app"), store);