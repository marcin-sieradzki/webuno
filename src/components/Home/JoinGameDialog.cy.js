import { mount } from '@cypress/vue';
import MatchList from '@/components/Home/MatchList.vue';
import { registerGlobalComponents } from '@/utils/globalComponentRegistrator';
import { router } from '@/router';

import '@/tailwind.css';
import 'primevue/resources/themes/vela-purple/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

describe('JoinGameDialog.vue', () => {
  beforeEach(() => {
    cy.viewport(1280, 720);
    cy.intercept('/api/game', { fixture: 'games.json' });
  });

  it('Checks if the name is > 0 characters', () => {
    mount(MatchList, { global: { plugins: [registerGlobalComponents, router] } });
    cy.get('li:nth-of-type(2)').click();
    cy.get('[data-test="Join-Game-Button"]').click();
    cy.get('[data-test="Join-Game-Dialog"]').contains('button', 'Join').click();
    cy.get('#playerName-help');
  });

  it('Allows to reconnect if previously connected', () => {
    window.localStorage.setItem('b96f4851-24e8-4258-b5b0-5ddcd51647af', 'Test username');
    mount(MatchList, { global: { plugins: [registerGlobalComponents, router] } });
    cy.get('li:nth-of-type(2)').click();
    cy.get('[data-test="Join-Game-Button"]').click();
    cy.get('[data-test="Join-Game-Dialog"]').contains('button', 'Reconnect');
  });

  it('Informs when the game is full and user should not be able to reconnect', () => {
    mount(MatchList, { global: { plugins: [registerGlobalComponents, router] } });
    cy.get('li:nth-of-type(1)').click();
    cy.get('[data-test="Join-Game-Button"]').click();
    cy.get('[data-test="Join-Game-Dialog"]').contains('span', 'Game is full.');
  });
});
