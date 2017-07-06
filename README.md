# DocumentME- Document Management System

[![Build Status](https://travis-ci.org/andela-johia/Document-management-system.svg?branch=staging)](https://travis-ci.org/andela-johia/Document-management-system)

[![Coverage Status](https://coveralls.io/repos/github/andela-johia/Document-management-system/badge.svg?branch=feature%2F147917171%2Fget-users-and-search-documents)](https://coveralls.io/github/andela-johia/Document-management-system?branch=feature%2F147917171%2Fget-users-and-search-documents)


## Introduction

DocumentME is an application that helps users manage their documents. A User can create a document, edit and delete documents.
The application utilizes RESTFUL API for managing documents, users and roles.


## Key Features of the Application

The app has two levels of authorization;

* A regular user can:
    * create documents
    * edit and Delete his/her document
    * edit and Delete his/her profile
    * limit access to a document by specifying an access level to public, private or role.
    * view public documents created by other users.
    * view `role` documents created users with the same or lesser role level.
    * login/logout.

* An admin user has all the priviledges of a regular user and more. They include
    * view all users.
    * create roles.
    * delete users.
    * edit and delete existing roles
    * Delete created roles aside form the admin role

## Technologies Utilized in the project
The application was developed with NodeJs and Postgres with sequelize as an ORM.
React along with the Redux architecture was used to develop the client side of the application


## Local Installation Guide
Follow the steps below to setup a local development environment. Ensure you have [Postgresql](https://www.postgresql.org/) and NodeJS installed

* Clone the repository from a terminal `https://github.com/andela-johia/Document-management-system.git`.
* Navigate to the project directory `cd Document-management-system`.
* Install project dependencies `npm install`
* Start the express server `npm start`.

## Testing
Ensure that project dependencies are installed before running tests.

### Server tests
* Open a terminal and navigate to the project directory
* Add a test database url (DATABASE_URL) to the `.env` file.
* Run `npm test`


## Limitations

* The application cannot accomodate millions of users
* Users cannot share documents with other users through social sharing


## Contributing to DocumentMe
Contributions are always welcomed to the project. If you are interested in enhancing the features in the project, follow these simple steps:
 * Fork the project to your repository then clone it to your local machine.
 * Create a new branch and make the necessary enhancement to the features.
 * If the you wish to update an existing enhancement submit a pull request.
 * If you are unsure about certain areas in the project feel to ask for assistance.

## Licence
This project is authored by Johnbosco Ohia it is licensed under the MIT license.
