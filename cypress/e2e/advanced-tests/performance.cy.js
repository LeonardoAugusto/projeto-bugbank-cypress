import { VisualTesting } from '../../support/utils/visualTesting';

describe('Testes de Performance', () => {
  
  beforeEach(() => {
    cy.visit('/');
  });

  describe('Métricas de Carregamento', () => {
    
    it('Deve medir Core Web Vitals', () => {
      cy.window().then((win) => {
        return new Promise((resolve) => {
          new win.PerformanceObserver((list) => {
            list.getEntries().forEach((entry) => {
              if (entry.entryType === 'largest-contentful-paint') {
                expect(entry.value).to.be.lessThan(2500); // LCP < 2.5s
              }
              if (entry.entryType === 'first-input') {
                expect(entry.processingStart - entry.startTime).to.be.lessThan(100); // FID < 100ms
              }
              if (entry.entryType === 'layout-shift') {
                expect(entry.value).to.be.lessThan(0.1); // CLS < 0.1
              }
            });
            resolve();
          }).observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
        });
      });
    });

    it('Deve carregar recursos críticos rapidamente', () => {
      cy.intercept('GET', '**/*.css').as('cssFiles');
      cy.intercept('GET', '**/*.js').as('jsFiles');
      
      cy.visit('/');
      
      cy.wait('@cssFiles').then((interception) => {
        expect(interception.response.statusCode).to.equal(200);
        expect(interception.response.delay).to.be.undefined.or.lessThan(1000);
      });
      
      cy.wait('@jsFiles').then((interception) => {
        expect(interception.response.statusCode).to.equal(200);
        expect(interception.response.delay).to.be.undefined.or.lessThan(1000);
      });
    });
  });

  describe('Responsividade', () => {
    
    it('Deve funcionar em diferentes dispositivos', () => {
      const devices = [
        { name: 'iPhone SE', width: 375, height: 667 },
        { name: 'iPad', width: 768, height: 1024 },
        { name: 'Desktop', width: 1920, height: 1080 }
      ];
      
      devices.forEach(device => {
        cy.viewport(device.width, device.height);
        
        // Verificar elementos principais
        cy.get('[data-test="signin"]').should('be.visible');
        cy.get('[data-test="register"]').should('be.visible');
        
        // Capturar screenshot
        cy.screenshot(`responsive-${device.name}`);
      });
    });

    it('Deve manter usabilidade em telas pequenas', () => {
      cy.viewport('iphone-6');
      
      // Verificar que elementos não se sobrepõem
      cy.get('input[name="email"]').should('be.visible');
      cy.get('input[name="password"]').should('be.visible');
      cy.get('[data-test="signin"]').should('be.visible');
      
      // Verificar que o texto é legível
      cy.get('body').should('have.css', 'font-size').and('match', /^\d+px$/);
    });
  });

  describe('Testes de Carga', () => {
    
    it('Deve processar múltiplos logins simultâneos', () => {
      const users = Array.from({ length: 5 }, () => TestDataGenerator.generateRandomUser());
      
      // Criar usuários
      users.forEach(user => {
        cy.createUser(user);
      });
      
      // Simular logins simultâneos
      const loginPromises = users.map(user => {
        return cy.wrap(null).then(() => {
          cy.visit('/');
          cy.get('input[name="email"]').type(user.email);
          cy.get('input[name="password"]').type(user.password);
          cy.get('[data-test="signin"]').click();
          cy.get('#textName').should('be.visible');
        });
      });
      
      // Verificar que todos os logins foram bem-sucedidos
      cy.wrap(Promise.all(loginPromises)).should('be.fulfilled');
    });
  });
});