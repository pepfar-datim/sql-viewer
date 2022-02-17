# SQL Viewer App

**Repo Owner:** Ben Guaraldi [@benguaraldi](https://github.com/benguaraldi)

## Overview

The SQL Viewer app offers a user-friendly viewing experience for SQL views and SQL queries in DHIS2, allowing for variable entry, search within query results, and column sorting. 

## Installation on DHIS2

1. Install the app by downloading the .zip file of the latest release available [here](https://github.com/pepfar-datim/sql-viewer/releases) and then using the Manual Install option in the App Management app of your DHIS2 instance.
2. Users need to be granted access to the app in order to be able to access it. To do this, go to DHIS2 Users > User role > [role] > Apps > select `SQLViewer app`. Make sure to do this on any roles for which you want users to have access to SQL Viewer. Note that access to individual SQL Views and SQL Queries as well as the underlying data is governed by the sharing of the underlying objects. Granting a user access to the SQL Viewer App allows a user access to the app to view item they already have access to. 

## Local Build and Development

1. Fork or clone repo
2. Install all dependencies with `yarn install`
3. Run locally with `yarn start` (When starting for the first time, you will be prompted to provide information on your server and login credentials. SQL Viewer App is built with the DHIS2 App Platform, and you can find more information for troubleshooting on the [DHIS2 APP Platform website](https://platform.dhis2.nu/#/) )
4. Build for production locally with `yarn build`

## Issues, Features, etc.

Please create [an issue](https://github.com/pepfar-datim/sql-viewer/releases) or [a pull request](https://github.com/pepfar-datim/sql-viewer/pulls).
