// handlers
exports.handlePsqlErrors = (err, req, res, next) => {
  const codes = ['42703', '22P02', '23502'];
  if (codes.includes(err.code)) {
    res.status(400).send({ msg: 'bad request' });
  } else {
    next(err);
  }
};

exports.handle500Errors = (err, req, res, next) => {
  (err, req, res, next) => {
    console.log(err);
    res.status(500).send({ msg: 'Internal Server Error' });
  };
};

// controllers
exports.send405 = (req, res, next) => {
  res.status(405).send({ msg: 'method not allowed' });
};
