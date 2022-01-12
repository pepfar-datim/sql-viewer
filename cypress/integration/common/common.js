import { When } from 'cypress-cucumber-preprocessor/steps'

When('I click Back button', () => {
    cy.get(`[data-test="back-to-search"]`).click()
})

When('I click more button for query with id {string}', queryID => {
    cy.get(`[data-test="moreButton_${queryID}"]`).click()
})

When('I click {string} link', linkString => {
    cy.contains(linkString).click()
})
