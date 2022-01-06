Feature: Selecting a SQL Query

    Scenario: open the landing page
    	When I open the landing page
        Then the list of SQL Queries is shown
        And Category option combo overview query is shown        

    Scenario: redirects when clicking on query
    	Given I am on the landing page
    	When I click "Category option combo overview" query
    	Then page redirects to query with uid "QAlOivHBY3a"

    Scenario: search term only displays matching results
    	Given I am on the landing page
    	When I type "pineapple" in search field
    	Then no results display

	Scenario: search term persists when clicking back from query
    	Given I am on the landing page
    	When I type "Category" in search field
    	When I click "Category option combo overview" query
    	When I click Back button
    	Then search field still has "Category"

    Scenario: can click on "open in sql viewer" from more button
    	Given I am on the landing page
    	When I click more button for query with id "QAlOivHBY3a"
    	And I click "open in sql viewer" link
    	Then page redirects to query with uid "QAlOivHBY3a"

    # Cypress cannot check new tab, so just check link
    Scenario: can click on "open in api" from more button 
    	Given I am on the landing page
    	When I click more button for query with id "QAlOivHBY3a"
    	Then "open in api" link should have link to "api" for query "QAlOivHBY3a"

    Scenario: can click on "open in maintenance app" from more button
    	Given I am on the landing page
    	When I click more button for query with id "QAlOivHBY3a"
    	Then "open in maintenance app" link should have link to "dhis-web-maintenance" for query "QAlOivHBY3a"
