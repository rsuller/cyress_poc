class CompaniesHouseAPIPage {

    searchCompany() {
        cy.contains('Search').click()
        cy.contains('Search company').click()
    }
    
}

export default CompaniesHouseAPIPage;