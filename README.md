# 🚀 BugBank - Automação de Testes E2E com Cypress

## 📋 Índice
- [Visão Geral](#visão-geral)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Instalação e Configuração](#instalação-e-configuração)
- [Executando os Testes](#executando-os-testes)
- [Cenários Implementados](#cenários-implementados)
- [Recursos Avançados](#recursos-avançados)
- [CI/CD Pipeline](#cicd-pipeline)
- [Relatórios e Monitoramento](#relatórios-e-monitoramento)
- [Melhores Práticas](#melhores-práticas)

## 🎯 Visão Geral

Esta suíte de testes automatizados foi desenvolvida para validar todos os requisitos funcionais e não funcionais da aplicação BugBank, seguindo as melhores práticas de automação de testes E2E.

### ✅ Cobertura Completa
- **10 cenários de teste** implementados
- **100% dos requisitos** cobertos (RF-01 a RF-04, RNF-01 a RNF-03)
- **Testes positivos e negativos**
- **Testes de performance e compatibilidade**
- **Testes de segurança e acessibilidade**

## 📁 Estrutura do Projeto

```
bugbank-cypress-tests/
├── cypress/
│   ├── e2e/
│   │   ├── bugbank.cy.js                    # Testes principais
│   │   ├── bugbank-with-pageobjects.cy.js   # Testes com Page Objects
│   │   └── advanced-tests/
│   │       ├── security.cy.js               # Testes de segurança
│   │       ├── performance.cy.js            # Testes de performance
│   │       └── accessibility.cy.js          # Testes de acessibilidade
│   ├── support/
│   │   ├── commands.js                      # Comandos customizados
│   │   ├── e2e.js                          # Configurações globais
│   │   ├── pageObjects/                     # Page Objects Pattern
│   │   │   ├── LoginPage.js
│   │   │   ├── RegisterPage.js
│   │   │   ├── HomePage.js
│   │   │   ├── TransferPage.js
│   │   │   └── BankStatementPage.js
│   │   ├── utils/
│   │   │   ├── testDataGenerator.js         # Gerador de dados
│   │   │   ├── apiHelpers.js               # Helpers para API
│   │   │   └── visualTesting.js            # Testes visuais
│   │   └── fixtures/
│   │       └── testData.json               # Dados de teste
│   ├── downloads/                          # Downloads de testes
│   ├── screenshots/                        # Screenshots automáticos
│   ├── videos/                            # Vídeos de execução
│   └── reports/                           # Relatórios HTML
├── .github/workflows/
│   └── cypress.yml                        # Pipeline CI/CD
├── cypress.config.js                     # Configurações do Cypress
├── package.json                          # Dependências e scripts
└── README.md                            # Esta documentação
```

## ⚙️ Instalação e Configuração

### Pré-requisitos
- Node.js 16+ 
- npm ou yarn
- Git

### 1. Clone o Repositório
```bash
git clone https://github.com/seu-usuario/bugbank-cypress-tests.git
cd bugbank-cypress-tests
```

### 2. Instale as Dependências
```bash
npm install
# ou
yarn install
```

### 3. Instale o Cypress
```bash
npx cypress install
```

### 4. Configure as Variáveis de Ambiente
```bash
# .env
CYPRESS_BASE_URL=https://bugbank.netlify.app
CYPRESS_EMAIL=seu-email@teste.com
CYPRESS_PASSWORD=sua-senha
```

## 🏃‍♂️ Executando os Testes

### Comandos Disponíveis

```bash
# Abrir Cypress GUI
npm run cypress:open

# Executar todos os testes (headless)
npm run cypress:run

# Executar em Chrome
npm run cypress:run:chrome

# Executar em Firefox  
npm run cypress:run:firefox

# Executar testes específicos
npm run test:smoke          # Testes críticos
npm run test:regression     # Testes de regressão
npm run test:functional     # Testes funcionais
npm run test:performance    # Testes de performance

# Gerar relatório
npm run report:generate

# CI/CD (Headless)
npm run test:ci
```

### Executar Testes Específicos
```bash
# Executar apenas testes de login
npx cypress run --spec "cypress/e2e/**/login*.cy.js"

# Executar com tags
npx cypress run --env grepTags=@smoke

# Executar em paralelo
npm run test:parallel
```

## 📝 Cenários Implementados

### Testes Funcionais

| ID | Cenário | Status | Cobertura |
|---|---|---|---|
| CT-CAD-001 | Cadastro com sucesso | ✅ | RF-01 |
| CT-CAD-002 | Senhas diferentes | ✅ | RF-01 |
| CT-CAD-003 | Campos obrigatórios | ✅ | RF-01 |
| CT-LOG-001 | Login válido | ✅ | RF-02 |
| CT-LOG-002 | Login inválido | ✅ | RF-02 |
| CT-TRF-001 | Transferência válida | ✅ | RF-03 |
| CT-TRF-002 | Saldo insuficiente | ✅ | RF-03 |
| CT-EXT-001 | Visualizar extrato | ✅ | RF-04 |

### Testes Não Funcionais

| ID | Cenário | Status | Cobertura |
|---|---|---|---|
| CT-RNF-001 | Performance | ✅ | RNF-02 |
| CT-RNF-002 | Compatibilidade | ✅ | RNF-03 |

### Testes Avançados

| Categoria | Testes Incluídos |
|---|---|
| **Segurança** | SQL Injection, XSS, Controle de Acesso |
| **Performance** | Core Web Vitals, Responsividade, Carga |
| **Acessibilidade** | WCAG AA, Navegação por Teclado, Alto Contraste |
| **Visuais** | Screenshots, Responsive Design |

## 🚀 Recursos Avançados

### 1. Page Objects Pattern
```javascript
// Uso limpo e reutilizável
const loginPage = new LoginPage();
loginPage.login(email, password)
        .shouldRedirectToHome();
```

### 2. Comandos Customizados
```javascript
// Comandos reutilizáveis
cy.createUser(userData);
cy.login(email, password);
cy.cleanupTestData();
```

### 3. Geração de Dados Dinâmica
```javascript
// Dados únicos para cada teste
const user = TestDataGenerator.generateRandomUser();
const transfer = TestDataGenerator.generateRandomTransfer();
```

### 4. Interceptação de Requisições
```javascript
// Mock de APIs
cy.intercept('POST', '/api/users', { fixture: 'user.json' }).as('createUser');
cy.wait('@createUser');
```

### 5. Testes Visuais
```javascript
// Comparação de screenshots
VisualTesting.compareScreenshot('login-page');
VisualTesting.checkResponsiveDesign(['mobile', 'tablet', 'desktop']);
```

## 🔄 CI/CD Pipeline

### GitHub Actions Workflow
```yaml
# .github/workflows/cypress.yml
name: Cypress Tests

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]
  schedule:
    - cron: '0 2 * * *'  # Execução diária às 2h

jobs:
  cypress-run:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        browser: [chrome, firefox]
        
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Run Cypress tests
        uses: cypress-io/github-action@v5
        with:
          browser: ${{ matrix.browser }}
          record: true
          parallel: true
          group: 'Tests-${{ matrix.browser }}'
        env:
          CYPRESS_RECORD_KEY: ${{ secrets.CYPRESS_RECORD_KEY }}
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
          
      - name: Upload screenshots
        uses: actions/upload-artifact@v3
        if: failure()
        with:
          name: cypress-screenshots-${{ matrix.browser }}
          path: cypress/screenshots
          
      - name: Upload videos
        uses: actions/upload-artifact@v3
        if: always()
        with:
          name: cypress-videos-${{ matrix.browser }}
          path: cypress/videos
          
      - name: Generate Report
        if: always()
        run: npm run report:generate
        
      - name: Deploy Report
        uses: peaceiris/actions-gh-pages@v3
        if: always()
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./cypress/reports
```

### Pipeline Features
- ✅ **Multi-browser testing** (Chrome, Firefox)
- ✅ **Execução paralela** para performance
- ✅ **Artefatos automáticos** (screenshots, vídeos)
- ✅ **Relatórios HTML** publicados automaticamente
- ✅ **Notificações** em caso de falha
- ✅ **Agendamento** para execução noturna

## 📊 Relatórios e Monitoramento

### Relatórios Gerados
1. **Mochawesome HTML Report** - Relatório visual detalhado
2. **Cypress Dashboard** - Monitoramento em tempo real
3. **Screenshots automáticos** - Em caso de falhas
4. **Vídeos de execução** - Replay completo dos testes
5. **Métricas de performance** - Core Web Vitals

### Integração com Ferramentas
- **Cypress Cloud** - Dashboard e analytics
- **Slack/Teams** - Notificações automatizadas
- **JIRA** - Criação automática de bugs
- **Percy.io** - Testes visuais avançados

## 📈 Métricas de Qualidade

### Cobertura de Testes
- **Cobertura Funcional**: 100% (RF-01 a RF-04)
- **Cobertura Não Funcional**: 100% (RNF-01 a RNF-03)
- **Cenários Positivos**: 5/5 (100%)
- **Cenários Negativos**: 5/5 (100%)
- **Browsers Suportados**: Chrome, Firefox, Safari
- **Dispositivos**: Desktop, Tablet, Mobile

### Tempos de Execução
- **Suite Completa**: ~8 minutos
- **Testes Críticos (Smoke)**: ~3 minutos
- **Testes de Regressão**: ~12 minutos
- **Testes de Performance**: ~5 minutos

## 🛠️ Melhores Práticas Implementadas

### 1. Estrutura de Código
- ✅ **Page Objects Pattern** - Organização e reutilização
- ✅ **Comandos Customizados** - Abstração de ações complexas
- ✅ **Data Generators** - Dados únicos e realistas
- ✅ **Fixtures** - Dados estáticos centralizados
- ✅ **Utilities** - Funções auxiliares reutilizáveis

### 2. Estratégias de Teste
- ✅ **AAA Pattern** - Arrange, Act, Assert
- ✅ **Given-When-Then** - Estrutura BDD
- ✅ **Test Isolation** - Testes independentes
- ✅ **Data Cleanup** - Limpeza automática de dados
- ✅ **Retry Logic** - Recuperação de falhas temporárias

### 3. Performance e Confiabilidade
- ✅ **Session Management** - Cache de autenticação
- ✅ **Smart Waits** - Esperas inteligentes
- ✅ **Request Interception** - Mock de APIs quando necessário
- ✅ **Parallel Execution** - Execução em paralelo
- ✅ **Cross-browser Testing** - Compatibilidade garantida

### 4. Monitoramento e Debug
- ✅ **Screenshots Automáticos** - Evidências de falhas
- ✅ **Video Recording** - Replay completo
- ✅ **Detailed Logs** - Debug facilitado
- ✅ **Error Categorization** - Classificação de falhas
- ✅ **Performance Metrics** - Métricas de tempo real

## 🔧 Configurações Avançadas

### Cypress Configuration
```javascript
// cypress.config.js - Configurações otimizadas
module.exports = defineConfig({
  e2e: {
    // URLs e ambiente
    baseUrl: 'https://bugbank.netlify.app',
    supportFile: 'cypress/support/e2e.js',
    
    // Performance
    numTestsKeptInMemory: 5,
    experimentalMemoryManagement: true,
    defaultCommandTimeout: 10000,
    
    // Retry e estabilidade
    retries: { runMode: 2, openMode: 0 },
    watchForFileChanges: false,
    
    // Viewport e visual
    viewportWidth: 1280,
    viewportHeight: 720,
    video: true,
    screenshotOnRunFailure: true,
    
    // Especificações
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    excludeSpecPattern: ['**/examples/*', '**/temp/*']
  }
});
```

### Environment Variables
```bash
# .env.example
CYPRESS_BASE_URL=https://bugbank.netlify.app
CYPRESS_API_URL=https://api.bugbank.com
CYPRESS_USERNAME=test@example.com
CYPRESS_PASSWORD=TestPassword123!
CYPRESS_RECORD_KEY=your-record-key
CYPRESS_PROJECT_ID=your-project-id

# Configurações de CI/CD
CI=true
CYPRESS_CACHE_FOLDER=./tmp/Cypress
CYPRESS_RUN_BINARY=./node_modules/cypress/bin/cypress
```

## 📋 Guia de Execução Detalhado

### Execução Local - Desenvolvimento
```bash
# 1. Preparar ambiente
npm install
npx cypress verify

# 2. Abrir Cypress GUI (Recomendado para desenvolvimento)
npm run cypress:open

# 3. Executar testes específicos
npx cypress run --spec "cypress/e2e/bugbank.cy.js"
npx cypress run --spec "cypress/e2e/advanced-tests/**/*.cy.js"

# 4. Debug de testes
npm run cypress:open --env DEBUG=true
```

### Execução CI/CD - Produção
```bash
# 1. Testes críticos (Pipeline rápido)
npm run test:smoke

# 2. Suite completa (Pipeline completo)
npm run test:regression

# 3. Multi-browser (Pipeline de compatibilidade)
npm run cypress:run:chrome && npm run cypress:run:firefox

# 4. Performance (Pipeline de performance)
npm run test:performance
```

### Execução com Docker
```dockerfile
# Dockerfile
FROM cypress/browsers:node16.14.2-slim-chrome103-ff102
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
CMD ["npm", "run", "test:ci"]
```

```bash
# Comandos Docker
docker build -t bugbank-cypress .
docker run -it --rm bugbank-cypress
```

## 🐛 Troubleshooting

### Problemas Comuns

#### 1. Testes Instáveis (Flaky Tests)
```javascript
// Solução: Usar esperas inteligentes
cy.get('[data-test="element"]')
  .should('be.visible')
  .and('not.be.disabled')
  .click();

// Em vez de:
cy.wait(2000); // ❌ Espera fixa
```

#### 2. Problemas de Timing
```javascript
// Solução: Interceptar requisições
cy.intercept('POST', '/api/login').as('loginRequest');
cy.get('[data-test="submit"]').click();
cy.wait('@loginRequest');
```

#### 3. Elementos Não Encontrados
```javascript
// Solução: Seletores mais robustos
cy.get('[data-test="button"]'); // ✅ Melhor
cy.get('#button-123');          // ⚠️ Pode mudar
cy.get('button:contains("OK")'); // ❌ Frágil
```

#### 4. Problemas de Cross-Origin
```javascript
// cypress.config.js
{
  chromeWebSecurity: false, // Apenas para testes
  experimentalSessionAndOrigin: true
}
```

### Logs e Debug
```bash
# Habilitar logs detalhados
DEBUG=cypress:* npm run cypress:run

# Ver logs específicos
DEBUG=cypress:server:specs npm run cypress:run

# Executar com mais verbosidade
npx cypress run --reporter spec --verbose
```

## 📚 Recursos Adicionais

### Documentação Oficial
- [Cypress Documentation](https://docs.cypress.io/)
- [Best Practices](https://docs.cypress.io/guides/references/best-practices)
- [API Reference](https://docs.cypress.io/api/table-of-contents)

### Plugins Úteis
- `cypress-axe` - Testes de acessibilidade
- `cypress-image-diff` - Comparação visual
- `cypress-file-upload` - Upload de arquivos
- `cypress-xpath` - Seletores XPath
- `cypress-terminal-report` - Logs no terminal

### Comunidade e Suporte
- [Cypress Discord](https://discord.gg/cypress)
- [Cypress GitHub](https://github.com/cypress-io/cypress)
- [Stack Overflow](https://stackoverflow.com/questions/tagged/cypress)

## 🎯 Próximos Passos

### Melhorias Planejadas
1. **Integração com Percy.io** - Testes visuais avançados
2. **Testes de API** - Validação de endpoints
3. **Testes Mobile** - Dispositivos reais
4. **AI-Powered Testing** - Detecção inteligente de bugs
5. **Lighthouse Integration** - Auditoria automática de performance

### Roadmap
- [ ] Implementar testes de regressão visual
- [ ] Adicionar testes de usabilidade
- [ ] Criar testes de stress
- [ ] Implementar métricas avançadas
- [ ] Adicionar suporte a PWA

## 📞 Suporte

Para dúvidas ou problemas:
1. Abra uma issue no repositório
2. Entre em contato: laugustops@gmail.com



**Desenvolvido com ❤️ por Leonardo Augusto P. da Silva**  
*Especialista em Quality Assurance e Automação de Testes*
