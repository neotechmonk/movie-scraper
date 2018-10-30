(async () => {
  const puppeteer = require("puppeteer");

  //Date to retrieve data for
  const today = new Date();
  today.setDate(today.getDate() + 1);
  const todayDateString =
    today.getFullYear() +
    "-" +
    ("0" + (today.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + today.getDate()).slice(-2);
  //https://www.eventcinemas.com.au/Sessions#movies=12814,13027,13120,12953,12949,12749,12953&date=2018-11-02&cinemas=13,68,64,58,65,53,36,67,5,15,21,62,7,85,35,19,55,82,75,10,66,63,69,9,11,43,42,91,24,59,29,44,61,89,30,28,56,33,92,49,48,25,79,39,50,38,74,31,77,86,23,34,47,83,26,78,52,37,81,40,88,54,87,22,71,73,17,72,18,90

  const URL = "https://www.eventcinemas.com.au/Sessions#movies=12814,13027,13120,12953,12949,12749,12953&date=DATE&cinemas=13,58,65,53,19,55,66,11,59".replace(
    "DATE",
    todayDateString
  ); //inject date
  //   "https://www.eventcinemas.com.au/Sessions#movies=12326&date=2018-11-02&cinemas=13,58,19,66,11,59";

  const MOVIE_CONTAINER_SELECTOR =
    "#session-list > div.movie-container.list-view > ul";
  const MOVIE_LENGTH_SELECTORCLASS =
    "movie-list-item movie-container-item split-content";
  const MOVIE_SELECTOR =
    "#session-list > div.movie-container.list-view > ul > li:nth-child(MOVIE_INDEX) > div.movie-list-detail.dynamic > div.desktop-content > a > span.title";

  const HIDDEN_MOVIE_SELECTOR =
    "#session-list > div.movie-container.list-view > ul > li:nth-child(MOVIE_INDEX)";
  const CINEMA_LENGTH_SELECTORCLASS =
    "#session-list > div.movie-container.list-view > ul > li:nth-child(MOVIE_INDEX) > div.movie-list-detail.dynamic > div.cinemas > div.cinema";
  const CINEMA_SELECTOR =
    "#session-list > div.movie-container.list-view > ul > li:nth-child(MOVIE_INDEX) > div.movie-list-detail.dynamic > div.cinemas > div:nth-child(CINEMA_INDEX) > span.cinema-name";
  const SESSION_LENGTH_SELECTORCLASS =
    "#session-list > div.movie-container.list-view > ul > li:nth-child(MOVIE_INDEX) > div.movie-list-detail.dynamic > div.cinemas > div:nth-child(CINEMA_INDEX) > div a.session-btn";
  const SESSION_SELECTOR =
    "#session-list > div.movie-container.list-view > ul > li:nth-child(MOVIE_INDEX) > div.movie-list-detail.dynamic > div.cinemas > div:nth-child(CINEMA_INDEX) > div > a:nth-child(SESSION_INDEX)";

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 735 });
  page.setDefaultNavigationTimeout(100000000);

  await page.goto(URL);
  await page.waitForSelector(MOVIE_CONTAINER_SELECTOR);

  const numMovies = await page.evaluate(sel => {
    return document.getElementsByClassName(sel).length;
  }, MOVIE_LENGTH_SELECTORCLASS);

  let movieSessions = [];
  const visibleMovies = [];
  //Iterate through movies
  for (let m = 1; m <= numMovies; m++) {
    const movieResult = {
      name: "",
      cinemas: []
    };

    //Substitue INDEX
    let movieSelector = MOVIE_SELECTOR.replace("MOVIE_INDEX", m);
    let hiddemMovieSelector = HIDDEN_MOVIE_SELECTOR.replace("MOVIE_INDEX", m);
    let cinemaSelector = CINEMA_SELECTOR.replace("MOVIE_INDEX", m);
    let sessionSelector = SESSION_SELECTOR.replace("MOVIE_INDEX", m);
    let cinemaNumSelector = CINEMA_LENGTH_SELECTORCLASS.replace(
      "MOVIE_INDEX",
      m
    );
    let sessionNumSelector;

    // Break loop if a movie is hidden
    let ishidenMovie = await page.evaluate(sel => {
      return document
        .querySelector(sel)
        .getAttribute("class")
        .includes("evohide");
    }, hiddemMovieSelector);

    let movie = await page.evaluate(sel => {
      return document.querySelector(sel).innerText.trim();
    }, movieSelector);

    movieResult.name = movie;
    movieSessions.push(movieResult);
    //    console.log(`movie ${movie}`);

    const numCinemas = (await page.$$(cinemaNumSelector)).length;

    if (!ishidenMovie) visibleMovies.push(m - 1);

    //Iterate through cinemas
    for (let c = 1; c <= numCinemas; c++) {
      //Substitue INDEX
      cinemaSelector = cinemaSelector.replace("CINEMA_INDEX", c);
      sessionSelector = sessionSelector.replace("CINEMA_INDEX", c);
      cinemaNumSelector = CINEMA_LENGTH_SELECTORCLASS.replace(
        "CINEMA_INDEX",
        c
      );
      sessionNumSelector = SESSION_LENGTH_SELECTORCLASS.replace(
        "MOVIE_INDEX",
        m
      ).replace("CINEMA_INDEX", c);

      //Get Cinema name
      let cinema = await page.evaluate(sel => {
        return document.querySelector(sel).innerText.trim();
      }, cinemaSelector);

      movieSessions[m - 1].cinemas.push({ name: cinema, sessions: [] });
      //console.log(` cinema name ${cinema}`);

      //Reset selector - remove index
      cinemaSelector = CINEMA_SELECTOR.replace("MOVIE_INDEX", m);
      movieNumSelector = CINEMA_LENGTH_SELECTORCLASS.replace("MOVIE_INDEX", m);

      const numSessions = (await page.$$(sessionNumSelector)).length;

      //Iterate through sessions
      for (let s = 1; s <= numSessions; s++) {
        sessionSelector = sessionSelector.replace("SESSION_INDEX", s);

        //console.log(sessionSelector);
        //        console.log(`sessionSelector ${sessionSelector}`);
        //console.log(`numSessions ${numSessions}`);
        let session = await page.evaluate(sel => {
          return document.querySelector(sel).getAttribute("data-time");
        }, sessionSelector);

        movieResult.cinemas[c - 1].sessions.push(session);

        //Reset selector - remove index
        sessionSelector = SESSION_SELECTOR.replace("MOVIE_INDEX", m).replace(
          "CINEMA_INDEX",
          c
        );
      }
      sessionNumSelector = SESSION_LENGTH_SELECTORCLASS.replace(
        "MOVIE_INDEX",
        m
      ).replace("CINEMA_INDEX", c);

      cinemaNumSelector = CINEMA_LENGTH_SELECTORCLASS.replace(
        "CINEMA_INDEX",
        c
      );
    }
  }

  console.log(movieSessions.length);
  //remove the hidden movies from the list
  const filteredMovies = [];
  visibleMovies.forEach(hm => {
    filteredMovies.push(movieSessions[hm]);
  });
  console.log(filteredMovies.length);

  movieSessions.filter(() => {});
  const fs = require("fs");
  const json = JSON.stringify(filteredMovies, null, 2);
  //console.log(json);
  fs.writeFileSync("scrapedMovies.json", json, "utf8");

  console.log(filteredMovies.map(ms => ms.name));
  await browser.close();
})();
