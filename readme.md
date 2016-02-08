# Dashboard for top active users

Your goal is to implement backend JSON API for an internal tool for getting an overview on the most active users. Activity is a measure of applied listings.

The tool consists of 2 views:

## Overview

This shows a list of most active users in the past week, orders the entries by activity and has pagination support.

## Detailed view

Shows info for user by id:

* user details
* applied listings
* connected companies
* created listings

Info for connected resources does not need to be paginated in this view, but needs to be limited to a maximum of 5 entries.

See the assumed structure for both of the service endpoints in spec.md.

Base database structure is fixed - you may not alter the underlying table structure. See definitions in `tables.sql`.

There is some starting dummy data in `data.sql` but feel free to add more. You don't need to have your testing data in your submission. The assumption is that the service stays performant with hundreds of thousands users, companies, listings and applications.
