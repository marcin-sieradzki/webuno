import App from './App.vue';
import PrimeVue from 'primevue/config';
import { createApp } from 'vue';
import { router } from './router.js';

import { registerGlobalComponents } from '@/utils/globalComponentRegistrator';
import './tailwind.css';
import 'primevue/resources/themes/vela-purple/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

const app = createApp(App);

registerGlobalComponents(app);
app.use(PrimeVue);
app.use(router);
app.mount('#app');
