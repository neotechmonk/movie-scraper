// const fs = require("fs");
// import { default as url } from "./src/url";
// import { default as allCinemas } from "./src/cinemas";
// const puppeteer = require("puppeteer");
// import { Movie, Cinema, Session } from "./domain-objects";

// //+async function scrapeEventCinemas()

// export async function scrapeEventCinemas(movies, sessionDate) {
//   const STATES = ["ACT", "VIC", "SA", "WA", "NT", "NSW", "QLD"];
//   const MAX_CINEMAS_PER_ITERATION = 5;
//   //Date to retrieve data for

//   const MOVIE_LENGTH_SELECTORCLASS =
//     "li.movie-list-item.movie-container-item.split-content";
//   const MOVIE_SELECTOR =
//     "#session-list > div.movie-container.list-view > ul > li:nth-child(MOVIE_INDEX)";
//   //"#session-list > div.movie-container.list-view > ul > li:nth-child(MOVIE_INDEX) > div.movie-list-detail.dynamic > div.desktop-content > a > span.title";

//   const HIDDEN_MOVIE_SELECTOR =
//     "#session-list > div.movie-container.list-view > ul > li:nth-child(MOVIE_INDEX)";
//   const CINEMA_LENGTH_SELECTORCLASS =
//     "#session-list > div.movie-container.list-view > ul > li:nth-child(MOVIE_INDEX) > div.movie-list-detail.dynamic > div.cinemas > div.cinema";
//   const CINEMA_NAME_SELECTOR =
//     "#session-list > div.movie-container.list-view > ul > li:nth-child(MOVIE_INDEX) > div.movie-list-detail.dynamic > div.cinemas > div:nth-child(CINEMA_INDEX) > span.cinema-name";
//   const CINEMA_PROPERTY_SELECTOR =
//     "#session-list > div.movie-container.list-view > ul > li:nth-child(MOVIE_INDEX) > div.movie-list-detail.dynamic > div.cinemas > div:nth-child(CINEMA_INDEX) > div.session-buttons > a";

//   ///----------------

//   const browser = await puppeteer.launch({
//     handleSIGINT: true,
//     devtools: false,
//     headless: true
//     // ,
//     // slowMo: 150
//   });

//   let movieSessions = [];
//   const visibleMovies = [];
//   //! verify moving this out of the states loop hasnt broken anything

//   let _cinemas = allCinemas({ puppeteer: puppeteer, states: STATES });

//   let currentCinemaIndex = 0;
//   let limit = MAX_CINEMAS_PER_ITERATION;
//   //*********** ITERATION 1/4 : CHUNKS of CINEMAS **********
//   while (currentCinemaIndex < _cinemas.length) {
//     //Constuct URL
//     //Add cinemas  IDs
//     let newURL = url(sessionDate, movies, {
//       cinemaIDs: ([{ cinemaID }] = _cinemas),
//       start: currentCinemaIndex,
//       limit: limit
//     });

//     console.log(`**URL ${newURL}`);

//     const page = await browser.newPage();
//     await page.setViewport({ width: 1366, height: 735 }); //form factor - laptop/PC

//     await page.goto(newURL);
//     await page.waitFor(1000);

//     // close the popup modal to select cinemas and movies
//     // await page.$eval(
//     //   "body > header > div.fave-wrapper.open > div.fave-modal > span.close",
//     //   elem => elem.click()
//     // );

//     const numMovies = await getElementCount(page, MOVIE_LENGTH_SELECTORCLASS);

//     //*********** ITERATION 2/4 : MOVIE **********
//     for (let _movieIndex = 1; _movieIndex <= numMovies; _movieIndex++) {
//       //Main selector to identify movies
//       let movieSelector = selectorBuilder({
//         template: MOVIE_SELECTOR,
//         parameters: [{ key: "MOVIE_INDEX", value: _movieIndex }]
//       });

//       //Selector to identify hidden movies.
//       let hiddemMovieSelector = selectorBuilder({
//         template: HIDDEN_MOVIE_SELECTOR,
//         parameters: [{ key: "MOVIE_INDEX", value: _movieIndex }]
//       });

//       let movieResult = await page.evaluate(
//         (sel, mr) => {
//           mr.name = document.querySelector(sel).getAttribute("data-name");
//           mr.id = document.querySelector(sel).getAttribute("data-id");
//           return mr;
//         },
//         movieSelector,
//         new Movie()
//       );

//       //Check if a movie by the same name already exists
//       const existingMovies = movieSessions.filter(m => {
//         return m.name === movieResult.name;
//       });

//       //Skip  loop if a movie is hidden
//       let ishiddenMovie = await page.evaluate(sel => {
//         return document
//           .querySelector(sel)
//           .getAttribute("class")
//           .includes("evohide");
//       }, hiddemMovieSelector);

//       if (!ishiddenMovie) {
//         visibleMovies.push(_movieIndex - 1);

//         //Upsert the movie
//         if (existingMovies.length === 0) {
//           movieSessions.push(movieResult);
//           console.log(movieResult);
//         }
//       } else continue;

//       // console.log(
//       //   `movie sessions at the end of movieSessions ${JSON.stringify(
//       //     movieSessions,null, 2
//       //   )}`
//       // );
//       let cinemaResult; // TODO temp.. ??
//       // $$$ Get all sessions
//       //cinemaResult.sessions =

//       let cinemaSessionResults = getSessionInCinema({
//         page: page,
//         movieElementPosition: _movieIndex
//       });

//       console.log(JSON.stringify(cinemaSessionResults, null, 2));

//       //Add cinemas to the Result Array
//       movieSessions.push(movieResult);
//     } // </>Movie iteration

//     //Uncheck the current State's cinemas and click done to remove the old cinema IDs from the URL
//     //await toggleCinemas({ page: page, cinemaState: state, check: false });

//     //-------------------
//     // page.close(); // * </for state in State>

//     //------------------------------------------------
//     //increment the loop conditions
//     console.log(
//       `currentCinemaIndex : ${currentCinemaIndex} limit: ${limit} array length ${
//         _cinemas.length
//       }`
//     );
//     currentCinemaIndex =
//       currentCinemaIndex + MAX_CINEMAS_PER_ITERATION <= _cinemas.length
//         ? currentCinemaIndex + MAX_CINEMAS_PER_ITERATION
//         : _cinemas.length;
//     limit =
//       _cinemas.length - currentCinemaIndex <= MAX_CINEMAS_PER_ITERATION
//         ? _cinemas.length - currentCinemaIndex
//         : MAX_CINEMAS_PER_ITERATION;
//   }

//   //*********** ITERATION 1/4 : STATE **********
//   for (const state of STATES) {
//     console.log(`${state}`);

//     // //Select the State from the slider
//     // await toggleCinemas({
//     //   page: page,
//     //   cinemaState: state,
//     //   checkCheckBox: true
//     // });

//     await page.waitFor(3000); //? Redundant ?
//   }

//   await browser.close();

//   //Write results to json file
//   writeToFile(fs, movieSessions);
//   return Promise.resolve(movieSessions);
// }

// function writeToFile(fs, movieSessions) {
//   const json = JSON.stringify(movieSessions, null, 2);
//   fs.writeFileSync("scrapedMovies.json", json, "utf8");
// }

// //gets the numbers of child elements
// async function getElementCount(page, selector) {
//   return (await page.$$(selector)).length;
// }

// /*dynamically constructs HTML selector based on the template.
//  Child element positions are optionally passed for movie, cinema and session as array */
// function selectorBuilder({ template, parameters }) {
//   parameters.forEach(element => {
//     template = template.replace(element.key, element.value);
//   });

//   return template;
// }

// //Return an array of session for a given cinema
// async function getSessionInCinema({ page, movieElementPosition }) {
//   const sessionResults = [];

//   const SESSION_LENGTH_SELECTORCLASS =
//     "#session-list > div.movie-container.list-view > ul > li:nth-child(MOVIE_INDEX) > div.movie-list-detail.dynamic > div.cinemas > div > div a.session-btn";
//   const SESSION_SELECTOR =
//     "#session-list > div.movie-container.list-view > ul > li:nth-child(MOVIE_INDEX) > div.movie-list-detail.dynamic > div.cinemas > div > div > a:nth-child(SESSION_INDEX)";

//   //Get the number of sessions available for the current cinema
//   const numSessions = await getElementCount(
//     page,
//     selectorBuilder({
//       template: SESSION_LENGTH_SELECTORCLASS,
//       parameters: [{ key: "MOVIE_INDEX", value: movieElementPosition }]
//     })
//   );

//   console.log(`numSessions    ${numSessions}`);
//   // console.log(
//   //   `------ Sessions in ${state}-${cinemaResult.name} : ${numSessions}`
//   // );

//   for (let _sessionIndex = 1; _sessionIndex <= numSessions; _sessionIndex++) {
//     //dynamically populate the template selector with movie, cinema and session indices
//     let sessionSelector = selectorBuilder({
//       template: SESSION_SELECTOR,
//       parameters: [
//         { key: "MOVIE_INDEX", value: movieElementPosition },
//         { key: "SESSION_INDEX", value: _sessionIndex }
//       ]
//     });

//     console.log("$$$$$$$" + sessionSelector);

//     let sessionResult = await page.evaluate((sel, ses) => {
//       const _cinemaID = document
//         .querySelector(sel)
//         .getAttribute("data-cinemaid");

//       const _sessionID = document
//         .querySelector(sel)
//         .getAttribute("data-sessionid");

//       const _sessionDateTime = document
//         .querySelector(sel)
//         .getAttribute("data-time"); //TODO convert to Date object

//       const _sessionSeatsLeft = document
//         .querySelector(sel)
//         .getAttribute("data-seatsavailable");

//       const _sessionSeatsAuditedOn = new Date();

//       return {
//         _cinemaID,
//         _sessionID,
//         _sessionDateTime,
//         _sessionSeatsLeft,
//         _sessionSeatsAuditedOnz
//       };
//     }, sessionSelector);

//     //console.log(JSON.stringify(sessionResult, null, 2));
//     sessionResults.push(sessionResult);
//   }

//   console.log(JSON.stringify(sessionResults, null, 2));
//   return sessionResults; //
// }
// //module.exports = addCinemaIDsToURL;
// module.exports = scrapeEventCinemas;

// /// call the main function
// async () => {
//   //https://www.eventcinemas.com.au/Sessions#date=2018-11-08&cinemas=13&movies=12396,12328
//   await scrapeEventCinemas([12396, 12328], new Date("2018-11-08T10:20:30Z"));
// };
