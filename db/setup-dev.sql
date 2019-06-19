DROP DATABASE IF EXISTS imdb;
CREATE DATABASE imdb;
\c imdb;

CREATE TABLE directors
(
  director_id SERIAL PRIMARY KEY,
  name VARCHAR
);

CREATE TABLE films
(
  film_id SERIAL PRIMARY KEY,
  title VARCHAR,
  year_of_release INT,
  rating FLOAT NOT NULL DEFAULT 0,
  box_office BIGINT,
  duration INT,
  plot TEXT,
  director_id INT REFERENCES directors(director_id)
);

