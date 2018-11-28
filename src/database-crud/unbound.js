module.exports = async (
  { dbConnection },
  { Movie, Cinema, Session },
  moviesSessions
) => {
  return new Promise(async (resolve, reject) => {
    //Establish connection
    await dbConnection();

    // Delete exsiting entries in the DB
    await Movie.deleteMany();

    //Iterate and save the array of nested objects
    moviesSessions.map(async movie => {
      const dbMovie = Movie({
        movieID: movie.movieID,
        movieTitle: movie.movieTitle,
        cinemas: movie.cinemas.map(
          _cinema =>
            new Cinema({
              cinemaID: _cinema.cinemaID,
              sessions: _cinema.sessions.map(
                _session => new Session({ ..._session })
              )
            })
        )
      });

      dbMovie.save().then(resolve(true));
    });
  });
};
