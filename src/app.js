const express = require('express');
const morgan = require('morgan');

const app = express();
const router = express.Router();
const registerUserRouter = require('./routes/user');

app.use(express.json());
app.use(morgan('dev'));

registerUserRouter(router);

app.use(router);

module.exports = app;
