const express = require('express');
const morgan = require('morgan');
const Knex = require('knex');
const { Model } = require('objection');
const jwt = require('express-jwt');
const errorHandler = require('./middleware/errorHandler');
const knex = Knex(require('../knexfile').development);
const registerUserRouter = require('./routes/user');
const registerAuth = require('./routes/auth');
const registerPost = require('./routes/post');

const app = express();
const router = express.Router();

// Binding knex instance to objection Model
Model.knex(knex);

app.use(express.json());
app.use(morgan('dev'));
app.use(
    jwt({ secret: process.env.SECRET, algorithms: ['HS256'] }).unless({
        path: ['/login', '/user']
    })
);

// registering the routes
registerUserRouter(router);
registerAuth(router);
registerPost(router);
app.use(router);

// Unkown routes
app.use((req, res) => {
    res.status(404).send({ status: 404 });
});

app.use(errorHandler());

module.exports = app;
