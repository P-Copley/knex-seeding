const express = require('express');
const router = express.Router();
const { sendFilms, addFilm } = require('../controllers/films');
const { send405 } = require('../errors');

router
  .route('/films')
  .get(sendFilms)
  .post(addFilm)
  .all(send405);

module.exports = router;
