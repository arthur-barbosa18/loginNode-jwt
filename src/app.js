require('rootpath')();

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handlers');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// use JWT auth to secure the api
app.use('/profiles', require('./routes/profiles_routes'));

// api routes
app.use(jwt());

app.use('/users', require('./routes/'));

// global error handler
app.use(errorHandler);

module.exports = app;