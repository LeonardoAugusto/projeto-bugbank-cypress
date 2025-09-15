class RegisterPage {
  // Seletores
  get emailInput() { return cy.get('input[name="email"]'); }
  get nameInput() { return cy.get('input[name="name"]'); }
  get passwordInput() { return cy.get('input[name="password"]'); }
  get confirmPasswordInput() { return cy.get('input[name="passwordConfirmation"]'); }
  get createWithBalanceToggle() { return cy.get('#toggleAddBalance'); }
  get submitButton() { return cy.get('[data-test="submit"]'); }
  get successModal() { return cy.get('#modalText'); }
  get closeModalButton() { return cy.get('[data-test="close-modal"]'); }

  // Ações
  fillForm(userData) {
    this.emailInput.type(userData.email);
    this.nameInput.type(userData.name);
    this.passwordInput.type(userData.password);
    this.confirmPasswordInput.type(userData.confirmPassword || userData.password);
    return this;
  }

  toggleCreateWithBalance(enable = true) {
    if (enable) {
      this.createWithBalanceToggle.check();
    } else {
      this.createWithBalanceToggle.uncheck();
    }
    return this;
  }

  submitForm() {
    this.submitButton.click();
    return this;
  }

  register(userData, withBalance = true) {
    this.fillForm(userData)
        .toggleCreateWithBalance(withBalance)
        .submitForm();
    return this;
  }

  // Verificações
  shouldShowSuccessMessage() {
    this.successModal.should('be.visible').and('contain', 'foi criada com sucesso');
    return this;
  }

  shouldShowErrorMessage(message) {
    cy.get('.error-message, [data-test="error"]')
      .should('be.visible')
      .and('contain.text', message);
    return this;
  }

  getAccountNumber() {
    return this.successModal.then(($modal) => {
      const text = $modal.text();
      const accountMatch = text.match(/(\d{3,}-\d)/);
      return accountMatch ? accountMatch[1] : null;
    });
  }
}