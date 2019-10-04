class ResultsPage {

    checkStatusEquals(statusText) {
        cy.get('#response_code').should('have.text', statusText)
        return this;
    }

    responseBodyShouldContain(key, value) {
        cy.get('#response_body').invoke('text').then((text) => {
            cy.log(text)
            expect(text).contains(key, value)
        })
    }

}

export default ResultsPage;