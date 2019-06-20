const { getFilms, insertFilm } = require('../models/films');

exports.sendFilms = (req, res, next) => {
  getFilms(req.query)
    .then(films => {
      res.send({ films });
    })
    .catch(next);
};

exports.addFilm = (req, res, next) => {
  const newFilm = req.body;
  insertFilm(newFilm)
    .then(addedFilm => {
      // console.log(addedFilm);
      res.status(201).send({ film: addedFilm });
    })
    .catch(next);
};
