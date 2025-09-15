import { LoginPage, RegisterPage, HomePage, TransferPage, BankStatementPage } from '../support/pageObjects';

describe('BugBank - Testes E2E com Page Objects', () => {
  
  const loginPage = new LoginPage();
  const registerPage = new RegisterPage();
  const homePage = new HomePage();
  const transferPage = new TransferPage();
  const bankStatementPage = new BankStatementPage();

  const testData = {
    user: {
      email: 'usuario.teste@email.com',
      name: 'Usuario Teste',
      password: 'senha123'
    },
    transfer: {
      accountNumber: '12345',
      digit: '6',
      value: 200,
      description: 'Transferência de teste'
    }
  };

  beforeEach(() => {
    cy.visit('/');
  });

  describe('Testes de Cadastro com Page Objects', () => {
    
    it('Deve cadastrar usuário com sucesso', () => {
      loginPage.clickRegister();
      
      registerPage
        .register(testData.user)
        .shouldShowSuccessMessage();
    });

    it('Deve impedir cadastro com senhas diferentes', () => {
      loginPage.clickRegister();
      
      const userData = {
        ...testData.user,
        confirmPassword: 'senha456'
      };
      
      registerPage
        .register(userData)
        .shouldShowErrorMessage('não conferem');
    });
  });

  describe('Testes de Login com Page Objects', () => {
    
    before(() => {
      // Criar usuário para os testes de login
      cy.visit('/');
      loginPage.clickRegister();
      registerPage.register(testData.user);
      cy.get('[data-test="close-modal"]').click();
    });

    it('Deve realizar login com sucesso', () => {
      loginPage
        .login(testData.user.email, testData.user.password);
      
      homePage
        .shouldDisplayUserName(testData.user.name)
        .shouldDisplayBalance();
    });

    it('Deve impedir login com senha incorreta', () => {
      loginPage
        .login(testData.user.email, 'senha_errada')
        .shouldShowErrorMessage('inválid');
    });
  });

  describe('Testes de Transferência com Page Objects', () => {
    
    beforeEach(() => {
      cy.login(testData.user.email, testData.user.password);
    });

    it('Deve realizar transferência com sucesso', () => {
      homePage.goToTransfer();
      
      transferPage
        .makeTransfer(testData.transfer)
        .shouldShowSuccessMessage();
    });

    it('Deve impedir transferência com saldo insuficiente', () => {
      homePage.goToTransfer();
      
      const invalidTransfer = {
        ...testData.transfer,
        value: 5000
      };
      
      transferPage
        .makeTransfer(invalidTransfer)
        .shouldShowInsufficientBalanceError();
    });
  });

  describe('Testes de Extrato com Page Objects', () => {
    
    beforeEach(() => {
      cy.login(testData.user.email, testData.user.password);
    });

    it('Deve exibir extrato corretamente', () => {
      homePage.goToBankStatement();
      
      bankStatementPage
        .shouldDisplayBalance()
        .shouldShowTransactions();
    });
  });
});