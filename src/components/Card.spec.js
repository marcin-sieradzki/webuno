import { mount } from '@cypress/vue';
import Card from '@/components/Card.vue';

const card = {
  id: 'a4bd716f-3fbe-4bde-a58a-4997d153541a',
  key: 'r0',
  symbol: '0',
  type: 'card',
  color: 'red',
  effect: null,
  playedBy: '',
  playedAt: '0001-01-01T00:00:00',
};

const playedCards = [
  {
    id: 'a4bd716f-3fbe-4bde-a58a-4997d153541b',
    key: 'r2',
    symbol: '2',
    type: 'card',
    color: 'red',
    effect: null,
    playedBy: '',
    playedAt: '0001-01-01T00:00:00',
  },
];

describe('Card', () => {
  it('Renders only the front when not reversed', async () => {
    await mount(Card, { props: { card: card, absolute: false } });
    cy.get('[data-test="Card"]').should('be.visible');
    cy.get('[data-test="Card-Front"]').should('be.visible');
    cy.get('[data-test="Card-Back"]').should('not.be.visible');
  });

  it('Renders only the back view when reversed', async () => {
    await mount(Card, { props: { card: card, reversed: true, absolute: false } });
    cy.get('[data-test="Card"]').should('be.visible');
    cy.get('[data-test="Card-Front"]').should('not.be.visible');
    cy.get('[data-test="Card-Back"]').should('be.visible');
  });

  it('Is test', async () => {
    await mount(Card, { props: { card: card, absolute: false, playedCards } });
    cy.get('[data-test="Card"]').should('be.visible');
    cy.get('[data-test="Card"]')
      .click()
      .vue()
      .then((wrapper) => {});
  });
});
