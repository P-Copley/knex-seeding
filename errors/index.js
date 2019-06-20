// handlers
exports.handlePsql400Errors = (err, req, res, next) => {
  const codes = ['42703', '22P02', '23502'];
  if (codes.includes(err.code)) {
    res.status(400).send({ msg: 'bad request' });
  } else {
    next(err);
  }
};

exports.handlePsql422Errors = (err, req, res, next) => {
  const codes = ['23503'];
  if (codes.includes(err.code)) {
    res.status(422).send({ msg: 'unprocessable request' });
  } else {
    next(err);
  }
};

exports.handleCustomErrors = (err, req, res, next) => {
  if (err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
};

exports.handle500Errors = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: 'Internal Server Error' });
};

// controllers
exports.send405 = (req, res, next) => {
  res.status(405).send({ msg: 'method not allowed' });
};
