class HomePage {
  // Seletores
  get userNameDisplay() { return cy.get('#textName, [data-test="user-name"]'); }
  get balanceDisplay() { return cy.get('#textBalance, [data-test="balance"]'); }
  get transferButton() { return cy.get('[data-test="transfer"]'); }
  get bankStatementButton() { return cy.get('[data-test="bank-statement"]'); }
  get logoutButton() { return cy.get('[data-test="logout"]'); }

  // Ações
  goToTransfer() {
    this.transferButton.click();
    return this;
  }

  goToBankStatement() {
    this.bankStatementButton.click();
    return this;
  }

  logout() {
    this.logoutButton.click();
    return this;
  }

  // Verificações
  shouldDisplayUserName(name) {
    this.userNameDisplay.should('contain.text', name);
    return this;
  }

  shouldDisplayBalance() {
    this.balanceDisplay.should('be.visible');
    return this;
  }

  getCurrentBalance() {
    return this.balanceDisplay.invoke('text').then((text) => {
      // Remove "R$" e converte para número
      return parseFloat(text.replace(/[R$\s.]/g, '').replace(',', '.'));
    });
  }
}