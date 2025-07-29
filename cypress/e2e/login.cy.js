describe('Teste de Login no E-commerce', () => {
  beforeEach(() => {
    cy.visit('https://www.saucedemo.com/');
  });

  context('Login para acessar a lista de item', function () {
    it('Deve fazer login com sucesso', () => {
      cy.get('[data-test="username"]').type('standard_user');
      cy.get('[data-test="password"]').type('secret_sauce');
      cy.get('[data-test="login-button"]').click(); 

      cy.url().should('include', '/inventory.html');
    });

    it('Deve exibir uma mensagem de erro ao inserir credenciais inválidas', () => {

      cy.get('[data-test="username"]').type('teste');
      cy.get('[data-test="password"]').type('teste');
      cy.get('[data-test="login-button"]').click();

      // Valida se a mensagem de erro é exibida
      cy.get('.error').should('be.visible')
        .and('contain', 'Epic sadface: Username and password do not match any user in this service'); // Verifica se contém o texto esperado
    });

    it('Deve exibir uma mensagem de erro ao inserir somente login_user', () => {

      cy.get('[data-test="username"]').type('teste');
      cy.get('[data-test="login-button"]').click();

      cy.get('.error').should('be.visible').and('contain', 'Epic sadface: Password is required');
    });

    it('Deve exibir uma mensagem de erro ao acessar sem credenciais', () => {

      cy.get('[data-test="login-button"]').click();
      cy.get('.error').should('be.visible').and('contain', 'Epic sadface: Username is required');
    });

  });
});