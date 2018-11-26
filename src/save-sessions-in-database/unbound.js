module.exports = async ({ mongoose, dbConnection }, Model, moviesSessions) => {
  //await dbConnection("mongodb://movieapp:movieapp123@ds047355.mlab.com:47355/movie-scraper-db-dev")
  moviesSessions.map(async movie => {
    const dbMovie = Model({
      movieID: movie.movieID,
      movieTitle: movie.movieTitle,
      cinemas: movie.cinemas
    });
    await dbMovie.save();
    return dbMovie;
  });
};
