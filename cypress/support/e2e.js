// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
import './commands';
import './pageObjects'

// Configurações globais
Cypress.on('uncaught:exception', (err, runnable) => {
  // Evita que o Cypress falhe em erros JavaScript da aplicação
  return false;
});

// Configuração de viewport padrão
beforeEach(() => {
  cy.viewport(1280, 720);
});