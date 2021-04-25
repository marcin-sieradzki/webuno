import App from "./App.vue";
import PrimeVue from "primevue/config";
import { createApp } from "vue";
import { routes } from "./routes.js";
import { createRouter, createWebHistory } from "vue-router";
import "./tailwind.css";
import "primevue/resources/themes/arya-green/theme.css";
import "primevue/resources/primevue.min.css";
import "primeicons/primeicons.css";

import Button from "primevue/button";
import InputText from "primevue/inputtext";

const app = createApp(App);

app.component("Button", Button);
app.component("InputText", InputText);

const router = createRouter({
  history: createWebHistory(),
  routes,
});
app.use(PrimeVue);
app.use(router);
app.mount("#app");
