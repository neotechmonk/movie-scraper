module.exports = async (
  { dbConnection },
  { Movie, Cinema, Session },
  moviesSessions
) => {
  //Establish connection 
  await dbConnection();

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
              _session => new Session({..._session })
            )
          })
      )
    });
    console.log(JSON.stringify(dbMovie, null, 2));
    await dbMovie.save();
  });
};
