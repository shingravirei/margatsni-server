const express = require('express');
const morgan = require('morgan');
const Knex = require('knex');
const { Model } = require('objection');
const knex = Knex(require('../knexfile').development);
const registerUserRouter = require('./routes/user');
const registerAuth = require('./routes/auth');

const app = express();
const router = express.Router();

// Binding knex instance to objection Model
Model.knex(knex);

app.use(express.json());
app.use(morgan('dev'));

// registering the routes
registerUserRouter(router);
registerAuth(router);

app.use(router);
app.use((req, res) => {
    res.status(404).send({ error: 404 });
});

module.exports = app;
