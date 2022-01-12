Feature: Opening a SQL Query (with variables)

	Scenario: opening a sql query with no variables prepopulated from url
    	When I open a valid sql query with id "qMYMT0iUGkG"
    	Then variables drawer menu displays with blank variables
    	And warning message saying that variables must be filled out is shown

	Scenario: opening a sql query with variables prepopulated from url
    	When I open a valid sql query with id "qMYMT0iUGkG" with "valueType" = "INTEGER" in url
    	Then variables drawer menu displays with "valueType" = "INTEGER" in variables
    	And data is retrieved for valType=INTEGER

    Scenario: clicking on variables drawer toggle closes variables drawer if open
    	Given I am on page for sql query with id "qMYMT0iUGkG"
    	When I click on expand variables drawer button
    	Then variables drawer menu is hidden
    	And variables summary line is shown

    Scenario: clicking on variables drawer toggle opens variables drawer if closed
    	Given I am on page for sql query with id "qMYMT0iUGkG"
    	When I click on expand variables drawer button
    	When I click on collapse variables drawer button
    	Then variables drawer menu is shown
    	And variables summary line is hidden

    Scenario: typing in variables field updates url
		Given I am on page for sql query with id "qMYMT0iUGkG"
		When I type "snorkmaiden" into the input for variable with name "valueType"
		Then url updates to include "snorkmaiden" for variable with name "valueType"

    Scenario: link with variables is copyable from more menu
		Given I am on page for sql query with id "qMYMT0iUGkG"
		When I type "snorkmaiden" into the input for variable with name "valueType"
		And I click more button for query with id "view"
		And I click "copy link" link
		Then clipboard updates to include url with uid "qMYMT0iUGkG" and parameters include "valueType=snorkmaiden"

	Scenario: clicking Refresh query refreshes query if variables are filled out
		# Given I am on page for sql query with id "qMYMT0iUGkG"
		# When I type values for all variables
		# And I click Refresh query
		# Then sql query results appear for query "qMYMT0iUGkG" for provided variable values

	Scenario: hitting enter/return refreshes query if variables are filled out
		# Given I am on page for sql query with id "qMYMT0iUGkG"
		# When I type values for all variables
		# And I hit enter/return on my keyboard
		# Then sql query results appear for query "qMYMT0iUGkG" for provided variable values

	Scenario: clicking Refresh query displays warning if variables are not filled out
		Given I am on page for sql query with id "qMYMT0iUGkG"
		When I do not provide values for all variables
		And I click Refresh query
		Then warning message saying that variables must be filled out is shown
