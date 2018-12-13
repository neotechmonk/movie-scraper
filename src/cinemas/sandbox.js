import puppeteer from "puppeteer";
import { default as allCinemas } from "./index";
const STATES = ["ACT", "VIC", "SA", "WA", "NT", "NSW", "QLD"];

// cinemas from all states
(async () => {
  console.log(await allCinemas());
})();

// //cinemas from one state
// (async () => {
//   const page = await puppeteer
//     .launch({ headless: true })
//     .then(browser => browser.newPage());

//   const state = STATES[5];
//   await page.goto("https://eventcinemas.com.au");

//   const results = await cinemasfromState(page, state);
//   console.log(results);
//   await page.close();
// })();
