import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps'

When('I open a valid sql query with id {string}', queryID => {
    cy.visit(`/#/view/${queryID}`)
})

When(
    'I open a valid sql query with id {string} with {string} = {string} in url',
    (queryID, varName, varVal) => {
        cy.visit(`/#/view/${queryID}?${varName}=${varVal}`)
    }
)

Then(
    'variables drawer menu displays with {string} = {string} in variables',
    (varName, varVal) => {
        cy.get(`#variableInput_${varName}`).should('have.value', varVal)
    }
)

Then('data is retrieved for valType=INTEGER', () => {
    cy.get('.tableContainer table tbody').find('tr').should('have.length', 26)
})

Then('variables drawer menu displays with blank variables', () => {
    cy.get('.drawer').should('be.visible')
    cy.get('.drawerWrapper').should('not.have.class', 'inactive')
    cy.get('.drawer input').each(el => {
        cy.wrap(el).should('be.empty')
    })
})

Then(
    'warning message saying that variables must be filled out is shown',
    () => {
        cy.contains('Variables must be filled out').should('be.visible')
    }
)

Given('I am on page for sql query with id {string}', queryID => {
    cy.visit(`/#/view/${queryID}`)
})

When('I click on expand variables drawer button', () => {
    cy.get(`[data-test="variable-drawer-toggle-expand"]`).click()
})

When('I click on collapse variables drawer button', () => {
    cy.get(`[data-test="variable-drawer-toggle-collapse"]`).click()
})

Then('variables drawer menu is hidden', () => {
    cy.get('.drawerWrapper').should('have.class', 'inactive')
})

Then('variables drawer menu is shown', () => {
    cy.get('.drawerWrapper').should('not.have.class', 'inactive')
})

Then('variables summary line is hidden', () => {
    cy.get('.variablesLineWrap').should('not.exist')
})

Then('variables summary line is shown', () => {
    cy.get('.variablesLineWrap').should('be.visible')
})

When(
    'I type {string} into the input for variable with name {string}',
    (varVal, varName) => {
        cy.get(`#variableInput_${varName}`).type(varVal)
    }
)

Then(
    'url updates to include {string} for variable with name {string}',
    (varVal, varName) => {
        cy.url().should('contain', `${varName}=${varVal}`)
    }
)

// not working
Then(
    'clipboard updates to include url with uid {string} and parameters include {string}',
    (queryID, paramString) => {
        cy.window().then(win => {
            win.navigator.clipboard.readText().then(text => {
                cy.wrap(text).should('contain', paramString)
            })
        })
    }
)

When('I do not provide values for all variables', () => {
    cy.get('.drawer input').each(el => {
        cy.wrap(el).clear()
    })
})

When('I click Refresh query', () => {
    cy.get(`[data-test="refresh-query-left"]`).click()
})
