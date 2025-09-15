class TransferPage {
  // Seletores
  get accountNumberInput() { return cy.get('input[name="accountNumber"]'); }
  get digitInput() { return cy.get('input[name="digit"]'); }
  get transferValueInput() { return cy.get('input[name="transferValue"]'); }
  get descriptionInput() { return cy.get('input[name="description"]'); }
  get transferButton() { return cy.get('[data-test="button-transfer"]'); }
  get backButton() { return cy.get('[data-test="back"]'); }
  get successModal() { return cy.get('#modalText, [data-test="modal-success"]'); }
  get errorModal() { return cy.get('#modalText, [data-test="modal-error"], .error-message'); }

  // Ações
  fillTransferForm(transferData) {
    this.accountNumberInput.type(transferData.accountNumber);
    this.digitInput.type(transferData.digit);
    this.transferValueInput.type(transferData.value.toString());
    this.descriptionInput.type(transferData.description);
    return this;
  }

  submitTransfer() {
    this.transferButton.click();
    return this;
  }

  makeTransfer(transferData) {
    this.fillTransferForm(transferData).submitTransfer();
    return this;
  }

  goBack() {
    this.backButton.click();
    return this;
  }

  // Verificações
  shouldShowSuccessMessage() {
    this.successModal.should('be.visible').and('contain', 'sucesso');
    return this;
  }

  shouldShowInsufficientBalanceError() {
    this.errorModal.should('be.visible').and('contain', 'saldo suficiente');
    return this;
  }

  shouldShowInvalidAccountError() {
    this.errorModal.should('be.visible').and('contain', 'conta');
    return this;
  }
}