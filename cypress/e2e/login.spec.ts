import '@testing-library/cypress/add-commands'

describe('Login specs', ()=>{
  it('Visit the login page', ()=>{
    cy.visit('/')
  })
})
