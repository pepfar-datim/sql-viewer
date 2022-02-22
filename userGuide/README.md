# SQL Viewer User Guide

The SQL Viewer app offers a user-friendly way to view SQL views and SQL queries on a DHIS2 system.

Note that the SQL Viewer app is designed to view SQL views and queries within DHIS2. In order to edit or administer them, please use DHIS2’s built-in Maintenance app. More information about editing and administrating SQL views can be found in the DHIS2 documentation, including [Manage SQL Views in the DHIS2 User Manual](https://docs.dhis2.org/en/full/use/user-guides/dhis-core-version-master/dhis2-user-manual.html#maintenance_sql_view) and [SQL Views in the DHIS2 Developer Manual](https://docs.dhis2.org/en/full/develop/dhis-core-version-master/developer-manual.html#webapi_sql_views).

Throughout this documentation, the word “view” is sometimes used to refer to both DHIS2 SQL views and queries.

## Selecting views

To open the SQL Viewer app, open the apps menu in DHIS2 and select SQL Viewer.
![Opening app](/userGuide/images/open_sql_viewer.png?raw=true)

When you initially open the app, you will be presented with a list of the views to which you have access.
![Main screen](/userGuide/images/main_screen.png?raw=true)

You can use the search bar to narrow down the list of views. You can also search by uid, even though the uid is not visible in the table.

To open a view, click the text of the view’s name. You can also click on the button with the three dots and then select “open in sql viewer”.
![Selecting a view from main screen](/userGuide/images/select_view.png?raw=true)

## Visualizing views / queries

### Views
When you open a SQL view you will be brought to a screen with the results of the view displayed in a table.

### Queries
When you open a query which contains variables, you will see the message that ”Variables must be filled out”:
![Fill out variables warning](/userGuide/images/fill_out_variables_warning.png?raw=true)

Fill in the values for the variables on the left hand side and click “Refresh Query” or hit enter to execute the query with the provided variables:
![Refresh query button](/userGuide/images/fill_out_variables_refresh.png?raw=true)

To share a link to the query with the variables prepopulated, copy the url from the navigation bar. 

To minimize the sidebar with the variables, click on the minus button.
![Minimize variables button](/userGuide/images/variables_minimize.png?raw=true)

To view the sidebar with the variables again, click on the plus button.
![Maximize variables button](/userGuide/images/variables_maximize.png?raw=true)

### Search
You can use the search bar to search within and narrow down the results. Searches are not case-sensitive and will match on any cell of data within a given row. Note that spaces are included as part of the search term; for example, a search for “orange cat” will match “the orange cat is here” but will not match “Orange is my cat”.

### Pagination
By default, 500 rows will be visible at a time. You can navigate to the next page or previous page of results or change the number of rows displayed by using the pagination controls in the bottom right corner:
![Pagination area](/userGuide/images/pagination.png?raw=true)

### Columns
You can order columns by clicking on them:
- Click once to order the column alphabetically
- Click twice to order the column reverse alphabetically
- Click three times to clear the ordering for the column
- Click four times to do the same as clicking once (and so on)
![Column sort example](/images/column_sort.png?raw=true)

### Download
You can click the “Download CSV” button in the bottom left corner to download the results in CSV format.
![Download button](/images/column_sort.png?raw=true)

### Edit
To edit a view, click on the button with the three dots, and select “open in maintenance app”. This will take you to the edit page in DHIS2’s built-in Maintenance app for that given SQL view.
![Open in maintenance app option](/userGuide/images/open_in_maintenance.png?raw=true)
