// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add(
    'containsText',
    {
        prevSubject: true,
    },
    function(subject, expectedText) {
        const text = subject[0].textContent.replace(/\s+/g, ' ');
        cy.log(text);
        expect(text).to.contain(expectedText);
    }
);

Cypress.Commands.add('enterTransactionDetails', (companyNumber, penaltyReference) => {
    cy.get('#company-ref').type(companyNumber)
        .get('#penalty-ref').type(penaltyReference + '{enter}')
});

Cypress.Commands.add('signInToCHS', ()=> {
    cy.get('#signin_email').type(Cypress.env('user_email'))
     .get('#password').type(Cypress.env('user_password'))
     .get('#submit').click()
})