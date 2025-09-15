class BankStatementPage {
  // Seletores
  get balanceDisplay() { return cy.get('#textBalance, [data-test="balance"]'); }
  get transactionsList() { return cy.get('[data-test="transaction"], .transaction-item'); }
  get backButton() { return cy.get('[data-test="back"]'); }
  get noTransactionsMessage() { return cy.get('[data-test="no-transactions"]'); }

  // Ações
  goBack() {
    this.backButton.click();
    return this;
  }

  // Verificações
  shouldDisplayBalance() {
    this.balanceDisplay.should('be.visible');
    return this;
  }

  shouldShowTransactions() {
    this.transactionsList.should('have.length.greaterThan', 0);
    return this;
  }

  shouldShowNoTransactions() {
    this.noTransactionsMessage.should('be.visible');
    return this;
  }

  getTransactionCount() {
    return this.transactionsList.then($transactions => $transactions.length);
  }

  shouldContainTransaction(description, value) {
    this.transactionsList
      .should('contain.text', description)
      .and('contain.text', value);
    return this;
  }
}