/// <reference types="Cypress" />

const url = Cypress.env('developer_site')

beforeEach(function() {
    cy.visit(url)
    // Login
    cy.get('#user-signin').click()
    cy.signInToCHS()
})

describe('Company Profile', function() {
    it('Search Company', function() {
        cy.contains('Search').click()
        cy.contains('Search company').click()

        // Search for 00006400
        cy.get('#q').type('00006400').get('#exploreButton').click()

          // Check Success
          cy.get('#response_code').should('have.text', '200 OK')

          cy.get('#response_body').invoke('text').then((text) => {
              cy.log(text)
              expect(text).contains('"title": "THE GIRLS\' DAY SCHOOL TRUST"')
          })

    })

    it('GET company Profile', function() {
        cy.contains('Company profile').click()
        cy.get('#readCompanyProfile').click()

        // Get profile details for 00006400
        cy.get('#company_number').type('00006400')
        cy.get('#exploreButton').click()

        // Check Success
        cy.get('#response_code').should('have.text', '200 OK')

        cy.get('#response_body').invoke('text').then((text) => {
            cy.log(text)
            expect(text).contains('"company_name": "THE GIRLS\' DAY SCHOOL TRUST"')
        })

    })

    it('Registered Office Address', function() {
        cy.contains('Registered office address').click()
        cy.get('#readRegisteredOfficeAddress').click()

        // Search for 00006400
        cy.get('#company_number').type('00006400').get('#exploreButton').click()

          // Check Success
          cy.get('#response_code').should('have.text', '200 OK')

          cy.get('#response_body').invoke('text').then((text) => {
              cy.log(text)
              expect(text).contains('"postal_code": "SW1P 1JP"')
          })

    })

    it('Company Officers', function() {
        cy.contains('Company Officers').click()
        cy.get('#officerList').click()

        // Search for 00006400
        cy.get('#company_number').type('00006400').get('#exploreButton').click()

          // Check Success
          cy.get('#response_code').should('have.text', '200 OK')

          cy.get('#response_body').invoke('text').then((text) => {
              cy.log(text)
              expect(text).contains('"name": "APPROVALLIQUOR, Daniel Aunt"')
          })

    })
}) 
