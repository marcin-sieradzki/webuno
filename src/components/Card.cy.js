import { mount } from '@cypress/vue';
import Card from '@/components/Card.vue';
import { cardWithLongSymbol, blueCard, yellowCard, redCard, greenCard, inheritColorCard } from '@/mocks/cards';

describe('Card.vue', () => {
  it('Renders only the front when not reversed', () => {
    mount(Card, { props: { card: redCard } });
    cy.get('[data-test="Card-Front"]').should('be.visible');
    cy.get('[data-test="Card-Back"]').should('not.exist');
  });

  it('Renders only the back view when reversed', () => {
    mount(Card, { props: { card: redCard, reversed: true } });
    cy.get('[data-test="Card-Front"]').should('not.exist');
    cy.get('[data-test="Card-Back"]').should('be.visible');
  });

  it('Has cursor as pointer when allowInteraction is true', () => {
    mount(Card, { props: { card: redCard, allowInteraction: true } });
    cy.get('[data-test="Card"]').should('have.css', 'cursor', 'pointer');
  });

  it('emits cardClicked event with the card as paylaod on click when allowInteraction is true', () => {
    mount(Card, {
      props: { card: redCard, allowInteraction: true },
    });
    cy.get('[data-test="Card"]')
      .click()
      .vue()
      .then((wrapper) => {
        const { id } = wrapper.emitted('cardClicked')[0][0];
        expect(id).to.equal(redCard.id);
      });
  });

  describe('Card symbol', () => {
    it('Renders card symbol if length < 3', () => {
      mount(Card, { props: { card: redCard } });
      cy.get('[data-test="Card-Symbol"]').each((e) => {
        expect(e[0]).text(redCard.symbol);
      });
    });

    it('Renders short card symbol if length > 2', () => {
      mount(Card, { props: { card: cardWithLongSymbol } });
      cy.get('[data-test="Card-Symbol"]').each((e) => {
        expect(e[0]).text(cardWithLongSymbol.symbol.charAt(0).toUpperCase());
      });
    });
  });

  describe('Card color', () => {
    it('Has yellow background if color is yellow', () => {
      mount(Card, { props: { card: yellowCard } });
      cy.get('[data-test="Card"]').should('have.css', 'background-color', 'rgb(252, 204, 85)');
    });

    it('Has red background if color is red', () => {
      mount(Card, { props: { card: redCard } });
      cy.get('[data-test="Card"]').should('have.css', 'background-color', 'rgb(178, 34, 34)');
    });

    it('Has green background if color is green', () => {
      mount(Card, { props: { card: greenCard } });
      cy.get('[data-test="Card"]').should('have.css', 'background-color', 'rgb(110, 190, 113)');
    });

    it('Has blue background if color is blue', () => {
      mount(Card, { props: { card: blueCard } });
      cy.get('[data-test="Card"]').should('have.css', 'background-color', 'rgb(75, 170, 245)');
    });

    it('Has teal background if color is inherit', () => {
      mount(Card, { props: { card: inheritColorCard } });
      cy.get('[data-test="Card"]').should('have.css', 'background-color', 'rgb(48, 170, 159)');
    });
  });

  describe('Card styles', () => {
    it('Has random rotation and translation if randomlyRotated is true', () => {
      //TODO: test random rotation(cypress.get returning matrix on transform)
      mount(Card, { props: { card: blueCard } });
      cy.get('[data-test="Card"]').should('have.css', 'transform');
    });

    it('Translates x by the index number * 2.5 rem', () => {
      mount(Card, { props: { card: blueCard, translateLeft: true, indexInStack: 1 } });
      cy.get('[data-test="Card"]').should('have.css', 'transform');
    });

    it('Should not have translate if randomlyRotated == false and translateLeft == false ', () => {
      mount(Card, { props: { card: blueCard, translateLeft: false, randomlyRotated: false } });
      cy.get('[data-test="Card"]').should('have.css', 'transform', 'none');
    });
  });
});
