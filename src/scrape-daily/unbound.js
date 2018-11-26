/*
Orchestrates scraping using other modules for a given dat
Output : 
[{
  movies:  {
    sessions{
      cinema-info
      session-info
    }
  }
}]
Input: date, movies, max cinemas per request
Dependencies : @movies, @movie-sessions, @cinemas,  @url, @ramda
Flow : 
    
    1 create URL
    2 get movies
    3 get session for each movie
    4 Compose output
*/

module.exports = async (
  {  moviesFn, sessionsFn, urlFn, R = require("ramda") },
  page, date,
  cinemas,
  movieList,
  limit = 10
) => {
  let sessionResults = []; //place holder to

  

  let index = 0;

  while (index < cinemas.length) {
    //URL with subset of cinemas in the current loop cycle
    const url = await urlFn(date, movieList, {
      cinemaIDs: cinemas,
      start: index,
      limit: limit
    });

    await page.goto(url);

    //movies on the URL
    const movies = await moviesFn({ page });
    

    //Get the sessions for each @_movie
    const sessions = await movies.map(
      async (movie) => {
        const res = (await sessionsFn({ page: page }, movie.movieID)).map(session => {
          return Object.assign({}, movie, session);
        });
       return res;
      },
      { page }
    );

    
    //Accumulate @_movieSessions
    sessionResults = R.concat(
      sessionResults,
      await Promise.all(sessions).then(p => {
        return R.flatten(p);
      })
    );

    //increment the while loop condition
    index += R.min(cinemas.length - limit, limit);
  }
  return sessionResults;
};
