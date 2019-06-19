const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.send({ msg: 'api up and running' });
});

module.exports = router;
