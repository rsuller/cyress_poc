/// <reference types="Cypress" />

const url = Cypress.env('url')

beforeEach(function() {
    cy.log('Opening Late Filing Penalties')
    cy.visit(url + 'late-filing-penalty')
    // cy.eyesOpen({appName: 'CHS', batchName: 'CHS TEST'})

     // Start test
     cy.log('Start test')
     // cy.eyesCheckWindow('LFP Page')
 
     // Go to Late Filing Penalty Lookup
     cy.get('#next-button').click()
 
     // Log in with demo user
     cy.get('#signin_email').type(Cypress.env('user_email'))
     .get('#password').type(Cypress.env('user_password'))
     .get('#submit').click()
})

// afterEach(() => cy.eyesClose())

describe('LFP Payment UI testing', function() {
    it('Successful LFP payment', function() {

    // Enter transaction details
    cy.get('#company-ref').type('10000025')
    .get('#penalty-ref').type('00378425{enter}')

    // Follow process for making payment
    cy.get('#next-button').click()
    // Review Payment
    cy.contains('The total amount to pay is £150')

    /*
    Struggling to get the next phase working due to a different domain being accessed.
    May need to use API calls to replace this... Not sure.
    */

    // // // Enter Credit Card Details
    // cy.get('#card-no').type('4444333322221111')
    // .get('#expiry-month').type('10')
    // .get('#expiry-year').type('20')
    // .get('#cardholder-name').type('John Test')
    // .get('#cvc').type('356')
    // .get('#address-line-1').type('1')
    // .get('#address-line-2').type('High Street')
    // .get('#address-city').type('Cardiff')
    // .get('#address-postcode').type('CF14 3UZ')
    // .get('#email').type('testautomation@companieshouse.gov.uk')

    // // Confirm Payment
    // cy.get('#confirm').click()

    // cy.get('.govuk-panel__title').should('have.value', 'Payment received')

    })

    it('Transaction that has been previously paid for', () => {
        // Enter transaction details
        cy.get('#company-ref').type('10000027')
        .get('#penalty-ref').type('00378426{enter}')

        cy.get('.govuk-body-l').containsText('The penalty with a reference of 00378426 has been paid. No further action is required.')
    })

    it('Invalid payment reference number', () => {
        // Enter transaction details
        cy.get('#company-ref').type('10000025')
        .get('#penalty-ref').type('123456{enter}')

        cy.get('#penaltyNumber-errorId').should('have.text', 'Enter your penalty reference exactly as shown on your penalty letter')
    })

    it('No payment reference number', () => {
        // Enter transaction details
        cy.get('#company-ref').type('10000025')
        .get('#penalty-ref').type('{enter}')
    
        cy.get('#penaltyNumber-errorId').should('have.text', 'You must enter a penalty reference')
    })

    it('No company number', () => {
        // Enter transaction details
        cy.get('#company-ref').type(' ')
        .get('#penalty-ref').type('00378425{enter}')
    
        cy.get('#companyNumber-errorId').should('have.text', 'You must enter your full eight character company number')
    })

    it('Unable to pay for transactions with more than one penalty', () => {
        // Enter transaction details
        cy.get('#company-ref').type('NI038379')
        .get('#penalty-ref').type('00531369{enter}')
    
        cy.get('#page-title-heading').should('have.text', 'This penalty cannot be paid using this service')
    })

    it('Unable to pay for transactions when comany is in DCA', () => {
        // Enter transaction details
        cy.get('#company-ref').type('10000024')
        .get('#penalty-ref').type('00378420{enter}')
    
        cy.get('#page-title-heading').should('have.text', 'This penalty cannot be paid using this service')
    })

    it('Unable to pay for penalties that have been previously paid for', () => {
        // Enter transaction details
        cy.get('#company-ref').type('10000027')
        .get('#penalty-ref').type('00378426{enter}')
    
        cy.get('.govuk-body-l').containsText('The penalty with a reference of 00378426 has been paid. No further action is required.')
    })

    it('Unable to pay for penalties that have been part paid for', () => {
        // Enter transaction details
        cy.get('#company-ref').type('10000028')
        .get('#penalty-ref').type('00388429{enter}')
    
        cy.get('#page-title-heading').should('have.text', 'This penalty cannot be paid using this service')
    })

    it('Unable to pay for penalties that cannot be found in E5', () => {
        // Enter transaction details
        cy.get('#company-ref').type('00000000')
        .get('#penalty-ref').type('00388429{enter}')
    
        cy.get('#page-title-heading').should('have.text', 'No penalty found')
    })


})
