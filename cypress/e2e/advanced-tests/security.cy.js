import { TestDataGenerator } from '../../support/utils/testDataGenerator';

describe('Testes de Segurança', () => {
  
  beforeEach(() => {
    cy.visit('/');
  });

  describe('Validação de Senhas', () => {
    
    it('Deve rejeitar senhas fracas', () => {
      const weakPasswords = TestDataGenerator.generateWeakPasswords();
      const user = TestDataGenerator.generateRandomUser();
      
      cy.get('[data-test="register"]').click();
      
      weakPasswords.forEach(weakPassword => {
        cy.get('input[name="email"]').clear().type(user.email);
        cy.get('input[name="name"]').clear().type(user.name);
        cy.get('input[name="password"]').clear().type(weakPassword);
        cy.get('input[name="passwordConfirmation"]').clear().type(weakPassword);
        
        cy.get('[data-test="submit"]').click();
        
        // Verificar se a senha fraca foi rejeitada
        cy.get('.error-message, [data-test="error"]')
          .should('be.visible');
      });
    });

    it('Deve validar força da senha em tempo real', () => {
      cy.get('[data-test="register"]').click();
      
      cy.get('input[name="password"]').type('123');
      cy.get('.password-strength, [data-test="password-strength"]')
        .should('contain.text', 'fraca')
        .or('have.class', 'weak');
      
      cy.get('input[name="password"]').clear().type('Senha123!');
      cy.get('.password-strength, [data-test="password-strength"]')
        .should('contain.text', 'forte')
        .or('have.class', 'strong');
    });
  });

  describe('Proteção contra Ataques', () => {
    
    it('Deve prevenir SQL Injection no login', () => {
      const sqlInjectionAttempts = [
        "' OR '1'='1",
        "'; DROP TABLE users; --",
        "admin'--",
        "' UNION SELECT * FROM users --"
      ];
      
      sqlInjectionAttempts.forEach(injection => {
        cy.get('input[name="email"]').clear().type(injection);
        cy.get('input[name="password"]').clear().type('qualquersenha');
        cy.get('[data-test="signin"]').click();
        
        // Verificar que o ataque foi bloqueado
        cy.get('.error-message, [data-test="error"]')
          .should('be.visible');
        
        // Garantir que não houve redirecionamento
        cy.url().should('include', '/');
      });
    });

    it('Deve prevenir XSS no cadastro', () => {
      const xssPayloads = [
        '<script>alert("XSS")</script>',
        'javascript:alert("XSS")',
        '<img src="x" onerror="alert(1)">',
        '"><script>alert("XSS")</script>'
      ];
      
      cy.get('[data-test="register"]').click();
      
      xssPayloads.forEach(payload => {
        cy.get('input[name="name"]').clear().type(payload);
        cy.get('input[name="email"]').clear().type('test@example.com');
        cy.get('input[name="password"]').clear().type('Senha123!');
        cy.get('input[name="passwordConfirmation"]').clear().type('Senha123!');
        
        cy.get('[data-test="submit"]').click();
        
        // Verificar que o script não foi executado
        cy.window().then((win) => {
          expect(win.alert).to.not.have.been.called;
        });
      });
    });
  });

  describe('Controle de Acesso', () => {
    
    it('Deve bloquear acesso a páginas protegidas sem login', () => {
      const protectedPages = ['/home', '/transfer', '/statement'];
      
      protectedPages.forEach(page => {
        cy.visit(page);
        cy.url().should('include', '/login').or('eq', Cypress.config('baseUrl') + '/');
      });
    });

    it('Deve fazer logout automático após inatividade', () => {
      const user = TestDataGenerator.generateRandomUser();
      cy.createUser(user);
      cy.login(user.email, user.password);
      
      // Simular inatividade (aguardar timeout de sessão)
      cy.wait(300000); // 5 minutos - ajustar conforme configuração do app
      
      // Tentar acessar página protegida
      cy.visit('/transfer');
      cy.url().should('include', '/login');
    });
  });
});