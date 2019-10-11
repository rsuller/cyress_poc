/// <reference types="Cypress" />

describe('Change of registered office address', () => {
    it('File successful AD01', () => {
        cy.visit('https://ewf.kermit.orctel.internal')
        cy.get('#email').type('testautomation@companieshouse.gov.uk')
        cy.get('#seccode').type('password123')
        cy.get('.button').click()

        // Sign into company
        cy.get("input[id='companySignInPage\.coNum']").type('00006400')
        cy.get("input[id='companySignInPage\.authCode']").type('222222')
        cy.get('.button').click()

        // Go to change registered office address
        cy.contains('Change address').click()

        // Alter address - just change premise
        cy.get('#ro-address-premise').type('100')
        cy.get('#ro-address-postcode').type('SW1P 1JP')
        // Lookup address
        cy.get('#ro-address-postcode-Lookup').click()

        // Check address is correct
        cy.get("input[id='ro-address-street']").should('have.value', 'ROCHESTER ROW')
        cy.get('.container-button > div > .button').click()

        // Confirm submission
        cy.get('h1').should('have.text', 'Confirmation of Submission')
    })

})