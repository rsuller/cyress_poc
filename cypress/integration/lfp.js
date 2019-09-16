/// <reference types="Cypress" />

const url = Cypress.env('url')

beforeEach(function() {
    cy.log('Opening Late Filing Penalties')
    cy.visit(url + 'late-filing-penalty')

    // Go to Late Filing Penalty Lookup
    cy.get('#next-button').click()

    // Log in with demo user
    cy.get('#signin_email').type(Cypress.env('user_email'))
    .get('#password').type(Cypress.env('user_password' + '{enter}'))
})

describe('Successful pay of LFP', function() {
    // Enter transaction details
    cy.get('#company-ref').type('10000025')
    .get('penalty-ref').type('00378425' + '{enter}')

    // Follow process for making payment
    cy.get('#next-button').click()
    // Review Payment
    cy.get('#next-button').click()

    // Enter Credit Card Details
    cy.get('#card-no').type('4444333322221111')
    .get('#expiry-month').type('10')
    .get('#expiry-year').type('20')
    .get('#cardholder-name').type('John Test')
    .get('#cvc').type('356')
    .get('#address-line-1').type('1')
    .get('#address-line-2').type('High Street')
    .get('#address-city').type('Cardiff')
    .get('#address-postcode').type('CF14 3UZ')
    .get('#email').type('testautomation@companieshouse.gov.uk')

    // Confirm Payment
    cy.get('#confirm').click()

    cy.get('.govuk-panel__title').should('have.value', 'Payment received')



})
