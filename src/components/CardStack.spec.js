import { mount } from '@cypress/vue';
import CardStack from '@/components/Table/CardStack.vue';
import '@/tailwind.css';
describe('CardStack', () => {
  it('Does not allow interaction when disabled', () => {
    mount(CardStack, { props: { disabled: true } });
    console.log('test');
  });
});
