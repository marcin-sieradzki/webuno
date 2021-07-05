import { mount } from '@cypress/vue';
import Home from '@/views/Home.vue';

describe('Home.vue', () => {
  it('Mounts', () => {
    mount(Home);
  });
});
