describe('BugBank - Testes E2E', () => {
  
  // Dados de teste centralizados
  const testData = {
    users: {
      valid: {
        email: 'usuario.teste01@email.com',
        name: 'Usuario de Teste 01',
        password: 'senha123'
      },
      recipient: {
        email: 'usuario.destinatario@email.com',
        name: 'Usuario Destinatario',
        password: 'senha456',
        account: '12345',
        digit: '6'
      }
    },
    urls: {
      base: 'https://bugbank.netlify.app/'
    }
  };

  // Comandos customizados para reutilização
  beforeEach(() => {
    cy.visit(testData.urls.base);
    cy.viewport(1280, 720); // Garantir viewport consistente
  });

  describe('1. Testes de Cadastro (RF-01)', () => {
    
    it('CT-CAD-001: Deve cadastrar usuário com sucesso e saldo', () => {
      // Pré-condições verificadas no beforeEach
      
      // Passos do teste
      cy.get('[data-test="register"]').click();
      
      cy.get('input[name="email"]').type(testData.users.valid.email);
      cy.get('input[name="name"]').type(testData.users.valid.name);
      cy.get('input[name="password"]').type(testData.users.valid.password);
      cy.get('input[name="passwordConfirmation"]').type(testData.users.valid.password);
      
      // Manter toggle "Criar conta com saldo" ativado (padrão)
      cy.get('#toggleAddBalance').should('be.checked');
      
      cy.get('[data-test="submit"]').click();
      
      // Verificar resultado esperado
      cy.get('#modalText')
        .should('be.visible')
        .and('contain', 'foi criada com sucesso');
      
      // Extrair número da conta para uso posterior
      cy.get('#modalText').then(($modal) => {
        const text = $modal.text();
        const accountMatch = text.match(/(\d{3,}-\d)/);
        if (accountMatch) {
          cy.wrap(accountMatch[1]).as('newAccountNumber');
        }
      });
    });

    it('CT-CAD-002: Deve impedir cadastro com senhas diferentes', () => {
      cy.get('[data-test="register"]').click();
      
      cy.get('input[name="email"]').type(testData.users.valid.email);
      cy.get('input[name="name"]').type(testData.users.valid.name);
      cy.get('input[name="password"]').type('senha123');
      cy.get('input[name="passwordConfirmation"]').type('senha456');
      
      cy.get('[data-test="submit"]').click();
      
      // Verificar mensagem de erro
      cy.get('.error-message, [data-test="error"], .alert')
        .should('be.visible')
        .and('contain.text', 'não conferem');
    });

    it('CT-CAD-003: Deve impedir cadastro com campos obrigatórios vazios', () => {
      cy.get('[data-test="register"]').click();
      
      // Deixar campo nome vazio
      cy.get('input[name="email"]').type(testData.users.valid.email);
      cy.get('input[name="password"]').type(testData.users.valid.password);
      cy.get('input[name="passwordConfirmation"]').type(testData.users.valid.password);
      
      cy.get('[data-test="submit"]').click();
      
      // Verificar validação de campo obrigatório
      cy.get('input[name="name"]')
        .should('have.attr', 'required')
        .or(() => {
          // Alternativa: verificar mensagem de erro
          cy.get('.error-message, [data-test="error"]')
            .should('contain.text', 'obrigatório');
        });
    });
  });

  describe('2. Testes de Login (RF-02)', () => {
    
    // Hook para criar usuário antes dos testes de login
    before(() => {
      cy.createUser(testData.users.valid);
    });

    it('CT-LOG-001: Deve realizar login com credenciais válidas', () => {
      cy.get('input[name="email"]').type(testData.users.valid.email);
      cy.get('input[name="password"]').type(testData.users.valid.password);
      
      cy.get('[data-test="signin"]').click();
      
      // Verificar redirecionamento e elementos da página principal
      cy.url().should('not.equal', testData.urls.base);
      cy.get('#textName, [data-test="user-name"]')
        .should('contain.text', testData.users.valid.name);
      cy.get('#textBalance, [data-test="balance"]')
        .should('be.visible');
    });

    it('CT-LOG-002: Deve impedir login com senha incorreta', () => {
      cy.get('input[name="email"]').type(testData.users.valid.email);
      cy.get('input[name="password"]').type('senha_errada');
      
      cy.get('[data-test="signin"]').click();
      
      // Verificar mensagem de erro
      cy.get('.error-message, [data-test="error"], .alert')
        .should('be.visible')
        .and('contain.text', 'inválid');
    });
  });

  describe('3. Testes de Transferência (RF-03)', () => {
    
    beforeEach(() => {
      // Login antes de cada teste de transferência
      cy.login(testData.users.valid.email, testData.users.valid.password);
    });

    it('CT-TRF-001: Deve realizar transferência com saldo suficiente', () => {
      // Capturar saldo inicial
      cy.get('#textBalance, [data-test="balance"]')
        .invoke('text')
        .as('initialBalance');
      
      cy.get('[data-test="transfer"]').click();
      
      // Preencher dados da transferência
      cy.get('input[name="accountNumber"]').type(testData.users.recipient.account);
      cy.get('input[name="digit"]').type(testData.users.recipient.digit);
      cy.get('input[name="transferValue"]').type('200');
      cy.get('input[name="description"]').type('Transferência de teste');
      
      cy.get('[data-test="button-transfer"]').click();
      
      // Verificar mensagem de sucesso
      cy.get('#modalText, [data-test="modal-success"]')
        .should('be.visible')
        .and('contain', 'sucesso');
      
      // Verificar atualização do saldo
      cy.get('#textBalance, [data-test="balance"]')
        .should('not.contain', '1.000'); // Assumindo saldo inicial de R$ 1.000
    });

    it('CT-TRF-002: Deve impedir transferência com saldo insuficiente', () => {
      cy.get('[data-test="transfer"]').click();
      
      cy.get('input[name="accountNumber"]').type(testData.users.recipient.account);
      cy.get('input[name="digit"]').type(testData.users.recipient.digit);
      cy.get('input[name="transferValue"]').type('5000'); // Valor maior que o saldo
      cy.get('input[name="description"]').type('Transferência inválida');
      
      cy.get('[data-test="button-transfer"]').click();
      
      // Verificar mensagem de erro
      cy.get('#modalText, [data-test="modal-error"], .error-message')
        .should('be.visible')
        .and('contain', 'saldo suficiente');
    });
  });

  describe('4. Testes de Extrato (RF-04)', () => {
    
    beforeEach(() => {
      cy.login(testData.users.valid.email, testData.users.valid.password);
    });

    it('CT-EXT-001: Deve exibir extrato com saldo e transações', () => {
      cy.get('[data-test="bank-statement"]').click();
      
      // Verificar se a página de extrato carregou
      cy.url().should('include', 'bank-statement');
      
      // Verificar exibição do saldo
      cy.get('#textBalance, [data-test="balance"]')
        .should('be.visible');
      
      // Verificar se existe histórico de transações
      cy.get('[data-test="transaction"], .transaction-item, #textTransferValue')
        .should('exist');
    });
  });

  describe('5. Testes Não Funcionais', () => {
    
    it('CT-RNF-001: Deve carregar páginas em menos de 2 segundos', () => {
      const startTime = Date.now();
      
      cy.visit(testData.urls.base).then(() => {
        const loadTime = Date.now() - startTime;
        expect(loadTime).to.be.lessThan(2000);
      });
      
      // Testar tempo de carregamento pós-login
      cy.login(testData.users.valid.email, testData.users.valid.password);
      
      const loginStartTime = Date.now();
      cy.get('[data-test="transfer"]').click().then(() => {
        const navigationTime = Date.now() - loginStartTime;
        expect(navigationTime).to.be.lessThan(2000);
      });
    });

    it('CT-RNF-002: Deve funcionar corretamente no Firefox', () => {
      // Este teste seria executado especificamente no Firefox
      // através da configuração do cypress.config.js
      cy.get('[data-test="register"]').click();
      
      // Verificar se elementos são renderizados corretamente
      cy.get('input[name="name"]')
        .should('be.visible')
        .and('have.attr', 'placeholder');
      
      // Verificar se não há sobreposição de elementos
      cy.get('label').each(($label) => {
        cy.wrap($label).should('be.visible');
      });
    });
  });
});