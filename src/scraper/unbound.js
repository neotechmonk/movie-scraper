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

import { default as cinemas } from "../cinemas";
const movies = require("../movies");
const sessions = require("../movie-sessions");
const helper = require("../helpers/helpers");
const url = require("../url");
const puppeteer = require("puppeteer");

//(async ({ puppeteer, movies, sessions, helper, url }) => {
(async () => {
  //const STATES = ["ACT", "VIC", "SA", "WA", "NT", "NSW", "QLD"];

  // Get all cinemas  // ! Replace this with cinemas from the app DB
  const _cinemas = await cinemas({ state: ["NSW"] });

  //create URL for the cinema site
  const _url = url(new Date(2018, 10, 21), [12258, 12334, 12266, 12326], {
    cinemaIDs: _cinemas.map(c => c.cinemaId),
    start: 0,
    limit: 5
  });
  console.log(_url);

  //Browse the cinema site with @_url
  const page = await puppeteer
    .launch({ headless: true })
    .then(browser => browser.newPage());

  await page.setRequestInterception(true);
  page.on("request", req => {
    if (
      req.resourceType() === "image" ||
      //  req.resourceType() === "stylesheet" ||  // stylesheet is needed to if class=evohide (hidden movies) is to be used to filter
      req.resourceType() === "font"
    ) {
      req.abort();
    } else {
      req.continue();
    }
  });

  await page.goto(_url);

  const _movies = await movies({ page });

  console.log(_movies);
  //Get the sessions
  const _sessions = await sessions({ page: page }, 3);
  console.log(_sessions);
  await page.close();
})();
