const fs = require("fs");
const puppeteer = require("puppeteer");
import { Movie, Cinema, Session } from "./domain-objects";

//+async function scrapeEventCinemas()

export async function scrapeEventCinemas(movies, sessionDate) {
  const STATES = ["ACT", "VIC", "SA", "WA", "NT", "NSW", "QLD"];
  const MAX_CINEMAS_PER_ITERATION = 5;
  //Date to retrieve data for

  const MOVIE_LENGTH_SELECTORCLASS =
    "li.movie-list-item.movie-container-item.split-content";
  const MOVIE_SELECTOR =
    "#session-list > div.movie-container.list-view > ul > li:nth-child(MOVIE_INDEX)";
  //"#session-list > div.movie-container.list-view > ul > li:nth-child(MOVIE_INDEX) > div.movie-list-detail.dynamic > div.desktop-content > a > span.title";

  const HIDDEN_MOVIE_SELECTOR =
    "#session-list > div.movie-container.list-view > ul > li:nth-child(MOVIE_INDEX)";
  const CINEMA_LENGTH_SELECTORCLASS =
    "#session-list > div.movie-container.list-view > ul > li:nth-child(MOVIE_INDEX) > div.movie-list-detail.dynamic > div.cinemas > div.cinema";
  const CINEMA_NAME_SELECTOR =
    "#session-list > div.movie-container.list-view > ul > li:nth-child(MOVIE_INDEX) > div.movie-list-detail.dynamic > div.cinemas > div:nth-child(CINEMA_INDEX) > span.cinema-name";
  const CINEMA_PROPERTY_SELECTOR =
    "#session-list > div.movie-container.list-view > ul > li:nth-child(MOVIE_INDEX) > div.movie-list-detail.dynamic > div.cinemas > div:nth-child(CINEMA_INDEX) > div.session-buttons > a";

  ///----------------

  const browser = await puppeteer.launch({
    handleSIGINT: true,
    devtools: false,
    headless: true
    // ,
    // slowMo: 150
  });

  let movieSessions = [];
  const visibleMovies = [];
  //! verify moving this out of the states loop hasnt broken anything

  let _cinemas = await getCinemaDetails({ states: STATES, browser: browser });

  let currentCinemaIndex = 0;
  let limit = MAX_CINEMAS_PER_ITERATION;
  //*********** ITERATION 1/4 : CHUNKS of CINEMAS **********
  while (currentCinemaIndex < _cinemas.length) {
    //Constuct URL
    //Add cinemas  IDs
    let newURL = preparedURL({
      movies: movies,
      sessionDate: sessionDate,
      cinemas: _cinemas,
      cinemaStartIndex: currentCinemaIndex,
      cinemaLimit: limit
    });

    console.log(`**URL ${newURL}`);

    const page = await browser.newPage();
    await page.setViewport({ width: 1366, height: 735 }); //form factor - laptop/PC

    await page.goto(newURL);
    await page.waitFor(1000);

    // close the popup modal to select cinemas and movies
    // await page.$eval(
    //   "body > header > div.fave-wrapper.open > div.fave-modal > span.close",
    //   elem => elem.click()
    // );

    const numMovies = await getElementCount(page, MOVIE_LENGTH_SELECTORCLASS);

    //*********** ITERATION 2/4 : MOVIE **********
    for (let _movieIndex = 1; _movieIndex <= numMovies; _movieIndex++) {
      //Main selector to identify movies
      let movieSelector = selectorBuilder({
        template: MOVIE_SELECTOR,
        parameters: [{ key: "MOVIE_INDEX", value: _movieIndex }]
      });

      //Selector to identify hidden movies.
      let hiddemMovieSelector = selectorBuilder({
        template: HIDDEN_MOVIE_SELECTOR,
        parameters: [{ key: "MOVIE_INDEX", value: _movieIndex }]
      });

      let movieResult = await page.evaluate(
        (sel, mr) => {
          mr.name = document.querySelector(sel).getAttribute("data-name");
          mr.id = document.querySelector(sel).getAttribute("data-id");
          return mr;
        },
        movieSelector,
        new Movie()
      );

      //Check if a movie by the same name already exists
      const existingMovies = movieSessions.filter(m => {
        return m.name === movieResult.name;
      });

      //Skip  loop if a movie is hidden
      let ishiddenMovie = await page.evaluate(sel => {
        return document
          .querySelector(sel)
          .getAttribute("class")
          .includes("evohide");
      }, hiddemMovieSelector);

      if (!ishiddenMovie) {
        visibleMovies.push(_movieIndex - 1);

        //Upsert the movie
        if (existingMovies.length === 0) {
          movieSessions.push(movieResult);
          console.log(movieResult);
        }
      } else continue;

      // console.log(
      //   `movie sessions at the end of movieSessions ${JSON.stringify(
      //     movieSessions,null, 2
      //   )}`
      // );
      let cinemaResult; // TODO temp.. ??
      // $$$ Get all sessions
      //cinemaResult.sessions =

      let cinemaSessionResults = getSessionInCinema({
        page: page,
        movieElementPosition: _movieIndex
      });

      console.log(JSON.stringify(cinemaSessionResults, null, 2));

      //Add cinemas to the Result Array
      movieSessions.push(movieResult);
    } // </>Movie iteration

    //Uncheck the current State's cinemas and click done to remove the old cinema IDs from the URL
    //await toggleCinemas({ page: page, cinemaState: state, check: false });

    //-------------------
    // page.close(); // * </for state in State>

    //------------------------------------------------
    //increment the loop conditions
    console.log(
      `currentCinemaIndex : ${currentCinemaIndex} limit: ${limit} array length ${
        _cinemas.length
      }`
    );
    currentCinemaIndex =
      currentCinemaIndex + MAX_CINEMAS_PER_ITERATION <= _cinemas.length
        ? currentCinemaIndex + MAX_CINEMAS_PER_ITERATION
        : _cinemas.length;
    limit =
      _cinemas.length - currentCinemaIndex <= MAX_CINEMAS_PER_ITERATION
        ? _cinemas.length - currentCinemaIndex
        : MAX_CINEMAS_PER_ITERATION;
  }

  //*********** ITERATION 1/4 : STATE **********
  for (const state of STATES) {
    console.log(`${state}`);

    // //Select the State from the slider
    // await toggleCinemas({
    //   page: page,
    //   cinemaState: state,
    //   checkCheckBox: true
    // });

    await page.waitFor(3000); //? Redundant ?
  }

  await browser.close();

  //Write results to json file
  writeToFile(fs, movieSessions);
  return Promise.resolve(movieSessions);
}

function writeToFile(fs, movieSessions) {
  const json = JSON.stringify(movieSessions, null, 2);
  fs.writeFileSync("scrapedMovies.json", json, "utf8");
}

//gets the numbers of child elements
async function getElementCount(page, selector) {
  return (await page.$$(selector)).length;
}

//composes URL to scrape from using date, movies and cinemas
function addDatetoURL(URL, sessionDate) {
  let strippedURL = removeURLParameter(URL, "date");
  const dateString =
    sessionDate.getFullYear() +
    "-" +
    ("0" + (sessionDate.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + sessionDate.getDate()).slice(-2);
  //&cinemas=13,68
  return `${strippedURL}&date=${dateString}`; //inject date
}

//adds Cinema IDs to the URL

export function preparedURL({
  sessionDate,
  movies,
  cinemas,
  cinemaStartIndex,
  cinemaLimit
}) {
  //e.g. //https://www.eventcinemas.com.au/Sessions#date=2018-11-08&cinemas=13&movies=12396,12328
  let baseURL = "https://www.eventcinemas.com.au/Sessions#";
  // Date
  const dateString =
    sessionDate.getFullYear() +
    "-" +
    ("0" + (sessionDate.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + sessionDate.getDate()).slice(-2);

  //CinemaIds
  console.log(` this.si ${cinemaStartIndex} + this.limit ${cinemaLimit}`);
  let cinemaIDString = cinemas
    .filter(
      function(cin, index) {
        return index >= this.si && index < this.si + this.lim;
        //return index < 5;
      },
      {
        si: cinemaStartIndex,
        lim: cinemaLimit
      }
    )
    .map(function(cin) {
      return cin.cinemaId;
    })
    .join();

  //movies
  console.log("movies " + movies);
  const movieString = movies.join();

  //remove cinemaIDs in the query string if present and return with new cinema IDs

  const modifiedURL = `${baseURL}date=${dateString}&cinemas=${cinemaIDString}&movies=${movieString}`;
  console.log(modifiedURL);
  return modifiedURL;
  //Helper function
}

//Switches the checkBoxs of the cinemas on/off
//!! Redundant  - delete
// async function toggleCinemas({ page, cinemaState, checkCheckBox }) {
//   await page.click(
//     `div.top-select div.slider span.state[data-state-selector=${cinemaState}]`
//   );

//   const startIndex = 1;
//   const endIndex = 15;
//   let i = -1;

//   let res = await page.evaluate(elementPath => {
//     return Array.from(document.querySelectorAll(elementPath)).map(
//       async (cb, index) => {
//         //if (index < 5)
//         //console.log(cb.children[2].value);
//         if (
//           index < 5 &&
//           checkCheckBox != Boolean(cb.children[2].getAttribute("value"))
//         ) {
//           cb.children[2].click();
//         }
//         //return cb.children[2].value;

//         return ` ID: ${cb.getAttribute("data-id")} - ${cb.getAttribute(
//           "data-name"
//         )} ${index}`;
//       }
//     );
//   }, `div[data-state=${cinemaState}] div.top-select-option a.eccheckbox`);

//   await page.click("div.bottom-select>a");
//   await page.waitForSelector("#session-list");
// }
function removeURLParameter(url, parameter) {
  //prefer to use l.search if you have a location/link object
  var urlparts = url.split("?");
  if (urlparts.length >= 2) {
    var prefix = encodeURIComponent(parameter) + "=";
    var pars = urlparts[1].split(/[&#;]/g);

    //reverse iteration as may be destructive
    for (var i = pars.length; i-- > 0; ) {
      //idiom for string.startsWith
      if (pars[i].lastIndexOf(prefix, 0) !== -1) {
        pars.splice(i, 1);
      }
    }
    let blah = pars
      .filter(par => {
        return par.length > 0; // remove empty par
      })
      .reduce(function(acc, par) {
        // adds the relevant sperator as the prefix (e.g. #,&)to @par
        return acc + url[url.indexOf(par) - 1] + par;
      }, "");

    url = urlparts[0] + (pars.length > 0 ? blah : "");
    return url;
  } else {
    return url;
  }
}

async function getCinemaDetails({ browser, states }) {
  const cinemaDetails = [];
  const page = await browser.newPage();
  await page.goto("https://www.eventcinemas.com.au");

  for (const state of states) {
    await page.click(
      `div.top-select div.slider span.state[data-state-selector=${state}]`
    );

    let res = await page.evaluate(
      (elementPath, state) => {
        return Array.from(
          document.querySelectorAll(elementPath),
          function(cin, index) {
            let result = {
              cinemaState: this.state,
              cinemaIndex: index,
              cinemaId: cin.getAttribute("data-id"),
              cinemaName: cin.getAttribute("data-name"),
              cinemaURL: cin.getAttribute("data-url")
            };
            return result;
          },
          { state } // old regex : elementPath.match(RegExp(/=(.*?)]/))[1]
        );
      },
      `div[data-state=${state}] div.top-select-option a.eccheckbox`,
      state
    );
    res.forEach(cin => {
      //cin.cinemaState = state;
      cinemaDetails.push(cin);
    });
  }
  await page.close();
  return cinemaDetails;
}
/*dynamically constructs HTML selector based on the template.
 Child element positions are optionally passed for movie, cinema and session as array */
function selectorBuilder({ template, parameters }) {
  parameters.forEach(element => {
    template = template.replace(element.key, element.value);
  });

  return template;
}

//Return an array of session for a given cinema
async function getSessionInCinema({ page, movieElementPosition }) {
  const sessionResults = [];

  const SESSION_LENGTH_SELECTORCLASS =
    "#session-list > div.movie-container.list-view > ul > li:nth-child(MOVIE_INDEX) > div.movie-list-detail.dynamic > div.cinemas > div > div a.session-btn";
  const SESSION_SELECTOR =
    "#session-list > div.movie-container.list-view > ul > li:nth-child(MOVIE_INDEX) > div.movie-list-detail.dynamic > div.cinemas > div > div > a:nth-child(SESSION_INDEX)";

  //Get the number of sessions available for the current cinema
  const numSessions = await getElementCount(
    page,
    selectorBuilder({
      template: SESSION_LENGTH_SELECTORCLASS,
      parameters: [{ key: "MOVIE_INDEX", value: movieElementPosition }]
    })
  );

  console.log(`numSessions    ${numSessions}`);
  // console.log(
  //   `------ Sessions in ${state}-${cinemaResult.name} : ${numSessions}`
  // );

  for (let _sessionIndex = 1; _sessionIndex <= numSessions; _sessionIndex++) {
    //dynamically populate the template selector with movie, cinema and session indices
    let sessionSelector = selectorBuilder({
      template: SESSION_SELECTOR,
      parameters: [
        { key: "MOVIE_INDEX", value: movieElementPosition },
        { key: "SESSION_INDEX", value: _sessionIndex }
      ]
    });

    console.log("$$$$$$$" + sessionSelector);

    let sessionResult = await page.evaluate((sel, ses) => {
      const _cinemaID = document
        .querySelector(sel)
        .getAttribute("data-cinemaid");

      const _sessionID = document
        .querySelector(sel)
        .getAttribute("data-sessionid");

      const _sessionDateTime = document
        .querySelector(sel)
        .getAttribute("data-time"); //TODO convert to Date object

      const _sessionSeatsLeft = document
        .querySelector(sel)
        .getAttribute("data-seatsavailable");

      const _sessionSeatsAuditedOn = new Date();

      return { _cinemaID, _sessionID, _sessionDateTime, _sessionSeatsLeft };
    }, sessionSelector);

    //console.log(JSON.stringify(sessionResult, null, 2));
    sessionResults.push(sessionResult);
  }

  console.log(JSON.stringify(sessionResults, null, 2));
  return sessionResults; //
}
//module.exports = addCinemaIDsToURL;
module.exports = scrapeEventCinemas;

/// call the main function
(async () => {
  //https://www.eventcinemas.com.au/Sessions#date=2018-11-08&cinemas=13&movies=12396,12328
  await scrapeEventCinemas([12396, 12328], new Date("2018-11-08T10:20:30Z"));
})();
