const puppeteer = require("puppeteer");

(async () => {
  const STATES = ["ACT", "NSW", "QLD", "VIC", "SA", "WA", "NT"];
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

  const URL = "https://www.eventcinemas.com.au/Sessions#movies=12334,12328&date=DATE".replace(
    "DATE",
    todayDateString
  ); //inject date
  //   "https://www.eventcinemas.com.au/Sessions#movies=12326&date=2018-11-02&cinemas=13,58,19,66,11,59";

  const MOVIE_CONTAINER_SELECTOR = "#session-list";
  const MOVIE_LENGTH_SELECTORCLASS =
    "li.movie-list-item.movie-container-item.split-content";
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

  ///----------------

  const browser = await puppeteer.launch({
    handleSIGINT: true,
    //devtools: false
    headless: false,
    slowMo: 150
  });
  console.log(`**URL ${URL}`);

  let movieSessions = [];
  const visibleMovies = [];

  for (const state of STATES) {
    console.log(`Cinemas in ${state}`);
    const page = await browser.newPage({ context: `context for ${state}` });
    await page.setViewport({ width: 1366, height: 735 }); //form factor - laptop/PC
    await page.goto(URL);

    await page.waitFor(1000);

    //Select the State from the slider
    const result1 = await page.$eval(
      `div.top-select div.slider span.state[data-state-selector=${state}]`,
      elem => elem.click()
    );
    await page.waitFor(1000);

    //Check all the Cinemas in the state
    const elementPath = `div[data-state=${state}] div.top-select-option a.eccheckbox`;
    const _cinemas = await page.evaluate(elementPath => {
      return (movieTitles = Array.from(
        document.querySelectorAll(elementPath)
      ).map(cb => {
        cb.click();
        return ` ID: ${cb.getAttribute("data-id")} - ${cb.getAttribute(
          "data-name"
        )}`;
      }));
    }, elementPath);

    console.log(_cinemas);

    //Click the Done button. This will update the Base URL based on the cinemas selected above and provide access to sessions in all cinemas in the state
    await page.$eval("div.bottom-select>a", elem => elem.click());

    await page.waitForSelector(MOVIE_CONTAINER_SELECTOR);

    await page.waitFor(1000);

    const numMovies = await page.evaluate(sel => {
      return document.querySelectorAll(sel).length;
    }, MOVIE_LENGTH_SELECTORCLASS);
    console.log(MOVIE_LENGTH_SELECTORCLASS);

    console.log(`num movies ${numMovies}`);

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

      if (!ishidenMovie) {
        visibleMovies.push(m - 1);
        movieResult.name = movie;
        //Upsert the movie
        if (
          movieSessions.length === 0 ||
          (movieSessions.length > 0 &&
            movieSessions[movieSessions.length - 1].name != movie)
        ) {
          movieSessions.push(movieResult);
          console.log(`movie ${movie}`);
        }
      } else continue;

      const numCinemas = (await page.$$(cinemaNumSelector)).length;
      console.log(`numCinemas ${numCinemas}`);

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

        movieSessions[movieSessions.length - 1].cinemas.push({
          name: cinema,
          sessions: []
        });
        //console.log(` cinema name ${cinema}`);

        //Reset selector - remove index
        cinemaSelector = CINEMA_SELECTOR.replace("MOVIE_INDEX", m);
        movieNumSelector = CINEMA_LENGTH_SELECTORCLASS.replace(
          "MOVIE_INDEX",
          m
        );

        const numSessions = (await page.$$(sessionNumSelector)).length;
        console.log(`numSessions ${numSessions}`);
        //Iterate through sessions
        for (let s = 1; s <= numSessions; s++) {
          sessionSelector = sessionSelector.replace("SESSION_INDEX", s);

          //console.log(sessionSelector);
          //        console.log(`sessionSelector ${sessionSelector}`);
          //console.log(`numSessions ${numSessions}`);
          let session = await page.evaluate(sel => {
            return document.querySelector(sel).getAttribute("data-time");
          }, sessionSelector);

          movieSessions[movieSessions.length - 1].cinemas[
            movieSessions[movieSessions.length - 1].cinemas.length - 1
          ].sessions.push(session);

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

    //Uncheck the current State's cinemas
    await page.evaluate(elementPath => {
      return (movieTitles = Array.from(
        document.querySelectorAll(elementPath)
      ).map(cb => {
        cb.click();
        return;
      }));
    }, elementPath);
    //-------------------
    page.close(); // * </for state in State>
  }

  //Remove unnecessary movies and write the relevant movies to file
  const fs = require("fs");
  const json = JSON.stringify(movieSessions, null, 2);

  fs.writeFileSync("scrapedMovies.json", json, "utf8");

  await browser.close();
})();
