class LoginPage {
  // Seletores
  get emailInput() { return cy.get('input[name="email"]'); }
  get passwordInput() { return cy.get('input[name="password"]'); }
  get loginButton() { return cy.get('[data-test="signin"]'); }
  get registerButton() { return cy.get('[data-test="register"]'); }
  get errorMessage() { return cy.get('.error-message, [data-test="error"], .alert'); }

  // Ações
  fillEmail(email) {
    this.emailInput.clear().type(email);
    return this;
  }

  fillPassword(password) {
    this.passwordInput.clear().type(password);
    return this;
  }

  clickLogin() {
    this.loginButton.click();
    return this;
  }

  clickRegister() {
    this.registerButton.click();
    return this;
  }

  login(email, password) {
    this.fillEmail(email)
        .fillPassword(password)
        .clickLogin();
    return this;
  }

  // Verificações
  shouldShowErrorMessage(message) {
    this.errorMessage.should('be.visible').and('contain.text', message);
    return this;
  }

  shouldRedirectToHome() {
    cy.url().should('not.contain', 'login');
    return this;
  }
}