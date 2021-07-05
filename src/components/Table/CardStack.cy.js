import { mount } from '@cypress/vue';
import CardStack from '@/components/Table/CardStack.vue';

describe('CardStack', () => {
  it('Does not allow interaction when disabled', async () => {
    await mount(CardStack, { props: { disabled: true } });
    cy.get('[data-test="CardStack-Card"]').should('be.visible');
  });
});
