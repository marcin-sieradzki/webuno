import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Dialog from 'primevue/dialog';
import Avatar from 'primevue/avatar';
import ProgressSpinner from 'primevue/progressspinner';
import type { App } from 'vue';

export function registerGlobalComponents(app: App): void {
  app.component('Button', Button);
  app.component('InputText', InputText);
  app.component('Dialog', Dialog);
  app.component('Avatar', Avatar);
  app.component('ProgressSpinner', ProgressSpinner);
}
