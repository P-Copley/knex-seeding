exports.createRef = (arr, key, value) => {
  return arr.reduce((acc, ele) => ({ ...acc, [ele[key]]: ele[value] }), {});
};

exports.formatFilmData = (films, directorRef) => {
  return films.map(({ director, ...restOfFilm }) => {
    return { director_id: directorRef[director], ...restOfFilm };
  });
};
