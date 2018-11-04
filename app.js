const fs = require("fs");
const puppeteer = require("puppeteer");
import { Movie, Cinema, Session } from "./domain-objects";

//+async function scrapeEventCinemas()

async function scrapeEventCinemas(sessionData) {
  const STATES = ["ACT", "VIC", "SA", "WA", "NT", "NSW", "QLD"];
  const MAX_CINEMA_PER_ITERATION = 5;
  //Date to retrieve data for
  const URL = createURL(sessionData); //inject date

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
  console.log(`**URL ${URL}`);

  let movieSessions = [];
  const visibleMovies = [];
  //! verify moving this out of the states loop hasnt broken anything
  const page = await browser.newPage();
  await page.setViewport({ width: 1366, height: 735 }); //form factor - laptop/PC
  await page.goto(URL);
  await page.waitFor(1000);

  // close the popup modal to select cinemas and movies
  await page.$eval(
    "body > header > div.fave-wrapper.open > div.fave-modal > span.close",
    elem => elem.click()
  );

  console.log(await getCinemaDetails({ states: STATES, page: page }));

  //*********** ITERATION 1/4 : STATE **********
  for (const state of STATES) {
    console.log(`${state}`);

    //Select the State from the slider
    await toggleCinemas({
      page: page,
      cinemaState: state,
      checkCheckBox: true
    });

    await page.waitFor(3000); //? Redundant ?
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
      let ishidenMovie = await page.evaluate(sel => {
        return document
          .querySelector(sel)
          .getAttribute("class")
          .includes("evohide");
      }, hiddemMovieSelector);

      if (!ishidenMovie) {
        visibleMovies.push(_movieIndex - 1);
        console.log(
          `-- Movie ${movieResult.name}(of ${numMovies}) in ${state}`
        );

        //Upsert the movie
        if (existingMovies.length === 0) {
          movieSessions.push(movieResult);
        }
      } else continue;

      const numCinemas = await getElementCount(
        page,
        selectorBuilder({
          template: CINEMA_LENGTH_SELECTORCLASS,
          parameters: [{ key: "MOVIE_INDEX", value: _movieIndex }]
        })
      );

      console.log(`---- Cinemas in  ${state}  :  ${numCinemas}`);

      //*********** ITERATION 3/4 : CINEMA **********

      for (let _cinemaIndex = 1; _cinemaIndex <= numCinemas; _cinemaIndex++) {
        const cinemaNameSelector = selectorBuilder({
          template: CINEMA_NAME_SELECTOR,
          parameters: [
            { key: "MOVIE_INDEX", value: _movieIndex },
            { key: "CINEMA_INDEX", value: _cinemaIndex }
          ]
        });

        const cinemaPropertySelector = selectorBuilder({
          template: CINEMA_PROPERTY_SELECTOR,
          parameters: [
            { key: "MOVIE_INDEX", value: _movieIndex },
            { key: "CINEMA_INDEX", value: _cinemaIndex }
          ]
        });

        //get the name of the cinema name
        let cinemaResult = await page.evaluate(
          (sel, cr) => {
            cr.name = document.querySelector(sel).innerText.trim();
            return cr;
          },
          cinemaNameSelector,
          new Cinema()
        );

        //get the Cinema ID and state from the first session

        cinemaResult = await page.evaluate(
          (sel, cr, state) => {
            cr.cinemaID = document
              .querySelector(sel)
              .getAttribute("data-cinemaid");
            cr.cinemaState = state; //assigned from the state pagination from an outer for loop. // TODO  dynamically obtain from the page?
            return cr;
          },
          cinemaPropertySelector,
          cinemaResult,
          state
        );

        // $$$ Get all sessions
        cinemaResult.sessions = getSessionInCinema({
          state: state,
          page: page,
          movieElementPosition: _movieIndex,
          cinemaElementPosition: _cinemaIndex
        });
        // //mo

        //Add cinemas to the movie
        movieResult.cinemas.push(cinemaResult);
      } // </>Cinema iteration

      //Add cinemas to the Result Array
      movieSessions.push(movieResult);
    } // </>Movie iteration

    //Uncheck the current State's cinemas and click done to remove the old cinema IDs from the URL
    await toggleCinemas({ page: page, cinemaState: state, check: false });

    //-------------------
    // page.close(); // * </for state in State>
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
function createURL(sessionDate) {
  const dateString =
    sessionDate.getFullYear() +
    "-" +
    ("0" + (sessionDate.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + sessionDate.getDate()).slice(-2);
  //&cinemas=13,68
  const URL = "https://www.eventcinemas.com.au/Sessions#movies=12334,12326&date=DATE&cinemas=13,68".replace(
    "DATE",
    dateString
  ); //inject date
  return URL;
}

//Switches the checkBoxs of the cinemas on/off
async function toggleCinemas({ page, cinemaState, checkCheckBox }) {
  await page.click(
    `div.top-select div.slider span.state[data-state-selector=${cinemaState}]`
  );

  const startIndex = 1;
  const endIndex = 15;
  let i = -1;

  let res = await page.evaluate(elementPath => {
    return Array.from(document.querySelectorAll(elementPath)).map(
      async (cb, index) => {
        //if (index < 5)
        //console.log(cb.children[2].value);
        if (
          index < 5 &&
          checkCheckBox != Boolean(cb.children[2].getAttribute("value"))
        ) {
          cb.children[2].click();
        }
        //return cb.children[2].value;

        return ` ID: ${cb.getAttribute("data-id")} - ${cb.getAttribute(
          "data-name"
        )} ${index}`;
      }
    );
  }, `div[data-state=${cinemaState}] div.top-select-option a.eccheckbox`);

  await page.click("div.bottom-select>a");
  await page.waitForSelector("#session-list");
}

async function getCinemaDetails({ page, states }) {
  const cinemaDetails = [];
  for (const cinemaState of states) {
    await page.click(
      `div.top-select div.slider span.state[data-state-selector=${cinemaState}]`
    );
    // const cinema = {
    //   cinemaInternalIndex: null,
    //   cinemaId: null,
    //   cinemaName: null,
    //   cinemaURL: nu/ll,
    //   cinemaState: cinemaState
    // };

    let res = await page.evaluate(
      elementPath => {
        return Array.from(document.querySelectorAll(elementPath)).map(
          (cin, index) => {
            return {
              cinemaState: null,
              cinemaIndex: index,
              cinemaId: cin.getAttribute("data-id"),
              cinemaName: cin.getAttribute("data-name"),
              cinemaURL: cin.getAttribute("data-url")
            };
          },
          { s: "NSW" }
        );
      },
      `div[data-state=${cinemaState}] div.top-select-option a.eccheckbox`,
      cinemaState
    );

    res.cinemaState = cinemaState; // ? Why doesnt this get assigned ?
    cinemaDetails.push(res);
  }
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
async function getSessionInCinema({
  page,
  state,
  movieElementPosition,
  cinemaElementPosition
}) {
  const sessions = [];

  const SESSION_LENGTH_SELECTORCLASS =
    "#session-list > div.movie-container.list-view > ul > li:nth-child(MOVIE_INDEX) > div.movie-list-detail.dynamic > div.cinemas > div:nth-child(CINEMA_INDEX) > div a.session-btn";
  const SESSION_SELECTOR =
    "#session-list > div.movie-container.list-view > ul > li:nth-child(MOVIE_INDEX) > div.movie-list-detail.dynamic > div.cinemas > div:nth-child(CINEMA_INDEX) > div > a:nth-child(SESSION_INDEX)";

  //Get the number of sessions available for the current cinema
  const numSessions = await getElementCount(
    page,
    selectorBuilder({
      template: SESSION_LENGTH_SELECTORCLASS,
      parameters: [
        { key: "MOVIE_INDEX", value: movieElementPosition },
        { key: "CINEMA_INDEX", value: cinemaElementPosition }
      ]
    })
  );
  // console.log(
  //   `------ Sessions in ${state}-${cinemaResult.name} : ${numSessions}`
  // );

  for (let _sessionIndex = 1; _sessionIndex <= numSessions; _sessionIndex++) {
    //dynamically populate the template selector with movie, cinema and session indices
    let sessionSelector = selectorBuilder({
      template: SESSION_SELECTOR,
      parameters: [
        { key: "MOVIE_INDEX", value: movieElementPosition },
        { key: "CINEMA_INDEX", value: cinemaElementPosition },
        { key: "SESSION_INDEX", value: _sessionIndex }
      ]
    });

    //TODO add session ID, seats left, seat count date/time ()
    let sessionResult = await page.evaluate(
      (sel, ses) => {
        ses.sessionDateTime = document
          .querySelector(sel)
          .getAttribute("data-time"); //TODO convert to Date object
        return ses;
      },
      sessionSelector,
      new Session()
    );

    sessions.push(sessionResult);
  }
  return sessions;
}
module.exports = createURL;
module.exports = scrapeEventCinemas;

/// call the main function
(async () => {
  await scrapeEventCinemas(new Date("2018-11-06T10:20:30Z"));
})();
