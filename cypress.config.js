const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://bugbank.netlify.app',
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 10000,
    
    // Configurações de performance
    numTestsKeptInMemory: 5,
    experimentalMemoryManagement: true,
    
    // Configurações de retry
    retries: {
      runMode: 2,
      openMode: 0
    },
    
    setupNodeEvents(on, config) {
      // Plugin para comparação de screenshots
      on('task', {
        compareScreenshot({ name, options }) {
          // Implementar comparação de imagens
          return null;
        }
      });
      
      // Plugin para limpeza de dados
      on('task', {
        cleanupTestData() {
          // Implementar limpeza de dados de teste
          return null;
        }
      });
      
      // Plugin para relatórios avançados
      require('cypress-mochawesome-reporter/plugin')(on);
      
      // Plugin para acessibilidade
      require('cypress-axe/plugin')(on);
      
      return config;
    }
  },
  
  // Configuração de relatórios avançados
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'BugBank Test Report',
    embeddedScreenshots: true,
    inlineAssets: true
  },
  
  // Configuração para CI/CD
  env: {
    coverage: true,
    codeCoverage: {
      url: '/api/__coverage__'
    }
  }
});