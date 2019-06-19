const app = require('express')();
const apiRouter = require('./routes/api.js');

app.use('/api', apiRouter);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: 'Internal Server Error' });
});

module.exports = app;
