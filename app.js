const express = require('express');
const app = express();
const apiRouter = require('./routes/api.js');
const { handlePsqlErrors, handle500Errors } = require('./errors');

app.use(express.json());
app.use('/api', apiRouter);

app.use(handlePsqlErrors);
app.use(handle500Errors);

module.exports = app;
