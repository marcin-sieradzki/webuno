import { mount } from '@cypress/vue';
import MatchList from '@/components/Home/MatchList.vue';
import { registerGlobalComponents } from '@/utils/globalComponentRegistrator';
import { router } from '@/router';

import '@/tailwind.css';
import 'primevue/resources/themes/vela-purple/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

describe('CreateGameDialog.vue', () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
    cy.intercept('/api/game', { fixture: 'games.json' });
  });

  it('Checks if the username is > 0 characters', () => {
    mount(MatchList, { global: { plugins: [registerGlobalComponents, router] } });
    cy.get('[data-test="Create-Game-Button"]').click();
    cy.get('[data-test="Create-Game-Dialog"]').contains('button', 'Create').click();
    cy.get('#playerName-help');
  });

  it('Checks if the name is > 0 characters', () => {
    mount(MatchList, { global: { plugins: [registerGlobalComponents, router] } });
    cy.get('[data-test="Create-Game-Button"]').click();
    cy.get('[data-test="Create-Game-Dialog"]').contains('button', 'Create').click();
    cy.get('#gameName-help');
  });

  it('Hides error text when input is valid for username', () => {
    mount(MatchList, { global: { plugins: [registerGlobalComponents, router] } });
    cy.get('[data-test="Create-Game-Button"]').click();
    cy.get('[data-test="Create-Game-Dialog"]').contains('button', 'Create').click();
    cy.get('#playerName-help');
    cy.get('#playerName').type('test');
    cy.get('#playerName-help').should('not.exist');
  });

  it('Hides error text when input is valid for game name', () => {
    mount(MatchList, { global: { plugins: [registerGlobalComponents, router] } });
    cy.get('[data-test="Create-Game-Button"]').click();
    cy.get('[data-test="Create-Game-Dialog"]').contains('button', 'Create').click();
    cy.get('#gameName-help');
    cy.get('#gameName').type('test name');
    cy.get('#gameName-help').should('not.exist');
  });
});
