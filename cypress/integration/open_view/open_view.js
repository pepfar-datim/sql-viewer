import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps'
const path = require('path')

When('I open a valid sql view with id {string}', queryID => {
    cy.visit(`/#/view/${queryID}`)
})

Then(
    'sql view results appear for sql view with id {string} and name {string}',
    (queryID, queryName) => {
        cy.wait(2000)
        cy.contains(queryName).should('exist')
        cy.get('.tableContainer table tbody')
            .find('tr')
            .should('have.length', 27)
    }
)

Given('I am on page for sql view with id {string}', queryID => {
    cy.visit(`/#/view/${queryID}`)
    // maybe download file + search field cleanup?
})

When('I click Download button', () => {
    cy.contains('Download CSV').click()
})

Then('results for {string} query download to csv', queryName => {
    const expectedCSV =
        'name,code\n0-validations,\nART monthly summary,DS_394131\nChild Health,DS_359711\nClinical Monitoring Checklist,DS_217115\nEPI Stock,DS_1149441\nEmergency Response,\nExpenditures,EXP\nFacility Assessment,DS_1151444\nHIV Care Monthly,HIV_CARE\nHIV Peadiatric monthly summary,DS_377538\nIDSR Weekly,\nIDSR Weekly (Start Wednesday),\nInpatient Morbidity/Mortality Summary,DS_1151033\nLife-Saving Commodities,DS_1153709\nMNCH Quarterly Report,DS_1151032\nMorbidity,DS_359414\nMortality < 5 years,DS_1148628\nMortality < 5 years Narratives,DS_283467\nMortality < 5 years by age group,DS_242322\nMortality < 5 years by gender,DS_812532\nPMTCT monthly summary,DS_363642\nPopulation,DS_490350\nProject Management,DS_123523\nReproductive Health,DS_359593\nStaffing,DS_360545\nTB Facility Reporting Form,DS_543073\nTB/HIV (VCCT) monthly summary,DS_387142\n'
    const downloadsFolder = cy.config('downloadsFolder')
    cy.readFile(path.join(downloadsFolder, `${queryName}.csv`)).should('exist')
    cy.readFile(path.join(downloadsFolder, `${queryName}.csv`)).should(
        'eq',
        expectedCSV
    )
})

Then('page redirects to main page to select queries', () => {
    cy.url().should('match', /#\/$/)
})

When('I click Refresh query button', () => {
    // need to review because button is being clicked before visible
    cy.wait(1000)
    cy.contains('Refresh Query').click({ force: true })

    // this isn't working, also data xhr isn't showing up
    cy.intercept('POST', '**/sqlViews/cOfhJIFGqhP/execute**', {}).as('postData')

    cy.intercept('GET', '**/sqlViews/cOfhJIFGqhP/data**', {
        listGrid: {
            metaData: {},
            headerWidth: 2,
            subtitle: 'Code list data sets',
            width: 2,
            title: 'Code list data sets',
            height: 27,
            headers: [
                {
                    hidden: false,
                    meta: false,
                    name: 'name',
                    column: 'name',
                    type: 'java.lang.String',
                },
                {
                    hidden: false,
                    meta: false,
                    name: 'code',
                    column: 'code',
                    type: 'java.lang.String',
                },
            ],
            rows: [['Snoopy', 'dog']],
        },
    }).as('getData')

    cy.wait('@postData')
    cy.wait('@getData')
})

Then('table refreshes', () => {
    cy.contains('Snoopy').should('be.visible')
})

When(
    'I try to open details for a sql view with id {string} that does not exist',
    queryID => {
        cy.visit(`/#/view/${queryID}`)
    }
)

Then(
    'an error is shown saying that query with id {string} was not found',
    queryID => {
        cy.contains(`SqlView with id ${queryID} could not be found`)
    }
)

When('I click column {string} {int} times', (columnName, clickCount) => {
    for (let i = 0; i < clickCount; i++) {
        cy.contains(columnName).click()
        cy.wait(1000)
    }
})

Then('code column is alphabetized a-z', () => {
    cy.get('.tableContainer table tbody tr').eq(0).contains('DS_123523')
})

Then('code column is alphabetized z-a', () => {
    cy.get('.tableContainer table tbody tr').eq(0).get('td').should('be.empty')
})

Then('code column is not alphabetized', () => {
    cy.get('.tableContainer table tbody tr').eq(1).contains('DS_394131')
})

Then(
    'code column is ordered based on name ordering',
    () => {
        cy.get('.tableContainer table tbody tr').eq(1).contains('DS_394131')
    }
)
