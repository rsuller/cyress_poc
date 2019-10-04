class SearchCompaniesPage {

    searchForCompany(company) {
        cy.get('#q').type(company).get('#exploreButton').click()
    }
}

export default SearchCompaniesPage;