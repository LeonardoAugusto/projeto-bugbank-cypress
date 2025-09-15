Cypress.Commands.add('createUser', (userData) => {
  cy.visit('/');
  cy.get('[data-test="register"]').click();
  
  cy.get('input[name="email"]').type(userData.email);
  cy.get('input[name="name"]').type(userData.name);
  cy.get('input[name="password"]').type(userData.password);
  cy.get('input[name="passwordConfirmation"]').type(userData.password);
  
  cy.get('#toggleAddBalance').check();
  cy.get('[data-test="submit"]').click();
  
  cy.get('#modalText').should('contain', 'sucesso');
  cy.get('[data-test="close-modal"]').click();
});

Cypress.Commands.add('login', (email, password) => {
  cy.session([email, password], () => {
    cy.visit('/');
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('[data-test="signin"]').click();
    
    // Aguardar carregamento da página principal
    cy.get('#textName, [data-test="user-name"]').should('be.visible');
  });
});
