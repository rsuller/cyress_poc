/// <reference types="Cypress" />

const url = Cypress.env('url')
const user = Cypress.env('user_email')
const password = Cypress.env('user_password')

  describe('CHS Sign in Test', function() {
    before(() => cy.visit(url))
    beforeEach(() => cy.eyesOpen({appName: 'CHS', batchName: 'CHS TEST'}))
    afterEach(() => cy.eyesClose())
   
      it.only('Opens CHS service and signs in as authorised user', function() {
          cy.eyesCheckWindow('Sign in screen')
          
          // Sign into the CHS Service
          cy.get('#user-signin').click()

          // Check you're on sign in page
          cy.url().should('include', '/user/signin')

          cy.get('#signin_email').type(user)
          .get('#password').type(password + '{enter}')

          // Assert sign in has happened successfully
          cy.contains('Your details').click()

          // Assert user is in thier details screen
          cy.url().should('contain', 'user/account')

          cy.contains('Go to company search').click()

          // Do company search
          cy.get('#site-search-text').type('Slow company{enter}', {delay: 100})
          .should('have.value', 'Slow company')

      })
  })