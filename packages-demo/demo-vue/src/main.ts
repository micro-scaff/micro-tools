import {
  createApp
} from "vue";
import {
  createPinia
} from "pinia";

import App from "./App.vue";
import router from "./router";

import "@mt-kit/style/reset";
import "@mt-kit/style/indivHtml";

import "element-plus/dist/index.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.mount("#app");
