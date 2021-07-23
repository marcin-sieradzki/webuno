import App from './App.vue';
import PrimeVue from 'primevue/config';
import { createApp } from 'vue';
import { routes } from './routes.js';
import { createRouter, createWebHistory } from 'vue-router';
import './tailwind.css';
import 'primevue/resources/themes/vela-purple/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Dialog from 'primevue/dialog';
import Avatar from 'primevue/avatar';
import ProgressSpinner from 'primevue/progressspinner';
const app = createApp(App);

app.component('Button', Button);
app.component('InputText', InputText);
app.component('Dialog', Dialog);
app.component('Avatar', Avatar);
app.component('ProgressSpinner', ProgressSpinner);

const router = createRouter({
  history: createWebHistory(),
  routes,
});
app.use(PrimeVue);
app.use(router);
app.mount('#app');
