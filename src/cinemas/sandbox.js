import puppeteer from "puppeteer";
import * as cinemas from "./unbound";
import { SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION } from "constants";

const STATES = ["ACT", "VIC", "SA", "WA", "NT", "NSW", "QLD"];
//cinemas from all states
(async () => {
  //   console.log(
  //     await cinemas.allCinemas({ puppeteer: puppeteer, states: STATES })
  //   );
})();

//cinemas from one state

(async () => {
  const page = await puppeteer
    .launch({ headless: true })
    .then(browser => browser.newPage());
  const state = STATES[5];
  await page.goto("https://eventcinemas.com.au");

  const results = await cinemas.cinemasfromState(page, state);
  console.log(results);
  await page.close();
})();
