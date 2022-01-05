Feature: Opening a SQL Query (with variables)

    # NOT IMPLEMENTED:
	Scenario: opening a sql query with no variables prepopulated from url
    	When I open a valid sql query with id "xyz"
    	Then variables drawer menu displays with blank variables
    	And warning message saying that variables must be filled out is shown

    Scenario: clicking on variables drawer toggle closes variables drawer if open
    	Given I am on page for sql query with id "xyz" with open variables drawer
    	When I click on variables drawer toggle button
    	Then variables drawer menu hides

    Scenario: clicking on variables drawer toggle opens variables drawer if closed
    	Given I am on page for sql query with id "xyz" with closed variables drawer
    	When I click on variables drawer toggle button
    	Then variables drawer menu displays

    Scenario: typing in variables field updates url
		Given I am on page for sql query with id "xyz" with open variables drawer
		When I type "snorkmaiden" into the input for variable with name "type"
		Then url updates to include "snorkmaiden" for variable with name "type"

	#
    Scenario: typing in variables field updates url
		Given I am on page for sql query with id "xyz" with open variables drawer
		When I type "snorkmaiden" into the input for variable with name "type"
		And I click more button
		And I click "copy link"
		Then clipboard updates to include url with uid "xyz" and parameters include "type=snorkmaiden"

	Scenario: clicking Refresh query refreshes query if variables are filled out
		Given I am on page for sql query with id "xyz" with open variables drawer
		When I type values for all variables
		And I click Refresh query
		Then sql query results appear for query "xyz" for provided variable values

	Scenario: hitting enter/return refreshes query if variables are filled out
		Given I am on page for sql query with id "xyz" with open variables drawer
		When I type values for all variables
		And I hit enter/return on my keyboard
		Then sql query results appear for query "xyz" for provided variable values

	Scenario: clicking Refresh query displays warning if variables are not filled out
		Given I am on page for sql query with id "xyz" with open variables drawer
		When I do not provide values for all variables
		And I click Refresh query
		Then warning message saying that variables must be filled out is shown







