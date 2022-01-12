import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps'

When('I open the landing page', () => {
    cy.visit('/')
    // clear search field upon start of text
    cy.get('#searchField').clear()
})

Then('the list of SQL Queries is shown', () => {
    cy.contains('SQL Views').should('exist')
    cy.get('.tableContainer table tbody').should('not.be.empty')
})

Then('Category option combo overview query is shown', () => {
    cy.contains('Category option combo overview').should('be.visible')
})

Given('I am on the landing page', () => {
    cy.visit('/')
    cy.get('#searchField').clear()
})

When('I click {string} query', queryName => {
    cy.wait(2000)
    cy.contains(queryName).click()
})

Then('page redirects to query with uid {string}', queryID => {
    cy.url().should('include', `view/${queryID}`)
})

When('I type {string} in search field', searchTerm => {
    cy.get('#searchField').clear()
    cy.get('#searchField').type(searchTerm)
})

Then('no results display', () => {
    cy.contains(/Displaying 0 of \d* row[s]*/)
    cy.get('.tableContainer table tbody').should('be.empty')
})

When('I click Back button', () => {
    cy.get(`[data-test="back-to-search"]`).click()
})

Then('search field still has {string}', searchTerm => {
    cy.get('#searchField').should('have.value', searchTerm)
})

Then(
    '{string} link should have link to {string} for query {string}',
    (linkString, resource, queryID) => {
        cy.contains(linkString).should('be.visible')
        const queryMatch = new RegExp(resource + '.*' + queryID)
        cy.contains(linkString)
            .should('have.attr', 'href')
            .and('match', queryMatch)
    }
)
