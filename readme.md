# Dashboard for top active users

The goal was to implement backend JSON API for an internal tool for getting an overview on the most active users. Activity is a measure of total count of listings applied to.



# Table of Contents

- [Getting Started](#getting-started)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Testing](#testing)
- [API Endpoints](#api-endpoints)
- [Questions](#questions)
- [Support or Contribution](#support-or-contribution)

## Getting Started
This is a javascript application built with [**Node JS**](https://nodejs.org/en/) using [**Express**](https://expressjs.com/) framework on the backend. This application is also built to run in a docker container.


## Technology Stack
**Server Side**
1. NodeJS
2. Express FrameWork
3. Docker



## Installation

1. Install [**Node JS**](https://nodejs.org/en/).

2. Clone the [**repository here**](https://github.com/benfluleck/random-phone-number-generator)
3. [**cd**] into the root of the **project directory**.
4. Run `yarn install` on the terminal to install project dependecies
5. Create a `.env` file in the root directory of the application. Example of the content of a .env file is shown in the .env.example

6. Start the application:
**_Different Build Environments_**

**Development**
```
npm run build
npm run start:server
```
*Docker*
- To run the application in docker you need to install it.
There are some good docs [here](https://docs.docker.com/)
Open an .env file in the .docker folder to pass your environment variables to Docker

- To build the application and run docker
`docker-compose up build`

- This will help to build the application, setup the databse and seed it.

## API Endpoints
Api endpoints were created using `express` router. The routes are defined under `src/routes/index.js`.

Request type | Endpoint                                   | Action
-------------|--------------------------------------------|--------------------------------------------------
GET        | /api/v1/topActiveUsers?limit&page                             | Shows a list of most active users in the past week, orders them by activity
GET         | /api/v1/users/:id                      | Shows info for user by id, user details, applied listings, connected companies, created listings


## Testing

Sever side tests - Run `npm run test` on the terminal while within the **project root directory**.

Server side testing is achieved through use of `chai-http`, `mocha` and `chai` packages. `chai-http` is used to make requests to the api and `mocha` is the testing framework and `chai` is the exception library. They will both be installed when you run `npm run install` and the tests will run when you run `npm run test`.

## Questions
For more details contact benny.ogidan@andela.com

## Support or Contribution
For any suggestions or contributions or issues please do raise them or email me.
For **Contributiions**, Please clone the repo and implement a PR I would appreciate it
