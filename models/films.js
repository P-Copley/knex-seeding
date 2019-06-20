const connection = require('../db/connection');

exports.getFilms = ({ sortBy = 'rating' }) => {
  return connection('films')
    .select('films.*', 'name AS director')
    .join('directors', 'films.director_id', '=', 'directors.director_id')
    .orderBy(sortBy, 'asc');
};

exports.insertFilm = newFilm => {
  return connection('films')
    .insert(newFilm)
    .returning('*')
    .then(([addedFilm]) => addedFilm);
};
