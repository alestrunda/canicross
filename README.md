# Canicross

*Sample project made as part of job post-interview process. The goal was to show programming habits, not to make flawless application. Hence I deliberately neglected some things like input fields validation, design...
For interview purposes I used redux for managing app state, though it would make more sense for such small app to use context API.*

*The application was reviewed successfully and I received an offer :)*

## Description

Simple application to manage dog walking. Two type of users - dog owner and a walker (person interesting in dog walking). Dog owner specifies when his dog is available and walkers may register for that time.

Made as SPA (react & redux, sass, material-ui), back-end in node.js and mongoDB.

Languages: English (default) and Czech.

## Connect database

App can run without db, but any changes will be lost. To connect mongoDB in folder `server` create file .env with DB_URI variable. For example `DB_URI = "mongodb://db_user:password@localhost/canicross"`

## Client scripts

In the **client** directory, you can run:

### `npm start`

Runs the app in the development mode.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.

## Server scripts

In the **server** directory, you can run:

### `npm start`

Starts nodeJS server.

### `npm develop`

Starts nodeJS server using nodemon.
