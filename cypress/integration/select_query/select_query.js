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
    /*
    cy.intercept('GET', 'sqlViews*', {
        sqlViews: [
            { name: 'Snoopy', id: 'snoopyQUERY', displayName: 'Snoopy' },
            {
                name: 'Charlie Brown',
                id: 'charliBROWN',
                displayName: 'Charlie Brown',
            },
        ],
    }).as('getViews')
    cy.wait('@getViews')
    */
})

When('I click {string} query', queryName => {
    cy.wait(2000)
    cy.contains(queryName).click()
})

Then('page redirects to query with uid {string}', queryID => {
    cy.url().should('include', `view/${queryID}`)
})

/*
    cy.contains('Back').click()
    cy.get('#searchField').clear()
    cy.get('#searchField').type('Snoopy')    
    cy.contains('Snoopy').click()
    cy.contains('Back').click()
    cy.get('#searchField').contains('Snoopy').should('be.visible')
*/

When('I type {string} in search field', searchTerm => {
    cy.get('#searchField').clear()
    cy.get('#searchField').type(searchTerm)
})

Then('no results display', () => {
    cy.contains(/Displaying 0 of \d* row[s]*/)
    cy.get('.tableContainer table tbody').should('be.empty')
})

When('I click Back button', () => {
    cy.contains('Back').click()
})

// maybe make clear search field after this
Then('search field still has {string}', searchTerm => {
    cy.get('#searchField').should('have.value', searchTerm)
})

When('I click more button for query with id {string}', queryID => {
    cy.get(`[data-test="moreButton_${queryID}"]`).click()
})

When('I click {string} link', linkString => {
    cy.contains(linkString).click()
})

Then(
    '{string} link should have link to {string} for query {string}',
    (linkString, resource, queryID) => {
        cy.contains(linkString).should('be.visible')
        const queryMatch = new RegExp(resource + '.*' + queryID)
        cy.contains(linkString)
            .should('have.attr', 'href')
            .and('include', queryMatch)
    }
)
