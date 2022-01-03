import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps'

When('Superuser opens the landing page', () => {
    cy.visit('/')
    // clear search field upon start of text
    cy.get('#searchField').clear()
})

Then('the list of SQL Queries is shown', () => {
    cy.contains('SQL Views').should('be.visible')
})

Then('Category option combo overview query is shown', () => {
    cy.contains('Category option combo overview').should('be.visible')
})

Given('Superuser is on landing page', () => {
    cy.visit('/')
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
})

When('Superuser clicks something', () => {
    cy.wait(1000)
    cy.contains('Snoopy').click()
})

Then('Page redirects to selected query', () => {
    cy.url().should('include', 'view/snoopyQUERY')
})

When('Superuser types pineapple in search field', () => {
    cy.get('#searchField').clear()
    cy.get('#searchField').type('Pineapple')
})

Then('no results display', () => {
    cy.contains('Displaying 0 of 2 rows').should('be.visible')
    cy.get('.tableContainer table tbody').should('be.empty')
})
