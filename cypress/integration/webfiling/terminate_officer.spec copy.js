/// <reference types="Cypress" />

describe('Change of registered office address', () => {
    it('File successful TM01', () => {
        cy.visit('https://ewf.kermit.orctel.internal')
        cy.get('#email').type('testautomation@companieshouse.gov.uk')
        cy.get('#seccode').type('password123')
        cy.get('.button').click()

        // Sign into company
        cy.get("input[id='companySignInPage\.coNum']").type('00006400')
        cy.get("input[id='companySignInPage\.authCode']").type('222222')
        cy.get('.button').click()

        // Go to terminate officers
        // Select all forms
        cy.get('#tabFormListing').click()
        cy.contains('Directors and secretaries').click()
        cy.contains('Termination of appointment of director - TM01').click()

        // Check to ensure the labels are present and correct
        cy.get('.name').should('have.text', 'Name')
        cy.get('.role').should('have.text', 'Role')
        cy.get('.dob').should('have.text', 'Date of birth')
        
        // Check hidden columns
        cy.checkForHiddenLabel('thead > :nth-child(2) > :nth-child(4)', 'Edit Links')
        cy.checkForHiddenLabel('thead > :nth-child(2) > :nth-child(5)', 'Remove Links')

        // Check 13 officers are present
        cy.get('tbody  tr td:nth-child(4)  a').as('Edits')
        /*
        This will initiate a 'Change of details' for the expected officer
        making this a CH01 test in reality
        */
        cy.get('@Edits').each((element, index, $list) => {
            cy.get(element).invoke('text').then((text) => {
                cy.log(text)
                cy.log('index: ' + index)
                if(index === 4) {
                    cy.log('Found the 4th index.')
                    cy.wrap(element).should('contain.text', 'Halibut Condition GUEST')
                    .click()
                }
            })

        })

        // Check new page is entered
        cy.url().should('include', 'CH01&preFilingPage')
        // Check to ensure Tick and Cross are displayed
        cy.get('.tick').should('not.be.hidden')
        cy.get('.cross').should('not.be.hidden')

        // Make a change to the selected officer
        cy.get('#ch01-prescreen-start').click()

        // Apply today's date for date of change
        const day = Cypress.moment().format('DD')
        const month = Cypress.moment().format('MMMM')
        const year = Cypress.moment().format('YYYY')

        cy.log(Cypress.moment().format('Do MMMM YYYY'))

        cy.get('#day-select-1').select(day)
        cy.get('#month-select-1').select(month)
        cy.get('#year-select-1').select(year)

        // As no change has been made ensure the submission button is disabled
        cy.get('.submit').should('have.attr', 'disabled')

    })

})