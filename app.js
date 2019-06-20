const express = require('express');
const app = express();
const apiRouter = require('./routes/api.js');
const {
  handlePsql400Errors,
  handlePsql422Errors,
  handle500Errors,
  handleCustomErrors
} = require('./errors');

app.use(express.json());
app.use('/api', apiRouter);
app.use((req, res, next) => {
  next({ status: 404, msg: 'route not found' });
});

app.use(handleCustomErrors);
app.use(handlePsql400Errors);
app.use(handlePsql422Errors);
app.use(handle500Errors);

module.exports = app;
