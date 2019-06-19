const { filmData, directorData } = require('../data');
const { createRef, formatFilmData } = require('../../utils');

exports.seed = function(knex, Promise) {
  console.log('seed gonna insert some data...');
  return knex('directors')
    .insert(directorData)
    .returning('*')
    .then(directorRows => {
      console.log(`inserted ${directorRows.length} directors...`);
      const directorRef = createRef(directorRows, 'name', 'director_id');
      const formattedFilms = formatFilmData(filmData, directorRef);
      return knex('films')
        .insert(formattedFilms)
        .returning('*');
    })
    .then(filmRows => {
      console.log(`inserted ${filmRows.length} films...`);
    });
};
