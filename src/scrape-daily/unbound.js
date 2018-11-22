/*
Orchestrates scraping using other modules
Output : 
[{
  movies:  {
    sessions{
      cinema-info
      session-info
    }
  }
}]
Input: date-range, movies, max cinemas per request
Dependencies : @movies, @movie-sessions, @cinemas,  @url
Flow : 
  1. Get all cinemas
  2. Scrape
    2.1 create URL
    2.2 get movies
    2.3 get session for each movie
  3. Compose output
*/

module.exports = async (
  { page, movies, sessions, url },
  sessionDate,
  cinemaList,
  movieList,
  maxCinemasPerCycle = 10
) => {
  console.log("start");
  let sessionResults = [];

  let currentCinemaIndex = 0;
  let limit = maxCinemasPerCycle;
  //*********** ITERATION 1/4 : CHUNKS of CINEMAS **********
  while (currentCinemaIndex < cinemaList.length) {
    //console.log(_cinemas);
    //create URL for the cinema site
    const _url = await url(sessionDate, movieList, {
      cinemaIDs: cinemaList,
      start: currentCinemaIndex,
      limit: maxCinemasPerCycle
    });

    //Scrape
    //console.log(`Fetching sessions from ${_url}`);
    console.log(_url);
    await page.goto(_url);

    const _movies = await movies({ page });

    //Get the sessions for each @_movies
    const _movieSessions = await _movies.map(
      async (_movie, index) => {
        return (await sessions({ page: page }, index + 1)).map(session =>
          Object.assign(_movie, session)
        );
      },
      { page }
    );
    console.log(`_movies ${_movies}`);
    console.log(`_movieSessions ${_movieSessions}`);

    Promise.all(_movieSessions).then(res => {
      console.log(res.reduce((acc, val) => acc.concat(val), []));
      sessionResults.push(res.reduce((acc, val) => acc.concat(val), []));
    }); // flatten the arrays of arrays by movies

    //increment the loop conditions
    console.log(
      `currentCinemaIndex : ${currentCinemaIndex} limit: ${limit} array length ${
        cinemaList.length
      }`
    );
    currentCinemaIndex =
      currentCinemaIndex + maxCinemasPerCycle <= cinemaList.length
        ? currentCinemaIndex + maxCinemasPerCycle
        : cinemaList.length;
    limit =
      cinemaList.length - currentCinemaIndex <= maxCinemasPerCycle
        ? cinemaList.length - currentCinemaIndex
        : maxCinemasPerCycle;
  }

  console.log("before result");

  return sessionResults;
};
