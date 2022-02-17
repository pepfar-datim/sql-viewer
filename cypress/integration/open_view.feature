Feature: Opening a SQL View (no variables)

    
	Scenario: sql view populates with results if valid
    	When I open a valid sql view with id "cOfhJIFGqhP"
    	Then sql view results appear for sql view with id "cOfhJIFGqhP" and name "Code list data sets"

    Scenario: clicking on download button downloads results
    	Given I am on page for sql view with id "cOfhJIFGqhP"
    	When I click Download button
    	Then results for "Code list data sets" query download to csv

    Scenario: clicking on back button goes to view page
    	Given I am on page for sql view with id "cOfhJIFGqhP"
    	When I click Back button
    	Then page redirects to main page to select queries

    # NOT IMPLEMENTED
    Scenario: refreshing query refreshes results
    	#Given I am on page for sql view with id "cOfhJIFGqhP"
    	#When I click Refresh query button
    	#Then table refreshes

    Scenario: invalid query displays error
        When I try to open details for a sql view with id "cat" that does not exist
        Then an error is shown saying that query with id "cat" was not found

    # NOT IMPLEMENTED
    Scenario: when error on sql view execute, error displays
    	#When I open a sql view and the query fails during the execute post
    	#Then the error from the execution post is shown

    Scenario: when error retrieving sql view data, error displays
    	#When I open a sql view and the query fails during the data get
    	#Then the error from the data get request is shown

# Maybe better as a separate feature for table behavior?
    Scenario: clicking on column once alphabetizes order
    	Given I am on page for sql view with id "cOfhJIFGqhP"
    	When I click column "code" 1 times
    	Then code column is alphabetized a-z

    Scenario: clicking on column twice reverse alphabetizes order
    	Given I am on page for sql view with id "cOfhJIFGqhP"
    	When I click column "code" 2 times
    	Then code column is alphabetized z-a

    Scenario: clicking on column three times reverts to original order
    	Given I am on page for sql view with id "cOfhJIFGqhP"
    	When I click column "code" 3 times
    	Then code column is not alphabetized

    Scenario: clicking on a new column clears ordering of other columns
    	Given I am on page for sql view with id "cOfhJIFGqhP"
    	When I click column "code" 1 times
    	When I click column "name" 1 times
    	Then code column is ordered based on name ordering