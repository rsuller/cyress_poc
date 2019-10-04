/// <reference types="Cypress" />

import CompaniesHouseAPIPage from '../../support/pageObjects/CompaniesHouseAPIPage'
import SearchCompaniesPage from '../../support/pageObjects/SearchCompaniesPage'
import ResultsPage from '../../support/pageObjects/ResultsPage'

const url = Cypress.env('developer_site')

beforeEach(function() {
    cy.visit(url)
    // Login
    cy.get('#user-signin').click()
    cy.signInToCHS()
})


describe('CHS Developer Site', function() {
    const homePage = new CompaniesHouseAPIPage();
    const searchCompaniesPage = new SearchCompaniesPage();
    const resultsPage = new ResultsPage();

    it.only('Search Company', function() {
        homePage.searchCompany();

        // Search for 00006400
        searchCompaniesPage.searchForCompany('00006400')

        // Check Success
        resultsPage.checkStatusEquals('200 OK')
        .responseBodyShouldContain('title', 'THE GIRLS\' DAY SCHOOL TRUST')
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

    it('GET Filing History by transaction', function() {
        cy.contains('Filing history').click()
        cy.get('#getFilingHistoryItem').click()

        // Search for 00006400 and transaction OTYxMTUzMzQ4OGFkaXF6a2N4
        cy.get('#company_number').type('00006400')
        .get('#transaction_id').type('OTYxMTUzMzQ4OGFkaXF6a2N4').get('#exploreButton').click()

          // Check Success
          cy.get('#response_code').should('have.text', '200 OK')

          cy.get('#response_body').invoke('text').then((text) => {
              cy.log(text)
              expect(text).contains('"transaction_id": "OTYxMTUzMzQ4OGFkaXF6a2N4"')
          })

    })

    it('Insolvency', function() {
        cy.contains('Insolvency').click()
        cy.get('#readCompanyInsolvency').click()

        // Search for 00006400 and transaction OTYxMTUzMzQ4OGFkaXF6a2N4
        cy.get('#company_number').type('00006400').get('#exploreButton').click()

          // Check Success
          cy.get('#response_code').should('have.text', '404 Not Found')

          cy.get('#response_body').invoke('text').then((text) => {
              cy.log(text)
              expect(text).contains('"error": "company-insolvencies-not-found"')
          })

    })

    it('GET list of Charges', function() {
        cy.contains('Charges').click()
        cy.get('#getChargeList').click()

        // Search for 00006400 and transaction OTYxMTUzMzQ4OGFkaXF6a2N4
        cy.get('#company_number').type('00006400').get('#exploreButton').click()

          // Check Success
          cy.get('#response_code').should('have.text', '200 OK')

          cy.get('#response_body').invoke('text').then((text) => {
              cy.log(text)
              expect(text).contains('"unfiltered_count": 14')
          })

    })

    it('Officer Appointment List', function() {
        cy.contains('Officer Appointment List').click()
        cy.get('#appointmentList').click()

        // Search for 00006400 and officer JvKcg6LSGvb8dtz5xV4qoukBkgU
        cy.get('#officer_id').type('JvKcg6LSGvb8dtz5xV4qoukBkgU').get('#exploreButton').click()

          // Check Success
          cy.get('#response_code').should('have.text', '200 OK')

          cy.get('#response_body').invoke('text').then((text) => {
              cy.log(text)
              expect(text).contains('"name": "Condition Gym Snailliquor LEWIS"')
          })

    })
}) 
