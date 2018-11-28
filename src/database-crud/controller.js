const dbConnection = require("../database")();

//Modules
const Movie = require("./model.Movie");
const Cinema = require("./model.Cinema");
const Session = require("./model.Session");

//Returns all movies irrespective without session(show) info
const getMovies = async () => await Movie.find();
const getMovieByID = async id => await Movie.findById(id);
const getMovieByTitle = async title =>
  await Movie.findOne({ movieTitle: title }); 

export { getMovies, getMovieByID, getMovieByTitle };
