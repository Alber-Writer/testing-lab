describe('Login specs', () => {
  it('Should contain inputs: Usuario, Contraseña * and loggin button', () => {
    cy.visit('/');
    // Act
    cy.findByRole('textbox', { name: 'Usuario *' }).should('be.visible');
    cy.findByLabelText('Contraseña *').should('be.visible');
    cy.findByRole('button', { name: 'Login' }).should('be.visible')
  });

  it('Should navigate to submodule-list when type valid credentials', () => {
    // Arrange
    const user = 'admin';
    const password = 'test';

    // Act
    cy.visit('/');
    cy.findByRole('textbox', { name: 'Usuario *' }).as('userInput');
    cy.findByLabelText('Contraseña *').as('passwordInput');

    cy.get('@userInput').type(user);
    cy.get('@passwordInput').type(password);
    cy.findByRole('button', { name: 'Login' }).click();

    // Assert
    cy.url().should('equal', 'http://localhost:8080/#/submodule-list');
  });

  it('Should show an snackbar alert with a message when submit invalid credentials', () => {
    // Arrange
    const user = 'pepe';
    const password = 'test';

    // Act
    cy.visit('/');
    cy.findByRole('textbox', { name: 'Usuario *' }).as('userInput');
    cy.findByLabelText('Contraseña *').as('passwordInput');

    cy.get('@userInput').type(user);
    cy.get('@passwordInput').type(password);
    cy.findByRole('button', { name: 'Login' }).click();

    // Assert
    cy.findByRole('alert').should('contain.text','Usuario y/o password no válidos');
    cy.url().should('eq', 'http://localhost:8080/#/');
  });
});
