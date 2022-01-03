Feature: Selecting a SQL Query

    Scenario: Superuser opens the landing page
    	When Superuser opens the landing page
        Then the list of SQL Queries is shown
        And Category option combo overview query is shown        

    Scenario: Superuser tries to click on something
    	Given Superuser is on landing page
    	When Superuser clicks something
    	Then Page redirects to selected query

    Scenario: Superuser enter search term that does not match results
    	Given Superuser is on landing page
    	When Superuser types pineapple in search field
    	Then no results display

