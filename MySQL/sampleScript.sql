DROP DATABASE IF EXISTS practice;
CREATE DATABASE IF NOT EXISTS practice;
USE practice;

CREATE TABLE IF NOT EXISTS directors (
    directorId INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    director VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS movies(
    movieId INT PRIMARY KEY AUTO_INCREMENT,
    movieTitle VARCHAR(100),
    directorId INT NOT NULL,
    FOREIGN KEY (directorId) REFERENCES directors(directorId)
);

CREATE TABLE IF NOT EXISTS awards(
    awardId INT PRIMARY KEY AUTO_INCREMENT,
    award  VARCHAR(100) DEFAULT 'Oscar',
    directorId INT NOT NULL,
    FOREIGN KEY (directorId) REFERENCES directors(directorId)
);

INSERT INTO directors (director) VALUES
  ('Max'), ('Jason'), ('Thomas'), ('Mary'), ('Jen'), ('Alpacino'), ('Usher'), ('pops'), ('rihanna');

INSERT INTO movies (movieTitle, directorId) VALUES
  ('play', 1), ('jump', 3), ('up', 5), ('ran', 2), ('web', 4), ('bland', 1), ('stuff', 4);

INSERT INTO awards (award, directorId) VALUES
  ('Oscar', 1), ('Emmy', 4), ('Oscar', 4), ('Oscar', 4), ('Oscar', 2);

INSERT INTO awards (directorId) VALUES
  (5), (6), (8), (9);