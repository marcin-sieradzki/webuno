import { mount } from '@cypress/vue';
import MatchList from '@/components/Home/MatchList.vue';
import { registerGlobalComponents } from '@/utils/globalComponentRegistrator';
import { router } from '@/router';

import '@/tailwind.css';
import 'primevue/resources/themes/vela-purple/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

describe('MatchList.vue', () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
    cy.intercept('/api/game', { fixture: 'games.json' });
    mount(MatchList, { global: { plugins: [registerGlobalComponents, router] } });
  });

  it('Shows a list of available games', () => {
    cy.get('li').should('have.length.above', 0);
  });

  it('Shows a dialog to create a game when "Create a new game" button is clicked', () => {
    cy.get('[data-test="Create-Game-Button"]').click();
    cy.get('[data-test="Create-Game-Dialog"]');
  });

  it('Shows a dialog to create a game when "Create a new game" button is clicked', () => {
    cy.get('[data-test="Create-Game-Button"]').click();
    cy.get('[data-test="Create-Game-Dialog"]');
  });

  it('Selects clicked game', () => {
    cy.get('li:nth-of-type(2)').click().should('have.css', 'background-color', 'rgb(69, 77, 89)');
  });

  it('Shows a dialog to join a game when game is selected and "Join" button is clicked', () => {
    cy.get('li:nth-of-type(2)').click();
    cy.get('[data-test="Join-Game-Button"]').click();
    cy.get('[data-test="Join-Game-Dialog"]');
  });
});
